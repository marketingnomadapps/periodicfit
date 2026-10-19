interface ImportMetaEnv {
  readonly PUBLIC_WEB3FORMS_KEY?: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
  readonly WP_URL?: string;
  readonly PUBLIC_GA4_ID?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
