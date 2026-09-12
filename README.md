# Casecraft

An open-source practice app for DECA, FBLA, and business/technology interviews.

## Run locally

Use Node.js 22.13 or newer and pnpm. Run `pnpm install --frozen-lockfile`, then `pnpm dev`.

`pnpm test` checks calculation safety, case generation and scoring contracts. `pnpm exec tsc --noEmit` checks types. `pnpm build` creates the standalone app in `public-dist/`.

## Publish with GitHub Pages

Run `pnpm prepare:pages`, commit the generated `docs/` directory along with source changes, and push. Set GitHub Pages to deploy from the `main` branch, `/docs` folder. This build needs no API keys, database, Cloudflare account, or ChatGPT hosting account. Rebuild `docs/` after every source change before publishing.

## What practice scores mean

Competition scorecards use sourced component totals; imported reviews are bound to the submitted attempt. Written practice cannot measure unobserved live delivery or missing artifacts. Numeric checks validate specific calculations, not an entire interview answer. Free written review uses manual/adviser grading or a prompt copied by the learner to ChatGPT, followed by validated JSON import. There is no automatic AI grading on GitHub Pages.

There are 6,544 practice assignments across 136 competition events and 10 interview roles. Rehearsal variations are labeled and are not distinct official past papers. Event timing, selected indicators and scorecards include source/season references; check the current organizer rules before competing.

Browser preferences use local storage; drafts, reviews and history use session storage. Export important work. No cloud account or synchronization is provided.

## Scope and licensing

The public entry point is `standalone/main.tsx`. Historical studio and server grading modules remain in the source for reference and unit tests; GitHub Pages does not deploy or execute them. Do not add credentials to this repository.

Original software and documentation: MIT, copyright 2026 Casecraft. See `LICENSE` and `THIRD_PARTY_NOTICES.md`. The license does not relicense DECA/FBLA materials or grant trademark rights.
