stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - 'portfolio-modeler-architecture.md'
workflowType: 'product-brief'
lastStep: 4
project_name: 'fidelity-ira-modeling'
user_name: 'Ppgir'
date: '2025-12-22'
---
# Product Brief: fidelity-ira-modeling

**Date:** 2025-12-22
**Author:** Ppgir

---

## Executive Summary

For the hands-on retail investor navigating the complexities of retirement, the market is a sea of uncertainty. Existing tools offer either simplistic dashboards or the overwhelming complexity of institutional platforms, leaving a critical gap for those who need to make smart, data-driven decisions with their life savings. The **Portfolio Scenario Modeler** fills this void. It's a privacy-first, offline-capable application that empowers investors to stress-test their portfolios against market shocks, compare potential allocation changes, and generate clear, actionable trade lists. It delivers the confidence of institutional-grade analysis with the clarity and accessibility required for personal investing.

---

## Core Vision

### Problem Statement

Retail investors lack accessible tools to rigorously stress-test their portfolio allocations against historical and hypothetical scenarios. They struggle to quantify concentration risk, compare rebalancing options with clear risk/return trade-offs, and generate specific, executable trade instructions to align their portfolios with their goals.

### Problem Impact

Without these tools, investors may unknowingly take on excessive risk, miss opportunities to optimize their holdings, and make emotionally-driven decisions during market volatility. This can lead to significant underperformance and jeopardize long-term financial goals, particularly in retirement accounts where capital preservation is critical.

### Why Existing Solutions Fall Short

The gap in the market is not an accident; it's a direct result of the business models of incumbent financial institutions.

1.  **Large Brokerages** are often incentivized to sell their own managed products or advisory services, which can be at odds with empowering investors to be fully self-sufficient. Truly powerful, independent analysis tools are a secondary concern.
2.  **Institutional Tool Providers** build for a high-margin enterprise market, making their products prohibitively expensive and complex for individual investors.

This leaves a growing segment of sophisticated, self-directed investors underserved. They desire the analytical power of professional tools but require the accessibility and cost-effectiveness of a consumer product—a need the current market structure is not designed to meet.

### Proposed Solution

A web-based, offline-capable application that provides a seamless workflow:
1.  **Portfolio Input:** Users can manually enter or import their current holdings (e.g., from a Fidelity IRA).
2.  **Allocation Builder:** Users can model proposed changes to their asset allocation side-by-side with their current setup.
3.  **Scenario Engine:** Users can test both current and proposed portfolios against a library of pre-built scenarios (e.g., "2022 Redux," "Stagflation," "AI Boom") or create their own.
4.  **Comparison Dashboard:** The platform provides a clear, side-by-side comparison of how each portfolio performs in every scenario, highlighting key metrics like max drawdown, annualized return, and volatility.
5.  **Trade Generation:** Based on the user's chosen allocation, the system generates a specific, actionable list of trades required to achieve that target.

### Key Differentiators

The Portfolio Scenario Modeler's unique advantages are rooted in its core design principles:
-   **Builds Trust Through Transparency:** No "black box" algorithms. We show you the calculations, giving you the confidence to trust the results and own your decisions.
-   **Empowers Through Accessibility:** We translate complex financial modeling into an intuitive interface. You don't need a PhD in finance to secure your financial future.
-   **Drives Action, Not Just Analysis:** We bridge the gap between insight and action. The end-product isn't just a chart; it's an executable trade list ready for your broker.
-   **Guarantees Absolute Privacy:** Your financial data is your own. By keeping all sensitive information on your local device by default, we ensure your privacy is non-negotiable.
-   **Works Anytime, Anywhere:** Market-moving news doesn't wait for a good internet connection. Our core engine is offline-capable, so your analysis tool is always ready when you need it.

### Key Risks & Mitigation

*   **Risk: Data Integrity and Trust.** The credibility of the entire application hinges on the accuracy, timeliness, and reliability of the underlying market data. Relying solely on free, client-side APIs introduces a high risk of inconsistent or inaccurate data, which would lead to flawed analyses and a complete erosion of user trust.
*   **Mitigation Strategy:**
    1.  **Adopt a Hybrid Architecture:** Implement a lightweight backend API to act as a centralized, trusted data provider for the front-end.
    2.  **Invest in a Premium Data Source:** Subscribe to a reliable, paid data provider (e.g., Polygon.io) to ensure accuracy and commercial-grade reliability.
    3.  **Implement In-App Data Transparency:** The UI will clearly display the source of the market data and a "data as of..." timestamp on all analyses.

## Target Users

### Primary Users

#### Persona: DIY Dan

*   **Background:** 45-year-old software engineer, diligently saving for retirement in a Fidelity Rollover IRA. Tech-savvy, comfortable with data, prefers self-management to financial advisors.
*   **Motivations:** Wants to make smart, evidence-based decisions for his retirement savings. Enjoys learning and optimizing his financial strategy.
*   **Problem Experience:** During market volatility, he experiences anxiety and a feeling of powerlessness. His current tools (e.g., spreadsheets) can't answer critical questions about risk quantification, scenario impact, or specific rebalancing actions. He feels "flying blind."
*   **Success Vision:** To feel confident and in control of his portfolio decisions. He wants to proactively manage risk, model allocation changes effectively, and generate precise, actionable trade lists. He seeks peace of mind through data-driven insights.

### User Journey: DIY Dan

1.  **Discovery:** Dan finds the Portfolio Scenario Modeler through a trusted financial forum, tech blog, or peer recommendation, drawn by the promise of institutional-grade analysis made accessible.
2.  **Onboarding:** He downloads the PWA, imports his Fidelity holdings via CSV (or manual entry). The privacy-first design and intuitive interface immediately build trust.
3.  **Initial Insight:** The app instantly flags a high sector concentration (e.g., in tech), providing a clear "aha!" moment that validates his need for better risk analysis.
4.  **Stress Testing:** Dan uses the scenario engine to simulate a "2022 Redux" downturn on his current portfolio, revealing a larger potential drawdown than anticipated.
5.  **Optimization:** He utilizes the "Allocation Builder" to craft a more diversified "Proposed Allocation." Re-running the same scenario shows a significantly improved outcome, reducing his projected losses.
6.  **Decision & Action:** Confident in his refined strategy, he generates a detailed trade list, specifying buys and sells to achieve his target allocation. He executes these trades at Fidelity.
7.  **Long-term Integration:** The Modeler becomes an indispensable tool for Dan, used quarterly and during significant market events, transforming his portfolio management from reactive and anxious to proactive and data-driven.

## Success Metrics

### User Success Metrics

From DIY Dan's perspective, success is achieving confidence and control over his investment decisions. We will measure this through behavioral indicators:

*   **Scenario Exploration Depth:** Users running an average of 3+ scenario simulations per session, indicating active investigation and understanding.
*   **Allocation Decision Validation:** High usage of the "Comparison Dashboard" (e.g., >60% of users who run scenarios also use the comparison feature), signifying reliance on the tool for decision-making.
*   **Actionable Insights Conversion:** A significant percentage of active users (e.g., >20%) generating a "Trade List" monthly, demonstrating trust in the tool's recommendations and conversion of analysis to action.
*   **Risk Awareness Impact:** Users actively adjusting their proposed allocations to address concentration warnings flagged by the system.

### Business Objectives

Our primary business objectives for the Portfolio Scenario Modeler will focus on establishing market presence and demonstrating value:

*   **User Acquisition:** Achieve a target number of new active users per month, establishing a strong foundation within the sophisticated retail investor segment.
*   **Deep Engagement:** Foster a highly engaged user base that integrates the tool into their regular portfolio management routine.
*   **High Retention:** Maintain a robust retention rate, reflecting long-term user satisfaction and continued value delivery.
*   **Market Leadership:** Position the Portfolio Scenario Modeler as the definitive, independent tool for portfolio stress-testing and optimization.

### Key Performance Indicators (KPIs)

To track our progress against these objectives, we will monitor the following KPIs:

*   **Activation Rate:** Percentage of new users who complete their first portfolio import (via CSV or manual entry) within 24 hours of sign-up. (Target: >70%)
*   **Scenario Engagement Rate:** Percentage of Monthly Active Users (MAU) who run at least one scenario simulation per week. (Target: >30%)
*   **Trade List Generation Rate:** Percentage of MAU who generate at least one trade list per month. (Target: >20%)
*   **3-Month User Retention Rate:** Percentage of users acquired in month X who are still active in month X+3. (Target: >50%)
*   **Average Session Duration:** Measure of deep engagement with the analysis features. (Target: >15 minutes)
*   **Calculation Performance:** All core scenario calculations complete within 500ms (as per Non-Functional Requirements).
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments:
  - 'portfolio-modeler-architecture.md'
workflowType: 'product-brief'
lastStep: 5
project_name: 'fidelity-ira-modeling'
user_name: 'Ppgir'
date: '2025-12-22'
---
# Product Brief: fidelity-ira-modeling

**Date:** 2025-12-22
**Author:** Ppgir

---

## Executive Summary

For the hands-on retail investor navigating the complexities of retirement, the market is a sea of uncertainty. Existing tools offer either simplistic dashboards or the overwhelming complexity of institutional platforms, leaving a critical gap for those who need to make smart, data-driven decisions with their life savings. The **Portfolio Scenario Modeler** fills this void. It's a privacy-first, offline-capable application that empowers investors to stress-test their portfolios against market shocks, compare potential allocation changes, and generate clear, actionable trade lists. It delivers the confidence of institutional-grade analysis with the clarity and accessibility required for personal investing.

---

## Core Vision

### Problem Statement

Retail investors lack accessible tools to rigorously stress-test their portfolio allocations against historical and hypothetical scenarios. They struggle to quantify concentration risk, compare rebalancing options with clear risk/return trade-offs, and generate specific, executable trade instructions to align their portfolios with their goals.

### Problem Impact

Without these tools, investors may unknowingly take on excessive risk, miss opportunities to optimize their holdings, and make emotionally-driven decisions during market volatility. This can lead to significant underperformance and jeopardize long-term financial goals, particularly in retirement accounts where capital preservation is critical.

### Why Existing Solutions Fall Short

The gap in the market is not an accident; it's a direct result of the business models of incumbent financial institutions.

1.  **Large Brokerages** are often incentivized to sell their own managed products or advisory services, which can be at odds with empowering investors to be fully self-sufficient. Truly powerful, independent analysis tools are a secondary concern.
2.  **Institutional Tool Providers** build for a high-margin enterprise market, making their products prohibitively expensive and complex for individual investors.

This leaves a growing segment of sophisticated, self-directed investors underserved. They desire the analytical power of professional tools but require the accessibility and cost-effectiveness of a consumer product—a need the current market structure is not designed to meet.

### Proposed Solution

A web-based, offline-capable application that provides a seamless workflow:
1.  **Portfolio Input:** Users can manually enter or import their current holdings (e.g., from a Fidelity IRA).
2.  **Allocation Builder:** Users can model proposed changes to their asset allocation side-by-side with their current setup.
3.  **Scenario Engine:** Users can test both current and proposed portfolios against a library of pre-built scenarios (e.g., "2022 Redux," "Stagflation," "AI Boom") or create their own.
4.  **Comparison Dashboard:** The platform provides a clear, side-by-side comparison of how each portfolio performs in every scenario, highlighting key metrics like max drawdown, annualized return, and volatility.
5.  **Trade Generation:** Based on the user's chosen allocation, the system generates a specific, actionable list of trades required to achieve that target.

### Key Differentiators

The Portfolio Scenario Modeler's unique advantages are rooted in its core design principles:
-   **Builds Trust Through Transparency:** No "black box" algorithms. We show you the calculations, giving you the confidence to trust the results and own your decisions.
-   **Empowers Through Accessibility:** We translate complex financial modeling into an intuitive interface. You don't need a PhD in finance to secure your financial future.
-   **Drives Action, Not Just Analysis:** We bridge the gap between insight and action. The end-product isn't just a chart; it's an executable trade list ready for your broker.
-   **Guarantees Absolute Privacy:** Your financial data is your own. By keeping all sensitive information on your local device by default, we ensure your privacy is non-negotiable.
-   **Works Anytime, Anywhere:** Market-moving news doesn't wait for a good internet connection. Our core engine is offline-capable, so your analysis tool is always ready when you need it.

### Key Risks & Mitigation

*   **Risk: Data Integrity and Trust.** The credibility of the entire application hinges on the accuracy, timeliness, and reliability of the underlying market data. Relying solely on free, client-side APIs introduces a high risk of inconsistent or inaccurate data, which would lead to flawed analyses and a complete erosion of user trust.
*   **Mitigation Strategy:**
    1.  **Adopt a Hybrid Architecture:** Implement a lightweight backend API to act as a centralized, trusted data provider for the front-end.
    2.  **Invest in a Premium Data Source:** Subscribe to a reliable, paid data provider (e.g., Polygon.io) to ensure accuracy and commercial-grade reliability.
    3.  **Implement In-App Data Transparency:** The UI will clearly display the source of the market data and a "data as of..." timestamp on all analyses.

## Target Users

### Primary Users

#### Persona: DIY Dan

*   **Background:** 45-year-old software engineer, diligently saving for retirement in a Fidelity Rollover IRA. Tech-savvy, comfortable with data, prefers self-management to financial advisors.
*   **Motivations:** Wants to make smart, evidence-based decisions for his retirement savings. Enjoys learning and optimizing his financial strategy.
*   **Problem Experience:** During market volatility, he experiences anxiety and a feeling of powerlessness. His current tools (e.g., spreadsheets) can't answer critical questions about risk quantification, scenario impact, or specific rebalancing actions. He feels "flying blind."
*   **Success Vision:** To feel confident and in control of his portfolio decisions. He wants to proactively manage risk, model allocation changes effectively, and generate precise, actionable trade lists. He seeks peace of mind through data-driven insights.

### User Journey: DIY Dan

1.  **Discovery:** Dan finds the Portfolio Scenario Modeler through a trusted financial forum, tech blog, or peer recommendation, drawn by the promise of institutional-grade analysis made accessible.
2.  **Onboarding:** He downloads the PWA, imports his Fidelity holdings via CSV (or manual entry). The privacy-first design and intuitive interface immediately build trust.
3.  **Initial Insight:** The app instantly flags a high sector concentration (e.g., in tech), providing a clear "aha!" moment that validates his need for better risk analysis.
4.  **Stress Testing:** Dan uses the scenario engine to simulate a "2022 Redux" downturn on his current portfolio, revealing a larger potential drawdown than anticipated.
5.  **Optimization:** He utilizes the "Allocation Builder" to craft a more diversified "Proposed Allocation." Re-running the same scenario shows a significantly improved outcome, reducing his projected losses.
6.  **Decision & Action:** Confident in his refined strategy, he generates a detailed trade list, specifying buys and sells to achieve his target allocation. He executes these trades at Fidelity.
7.  **Long-term Integration:** The Modeler becomes an indispensable tool for Dan, used quarterly and during significant market events, transforming his portfolio management from reactive and anxious to proactive and data-driven.

## Success Metrics

### User Success Metrics

From DIY Dan's perspective, success is achieving confidence and control over his investment decisions. We will measure this through behavioral indicators:

*   **Scenario Exploration Depth:** Users running an average of 3+ scenario simulations per session, indicating active investigation and understanding.
*   **Allocation Decision Validation:** High usage of the "Comparison Dashboard" (e.g., >60% of users who run scenarios also use the comparison feature), signifying reliance on the tool for decision-making.
*   **Actionable Insights Conversion:** A significant percentage of active users (e.g., >20%) generating a "Trade List" monthly, demonstrating trust in the tool's recommendations and conversion of analysis to action.
*   **Risk Awareness Impact:** Users actively adjusting their proposed allocations to address concentration warnings flagged by the system.

### Business Objectives

Our primary business objectives for the Portfolio Scenario Modeler will focus on establishing market presence and demonstrating value:

*   **User Acquisition:** Achieve a target number of new active users per month, establishing a strong foundation within the sophisticated retail investor segment.
*   **Deep Engagement:** Foster a highly engaged user base that integrates the tool into their regular portfolio management routine.
*   **High Retention:** Maintain a robust retention rate, reflecting long-term user satisfaction and continued value delivery.
*   **Market Leadership:** Position the Portfolio Scenario Modeler as the definitive, independent tool for portfolio stress-testing and optimization.

### Key Performance Indicators (KPIs)

To track our progress against these objectives, we will monitor the following KPIs:

*   **Activation Rate:** Percentage of new users who complete their first portfolio import (via CSV or manual entry) within 24 hours of sign-up. (Target: >70%)
*   **Scenario Engagement Rate:** Percentage of Monthly Active Users (MAU) who run at least one scenario simulation per week. (Target: >30%)
*   **Trade List Generation Rate:** Percentage of MAU who generate at least one trade list per month. (Target: >20%)
*   **3-Month User Retention Rate:** Percentage of users acquired in month X who are still active in month X+3. (Target: >50%)
*   **Average Session Duration:** Measure of deep engagement with the analysis features. (Target: >15 minutes)
*   **Calculation Performance:** All core scenario calculations complete within 500ms (as per Non-Functional Requirements).

## MVP Scope

### Core Features

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

### MVP Success Criteria

Our MVP will be considered successful if it:

*   **Achieves Activation Target:** >70% of new users successfully import their portfolio within 24 hours.
*   **Validates Core Value:** Users demonstrate strong engagement with the core workflow (import -> allocate -> simulate -> compare -> generate trade list). Measured by >30% Scenario Engagement Rate and >20% Trade List Generation Rate.
*   **Receives Positive User Feedback:** Early adopters confirm the tool solves their core problem (lack of accessible, actionable stress-testing) and provides a clear "aha!" moment.
*   **Demonstrates Technical Feasibility:** The hybrid architecture successfully delivers reliable market data, and core calculations meet performance requirements (<500ms).

### Future Vision

If the MVP is successful, the Portfolio Scenario Modeler has immense potential to evolve into a comprehensive, trusted platform for self-directed investors. Our future vision includes:

*   **Deepening Core Analytics:** Integrating Monte Carlo simulations, full historical backtesting, and more sophisticated rebalancing optimization (e.g., tax-loss harvesting).
*   **Broader Integrations:** Direct API integrations with major brokerages for seamless portfolio syncing and trade execution.
*   **Expanded Scenario Engine:** User-definable custom scenarios with a wider array of input parameters, and more sophisticated event-based simulations.
*   **Community & Education:** Features for users to share (anonymously) and learn from others' portfolios and strategies, alongside educational content.
*   **Multi-Account/Household Management:** Support for managing multiple portfolios and account types within a single interface.
*   **Mobile App:** Dedicated native applications for iOS and Android.
<!-- Content will be appended sequentially through collaborative workflow steps -->
