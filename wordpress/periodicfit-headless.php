<?php
/**
 * Plugin Name: PeriodicFit Headless
 * Description: Connects this WordPress (content only) to the PeriodicFit Astro website: SEO + author + reviewer fields in the REST API, automatic site rebuilds on publish, headless redirects and security hardening.
 * Version: 1.0.0
 * Author: PeriodicFit
 *
 * INSTALL: copy this file to wp-content/mu-plugins/periodicfit-headless.php (must-use plugin, always active).
 * CONFIG (wp-config.php):
 *   define('PF_FRONTEND_URL', 'https://periodicfit.com');
 *   define('PF_DEPLOY_HOOK',  'https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/XXXX'); // Cloudflare Pages deploy hook
 */

if (!defined('ABSPATH')) exit;

const PF_REVIEWER_META = 'pf_reviewed_by';
const PF_CREDENTIALS_META = 'pf_credentials';

/* ───────────────── 1. REST fields used by the website ───────────────── */
add_action('rest_api_init', function () {
  // SEO title/description from Rank Math or Yoast (falls back to empty → site uses title/excerpt)
  register_rest_field('post', 'pf_seo', [
    'get_callback' => function ($post) {
      $id = $post['id'];
      $title = get_post_meta($id, 'rank_math_title', true) ?: get_post_meta($id, '_yoast_wpseo_title', true);
      $desc  = get_post_meta($id, 'rank_math_description', true) ?: get_post_meta($id, '_yoast_wpseo_metadesc', true);
      // Ignore unreplaced template variables like %title% or %%title%%
      $clean = fn($s) => (is_string($s) && strpos($s, '%') === false) ? wp_strip_all_tags($s) : '';
      return ['title' => $clean($title), 'description' => $clean($desc)];
    },
    'schema' => ['type' => 'object'],
  ]);

  // Public author card (instead of exposing the users endpoint)
  register_rest_field('post', 'pf_author', [
    'get_callback' => function ($post) {
      $uid = (int) get_post_field('post_author', $post['id']);
      return [
        'name'        => get_the_author_meta('display_name', $uid),
        'bio'         => wp_strip_all_tags(get_the_author_meta('description', $uid)),
        'credentials' => sanitize_text_field(get_user_meta($uid, PF_CREDENTIALS_META, true)),
        'avatar'      => get_avatar_url($uid, ['size' => 112]),
      ];
    },
    'schema' => ['type' => 'object'],
  ]);

  // "Medically reviewed by"
  register_rest_field('post', 'pf_reviewer', [
    'get_callback' => fn($post) => sanitize_text_field(get_post_meta($post['id'], PF_REVIEWER_META, true)),
    'schema' => ['type' => 'string'],
  ]);
});

/* ───────────────── 2. Editor fields ───────────────── */
// "Medically reviewed by" box in the post editor
add_action('add_meta_boxes', function () {
  add_meta_box('pf_reviewer_box', 'Medically reviewed by', function ($post) {
    wp_nonce_field('pf_reviewer_save', 'pf_reviewer_nonce');
    $v = esc_attr(get_post_meta($post->ID, PF_REVIEWER_META, true));
    echo '<input type="text" name="pf_reviewed_by" value="' . $v . '" style="width:100%" placeholder="e.g. Dr. A. Sharma, RD" />';
    echo '<p class="description">Name and credential of the qualified expert who reviewed this article. Leave empty if not reviewed.</p>';
  }, 'post', 'side');
});
add_action('save_post_post', function ($post_id) {
  if (!isset($_POST['pf_reviewer_nonce']) || !wp_verify_nonce($_POST['pf_reviewer_nonce'], 'pf_reviewer_save')) return;
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
  if (!current_user_can('edit_post', $post_id)) return;
  update_post_meta($post_id, PF_REVIEWER_META, sanitize_text_field(wp_unslash($_POST['pf_reviewed_by'] ?? '')));
});

// "Credentials" field on user profiles (shown in the author box)
$pf_profile_field = function ($user) {
  $v = esc_attr(get_user_meta($user->ID, PF_CREDENTIALS_META, true));
  echo '<h2>PeriodicFit author box</h2><table class="form-table"><tr><th><label for="pf_credentials">Credentials</label></th><td>';
  echo '<input type="text" name="pf_credentials" id="pf_credentials" value="' . $v . '" class="regular-text" placeholder="e.g. Registered Dietitian, MSc Nutrition" />';
  wp_nonce_field('pf_cred_save', 'pf_cred_nonce');
  echo '</td></tr></table>';
};
add_action('show_user_profile', $pf_profile_field);
add_action('edit_user_profile', $pf_profile_field);
$pf_profile_save = function ($uid) {
  if (!current_user_can('edit_user', $uid) || !isset($_POST['pf_cred_nonce']) || !wp_verify_nonce($_POST['pf_cred_nonce'], 'pf_cred_save')) return;
  update_user_meta($uid, PF_CREDENTIALS_META, sanitize_text_field(wp_unslash($_POST['pf_credentials'] ?? '')));
};
add_action('personal_options_update', $pf_profile_save);
add_action('edit_user_profile_update', $pf_profile_save);

/* ───────────────── 3. Rebuild the website when content changes ───────────────── */
function pf_trigger_deploy($reason) {
  if (!defined('PF_DEPLOY_HOOK') || !PF_DEPLOY_HOOK) return;
  if (get_transient('pf_deploy_lock')) return;           // debounce: max one rebuild per 60 s
  set_transient('pf_deploy_lock', 1, 60);
  wp_remote_post(PF_DEPLOY_HOOK, ['blocking' => false, 'timeout' => 5, 'body' => ['reason' => $reason]]);
}
add_action('transition_post_status', function ($new, $old, $post) {
  if ($post->post_type !== 'post' || wp_is_post_revision($post) || wp_is_post_autosave($post)) return;
  if ($new === 'publish' || $old === 'publish') pf_trigger_deploy("post {$post->ID}: {$old} → {$new}");
}, 10, 3);
add_action('post_updated', function ($id, $after, $before) {
  if ($after->post_type === 'post' && $after->post_status === 'publish') pf_trigger_deploy("post {$id} updated");
}, 10, 3);
add_action('before_delete_post', function ($id) { if (get_post_type($id) === 'post' && get_post_status($id) === 'publish') pf_trigger_deploy("post {$id} deleted"); });
foreach (['created_category', 'edited_category', 'delete_category'] as $hook) add_action($hook, fn() => pf_trigger_deploy('categories changed'));

/* ───────────────── 4. Headless: send visitors to the real website ───────────────── */
add_action('template_redirect', function () {
  if (!defined('PF_FRONTEND_URL') || is_admin() || is_preview() || wp_doing_ajax() || wp_doing_cron() || (defined('REST_REQUEST') && REST_REQUEST)) return;
  $front = untrailingslashit(PF_FRONTEND_URL);
  if (is_singular('post')) { wp_redirect($front . '/blog/' . get_post_field('post_name', get_queried_object_id()), 301); exit; }
  if (is_category()) { wp_redirect($front . '/blog/category/' . get_queried_object()->slug, 301); exit; }
  wp_redirect($front . '/blog', 301); exit;
});

/* ───────────────── 5. Security hardening ───────────────── */
add_filter('xmlrpc_enabled', '__return_false');                         // no XML-RPC (brute-force target)
add_filter('wp_headers', function ($h) { unset($h['X-Pingback']); return $h; });
add_filter('wp_is_application_passwords_available', '__return_false');  // no app passwords
remove_action('wp_head', 'wp_generator');                               // hide WP version
add_filter('the_generator', '__return_empty_string');
// Hide user list / usernames from anonymous visitors (stops user enumeration)
add_filter('rest_endpoints', function ($endpoints) {
  if (!is_user_logged_in()) { unset($endpoints['/wp/v2/users'], $endpoints['/wp/v2/users/(?P<id>[\d]+)']); }
  return $endpoints;
});
add_action('init', function () {
  if (!is_admin() && isset($_GET['author']) && !is_user_logged_in()) { wp_safe_redirect(home_url('/'), 301); exit; }
});
// Only published posts, categories, tags and media are readable without login; drafts stay private by default.
