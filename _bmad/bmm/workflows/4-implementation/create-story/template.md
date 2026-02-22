# Story {{epic_num}}.{{story_num}}: {{story_title}}

**Status:** needs-revision

---

## **Note to Dev Agent:** This is a comprehensive, developer-ready story. It incorporates critical details extracted from all project artifacts (PRD, Architecture, UX, previous stories). You MUST adhere to all instructions and guardrails to ensure flawless implementation and maintain project quality.

## Epic Context

**Epic {{epic_num}}: {{epic_title}}**

- **Goal:** [Summarize Epic goal and business value from epics.md]
- **Business Value:** [Explain why this Epic is important for the product and users]

## Story {{previous_epic_num}}.{{previous_story_num}} Learnings (Prerequisites & Context)

This story builds upon the foundations laid in Story {{previous_epic_num}}.{{previous_story_num}}. The Dev Agent implementing this story MUST leverage the patterns and solutions established in previous work to prevent rework and maintain consistency.

**Key Learnings & Prerequisites from Story {{previous_epic_num}}.{{previous_story_num}} to Carry Forward:**

- **[Previous Learning 1]:** [e.g., Encryption patterns, Dexie.js usage, Web Workers for key derivation from Story 1.1]
- **[Previous Learning 2]:** [e.g., Zod validation for data models from Story 1.1]
- **[Previous Learning 3]:** [e.g., File structure patterns, absolute imports from previous implementations]
- **[Previous Learning 4]:** [e.g., Established error handling or loading state patterns]
- **[Previous Learning 5]:** [e.g., Identified anti-patterns or successful testing approaches]

## Story

As a {{role}},
I want {{action}},
so that {{benefit}}.

## Acceptance Criteria

1.  [Detailed acceptance criteria, preferably in BDD (Given/When/Then) format, extracted from epics or PRD]
2.  [Include specific success criteria and validation points]
3.  [Ensure ACs cover functional and key non-functional aspects related to the story]

## Tasks / Subtasks

- [ ] **Task 1: [High-level task description, e.g., Implement Feature X]**
  - [ ] Subtask 1.1: [Detailed subtask, explicitly referencing components, modules, or patterns]
  - [ ] Subtask 1.2: [Another detailed subtask]
- [ ] **Task 2: [Another high-level task]**
  - [ ] Subtask 2.1: [Specific implementation steps]
- [ ] **Task 3: [Testing Task - CRITICAL]**
  - [ ] Subtask 3.1: Write unit tests for [component/module] (targeting X% coverage).
  - [ ] Subtask 3.2: Write integration tests for [data flow/component interaction].
  - [ ] Subtask 3.3: Perform accessibility review for [component/feature].

## Dev Notes

This section provides comprehensive context and guardrails for implementation. All points MUST be strictly adhered to.

### Project Structure Notes (FSD Compliance)

- **FSD Layer:** This feature/component belongs in `src/[FSD_LAYER]/[FEATURE_NAME]/`.
- **Component Location:** For UI components, typically `src/[FSD_LAYER]/[FEATURE_NAME]/components/ComponentName.tsx`.
- **Data Access/Logic:** Hooks/services for this story should be in `src/[FSD_LAYER]/[FEATURE_NAME]/hooks/` or `src/[FSD_LAYER]/[FEATURE_NAME]/model/`.
- **Absolute Imports:** ALWAYS use `@/` prefix for imports (e.g., `@/entities/portfolio/components/`).
- **Naming Conventions:** Adhere to PascalCase for Components, camelCase for props/variables/functions, `use` prefix for hooks.

### Architectural Guardrails

- **Technical Stack:**
  - **React:** v18+
  - **TypeScript:** Strict mode enabled.
  - **MUI (Material-UI):** v5 (for UI components).
  - **[Other relevant library]:** [Version] (e.g., `MUI X Data Grid` if applicable for tables).
- **Data Modeling & Persistence:**
  - **Data Models:** Use `Portfolio` and `Asset` types/schemas from `src/entities/portfolio/model/types.ts`.
  - **Persistence:** Data MUST be stored in **encrypted IndexedDB via Dexie.js**. DO NOT bypass established services.
  - **Validation:** All data must pass **Zod schemas** upon input and before persistence.
- **Security Requirements:**
  - **Local-Only Processing:** No sensitive data is to be sent to remote servers. All processing is client-side.
  - **Encryption:** Data at rest MUST be encrypted using established Web Crypto API wrappers (`src/shared/lib/encryption.ts`).
  - **Key Handling:** Encryption keys derived from user passphrase/PIN, held in-memory ONLY.
- **Performance Requirements:**
  - **UI Responsiveness:** All user interactions (e.g., renders, updates) must respond within **<100ms**.
  - **Heavy Computations:** MUST be offloaded to **Web Workers** (`src/shared/lib/crypto.worker.ts` for crypto, use `features/scenario-modeler/web-worker/` for others).
  - **Loading States:** Use "shimmer" or skeleton loaders (`MUI Skeleton`) for data fetching and heavy operations.
- **API Design (if applicable):** [e.g., Use direct API response, `{ data: ... }` wrapper, ISO 8601 for dates].
- **Error Handling:** Use Centralized Error Handling (`src/shared/lib/error-handling.ts`) and React Error Boundaries.

### UI/UX Design Patterns

- **Design System:** Adhere to **MUI's Material Design principles** and the project's custom theme.
- **Key UX Patterns:**
  - **"Progressive Density":** Default view should be concise, with clear paths to more detail.
  - **"Advisor-Grade" Aesthetic:** Maintain professional, clean, data-rich appearance as per `ux-design-specification.md`.
  - **[Specific Pattern]:** [e.g., Button hierarchy, Feedback patterns like "stale" glow, empty states design].
- **Accessibility Standards:**
  - **WCAG 2.1 Level AA Compliance:** Mandatory for all UI components.
  - **Keyboard Navigation:** All interactive elements must be keyboard-navigable.
  - **Screen Reader Support:** Proper ARIA attributes and semantic HTML5 for screen reader users.

### Testing Standards

- **Unit Tests:** Co-located (`.test.ts` files). Target **80%+ coverage** for core business logic.
- **Integration Tests:** Located in `src/tests/integration/`. Verify data flow and component interactions.
- **Accessibility Tests:** Use automated tools (e.g., Axe, Lighthouse) and manual checks.
- **Performance Tests:** Basic checks during development; formal NFR verification in dedicated tasks.
- **Regression Tests:** Ensure new features do not break existing functionality, especially for data persistence.

### Anti-Patterns to Avoid

- **Reinventing Core Functionality:** Do NOT re-implement data fetching, encryption, decryption, or Zod validation logic. REUSE established services and hooks (e.g., `useInitDemoPortfolio`).
- **Direct IndexedDB Access:** NEVER directly interact with IndexedDB. Always use Dexie.js via `src/shared/lib/db.ts` and portfolio services.
- **Non-FSD Compliant Code:** DO NOT place files outside their designated FSD layers.
- **Hardcoding Sensitive Data:** Avoid hardcoding values that should be dynamic or secure.
- **Blocking UI Thread:** Ensure heavy computations or I/O operations are asynchronous and do not block the main UI thread.
- **Unvalidated Data:** All data inputs and outputs MUST be validated.
- **Ad-hoc Error Handling:** Use the centralized error handling system.

### Code Reuse Opportunities

- **Formatters:** Use `src/shared/lib/formatters.ts` for consistent currency, date, and number formatting.
- **UI Primitives:** Leverage existing components from `src/shared/ui/` for consistency (e.g., buttons, inputs, data displays).
- **Hooks:** Utilize established hooks from `src/shared/hooks/` or `src/entities/[ENTITY]/hooks/`.
- **Zod Schemas:** Reuse schemas from `src/entities/portfolio/model/types.ts` for data validation.

## References

- **Epic Definition:** [Source: _bmad-output/epics.md#Epic-{{epic_num}}-"{{epic_title}}"]
- **Previous Story Learnings:** [Source: _bmad-output/{{previous_epic_num}}-{{previous_story_num}}-{{previous_story_title_slug}}.md]
- **Architecture Decision Document:** [Source: _bmad-output/architecture.md]
- **UX Design Specification:** [Source: _bmad-output/ux-design-specification.md]
- **Project Context:** [Source: _bmad-output/project-context.md] (for general rules, like strict TypeScript, ESLint, Prettier)

## Dev Agent Record

### Implementation Notes

- Focus on delivering a high-quality, performant, and accessible component that seamlessly integrates with the existing system.
- Pay close attention to error handling, loading states, and adherence to all architectural and UX guidelines.

### Completion Notes List

### Expected Files to Create/Modify for this Story

- `src/[FSD_LAYER]/[FEATURE_NAME]/components/ComponentName.tsx` (e.g., `src/entities/portfolio/components/PortfolioTable.tsx`)
- `src/[FSD_LAYER]/[FEATURE_NAME]/hooks/useDataHook.ts` (e.g., `src/entities/portfolio/hooks/usePortfolioData.ts`)
- `src/[FSD_LAYER]/[FEATURE_NAME]/components/ComponentName.test.ts` (unit tests)
- `src/tests/integration/FeatureIntegration.test.ts` (integration tests)
- [Any other relevant files]

## Change Log

**Friday, January 2, 2026** - Template REVISED

- Revised based on `Sprint Change Proposal` triggered by validation report.
- Expanded sections for Epic Context, Previous Story Learnings, Architectural Guardrails, UI/UX Design Patterns, Testing Standards, Anti-Patterns to Avoid, and Code Reuse Opportunities.
- Added explicit section for `Expected Files to Create/Modify`.
- Enhanced mandates for comprehensive, developer-ready story generation.
