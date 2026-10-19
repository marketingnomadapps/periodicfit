/** BMI = kg / m². WHO adult categories. */
export function bmiFromMetric(cm: number, kg: number): number | null {
  if (!(cm > 0) || !(kg > 0)) return null;
  const m = cm / 100;
  return kg / (m * m);
}

export function bmiFromImperial(ft: number, inch: number, lb: number): number | null {
  const totalIn = (ft || 0) * 12 + (inch || 0);
  if (!(totalIn > 0) || !(lb > 0)) return null;
  return (703 * lb) / (totalIn * totalIn);
}

export function bmiCategory(bmi: number): { label: string; level: 'under' | 'healthy' | 'over' | 'obese' } {
  if (bmi < 18.5) return { label: 'Underweight', level: 'under' };
  if (bmi < 25) return { label: 'Healthy weight', level: 'healthy' };
  if (bmi < 30) return { label: 'Overweight', level: 'over' };
  return { label: 'Obese range', level: 'obese' };
}

export function initBmi(form: HTMLFormElement) {
  const valueEl = form.querySelector<HTMLElement>('[data-bmi-value]')!;
  const catEl = form.querySelector<HTMLElement>('[data-bmi-category]')!;
  const marker = form.querySelector<HTMLElement>('.bmi-marker')!;
  const num = (name: string) => Number((form.elements.namedItem(name) as HTMLInputElement | null)?.value);
  const unit = () => (form.querySelector<HTMLInputElement>('input[type=radio]:checked')?.value ?? 'metric');

  const render = () => {
    const u = unit();
    form.querySelectorAll<HTMLElement>('[data-unit]').forEach((el) => { el.hidden = el.dataset.unit !== u; });
    const bmi = u === 'metric' ? bmiFromMetric(num('cm'), num('kg')) : bmiFromImperial(num('ft'), num('in'), num('lb'));
    if (bmi === null || !isFinite(bmi) || bmi < 8 || bmi > 90) {
      valueEl.textContent = '–';
      catEl.textContent = 'Enter height & weight';
      catEl.dataset.level = 'healthy';
      return;
    }
    const { label, level } = bmiCategory(bmi);
    valueEl.textContent = bmi.toFixed(1);
    catEl.textContent = label;
    catEl.dataset.level = level;
    const pct = Math.min(100, Math.max(0, ((bmi - 15) / 25) * 100));
    marker.style.left = `${pct}%`;
  };

  // Keep values equivalent when switching units
  form.querySelectorAll<HTMLInputElement>('input[type=radio]').forEach((r) => r.addEventListener('change', () => {
    if (r.value === 'imperial' && num('cm') > 0) {
      const totalIn = num('cm') / 2.54;
      (form.elements.namedItem('ft') as HTMLInputElement).value = String(Math.floor(totalIn / 12));
      (form.elements.namedItem('in') as HTMLInputElement).value = String(Math.round(totalIn % 12));
      (form.elements.namedItem('lb') as HTMLInputElement).value = String(Math.round(num('kg') * 2.20462));
    } else if (r.value === 'metric' && num('lb') > 0) {
      (form.elements.namedItem('cm') as HTMLInputElement).value = String(Math.round((num('ft') * 12 + num('in')) * 2.54));
      (form.elements.namedItem('kg') as HTMLInputElement).value = String(Math.round(num('lb') / 2.20462 * 2) / 2);
    }
    render();
  }));
  form.addEventListener('submit', (e) => e.preventDefault()); // no inline handler (CSP-safe)
  form.addEventListener('input', render);
  render();
}
