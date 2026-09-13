# Casecraft

Case practice for DECA and FBLA competitors, and interview preparation for business and technology roles.

**[Use Casecraft](https://aarushbh.github.io/casecraft/)**

Choose an event or role, work through a case, and explain your solution in writing. The workspace includes calculations, charts, practice timers, and a review of your response.

## Practice paths

- **Competition Hall:** DECA and FBLA events, with event-specific formats, selected performance indicators, and sourced scorecards.
- **Career Launchpad:** technical and behavioral interview practice across ten business and technology roles.

Cases are original practice material. Rehearsal variations add constraints to a core case; they are not separate official past papers. Each competition profile links to its source material and season.

## Run locally

Requires Node.js 22.13+ and pnpm 11.19.0.

```sh
git clone https://github.com/AarushBh/casecraft.git
cd casecraft
pnpm install --frozen-lockfile
pnpm dev
```

No API key is needed. Vite prints the local address when the server starts.

```sh
pnpm typecheck  # TypeScript checks
pnpm test       # Calculation and assessment tests
pnpm build      # Production files in dist/
pnpm preview    # Serve the production build locally
```

## Feedback and saved work

Competition reviews use the selected event’s scoring criteria. Written answers can be graded by the learner or an adviser, or reviewed by copying a prompt into ChatGPT and importing the response. Imported marks are validated against the submitted attempt and scorecard. The site does not call an AI API.

Numerical checks assess individual calculations. They do not establish the quality of an entire answer, and written submissions cannot establish live presentation skills. Practice marks are not official competition results.

Bookmarks and preferences stay in local storage. Drafts, reviews, and practice history use the browser tab’s session storage. Export work you want to keep; there is no account sync or cloud backup.

## Development

The app uses React, TypeScript, Vite, and Tailwind CSS.

| Location | Contents |
| --- | --- |
| `standalone/main.tsx` | Browser entry point |
| `app/page.tsx` | Event catalog and navigation |
| `app/training/` | Cases, competition sources, practice workspaces, and assessment logic |
| `app/visual-builder.tsx` | Chart editor |
| `components/ui/` | Shared UI components |
| `tests/` | Calculation, case, and scoring regression tests |

The older model studio remains in `app/` for reference and tests and is not included in the public application. Server-only grading code is maintained separately in a private repository. Earlier public commits still contain its previously MIT-licensed version.

Pull requests run type checks, tests, and a production build. Passing changes on `main` deploy to GitHub Pages. Generated files are not committed.

See [CONTRIBUTING.md](CONTRIBUTING.md) for changes to case content or grading. Report bugs and incorrect competition details in [Issues](https://github.com/AarushBh/casecraft/issues).

## License

Original software and documentation are [MIT licensed](LICENSE), © 2026 Casecraft. Third-party competition materials and trademarks retain their owners’ rights; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

Casecraft is not affiliated with DECA or FBLA.
