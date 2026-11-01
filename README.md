# Gatherly

A privacy-first Celebration & Event Planner MVP for PromptWars Challenge 05. Create an INR budget, menu, preparation timeline, inclusive safety checklist, downloadable plan, and a structured prompt for refinement in Gemini / Google AI Studio.

## Run

Node 20+ for tests; Python 3 for the static development server.

```sh
npm test
npm start
```

Open http://localhost:8080. No package installation, runtime dependencies, account, or API key is needed.

## What works

- Validated event details, guest counts and whole-rupee budgets.
- Exact-sum allocation with 15% contingency and lean-budget guidance.
- Vegetarian, vegan and mixed menu suggestions.
- Accessibility, food-allergy, fire-safety, transport and waste-reduction reminders.
- JSON export and an editable-workflow prompt to copy into Google AI Studio.
- Responsive layout, labelled controls, native validation and live result announcements.

## Honest scope

The app does **not** call an LLM or book vendors. Its immediate plan is a transparent rule-based starting point, not a verified quote. The structured prompt is intended for a separate Gemini refinement step; no AI-generated output is misrepresented as live generation. Vendor availability, local permits and food safety require human verification.

## Security and privacy

No backend, analytics, local storage, guest database, secrets or third-party API requests. Form values are rendered with `textContent`, never HTML interpolation. Numbers have bounded finite integer validation. Vercel configuration applies a restrictive CSP, disables framing and sensitive browser permissions, and adds MIME-sniffing and referrer protections. Google Fonts is the only optional external resource. Copying the prompt to another service is an explicit user action; don't include guest personal data.

Tests cover malformed input, limits, rounding, exact totals, menus, safety requirements, prompt boundaries and immutability. This is a small tested MVP, not a security certification.
