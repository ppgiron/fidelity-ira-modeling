---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7]
inputDocuments:
  - '_bmad-output/analysis/product-brief-fidelity-ira-modeling-2025-12-22.md'
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 0
workflowType: 'prd'
lastStep: 7
project_name: 'fidelity-ira-modeling'
user_name: 'Ppgir'
date: '2025-12-22'
---
# Product Requirements Document - fidelity-ira-modeling

**Author:** Ppgir
**Date:** 2025-12-22

## Executive Summary

The **Portfolio Scenario Modeler** is a web-based application designed for a sophisticated retail investor client who requires robust quantitative decision support for managing their retirement accounts. It aims to fill the gap between overly simplistic portfolio trackers and complex institutional tools by providing accessible stress-testing, allocation modeling, and actionable trade generation.

The core problem it solves is the investor's lack of accessible tools to rigorously stress-test portfolio allocations against various economic scenarios, quantify concentration risk, compare rebalancing options with clear risk/return trade-offs, and generate precise, executable trade instructions. This product empowers the client to gain confidence and control over their investment decisions through data-driven insights.

### What Makes This Special

The Portfolio Scenario Modeler's unique advantages are rooted in its core design principles, focusing on delivering a high-value, tailored experience for a single client:

*   **Builds Trust Through Transparency:** No "black box" algorithms; all calculations are visible, fostering confidence in the results.
*   **Empowers Through Accessibility:** Sophisticated financial modeling is translated into an intuitive interface, making complex analysis manageable.
*   **Drives Action, Not Just Analysis:** The tool goes beyond data visualization to provide executable trade lists, directly bridging insight to action.
*   **Guarantees Absolute Privacy:** Financial data remains local to the user's browser, ensuring privacy.
*   **Works Anytime, Anywhere:** The core engine is offline-capable, providing analytical capability even without an internet connection.

## Project Classification

**Technical Type:** `web_app`
**Domain:** `fintech`
**Complexity:** `medium`
**Project Context:** Greenfield - new project

## Success Criteria

### User Success

From DIY Dan's perspective, success is achieving confidence and control over his investment decisions. We will measure this through behavioral indicators:

*   **Scenario Exploration Depth:** Users running an average of 3+ scenario simulations per session, indicating active investigation and understanding.
*   **Allocation Decision Validation:** High usage of the "Comparison Dashboard" (e.g., >60% of users who run scenarios also use the comparison feature), signifying reliance on the tool for decision-making.
*   **Actionable Insights Conversion:** A significant percentage of active users (e.g., >20%) generating a "Trade List" monthly, demonstrating trust in the tool's recommendations and conversion of analysis to action.
*   **Risk Awareness Impact:** Users actively adjusting their proposed allocations to address concentration warnings flagged by the system.

### Business Success

Our primary business objectives for the Portfolio Scenario Modeler will focus on establishing market presence and demonstrating value:

*   **User Acquisition:** Achieve a target number of new active users per month, establishing a strong foundation within the sophisticated retail investor segment.
*   **Deep Engagement:** Foster a highly engaged user base that integrates the tool into their regular portfolio management routine.
*   **High Retention:** Maintain a robust retention rate, reflecting long-term user satisfaction and continued value delivery.
*   **Market Leadership:** Position the Portfolio Scenario Modeler as the definitive, independent tool for portfolio stress-testing and optimization.

### Technical Success

*   **Activation Rate:** >70% of new users complete their first portfolio import (via CSV or manual entry) within 24 hours of sign-up.
*   **Scenario Engagement Rate:** >30% of Monthly Active Users (MAU) who run at least one scenario simulation per week.
*   **Trade List Generation Rate:** >20% of MAU who generate at least one trade list per month.
*   **3-Month User Retention Rate:** >50% of users acquired in month X who are still active in month X+3.
*   **Average Session Duration:** Measure of deep engagement with the analysis features. (>15 minutes)
*   **Calculation Performance:** All core scenario calculations complete within 500ms (as per Non-Functional Requirements).

## Product Scope

### MVP - Minimum Viable Product

**Core Features:**

*   **Portfolio Input (US-001, partial):**
    *   Manual entry and **critical** CSV import from Fidelity.
    *   Auto-fetch current prices.
    *   Calculate total value and display basic breakdowns.
*   **Proposed Allocation (US-002, partial):**
    *   Slider/percentage input for target allocation.
    *   Real-time updates.
    *   Display of auto-generated trade list.
*   **Scenario Simulation (US-003, partial):**
    *   Pre-built scenarios.
    *   Apply scenarios to both current and proposed allocations.
    *   Calculate ending value, max drawdown, and annualized return.
*   **Side-by-Side Comparison (US-004, partial):**
    *   Table view comparing current vs. proposed portfolios.
    *   Highlight best/worst outcomes.
*   **NEW - Withdrawal & Tax Penalty Modeling:**
    *   **Functionality:** Allow the user to specify a cash withdrawal amount as part of a proposed allocation.
    *   **Calculation:** The simulation will model the necessary sales to generate the required cash and, crucially, will calculate and display the estimated **10% early withdrawal tax penalty** if the user indicates they are under the age of 59.5.
    *   **Display:** The final scenario results will clearly show the post-withdrawal portfolio value and the amount lost to penalties.
*   **Local Persistence:** All portfolio data stored locally in the browser.

### Out of Scope for MVP

*   Advanced Data Imports (beyond Fidelity CSV).
*   Custom Scenario Builder.
*   Monte Carlo Simulation.
*   Historical Backtesting (US-005).
*   Advanced Rebalancing Optimizer (e.g., tax-lot harvesting).
*   Multi-User / Sharing Capabilities.
*   Complex Reporting/Export.

### Growth Features (Post-MVP)

If the MVP is successful, the Portfolio Scenario Modeler has immense potential to evolve into a comprehensive, trusted platform for self-directed investors. Our future vision includes:

*   **Deepening Core Analytics:** Integrating Monte Carlo simulations, full historical backtesting, and more sophisticated rebalancing optimization (e.g., tax-loss harvesting).
*   **Broader Integrations:** Direct API integrations with major brokerages for seamless portfolio syncing and trade execution.
*   **Expanded Scenario Engine:** User-definable custom scenarios with a wider array of input parameters, and more sophisticated event-based simulations.
*   **Community & Education:** Features for users to share (anonymously) and learn from others' portfolios and strategies, alongside educational content.
*   **Multi-Account/Household Management:** Support for managing multiple portfolios and account types within a single interface.
*   **Mobile App:** Dedicated native applications for iOS and Android.

### Vision (Future)

If the MVP is successful, the Portfolio Scenario Modeler has immense potential to evolve into a comprehensive, trusted platform for self-directed investors. Our future vision includes:

*   **Deepening Core Analytics:** Integrating Monte Carlo simulations, full historical backtesting, and more sophisticated rebalancing optimization (e.g., tax-loss harvesting).
*   **Broader Integrations:** Direct API integrations with major brokerages for seamless portfolio syncing and trade execution.
*   **Expanded Scenario Engine:** User-definable custom scenarios with a wider array of input parameters, and more sophisticated event-based simulations.
*   **Community & Education:** Features for users to share (anonymously) and learn from others' portfolios and strategies, alongside educational content.
*   **Multi-Account/Household Management:** Support for managing multiple portfolios and account types within a single interface.
*   **Mobile App:** Dedicated native applications for iOS and Android.

## User Journeys

### User Journey: DIY Dan - From Anxiety to Confidence

Dan, a 45-year-old software engineer, diligently manages his Fidelity Rollover IRA. He's proud of his DIY approach to investing, but lately, a creeping anxiety has set in. Market volatility has him worried about his retirement, and his old spreadsheets just aren't cutting it. He spends hours researching, but always ends up with more questions than answers: "Am I too concentrated in tech? What if we have another 2008? How do I even shift my allocation without messing things up?" He feels lost in a sea of complex data and conflicting advice.

One evening, he stumbles upon the Portfolio Scenario Modeler – "Institutional-Grade Analysis for the Self-Directed Investor." Intrigued, he downloads the PWA. The onboarding is surprisingly smooth; a quick CSV import from Fidelity pulls all his holdings in minutes. He's relieved to see a clear message: "Your data stays local by default." The Modeler instantly flags a high concentration in large-cap growth stocks, a "lightbulb moment" confirming his nagging suspicion.

Dan's heart pounds as he runs his current portfolio through a "2022 Redux" scenario. The projected max drawdown is sobering. But the fear quickly turns to determination. He navigates to the "Allocation Builder," effortlessly dragging sliders to rebalance his portfolio, increasing international exposure and bond allocation. He runs the "2022 Redux" again on his *proposed* portfolio. The difference is stark; his projected drawdown is significantly reduced. He even models a hypothetical early retirement withdrawal, seeing the tax implications upfront. He grins – this is the clarity he's been craving.

With newfound confidence, Dan generates a precise trade list, detailing exactly what to buy and sell. He logs into Fidelity, executes the trades, and feels a profound sense of control. The Portfolio Scenario Modeler isn't just a tool; it's become his trusted co-pilot, transforming his investment anxiety into empowered, data-driven action. He now checks his portfolio quarterly, not with dread, but with a strategic eye, using the Modeler to proactively navigate his financial future.

### Journey Requirements Summary

This narrative journey for "DIY Dan" directly illuminates several core capability areas the Portfolio Scenario Modeler must provide:

*   **Secure Portfolio Input & Management:** Robust, private (local-first) handling of holdings, including CSV import and manual entry.
*   **Real-time Data Integration:** Accurate and timely fetching of market data (prices) for current holdings.
*   **Concentration Analysis & Visualization:** Ability to identify and display portfolio risks like sector or asset class concentration.
*   **Intuitive Allocation Modeling:** User-friendly interface for creating and modifying proposed portfolio allocations (sliders, percentages).
*   **Scenario Simulation Engine:** Core capability to apply pre-built economic scenarios to portfolios and calculate outcomes (value, drawdown, return, withdrawal penalties).
*   **Comparative Analysis Dashboard:** Clear, side-by-side comparison of different portfolio scenarios.
*   **Actionable Trade Generation:** Accurate, optimized trade lists based on allocation targets.
*   **Local Data Persistence & Management:** Secure storage and retrieval of user portfolios, allocations, and preferences.

## Web_App Specific Requirements

### Project-Type Overview

The Portfolio Scenario Modeler will be implemented as a **Single Page Application (SPA)** leveraging modern web technologies (React, TypeScript, Vite) to deliver a highly interactive, fluid, and app-like user experience. Its Progressive Web App (PWA) capabilities will ensure offline functionality and rapid loading, aligning with the "Works Anytime, Anywhere" differentiator.

### Technical Architecture Considerations

*   **SPA Framework:** Built using React 18+ with TypeScript and Vite for efficient development and optimized production builds.
*   **Offline Capability:** Core calculation engine and user data persistence will be supported via client-side technologies (e.g., IndexedDB, Service Workers). **On re-establishing a network connection, the application will automatically fetch fresh market data in the background and clearly indicate the data's freshness in the UI (e.g., "Last updated: Just Now").**
*   **Client-Side Performance:** Optimized for fast rendering and responsiveness, particularly for interactive elements and data visualizations. Heavy calculations will be offloaded to a Web Worker to ensure the UI remains fluid.

### Browser Compatibility

The application will be compatible with the **latest two stable versions of Chrome, Firefox, Safari, and Edge**. **Dedicated QA time will be allocated for cross-browser testing, especially for data visualizations and complex CSS layouts.**

### Performance Targets

*   **Initial Load Time:** < 3 seconds (on a standard broadband connection).
*   **Scenario Calculation:** < 500ms for standard portfolios (as per NFR).
*   **UI Responsiveness:** User interface interactions (e.g., slider adjustments, data input) should respond instantaneously (<100ms).

### Search Engine Optimization (SEO) Strategy

As a single-client, behind-login application, **SEO is not a primary requirement** for the MVP. Efforts will focus on internal performance and user experience rather than external discoverability.

### Accessibility Standards

The application will adhere to **Web Content Accessibility Guidelines (WCAG) 2.1 Level AA** where practical for the MVP. This includes ensuring all components, **especially data visualization and charting libraries, are keyboard-navigable and screen-reader accessible.** This aligns with the "Empowers Through Accessibility" differentiator.

### Implementation Considerations

*   **Robust State Management:** Utilize a lightweight, TypeScript-native solution like Zustand for managing application state.
*   **UI Component Library:** Employ a component library (e.g., Tailwind CSS for styling) that supports responsive design and accessibility best practices.
*   **Data Serialization/Deserialization:** Implement clear strategies for handling data storage and retrieval to/from local persistence layers.