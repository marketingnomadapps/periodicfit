/** Exercise library for the Workout Split Builder, by movement pattern and equipment. */
export type Equip = 'gym' | 'dumbbells' | 'bodyweight';
export type Pattern = 'squat' | 'hinge' | 'hpush' | 'vpush' | 'hpull' | 'vpull' | 'lunge' | 'core' | 'arms' | 'calves' | 'cond' | 'glute';

export const EX: Record<Pattern, Record<Equip, string[]>> = {
  squat: { gym: ['Back squat', 'Leg press', 'Hack squat'], dumbbells: ['Goblet squat', 'DB front squat'], bodyweight: ['Bodyweight squat', 'Tempo squat', 'Jump squat'] },
  hinge: { gym: ['Romanian deadlift', 'Deadlift', 'Hip hinge machine'], dumbbells: ['DB Romanian deadlift', 'DB sumo deadlift'], bodyweight: ['Single-leg hip hinge', 'Hip bridge march'] },
  hpush: { gym: ['Bench press', 'Incline DB press', 'Chest press machine'], dumbbells: ['DB floor press', 'DB bench press'], bodyweight: ['Push-up', 'Incline push-up', 'Decline push-up'] },
  vpush: { gym: ['Overhead press', 'Seated DB press'], dumbbells: ['DB shoulder press', 'Arnold press'], bodyweight: ['Pike push-up', 'Wall walk'] },
  hpull: { gym: ['Seated cable row', 'Barbell row', 'Chest-supported row'], dumbbells: ['One-arm DB row', 'DB bent-over row'], bodyweight: ['Inverted row (table)', 'Towel row'] },
  vpull: { gym: ['Lat pulldown', 'Pull-up', 'Assisted pull-up'], dumbbells: ['DB pullover', 'Band pulldown'], bodyweight: ['Doorway pull-up bar', 'Band lat pulldown'] },
  lunge: { gym: ['Walking lunge', 'Bulgarian split squat'], dumbbells: ['DB reverse lunge', 'DB step-up'], bodyweight: ['Reverse lunge', 'Split squat'] },
  glute: { gym: ['Hip thrust', 'Cable kickback'], dumbbells: ['DB hip thrust', 'DB glute bridge'], bodyweight: ['Glute bridge', 'Single-leg glute bridge'] },
  core: { gym: ['Cable crunch', 'Hanging knee raise'], dumbbells: ['DB side bend', 'Weighted dead bug'], bodyweight: ['Plank', 'Dead bug', 'Side plank'] },
  arms: { gym: ['Cable curl', 'Rope pushdown'], dumbbells: ['DB curl', 'Overhead DB extension'], bodyweight: ['Close-grip push-up', 'Bench dip'] },
  calves: { gym: ['Standing calf raise'], dumbbells: ['DB calf raise'], bodyweight: ['Single-leg calf raise'] },
  cond: { gym: ['Bike intervals 10×30 s', 'Rower 8×250 m'], dumbbells: ['DB complex 5 rounds', 'Farmer carry 6×40 m'], bodyweight: ['Burpee EMOM 10 min', 'Mountain climber intervals'] },
};

/** Day templates by days-per-week (patterns in order). */
export const SPLITS: Record<number, { name: string; patterns: Pattern[] }[]> = {
  2: [
    { name: 'Full body A', patterns: ['squat', 'hpush', 'hpull', 'hinge', 'core'] },
    { name: 'Full body B', patterns: ['hinge', 'vpush', 'vpull', 'lunge', 'core'] },
  ],
  3: [
    { name: 'Full body A', patterns: ['squat', 'hpush', 'hpull', 'glute', 'core'] },
    { name: 'Full body B', patterns: ['hinge', 'vpush', 'vpull', 'lunge', 'arms'] },
    { name: 'Full body C', patterns: ['squat', 'hpush', 'hpull', 'hinge', 'core'] },
  ],
  4: [
    { name: 'Upper A', patterns: ['hpush', 'hpull', 'vpush', 'vpull', 'arms'] },
    { name: 'Lower A', patterns: ['squat', 'hinge', 'lunge', 'calves', 'core'] },
    { name: 'Upper B', patterns: ['vpush', 'vpull', 'hpush', 'hpull', 'arms'] },
    { name: 'Lower B', patterns: ['hinge', 'squat', 'glute', 'calves', 'core'] },
  ],
  5: [
    { name: 'Push', patterns: ['hpush', 'vpush', 'hpush', 'arms'] },
    { name: 'Pull', patterns: ['vpull', 'hpull', 'hpull', 'arms'] },
    { name: 'Legs', patterns: ['squat', 'hinge', 'lunge', 'calves'] },
    { name: 'Upper', patterns: ['hpush', 'hpull', 'vpush', 'vpull'] },
    { name: 'Lower', patterns: ['hinge', 'squat', 'glute', 'core'] },
  ],
  6: [
    { name: 'Push A', patterns: ['hpush', 'vpush', 'hpush', 'arms'] },
    { name: 'Pull A', patterns: ['vpull', 'hpull', 'hpull', 'arms'] },
    { name: 'Legs A', patterns: ['squat', 'hinge', 'lunge', 'calves'] },
    { name: 'Push B', patterns: ['vpush', 'hpush', 'hpush', 'arms'] },
    { name: 'Pull B', patterns: ['hpull', 'vpull', 'hpull', 'core'] },
    { name: 'Legs B', patterns: ['hinge', 'squat', 'glute', 'calves'] },
  ],
};

/** Which weekdays to train for N days. 0 = Monday. */
export const SCHEDULE: Record<number, number[]> = { 2: [0, 3], 3: [0, 2, 4], 4: [0, 1, 3, 4], 5: [0, 1, 2, 4, 5], 6: [0, 1, 2, 3, 4, 5] };
