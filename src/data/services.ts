/**
 * Service page content. DUMMY COPY for design review.
 * TODO: client to review every line. Testimonials are placeholders and must be replaced with real,
 * consented client reviews before launch (or removed).
 */

export interface ServiceContent {
  slug: string;
  eyebrow: string;
  headline: [string, string]; // second part is highlighted
  promise: string;
  bigStatement: string; // shown over the full-screen hero image
  who: { icon: string; title: string; text: string }[];
  features: { icon: string; title: string; text: string }[];
  steps: { title: string; text: string }[];
  sample: { kind: 'workout' | 'meals'; title: string; note: string; days: { day: string; title: string; items: string[] }[] };
  testimonials: { quote: string; name: string; detail: string }[];
  faq: { q: string; a: string }[];
  blogCategory: string;
}

const STEPS_DEFAULT = [
  { title: 'Tell us about you', text: 'Fill a short form with your goal, schedule, food preferences and any injuries.' },
  { title: 'Free consultation call', text: 'A 15–20 minute video or WhatsApp call to understand your history and set realistic targets.' },
  { title: 'Get your custom plan', text: 'Your plan arrives in your inbox and app within 48 hours, built around your routine.' },
  { title: 'Check in every week', text: 'Send progress, ask questions and get adjustments so your plan keeps working.' },
];

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  'online-personal-training': {
    slug: 'online-personal-training',
    eyebrow: '1:1 online coaching',
    headline: ['A coach in your pocket.', 'Results in the mirror.'],
    promise: 'A real coach writes your program, reviews your form on video and adjusts your training every single week.',
    bigStatement: 'Every rep planned. Every week reviewed.',
    who: [
      { icon: 'sprout', title: 'Beginners', text: 'You want to learn the basics safely without guessing in the gym.' },
      { icon: 'trending-up', title: 'Stuck lifters', text: 'Your progress stalled and random workouts stopped working.' },
      { icon: 'briefcase', title: 'Busy professionals', text: 'You have 3–4 hours a week and need every session to count.' },
      { icon: 'rotate-ccw', title: 'Comebacks', text: 'You are returning after a break, an injury or a busy season.' },
    ],
    features: [
      { icon: 'clipboard-list', title: 'Custom training program', text: 'Built for your equipment, schedule and goal, never a template.' },
      { icon: 'video', title: 'Video form checks', text: 'Send clips of your lifts and get technique notes from your coach.' },
      { icon: 'calendar-check', title: 'Weekly check-ins', text: 'Review progress, energy and sleep, then adjust the next week.' },
      { icon: 'message-circle', title: 'WhatsApp support', text: 'Ask questions between sessions and get answers within a day.' },
      { icon: 'line-chart', title: 'Progress tracking', text: 'Strength, measurements and photos tracked in one place.' },
      { icon: 'utensils', title: 'Nutrition guidance', text: 'Simple calorie and protein targets to support your training.' },
    ],
    steps: STEPS_DEFAULT,
    sample: {
      kind: 'workout', title: 'A sample training week', note: 'Example 4-day upper/lower split for an intermediate lifter.',
      days: [
        { day: 'Mon', title: 'Upper strength', items: ['Bench press 4×6', 'Barbell row 4×8', 'Overhead press 3×8'] },
        { day: 'Tue', title: 'Lower strength', items: ['Back squat 4×6', 'Romanian deadlift 3×8', 'Walking lunge 3×10'] },
        { day: 'Wed', title: 'Active recovery', items: ['30 min walk', 'Mobility flow', '8k steps'] },
        { day: 'Thu', title: 'Upper volume', items: ['Incline DB press 4×10', 'Lat pulldown 4×10', 'Lateral raise 3×15'] },
        { day: 'Fri', title: 'Lower volume', items: ['Leg press 4×12', 'Hip thrust 4×10', 'Leg curl 3×12'] },
        { day: 'Sat', title: 'Conditioning', items: ['Intervals 10×30s', 'Core circuit', 'Stretch'] },
        { day: 'Sun', title: 'Rest', items: ['Sleep 7–9 h', 'Light walk', 'Weekly check-in'] },
      ],
    },
    testimonials: [ // TODO: placeholder testimonials
      { quote: 'I finally understand what I am doing in the gym. My squat went up 30 kg in four months.', name: 'Aarav S.', detail: 'Strength client, 16 weeks' },
      { quote: 'The weekly check-ins kept me honest. First program I have ever finished.', name: 'Meera K.', detail: 'Busy professional, 12 weeks' },
      { quote: 'Form videos fixed my back pain on deadlifts within two weeks.', name: 'Rohan P.', detail: 'Comeback client, 10 weeks' },
    ],
    faq: [
      { q: 'Is online personal training as effective as in person?', a: 'For most people, yes. You get a custom program, form feedback by video and weekly accountability. Many clients train more consistently online because the plan fits their schedule.' },
      { q: 'Do I need a gym?', a: 'No. Your coach can program for a full gym, a home setup or bodyweight only.' },
      { q: 'How often will I talk to my coach?', a: 'You get a structured weekly check-in plus WhatsApp support for questions between sessions.' },
      { q: 'Are live video sessions included?', a: 'Live sessions are available on selected plans. Your coach will explain the options on your free call.' },
      { q: 'I have an injury. Can I still join?', a: 'Tell us during the consultation. We may ask for clearance from your doctor or physiotherapist and will program around it.' },
      { q: 'How long until I see results?', a: 'Most clients feel stronger within 3–4 weeks. Visible changes usually take 8–12 weeks of consistent work.' },
    ],
    blogCategory: 'Workouts',
  },

  'diet-plans': {
    slug: 'diet-plans',
    eyebrow: 'Custom diet plans',
    headline: ['Food you love.', 'Built for your goal.'],
    promise: 'A meal plan designed around your culture, kitchen and budget, so eating well feels normal, not like a punishment.',
    bigStatement: 'No crash diets. Just your food, done right.',
    who: [
      { icon: 'leaf', title: 'Vegetarians & vegans', text: 'You need enough protein without eating the same thing daily.' },
      { icon: 'scale', title: 'Fat loss seekers', text: 'You want a calorie deficit that does not leave you starving.' },
      { icon: 'chef-hat', title: 'Home cooks', text: 'You want recipes with everyday ingredients, not expensive superfoods.' },
      { icon: 'clock', title: 'Short on time', text: 'You need quick meals and a simple weekly prep routine.' },
    ],
    features: [
      { icon: 'salad', title: 'Fully custom meal plan', text: 'Calories and macros set for your body, activity and goal.' },
      { icon: 'globe', title: 'Your cuisine, your culture', text: 'Indian, continental, Asian or mixed. Your favourite foods stay in.' },
      { icon: 'shopping-cart', title: 'Weekly grocery list', text: 'One list for the week so shopping takes minutes, not hours.' },
      { icon: 'repeat', title: 'Easy swaps', text: 'Swap any meal for an equivalent option when life happens.' },
      { icon: 'refresh-cw', title: 'Monthly updates', text: 'Your plan changes as your weight, goal and routine change.' },
      { icon: 'message-circle', title: 'Chat support', text: 'Ask about eating out, festivals or travel and get quick answers.' },
    ],
    steps: STEPS_DEFAULT,
    sample: {
      kind: 'meals', title: 'A sample week of breakfasts', note: 'Example vegetarian fat-loss plan, about 1,800 kcal per day.',
      days: [
        { day: 'Mon', title: 'Paneer bhurji wrap', items: ['Whole wheat roti', 'Paneer 100 g', '~420 kcal · 26 g protein'] },
        { day: 'Tue', title: 'Overnight oats', items: ['Oats, curd, berries', 'Chia seeds', '~380 kcal · 20 g protein'] },
        { day: 'Wed', title: 'Moong dal chilla', items: ['2 chillas', 'Mint chutney', '~350 kcal · 22 g protein'] },
        { day: 'Thu', title: 'Greek yogurt bowl', items: ['Yogurt 200 g', 'Fruit, nuts', '~360 kcal · 24 g protein'] },
        { day: 'Fri', title: 'Veg poha + sprouts', items: ['Poha 1 bowl', 'Sprout salad', '~400 kcal · 18 g protein'] },
        { day: 'Sat', title: 'Tofu scramble toast', items: ['Tofu 150 g', 'Multigrain toast', '~410 kcal · 27 g protein'] },
        { day: 'Sun', title: 'Besan cheela', items: ['2 cheelas', 'Curd 100 g', '~390 kcal · 21 g protein'] },
      ],
    },
    testimonials: [ // TODO: placeholder testimonials
      { quote: 'I lost 8 kg eating dal, roti and paneer. I never felt like I was on a diet.', name: 'Priya R.', detail: 'Vegetarian plan, 14 weeks' },
      { quote: 'The grocery list alone saved me hours every week.', name: 'Karan J.', detail: 'Busy parent, 10 weeks' },
      { quote: 'Finally a vegan plan with enough protein that I actually enjoy.', name: 'Sana T.', detail: 'Vegan plan, 12 weeks' },
    ],
    faq: [
      { q: 'Can the plan include my regional food?', a: 'Yes. Plans are built around the cuisine you already eat, from North and South Indian to continental and mixed diets.' },
      { q: 'Do you make vegetarian, eggetarian and vegan plans?', a: 'Yes, all three, plus non-vegetarian plans.' },
      { q: 'Will I need supplements?', a: 'Not necessarily. We prioritise whole foods and only suggest supplements like protein powder if they make your plan easier.' },
      { q: 'What if I eat out often?', a: 'We include restaurant and takeaway guidance so eating out fits into your week.' },
      { q: 'How often is the plan updated?', a: 'Monthly, or sooner if your progress or schedule changes.' },
      { q: 'I have diabetes or thyroid issues. Is this suitable?', a: 'Please choose an online dietitian consultation instead. Medical conditions need a qualified dietitian and your doctor’s input.' },
    ],
    blogCategory: 'Diet Plans',
  },

  'online-dietitian-consultation': {
    slug: 'online-dietitian-consultation',
    eyebrow: '1:1 dietitian consults',
    headline: ['Expert nutrition advice.', 'From your sofa.'],
    promise: 'Talk to a qualified dietitian on video, review your habits and medical history, and leave with a clear, realistic plan.',
    bigStatement: 'Real dietitians. Real conversations.',
    who: [
      { icon: 'stethoscope', title: 'Health conditions', text: 'PCOS, thyroid, diabetes or cholesterol and you need expert guidance.' },
      { icon: 'baby', title: 'Life stages', text: 'Pregnancy, postpartum or menopause nutrition questions.' },
      { icon: 'activity', title: 'Athletes', text: 'You need fuelling and recovery strategies for your sport.' },
      { icon: 'help-circle', title: 'Confused eaters', text: 'Conflicting advice online left you unsure what to eat.' },
    ],
    features: [
      { icon: 'video', title: '1:1 video consultation', text: 'A focused 45-minute session with a qualified dietitian.' },
      { icon: 'file-text', title: 'History & reports review', text: 'Share blood reports and medical history before your call.' },
      { icon: 'clipboard-list', title: 'Personalised action plan', text: 'Clear written recommendations within 48 hours.' },
      { icon: 'calendar-check', title: 'Follow-up session', text: 'Review progress and adjust after two to four weeks.' },
      { icon: 'shield-check', title: 'Private & confidential', text: 'Your health information is never shared.' },
      { icon: 'message-circle', title: 'Message support', text: 'Ask follow-up questions between sessions.' },
    ],
    steps: [
      { title: 'Book your consult', text: 'Pick a time and tell us what you want help with.' },
      { title: 'Share your details', text: 'Upload any reports and a short food diary before the call.' },
      { title: 'Video consultation', text: 'A 45-minute 1:1 session with your dietitian.' },
      { title: 'Plan & follow-up', text: 'Get your written plan, then a follow-up to fine-tune it.' },
    ],
    sample: {
      kind: 'meals', title: 'What a consult plan can look like', note: 'Example day for blood-sugar-friendly eating. Your plan will differ.',
      days: [
        { day: '07:00', title: 'Wake-up', items: ['Warm water', 'Soaked almonds', 'Short walk'] },
        { day: '08:30', title: 'Breakfast', items: ['Vegetable oats upma', 'Boiled egg or paneer', 'Low-GI focus'] },
        { day: '11:00', title: 'Mid-morning', items: ['Guava or apple', 'Buttermilk'] },
        { day: '13:30', title: 'Lunch', items: ['Multigrain roti', 'Dal + sabzi', 'Salad first'] },
        { day: '17:00', title: 'Evening', items: ['Roasted chana', 'Green tea'] },
        { day: '20:00', title: 'Dinner', items: ['Grilled fish or tofu', 'Sautéed veg', 'Small portion of rice'] },
        { day: '22:00', title: 'Wind down', items: ['No screens', '7–8 h sleep'] },
      ],
    },
    testimonials: [ // TODO: placeholder testimonials
      { quote: 'My dietitian explained my reports in plain language. My HbA1c improved at my next check-up.', name: 'Vikram N.', detail: 'Consultation + follow-up' },
      { quote: 'PCOS advice that actually fit my life. My cycles became more regular.', name: 'Ananya G.', detail: '3 consultations' },
      { quote: 'Clear, kind and practical. No fad rules.', name: 'Farah A.', detail: 'Postpartum nutrition' },
    ],
    faq: [
      { q: 'Who will I speak to?', a: 'A qualified dietitian from our team. Their credentials are listed on the coaches page.' },
      { q: 'How long is a consultation?', a: 'About 45 minutes for the first session and 20–30 minutes for follow-ups.' },
      { q: 'Can a dietitian help with medical conditions?', a: 'Yes, dietitians work with conditions like PCOS, diabetes and thyroid issues alongside your doctor. They do not replace medical treatment.' },
      { q: 'What do I need before the call?', a: 'Recent blood reports if you have them, a list of medicines and a 2–3 day food diary.' },
      { q: 'Is my information private?', a: 'Yes. Your health details are only seen by your dietitian and are never shared.' },
      { q: 'Do you offer follow-up packages?', a: 'Yes. Your dietitian will suggest a follow-up schedule on your first call.' },
    ],
    blogCategory: 'Nutrition',
  },

  'weight-loss-program': {
    slug: 'weight-loss-program',
    eyebrow: '12-week program',
    headline: ['Lose fat.', 'Keep it off.'],
    promise: 'Twelve weeks of strength training, daily movement and a sustainable calorie deficit, adjusted every week by your coach.',
    bigStatement: 'Slow is fast when it lasts.',
    who: [
      { icon: 'scale', title: 'Yo-yo dieters', text: 'You have lost weight before and gained it back.' },
      { icon: 'armchair', title: 'Desk workers', text: 'You sit most of the day and want more energy.' },
      { icon: 'heart', title: 'Health-first goals', text: 'Your doctor suggested losing some weight.' },
      { icon: 'calendar', title: 'Event deadlines', text: 'A wedding or holiday is coming and you want a real plan.' },
    ],
    features: [
      { icon: 'dumbbell', title: '3–4 strength sessions a week', text: 'Keep muscle while you lose fat so the scale drop is real.' },
      { icon: 'footprints', title: 'Daily step targets', text: 'Simple movement goals that burn more than most workouts.' },
      { icon: 'salad', title: 'Calorie-smart meal plan', text: 'A deficit you can sustain, with foods you enjoy.' },
      { icon: 'line-chart', title: 'Weekly progress review', text: 'Weight trend, waist and photos, not just the daily scale.' },
      { icon: 'moon', title: 'Sleep & stress habits', text: 'Small changes that make fat loss easier.' },
      { icon: 'flag', title: 'Maintenance phase', text: 'The last weeks teach you how to keep the results.' },
    ],
    steps: STEPS_DEFAULT,
    sample: {
      kind: 'workout', title: 'Week 1 of 12', note: 'Foundation phase. Volume and intensity build gradually.',
      days: [
        { day: 'Mon', title: 'Full body A', items: ['Goblet squat 3×10', 'DB row 3×10', 'Plank 3×30s'] },
        { day: 'Tue', title: 'Steps + core', items: ['8,000 steps', 'Dead bug 3×10', 'Side plank'] },
        { day: 'Wed', title: 'Full body B', items: ['Romanian deadlift 3×10', 'Push-up 3×8', 'Farmer carry'] },
        { day: 'Thu', title: 'Low-intensity cardio', items: ['30–40 min walk or cycle'] },
        { day: 'Fri', title: 'Full body C', items: ['Split squat 3×10', 'Lat pulldown 3×12', 'Bike intervals'] },
        { day: 'Sat', title: 'Fun movement', items: ['Sport, hike or dance', '45–60 min'] },
        { day: 'Sun', title: 'Rest & check-in', items: ['Weigh-in average', 'Progress photos'] },
      ],
    },
    testimonials: [ // TODO: placeholder testimonials
      { quote: 'Down 9 kg in 12 weeks and I still eat dinner with my family.', name: 'Neha V.', detail: '12-week program' },
      { quote: 'The step targets changed everything. I have kept the weight off for a year.', name: 'Arjun T.', detail: '12-week program + maintenance' },
      { quote: 'First time I lost weight without feeling weak.', name: 'Ritu S.', detail: '12-week program' },
    ],
    faq: [
      { q: 'How much weight will I lose?', a: 'A healthy target is about 0.5–1% of body weight per week. Results vary with starting point and consistency.' },
      { q: 'Do I need a gym?', a: 'No. The program works at home with a few dumbbells or at a gym.' },
      { q: 'Will I have to cut out carbs or rice?', a: 'No. Your plan includes the foods you enjoy in the right portions.' },
      { q: 'What happens after 12 weeks?', a: 'You finish with a maintenance phase and can continue coaching if you want a new goal.' },
      { q: 'I have a medical condition. Can I join?', a: 'Please tell us during your consultation. We may ask for doctor clearance first.' },
      { q: 'Is this suitable for beginners?', a: 'Yes. Week one starts with basics and builds gradually.' },
    ],
    blogCategory: 'Weight Loss',
  },

  'muscle-gain-program': {
    slug: 'muscle-gain-program',
    eyebrow: 'Hypertrophy program',
    headline: ['Build real muscle.', 'Not just a pump.'],
    promise: 'Progressive hypertrophy training paired with a high-protein surplus, so every week moves you closer to the physique you want.',
    bigStatement: 'Progressive overload, planned for you.',
    who: [
      { icon: 'user', title: 'Skinny beginners', text: 'You struggle to gain weight and want to fill out your frame.' },
      { icon: 'trending-up', title: 'Plateaued lifters', text: 'Your lifts stalled and your body stopped changing.' },
      { icon: 'target', title: 'Physique goals', text: 'You want a stronger chest, back, arms or glutes.' },
      { icon: 'leaf', title: 'Vegetarian gainers', text: 'You need enough protein without eating meat.' },
    ],
    features: [
      { icon: 'clipboard-list', title: 'Hypertrophy split', text: 'Volume and exercise selection planned in 4-week blocks.' },
      { icon: 'trending-up', title: 'Progressive overload tracking', text: 'Know exactly what to lift every session.' },
      { icon: 'beef', title: 'High-protein meal plan', text: 'Hit 1.6–2.2 g of protein per kg with foods you like.' },
      { icon: 'video', title: 'Technique reviews', text: 'Video feedback to train the target muscle, not your ego.' },
      { icon: 'battery-charging', title: 'Deload weeks', text: 'Planned recovery so you keep progressing for months.' },
      { icon: 'ruler', title: 'Measurement tracking', text: 'Arms, chest, waist and weight trends every week.' },
    ],
    steps: STEPS_DEFAULT,
    sample: {
      kind: 'workout', title: 'A sample hypertrophy week', note: 'Push / pull / legs, twice a week for intermediate lifters.',
      days: [
        { day: 'Mon', title: 'Push', items: ['Bench press 4×8', 'Incline DB press 3×10', 'Triceps dips 3×12'] },
        { day: 'Tue', title: 'Pull', items: ['Pull-up 4×6–8', 'Cable row 3×12', 'Hammer curl 3×12'] },
        { day: 'Wed', title: 'Legs', items: ['Squat 4×8', 'Leg press 3×12', 'Calf raise 4×15'] },
        { day: 'Thu', title: 'Push (volume)', items: ['OHP 4×10', 'Cable fly 3×15', 'Lateral raise 4×15'] },
        { day: 'Fri', title: 'Pull (volume)', items: ['RDL 4×10', 'Lat pulldown 3×12', 'Face pull 3×15'] },
        { day: 'Sat', title: 'Legs (volume)', items: ['Hack squat 4×12', 'Hip thrust 4×10', 'Leg curl 3×12'] },
        { day: 'Sun', title: 'Rest', items: ['Eat in surplus', 'Sleep 8 h'] },
      ],
    },
    testimonials: [ // TODO: placeholder testimonials
      { quote: 'Gained 6 kg in five months, mostly where I wanted it.', name: 'Ishaan D.', detail: 'Hypertrophy program, 20 weeks' },
      { quote: 'As a vegetarian I always under-ate protein. Not anymore.', name: 'Siddharth L.', detail: 'Muscle gain, 16 weeks' },
      { quote: 'My pull-ups went from 2 to 10.', name: 'Kavya M.', detail: 'Strength + hypertrophy' },
    ],
    faq: [
      { q: 'How fast can I build muscle?', a: 'Beginners can gain roughly 0.5–1 kg of lean mass a month. It slows as you get more experienced.' },
      { q: 'Do I need supplements?', a: 'No. Protein powder and creatine can help, but food comes first.' },
      { q: 'Will I get fat in a surplus?', a: 'We use a small, controlled surplus and adjust it weekly to keep fat gain low.' },
      { q: 'Can I build muscle at home?', a: 'Yes, with adjustable dumbbells and progressive programming, though a gym makes it easier.' },
      { q: 'How many days a week will I train?', a: 'Usually 4–6, depending on your schedule and recovery.' },
      { q: 'I am vegetarian. Can I still gain muscle?', a: 'Absolutely. Your plan uses dairy, legumes, soy and other protein sources.' },
    ],
    blogCategory: 'Muscle Building',
  },

  'home-workout-plans': {
    slug: 'home-workout-plans',
    eyebrow: 'No gym needed',
    headline: ['Your living room.', 'Your gym.'],
    promise: 'Structured home workouts using your bodyweight, bands or a pair of dumbbells, with real progression every week.',
    bigStatement: 'No commute. No excuses. Just progress.',
    who: [
      { icon: 'house', title: 'Home lovers', text: 'You prefer training privately at home.' },
      { icon: 'clock', title: 'Tight schedules', text: 'You only have 20–45 minutes on most days.' },
      { icon: 'plane', title: 'Frequent travellers', text: 'You need workouts that work in a hotel room.' },
      { icon: 'baby', title: 'Parents', text: 'You train during nap time or before the kids wake up.' },
    ],
    features: [
      { icon: 'dumbbell', title: 'Minimal equipment', text: 'Bodyweight, bands or dumbbells. We plan around what you own.' },
      { icon: 'timer', title: '20–45 minute sessions', text: 'Efficient workouts that fit into a busy day.' },
      { icon: 'play-circle', title: 'Exercise demo videos', text: 'Every movement explained with a short video.' },
      { icon: 'trending-up', title: 'Real progression', text: 'Tempo, reps and harder variations keep you improving.' },
      { icon: 'calendar-check', title: 'Weekly check-ins', text: 'Your coach adjusts the plan as you get fitter.' },
      { icon: 'volume-x', title: 'Quiet options', text: 'No-jump versions for apartments and early mornings.' },
    ],
    steps: STEPS_DEFAULT,
    sample: {
      kind: 'workout', title: 'A sample home week', note: 'Example plan with one pair of dumbbells and a resistance band.',
      days: [
        { day: 'Mon', title: 'Lower body', items: ['Goblet squat 4×12', 'Reverse lunge 3×10', 'Glute bridge 3×15'] },
        { day: 'Tue', title: 'Upper body', items: ['Push-up 4×AMRAP', 'Band row 4×15', 'DB press 3×12'] },
        { day: 'Wed', title: 'Walk + mobility', items: ['30 min walk', '10 min stretch'] },
        { day: 'Thu', title: 'Full body', items: ['DB thruster 4×10', 'Band pull-apart', 'Plank 3×40s'] },
        { day: 'Fri', title: 'Conditioning', items: ['EMOM 20 min', 'Squats, push-ups, rows'] },
        { day: 'Sat', title: 'Optional', items: ['Yoga flow', 'Family activity'] },
        { day: 'Sun', title: 'Rest', items: ['Check-in', 'Plan next week'] },
      ],
    },
    testimonials: [ // TODO: placeholder testimonials
      { quote: 'Two dumbbells and a band got me in the best shape of my life.', name: 'Aditi B.', detail: 'Home plan, 12 weeks' },
      { quote: 'I train while my baby naps. 30 minutes is enough.', name: 'Pooja C.', detail: 'New parent, 10 weeks' },
      { quote: 'My hotel room workouts finally have structure.', name: 'Manav R.', detail: 'Frequent traveller' },
    ],
    faq: [
      { q: 'What equipment do I need?', a: 'Nothing to start. A pair of adjustable dumbbells and a resistance band help you progress further.' },
      { q: 'Can I build muscle at home?', a: 'Yes. Progressive overload works with bodyweight and dumbbells too.' },
      { q: 'How much space do I need?', a: 'About the size of a yoga mat.' },
      { q: 'Will the workouts be noisy?', a: 'We include quiet, no-jump options for apartments.' },
      { q: 'How long are the sessions?', a: 'Between 20 and 45 minutes depending on your schedule.' },
      { q: 'Can I switch to a gym later?', a: 'Yes. Your coach can move you to a gym plan anytime.' },
    ],
    blogCategory: 'Workouts',
  },

  'womens-fitness': {
    slug: 'womens-fitness',
    eyebrow: 'Built for women',
    headline: ['Strong is', 'the new goal.'],
    promise: 'Training and nutrition planned around women’s energy, recovery and life stages, with strength at the centre.',
    bigStatement: 'Lift heavy. Feel strong. Live well.',
    who: [
      { icon: 'dumbbell', title: 'New to lifting', text: 'You want to start strength training with confidence.' },
      { icon: 'heart-pulse', title: 'Hormone-aware training', text: 'You want a plan that respects energy changes through the month.' },
      { icon: 'baby', title: 'Postpartum return', text: 'You are easing back into training after childbirth (with doctor clearance).' },
      { icon: 'sun', title: 'Midlife strength', text: 'You want to protect bones, muscle and energy as you age.' },
    ],
    features: [
      { icon: 'clipboard-list', title: 'Strength-first program', text: 'Glutes, back and full-body strength, progressed safely.' },
      { icon: 'calendar-heart', title: 'Energy-based planning', text: 'Adjust intensity to how you feel, not a rigid schedule.' },
      { icon: 'salad', title: 'Nutrition for women', text: 'Iron, calcium and protein-aware meal guidance.' },
      { icon: 'video', title: 'Form feedback', text: 'Video reviews so you lift with confidence.' },
      { icon: 'house', title: 'Home or gym options', text: 'Your plan works wherever you train.' },
      { icon: 'message-circle', title: 'Supportive coaching', text: 'Judgement-free check-ins every week.' },
    ],
    steps: STEPS_DEFAULT,
    sample: {
      kind: 'workout', title: 'A sample strength week', note: 'Example 3-day plan for a beginner to intermediate lifter.',
      days: [
        { day: 'Mon', title: 'Lower + glutes', items: ['Hip thrust 4×10', 'Goblet squat 3×10', 'Step-up 3×10'] },
        { day: 'Tue', title: 'Walk', items: ['8,000 steps', 'Mobility 10 min'] },
        { day: 'Wed', title: 'Upper body', items: ['DB press 3×10', 'Lat pulldown 3×12', 'Face pull 3×15'] },
        { day: 'Thu', title: 'Recovery', items: ['Yoga or stretch', 'Light walk'] },
        { day: 'Fri', title: 'Full body', items: ['Deadlift 4×6', 'Split squat 3×10', 'Row 3×12'] },
        { day: 'Sat', title: 'Optional', items: ['Pilates', 'Dance class'] },
        { day: 'Sun', title: 'Rest', items: ['Check-in', 'Meal prep'] },
      ],
    },
    testimonials: [ // TODO: placeholder testimonials
      { quote: 'I deadlifted my body weight at 41. I never thought I would say that.', name: 'Sunita P.', detail: 'Strength program, 20 weeks' },
      { quote: 'Training around my energy levels made consistency so much easier.', name: 'Tanya W.', detail: '12 weeks' },
      { quote: 'Felt safe and supported returning to exercise after my baby.', name: 'Rhea D.', detail: 'Postpartum return' },
    ],
    faq: [
      { q: 'Will lifting make me bulky?', a: 'No. Building noticeable size takes years of focused training and eating. Lifting makes you stronger and more toned.' },
      { q: 'Can I train during my period?', a: 'Usually yes. Your plan includes lighter options for days when energy is low.' },
      { q: 'Is this safe after pregnancy?', a: 'With clearance from your doctor, yes. We start gently and progress carefully.' },
      { q: 'Do you help with PCOS?', a: 'Training helps many women with PCOS. For nutrition, we recommend pairing with a dietitian consultation.' },
      { q: 'Can I train at home?', a: 'Yes. We offer both home and gym versions.' },
      { q: 'How often will I train?', a: 'Usually 3–4 days a week.' },
    ],
    blogCategory: 'Workouts',
  },

  'yoga-mobility': {
    slug: 'yoga-mobility',
    eyebrow: 'Yoga & mobility',
    headline: ['Move better.', 'Feel lighter.'],
    promise: 'Guided yoga and mobility sessions that improve flexibility, fix posture and help you recover between workouts.',
    bigStatement: 'Flexibility is a skill. We teach it.',
    who: [
      { icon: 'monitor', title: 'Desk-bound', text: 'Tight hips, stiff neck and rounded shoulders from sitting.' },
      { icon: 'dumbbell', title: 'Lifters & runners', text: 'You want better range of motion and faster recovery.' },
      { icon: 'smile', title: 'Stress relief', text: 'You want calm, breath-led movement to unwind.' },
      { icon: 'user', title: 'Older adults', text: 'You want to stay mobile and balanced for years.' },
    ],
    features: [
      { icon: 'flower-2', title: 'Guided flows', text: '15–40 minute sessions for every level.' },
      { icon: 'move', title: 'Posture correction', text: 'Targeted drills for neck, shoulders, hips and back.' },
      { icon: 'wind', title: 'Breathwork', text: 'Simple techniques to manage stress and sleep better.' },
      { icon: 'battery-charging', title: 'Recovery days', text: 'Sessions designed to complement your training.' },
      { icon: 'video', title: 'Live or recorded', text: 'Join live classes or follow along anytime.' },
      { icon: 'line-chart', title: 'Mobility check-ins', text: 'Track range of motion improvements every month.' },
    ],
    steps: STEPS_DEFAULT,
    sample: {
      kind: 'workout', title: 'A sample mobility week', note: 'Example plan for desk workers. 20–30 minutes per day.',
      days: [
        { day: 'Mon', title: 'Hips & lower back', items: ['90/90 switches', 'Cat-cow', 'Pigeon pose'] },
        { day: 'Tue', title: 'Shoulders & neck', items: ['Wall slides', 'Thread the needle', 'Chin tucks'] },
        { day: 'Wed', title: 'Flow', items: ['Sun salutation × 5', 'Warrior series'] },
        { day: 'Thu', title: 'Hamstrings', items: ['Downward dog', 'Forward fold', 'Hamstring flossing'] },
        { day: 'Fri', title: 'Spine', items: ['Thoracic rotations', 'Cobra', 'Child’s pose'] },
        { day: 'Sat', title: 'Long flow', items: ['40 min full body', 'Balance work'] },
        { day: 'Sun', title: 'Restore', items: ['Yin yoga', 'Breathwork 10 min'] },
      ],
    },
    testimonials: [ // TODO: placeholder testimonials
      { quote: 'My back pain from sitting all day is almost gone.', name: 'Rajesh K.', detail: 'Mobility plan, 8 weeks' },
      { quote: 'I touched my toes for the first time in 15 years.', name: 'Nisha A.', detail: 'Yoga, 10 weeks' },
      { quote: 'My squat depth improved more from mobility than from lifting.', name: 'Dev S.', detail: 'Lifter + mobility' },
    ],
    faq: [
      { q: 'I am not flexible at all. Can I start?', a: 'Yes. That is exactly who these sessions are for. Every pose has easier options.' },
      { q: 'What do I need?', a: 'A yoga mat and some space. Blocks and a strap are helpful but optional.' },
      { q: 'Is this spiritual yoga?', a: 'Our sessions focus on movement, mobility and breathing. They are suitable for everyone.' },
      { q: 'Can it help with back pain?', a: 'Gentle mobility often helps general stiffness. For specific pain, check with a doctor or physiotherapist first.' },
      { q: 'How often should I practise?', a: '3–5 short sessions a week works well for most people.' },
      { q: 'Can I combine it with strength training?', a: 'Yes. Mobility sessions are designed to complement your workouts.' },
    ],
    blogCategory: 'Lifestyle & Recovery',
  },
};
