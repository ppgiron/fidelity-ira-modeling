---
project_name: 'fidelity-ira-modeling'
user_name: 'Paul'
date: '2025-12-25'
sections_completed: ['technology_stack', 'language_specific_rules', 'framework_specific_rules', 'testing_rules', 'code_quality_style_rules', 'development_workflow_rules', 'critical_dont_miss_rules']
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

*   **Core Development:**
    *   **Build Tool:** Vite (latest stable)
    *   **Framework:** React (latest stable)
    *   **Language:** TypeScript (latest stable)
*   **User Interface (UI):
    *   **Component Library:** MUI (Material-UI) v5
    *   **Charting Library:** Recharts (latest stable)
*   **State Management:**
    *   **Library:** Zustand (latest stable)
*   **Routing:**
    *   **Library:** React Router (latest stable)
*   **Data Persistence:**
    *   **IndexedDB Wrapper:** Dexie.js (latest stable)
    *   **Encryption:** Web Crypto API (browser native)
    *   **Local Storage:** Browser native
*   **Deployment & PWA:**
    *   **Hosting:** Vercel (Free Tier initially)
    *   **PWA Plugin:** `vite-plugin-pwa` (latest stable)
*   **Quality & Developer Experience (DevEx):**
    *   **Linting:** ESLint
    *   **Formatting:** Prettier
    *   **Git Hooks:** Husky
    *   **Testing:** Vitest (latest stable)
    *   **Bundle Analysis:** `rollup-plugin-visualizer` (latest stable)
*   **Monitoring:**
    *   **Error Tracking:** Sentry (latest stable)
    *   **Analytics:** Google Analytics

## Critical Implementation Rules

### Language-Specific Rules (TypeScript)

*   **TypeScript Strict Mode:** `strict: true` must be enforced in `tsconfig.json`. This catches many common errors during compilation and ensures type safety.
*   **Import/Export Conventions:**
    *   Use **absolute imports** for FSD layers (e.g., `@/app`, `@/features`, `@/shared`).
    *   Use **relative imports** for co-located files within the same FSD slice.
    *   Prefer **default exports** for components, pages, and entry files (e.g., `index.ts`).
    *   Prefer **named exports** for utilities, hooks, types, and constants.
*   **Async/Await vs Promise Usage:** Prefer `async/await` for asynchronous operations to improve readability and maintainability, especially in complex sequences. Only use `.then/.catch` for simple chaining or when `async/await` is not possible.
*   **Error Handling Patterns:**
    *   For **expected errors** (e.g., validation failures from user input or external APIs), explicitly return an `Error` object or a `Result` type (`{ success: boolean, data?: T, error?: Error }`) rather than throwing exceptions, especially when crossing FSD module boundaries.
    *   For **unexpected errors** (e.g., unhandled exceptions, critical system failures), throw our `CustomErrorClasses` (e.g., `CalculationError`, `DataPersistenceError`) as defined in the architecture, allowing them to propagate to the centralized error handler.

### Framework-Specific Rules (React)

*   **Hooks Usage Patterns:**
    *   **Custom Hooks:** Prefer custom hooks (`useSomething`) for reusable, stateful, or side-effect logic. Place them in `features/*/hooks/` or `shared/lib/hooks/`.
    *   **Standard Hooks:** Strictly follow React's Rules of Hooks.
    *   **Memoization Hooks (`useMemo`, `useCallback`):** Use aggressively for:
        *   Expensive computations.
        *   Callbacks passed to child components, especially those that are themselves memoized or part of virtualized lists.
        *   Focus memoization on `entities/` visuals (e.g., Data Grid rows, Chart components) to prevent unnecessary re-renders of large sets of data.
*   **Component Structure:**
    *   **FSD Adherence:** Components must strictly adhere to the defined Feature-Sliced Design (FSD) layer rules. A component in a higher layer (e.g., `widgets/`) may import from lower layers (e.g., `features/`, `entities/`, `shared/`), but never vice-versa.
    *   **Props:** Use explicit TypeScript interfaces for all component props. Destructure props at the top of the component function.
    *   **Styling:** Prefer MUI's `sx` prop or `styled` components for component-specific styling, leveraging the global MUI theme definitions in `shared/ui/themes/`. Avoid inline styles or global CSS where possible.
*   **State Management (Zustand):**
    *   **Store Definition:** Organize Zustand stores by FSD feature or entity. Define stores in `entities/*/store/` or `features/*/model/`. Each store should have a clear public API (actions and selectors).
    *   **Updates:** Always use immutable updates for state. Direct mutation of state objects is strictly forbidden.
    *   **Selectors:** Use Zustand's selector pattern (`useStore(selector)`) to optimize component re-renders and derive computed state.
*   **Performance Rules:**
    *   **Web Workers:** All CPU-intensive calculations, particularly scenario modeling, *must* be offloaded to Web Workers to keep the main UI thread responsive. Web Worker logic resides in `features/*/web-worker/`.
    *   **Lazy Loading:** Aggressively lazy-load large components and heavy libraries. Specifically, `<PortfolioComparisonChart />` (Recharts wrapper) and `<AdvisorDataGrid />` (MUI X Data Grid wrapper) widgets *must* be lazy-loaded.
    *   **Virtualization:** Implement for any components displaying long lists or large tables (e.g., the main portfolio holdings grid) using appropriate libraries.

### Testing Rules

*   **Test Organization:**
    *   **Unit Tests:** Must be co-located (`.test.ts` or `.spec.ts` suffix) with the component or logic they test, residing within their respective FSD slices. These tests should focus on isolated units of code (functions, pure components, hooks).
    *   **Integration Tests:** Located in `src/tests/integration/`. These tests should verify correct interactions between multiple components or modules, such as our Dexie.js data layer with Zod validation.
    *   **End-to-End (E2E) Tests:** Located in `src/tests/e2e/`. These tests will simulate full user flows using Playwright (chosen for its speed and reliability for PWA testing).
*   **Mock Usage:**
    *   **Unit Tests:** Use explicit mocks for external dependencies (e.g., market data API calls, IndexedDB interactions) to ensure true isolation. Leverage Vitest's powerful mocking capabilities (`vi.mock`).
    *   **Integration Tests:** Minimize mocking; prefer to test actual interactions between integrated modules where appropriate.
*   **Test Coverage Requirements:**
    *   Target a high code coverage (e.g., >80%) for core business logic (e.g., calculation engines, data models, utility functions in `shared/lib/`).
    *   Aim for reasonable coverage (>60%) for UI components, prioritizing critical user paths and complex interactions.
    *   Coverage reports will be generated and reviewed as part of the CI/CD pipeline.
*   **Test Boundaries:**
    *   **Unit tests** should be fast, isolated, and cover specific functions/components.
    *   **Integration tests** verify correct data flow and interaction between several units.
    *   **E2E tests** ensure the application functions correctly from a user's perspective, covering critical end-to-end user journeys.

### Code Quality & Style Rules

*   **ESLint/Prettier Rules:**
    *   ESLint and Prettier must be configured and run as **Git pre-commit hooks (Husky)** to enforce formatting and basic code quality before code is committed.
    *   **Strict adherence** to the provided `.eslintrc.cjs` and `prettier.config.cjs` is mandatory.
    *   The CI/CD pipeline *must fail* if any ESLint warnings or errors are present.
*   **Code Organization:**
    *   **Strict adherence** to the Feature-Sliced Design (FSD) architecture for all source code.
    *   Components, features, entities, and shared layers must strictly follow their defined structure and import rules (e.g., higher layers only import from lower layers).
*   **Naming Conventions:**
    *   **Strict adherence** to the Naming Patterns defined in the `architecture.md` document for all code elements (variables, functions, components, files, hooks, types).
*   **Documentation Requirements:**
    *   All public API functions, custom hooks, and complex components *must* have JSDoc-style comments explaining their purpose, parameters, return values, and any side effects.
    *   Complex business logic or non-obvious code sections within features/entities should be commented for clarity.
    *   `README.md` files co-located with features, entities, and widgets should provide a high-level overview of their purpose, public API, and usage.

### Development Workflow Rules

*   **Git/Repository Rules:**
    *   **Branch Naming Conventions:**
        *   `feature/issue-##-short-description` (e.g., `feature/issue-123-add-dark-mode`)
        *   `bug/issue-##-short-description` (e.g., `bug/issue-456-fix-csv-import-error`)
        *   `hotfix/short-description` (for urgent production fixes)
        *   The `main` branch is always considered deployable to production.
    *   **Commit Message Format:** Adhere to the **Conventional Commits** specification. This enables automated changelog generation and clear history (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, etc.).
    *   **Pull Request (PR) Requirements:**
        *   PRs must have at least one approval from a designated reviewer (e.g., another developer, architect) before merging.
        *   All CI checks (linting, type-checking, unit tests, build) must pass successfully before merging.
        *   PR descriptions should clearly link to the associated issue/story and provide a concise summary of changes and their impact.
*   **Deployment Patterns:**
    *   **Production Deployment:** Automatic deployment to Vercel production upon merge to the `main` branch.
    *   **Preview Deployments:** Automatic preview deployments to Vercel for every open Pull Request, providing a shareable staging environment.
    *   **Hotfixes:** Manual deployment of hotfixes directly to production from a hotfix branch (after review and testing).

### Critical Don't-Miss Rules

*   **Anti-Patterns to Avoid:**
    *   **Direct DOM Manipulation:** Avoid manipulating the DOM directly outside of React's intended lifecycle and state management.
    *   **Synchronous Blocking Operations:** Never block the main UI thread with synchronous network requests or heavy computations. All CPU-intensive tasks *must* use Web Workers.
    *   **Storing Sensitive Data Unencrypted:** All sensitive financial data stored locally *must* be encrypted using the Web Crypto API, and the encryption key *never* stored persistently.
    *   **Hardcoding Environment Variables/Secrets:** Utilize Vite's `.env` files and Vercel's environment variable management.
    *   **Inconsistent JSON Field Naming:** Stick strictly to `camelCase` for all JSON field names to maintain consistency.
    *   **Direct Mutation of Zustand Store State:** Always use immutable updates for Zustand state; direct mutation is strictly forbidden.
    *   **Assuming Successful Worker Initialization:** The UI must always have a fallback/error state for when a Web Worker fails to load or crashes.
    *   **Passing Unvalidated Data to/from Workers:** All data crossing the main thread/worker boundary must be schema-validated with Zod.
    *   **Running Key Derivation on the Main Thread:** Any potentially slow cryptographic function (like PBKDF2) *must* be offloaded to a Web Worker to prevent UI freezing.
    *   **Silent Failures or Subtle Warnings:** Never assume the user will see a small, low-contrast warning message. For critical issues like stale data or failed imports, the feedback must be impossible to miss.
    *   **Generic Error Messages:** Avoid generic error messages like 'An error occurred' or 'Invalid file'. Always provide context and, if possible, a path to resolution.
    *   **Premature Optimization (REFINED):** Do not offload CSV parsing to a Web Worker for the MVP. Instead, implement it on the main thread but encapsulate the logic in a pure function that can be easily moved later. Add performance monitoring (e.g., log to Sentry if >200ms) to create a data-driven trigger for when this optimization is needed.

*   **Edge Cases:**
    *   **Offline Handling:** The application must degrade gracefully when offline, clearly informing the user of their offline status and any implications for data freshness.
    *   **CSV Import Failures (ENHANCED):** Error feedback for CSV import failures *must* be granular. The system must identify the specific row number and the exact reason for the failure (e.g., 'Row 5: Invalid ticker symbol "ABCDE"', 'Row 12: Expected 3 columns, found 4'). For large files (e.g., >100 rows), the parsing process itself should be offloaded to a Web Worker.
    *   **Empty States:** Design and implement clear, user-friendly empty states for all lists, charts, and data displays (e.g., "No portfolios yet. Import one to begin!").
    *   **Large Data Volumes:** Performance must be tested and optimized for large portfolios (e.g., 100+ holdings, complex scenarios) to ensure virtualization and memoization are effective.
    *   **Data Corruption vs. Wrong Passphrase:** The encryption scheme must include a 'verification string' to distinguish between a wrong passphrase and genuinely corrupted data, providing distinct, user-friendly error messages for each case.
    *   **Unsupported Crypto API:** The application must check for `window.crypto.subtle` on startup and gracefully degrade persistence/encryption features if it's not supported, clearly informing the user.

*   **Security Rules:**
    *   **Input Sanitization:** Sanitize all user input (especially CSV imports) to prevent Cross-Site Scripting (XSS) and other injection vulnerabilities.
    *   **Encryption Key Management (ENHANCED):** Implement secure key derivation processes; encryption keys must be short-lived, derived from user input, and never persisted. All cryptographic operations must exclusively use the Web Crypto API, and parameters (e.g., PBKDF2 iterations) must follow current OWASP recommendations. No custom crypto.
    *   **Content Security Policy (CSP):** Implement a strict Content Security Policy to mitigate XSS attacks.
    *   **Secure Headers:** Ensure appropriate security headers are implemented (e.g., HSTS, X-Content-Type-Options) for all deployments.
    *   **Malicious Extension Mitigation:** While we cannot control the user's browser environment, development and testing should include using a clean browser profile to establish a security baseline. Ensure no obvious vectors for script injection exist that a malicious extension could exploit.
    *   **PWA Authenticity:** The application must have clear visual branding and a robust service worker implementation to help users distinguish the legitimate 'installed' PWA from a potential phishing website.
    *   **Sensitive Operation Re-authentication (Future Consideration):** As a future UX enhancement, consider re-prompting for the user's PIN for extremely sensitive actions, such as exporting raw data, to minimize the impact of a compromised session.