/**
 * Images, emoji chips and quick facts for every tool page.
 * Photos are temporary Unsplash images — TODO: swap with own images (keep file names).
 */
import fruits from '../assets/images/tools/fruits.jpg';
import plates from '../assets/images/tools/plates.jpg';
import curry from '../assets/images/tools/curry.jpg';
import jarSalad from '../assets/images/tools/jar-salad.jpg';
import greens from '../assets/images/tools/greens.jpg';
import riceBowl from '../assets/images/tools/rice-bowl.jpg';
import barbell from '../assets/images/tools/barbell.jpg';
import waterBottle from '../assets/images/tools/water-bottle.jpg';
import waterGlass from '../assets/images/tools/water-glass.jpg';
import saladDark from '../assets/images/tools/salad-dark.jpg';
import salmonBowl from '../assets/images/tools/salmon-bowl.jpg';
import eggs from '../assets/images/tools/eggs.jpg';
import shake from '../assets/images/tools/shake.jpg';
import foodSpread from '../assets/images/tools/food-spread.jpg';
import stairs from '../assets/images/tools/stairs.jpg';
import runner from '../assets/images/tools/runner.jpg';
import back from '../assets/images/tools/back.jpg';
import gymBw from '../assets/images/tools/gym-bw.jpg';
import squat from '../assets/images/tools/squat.jpg';
import press from '../assets/images/tools/press.jpg';
import yoga from '../assets/images/tools/yoga.jpg';
import classImg from '../assets/images/tools/class.jpg';
import plank from '../assets/images/tools/plank.jpg';
import planner from '../assets/images/tools/planner.jpg';
import floor from '../assets/images/tools/floor.jpg';

export const TOOL_IMG = { fruits, plates, curry, jarSalad, greens, riceBowl, barbell, waterBottle, waterGlass, saladDark, salmonBowl, eggs, shake, foodSpread, stairs, runner, back, gymBw, squat, press, yoga, classImg, plank, planner, floor };

type Img = { src: ImageMetadata; alt: string };
export interface ToolMedia {
  images: [Img, Img, Img];           // [main, front-left, front-right]
  chips: string[];                   // floating emoji chips in the hero
  facts: { e: string; t: string }[]; // "did you know" ribbon + cards
  sample: string;                    // example result shown on hub cards
}

const i = (src: ImageMetadata, alt: string): Img => ({ src, alt });

export const TOOL_MEDIA: Record<string, ToolMedia> = {
  'transformation-timeline': {
    images: [i(runner, 'Runner silhouetted at sunrise'), i(stairs, 'Running shoes climbing concrete stairs'), i(planner, 'Writing a plan in a notebook')],
    chips: ['📅 Goal date', '📉 0.75%/week', '🏁 4 phases'],
    facts: [{ e: '📉', t: 'A sustainable pace is about 0.5–1% of body weight per week.' }, { e: '🗓️', t: 'Plans run in 4 phases: Foundation, Build, Peak, Maintain.' }, { e: '⚖️', t: 'Weigh in 3–7 times a week and follow the weekly average.' }],
    sample: '📅 22 Jan 2027',
  },
  'meal-plan-generator': {
    images: [i(curry, 'Indian curry in a pan with naan'), i(salmonBowl, 'Salmon and vegetable bowl'), i(jarSalad, 'Layered salad in a jar')],
    chips: ['🥗 Veg', '🍳 Egg', '🍗 Non-veg', '🌱 Vegan'],
    facts: [{ e: '🍛', t: 'Built from home-style Indian and global dishes.' }, { e: '🔀', t: 'Shuffle for a new day of meals in one tap.' }, { e: '🫒', t: '1 tablespoon of oil adds about 120 kcal. Measure it.' }],
    sample: '🥗 113 g protein',
  },
  'workout-split-builder': {
    images: [i(squat, 'Woman squatting with a barbell'), i(press, 'Man on a chest press machine'), i(barbell, 'Lifter gripping a barbell')],
    chips: ['🏋️ Gym', '🏠 Home', '💪 Muscle', '🔥 Fat loss'],
    facts: [{ e: '🔁', t: 'Training each muscle about twice a week works well for most people.' }, { e: '📈', t: 'Add weight or a rep when you hit the top of your range.' }, { e: '😴', t: 'Sleep 7–9 hours. Recovery is where you adapt.' }],
    sample: '🗓️ Upper / Lower',
  },
  'fitness-personality-quiz': {
    images: [i(classImg, 'Group fitness class with arms raised'), i(yoga, 'Downward dog yoga pose in black and white'), i(floor, 'Woman training with suspension straps')],
    chips: ['⚡ 60 sec', '🧩 5 types', '📤 Shareable'],
    facts: [{ e: '😊', t: 'People stick with exercise they enjoy. Match your style.' }, { e: '🧩', t: 'Most people are a mix of two personalities.' }, { e: '🔄', t: 'Retake it whenever your life or goals change.' }],
    sample: '✨ The Builder',
  },
  'calorie-calculator': {
    images: [i(foodSpread, 'Colourful spread of fruit, vegetables and dishes'), i(plates, 'Plates of grilled food and salads'), i(fruits, 'Fruit bowl on a dark table')],
    chips: ['🔥 TDEE', '⚖️ BMR', '🍽️ kcal/day'],
    facts: [{ e: '⚖️', t: 'About 7,700 kcal is a common estimate for 1 kg of body weight.' }, { e: '🫒', t: '1 tablespoon of oil is about 120 kcal.' }, { e: '🚶', t: 'Daily steps often burn more than a single workout.' }],
    sample: '🔥 2,540 kcal',
  },
  'macro-calculator': {
    images: [i(saladDark, 'Dark bowl of salad with nuts'), i(riceBowl, 'Rice dish with lemon in a pan'), i(eggs, 'Bowl of brown eggs held in two hands')],
    chips: ['🥩 Protein', '🍚 Carbs', '🥑 Fats'],
    facts: [{ e: '🥩', t: 'Protein and carbs give 4 kcal per gram.' }, { e: '🥑', t: 'Fat gives 9 kcal per gram.' }, { e: '🎯', t: 'Being within about 10 g of your protein is close enough.' }],
    sample: '🥩 115 g P',
  },
  'protein-intake-calculator': {
    images: [i(eggs, 'Bowl of brown eggs'), i(shake, 'Pink protein shake with cinnamon'), i(salmonBowl, 'Salmon bowl with vegetables')],
    chips: ['🥚 6 g/egg', '🧀 Paneer', '🥛 Whey'],
    facts: [{ e: '🥚', t: 'One egg has about 6 g of protein.' }, { e: '🧀', t: '100 g of paneer has about 18 g of protein.' }, { e: '🍽️', t: 'Spread protein over 3–5 meals of 20–40 g each.' }],
    sample: '🥚 137 g/day',
  },
  'bmi-calculator': {
    images: [i(gymBw, 'Man training in a gym, black and white'), i(back, 'Woman with defined back muscles'), i(stairs, 'Running shoes on stairs')],
    chips: ['📏 Height', '⚖️ Weight', '✅ 18.5–24.9'],
    facts: [{ e: '📏', t: 'BMI = weight (kg) ÷ height (m)².' }, { e: '🧬', t: 'BMI cannot tell muscle from fat.' }, { e: '🌏', t: 'Risk can rise at lower BMIs in South Asian adults.' }],
    sample: '📏 BMI 24.9',
  },
  'body-fat-calculator': {
    images: [i(back, 'Woman with defined back muscles'), i(gymBw, 'Man training, black and white'), i(plank, 'Woman holding a plank')],
    chips: ['📐 Tape only', '💪 Lean mass', '🎯 ACE scale'],
    facts: [{ e: '📐', t: 'All you need is a soft tape measure.' }, { e: '🗓️', t: 'Re-measure every 2–4 weeks under the same conditions.' }, { e: '💪', t: 'Lean mass is everything that isn’t fat.' }],
    sample: '📐 18.6 %',
  },
  'ideal-weight-calculator': {
    images: [i(runner, 'Runner at sunrise'), i(floor, 'Woman training on the floor'), i(fruits, 'Fruit bowl')],
    chips: ['📚 4 formulas', '📏 By height', '🎯 Range'],
    facts: [{ e: '📚', t: 'The classic formulas date from 1964 to 1983.' }, { e: '🎯', t: 'Aim for a 3–4 kg range, not a single number.' }, { e: '💪', t: 'Muscular people can be healthy above the range.' }],
    sample: '🎯 53–72 kg',
  },
  'water-intake-calculator': {
    images: [i(waterGlass, 'Water pouring into a glass'), i(waterBottle, 'Plastic water bottle backlit'), i(greens, 'Fresh salad with pomegranate')],
    chips: ['💧 Litres', '🥤 Glasses', '☀️ Climate'],
    facts: [{ e: '🥗', t: 'Food provides around 20% of your daily water.' }, { e: '🟡', t: 'Pale yellow urine is a good sign you’re hydrated.' }, { e: '🏃', t: 'Add about 350 ml for every 30 minutes of training.' }],
    sample: '💧 2.9 L',
  },
  'one-rep-max-calculator': {
    images: [i(barbell, 'Lifter gripping a barbell'), i(squat, 'Barbell squat'), i(press, 'Chest press machine')],
    chips: ['🏋️ 1RM', '📊 % table', '🔩 2.5 kg plates'],
    facts: [{ e: '🎯', t: 'Most accurate from sets of 2–8 reps.' }, { e: '📊', t: 'Averages the Epley and Brzycki formulas.' }, { e: '🛡️', t: 'Estimate instead of testing a risky max.' }],
    sample: '🏋️ 94.5 kg',
  },
};
