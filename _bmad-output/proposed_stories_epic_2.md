# Epic 2: Scenario Modeling & Comparison

## Story 2.1: Propose New Allocation with Connected Sliders

_As a user, I want to propose a new portfolio allocation using connected sliders that automatically maintain a 100% total, so that I can model different investment strategies without manual calculation._

**Acceptance Criteria:**

- **Given** I am on the scenario modeling page, **when** I adjust an asset class slider, **then** the 'Cash/Unallocated' bucket must automatically adjust to keep the total allocation at 100%.
- **Given** I have adjusted the sliders, **when** the 'Cash/Unallocated' bucket goes below 0%, **then** the slider I am moving should indicate an error and prevent further movement.

## Story 2.2: Run Scenario Simulation with On-Demand Calculation

_As a user, I want to run pre-built economic scenarios against my current and proposed portfolios on-demand, so that I can understand the potential impact of market changes without performance degradation._

**Acceptance Criteria:**

- **Given** I have a current and a proposed portfolio, **when** I adjust the allocation sliders, **then** the 'Recalculate' button should become active, indicating a 'Stale' state.
- **Given** the 'Recalculate' button is active, **when** I click it, **then** the simulation should be executed in a Web Worker.
- **Given** the simulation is running, **then** the UI should remain responsive.
- **Given** the simulation is complete, **then** the results for both portfolios should be displayed, and the 'Recalculate' button should become inactive, indicating a 'Fresh' state.

## Story 2.3: Head-to-Head HUD & Comparison

_As a user, I want to see a sticky 'Head-to-Head' HUD that constantly compares my current and proposed portfolios, so that I can immediately see the impact of my changes._

**Acceptance Criteria:**

- **Given** I am on the scenario modeling page, **then** a sticky HUD should be displayed showing key metrics (e.g., Yield, Expense Ratio, Risk) for both the current and proposed portfolios.
- **Given** the HUD is displayed, **then** it should also show the explicit Deltas (e.g., +0.5%) between the current and proposed portfolios for each metric.
- **Given** the scenario simulation is complete, **then** the HUD should update with the latest results.
