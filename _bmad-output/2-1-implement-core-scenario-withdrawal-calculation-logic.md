# Story 2.1: Implement Core Scenario & Withdrawal Calculation Logic

**Status:** needs-revision

---

## **Note to Dev Agent:** This is a comprehensive, developer-ready story. It incorporates critical details extracted from all project artifacts (PRD, Architecture, UX, previous stories). You MUST adhere to all instructions and guardrails to ensure flawless implementation and maintain project quality.

## Epic Context

**Epic 2: Interactive Modeling, Comparison & Action**

- **Goal:** To allow a user to model a target allocation against the pre-loaded **Demo Portfolio**, run complex scenarios (including withdrawals and tax penalties), see the results in a comparison table, and generate an actionable trade list.
- **Business Value:** This epic directly addresses the user's need to understand the impact of different investment strategies and market conditions, providing a tangible output (trade list) for action. It moves beyond just displaying data to enabling data-driven decision making and action.

## Story 2.1 Learnings (Prerequisites & Context)

This story builds upon the foundations laid in Story 1.1 and 1.2. The Dev Agent implementing this story MUST leverage the patterns and solutions established in previous work to prevent rework and maintain consistency.

**Key Learnings & Prerequisites from previous stories to Carry Forward:**

- **Web Crypto API & Dexie.js Usage:** Story 1.1 and 1.2 established the pattern for encrypted local persistence using Web Crypto API wrappers and Dexie.js. Scenario results and withdrawal data should follow these patterns.
- **Zod Validation:** Data models in Story 1.1 (Portfolio and Asset) used Zod validation. New data models for scenarios or calculation inputs should also use Zod.
- **File Structure Patterns & Absolute Imports:** Adherence to Feature-Sliced Design (FSD) and absolute imports (`@/`) as established in previous stories and the architecture.
- **Loading State Patterns:** Story 1.2 used a simple loading indicator. The performance NFRs for calculations will require more sophisticated loading states (shimmer/skeleton).
- **Previous Epic Retro Insights (Epic 1 Retro 2026-01-06):**
  - The crypto/worker foundation enables later modeling work, which is directly relevant to this story.
  - Performance instrumentation is needed for Epic 2.
  - Worker orchestration pattern for scenario calculations needs to be established.

## Story

As a user,
I want the system to accurately calculate the outcome of a financial scenario, including withdrawals and tax penalties, against my portfolio,
So that I can trust the results of my modeling.

## Acceptance Criteria

1.  **Given** a portfolio and a scenario `{ type: 'market_change', value: -0.20 }`, **When** the calculation function is called, **Then** the result's `endingValue` is 20% less than the start value.
2.  **Given** a portfolio and a scenario including `{ withdrawalAmount: 5000 }` and `isUnder59_5: true`, **When** the calculation is run, **Then** the result must contain a `penaltyAmount` of 500 and an `endingValue` reflecting both the withdrawal and the penalty.
3.  **Given** a scenario with a withdrawal and `isUnder59_5: false`, **When** the calculation is run, **Then** the `penaltyAmount` must be 0.
4.  **Given** the calculation logic, **When** it is tested, **Then** it must have at least 80% unit test coverage.

## Tasks / Subtasks

- [ ] **Task 1: Design and Implement Core Scenario Calculation Service**
  - [ ] Subtask 1.1: Define TypeScript types and Zod schemas for `ScenarioInput`, `CalculationResult`, `WithdrawalOptions`.
  - [ ] Subtask 1.2: Implement `calculateScenario` function that takes a portfolio, scenario parameters, and withdrawal options as input.
  - [ ] Subtask 1.3: Ensure `calculateScenario` accurately applies market changes to portfolio assets.
  - [ ] Subtask 1.4: Implement withdrawal logic, including reducing portfolio value and calculating 10% penalty if `isUnder59_5` is true.
  - [ ] Subtask 1.5: Ensure all calculations are transparent and avoid "black box" behavior.
- [ ] **Task 2: Integrate Calculation into Web Worker**
  - [ ] Subtask 2.1: Create a dedicated Web Worker (`src/features/scenario-modeler/web-worker/scenario-calculator.worker.ts`) to host the `calculateScenario` logic.
  - [ ] Subtask 2.2: Implement communication between the main thread and the Web Worker for sending inputs and receiving results.
  - [ ] Subtask 2.3: Ensure the main thread remains responsive while the worker is busy.
- [ ] **Task 3: Unit Testing (80%+ Coverage)**
  - [ ] Subtask 3.1: Write comprehensive unit tests for `calculateScenario` function, covering all acceptance criteria and edge cases (e.g., zero withdrawal, large withdrawal, various market changes).
  - [ ] Subtask 3.2: Verify 80%+ unit test coverage for the core calculation logic.

## Dev Notes

This section provides comprehensive context and guardrails for implementation. All points MUST be strictly adhered to.

### Project Structure Notes (FSD Compliance)

- **FSD Layer:** This feature/component belongs in `src/features/scenario-modeler/`.
- **Component Location:** No direct UI components for this story, primarily logic.
- **Data Access/Logic:** Core calculation logic will be in `src/features/scenario-modeler/model/calculations.ts`. Web Worker implementation in `src/features/scenario-modeler/web-worker/scenario-calculator.worker.ts`.
- **Absolute Imports:** ALWAYS use `@/` prefix for imports (e.g., `@/entities/portfolio/model/types`).
- **Naming Conventions:** Adhere to PascalCase for Types/Interfaces, camelCase for functions/variables.

### Architectural Guardrails

- **Technical Stack:** React (latest), TypeScript (latest), Vite, MUI v5, Dexie.js (latest), Web Crypto API.
- **Data Modeling & Persistence:**
  - Data models for scenarios and calculation inputs must use Zod schemas.
  - Persistence of scenario data (if needed) should follow the encrypted IndexedDB via Dexie.js pattern established in Epic 1. DO NOT bypass established services.
  - Validation: All data must pass Zod schemas upon input and before persistence/calculation.
- **Security Requirements:**
  - Local-Only Processing: All calculation logic is client-side. No sensitive data is sent to remote servers.
  - Encryption: If scenario results need to be persisted, they MUST be encrypted using established Web Crypto API wrappers.
  - Key Handling: Encryption keys derived from user passphrase/PIN, held in-memory ONLY.
- **Performance Requirements:**
  - **Heavy Computations:** Scenario calculation logic MUST be offloaded to a **Web Worker** (`src/features/scenario-modeler/web-worker/`).
  - **UI Responsiveness:** All UI interactions (e.g., loading indicators) must respond within <100ms, even during heavy calculations.
  - Loading States: Use "shimmer" or skeleton loaders for data fetching and heavy operations (UX-defined patterns).
- **API Design (if applicable):** Not applicable, purely client-side logic.
- **Error Handling:** Use Centralized Error Handling (`src/shared/lib/error-handling.ts`) and custom error classes for calculation-specific errors. Expected errors (e.g., invalid input) should return `Error` objects, not throw.

### UI/UX Design Patterns

- **Design System:** Adhere to **MUI's Material Design principles** and the project's custom theme.
- **Key UX Patterns:** "Progressive Density" (for displaying results), "Advisor-Grade" aesthetic.
- **Accessibility Standards:** WCAG 2.1 Level AA compliance, keyboard navigation, screen reader support, color contrast for any UI related to displaying results or triggering calculations.
- **Specific UI/UX components for this story:** N/A for core logic, but results will be consumed by UI stories (2.3, 2.4). The "Recalculate" button feedback (glowing, shimmer) is crucial.

### Testing Standards

- **Unit Tests:** Co-located (`.test.ts` files) within `src/features/scenario-modeler/model/`. Target **80%+ coverage** for the core `calculateScenario` function.
- **Integration Tests:** Located in `src/tests/integration/`. Focus on verifying communication between the main thread and the Web Worker, and the correct flow of data and results.
- **Performance Tests:** Benchmark capture process needs to be defined (from Epic 1 Retro). Ensure performance targets (<500ms for calculation, <100ms UI responsiveness) are met.

### Anti-Patterns to Avoid

- **Direct DOM Manipulation:** Avoid.
- **Synchronous Blocking Operations:** NEVER run calculation logic on the main UI thread. MUST use Web Worker.
- **Storing Sensitive Data Unencrypted:** All persisted data MUST be encrypted.
- **Hardcoding Environment Variables/Secrets:** Avoid.
- **Inconsistent JSON Field Naming:** Use `camelCase`.
- **Direct Mutation of Zustand Store State:** Always use immutable updates for any state related to scenario inputs or results.
- **Assuming Successful Worker Initialization:** Handle potential worker failures gracefully.
- **Passing Unvalidated Data to/from Workers:** All data crossing the main thread/worker boundary must be schema-validated with Zod.
- **Running Key Derivation on the Main Thread:** Any cryptographic operations (if needed for scenario data) MUST be offloaded to a Web Worker.
- **Generic Error Messages:** Provide specific, user-friendly error messages (e.g., `CalculationError: Invalid scenario input`).

### Code Reuse Opportunities

- **Formatters:** Use `src/shared/lib/formatters.ts` for consistent display of numerical results (currency, percentage).
- **Error Handling:** Utilize `src/shared/lib/error-handling.ts` for centralized error management.
- **Zod Schemas:** Reuse schemas from `src/entities/portfolio/model/types.ts` for portfolio data; define new ones in `src/features/scenario-modeler/model/types.ts` for scenario-specific data.
- **Web Worker Utilities:** If general Web Worker communication patterns are established in `shared/lib/`, reuse them.

## References

- **Epic Definition:** [Source: _bmad-output/epics.md#Epic-2-"Interactive Modeling, Comparison & Action"]
- **Architecture Decision Document:** [Source: _bmad-output/architecture.md]
- **UX Design Specification:** [Source: _bmad-output/ux-design-specification.md]
- **Project Context:** [Source: _bmad-output/project-context.md]
- **Epic 1 Retrospective:** [Source: _bmad-output/epic-1-retro-2026-01-06.md]

## Dev Agent Record

### Implementation Notes

- Focus on creating robust, accurate, and performant calculation logic.
- Strictly adhere to the Web Worker requirement for all scenario calculations to maintain UI responsiveness.
- Ensure thorough unit testing (80%+ coverage) for the core calculation logic.
- Implement clear error handling for invalid inputs or calculation failures.

### Completion Notes List

### Expected Files to Create/Modify for this Story

- `src/features/scenario-modeler/model/types.ts` (for Zod schemas and TypeScript types)
- `src/features/scenario-modeler/model/calculations.ts` (core calculation logic)
- `src/features/scenario-modeler/web-worker/scenario-calculator.worker.ts` (Web Worker implementation)
- `src/features/scenario-modeler/web-worker/index.ts` (worker entry point/utility)
- `src/features/scenario-modeler/model/calculations.test.ts` (unit tests)
- `src/tests/integration/scenario-worker.test.ts` (integration tests for worker communication)

## Change Log

**Friday, January 10, 2026** - Initial Story Creation

- Based on Epic 2 definition, PRD, Architecture, UX, and Project Context.
- Identified core calculation logic, Web Worker integration, and testing as key tasks.
- Incorporated learnings from Epic 1 Retrospective.

## Story Completion Status

**Status:** ready-for-dev
**Completion Note:** Comprehensive developer guide created with deep artifact analysis.
