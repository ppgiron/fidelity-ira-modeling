# Portfolio Scenario Modeler: Technical Architecture Document

**Version**: 1.0  
**Date**: December 22, 2025  
**Author**: Financial Advisor Mode – Architecture Spec  
**Status**: Draft for Development

---

## Executive Summary

This document specifies the architecture for a portfolio modeling and scenario simulation application designed for individual investors managing retirement accounts (specifically Fidelity IRAs). The application enables users to:

1. Input and analyze current portfolio holdings
2. Create proposed allocation changes
3. Simulate multiple economic scenarios
4. Compare current vs. proposed portfolios across all scenarios
5. Generate actionable rebalancing trade lists

The target user is a sophisticated retail investor who wants quantitative decision support without the complexity of institutional tools.

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [User Stories & Requirements](#2-user-stories--requirements)
3. [Data Models](#3-data-models)
4. [Calculation Engine](#4-calculation-engine)
5. [Application Architecture](#5-application-architecture)
6. [Frontend Components](#6-frontend-components)
7. [API Specification](#7-api-specification)
8. [Data Sources & Integrations](#8-data-sources--integrations)
9. [Deployment Options](#9-deployment-options)
10. [Security Considerations](#10-security-considerations)
11. [Future Enhancements](#11-future-enhancements)
12. [Appendices](#appendices)

---

## 1. System Overview

### 1.1 Problem Statement

Retail investors lack accessible tools to:
- Quantify concentration risk in their portfolios
- Stress-test allocations against historical and hypothetical scenarios
- Compare rebalancing options with explicit risk/return tradeoffs
- Generate specific trade instructions for execution

Existing solutions are either too simplistic (pie charts with no scenario analysis) or too complex (Bloomberg Terminal, institutional risk systems).

### 1.2 Solution Overview

A web-based application that provides:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        PORTFOLIO SCENARIO MODELER                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────────────┐   │
│  │   PORTFOLIO  │    │  ALLOCATION  │    │    SCENARIO ENGINE       │   │
│  │    INPUT     │───▶│   BUILDER    │───▶│                          │   │
│  │              │    │              │    │  • Pre-built scenarios   │   │
│  │  • Holdings  │    │  • Current   │    │  • Custom scenarios      │   │
│  │  • Values    │    │  • Proposed  │    │  • Monte Carlo           │   │
│  │  • Metadata  │    │  • Multiple  │    │  • Historical backtest   │   │
│  └──────────────┘    └──────────────┘    └──────────────────────────┘   │
│                                                    │                     │
│                                                    ▼                     │
│                              ┌──────────────────────────────────────┐   │
│                              │       COMPARISON DASHBOARD           │   │
│                              │                                      │   │
│                              │  • Side-by-side scenario results    │   │
│                              │  • Drawdown analysis                │   │
│                              │  • Trade list generation            │   │
│                              │  • Export/reporting                 │   │
│                              └──────────────────────────────────────┘   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Design Principles

| Principle | Implementation |
|-----------|----------------|
| **Transparency** | All calculations visible; no black boxes |
| **Accessibility** | No finance PhD required to use |
| **Actionability** | Outputs are executable trade lists |
| **Offline-capable** | Core functionality works without network |
| **Privacy-first** | Portfolio data stays local by default |

---

## 2. User Stories & Requirements

### 2.1 Core User Stories

#### US-001: Portfolio Input
> As an investor, I want to input my current holdings so that the system can analyze my portfolio.

**Acceptance Criteria:**
- [ ] Manual entry: ticker, shares, cost basis
- [ ] CSV import from Fidelity export format
- [ ] Auto-fetch current prices for entered tickers
- [ ] Calculate total value, allocation percentages
- [ ] Display sector and geographic breakdown
- [ ] Flag concentration warnings (>10% single position, >30% single sector)

#### US-002: Proposed Allocation
> As an investor, I want to create a proposed allocation so that I can compare it to my current portfolio.

**Acceptance Criteria:**
- [ ] Slider or percentage input for each holding
- [ ] Add new tickers to proposed allocation
- [ ] Remove tickers from proposed allocation
- [ ] Real-time update of allocation percentages
- [ ] Auto-generate trade list (buy X shares of Y, sell Z shares of W)
- [ ] Save multiple proposed allocations for comparison

#### US-003: Scenario Simulation
> As an investor, I want to simulate economic scenarios so that I can understand potential outcomes.

**Acceptance Criteria:**
- [ ] Pre-built scenarios (recession, tech crash, stagflation, bull market)
- [ ] Custom scenario builder with asset class return inputs
- [ ] Apply scenarios to both current and proposed allocations
- [ ] Calculate: ending value, max drawdown, CAGR, recovery time
- [ ] Visualize portfolio trajectory over scenario duration

#### US-004: Side-by-Side Comparison
> As an investor, I want to compare my current and proposed portfolios across all scenarios so that I can make an informed decision.

**Acceptance Criteria:**
- [ ] Table view: rows = scenarios, columns = allocations
- [ ] Highlight best/worst outcomes per scenario
- [ ] Show risk-adjusted metrics (Sharpe-like ratio)
- [ ] Export comparison to PDF/CSV

#### US-005: Historical Backtest
> As an investor, I want to see how my allocation would have performed historically so that I can validate my strategy.

**Acceptance Criteria:**
- [ ] Select date range (e.g., 2000-2025)
- [ ] Apply allocation to historical data
- [ ] Show growth chart with drawdown periods highlighted
- [ ] Compare multiple allocations on same chart
- [ ] Display key metrics: CAGR, max drawdown, Sharpe ratio

#### US-006: Rebalancing Optimizer
> As an investor, I want the system to suggest optimal trades so that I can efficiently reach my target allocation.

**Acceptance Criteria:**
- [ ] Input: current holdings, target allocation
- [ ] Output: specific trades (buy/sell amounts)
- [ ] Minimize number of trades option
- [ ] Tax-aware mode (for taxable accounts): prioritize loss harvesting
- [ ] Threshold-based: only rebalance if drift > X%

### 2.2 Non-Functional Requirements

| Requirement | Specification |
|-------------|---------------|
| **Performance** | Scenario calculations < 500ms for standard portfolio |
| **Scalability** | Support portfolios up to 100 holdings |
| **Availability** | Offline mode for core calculations |
| **Data Freshness** | Price data < 24 hours old (EOD acceptable) |
| **Browser Support** | Chrome, Firefox, Safari, Edge (latest 2 versions) |
| **Mobile** | Responsive design; functional on tablet/phone |

---

## 3. Data Models

### 3.1 Core Entities

#### 3.1.1 Portfolio

```typescript
interface Portfolio {
  id: string;                    // UUID
  name: string;                  // User-defined name
  accountType: AccountType;      // IRA, ROTH_IRA, TAXABLE, etc.
  holdings: Holding[];           // Array of positions
  createdAt: Date;
  updatedAt: Date;
  metadata: {
    broker: string;              // e.g., "Fidelity"
    accountNumber?: string;      // Optional, for user reference
  };
}

enum AccountType {
  TRADITIONAL_IRA = "TRADITIONAL_IRA",
  ROTH_IRA = "ROTH_IRA",
  ROLLOVER_IRA = "ROLLOVER_IRA",
  TAXABLE = "TAXABLE",
  HSA = "HSA",
  FOUR01K = "401K"
}
```

#### 3.1.2 Holding

```typescript
interface Holding {
  id: string;                    // UUID
  ticker: string;                // e.g., "FXAIX"
  name: string;                  // e.g., "Fidelity 500 Index Fund"
  shares: number;                // Number of shares/units
  costBasis: number;             // Total cost basis in dollars
  currentPrice: number;          // Current price per share
  currentValue: number;          // shares * currentPrice
  gainLoss: number;              // currentValue - costBasis
  gainLossPercent: number;       // (gainLoss / costBasis) * 100
  allocationPercent: number;     // % of total portfolio
  assetClass: AssetClass;        // Classification
  sector?: string;               // For equities
  geography?: Geography;         // US, INTL_DEVELOPED, EMERGING
  expenseRatio?: number;         // Annual expense ratio
}

enum AssetClass {
  US_EQUITY_LARGE_GROWTH = "US_EQUITY_LARGE_GROWTH",
  US_EQUITY_LARGE_VALUE = "US_EQUITY_LARGE_VALUE",
  US_EQUITY_LARGE_BLEND = "US_EQUITY_LARGE_BLEND",
  US_EQUITY_MID = "US_EQUITY_MID",
  US_EQUITY_SMALL = "US_EQUITY_SMALL",
  INTL_EQUITY_DEVELOPED = "INTL_EQUITY_DEVELOPED",
  INTL_EQUITY_EMERGING = "INTL_EQUITY_EMERGING",
  US_BOND_TOTAL = "US_BOND_TOTAL",
  US_BOND_TREASURY = "US_BOND_TREASURY",
  US_BOND_CORPORATE = "US_BOND_CORPORATE",
  INTL_BOND = "INTL_BOND",
  TIPS = "TIPS",
  CASH = "CASH",
  REAL_ESTATE = "REAL_ESTATE",
  COMMODITIES = "COMMODITIES",
  TARGET_DATE = "TARGET_DATE",
  OTHER = "OTHER"
}

enum Geography {
  US = "US",
  INTL_DEVELOPED = "INTL_DEVELOPED",
  INTL_EMERGING = "INTL_EMERGING",
  GLOBAL = "GLOBAL"
}
```

#### 3.1.3 Allocation

```typescript
interface Allocation {
  id: string;
  name: string;                  // e.g., "Current", "Conservative", "Aggressive"
  isCurrentState: boolean;       // True if this represents actual holdings
  positions: AllocationPosition[];
  totalValue: number;            // Sum of all position values
  metrics: AllocationMetrics;
  createdAt: Date;
}

interface AllocationPosition {
  ticker: string;
  targetPercent: number;         // Target allocation percentage
  currentValue: number;          // Current value in dollars
  targetValue: number;           // Target value based on total portfolio
  deltaValue: number;            // targetValue - currentValue
  deltaShares: number;           // Shares to buy (positive) or sell (negative)
}

interface AllocationMetrics {
  weightedExpenseRatio: number;
  estimatedVolatility: number;   // Based on historical std dev
  estimatedBeta: number;         // Weighted beta to S&P 500
  mag7Exposure: number;          // Estimated Magnificent 7 exposure
  sectorConcentration: {
    [sector: string]: number;    // Percentage by sector
  };
  geographicExposure: {
    [geography: string]: number; // Percentage by geography
  };
  correlationToSP500: number;    // Weighted correlation
}
```

#### 3.1.4 Scenario

```typescript
interface Scenario {
  id: string;
  name: string;                  // e.g., "2022 Redux"
  description: string;           // Detailed description
  isBuiltIn: boolean;            // System-provided vs. user-created
  duration: number;              // Duration in years
  assetClassReturns: {
    [assetClass: string]: ScenarioReturn;
  };
  correlationOverrides?: {       // Optional correlation changes
    [pair: string]: number;      // e.g., "US_BOND_TOTAL:US_EQUITY_LARGE_BLEND": 0.3
  };
}

interface ScenarioReturn {
  annualReturn: number;          // Expected annual return (e.g., -0.25 for -25%)
  volatility?: number;           // Optional volatility override
  path?: "linear" | "front_loaded" | "back_loaded" | "v_shaped";
}
```

#### 3.1.5 Scenario Result

```typescript
interface ScenarioResult {
  scenarioId: string;
  allocationId: string;
  startingValue: number;
  endingValue: number;
  totalReturn: number;           // (ending - starting) / starting
  annualizedReturn: number;      // CAGR
  maxDrawdown: number;           // Maximum peak-to-trough decline
  maxDrawdownDate?: Date;        // When max drawdown occurred
  recoveryTime?: number;         // Months to recover from max drawdown
  volatility: number;            // Realized volatility
  sharpeRatio: number;           // (return - risk_free) / volatility
  trajectory: TrajectoryPoint[]; // Monthly values for charting
}

interface TrajectoryPoint {
  date: Date;
  value: number;
  drawdown: number;              // Current drawdown from peak
}
```

### 3.2 Reference Data

#### 3.2.1 Security Master

```typescript
interface Security {
  ticker: string;
  name: string;
  assetClass: AssetClass;
  sector?: string;
  geography: Geography;
  expenseRatio?: number;
  inceptionDate?: Date;
  issuer?: string;               // e.g., "Fidelity", "Vanguard"
  
  // Risk characteristics (historical)
  historicalReturn: number;      // 10-year CAGR
  historicalVolatility: number;  // 10-year std dev
  beta: number;                  // Beta to S&P 500
  correlationToSP500: number;
  
  // Estimated underlying exposures
  mag7Exposure?: number;         // Estimated % in Magnificent 7
  topHoldings?: {
    ticker: string;
    weight: number;
  }[];
}
```

#### 3.2.2 Pre-Built Scenarios

```typescript
const BUILT_IN_SCENARIOS: Scenario[] = [
  {
    id: "2022_redux",
    name: "2022 Redux",
    description: "Tech correction with rising rates. Growth stocks down 30%, bonds down 13%, value relatively resilient.",
    isBuiltIn: true,
    duration: 1,
    assetClassReturns: {
      US_EQUITY_LARGE_GROWTH: { annualReturn: -0.30, path: "front_loaded" },
      US_EQUITY_LARGE_VALUE: { annualReturn: -0.08 },
      US_EQUITY_LARGE_BLEND: { annualReturn: -0.20 },
      US_EQUITY_SMALL: { annualReturn: -0.22 },
      INTL_EQUITY_DEVELOPED: { annualReturn: -0.15 },
      INTL_EQUITY_EMERGING: { annualReturn: -0.22 },
      US_BOND_TOTAL: { annualReturn: -0.13 },
      US_BOND_TREASURY: { annualReturn: -0.12 },
      CASH: { annualReturn: 0.02 },
      TARGET_DATE: { annualReturn: -0.18 }
    }
  },
  {
    id: "dot_com_2",
    name: "Dot-Com 2.0",
    description: "Magnificent 7 bubble bursts. Tech crashes 50%+, rotation to value and international.",
    isBuiltIn: true,
    duration: 3,
    assetClassReturns: {
      US_EQUITY_LARGE_GROWTH: { annualReturn: -0.25, path: "front_loaded" }, // Compounds to ~58% loss
      US_EQUITY_LARGE_VALUE: { annualReturn: -0.05 },
      US_EQUITY_LARGE_BLEND: { annualReturn: -0.15 },
      US_EQUITY_SMALL: { annualReturn: -0.10 },
      INTL_EQUITY_DEVELOPED: { annualReturn: 0.02 },
      INTL_EQUITY_EMERGING: { annualReturn: 0.00 },
      US_BOND_TOTAL: { annualReturn: 0.04 },
      US_BOND_TREASURY: { annualReturn: 0.05 },
      CASH: { annualReturn: 0.035 },
      TARGET_DATE: { annualReturn: -0.10 }
    }
  },
  {
    id: "stagflation",
    name: "Stagflation",
    description: "High inflation with recession. Equities down, bonds provide little protection, commodities surge.",
    isBuiltIn: true,
    duration: 2,
    assetClassReturns: {
      US_EQUITY_LARGE_GROWTH: { annualReturn: -0.18 },
      US_EQUITY_LARGE_VALUE: { annualReturn: -0.10 },
      US_EQUITY_LARGE_BLEND: { annualReturn: -0.14 },
      INTL_EQUITY_DEVELOPED: { annualReturn: -0.12 },
      US_BOND_TOTAL: { annualReturn: -0.03 },
      US_BOND_TREASURY: { annualReturn: -0.02 },
      TIPS: { annualReturn: 0.02 },
      CASH: { annualReturn: 0.045 },
      COMMODITIES: { annualReturn: 0.15 },
      TARGET_DATE: { annualReturn: -0.10 }
    }
  },
  {
    id: "soft_landing",
    name: "Soft Landing",
    description: "Fed successfully controls inflation without recession. Moderate equity gains, bonds recover.",
    isBuiltIn: true,
    duration: 2,
    assetClassReturns: {
      US_EQUITY_LARGE_GROWTH: { annualReturn: 0.12 },
      US_EQUITY_LARGE_VALUE: { annualReturn: 0.10 },
      US_EQUITY_LARGE_BLEND: { annualReturn: 0.11 },
      US_EQUITY_SMALL: { annualReturn: 0.13 },
      INTL_EQUITY_DEVELOPED: { annualReturn: 0.09 },
      INTL_EQUITY_EMERGING: { annualReturn: 0.10 },
      US_BOND_TOTAL: { annualReturn: 0.05 },
      US_BOND_TREASURY: { annualReturn: 0.045 },
      CASH: { annualReturn: 0.035 },
      TARGET_DATE: { annualReturn: 0.09 }
    }
  },
  {
    id: "deep_recession",
    name: "Deep Recession",
    description: "2008-style financial crisis. Equities crater, flight to quality, bonds rally.",
    isBuiltIn: true,
    duration: 2,
    assetClassReturns: {
      US_EQUITY_LARGE_GROWTH: { annualReturn: -0.28, path: "front_loaded" },
      US_EQUITY_LARGE_VALUE: { annualReturn: -0.25 },
      US_EQUITY_LARGE_BLEND: { annualReturn: -0.27 },
      US_EQUITY_SMALL: { annualReturn: -0.32 },
      INTL_EQUITY_DEVELOPED: { annualReturn: -0.30 },
      INTL_EQUITY_EMERGING: { annualReturn: -0.35 },
      US_BOND_TOTAL: { annualReturn: 0.06 },
      US_BOND_TREASURY: { annualReturn: 0.10 },
      US_BOND_CORPORATE: { annualReturn: -0.05 },
      CASH: { annualReturn: 0.02 },
      TARGET_DATE: { annualReturn: -0.22 }
    }
  },
  {
    id: "japan_scenario",
    name: "Japan Scenario (Lost Decade)",
    description: "Extended period of stagnation. Equities flat for a decade, low but positive bond returns.",
    isBuiltIn: true,
    duration: 10,
    assetClassReturns: {
      US_EQUITY_LARGE_GROWTH: { annualReturn: 0.01 },
      US_EQUITY_LARGE_VALUE: { annualReturn: 0.02 },
      US_EQUITY_LARGE_BLEND: { annualReturn: 0.015 },
      INTL_EQUITY_DEVELOPED: { annualReturn: 0.00 },
      US_BOND_TOTAL: { annualReturn: 0.03 },
      US_BOND_TREASURY: { annualReturn: 0.025 },
      CASH: { annualReturn: 0.015 },
      TARGET_DATE: { annualReturn: 0.02 }
    }
  },
  {
    id: "ai_boom",
    name: "AI Boom Continues",
    description: "AI revolution drives sustained growth. Tech leads, broad participation.",
    isBuiltIn: true,
    duration: 3,
    assetClassReturns: {
      US_EQUITY_LARGE_GROWTH: { annualReturn: 0.18 },
      US_EQUITY_LARGE_VALUE: { annualReturn: 0.08 },
      US_EQUITY_LARGE_BLEND: { annualReturn: 0.13 },
      US_EQUITY_SMALL: { annualReturn: 0.12 },
      INTL_EQUITY_DEVELOPED: { annualReturn: 0.08 },
      INTL_EQUITY_EMERGING: { annualReturn: 0.10 },
      US_BOND_TOTAL: { annualReturn: 0.035 },
      CASH: { annualReturn: 0.035 },
      TARGET_DATE: { annualReturn: 0.11 }
    }
  }
];
```

---

## 4. Calculation Engine

### 4.1 Portfolio Analytics

#### 4.1.1 Concentration Analysis

```typescript
function analyzeConcentration(holdings: Holding[]): ConcentrationAnalysis {
  const totalValue = holdings.reduce((sum, h) => sum + h.currentValue, 0);
  
  // Single position concentration
  const positionConcentration = holdings.map(h => ({
    ticker: h.ticker,
    percent: (h.currentValue / totalValue) * 100,
    isConcentrated: (h.currentValue / totalValue) > 0.10 // >10% warning
  }));
  
  // Sector concentration
  const sectorTotals: { [sector: string]: number } = {};
  holdings.forEach(h => {
    const sector = h.sector || 'Other';
    sectorTotals[sector] = (sectorTotals[sector] || 0) + h.currentValue;
  });
  
  const sectorConcentration = Object.entries(sectorTotals).map(([sector, value]) => ({
    sector,
    percent: (value / totalValue) * 100,
    isConcentrated: (value / totalValue) > 0.30 // >30% warning
  }));
  
  // Estimated Magnificent 7 exposure
  const mag7Exposure = holdings.reduce((sum, h) => {
    const security = getSecurityData(h.ticker);
    return sum + (h.currentValue * (security?.mag7Exposure || 0));
  }, 0) / totalValue * 100;
  
  return {
    positionConcentration,
    sectorConcentration,
    mag7Exposure,
    herfindahlIndex: calculateHerfindahl(holdings, totalValue),
    effectivePositions: 1 / calculateHerfindahl(holdings, totalValue)
  };
}

function calculateHerfindahl(holdings: Holding[], totalValue: number): number {
  return holdings.reduce((sum, h) => {
    const weight = h.currentValue / totalValue;
    return sum + (weight * weight);
  }, 0);
}
```

#### 4.1.2 Correlation Matrix

```typescript
function calculateCorrelationMatrix(holdings: Holding[]): CorrelationMatrix {
  const tickers = holdings.map(h => h.ticker);
  const matrix: number[][] = [];
  
  for (let i = 0; i < tickers.length; i++) {
    matrix[i] = [];
    for (let j = 0; j < tickers.length; j++) {
      if (i === j) {
        matrix[i][j] = 1.0;
      } else {
        matrix[i][j] = getHistoricalCorrelation(tickers[i], tickers[j]);
      }
    }
  }
  
  return {
    tickers,
    matrix,
    averageCorrelation: calculateAverageOffDiagonal(matrix),
    highCorrelationPairs: findHighCorrelationPairs(tickers, matrix, 0.8)
  };
}
```

### 4.2 Scenario Simulation

#### 4.2.1 Simple Scenario Application

```typescript
function applyScenario(
  allocation: Allocation,
  scenario: Scenario
): ScenarioResult {
  const startingValue = allocation.totalValue;
  let currentValue = startingValue;
  let peakValue = startingValue;
  let maxDrawdown = 0;
  let maxDrawdownDate: Date | null = null;
  const trajectory: TrajectoryPoint[] = [];
  
  const monthsInScenario = scenario.duration * 12;
  const startDate = new Date();
  
  for (let month = 0; month <= monthsInScenario; month++) {
    // Calculate monthly return for each position
    let monthlyPortfolioReturn = 0;
    
    for (const position of allocation.positions) {
      const security = getSecurityData(position.ticker);
      const assetClass = security?.assetClass || AssetClass.OTHER;
      const scenarioReturn = scenario.assetClassReturns[assetClass];
      
      if (scenarioReturn) {
        // Convert annual return to monthly
        const monthlyReturn = Math.pow(1 + scenarioReturn.annualReturn, 1/12) - 1;
        
        // Apply path adjustment if specified
        const adjustedReturn = applyPathAdjustment(
          monthlyReturn,
          month,
          monthsInScenario,
          scenarioReturn.path
        );
        
        // Weight by position
        const positionWeight = position.targetPercent / 100;
        monthlyPortfolioReturn += adjustedReturn * positionWeight;
      }
    }
    
    // Update portfolio value
    currentValue *= (1 + monthlyPortfolioReturn);
    
    // Track peak and drawdown
    if (currentValue > peakValue) {
      peakValue = currentValue;
    }
    const currentDrawdown = (peakValue - currentValue) / peakValue;
    if (currentDrawdown > maxDrawdown) {
      maxDrawdown = currentDrawdown;
      maxDrawdownDate = new Date(startDate);
      maxDrawdownDate.setMonth(maxDrawdownDate.getMonth() + month);
    }
    
    // Record trajectory point
    const pointDate = new Date(startDate);
    pointDate.setMonth(pointDate.getMonth() + month);
    trajectory.push({
      date: pointDate,
      value: currentValue,
      drawdown: currentDrawdown
    });
  }
  
  const totalReturn = (currentValue - startingValue) / startingValue;
  const annualizedReturn = Math.pow(1 + totalReturn, 1 / scenario.duration) - 1;
  
  return {
    scenarioId: scenario.id,
    allocationId: allocation.id,
    startingValue,
    endingValue: currentValue,
    totalReturn,
    annualizedReturn,
    maxDrawdown,
    maxDrawdownDate,
    recoveryTime: calculateRecoveryTime(trajectory, peakValue),
    volatility: calculateVolatility(trajectory),
    sharpeRatio: (annualizedReturn - 0.035) / calculateVolatility(trajectory), // 3.5% risk-free
    trajectory
  };
}

function applyPathAdjustment(
  baseReturn: number,
  currentMonth: number,
  totalMonths: number,
  path?: string
): number {
  if (!path || path === 'linear') return baseReturn;
  
  const progress = currentMonth / totalMonths;
  
  switch (path) {
    case 'front_loaded':
      // Most of the decline happens in first third
      if (progress < 0.33) return baseReturn * 2;
      if (progress < 0.66) return baseReturn * 0.8;
      return baseReturn * 0.2;
      
    case 'back_loaded':
      // Most of the move happens in last third
      if (progress < 0.33) return baseReturn * 0.2;
      if (progress < 0.66) return baseReturn * 0.8;
      return baseReturn * 2;
      
    case 'v_shaped':
      // Down then up
      if (progress < 0.5) return baseReturn;
      return -baseReturn * 0.7; // Partial recovery
      
    default:
      return baseReturn;
  }
}
```

#### 4.2.2 Monte Carlo Simulation

```typescript
interface MonteCarloConfig {
  numSimulations: number;        // Default: 1000
  yearsToSimulate: number;       // Default: 10
  confidenceIntervals: number[]; // Default: [0.05, 0.25, 0.50, 0.75, 0.95]
}

interface MonteCarloResult {
  percentileOutcomes: {
    [percentile: number]: {
      endingValue: number;
      annualizedReturn: number;
    };
  };
  probabilityOfLoss: number;     // % of simulations ending below starting value
  probabilityOfGain: number;     // % of simulations ending above starting value
  averageEndingValue: number;
  medianEndingValue: number;
  allSimulations: number[];      // Array of ending values for histogram
}

function runMonteCarloSimulation(
  allocation: Allocation,
  config: MonteCarloConfig
): MonteCarloResult {
  const endingValues: number[] = [];
  
  for (let sim = 0; sim < config.numSimulations; sim++) {
    let value = allocation.totalValue;
    
    for (let year = 0; year < config.yearsToSimulate; year++) {
      // Generate correlated random returns for each asset class
      const returns = generateCorrelatedReturns(allocation);
      
      // Apply returns to portfolio
      let annualReturn = 0;
      for (const position of allocation.positions) {
        const security = getSecurityData(position.ticker);
        const assetClass = security?.assetClass || AssetClass.OTHER;
        const positionReturn = returns[assetClass] || 0;
        annualReturn += (position.targetPercent / 100) * positionReturn;
      }
      
      value *= (1 + annualReturn);
    }
    
    endingValues.push(value);
  }
  
  // Sort for percentile calculations
  endingValues.sort((a, b) => a - b);
  
  const percentileOutcomes: { [p: number]: any } = {};
  for (const p of config.confidenceIntervals) {
    const index = Math.floor(p * config.numSimulations);
    const endingValue = endingValues[index];
    percentileOutcomes[p] = {
      endingValue,
      annualizedReturn: Math.pow(endingValue / allocation.totalValue, 1 / config.yearsToSimulate) - 1
    };
  }
  
  const startingValue = allocation.totalValue;
  
  return {
    percentileOutcomes,
    probabilityOfLoss: endingValues.filter(v => v < startingValue).length / config.numSimulations,
    probabilityOfGain: endingValues.filter(v => v > startingValue).length / config.numSimulations,
    averageEndingValue: endingValues.reduce((a, b) => a + b, 0) / config.numSimulations,
    medianEndingValue: endingValues[Math.floor(config.numSimulations / 2)],
    allSimulations: endingValues
  };
}

function generateCorrelatedReturns(allocation: Allocation): { [assetClass: string]: number } {
  // Use Cholesky decomposition to generate correlated normal random variables
  // Then transform to asset class returns using historical mean/std dev
  
  // Simplified implementation using asset class statistics
  const returns: { [assetClass: string]: number } = {};
  
  const assetClassStats = getAssetClassStatistics();
  
  for (const [assetClass, stats] of Object.entries(assetClassStats)) {
    // Generate random return from normal distribution
    const z = generateStandardNormal();
    returns[assetClass] = stats.mean + (z * stats.stdDev);
  }
  
  // Apply correlation adjustments (simplified)
  // Full implementation would use correlation matrix and Cholesky decomposition
  
  return returns;
}

function generateStandardNormal(): number {
  // Box-Muller transform
  const u1 = Math.random();
  const u2 = Math.random();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}
```

### 4.3 Historical Backtest

```typescript
interface BacktestConfig {
  startDate: Date;
  endDate: Date;
  rebalanceFrequency: 'monthly' | 'quarterly' | 'annually' | 'never';
  dividendReinvestment: boolean;
}

interface BacktestResult {
  startingValue: number;
  endingValue: number;
  totalReturn: number;
  annualizedReturn: number;
  maxDrawdown: number;
  maxDrawdownStart: Date;
  maxDrawdownEnd: Date;
  recoveryDate?: Date;
  volatility: number;
  sharpeRatio: number;
  sortinoRatio: number;
  calmarRatio: number;        // CAGR / max drawdown
  trajectory: TrajectoryPoint[];
  yearlyReturns: { year: number; return: number }[];
  drawdownPeriods: DrawdownPeriod[];
}

interface DrawdownPeriod {
  startDate: Date;
  troughDate: Date;
  endDate?: Date;
  peakValue: number;
  troughValue: number;
  drawdownPercent: number;
  durationMonths: number;
  recovered: boolean;
}

async function runBacktest(
  allocation: Allocation,
  config: BacktestConfig
): Promise<BacktestResult> {
  // Fetch historical price data for all holdings
  const priceData = await fetchHistoricalPrices(
    allocation.positions.map(p => p.ticker),
    config.startDate,
    config.endDate
  );
  
  let portfolioValue = allocation.totalValue;
  let peakValue = portfolioValue;
  let maxDrawdown = 0;
  let maxDrawdownStart: Date | null = null;
  let maxDrawdownEnd: Date | null = null;
  
  const trajectory: TrajectoryPoint[] = [];
  const drawdownPeriods: DrawdownPeriod[] = [];
  let currentDrawdownPeriod: DrawdownPeriod | null = null;
  
  // Initialize position values based on allocation
  let positions = allocation.positions.map(p => ({
    ...p,
    value: allocation.totalValue * (p.targetPercent / 100)
  }));
  
  // Get all unique dates in price data
  const dates = getUniqueDates(priceData);
  let lastRebalanceDate = dates[0];
  
  for (const date of dates) {
    // Update position values based on price changes
    for (const position of positions) {
      const previousPrice = getPriceOnDate(priceData, position.ticker, previousTradingDay(date));
      const currentPrice = getPriceOnDate(priceData, position.ticker, date);
      
      if (previousPrice && currentPrice) {
        const dailyReturn = (currentPrice - previousPrice) / previousPrice;
        position.value *= (1 + dailyReturn);
      }
    }
    
    // Calculate total portfolio value
    portfolioValue = positions.reduce((sum, p) => sum + p.value, 0);
    
    // Check for rebalancing
    if (shouldRebalance(date, lastRebalanceDate, config.rebalanceFrequency)) {
      positions = rebalancePositions(positions, allocation, portfolioValue);
      lastRebalanceDate = date;
    }
    
    // Track peak and drawdown
    if (portfolioValue > peakValue) {
      peakValue = portfolioValue;
      
      // Close any open drawdown period
      if (currentDrawdownPeriod && !currentDrawdownPeriod.recovered) {
        currentDrawdownPeriod.endDate = date;
        currentDrawdownPeriod.recovered = true;
        currentDrawdownPeriod.durationMonths = monthsBetween(
          currentDrawdownPeriod.startDate,
          date
        );
      }
    }
    
    const currentDrawdown = (peakValue - portfolioValue) / peakValue;
    
    // Start new drawdown period if needed
    if (currentDrawdown > 0.05 && !currentDrawdownPeriod) {
      currentDrawdownPeriod = {
        startDate: date,
        troughDate: date,
        peakValue,
        troughValue: portfolioValue,
        drawdownPercent: currentDrawdown,
        durationMonths: 0,
        recovered: false
      };
    }
    
    // Update current drawdown period
    if (currentDrawdownPeriod && portfolioValue < currentDrawdownPeriod.troughValue) {
      currentDrawdownPeriod.troughDate = date;
      currentDrawdownPeriod.troughValue = portfolioValue;
      currentDrawdownPeriod.drawdownPercent = currentDrawdown;
    }
    
    // Track max drawdown
    if (currentDrawdown > maxDrawdown) {
      maxDrawdown = currentDrawdown;
      maxDrawdownStart = currentDrawdownPeriod?.startDate || date;
      maxDrawdownEnd = date;
    }
    
    // Record trajectory
    trajectory.push({
      date,
      value: portfolioValue,
      drawdown: currentDrawdown
    });
  }
  
  // Close any open drawdown period
  if (currentDrawdownPeriod && !currentDrawdownPeriod.recovered) {
    currentDrawdownPeriod.durationMonths = monthsBetween(
      currentDrawdownPeriod.startDate,
      dates[dates.length - 1]
    );
    drawdownPeriods.push(currentDrawdownPeriod);
  }
  
  // Calculate final metrics
  const startingValue = allocation.totalValue;
  const totalReturn = (portfolioValue - startingValue) / startingValue;
  const years = yearsBetween(config.startDate, config.endDate);
  const annualizedReturn = Math.pow(1 + totalReturn, 1 / years) - 1;
  const volatility = calculateAnnualizedVolatility(trajectory);
  const riskFreeRate = 0.02; // Approximate historical average
  
  return {
    startingValue,
    endingValue: portfolioValue,
    totalReturn,
    annualizedReturn,
    maxDrawdown,
    maxDrawdownStart: maxDrawdownStart!,
    maxDrawdownEnd: maxDrawdownEnd!,
    volatility,
    sharpeRatio: (annualizedReturn - riskFreeRate) / volatility,
    sortinoRatio: calculateSortinoRatio(trajectory, annualizedReturn, riskFreeRate),
    calmarRatio: annualizedReturn / maxDrawdown,
    trajectory,
    yearlyReturns: calculateYearlyReturns(trajectory),
    drawdownPeriods
  };
}
```

### 4.4 Trade Generation

```typescript
interface TradeList {
  trades: Trade[];
  summary: {
    totalBuys: number;
    totalSells: number;
    netCashFlow: number;
    estimatedCommissions: number;
  };
}

interface Trade {
  action: 'BUY' | 'SELL';
  ticker: string;
  name: string;
  shares: number;
  estimatedPrice: number;
  estimatedValue: number;
  currentAllocation: number;
  targetAllocation: number;
  // Tax info (for taxable accounts)
  taxLot?: {
    purchaseDate: Date;
    costBasis: number;
    gainLoss: number;
    isLongTerm: boolean;
  };
}

function generateTradeList(
  currentHoldings: Holding[],
  targetAllocation: Allocation,
  options: {
    minimizeTradeCount?: boolean;
    taxAware?: boolean;
    threshold?: number; // Only trade if delta > threshold %
  } = {}
): TradeList {
  const totalValue = currentHoldings.reduce((sum, h) => sum + h.currentValue, 0);
  const trades: Trade[] = [];
  
  // Build map of current holdings
  const currentMap = new Map<string, Holding>();
  currentHoldings.forEach(h => currentMap.set(h.ticker, h));
  
  // Calculate trades needed for each target position
  for (const target of targetAllocation.positions) {
    const current = currentMap.get(target.ticker);
    const currentValue = current?.currentValue || 0;
    const currentAllocation = (currentValue / totalValue) * 100;
    const targetValue = totalValue * (target.targetPercent / 100);
    const deltaValue = targetValue - currentValue;
    
    // Apply threshold
    const thresholdValue = (options.threshold || 0) * totalValue / 100;
    if (Math.abs(deltaValue) < thresholdValue) continue;
    
    const currentPrice = current?.currentPrice || target.currentValue / target.targetPercent * 100;
    const shares = Math.round(deltaValue / currentPrice);
    
    if (shares === 0) continue;
    
    trades.push({
      action: shares > 0 ? 'BUY' : 'SELL',
      ticker: target.ticker,
      name: getSecurityData(target.ticker)?.name || target.ticker,
      shares: Math.abs(shares),
      estimatedPrice: currentPrice,
      estimatedValue: Math.abs(deltaValue),
      currentAllocation,
      targetAllocation: target.targetPercent
    });
    
    // Remove from current map (to track positions to close)
    currentMap.delete(target.ticker);
  }
  
  // Handle positions to close entirely (in current but not in target)
  for (const [ticker, holding] of currentMap) {
    if (holding.currentValue > 0) {
      trades.push({
        action: 'SELL',
        ticker,
        name: holding.name,
        shares: holding.shares,
        estimatedPrice: holding.currentPrice,
        estimatedValue: holding.currentValue,
        currentAllocation: (holding.currentValue / totalValue) * 100,
        targetAllocation: 0
      });
    }
  }
  
  // Sort: sells first (to generate cash), then buys
  trades.sort((a, b) => {
    if (a.action === 'SELL' && b.action === 'BUY') return -1;
    if (a.action === 'BUY' && b.action === 'SELL') return 1;
    return b.estimatedValue - a.estimatedValue; // Largest trades first
  });
  
  // Calculate summary
  const totalSells = trades
    .filter(t => t.action === 'SELL')
    .reduce((sum, t) => sum + t.estimatedValue, 0);
  const totalBuys = trades
    .filter(t => t.action === 'BUY')
    .reduce((sum, t) => sum + t.estimatedValue, 0);
  
  return {
    trades,
    summary: {
      totalBuys,
      totalSells,
      netCashFlow: totalSells - totalBuys,
      estimatedCommissions: 0 // Most brokers are commission-free now
    }
  };
}
```

---

## 5. Application Architecture

### 5.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT (Browser)                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────┐  │
│  │   React App     │  │   State Mgmt    │  │    Calculation Engine       │  │
│  │                 │  │   (Zustand)     │  │    (Web Worker)             │  │
│  │  • Components   │◄─┤                 │◄─┤                             │  │
│  │  • Routing      │  │  • Portfolio    │  │  • Scenario simulation      │  │
│  │  • Charts       │  │  • Allocations  │  │  • Monte Carlo              │  │
│  │                 │  │  • Scenarios    │  │  • Backtest                 │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────────────────┘  │
│           │                    │                        │                    │
│           └────────────────────┴────────────────────────┘                    │
│                                │                                             │
│  ┌─────────────────────────────┴─────────────────────────────────────────┐  │
│  │                        Local Storage / IndexedDB                       │  │
│  │  • Saved portfolios    • Custom scenarios    • User preferences       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ HTTPS (optional)
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           BACKEND (Optional)                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────┐  │
│  │   API Server    │  │   Price Data    │  │    User Accounts            │  │
│  │   (Node/Deno)   │  │   Service       │  │    (Optional)               │  │
│  │                 │  │                 │  │                             │  │
│  │  • REST/GraphQL │  │  • EOD quotes   │  │  • Auth                     │  │
│  │  • Validation   │  │  • Historical   │  │  • Sync                     │  │
│  │                 │  │  • Caching      │  │  • Sharing                  │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────────────────┘  │
│                                │                                             │
│                                ▼                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                         External Data Sources                          │  │
│  │  • Alpha Vantage    • Yahoo Finance    • Polygon.io    • IEX Cloud    │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend Framework** | React 18+ with TypeScript | Industry standard, large ecosystem |
| **State Management** | Zustand | Lightweight, TypeScript-native |
| **Styling** | Tailwind CSS | Utility-first, rapid development |
| **Charts** | Recharts or Victory | React-native, declarative |
| **Data Tables** | TanStack Table | Headless, highly customizable |
| **Build Tool** | Vite | Fast development, optimized builds |
| **Testing** | Vitest + React Testing Library | Fast, Jest-compatible |
| **Backend (optional)** | Node.js or Deno | JavaScript ecosystem alignment |
| **Database (optional)** | Supabase or PlanetScale | Managed, scalable |
| **Hosting** | Vercel or Cloudflare Pages | Edge deployment, easy CI/CD |

### 5.3 Offline-First Architecture

```typescript
// Service Worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(registration => {
    console.log('SW registered:', registration);
  });
}

// IndexedDB for local persistence
import { openDB, DBSchema } from 'idb';

interface PortfolioDBSchema extends DBSchema {
  portfolios: {
    key: string;
    value: Portfolio;
    indexes: { 'by-updated': Date };
  };
  allocations: {
    key: string;
    value: Allocation;
    indexes: { 'by-portfolio': string };
  };
  scenarios: {
    key: string;
    value: Scenario;
  };
  priceCache: {
    key: string; // ticker
    value: {
      ticker: string;
      price: number;
      timestamp: Date;
    };
  };
}

const db = await openDB<PortfolioDBSchema>('portfolio-modeler', 1, {
  upgrade(db) {
    const portfolioStore = db.createObjectStore('portfolios', { keyPath: 'id' });
    portfolioStore.createIndex('by-updated', 'updatedAt');
    
    const allocationStore = db.createObjectStore('allocations', { keyPath: 'id' });
    allocationStore.createIndex('by-portfolio', 'portfolioId');
    
    db.createObjectStore('scenarios', { keyPath: 'id' });
    db.createObjectStore('priceCache', { keyPath: 'ticker' });
  }
});
```

---

## 6. Frontend Components

### 6.1 Component Hierarchy

```
App
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   ├── Navigation
│   │   └── UserMenu (optional)
│   ├── Sidebar
│   │   ├── PortfolioList
│   │   └── QuickActions
│   └── MainContent
│       └── [Route-based content]
│
├── Pages
│   ├── Dashboard
│   │   ├── PortfolioSummary
│   │   ├── AllocationChart
│   │   ├── ConcentrationWarnings
│   │   └── QuickStats
│   │
│   ├── PortfolioInput
│   │   ├── HoldingsTable
│   │   │   ├── HoldingRow
│   │   │   └── AddHoldingForm
│   │   ├── ImportModal
│   │   └── ValidationErrors
│   │
│   ├── AllocationBuilder
│   │   ├── AllocationComparison
│   │   │   ├── CurrentAllocation
│   │   │   └── ProposedAllocation
│   │   ├── AllocationSliders
│   │   ├── TradePreview
│   │   └── SaveAllocationModal
│   │
│   ├── ScenarioSimulator
│   │   ├── ScenarioSelector
│   │   │   ├── BuiltInScenarios
│   │   │   └── CustomScenarios
│   │   ├── ScenarioConfig
│   │   ├── RunSimulation
│   │   └── ResultsDisplay
│   │       ├── TrajectoryChart
│   │       ├── MetricsTable
│   │       └── DrawdownChart
│   │
│   ├── ComparisonDashboard
│   │   ├── ScenarioMatrix
│   │   ├── AllocationsCompared
│   │   ├── RiskReturnScatter
│   │   └── ExportOptions
│   │
│   ├── Backtest
│   │   ├── DateRangePicker
│   │   ├── BacktestConfig
│   │   ├── HistoricalChart
│   │   ├── YearlyReturnsTable
│   │   └── DrawdownTimeline
│   │
│   └── Settings
│       ├── AccountSettings
│       ├── DataSources
│       └── Preferences
│
└── Shared Components
    ├── Charts
    │   ├── PieChart
    │   ├── LineChart
    │   ├── BarChart
    │   └── ScatterPlot
    ├── Tables
    │   ├── DataTable
    │   └── ComparisonTable
    ├── Forms
    │   ├── TickerInput (with autocomplete)
    │   ├── PercentageSlider
    │   └── CurrencyInput
    ├── Modals
    │   ├── ConfirmModal
    │   └── InfoModal
    └── Feedback
        ├── LoadingSpinner
        ├── ErrorBoundary
        └── Toast
```

### 6.2 Key Component Specifications

#### 6.2.1 HoldingsTable

```typescript
interface HoldingsTableProps {
  holdings: Holding[];
  onUpdate: (holding: Holding) => void;
  onDelete: (holdingId: string) => void;
  onAdd: (holding: Omit<Holding, 'id'>) => void;
  editable?: boolean;
  showGainLoss?: boolean;
}

// Columns
const columns = [
  { id: 'ticker', header: 'Ticker', sortable: true },
  { id: 'name', header: 'Name', sortable: true },
  { id: 'shares', header: 'Shares', sortable: true, align: 'right' },
  { id: 'currentPrice', header: 'Price', sortable: true, align: 'right', format: 'currency' },
  { id: 'currentValue', header: 'Value', sortable: true, align: 'right', format: 'currency' },
  { id: 'costBasis', header: 'Cost Basis', sortable: true, align: 'right', format: 'currency' },
  { id: 'gainLoss', header: 'Gain/Loss', sortable: true, align: 'right', format: 'currency', colorCode: true },
  { id: 'gainLossPercent', header: 'Gain/Loss %', sortable: true, align: 'right', format: 'percent', colorCode: true },
  { id: 'allocationPercent', header: 'Allocation', sortable: true, align: 'right', format: 'percent' },
  { id: 'actions', header: '', width: 80 }
];
```

#### 6.2.2 AllocationSliders

```typescript
interface AllocationSlidersProps {
  positions: AllocationPosition[];
  totalValue: number;
  onChange: (ticker: string, newPercent: number) => void;
  constraints?: {
    minPercent?: number;
    maxPercent?: number;
    mustTotal100?: boolean;
  };
}

// Each slider shows:
// - Ticker and name
// - Current allocation (gray bar)
// - Target allocation (adjustable slider)
// - Delta indicator (+/-%)
// - Dollar value at target allocation
```

#### 6.2.3 ScenarioMatrix

```typescript
interface ScenarioMatrixProps {
  allocations: Allocation[];
  scenarios: Scenario[];
  results: Map<string, Map<string, ScenarioResult>>; // allocation -> scenario -> result
  highlightBest?: boolean;
  highlightWorst?: boolean;
}

// Matrix display:
// Rows: Scenarios
// Columns: Allocations (Current, Proposed A, Proposed B, etc.)
// Cells: Total return with color coding (green positive, red negative)
// Summary row: Average, Best Case, Worst Case
```

#### 6.2.4 TrajectoryChart

```typescript
interface TrajectoryChartProps {
  trajectories: {
    allocation: Allocation;
    result: ScenarioResult;
    color: string;
  }[];
  showDrawdown?: boolean;
  showEvents?: boolean; // Mark scenario events on chart
  interactive?: boolean; // Hover for details
}

// Features:
// - Multiple lines for different allocations
// - Shaded area for drawdown periods
// - Hover tooltip with value/date/drawdown
// - Legend with allocation names
// - Zoom/pan controls
```

---

## 7. API Specification

### 7.1 REST API Endpoints (if backend is implemented)

#### Portfolio Management

```
GET    /api/portfolios                 List user's portfolios
POST   /api/portfolios                 Create new portfolio
GET    /api/portfolios/:id             Get portfolio details
PUT    /api/portfolios/:id             Update portfolio
DELETE /api/portfolios/:id             Delete portfolio

POST   /api/portfolios/:id/holdings    Add holding
PUT    /api/portfolios/:id/holdings/:holdingId    Update holding
DELETE /api/portfolios/:id/holdings/:holdingId    Remove holding

POST   /api/portfolios/:id/import      Import holdings from CSV
```

#### Allocations

```
GET    /api/portfolios/:id/allocations           List allocations
POST   /api/portfolios/:id/allocations           Create allocation
PUT    /api/portfolios/:id/allocations/:allocId  Update allocation
DELETE /api/portfolios/:id/allocations/:allocId  Delete allocation

POST   /api/portfolios/:id/allocations/:allocId/trades    Generate trade list
```

#### Scenarios

```
GET    /api/scenarios                  List all scenarios (built-in + custom)
POST   /api/scenarios                  Create custom scenario
PUT    /api/scenarios/:id              Update custom scenario
DELETE /api/scenarios/:id              Delete custom scenario

POST   /api/scenarios/:id/simulate     Run scenario simulation
        Body: { allocationIds: string[] }
        Response: ScenarioResult[]
```

#### Market Data

```
GET    /api/quotes/:ticker             Get current quote
GET    /api/quotes/batch?tickers=X,Y,Z Get multiple quotes
GET    /api/history/:ticker            Get historical prices
        Query: ?start=YYYY-MM-DD&end=YYYY-MM-DD&interval=daily|weekly|monthly
GET    /api/securities/:ticker         Get security metadata
GET    /api/securities/search?q=fidelity+500    Search securities
```

#### Backtest

```
POST   /api/backtest
        Body: {
          allocationId: string,
          startDate: string,
          endDate: string,
          rebalanceFrequency: string
        }
        Response: BacktestResult
```

### 7.2 Request/Response Examples

#### Create Portfolio

```http
POST /api/portfolios
Content-Type: application/json

{
  "name": "Rollover IRA",
  "accountType": "ROLLOVER_IRA",
  "metadata": {
    "broker": "Fidelity"
  }
}

---

HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "port_abc123",
  "name": "Rollover IRA",
  "accountType": "ROLLOVER_IRA",
  "holdings": [],
  "createdAt": "2025-12-22T10:30:00Z",
  "updatedAt": "2025-12-22T10:30:00Z",
  "metadata": {
    "broker": "Fidelity"
  }
}
```

#### Run Scenario Simulation

```http
POST /api/scenarios/2022_redux/simulate
Content-Type: application/json

{
  "allocationIds": ["alloc_current", "alloc_proposed"]
}

---

HTTP/1.1 200 OK
Content-Type: application/json

{
  "results": [
    {
      "scenarioId": "2022_redux",
      "allocationId": "alloc_current",
      "startingValue": 500000,
      "endingValue": 365000,
      "totalReturn": -0.27,
      "annualizedReturn": -0.27,
      "maxDrawdown": 0.32,
      "sharpeRatio": -1.45,
      "trajectory": [...]
    },
    {
      "scenarioId": "2022_redux",
      "allocationId": "alloc_proposed",
      "startingValue": 500000,
      "endingValue": 415000,
      "totalReturn": -0.17,
      "annualizedReturn": -0.17,
      "maxDrawdown": 0.21,
      "sharpeRatio": -0.89,
      "trajectory": [...]
    }
  ]
}
```

---

## 8. Data Sources & Integrations

### 8.1 Price Data Providers

| Provider | Cost | Features | Rate Limits | Recommendation |
|----------|------|----------|-------------|----------------|
| **Yahoo Finance (unofficial)** | Free | EOD, historical, basic info | ~2000/hour | Good for MVP |
| **Alpha Vantage** | Free tier available | EOD, intraday, fundamentals | 5/min (free) | Good free option |
| **Polygon.io** | $29/mo starter | Real-time, historical | Generous | Production ready |
| **IEX Cloud** | Pay-as-you-go | Real-time, historical, fundamentals | Token-based | Flexible pricing |
| **Twelve Data** | Free tier available | Real-time, historical | 8/min (free) | Good API design |

### 8.2 Fund Data Requirements

For mutual funds (like Fidelity funds), we need:
- Current NAV
- Historical NAV
- Expense ratio
- Asset class classification
- Top holdings (for overlap analysis)
- Category (Morningstar-style)

**Sources:**
- Morningstar API (paid)
- Fund company websites (scraping, terms vary)
- SEC EDGAR (13F filings for holdings)
- Manual curation for key funds

### 8.3 Reference Data: Fidelity Funds

Pre-populate security master with common Fidelity funds:

```typescript
const FIDELITY_FUNDS: Security[] = [
  {
    ticker: "FXAIX",
    name: "Fidelity 500 Index Fund",
    assetClass: AssetClass.US_EQUITY_LARGE_BLEND,
    geography: Geography.US,
    expenseRatio: 0.015,
    historicalReturn: 0.105,
    historicalVolatility: 0.18,
    beta: 1.0,
    correlationToSP500: 1.0,
    mag7Exposure: 0.32
  },
  {
    ticker: "FCNTX",
    name: "Fidelity Contrafund",
    assetClass: AssetClass.US_EQUITY_LARGE_GROWTH,
    geography: Geography.US,
    expenseRatio: 0.39,
    historicalReturn: 0.125,
    historicalVolatility: 0.20,
    beta: 1.05,
    correlationToSP500: 0.95,
    mag7Exposure: 0.45
  },
  {
    ticker: "FOCPX",
    name: "Fidelity OTC Portfolio",
    assetClass: AssetClass.US_EQUITY_LARGE_GROWTH,
    geography: Geography.US,
    expenseRatio: 0.72,
    historicalReturn: 0.13,
    historicalVolatility: 0.24,
    beta: 1.15,
    correlationToSP500: 0.92,
    mag7Exposure: 0.50
  },
  {
    ticker: "FIGRX",
    name: "Fidelity International Discovery",
    assetClass: AssetClass.INTL_EQUITY_DEVELOPED,
    geography: Geography.INTL_DEVELOPED,
    expenseRatio: 0.70,
    historicalReturn: 0.08,
    historicalVolatility: 0.19,
    beta: 0.85,
    correlationToSP500: 0.75,
    mag7Exposure: 0.05
  },
  {
    ticker: "FFFFX",
    name: "Fidelity Freedom 2040",
    assetClass: AssetClass.TARGET_DATE,
    geography: Geography.GLOBAL,
    expenseRatio: 0.59,
    historicalReturn: 0.085,
    historicalVolatility: 0.14,
    beta: 0.85,
    correlationToSP500: 0.88,
    mag7Exposure: 0.25
  },
  {
    ticker: "FXNAX",
    name: "Fidelity U.S. Bond Index Fund",
    assetClass: AssetClass.US_BOND_TOTAL,
    geography: Geography.US,
    expenseRatio: 0.025,
    historicalReturn: 0.04,
    historicalVolatility: 0.06,
    beta: -0.05,
    correlationToSP500: -0.10,
    mag7Exposure: 0
  },
  // ... additional funds
];
```

### 8.4 CSV Import Format (Fidelity)

Fidelity portfolio export typically includes:

```csv
Account Number,Account Name,Symbol,Description,Quantity,Last Price,Current Value,Today's Gain/Loss Dollar,Today's Gain/Loss Percent,Total Gain/Loss Dollar,Total Gain/Loss Percent,Percent Of Account,Cost Basis,Average Cost Basis,Type
```

Parser implementation:

```typescript
interface FidelityCSVRow {
  'Account Number': string;
  'Account Name': string;
  'Symbol': string;
  'Description': string;
  'Quantity': string;
  'Last Price': string;
  'Current Value': string;
  'Total Gain/Loss Dollar': string;
  'Total Gain/Loss Percent': string;
  'Percent Of Account': string;
  'Cost Basis': string;
  'Average Cost Basis': string;
}

function parseFidelityCSV(csvContent: string): Holding[] {
  const rows = parseCSV<FidelityCSVRow>(csvContent);
  
  return rows
    .filter(row => row['Symbol'] && row['Symbol'] !== 'Pending Activity')
    .map(row => ({
      id: generateId(),
      ticker: row['Symbol'].replace('**', ''), // Remove asterisks
      name: row['Description'],
      shares: parseFloat(row['Quantity'].replace(/,/g, '')),
      currentPrice: parseCurrency(row['Last Price']),
      currentValue: parseCurrency(row['Current Value']),
      costBasis: parseCurrency(row['Cost Basis']),
      gainLoss: parseCurrency(row['Total Gain/Loss Dollar']),
      gainLossPercent: parsePercent(row['Total Gain/Loss Percent']),
      allocationPercent: parsePercent(row['Percent Of Account']),
      assetClass: lookupAssetClass(row['Symbol']),
      sector: undefined, // Would need additional lookup
      geography: lookupGeography(row['Symbol'])
    }));
}

function parseCurrency(value: string): number {
  return parseFloat(value.replace(/[$,]/g, '')) || 0;
}

function parsePercent(value: string): number {
  return parseFloat(value.replace(/%/g, '')) || 0;
}
```

---

## 9. Deployment Options

### 9.1 Option A: Static Site (Simplest)

**Architecture**: Pure frontend, all calculations client-side

```
┌────────────────────────────────────────────────────┐
│                  Vercel / Netlify                   │
│  ┌──────────────────────────────────────────────┐  │
│  │           Static React Application            │  │
│  │                                               │  │
│  │  • All portfolio data in localStorage         │  │
│  │  • Price data from free APIs (client-side)   │  │
│  │  • Calculations in Web Worker                 │  │
│  │  • PWA for offline support                    │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

**Pros:**
- Zero hosting cost
- Maximum privacy (no data leaves browser)
- Simple deployment
- Works offline

**Cons:**
- Limited historical data (free API rate limits)
- No cross-device sync
- Price data may be stale

**Deploy:**
```bash
npm run build
vercel deploy --prod
```

### 9.2 Option B: Hybrid (Recommended)

**Architecture**: Static frontend + lightweight API for data

```
┌────────────────────────────────────────────────────────────────────┐
│                           Vercel                                    │
│  ┌─────────────────────────────┐  ┌─────────────────────────────┐  │
│  │      Static Frontend        │  │      API Routes             │  │
│  │                             │  │      (Serverless)           │  │
│  │  • React SPA                │  │                             │  │
│  │  • State in localStorage    │  │  • /api/quotes              │  │
│  │  • Calls API for data       │  │  • /api/history             │  │
│  │                             │  │  • /api/securities          │  │
│  └─────────────────────────────┘  └──────────────┬──────────────┘  │
│                                                   │                 │
│                                                   ▼                 │
│                                   ┌─────────────────────────────┐  │
│                                   │   Upstash Redis (Cache)     │  │
│                                   └─────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
                          ┌─────────────────────────┐
                          │   External Price APIs   │
                          │   (Alpha Vantage, etc.) │
                          └─────────────────────────┘
```

**Pros:**
- Better price data (server-side API keys, caching)
- Still low cost (serverless, ~$0-5/month)
- Privacy preserved (portfolio data stays local)
- Can add features incrementally

**Cons:**
- Slightly more complexity
- Requires API key management

### 9.3 Option C: Full Stack (Maximum Features)

**Architecture**: Full backend with database

```
┌─────────────────────────────────────────────────────────────────────────┐
│                               Railway / Render                           │
│  ┌──────────────────────────┐  ┌──────────────────────────────────────┐ │
│  │    Frontend (Vercel)     │  │         Backend (Node.js)            │ │
│  │                          │  │                                      │ │
│  │  • React SPA             │  │  • Express/Fastify API               │ │
│  │  • Auth integration      │  │  • User authentication               │ │
│  │                          │  │  • Portfolio CRUD                    │ │
│  │                          │  │  • Scenario engine                   │ │
│  └──────────────────────────┘  └───────────────┬──────────────────────┘ │
│                                                 │                        │
│          ┌──────────────────────────────────────┼────────────────────┐  │
│          │                                      │                    │  │
│          ▼                                      ▼                    │  │
│  ┌───────────────────┐              ┌─────────────────────────────┐  │  │
│  │  Supabase/Postgres │              │      Redis Cache           │  │  │
│  │                    │              │                            │  │  │
│  │  • Users           │              │  • Price data              │  │  │
│  │  • Portfolios      │              │  • Session data            │  │  │
│  │  • Allocations     │              │                            │  │  │
│  │  • Custom scenarios│              │                            │  │  │
│  └───────────────────┘              └─────────────────────────────┘  │  │
│                                                                       │  │
└───────────────────────────────────────────────────────────────────────┘  │
```

**Pros:**
- Cross-device sync
- Collaboration/sharing
- Comprehensive historical data
- Advanced features possible

**Cons:**
- Higher cost (~$20-50/month)
- More complex ops
- Privacy considerations

---

## 10. Security Considerations

### 10.1 Data Privacy

| Data Type | Sensitivity | Storage Approach |
|-----------|-------------|------------------|
| Portfolio holdings | High | Local storage only (default) |
| Account numbers | High | Never store; strip from imports |
| Custom scenarios | Low | Local or cloud (user choice) |
| Price data | Public | Cache freely |
| User preferences | Low | Local storage |

### 10.2 Authentication (if backend)

```typescript
// Use Supabase Auth or Auth0
// JWT tokens with short expiry
// No sensitive portfolio data in tokens

interface AuthConfig {
  provider: 'supabase' | 'auth0';
  jwtExpiry: '15m';
  refreshTokenExpiry: '7d';
  mfaEnabled: boolean;
}
```

### 10.3 API Security

- Rate limiting on all endpoints
- CORS restricted to known origins
- Input validation on all parameters
- No sensitive data in URLs (use POST body)
- API keys stored in environment variables

### 10.4 Client-Side Security

```typescript
// Content Security Policy
const csp = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'"], // For Vite dev
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'https:'],
  'connect-src': ["'self'", 'https://api.example.com'],
  'font-src': ["'self'"],
  'frame-ancestors': ["'none'"]
};

// Never store actual credentials
// Use secure random IDs for portfolios
// Sanitize all CSV imports
```

---

## 11. Future Enhancements

### Phase 2 (Post-MVP)

| Feature | Description | Effort |
|---------|-------------|--------|
| **Tax-Loss Harvesting** | Identify harvesting opportunities in taxable accounts | Medium |
| **Dividend Projections** | Estimate forward dividend income | Low |
| **Factor Analysis** | Breakdown by value/growth/size/quality factors | Medium |
| **ESG Scoring** | Environmental/Social/Governance metrics | Low |
| **Benchmark Comparison** | Compare to standard benchmarks (60/40, etc.) | Low |

### Phase 3 (Advanced)

| Feature | Description | Effort |
|---------|-------------|--------|
| **AI Recommendations** | LLM-powered allocation suggestions | High |
| **Options Overlays** | Model covered calls, protective puts | High |
| **Real Estate Integration** | Include property values in net worth | Medium |
| **Social/Sharing** | Share allocations with community | Medium |
| **Automated Rebalancing** | Connect to brokerage for execution | High |
| **Mobile App** | React Native implementation | High |

### Technical Debt Considerations

- Add comprehensive error boundaries
- Implement retry logic for API calls
- Add telemetry/analytics (privacy-respecting)
- Performance monitoring
- Automated E2E testing
- Accessibility audit (WCAG 2.1 AA)

---

## Appendices

### Appendix A: Glossary

| Term | Definition |
|------|------------|
| **CAGR** | Compound Annual Growth Rate |
| **Drawdown** | Peak-to-trough decline in portfolio value |
| **Sharpe Ratio** | Risk-adjusted return: (return - risk-free) / volatility |
| **Beta** | Measure of volatility relative to market benchmark |
| **Mag 7** | Magnificent Seven: AAPL, MSFT, GOOGL, AMZN, NVDA, META, TSLA |
| **CAPE** | Cyclically Adjusted Price-to-Earnings (Shiller P/E) |
| **Monte Carlo** | Simulation using random sampling |

### Appendix B: Asset Class Return Assumptions

| Asset Class | Expected Return | Std Dev | Source |
|-------------|-----------------|---------|--------|
| US Large Cap Growth | 8.5% | 22% | Historical + CAPE adjustment |
| US Large Cap Value | 7.5% | 18% | Historical |
| US Large Cap Blend | 7.0% | 18% | Current CAPE implies lower |
| International Developed | 6.5% | 19% | More attractive valuations |
| Emerging Markets | 7.5% | 24% | Higher risk/reward |
| US Aggregate Bonds | 4.5% | 6% | Current yield |
| US Treasury | 4.0% | 5% | Current yield |
| Cash/Money Market | 3.5% | 0.5% | Current rates |

### Appendix C: Correlation Matrix (Historical)

```
              US_LG  US_LV  INTL   EM    BOND   CASH
US Large Gr   1.00   0.85   0.75   0.70  -0.10  0.00
US Large Val  0.85   1.00   0.80   0.72  0.05   0.00
Int'l Dev     0.75   0.80   1.00   0.82  0.10   0.00
Emerging      0.70   0.72   0.82   1.00  0.15   0.00
US Bonds     -0.10   0.05   0.10   0.15  1.00   0.20
Cash          0.00   0.00   0.00   0.00  0.20   1.00
```

### Appendix D: Development Timeline Estimate

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| **Phase 0: Setup** | 1 week | Project scaffolding, CI/CD, dev environment |
| **Phase 1: Core Input** | 2 weeks | Portfolio input, holdings management, CSV import |
| **Phase 2: Allocations** | 2 weeks | Allocation builder, trade generation |
| **Phase 3: Scenarios** | 3 weeks | Scenario engine, simulation, charts |
| **Phase 4: Comparison** | 2 weeks | Dashboard, export, polish |
| **Phase 5: Testing** | 2 weeks | E2E tests, bug fixes, performance |
| **Total MVP** | ~12 weeks | Full feature set |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-22 | Financial Advisor Mode | Initial draft |

---

*End of Architecture Document*
