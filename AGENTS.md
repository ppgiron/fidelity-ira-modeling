# Repository Guidelines

## Project Structure & Key Artifacts

- `portfolio-modeler-architecture.md` captures the latest architectural decisions, constraints, and stack choices (React 18, TypeScript, Vite, Zustand, MUI, Web Workers, PWA).
- `Design-workflow-questions-and-answers.md` records UX/product clarifications; consult before proposing changes.
- `_bmad-output/` holds generated deliverables (PRD, UX spec, architecture doc, epics/stories). Treat as the source of truth for scope and keep regenerated artifacts in sync.
- `_bmad/` contains the BMAD workflow system; add new workflows/configs there, and keep project-specific outputs in `_bmad-output/`.

## Setup, Build, Test

- Node 18+ recommended. Once the app scaffold exists, run `npm install` (or `pnpm install`) at repo root.
- `npm run dev` starts the Vite dev server; `npm run build` creates a production bundle; `npm run preview` validates the build locally.
- `npm run lint` enforces ESLint/Prettier rules; `npm test` runs unit/integration tests (Vitest + React Testing Library); `npm run test:e2e` runs Playwright suites. Wire these scripts into CI when `package.json` is added.

## Coding Style & Naming

- TypeScript strict mode; 2-space indent; semicolons; single quotes; keep modules under 100 characters per line.
- Feature-sliced layout: `app/` bootstraps providers/routes, `features/<feature>/components|hooks|services`, `entities/` for shared domain types, `shared/` for UI primitives/utils, `widgets/` for composed UI blocks.
- Components use PascalCase; hooks `useSomething`; Zustand stores `useXStore`; schema/validator objects suffix `Schema` (Zod). Keep calculation utilities pure and typed.
- Prefer explicit error handling and transparent calculations (no hidden state); document assumptions in code comments where logic is non-obvious.

## Testing Guidelines

- Unit/integration tests live beside sources as `*.test.ts[x]`; focus on calculators (scenario math, tax penalty, allocation constraints) and state/store logic.
- E2E tests in `tests/e2e/*.spec.ts` using Playwright; cover CSV import flows, scenario comparisons, offline/PWA behavior, and accessibility smoke checks.
- Aim for high coverage on financial calculations; add fixture-based tests with sample portfolios and edge cases (early withdrawal penalty, missing prices, zero-balance accounts).

## Commit & PR Guidelines

- Use concise Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`). Keep changes small and scoped.
- PRs should include: summary of intent, linked issue/task, screenshots or gifs for UI changes, list of commands/tests run, and notes on updated artifacts in `_bmad-output/`.

## Security, Privacy, and Performance

- All sensitive data stays client-side; avoid logging portfolio contents. Use Web Crypto for encryption when storing locally (IndexedDB/localStorage) and never persist keys.
- Keep heavy computations in Web Workers to protect UI responsiveness; enforce PWA/offline readiness (cache strategy, last-updated indicators) per architecture doc.

<!-- Test comment to trigger pre-commit hook -->
