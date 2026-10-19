/**
 * PeriodicFit — central business settings.
 * Everything marked TODO must be replaced with real values before launch.
 */

export const SITE = {
  name: 'PeriodicFit',
  domain: 'periodicfit.com',
  url: 'https://periodicfit.com',
  tagline: 'Training and nutrition built around your life.',
  description:
    'Online personal training, dietitian consultations and custom diet & workout plans from qualified coaches. Science-backed, built around your life.',
  locale: 'en',
  defaultOgImage: '/images/og-default.jpg', // TODO: create 1200x630 OG image in Phase 7
} as const;

export const CONTACT = {
  email: 'hello@periodicfit.com', // TODO: confirm real inbox
  phone: '+910000000000', // TODO: real phone number with country code
  phoneDisplay: '+91 00000 00000', // TODO
  whatsapp: '910000000000', // TODO: WhatsApp number, digits only, with country code
  whatsappMessage: "Hi PeriodicFit, I'd like to know more about your coaching plans.",
  address: '', // TODO: optional business address (leave empty to hide)
  hours: 'Mon–Sat, 9am–7pm', // TODO: confirm support hours + timezone
} as const;

export const SOCIAL = {
  instagram: '', // TODO: https://instagram.com/periodicfit
  youtube: '', // TODO
  facebook: '', // TODO
  x: '', // TODO
  linkedin: '', // TODO
} as const;

export const FORMS = {
  web3formsKey: import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '',
  turnstileSiteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? '',
  successMessage: 'Thanks! Our coach will contact you within 24 hours.',
  /** Auto-open the inquiry popup on service pages (once per session, after 50% scroll / 25 s / exit intent). */
  autoPopup: true,
  autoPopupDelayMs: 25000,
} as const;

export const ANALYTICS = {
  ga4Id: import.meta.env.PUBLIC_GA4_ID ?? '', // TODO: set PUBLIC_GA4_ID (G-XXXXXXXXXX). Loaded only after cookie consent.
  gscVerification: '', // TODO: Google Search Console meta verification token
} as const;

export const ADS = {
  ADSENSE_ENABLED: false, // flip to true only after AdSense approval
  clientId: '', // TODO: ca-pub-XXXXXXXXXXXXXXXX
} as const;

/** Services. `icon` = any Lucide icon name (lucide.dev/icons). */
export const SERVICES = [
  { name: 'Online Personal Training', short: 'Personal Training', slug: 'online-personal-training', icon: 'dumbbell', pitch: 'Live video coaching, a custom program and weekly check-ins with your coach.', points: ['Custom program', 'Video form checks', 'Weekly check-ins'] },
  { name: 'Custom Diet Plans', short: 'Diet Plans', slug: 'diet-plans', icon: 'salad', pitch: 'Meal plans built around your goal, culture and budget. Veg, non-veg or vegan.', points: ['Veg, non-veg or vegan', 'Budget friendly', 'Updated monthly'] },
  { name: 'Online Dietitian Consultation', short: 'Dietitian Consults', slug: 'online-dietitian-consultation', icon: 'video', pitch: '1:1 video consultations with a qualified dietitian.', points: ['1:1 video call', 'Food habit review', 'Follow-up plan'] },
  { name: 'Weight Loss Program', short: 'Weight Loss', slug: 'weight-loss-program', icon: 'flame', pitch: 'A 12-week training and nutrition program for sustainable fat loss.', points: ['12 weeks', 'Training + diet', 'Weekly adjustments'] },
  { name: 'Muscle Gain Program', short: 'Muscle Gain', slug: 'muscle-gain-program', icon: 'biceps-flexed', pitch: 'Hypertrophy training paired with high-protein nutrition.', points: ['Hypertrophy split', 'High-protein meals', 'Progress tracking'] },
  { name: 'Home Workout Plans', short: 'Home Workouts', slug: 'home-workout-plans', icon: 'house', pitch: 'No-gym and minimal-equipment plans that still progress.', points: ['No gym needed', 'Bands & dumbbells', '20–45 min sessions'] },
  { name: "Women's Fitness", short: "Women's Fitness", slug: 'womens-fitness', icon: 'heart-pulse', pitch: "Programs designed around women's training needs and energy.", points: ['Strength focused', 'Energy-based planning', 'Home or gym options'] },
  { name: 'Yoga & Mobility', short: 'Yoga & Mobility', slug: 'yoga-mobility', icon: 'flower-2', pitch: 'Flexibility, posture and recovery sessions.', points: ['Posture work', 'Flexibility', 'Recovery days'] },
] as const;

export type Service = (typeof SERVICES)[number];

/** Free tools. group: 'signature' = shareable USP tools, 'calculator' = classic SEO calculators. */
export const TOOLS = [
  { name: 'Transformation Timeline', slug: 'transformation-timeline', icon: 'calendar-range', group: 'signature', blurb: 'See the date you can realistically hit your goal weight, phase by phase.' },
  { name: 'Meal Plan Generator', slug: 'meal-plan-generator', icon: 'chef-hat', group: 'signature', blurb: 'A full day of meals for your calories. Veg, egg, non-veg or vegan.' },
  { name: 'Workout Split Builder', slug: 'workout-split-builder', icon: 'layout-grid', group: 'signature', blurb: 'Your weekly training split for your days, goal and equipment.' },
  { name: 'Fitness Personality Quiz', slug: 'fitness-personality-quiz', icon: 'sparkles', group: 'signature', blurb: 'Six questions to find the training style that fits you best.' },
  { name: 'Calorie Calculator', slug: 'calorie-calculator', icon: 'flame', group: 'calculator', blurb: 'Daily calories (TDEE) to lose, maintain or gain weight.' },
  { name: 'Macro Calculator', slug: 'macro-calculator', icon: 'pie-chart', group: 'calculator', blurb: 'Protein, carbs and fats in grams for your goal.' },
  { name: 'Protein Intake Calculator', slug: 'protein-intake-calculator', icon: 'beef', group: 'calculator', blurb: 'How much protein you need per day and per meal.' },
  { name: 'BMI Calculator', slug: 'bmi-calculator', icon: 'calculator', group: 'calculator', blurb: 'Body mass index with WHO categories, metric or imperial.' },
  { name: 'Body Fat Calculator', slug: 'body-fat-calculator', icon: 'ruler', group: 'calculator', blurb: 'Estimate body fat % with a tape measure (US Navy method).' },
  { name: 'Ideal Weight Calculator', slug: 'ideal-weight-calculator', icon: 'scale', group: 'calculator', blurb: 'Healthy weight range for your height from 4 classic formulas.' },
  { name: 'Water Intake Calculator', slug: 'water-intake-calculator', icon: 'glass-water', group: 'calculator', blurb: 'Daily water target based on weight, exercise and climate.' },
  { name: 'One-Rep Max Calculator', slug: 'one-rep-max-calculator', icon: 'dumbbell', group: 'calculator', blurb: 'Estimate your 1RM and training weights for every rep range.' },
] as const;
export type Tool = (typeof TOOLS)[number];

export const BLOG_CATEGORIES = [
  { name: 'Workouts', slug: 'workouts' },
  { name: 'Nutrition', slug: 'nutrition' },
  { name: 'Diet Plans', slug: 'diet-plans' },
  { name: 'Weight Loss', slug: 'weight-loss' },
  { name: 'Muscle Building', slug: 'muscle-building' },
  { name: 'Healthy Recipes', slug: 'healthy-recipes' },
  { name: 'Supplements', slug: 'supplements' },
  { name: 'Lifestyle & Recovery', slug: 'lifestyle-recovery' },
] as const;

export const NAV = [
  { label: 'Services', href: '/services', children: SERVICES.map((s) => ({ label: s.name, href: `/services/${s.slug}`, icon: s.icon })) },
  { label: 'Tools', href: '/tools', children: TOOLS.map((t) => ({ label: t.name, href: `/tools/${t.slug}`, icon: t.icon })) },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Refund Policy', href: '/refund-policy' },
] as const;

/** Legal details used in policies. TODO: confirm every value with the client / a lawyer before launch. */
export const LEGAL = {
  companyName: 'PeriodicFit', // TODO: registered legal entity name
  jurisdiction: 'India', // TODO: governing law / courts
  city: '', // TODO: city for courts, e.g. "Mumbai"
  grievanceOfficer: '', // TODO: name of grievance officer (required under Indian IT Rules if serving India)
  privacyEmail: 'privacy@periodicfit.com', // TODO: real inbox
  lastUpdated: '2026-10-19',
} as const;

/** Blog / WordPress (headless). WP_URL is read at BUILD time from the environment, e.g. https://cms.periodicfit.com */
export const BLOG = {
  perPage: 12,
  wpUrl: (import.meta.env.WP_URL ?? '').replace(/\/$/, ''),
} as const;
