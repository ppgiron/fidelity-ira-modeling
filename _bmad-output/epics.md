---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-review-and-restructure']
inputDocuments:
  - _bmad-output/prd.md
  - _bmad-output/architecture.md
  - _bmad-output/ux-design-specification.md
---

# fidelity-ira-modeling - Epic Breakdown (Revised)

## Overview

This document provides the complete epic and story breakdown for fidelity-ira-modeling, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories. **This version has been restructured to ensure all epics are user-centric and independently deliver value.**

## Sprint Zero - Technical Tasks
_These are foundational setup tasks, not user stories. They must be completed before starting Epic 1._

- **Task 0.1: Initialize Project Structure & Core Dependencies:** Set up a fully configured project scaffold with all core dependencies (React, Vite, MUI, etc.) and the Feature-Sliced Design (FSD) architectural layers, enabling a consistent and scalable foundation.
- **Task 0.2: Define Core Data Entities & Initial Persistence Layer:** Define and validate the `Portfolio` and `Asset` data models (using Zod) and establish the encrypted IndexedDB persistence layer (using Dexie.js) to create a secure source of truth.

## Requirements Inventory

### Functional Requirements

FR1: The system must allow portfolio creation via manual entry of holdings.
FR2: The system must allow portfolio creation via CSV import compatible with the Fidelity format.
FR3: The system must automatically fetch and display current market prices for imported holdings.
FR4: The system must calculate and display the total portfolio value and basic breakdowns (e.g., by asset).
FR5: The user must be able to define a target portfolio allocation using interactive sliders or percentage inputs.
FR6: The user interface must provide real-time updates as the target allocation is modified.
FR7: The system must generate and display a trade list required to transition from the current to the target allocation.
FR8: The system must provide a set of pre-built economic scenarios for stress-testing.
FR9: The user must be able to apply scenarios to both their current and proposed portfolio allocations.
FR10: The scenario simulation must calculate and display the ending value, maximum drawdown, and annualized return.
FR11: The system must provide a side-by-side comparison view of the current vs. proposed portfolios under a selected scenario.
FR12: The comparison view must highlight the best and worst outcomes for key metrics.
FR13: The user must be able to specify a cash withdrawal amount as part of a proposed allocation.
FR14: The system must calculate the 10% early withdrawal tax penalty if the user is under the age of 59.5 and making a withdrawal.
FR15: The final scenario results must clearly display the post-withdrawal portfolio value and the total penalty amount.
FR16: All user portfolio data must be stored locally in the user's browser.
FR17: The system must identify and display portfolio concentration risks (e.g., by sector or asset class).

### NonFunctional Requirements
_(Unchanged)_

### Additional Requirements
_(Unchanged)_

### FR Coverage Map (Revised)

FR1: Epic 1 - "Hello, Asset!" & The Demo Portfolio
FR2: Epic 3 - Full Portfolio Onboarding
FR3: Epic 1 - "Hello, Asset!" & The Demo Portfolio
FR4: Epic 1 - "Hello, Asset!" & The Demo Portfolio
FR5: Epic 2 - Interactive Modeling, Comparison & Action
FR6: Epic 2 - Interactive Modeling, Comparison & Action
FR7: Epic 2 - Interactive Modeling, Comparison & Action
FR8: Epic 2 - Interactive Modeling, Comparison & Action
FR9: Epic 2 - Interactive Modeling, Comparison & Action
FR10: Epic 2 - Interactive Modeling, Comparison & Action
FR11: Epic 2 - Interactive Modeling, Comparison & Action
FR12: Epic 2 - Interactive Modeling, Comparison & Action
FR13: Epic 2 - Interactive Modeling, Comparison & Action
FR14: Epic 2 - Interactive Modeling, Comparison & Action
FR15: Epic 2 - Interactive Modeling, Comparison & Action
FR16: Epic 1 - "Hello, Asset!" & The Demo Portfolio
FR17: Epic 3 - Full Portfolio Onboarding

## Epic List (Revised)

### Epic 1: "Hello, Asset!" & The Demo Portfolio
**Goal:** To allow a new user to instantly understand the app's value by displaying a hardcoded, interactive 'Demo Portfolio' on the initial screen, proving out the end-to-end UI and persistence architecture.
**FRs Covered:** FR1 (partially), FR3 (partially), FR4, FR16

### Epic 2: Interactive Modeling, Comparison & Action
**Goal:** To allow a user to model a target allocation against the pre-loaded **Demo Portfolio**, run complex scenarios (including withdrawals and tax penalties), see the results in a comparison table, and generate an actionable trade list.
**FRs Covered:** FR5, FR6, FR7, FR8, FR9, FR10, FR11, FR12, FR13, FR14, FR15

### Epic 3: Full Portfolio Onboarding
**Goal:** To enable users to replace the demo data by importing their entire real-world portfolio using the "Magic" CSV import feature.
**FRs Covered:** FR2, FR17

---

## Epic 1: "Hello, Asset!" & The Demo Portfolio
**Goal:** To allow a new user to instantly understand the app's value by displaying a hardcoded, interactive 'Demo Portfolio' on the initial screen, proving out the end-to-end UI and persistence architecture.

### Story 1.1: Create and Persist a Hardcoded Demo Portfolio
**As a** developer,
**I want** a service that provides and saves a static, hardcoded 'Demo Portfolio' object on first load,
**So that** we have a consistent and realistic dataset for the initial user experience.
**Acceptance Criteria:**
- **Given** the application loads for the first time, **When** the `getDemoPortfolio` function is called, **Then** it returns a valid `Portfolio` object containing at least 10 different `Asset` objects.
- **Given** the application loads for the first time, **When** the database is checked, **Then** the Demo Portfolio is automatically saved into the encrypted database.

### Story 1.2: Display the Demo Portfolio in a Simple UI
**As a** user,
**I want** to see the Demo Portfolio displayed in a clear and simple table when I first load the application,
**So that** I can immediately understand what the application does.
**Acceptance Criteria:**
- **Given** the application is loaded, **When** the main page is displayed, **Then** a table containing the assets from the Demo Portfolio is visible.
- **Given** the Demo Portfolio table is displayed, **When** I inspect the table, **Then** it contains columns for at least "Asset Ticker", "Quantity", and "Current Value".
- **Given** data is being decrypted and retrieved from the database, **When** the page is loading, **Then** a simple loading indicator is displayed.

---

## Epic 2: Interactive Modeling, Comparison & Action
**Goal:** To allow a user to model a target allocation against the pre-loaded **Demo Portfolio**, run complex scenarios (including withdrawals and tax penalties), see the results in a comparison table, and generate an actionable trade list.

### Story 2.1: Implement Core Scenario & Withdrawal Calculation Logic
**As a** user,
**I want** the system to accurately calculate the outcome of a financial scenario, including withdrawals and tax penalties, against my portfolio,
**So that** I can trust the results of my modeling.
**Acceptance Criteria:**
- **Given** a portfolio and a scenario `{ type: 'market_change', value: -0.20 }`, **When** the calculation function is called, **Then** the result's `endingValue` is 20% less than the start value.
- **Given** a portfolio and a scenario including `{ withdrawalAmount: 5000 }` and `isUnder59_5: true`, **When** the calculation is run, **Then** the result must contain a `penaltyAmount` of 500 and an `endingValue` reflecting both the withdrawal and the penalty.
- **Given** a scenario with a withdrawal and `isUnder59_5: false`, **When** the calculation is run, **Then** the `penaltyAmount` must be 0.
- **Given** the calculation logic, **When** it is tested, **Then** it must have at least 80% unit test coverage.

### Story 2.2: Create Target Allocation UI with Interactive Sliders
**As a** user,
**I want** to adjust my target portfolio allocation using interactive sliders,
**So that** I can easily model different investment strategies.
**Acceptance Criteria:**
- **Given** the Target Allocation UI is displayed, **When** I move a slider for one asset, **Then** the "Unallocated/Cash" bucket percentage automatically adjusts.
- **Given** the "Unallocated/Cash" bucket is at 0%, **When** I try to increase an asset's allocation, **Then** the slider movement is blocked.

### Story 2.3: Connect UI to Calculation Logic and Display Results
**As a** user,
**I want** to click a button to run my scenario and see the results of my current and target portfolios in a side-by-side comparison table,
**So that** I can easily evaluate the impact of my changes.
**Acceptance Criteria:**
- **Given** I have adjusted my target allocation, **When** I click the "Recalculate" button, **Then** the calculation function from Story 2.1 is called for both the current and target portfolios.
- **Given** the calculation is complete, **When** the results are displayed, **Then** a table shows key metrics (e.g., 'Ending Value', 'Max Drawdown') for both portfolios.
- **Given** the comparison table is displayed, **When** one portfolio outperforms the other, **Then** the better-performing cell is visually highlighted.

### Story 2.4: Visualize Scenario Outcomes in a Chart
**As a** user,
**I want** to see a chart that visually represents the performance of my current and target portfolios,
**So that** I can intuitively grasp the scenario's impact.
**Acceptance Criteria:**
- **Given** scenario results are available, **When** the chart is displayed, **Then** it shows two distinct lines for the 'Current' and 'Target' portfolios using the Recharts library.
- **Given** the chart is interactive, **When** I hover my mouse over a point on a line, **Then** a tooltip appears showing the specific value.

### Story 2.5: Generate Interactive Action Plan
**As a** user,
**I want** to generate a clear, step-by-step interactive checklist based on my target allocation,
**So that** I know exactly which trades to execute and can track my progress.
**Acceptance Criteria:**
- **Given** I have a target allocation, **When** I click "Generate Action Plan", **Then** a checklist of trades is displayed, grouped into "Step 1: Raise Cash" (Sells) and "Step 2: Invest" (Buys).
- **Given** the action plan is an interactive checklist, **When** I check off an item, **Then** its state persists locally and remains checked on page reload.

### Story 2.6: Meet Performance NFRs with a Web Worker
**As a** user,
**I want** the user interface to remain perfectly smooth and responsive, even while complex calculations are running,
**So that** the application feels fast and professional.
**Acceptance Criteria:**
- **Given** a user clicks "Recalculate", **When** the calculation logic from Story 2.1 is executed, **Then** it runs on a separate Web Worker thread.
- **Given** the calculation is running in the background, **When** the user interacts with other parts of the UI, **Then** all interactions respond in under 100ms.
- **Given** the calculation is running, **When** the UI is waiting for a response, **Then** the chart and comparison table areas are overlaid with a "shimmer" loading animation.
- **Given** the project documentation, **When** a benchmark is run, **Then** the average synchronous execution time is recorded for comparison against the asynchronous Web Worker implementation.

---

## Epic 3: Full Portfolio Onboarding
**Goal:** To enable users to replace the demo data by importing their entire real-world portfolio using the "Magic" CSV import feature.

### Story 3.1: Develop Client-Side CSV Parsing Logic
**As a** developer,
**I want** a robust, client-side parsing function that accepts raw text from a Fidelity CSV file and reliably extracts asset data,
**So that** user data remains private and the import process is resilient.
**Acceptance Criteria:**
- **Given** raw CSV text is provided to the parser, **When** the parsing function executes, **Then** all processing occurs entirely on the client-side.
- **Given** a row in the CSV text has an invalid format, **When** the text is parsed, **Then** the function flags that specific row as invalid but continues to parse the rest of the file.

### Story 3.2: Create Portfolio Import UI
**As a** user,
**I want** a simple interface to paste my CSV data, see a preview, and confirm the import,
**So that** I can easily get my portfolio into the application.
**Acceptance Criteria:**
- **Given** I am on the import page, **When** I paste CSV data into a text area, **Then** a preview table immediately appears showing the successfully parsed assets.
- **Given** the pasted CSV data contains invalid rows, **When** the preview is displayed, **Then** the invalid rows are visually highlighted in the original text area, with a tooltip explaining the error.
- **Given** both valid and invalid rows were parsed, **When** I click the "Import" button, **Then** only the valid rows are imported.

### Story 3.3: Replace Demo Data with Imported Portfolio
**As a** user,
**I want** the application to use my imported portfolio for all modeling and analysis after a successful import,
**So that** the application reflects my actual holdings.
**Acceptance Criteria:**
- **Given** a user has successfully imported a new portfolio, **When** they navigate to the main dashboard, **Then** the UI displays the assets from their imported portfolio.
- **Given** a user's portfolio is active, **When** the application is reloaded, **Then** the user's portfolio is loaded by default instead of the demo portfolio.