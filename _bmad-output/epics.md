---
stepsCompleted: [1]
inputDocuments:
  [
    '_bmad-output/prd.md',
    '_bmad-output/architecture.md',
    '_bmad-output/ux-design-specification.md',
    '_bmad-output/epic-1-retro-2026-01-06.md',
  ]
---

# fidelity-ira-modeling - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for fidelity-ira-modeling, decomposing the requirements from the PRD, UX Design, and Architecture documents into implementable stories. It has been updated to reflect the completion of Epic 1.

## Requirements Inventory

### Functional Requirements

FR1: The system must allow manual entry of portfolio holdings.
FR2: The system must support CSV import of portfolio holdings from Fidelity.
FR3: The system must automatically fetch current market prices for holdings.
FR4: The system must calculate and display the total value of the portfolio.
FR5: The system must display basic breakdowns of the portfolio.
FR6: The system must allow users to define a proposed asset allocation using sliders or percentage inputs.
FR7: The system must provide real-time updates as the user adjusts the proposed allocation.
FR8: The system must display an auto-generated trade list to achieve the proposed allocation.
FR9: The system must apply pre-built economic scenarios to both the current and proposed portfolios.
FR10: The system must calculate the ending value, maximum drawdown, and annualized return for each scenario simulation.
FR11: The system must present a side-by-side comparison of the current vs. proposed portfolios in a table view.
FR12: The comparison view must highlight the best and worst outcomes for each portfolio.
FR13: The system must allow a user to specify a cash withdrawal amount in a proposed allocation.
FR14: The simulation must model the necessary sales to generate the required cash for a withdrawal.
FR15: The system must calculate and display the estimated 10% early withdrawal tax penalty if the user is under 59.5 years old.
FR16: The final scenario results must clearly show the post-withdrawal portfolio value and the penalty amount.
FR17: All portfolio data must be stored locally in the user's browser.
FR18: The system must provide secure and private (local-first) handling of holdings.
FR19: The system must identify and display portfolio risks like sector or asset class concentration.

### Non-Functional Requirements

NFR1: All calculations must be transparent and visible (no "black box" algorithms).
NFR2: Financial data must remain local to the user's browser to ensure privacy.
NFR3: The core engine must be offline-capable.
NFR4: All core scenario calculations must complete within 500ms.
NFR5: On re-establishing a network connection, the application will automatically fetch fresh market data in the background.
NFR6: The application must indicate the freshness of the data in the UI.
NFR7: Heavy calculations must be offloaded to a Web Worker to keep the UI fluid.
NFR8: The application must be compatible with the latest two stable versions of Chrome, Firefox, Safari, and Edge.
NFR9: Initial Load Time must be less than 3 seconds on a standard broadband connection.
NFR10: UI interactions should respond in less than 100ms.
NFR11: The application must adhere to WCAG 2.1 Level AA where practical.
NFR12: All components, especially data visualizations, must be keyboard-navigable and screen-reader accessible.

_(A full list of additional requirements from Architecture and UX is omitted here for brevity but was used to inform story creation)_

## FR Coverage Map

| FR   | Requirement Summary                    | Epic.Story | Status |
| ---- | -------------------------------------- | ---------- | ------ |
| FR1  | Manual portfolio entry                 | 2.1        | To Do  |
| FR2  | Fidelity CSV import                    | 2.1        | To Do  |
| FR3  | Auto-fetch prices                      | 2.1        | To Do  |
| FR4  | Calculate/display total value          | 1.2        | Done   |
| FR5  | Display portfolio breakdowns           | 1.2        | Done   |
| FR6  | Slider/percentage allocation input     | 2.2        | To Do  |
| FR7  | Real-time updates on allocation change | 2.2        | To Do  |
| FR8  | Display auto-generated trade list      | 3.1        | To Do  |
| FR9  | Apply pre-built scenarios              | 2.2        | To Do  |
| FR10 | Calculate scenario outcomes            | 2.2        | To Do  |
| FR11 | Side-by-side comparison view           | 2.4        | To Do  |
| FR12 | Highlight best/worst outcomes          | 2.4        | To Do  |
| FR13 | Specify cash withdrawal                | 2.3        | To Do  |
| FR14 | Model sales for withdrawal             | 2.3        | To Do  |
| FR15 | Calculate 10% early withdrawal penalty | 2.3        | To Do  |
| FR16 | Show post-withdrawal value and penalty | 2.3        | To Do  |
| FR17 | Store data locally in browser          | 1.1        | Done   |
| FR18 | Secure, private, local-first data      | 1.1        | Done   |
| FR19 | Identify/display concentration risk    | 2.4        | To Do  |

## Epic List

- **Epic 1: Hello, Asset! & The Demo Portfolio (Completed)**
- **Epic 2: Interactive Modeling, Comparison & Action (Next Up)**
- **Epic 3: Action Plan & Execution (Future)**

---

## Epic 1: Hello, Asset! & The Demo Portfolio

**Status: Completed**

**Goal:** Establish the foundational data layer for the application, including secure local persistence, and provide an initial state by displaying a hardcoded demo portfolio to the user on first load.

### Story 1.1: Setup Encrypted Persistence for Portfolio Data

**As a** security-conscious user,
**I want** my portfolio data to be stored securely and privately on my local device,
**So that** I can use the application with confidence that my financial information is not exposed on the web.

**Acceptance Criteria:**

- **Given** the application is loaded,
- **When** portfolio data is created or modified,
- **Then** the data is persisted to the browser's IndexedDB.
- **And** all sensitive financial data within IndexedDB is encrypted using the Web Crypto API.
- **And** key derivation is handled in a Web Worker to avoid blocking the UI.

### Story 1.2: Display a Hardcoded Demo Portfolio on First Load

**As a** new user,
**I want** to see a meaningful example portfolio when I first open the application,
**So that** I can immediately understand the tool's capabilities without having to input my own data first.

**Acceptance Criteria:**

- **Given** a new user opens the application for the first time,
- **When** the main dashboard page loads,
- **Then** a pre-defined demo portfolio is loaded from a local data source.
- **And** the demo portfolio's assets, value, and breakdown are displayed in the UI.

---

## Epic 2: Interactive Modeling, Comparison & Action

**Status: Next Up**

**Goal:** Enable the core user journey of importing a real portfolio, interactively modeling changes to it against economic scenarios, and clearly seeing the calculated impact of those changes.

### Story 2.1: Implement "Magic" CSV Import and Manual Portfolio Entry

**As a** user with an existing portfolio,
**I want** to easily import my holdings from a Fidelity CSV file or enter them manually,
**So that** I can quickly get my own data into the tool.

### Story 2.2: Implement Interactive Allocation Sliders and "Recalculate" a Scenario

**As a** user exploring options,
**I want** to adjust my target asset allocation using interactive sliders and run a pre-built scenario calculation on demand,
**So that** I can see how my changes affect the portfolio's performance.

### Story 2.3: Implement Core Scenario Withdrawal Calculation Logic

**As a** user planning for retirement,
**I want** to include a cash withdrawal in my scenario and see the calculated tax penalties,
**So that** I can understand the true cost of an early withdrawal.

### Story 2.4: Display Scenario Results in a "Head-to-Head" Comparison View

**As a** user making a decision,
**I want** to see a clear, side-by-side comparison of my current portfolio versus my proposed scenario,
**So that** I can easily evaluate the trade-offs.

---

## Epic 3: Action Plan & Execution

**Status: Future**

**Goal:** Bridge the gap from analysis to action by generating a concrete, executable trade list and allowing the user to track their progress.

### Story 3.1: Generate a "Smart Action Plan Checklist" from a modeled scenario

**As a** user ready to act,
**I want** the system to generate a clear list of buy and sell orders needed to achieve my proposed allocation,
**So that** I know exactly what trades to make.

### Story 3.2: Persist Checklist State and an "All Done" Celebration

**As a** user executing trades,
**I want** to check off items on my action plan and have that progress saved,
**So that** I can track my rebalancing and feel a sense of accomplishment.
