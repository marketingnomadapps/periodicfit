/** Fitness Personality Quiz: questions, scoring and personas. */
export type Persona = 'builder' | 'burner' | 'flow' | 'home' | 'fuel';

export const QUESTIONS: { q: string; options: { label: string; icon: string; score: Partial<Record<Persona, number>> }[] }[] = [
  { q: 'Your ideal workout feels like…', options: [
    { label: 'Lifting something heavy', icon: 'dumbbell', score: { builder: 3 } },
    { label: 'Sweating hard, heart pumping', icon: 'flame', score: { burner: 3 } },
    { label: 'Stretching, breathing, slowing down', icon: 'flower-2', score: { flow: 3 } },
    { label: 'Quick and done, at home', icon: 'house', score: { home: 3 } },
  ] },
  { q: 'Your #1 goal for the next 3 months?', options: [
    { label: 'Build muscle and shape', icon: 'biceps-flexed', score: { builder: 3 } },
    { label: 'Lose fat', icon: 'scale', score: { burner: 2, fuel: 2 } },
    { label: 'Move without aches', icon: 'move', score: { flow: 3 } },
    { label: 'Finally stay consistent', icon: 'calendar-check', score: { home: 2, fuel: 1 } },
  ] },
  { q: 'Where do you feel most comfortable training?', options: [
    { label: 'In the gym', icon: 'dumbbell', score: { builder: 2, burner: 1 } },
    { label: 'Outdoors or in a class', icon: 'sun', score: { burner: 3 } },
    { label: 'On a yoga mat', icon: 'flower-2', score: { flow: 3 } },
    { label: 'In my living room', icon: 'house', score: { home: 3 } },
  ] },
  { q: 'What usually derails your progress?', options: [
    { label: 'Food, cravings, eating out', icon: 'utensils', score: { fuel: 3 } },
    { label: 'Getting bored', icon: 'repeat', score: { burner: 2 } },
    { label: 'Stiffness or small injuries', icon: 'activity', score: { flow: 2, builder: 1 } },
    { label: 'No time', icon: 'clock', score: { home: 3 } },
  ] },
  { q: 'How long can you train on a normal day?', options: [
    { label: '60+ minutes', icon: 'timer', score: { builder: 2 } },
    { label: '40–50 minutes', icon: 'timer', score: { burner: 2, builder: 1 } },
    { label: '30 minutes', icon: 'timer', score: { flow: 1, fuel: 1 } },
    { label: '20 minutes, max', icon: 'timer', score: { home: 2 } },
  ] },
  { q: 'Be honest: your food habits are…', options: [
    { label: 'Fuel for performance', icon: 'zap', score: { builder: 1, burner: 1 } },
    { label: 'Portions get away from me', icon: 'pizza', score: { fuel: 3 } },
    { label: 'Mostly balanced and mindful', icon: 'leaf', score: { flow: 2 } },
    { label: 'I snack when I am busy', icon: 'cookie', score: { fuel: 2, home: 1 } },
  ] },
];

export const PERSONAS: Record<Persona, { name: string; tagline: string; about: string; traits: string[]; service: string; serviceName: string; split: string }> = {
  builder: { name: 'The Builder', tagline: 'Strong is your love language.', about: 'You love progress you can measure: heavier weights, bigger lifts, a stronger frame. Structured strength training and enough protein are your superpowers.', traits: ['Loves progressive overload', 'Motivated by numbers', 'Thrives on structure'], service: 'muscle-gain-program', serviceName: 'Muscle Gain Program', split: '4-day Upper / Lower' },
  burner: { name: 'The Burner', tagline: 'Energy in, sweat out.', about: 'You come alive when your heart rate climbs. Mixed strength and conditioning keeps you engaged, and a smart deficit turns that energy into fat loss.', traits: ['High energy', 'Needs variety', 'Loves a challenge'], service: 'weight-loss-program', serviceName: 'Weight Loss Program', split: '3-day Full Body + conditioning' },
  flow: { name: 'The Flow Seeker', tagline: 'Move well, feel well.', about: 'You care about how your body feels, not just how it looks. Mobility, yoga and controlled strength will keep you pain-free and moving for decades.', traits: ['Mindful mover', 'Values recovery', 'Plays the long game'], service: 'yoga-mobility', serviceName: 'Yoga & Mobility', split: '3 mobility + 2 strength days' },
  home: { name: 'The Home Hero', tagline: 'Short sessions. Big consistency.', about: 'Life is busy, so your workouts need to be efficient and close by. Twenty to forty minutes at home, done consistently, beats a perfect gym plan you never follow.', traits: ['Time-efficient', 'Self-starter', 'Consistency over intensity'], service: 'home-workout-plans', serviceName: 'Home Workout Plans', split: '4 × 30-minute home sessions' },
  fuel: { name: 'The Fuel Strategist', tagline: 'Your kitchen is your gym.', about: 'Your biggest lever is food. A plan built around meals you already love, with simple portions and swaps, will move the needle faster than any extra workout.', traits: ['Nutrition-first', 'Benefits from structure', 'Loves good food'], service: 'diet-plans', serviceName: 'Custom Diet Plans', split: '3-day Full Body' },
};
