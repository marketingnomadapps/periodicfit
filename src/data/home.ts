/**
 * Homepage copy. Every number marked TODO is a placeholder and must be replaced with real data.
 */
import { IMG } from './images';

/** Words wrapped in *asterisks* are highlighted in lime as the reader scrolls. */
export const STATEMENT =
  'Most plans fail because they ignore *real life.* Your job, your food, your sleep, your budget. We build training and nutrition *in phases* that fit around all of it, then *adjust every week* as you progress. No crash diets. No copy-paste programs. Just *steady, measurable change.*';

export const STEPS = [
  { n: '01', title: 'Fill the form', text: 'Tell us your goal, schedule, food preferences and any injuries. It takes about two minutes.', img: IMG.step1, alt: 'Dumbbells and resistance bands on a wooden floor' },
  { n: '02', title: 'Free consultation call', text: 'A coach or dietitian walks through your history and goals on a short video or WhatsApp call.', img: IMG.step2, alt: 'Woman preparing for a barbell squat' },
  { n: '03', title: 'Get your custom plan', text: 'Your training split and meal plan arrive built around your routine, kitchen and budget.', img: IMG.step3, alt: 'Meal prep containers filled with colourful vegetables and grains' },
  { n: '04', title: 'Weekly check-ins', text: 'Every week we review progress, photos and energy, then adjust the next phase of your plan.', img: IMG.step4, alt: 'Group of people running outdoors' },
];

export const PROGRAMS = [
  { title: '12-Week Fat Loss', icon: 'flame', weeks: '12 weeks', phases: 'Foundation · Build · Peak', text: 'Strength training, steps and a calorie deficit you can actually sustain.', img: IMG.program1, alt: 'Barbell deadlift setup in a dark gym', href: '/services/weight-loss-program' },
  { title: 'Hypertrophy Block', icon: 'biceps-flexed', weeks: '16 weeks', phases: 'Volume · Intensity · Deload', text: 'Progressive overload and high-protein meals for lean muscle gain.', img: IMG.program2, alt: 'Woman flexing after a training session', href: '/services/muscle-gain-program' },
  { title: 'Home Strength', icon: 'house', weeks: '8 weeks', phases: 'Bodyweight · Bands · Dumbbells', text: 'No gym needed. Minimal equipment, real progression.', img: IMG.program3, alt: 'Rows of dumbbells on a rack', href: '/services/home-workout-plans' },
  { title: 'Mobility Reset', icon: 'flower-2', weeks: '6 weeks', phases: 'Release · Mobilise · Stabilise', text: 'Fix stiffness, improve posture and recover better between sessions.', img: IMG.program4, alt: 'Person meditating at sunrise', href: '/services/yoga-mobility' },
  { title: 'Strength Foundations', icon: 'dumbbell', weeks: '10 weeks', phases: 'Technique · Load · Test', text: 'Learn the big lifts with 1:1 form feedback from your coach.', img: IMG.program5, alt: 'Lifter gripping a loaded barbell', href: '/services/online-personal-training' },
  { title: "Women's Strength", icon: 'heart-pulse', weeks: '12 weeks', phases: 'Base · Build · Perform', text: 'Training and nutrition planned around energy, recovery and your cycle.', img: IMG.program6, alt: 'Woman doing a dumbbell row on a bench', href: '/services/womens-fitness' },
];

export const NUMBERS = [
  { value: 1200, suffix: '+', label: 'Clients coached' }, // TODO: real number
  { value: 3500, suffix: '+', label: 'Custom plans delivered' }, // TODO: real number
  { value: 12, suffix: '', label: 'Qualified coaches & dietitians' }, // TODO: real number
  { value: 92, suffix: '%', label: 'Clients who renew after 12 weeks' }, // TODO: real number
];

export const LATEST_POSTS = [
  // TODO: Phase 4 replaces this with the 3 newest posts from the blog content collection.
  { title: 'How much protein do you actually need per day?', category: 'Nutrition', href: '/blog', img: IMG.nutrition, alt: 'Colourful salad bowl with chickpeas and avocado' },
  { title: 'Progressive overload explained for beginners', category: 'Workouts', href: '/blog', img: IMG.program5, alt: 'Hand gripping a barbell' },
  { title: 'A realistic weekly meal prep for fat loss', category: 'Diet Plans', href: '/blog', img: IMG.step3, alt: 'Meal prep containers with vegetables' },
];

export const HOME_FAQ = [
  { q: 'How does online personal training work?', a: 'After a free consultation, your coach builds a program around your goal, equipment and schedule. You log workouts in your plan, send form videos when needed, and get a weekly check-in where your coach adjusts the next block.' },
  { q: 'Do I need a gym membership?', a: 'No. We write plans for full gyms, home setups with a few dumbbells or bands, and bodyweight only. Tell us what you have and the plan is built around it.' },
  { q: 'Can you make a vegetarian or vegan diet plan?', a: 'Yes. Every meal plan is built around your food preferences, culture and budget, including vegetarian, eggetarian, non-vegetarian and vegan diets.' },
  { q: 'Who creates the diet plans?', a: 'Meal plans are created or reviewed by qualified dietitians and nutrition coaches. Their credentials are listed on our coaches page.' },
  { q: 'How fast will I see results?', a: 'Most clients notice better energy and strength within 3 to 4 weeks. Visible body changes usually take 8 to 12 weeks of consistent training and eating. We do not promise rapid weight loss because it rarely lasts.' },
  { q: 'Is this safe if I have a medical condition?', a: 'Tell us about any condition during your consultation. We may ask you to get clearance from your doctor first. Our programs are not a replacement for medical treatment.' },
];
