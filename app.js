import { createPlan, buildPrompt } from './planner.js';
const form = document.querySelector('#planner');
const result = document.querySelector('#result');
const money = value => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
form.addEventListener('submit', event => {
  event.preventDefault();
  const error = document.querySelector('#error');
  error.textContent = '';
  try {
    const input = Object.fromEntries(new FormData(form));
    const plan = createPlan(input);
    result.replaceChildren(element('p', '02 / YOUR CELEBRATION BLUEPRINT', 'eyebrow'), element('h2', plan.event.title), element('p', `${plan.event.type} · ${plan.event.city} · ${plan.event.guests} guests`));
    result.append(element('div', `${money(plan.event.budget)} total · ${money(plan.perGuest)} per guest`, 'total'));
    for (const warning of plan.warnings) result.append(element('p', warning, 'warning'));
    const budget = element('div', undefined, 'budget');
    for (const allocation of plan.allocations) {
      const row = element('div', undefined, 'budget-row');
      row.append(element('span', `${allocation.name} · ${allocation.percent}%`), element('strong', money(allocation.amount)));
      budget.append(row);
    }
    result.append(budget);
    for (const [title, items] of [['On the menu', plan.menu], ['Your planning timeline', plan.timeline], ['The thoughtful details', plan.checklist]]) {
      result.append(element('h3', title));
      const list = element('ul');
      for (const item of items) list.append(element('li', item));
      result.append(list);
    }
    const details = element('details');
    details.append(element('summary', 'Refine with Gemini · view your structured prompt'));
    const prompt = element('textarea');
    prompt.value = buildPrompt(input);
    prompt.readOnly = true;
    prompt.setAttribute('aria-label', 'Structured AI planning prompt');
    details.append(prompt);
    const copy = element('button', 'Copy prompt');
    copy.type = 'button';
    copy.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(prompt.value); copy.textContent = 'Copied!'; }
      catch { prompt.focus(); prompt.select(); copy.textContent = 'Select and copy the prompt above'; }
    });
    const ai = element('a', 'Open Google AI Studio ↗');
    ai.href = 'https://aistudio.google.com/'; ai.target = '_blank'; ai.rel = 'noopener noreferrer';
    details.append(copy, ai); result.append(details);
    const download = element('button', 'Download my plan ↓');
    download.type = 'button';
    download.addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(plan, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a'); link.href = url; link.download = 'gatherly-plan.json'; link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    result.append(download);
  } catch (cause) { error.textContent = cause instanceof Error ? cause.message : 'Could not create your plan.'; }
});
