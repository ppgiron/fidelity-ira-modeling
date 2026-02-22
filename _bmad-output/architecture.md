---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7]
inputDocuments:
  - _bmad-output/prd.md
  - _bmad-output/ux-design-specification.md
workflowType: 'architecture'
lastStep: 7
project_name: 'fidelity-ira-modeling'
user_name: 'Paul'
date: '2025-12-23'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
The core functionality revolves around portfolio management, including manual and CSV import, auto-fetching prices, and displaying breakdowns. Users can define proposed allocations using interactive sliders, generating real-time trade lists. A key feature is scenario simulation, applying pre-built economic scenarios to current and proposed portfolios, and calculating outcomes like ending value, max drawdown, and annualized return. Side-by-side comparisons of these scenarios are crucial. A new feature includes withdrawal and tax penalty modeling, specifically a 10% early withdrawal penalty for users under 59.5, requiring precise calculation and display. All portfolio data is to be stored locally in the browser for privacy and offline capability.

**Non-Functional Requirements:**
Performance is critical: scenario calculations must complete under 500ms and UI interactions under 100ms, with initial load times under 3 seconds. The application prioritizes absolute data privacy, with all financial data remaining local to the user's browser, and must function offline as a Progressive Web App (PWA). Accessibility (WCAG 2.1 Level AA) is a key requirement, ensuring keyboard navigation and screen reader compatibility for all components, especially data visualizations. Browser compatibility targets the latest two stable versions of major browsers. The design principle of "no black box" algorithms ensures transparency in all calculations. The tech stack includes React 18+, TypeScript, Vite, Zustand for state management, and MUI for UI components, with heavy calculations offloaded to Web Workers.

**Scale & Complexity:**
The project exhibits **High complexity**. This is driven by the need for sophisticated client-side financial modeling, rich interactive data visualizations, stringent performance and accessibility targets, and a strong emphasis on data privacy through local persistence. The custom CSV import and the "Progressive Density" responsive design strategy also contribute to the complexity.

- Primary domain: Web Application (SPA/PWA, Fintech)
- Complexity level: High
- Estimated architectural components: The project will require a blend of standard MUI components, specialized charting (Recharts), and several custom components tailored for the unique UX patterns like the "Magic" CSV Importer, "Head-to-Head" HUD, Enhanced Allocation Sliders, Smart Action Plan Checklist, and "Pro Mode" Layout Toggle. A Web Worker will be a critical architectural component for heavy computations.

### Technical Constraints & Dependencies

The primary constraint is the **client-side only processing** for all core financial calculations and data storage, necessitating robust local persistence mechanisms (IndexedDB, localStorage). There is a specific dependency on the **Fidelity CSV format** for portfolio import. The application's core engine must be **offline-capable**, leveraging PWA technologies. Heavy computational tasks will require dedicated **Web Workers** to maintain UI responsiveness.

### Cross-Cutting Concerns Identified

- **Performance Optimization:** Ensuring sub-second response times for calculations and UI updates across a complex interactive interface.
- **Data Privacy & Local Persistence:** Securely handling sensitive financial data entirely within the client's browser.
- **Accessibility (WCAG 2.1 AA):** Implementing and testing for universal usability, especially for complex data visualizations and interactive controls.
- **State Management:** Effectively managing the application's complex state across numerous interactive and data-driven components (Zustand).
- **Data Visualization:** Accurate, responsive, and transparent display of complex financial models and comparisons.
- **Input Validation & Error Handling:** Robustly processing and providing feedback for user input, particularly for the CSV import.

### Data Architecture

**Data Modeling Approach:**

- **Decision:** Normalized (Relational-like)
- **Rationale:** Provides better data integrity and manageability for complex portfolio, asset, and scenario data. Expected to be implemented using IndexedDB, potentially with a library like Dexie.js for easier management.

**Data Validation Strategy:**

- **Decision:** Schema-based validation using Zod
- **Rationale:** Offers powerful, declarative, and type-safe validation, integrating seamlessly with TypeScript. Ensures data integrity from input (e.g., CSV import) to storage and calculations.

**Migration Approach:**

- **Decision:** Versioned Migrations (library-assisted)
- **Rationale:** Ensures data integrity and a smooth upgrade path for users as the application's local data schema evolves. Libraries like Dexie.js (if used) typically provide built-in support for this.

**Caching Strategy:**

- **Decision:** Stale-While-Revalidate (for market data) combined with Cache-first (for essential local portfolio data).
- **Rationale:** Provides an optimal balance between speed, freshness, and robust offline functionality, aligning with UX requirements for indicating data freshness (e.g., "Last updated: Just Now").

### Authentication & Security

**Data Encryption Approach:**

- **Decision:** Application-level Encryption using the Web Crypto API, derived from a user-provided passphrase/PIN.
- **Rationale:** Crucial for robust protection of highly sensitive local financial data, directly addressing the "absolute privacy" NFR. The encryption key will never be stored persistently, requiring user input for decryption.

### API & Communication

**Error Handling Standards:**

- **Decision:** Centralized Error Handling approach with Custom Error Classes.
- **Rationale:** Promotes robustness, maintainability, and a consistent user experience by allowing for systematic reporting, logging, and user-friendly feedback for all client-side errors (UI, calculations, local storage, market data fetches).

### Frontend Architecture

**Component Architecture:**

- **Decision:** Feature-Sliced Design (FSD)
- **Rationale:** Adopted precisely as detailed, from the 'App' layer down to the 'Shared' layer, to manage complexity, promote scalability, and enable team parallelism in a high-complexity application.

**Performance Optimization Strategy:**

- **Decision:** A four-pronged strategy combining:
  1.  Route-based Code-Splitting as a baseline.
  2.  Aggressive Memoization in complex components, specifically focused on Entity Visuals (Data Grid rows, Charts), avoiding over-memoization of simple components.
  3.  Virtualization for the main portfolio holdings grid.
  4.  Moving all scenario calculations to a Web Worker as a non-negotiable core architectural pattern to ensure UI responsiveness (e.g., shimmer effects) during heavy calculations.
- **Rationale:** Directly addresses strict NFRs for UI responsiveness (<100ms) and scenario calculation (<500ms) by leveraging a combination of best practices and specialized patterns.

**Bundle Optimization Strategy:**

- **Decision:** A strategy incorporating:
  1.  Vite's built-in tree-shaking.
  2.  Aggressively lazy-loading heavy dependencies (Recharts and MUI X Data Grid), leveraging the 'shimmer' loading state pattern as a functional performance asset for `<PortfolioComparisonChart />` and `<AdvisorDataGrid />` widgets.
  3.  Mandating bundle analysis with `rollup-plugin-visualizer` as a pre-release CI/CD quality gate to prevent 'bloat creep'.
- **Rationale:** Ensures minimal initial download size to meet the <3 second load time NFR and maintains long-term bundle health by proactively identifying and managing potential bloat.

### Infrastructure & Deployment

**Hosting Strategy:**

- **Decision:** Vercel (free tier initially).
- **Rationale:** Optimized for modern frontend frameworks, offers excellent developer experience, automatic CI/CD, global CDNs, and a suitable free tier, minimizing infrastructure overhead and maximizing developer velocity.

**CI/CD Pipeline Approach:**

- **Decision:** Vercel's Built-in Git Integration, augmented by Git pre-commit hooks (Husky) for linting, type-checking, and unit tests.
- **Rationale:** Simplest and most efficient for deploying to Vercel, ensuring code quality before deployment and leveraging integrated services.

**Monitoring & Logging:**

- **Decision:** Dedicated Client-side Monitoring Tools: Sentry for error tracking and Google Analytics for user behavior and performance monitoring.
- **Rationale:** Provides comprehensive error tracking, performance monitoring, and insights into usage patterns crucial for a high-complexity application, supporting robust error handling and performance optimization NFRs.

**Environment Configuration:**

- **Decision:** Vite's `.env` files, combined with Vercel's environment variable management for production deployments.
- **Rationale:** Provides a secure, flexible, and developer-friendly approach to managing environment-specific variables, with sensitive keys stored securely in Vercel's dashboard.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
Multiple areas where AI agents could make different choices if not explicitly defined (e.g., naming conventions, file organization, error formats, state updates, loading states).

### Naming Patterns

**Database Naming (for IndexedDB/Dexie.js):**

- **Tables (Stores):** Plural, camelCase (e.g., `portfolios`, `assets`, `scenarios`).
- **Columns (Properties):** camelCase (e.g., `userId`, `assetId`, `lastUpdated`).
- **Primary Keys:** `id`.
- **Foreign Keys:** `relatedEntityId` (e.g., `portfolioId` on an asset).

**API Naming (for external market data fetches):**

- **Query Parameters:** camelCase (e.g., `includeHistoricalData`, `pageSize`).
- **Headers:** kebab-case (e.g., `X-Custom-Header`).

**Code Naming (React/TypeScript/MUI):**

- **Components:** PascalCase (e.g., `PortfolioCard`, `ScenarioModal`). Files: `ComponentName.tsx`.
- **Props:** camelCase (e.g., `isLoading`, `onSave`).
- **Hooks:** `use` prefix, camelCase (e.g., `usePortfolioData`).
- **Functions (Non-hook):** camelCase (e.g., `calculateProjection`).
- **Variables:** camelCase (e.g., `portfolioList`).
- **Enums/Types/Interfaces:** PascalCase (e.g., `PortfolioStatus`).

### Structure Patterns

**Project Organization (within FSD):**

- **Tests:** `*.test.ts` co-located with the component/logic they test (e.g., `features/magic-import/logic.test.ts`).
- **Shared Utilities:** Located in `shared/lib/` or `shared/utils/`.
- **Services/Repositories:** Organized within their respective `features/` or `entities/` slices, typically in a `model/` or `api/` subdirectory, adhering to FSD principles.

**File Structure:**

- **Root-level Config Files:** `vite.config.ts`, `tsconfig.json`, `package.json`, `.eslintrc.cjs`, `prettier.config.cjs`, `vitest.config.ts`, etc.
- **Static Assets:** `public/` for directly served assets, `src/assets/` for assets processed by Vite.
- **Documentation:** `docs/` at root for general project documentation; `README.md` co-located with features/components for internal documentation.
- **Environment Files:** `.env`, `.env.development`, `.env.production` at the project root.

### Format Patterns

**API Formats (for external market data fetches):**

- **API Response Wrapper:** Direct response where possible. If a wrapper is needed (e.g., for paginated results or errors), it should be consistent (`{ data: ..., meta: ... }` for success, `{ error: { message: ..., code: ... } }` for errors).
- **Error Format:** `{ error: { message: string, code?: string, details?: any } }`.
- **Date Format in JSON:** ISO 8601 strings (e.g., `2025-12-25T12:30:00Z`).

**Data Exchange Formats (JSON within the app or local storage):**

- **JSON Field Naming:** camelCase (consistent with Code Naming).
- **Boolean Representations:** `true`/`false`.
- **Null Handling Patterns:** Explicit `null` for missing optional values, rather than `undefined` or empty strings.
- **Array vs object for single items:** Use a single object `{}` for a single item, and `[{}]` for a collection of items, even if it's currently a collection of one.

### Communication Patterns

**Event Systems (for inter-component/module communication):**

- **Event Naming Convention:** `domain.action` or `entity.event`, camelCase (e.g., `portfolio.updated`, `asset.deleted`, `scenario.calculationCompleted`).
- **Event Payload Structure Standards:** Payloads should be plain JavaScript objects, type-checked with Zod schemas, containing only necessary data. Consistent with our FSD entities.
- **Event Versioning Approach:** Major breaking changes to event payloads should result in a new event name (e.g., `portfolio.updatedV2`). Minor additive changes can be handled with optional fields.
- **Async Event Handling Patterns:** Use a publish-subscribe pattern, potentially implemented via Zustand or a small custom event bus in `shared/lib/`.

**State Management (building on Zustand):**

- **State Update Patterns:** Always use immutable updates. No direct mutation of state objects.
- **Action Naming Conventions:** Use clear, descriptive names for actions (e.g., `setPortfolio`, `addAsset`, `updateScenario`).
- **Selector Patterns:** Use selectors to derive computed state, ensuring memoization where performance is critical.
- **State Organization Principles:** State should be organized by feature or domain within Zustand stores, consistent with FSD principles. Global state should be minimal; local component state preferred where applicable.

### Process Patterns

**Error Handling (building on previous decision):**

- **Global Error Handling Approach:** Use React Error Boundaries for UI component errors. All other application-level errors (network, calculation, data) should be caught and routed through our Centralized Error Handling service (which uses Custom Error Classes).
- **User-facing Error Message Format:** Consistent, user-friendly messages, avoiding technical jargon, mapped from Custom Error Classes. Displayed via consistent UI components (e.g., MUI Snackbar, Dialogs).
- **Logging vs User Error Distinction:** Errors that are purely technical and do not require immediate user action should be logged to Sentry silently. Errors requiring user attention (e.g., invalid input, network failure impacting data freshness) should trigger a user-facing message.

**Loading States (building on previous decisions):**

- **Loading State Naming Conventions:** `isLoading`, `isSubmitting`, `isFetching` boolean flags.
- **Global vs Local Loading States:** Prefer local loading states (`isLoading` on individual components/features). Global loading indicators (e.g., a top progress bar) should be used sparingly for critical, app-wide data fetches or long initial loads.
- **Loading State Persistence:** Loading states should ideally reset when the operation completes or fails. Avoid "stuck" loading indicators.
- **Loading UI Patterns:** Use lightweight visual cues like spinners (MUI CircularProgress), skeleton loaders, or shimmer effects (as discussed for heavy computations) to indicate asynchronous operations.

### Enforcement Guidelines

**All AI Agents MUST:**

- Adhere strictly to these defined naming conventions for databases, APIs, and code elements.
- Follow the Feature-Sliced Design (FSD) project organization and file structure rules.
- Implement data exchange and API communication using the specified format patterns.
- Utilize the defined event system and state management patterns for internal communication.
- Conform to the established error handling and loading state process patterns.

**Pattern Enforcement:**

- Automated linting rules will be configured where possible (ESLint, Prettier).
- Code reviews will rigorously check for adherence to these patterns.
- Documentation (`architecture.md`) will serve as the single source of truth for these rules.

**Pattern Examples:**
(These will be added during implementation as concrete code examples.)

**Good Examples:**

- `src/features/portfolio-management/components/PortfolioCard.tsx`
- `src/shared/lib/formatters.ts` (`formatCurrency`)
- `portfolio.assetAdded` event with Zod-validated payload.

**Anti-Patterns:**

- Mixing `camelCase` and `snake_case` in JSON payloads.
- Direct mutation of Zustand store state.
- Ad-hoc error message display.

**Anti-Patterns:**

- Mixing `camelCase` and `snake_case` in JSON payloads.
- Direct mutation of Zustand store state.
- Ad-hoc error message display.

## Project Structure & Boundaries

### Complete Project Directory Structure

```
project-name/
├── .env                       # Environment variables for different stages
├── .env.development
├── .env.production
├── .eslintrc.cjs              # ESLint configuration
├── .gitignore
├── .prettierrc.cjs            # Prettier configuration
├── package.json               # Project dependencies and scripts
├── package-lock.json
├── README.md                  # Project overview and instructions
├── scripts/
│   └── setup.sh               # Custom setup script for consistent environments
├── configs/                   # Vetted configuration files for setup.sh
│   ├── .eslintrc.json
│   ├── prettier.config.js
│   └── # ... other config templates
├── src/
│   ├── app/                   # App Layer: Global setup, providers, router, styles
│   │   ├── AppProvider.tsx    # Context/global providers
│   │   ├── MuiThemeProvider.tsx # MUI theme setup
│   │   ├── Router.tsx         # React Router configuration
│   │   ├── main.tsx           # Application entry point
│   │   └── index.css          # Global styles
│   ├── pages/                 # Pages Layer: Composition of widgets to form full routes
│   │   ├── DashboardPage.tsx
│   │   ├── ScenarioBuilderPage.tsx
│   │   └── ActionPlanPage.tsx
│   ├── widgets/               # Widgets Layer: Major standalone UI blocks combining features
│   │   ├── SplitScreenDashboard/ # Combines Current & Target portfolios
│   │   │   └── SplitScreenDashboard.tsx
│   │   ├── OnboardingWizard/  # Combines Magic Import & Welcome
│   │   │   └── OnboardingWizard.tsx
│   │   ├── ActionPlanChecklist/ # The full trade execution list
│   │   │   └── ActionPlanChecklist.tsx
│   │   └── # ... other widgets
│   ├── features/              # Features Layer: User interactions that carry business value (complex logic)
│   │   ├── magic-import/      # Logic for parsing messy text, error handling
│   │   │   ├── components/
│   │   │   ├── model/         # Internal logic, helpers
│   │   │   ├── hooks/
│   │   │   └── index.ts       # Public API for the feature
│   │   ├── scenario-modeler/  # Logic for sliders, 'Recalculate', state diffing
│   │   │   ├── components/
│   │   │   ├── model/
│   │   │   ├── hooks/
│   │   │   ├── web-worker/    # Web Worker specific logic for calculations
│   │   │   └── index.ts
│   │   ├── trade-generator/   # Logic for calculating Sells/Buys
│   │   │   ├── model/
│   │   │   └── index.ts
│   │   └── # ... other features
│   ├── entities/              # Entities Layer: Business data models and their display components (Visuals without logic)
│   │   ├── portfolio/         # Types, Zod schemas, Dexie.js interactions
│   │   │   ├── model/
│   │   │   ├── components/    # Display cards for individual assets
│   │   │   ├── store/         # Zustand store specific to portfolio
│   │   │   └── index.ts
│   │   ├── market-data/       # Types, API calls for market data
│   │   │   ├── model/
│   │   │   └── index.ts
│   │   ├── user/              # User profile data, encryption/decryption logic
│   │   │   ├── model/
│   │   │   └── index.ts
│   │   └── # ... other entities
│   ├── shared/                # Shared Layer: Reusable utilities and UI primitives (Atomic Design part)
│   │   ├── lib/               # Utility functions, services
│   │   │   ├── formatters.ts
│   │   │   ├── validators.ts
│   │   │   ├── encryption.ts    # Web Crypto API wrappers for app-level encryption
│   │   │   ├── error-handling.ts # Centralized Error Handling service
│   │   │   ├── events.ts        # Custom event bus
│   │   │   └── # ... other utilities
│   │   ├── ui/                # Our customized MUI components (Atoms & Molecules)
│   │   │   ├── buttons/
│   │   │   ├── forms/
│   │   │   ├── DataGrid/      # Wrapper for MUI X Data Grid (lazy-loaded)
│   │   │   ├── Charts/        # Wrapper for Recharts (lazy-loaded)
│   │   │   ├── themes/        # MUI theme definitions
│   │   │   └── # ... other UI components
│   │   ├── assets/            # General assets processed by Vite
│   │   ├── config/            # Shared app-level constants
│   │   ├── hooks/             # General-purpose React hooks
│   │   ├── types/             # Global types/interfaces
│   │   └── # ... other shared concerns
│   └── tests/                 # Centralized test directory (for integration/e2e)
│       ├── unit/              # Unit tests co-located with features/entities/shared
│       ├── integration/       # e.g., integration of Dexie.js with Zod validation
│       └── e2e/               # Playwright or Cypress tests
├── public/                    # Static Assets (directly served, e.g., PWA manifest/icons)
│   ├── icons/                 # PWA icons
│   └── manifest.webmanifest
└── docs/                      # Documentation (general project docs)
    └── architecture.md        # This document
```

### Architectural Boundaries

**API Boundaries:**

- **External Market Data:** Fetched client-side, typically within `entities/market-data/` or `features/` slices. Responses validated with Zod.
- **Internal Communication:** Primarily via shared Zustand stores, custom event bus in `shared/lib/events.ts`, and React `props`.

**Component Boundaries:**

- Strictly enforced by Feature-Sliced Design (FSD) layers. Components in a higher layer can import from lower layers, but not vice-versa, ensuring clear responsibilities and preventing circular dependencies.
- Widgets combine features, features implement business logic, entities manage data models and basic display, and shared provides reusable primitives.

**Data Boundaries:**

- **Local Persistence:** IndexedDB (via Dexie.js) is the primary data storage boundary, managed by `entities/` slices.
- **Encryption:** Application-level encryption (Web Crypto API, passphrase/PIN derived key) ensures data privacy, likely implemented within `entities/user/model` or `shared/lib/encryption.ts`.
- **Validation:** Zod schemas define and enforce data boundaries across all layers.

**Service Boundaries:**

- Implicitly defined within FSD `features/` and `entities/` slices, where specific business logic or data access operations are encapsulated.

### Requirements to Structure Mapping

**Feature/Epic Mapping:**

- **Magic Importer:** `features/magic-import/`
- **Scenario Modeler:** `features/scenario-modeler/` (including `web-worker/` for heavy calculations)
- **Trade Generator:** `features/trade-generator/`
- **Portfolio Data (Models, UI):** `entities/portfolio/`
- **Market Data (Models, API):** `entities/market-data/`
- **User Data (Models, Encryption):** `entities/user/`
- **Dashboard View:** `pages/DashboardPage.tsx` composed of `widgets/SplitScreenDashboard/`
- **Action Plan View:** `pages/ActionPlanPage.tsx` composed of `widgets/ActionPlanChecklist/`

**Cross-Cutting Concerns:**

- **Centralized Error Handling:** `shared/lib/error-handling.ts`, integrated with React Error Boundaries in `app/AppProvider.tsx`.
- **Global UI Theme (MUI):** `app/MuiThemeProvider.tsx`, definitions in `shared/ui/themes/`.
- **Reusable UI Components:** `shared/ui/` (buttons, forms, `DataGrid/`, `Charts/`).
- **Performance Optimizations:** Code-splitting (`app/Router.tsx`, pages/widgets), Memoization (throughout components), Virtualization (`shared/ui/DataGrid/`), Web Workers (`features/scenario-modeler/web-worker/`).
- **PWA Setup:** `public/manifest.webmanifest`, `vite-plugin-pwa` config in `vite.config.ts`.
- **Routing:** `app/Router.tsx` using React Router.

### Integration Points

**Internal Communication:**

- **State Management:** Zustand stores (within `entities/` and `features/`).
- **Events:** Publish-subscribe pattern (custom event bus in `shared/lib/events.ts`).
- **Props:** Standard React prop drilling for local state.

**External Integrations:**

- **Market Data API:** Fetched via client-side requests in `entities/market-data/`.
- **Sentry:** Integrated in `app/main.tsx` and `shared/lib/error-handling.ts`.
- **Google Analytics:** Integrated in `app/main.tsx` (or similar global entry point).

**Data Flow:**

- User input -> `features/` logic -> `entities/` model update (Zod validation, encryption) -> IndexedDB.
- IndexedDB -> `entities/` model read (decryption, Zod validation) -> `features/` logic -> `widgets/` -> `pages/` -> UI.
- Market Data Fetch -> `entities/market-data/` -> Cache/IndexedDB -> UI.

### File Organization Patterns

**Configuration Files:**

- Root-level for project config (`vite.config.ts`, `tsconfig.json`, `.eslintrc.cjs`, `prettier.config.cjs`, `vitest.config.ts`).
- Environment variables (`.env*`) at root.
- Dedicated `configs/` folder for vetting template files used by `scripts/setup.sh`.

**Source Organization:**

- Adheres to Feature-Sliced Design (FSD) layers (`app/`, `pages/`, `widgets/`, `features/`, `entities/`, `shared/`).
- Each FSD slice has internal organization (e.g., `components/`, `model/`, `hooks/`, `index.ts` for public API).

**Test Organization:**

- Unit tests (`*.test.ts`) co-located with the component/logic they test within their respective FSD slices.
- `src/tests/` for higher-level integration and E2E tests (`integration/`, `e2e/`).

**Asset Organization:**

- `public/` for static assets directly served by the web server (e.g., PWA manifest, icons).
- `src/shared/assets/` for images, SVGs, or other media processed and optimized by Vite.

### Development Workflow Integration

**Development Server Structure:**

- Vite's development server (`vite`) will serve the application, with HMR (Hot Module Replacement) ensuring rapid feedback.
- `npm run dev` will start the development server.

**Build Process Structure:**

- Vite's build command (`vite build`) will compile and optimize the application into static assets.
- `npm run build` will trigger the production build.

**Deployment Structure:**

- Vercel's built-in Git integration will detect pushes to the main branch, trigger a build (`npm run build`), and deploy the static assets.
- Pre-commit hooks (Husky) will ensure code quality before reaching the CI/CD pipeline.

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All technology choices (Vite, React, TypeScript, MUI, Zustand, React Router, Dexie.js, Zod, Web Crypto API, Vercel, Sentry, Google Analytics) are compatible and synergistically chosen to form a robust client-side application. The decision for a minimal Vite starter provides full control over integration, preventing conflicts.

**Pattern Consistency:**
Implementation patterns for Naming, Structure, Format, Communication, and Process are consistently aligned with the chosen technology stack and the Feature-Sliced Design (FSD) approach, ensuring predictability and maintainability.

**Structure Alignment:**
The Feature-Sliced Design (FSD) project structure robustly supports all architectural decisions and chosen patterns, providing clear component boundaries, organization, and integration points.

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:**
All functional requirements detailed in the Product Requirements Document (PRD), including complex portfolio input, scenario simulation, comparison, withdrawal/tax modeling, and local data persistence, are comprehensively supported by the defined architecture.

**Non-Functional Requirements Coverage:**
All critical Non-Functional Requirements (NFRs) are explicitly addressed:

- **Performance:** Addressed by code-splitting, aggressive memoization, virtualization, Web Workers, bundle optimization, lazy loading of heavy components.
- **Security/Privacy:** Ensured through client-side only processing, local data persistence, and application-level encryption via the Web Crypto API.
- **Offline Capability:** Supported by PWA implementation, service workers, and a strategic caching approach.
- **Accessibility:** WCAG 2.1 Level AA compliance is foundational, integrated via MUI components and emphasized for data visualizations.
- **Browser Compatibility:** Ensured through the initial starter setup and explicit NFRs.
- **Transparency:** The "no black box" principle is supported by the architecture's clarity and documentation.

### Implementation Readiness Validation ✅

**Decision Completeness:**
All critical architectural decisions are documented, including chosen technologies, versions (where applicable), and detailed rationale. This provides a clear guide for AI agents and human developers.

**Structure Completeness:**
A comprehensive and specific Feature-Sliced Design (FSD) directory structure has been defined, mapping all key components and their locations within the project.

**Pattern Completeness:**
A broad range of potential conflict points across Naming, Structure, Format, Communication, and Process have been addressed with clear, enforceable consistency rules.

### Gap Analysis Results

**No critical or important gaps** were identified that would block immediate implementation.

**Nice-to-Have Gaps:**

- **Concrete Pattern Examples:** While patterns are defined, specific code examples for each pattern would further enhance clarity. These can be generated during the initial implementation phase.
- **Detailed CI/CD Workflow:** The general CI/CD approach is defined, but a fully detailed YAML configuration for Vercel/GitHub Actions is an implementation detail that will be part of the initial setup epic.

### Architecture Completeness Checklist

**✅ Requirements Analysis**

- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**✅ Architectural Decisions**

- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**✅ Implementation Patterns**

- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**✅ Project Structure**

- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High

**Key Strengths:**

- **Robust Client-side Foundation:** Leverages modern web technologies (Vite, React, TypeScript) with a strong emphasis on performance, privacy, and user experience.
- **Clear Structure & Consistency:** Feature-Sliced Design (FSD) combined with detailed implementation patterns provides a predictable and scalable codebase.
- **Comprehensive Risk Mitigation:** Architectural decisions and patterns explicitly address NFRs like performance, security, and data integrity, and preemptively tackle potential implementation conflicts.
- **High Implementation Readiness:** The detailed documentation, including starter template strategy and integration boundaries, provides a clear roadmap for developers, human or AI.

**Areas for Future Enhancement:**

- Development of concrete code examples for each pattern during initial implementation.
- Refinement of CI/CD pipeline configurations as the project evolves.

### Implementation Handoff

**AI Agent Guidelines:**

- Follow all architectural decisions exactly as documented in this `architecture.md` file.
- Use implementation patterns consistently across all components and modules.
- Respect the defined project structure and boundaries.
- Refer to this document for all architectural questions and as the single source of truth.

**First Implementation Priority:**
Initialize the project using the "Official Vite `react-ts` Template with Custom Setup Script" strategy, which involves scaffolding the basic project and then setting up all core dependencies and configurations via a repeatable shell script.
