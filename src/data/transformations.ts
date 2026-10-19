/**
 * Client transformations. ONLY add real clients who gave written consent (photos, name/initials, numbers).
 * The page shows an honest "coming soon" state while this list is empty.
 *
 * Example entry:
 * {
 *   name: 'Priya R.', age: 31, service: 'weight-loss-program', weeks: 16,
 *   result: '−9 kg, waist −11 cm', quote: 'I never felt like I was on a diet.',
 *   before: beforeImg, after: afterImg, consent: true,
 * }
 */
export interface Transformation {
  name: string; age?: number; service: string; weeks: number; result: string; quote: string;
  before?: ImageMetadata; after?: ImageMetadata; consent: true;
}
export const TRANSFORMATIONS: Transformation[] = [];
