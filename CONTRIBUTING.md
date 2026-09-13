# Contributing

Open an issue for a bug or proposed change. Include the event or interview role, the practice title, and enough detail to reproduce the problem. Do not post API keys or private student submissions.

For a pull request:

1. Create a branch from `main`.
2. Make the change and add a regression test if it changes calculations, assessment rules, or case generation.
3. Run `pnpm typecheck`, `pnpm test`, and `pnpm build`.
4. Describe the problem, the resulting behavior, and how you checked it.

## Competition content

Include an official source URL and competition season when changing an event’s requirements. Keep official terminology distinct from Casecraft explanations.

- Match performance indicator text and identifiers to the linked source. A sample case’s indicators are not an exhaustive list for its series.
- Use the rubric for the specific event and component. Verify row maxima and the total.
- Leave unobserved presentation or artifact criteria unscored.
- Label original scenarios and rehearsal variations. Do not describe them as official past papers.
- Keep source fixtures and relevant tests in step with verified content changes.

## Deployment

GitHub Actions tests and builds every pull request. A successful run on `main` deploys `dist/` to GitHub Pages. Repository Settings → Pages must use **GitHub Actions** as its source.

The deployment is a static app. Server endpoints, secrets, and environment files are not part of the published site. Do not commit generated `dist/` files.
