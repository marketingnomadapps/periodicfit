/**
 * Meal database for the Meal Plan Generator. Values are APPROXIMATE per serving
 * (home-style recipes) and meant for general guidance. TODO: dietitian to review.
 * diet = the strictest diet the meal fits: vegan ⊂ veg ⊂ egg ⊂ nonveg.
 */
export type Diet = 'vegan' | 'veg' | 'egg' | 'nonveg';
export type Slot = 'breakfast' | 'lunch' | 'snack' | 'dinner';
export type Cuisine = 'indian' | 'global';
export interface Meal { name: string; serving: string; kcal: number; p: number; c: number; f: number; diet: Diet; cuisine: Cuisine; slot: Slot }

export const DIET_RANK: Record<Diet, number> = { vegan: 0, veg: 1, egg: 2, nonveg: 3 };

const m = (slot: Slot, cuisine: Cuisine, diet: Diet, name: string, serving: string, kcal: number, p: number, c: number, f: number): Meal =>
  ({ slot, cuisine, diet, name, serving, kcal, p, c, f });

export const MEALS: Meal[] = [
  // Indian · breakfast
  m('breakfast', 'indian', 'vegan', 'Moong dal chilla', '2 chillas + mint chutney', 320, 18, 42, 8),
  m('breakfast', 'indian', 'vegan', 'Vegetable poha', '1.5 cups + roasted peanuts', 350, 9, 55, 10),
  m('breakfast', 'indian', 'vegan', 'Idli sambar', '4 idlis + 1 cup sambar', 360, 13, 66, 4),
  m('breakfast', 'indian', 'vegan', 'Vegetable upma', '1.5 cups', 330, 9, 50, 10),
  m('breakfast', 'indian', 'veg', 'Paneer bhurji + roti', '100 g paneer + 2 multigrain rotis', 480, 26, 40, 22),
  m('breakfast', 'indian', 'veg', 'Besan cheela + curd', '2 cheelas + 100 g curd', 360, 19, 36, 14),
  m('breakfast', 'indian', 'egg', 'Masala omelette + toast', '3 eggs + 2 slices wholegrain toast', 420, 24, 28, 22),
  // Indian · lunch
  m('lunch', 'indian', 'vegan', 'Rajma chawal', '1 cup rajma + 1 cup rice + salad', 520, 20, 88, 8),
  m('lunch', 'indian', 'vegan', 'Chana masala + roti', '1 cup chana + 2 rotis + salad', 540, 20, 80, 14),
  m('lunch', 'indian', 'vegan', 'Dal tadka thali', '1 cup dal + jeera rice + sabzi', 520, 18, 82, 12),
  m('lunch', 'indian', 'veg', 'Paneer tikka plate', '150 g paneer tikka + 2 rotis + raita', 620, 36, 48, 30),
  m('lunch', 'indian', 'egg', 'Egg curry + rice', '2 eggs in curry + 1 cup rice + salad', 540, 20, 64, 20),
  m('lunch', 'indian', 'nonveg', 'Chicken curry + roti', '150 g chicken + 2 rotis + salad', 580, 42, 46, 22),
  m('lunch', 'indian', 'nonveg', 'Grilled fish thali', '150 g fish + brown rice + sabzi', 520, 38, 55, 14),
  // Indian · snack
  m('snack', 'indian', 'vegan', 'Roasted chana + fruit', '40 g chana + 1 fruit', 230, 10, 38, 4),
  m('snack', 'indian', 'vegan', 'Sprouts chaat', '1 cup with onion, tomato, lemon', 180, 11, 30, 2),
  m('snack', 'indian', 'veg', 'Curd + fruit', '200 g curd + 1 fruit', 220, 12, 30, 6),
  m('snack', 'indian', 'veg', 'Chaas + almonds', '1 glass buttermilk + 20 almonds', 210, 8, 10, 15),
  m('snack', 'indian', 'egg', 'Boiled eggs + fruit', '2 eggs + 1 fruit', 230, 13, 20, 10),
  // Indian · dinner
  m('dinner', 'indian', 'vegan', 'Tofu bhurji + roti', '150 g tofu + 2 rotis + salad', 480, 28, 42, 20),
  m('dinner', 'indian', 'vegan', 'Mixed veg + dal + roti', '1 cup sabzi + 1 cup dal + 2 rotis', 450, 17, 66, 12),
  m('dinner', 'indian', 'veg', 'Palak paneer + roti', '1 cup palak paneer + 2 rotis', 520, 24, 44, 26),
  m('dinner', 'indian', 'veg', 'Moong dal khichdi + curd', '1.5 cups khichdi + 100 g curd', 450, 18, 70, 10),
  m('dinner', 'indian', 'egg', 'Egg bhurji + roti', '3 eggs + 2 rotis + salad', 470, 24, 40, 22),
  m('dinner', 'indian', 'nonveg', 'Tandoori chicken plate', '200 g chicken + salad + 1 roti', 480, 50, 24, 18),
  // Global · breakfast
  m('breakfast', 'global', 'vegan', 'Overnight oats', 'Oats, soy milk, berries, chia', 380, 15, 58, 10),
  m('breakfast', 'global', 'vegan', 'Tofu scramble toast', '150 g tofu + 2 slices wholegrain', 380, 24, 30, 18),
  m('breakfast', 'global', 'veg', 'Greek yogurt parfait', '250 g yogurt + granola + fruit', 400, 26, 50, 10),
  m('breakfast', 'global', 'veg', 'Protein smoothie', 'Banana, peanut butter, milk, whey', 420, 32, 46, 12),
  m('breakfast', 'global', 'egg', 'Eggs, toast & avocado', '3 scrambled eggs + toast + ½ avocado', 480, 24, 30, 28),
  // Global · lunch
  m('lunch', 'global', 'vegan', 'Quinoa chickpea bowl', 'Quinoa, chickpeas, veg, tahini', 540, 20, 70, 20),
  m('lunch', 'global', 'vegan', 'Lentil soup + bread', '2 bowls lentil soup + wholegrain roll', 460, 22, 68, 10),
  m('lunch', 'global', 'veg', 'Greek salad + pita', 'Feta, veg, olives, wholegrain pita', 520, 22, 48, 26),
  m('lunch', 'global', 'egg', 'Veg egg fried rice', '2 eggs + 1.5 cups rice + veg', 520, 20, 70, 16),
  m('lunch', 'global', 'nonveg', 'Chicken rice bowl', '150 g chicken + rice + roasted veg', 580, 44, 62, 14),
  m('lunch', 'global', 'nonveg', 'Tuna wrap + salad', 'Wholegrain wrap, tuna, greens', 480, 34, 46, 16),
  // Global · snack
  m('snack', 'global', 'vegan', 'Apple + peanut butter', '1 apple + 1 tbsp peanut butter', 200, 5, 26, 9),
  m('snack', 'global', 'vegan', 'Hummus + veggie sticks', '60 g hummus + carrots, cucumber', 200, 7, 22, 9),
  m('snack', 'global', 'veg', 'Cottage cheese + fruit', '150 g cottage cheese + pineapple', 200, 18, 18, 6),
  m('snack', 'global', 'veg', 'Protein shake', '1 scoop whey + 250 ml milk', 230, 30, 14, 5),
  m('snack', 'global', 'egg', 'Eggs + cherry tomatoes', '2 boiled eggs + tomatoes', 170, 13, 5, 10),
  // Global · dinner
  m('dinner', 'global', 'vegan', 'Tofu stir-fry + rice', '150 g tofu + veg + 1 cup rice', 520, 28, 62, 16),
  m('dinner', 'global', 'vegan', 'Bean chili + rice', '1.5 cups chili + 1 cup rice', 520, 24, 82, 8),
  m('dinner', 'global', 'veg', 'Veggie pasta + ricotta', 'Wholewheat pasta, veg, ricotta', 560, 24, 76, 18),
  m('dinner', 'global', 'egg', 'Shakshuka + bread', '3 eggs in tomato sauce + bread', 480, 24, 40, 24),
  m('dinner', 'global', 'nonveg', 'Salmon, potatoes & greens', '150 g salmon + potatoes + greens', 560, 38, 42, 24),
  m('dinner', 'global', 'nonveg', 'Chicken noodle stir-fry', '150 g chicken + noodles + veg', 560, 42, 58, 16),
];

/** Share of daily calories per slot, by number of meals. */
export const SPLITS: Record<number, { slot: Slot; label: string; share: number }[]> = {
  3: [{ slot: 'breakfast', label: 'Breakfast', share: 0.3 }, { slot: 'lunch', label: 'Lunch', share: 0.4 }, { slot: 'dinner', label: 'Dinner', share: 0.3 }],
  4: [{ slot: 'breakfast', label: 'Breakfast', share: 0.25 }, { slot: 'lunch', label: 'Lunch', share: 0.35 }, { slot: 'snack', label: 'Snack', share: 0.1 }, { slot: 'dinner', label: 'Dinner', share: 0.3 }],
  5: [{ slot: 'breakfast', label: 'Breakfast', share: 0.25 }, { slot: 'snack', label: 'Mid-morning', share: 0.1 }, { slot: 'lunch', label: 'Lunch', share: 0.3 }, { slot: 'snack', label: 'Evening snack', share: 0.1 }, { slot: 'dinner', label: 'Dinner', share: 0.25 }],
};
