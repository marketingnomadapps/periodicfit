/**
 * Central image map. Temporary Unsplash photos — TODO: replace files in src/assets/images
 * with PeriodicFit's own images (same file names = no code changes).
 */
import heroBg from '../assets/images/hero-bg.jpg';
import heroCardMain from '../assets/images/hero-card-main.jpg';
import heroCard1 from '../assets/images/hero-card-1.jpg';
import heroCard2 from '../assets/images/hero-card-2.jpg';
import heroCard3 from '../assets/images/hero-card-3.jpg';
import statement from '../assets/images/statement.jpg';
import nutrition from '../assets/images/nutrition.jpg';
import ctaBg from '../assets/images/cta-bg.jpg';
import svcPt from '../assets/images/svc-pt.jpg';
import svcDp from '../assets/images/svc-dp.jpg';
import svcDt from '../assets/images/svc-dt.jpg';
import svcWl from '../assets/images/svc-wl.jpg';
import svcMg from '../assets/images/svc-mg.jpg';
import svcHw from '../assets/images/svc-hw.jpg';
import svcWf from '../assets/images/svc-wf.jpg';
import svcYg from '../assets/images/svc-yg.jpg';
import step1 from '../assets/images/step-1.jpg';
import step2 from '../assets/images/step-2.jpg';
import step3 from '../assets/images/step-3.jpg';
import step4 from '../assets/images/step-4.jpg';
import program1 from '../assets/images/program-1.jpg';
import program2 from '../assets/images/program-2.jpg';
import program3 from '../assets/images/program-3.jpg';
import program4 from '../assets/images/program-4.jpg';
import program5 from '../assets/images/program-5.jpg';
import program6 from '../assets/images/program-6.jpg';

export const IMG = {
  heroBg, heroCardMain, heroCard1, heroCard2, heroCard3, statement, nutrition, ctaBg,
  step1, step2, step3, step4,
  program1, program2, program3, program4, program5, program6,
};

export const SERVICE_IMAGES: Record<string, { src: ImageMetadata; alt: string }> = {
  'online-personal-training': { src: svcPt, alt: 'Coach guiding a client through a push-up with dumbbells' },
  'diet-plans': { src: svcDp, alt: 'Balanced meal bowl with eggs, greens and fresh vegetables' },
  'online-dietitian-consultation': { src: svcDt, alt: 'High-protein plate of grains, beans and vegetables' },
  'weight-loss-program': { src: svcWl, alt: 'Athlete training with battle ropes' },
  'muscle-gain-program': { src: svcMg, alt: 'Man performing a barbell curl in the gym' },
  'home-workout-plans': { src: svcHw, alt: 'Man doing dumbbell push-ups on a living room floor' },
  'womens-fitness': { src: svcWf, alt: 'Woman pressing a barbell overhead in a squat rack' },
  'yoga-mobility': { src: svcYg, alt: 'Yoga pose silhouetted against a sunset sky' },
};

/** 3 images per service page: [hero, feature A, feature B]. TODO: replace with own photos. */
export const SERVICE_GALLERY: Record<string, { src: ImageMetadata; alt: string }[]> = {
  'online-personal-training': [SERVICE_IMAGES['online-personal-training'], { src: program5, alt: 'Lifter gripping a loaded barbell' }, { src: heroCard1, alt: 'Woman focused before a heavy lift' }],
  'diet-plans': [SERVICE_IMAGES['diet-plans'], { src: step3, alt: 'Meal prep containers with colourful vegetables' }, { src: nutrition, alt: 'Salad bowl with chickpeas and avocado' }],
  'online-dietitian-consultation': [SERVICE_IMAGES['online-dietitian-consultation'], { src: nutrition, alt: 'Balanced bowl of vegetables and legumes' }, { src: step3, alt: 'Prepared vegetables sorted into containers' }],
  'weight-loss-program': [SERVICE_IMAGES['weight-loss-program'], { src: program1, alt: 'Barbell deadlift in a dark gym' }, { src: step4, alt: 'Group of people running outdoors' }],
  'muscle-gain-program': [SERVICE_IMAGES['muscle-gain-program'], { src: heroCardMain, alt: 'Man performing a barbell curl' }, { src: program2, alt: 'Woman flexing after training' }],
  'home-workout-plans': [SERVICE_IMAGES['home-workout-plans'], { src: step1, alt: 'Dumbbells and resistance bands on a wooden floor' }, { src: program3, alt: 'Rows of dumbbells on a rack' }],
  'womens-fitness': [SERVICE_IMAGES['womens-fitness'], { src: program6, alt: 'Woman doing a dumbbell row on a bench' }, { src: heroCard3, alt: 'Woman training with dumbbells' }],
  'yoga-mobility': [SERVICE_IMAGES['yoga-mobility'], { src: program4, alt: 'Person meditating at sunrise' }, { src: step1, alt: 'Resistance bands and light dumbbells for mobility work' }],
};
