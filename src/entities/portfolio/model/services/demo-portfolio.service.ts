/**
 * Demo Portfolio Service
 * Provides a hardcoded demo portfolio with realistic data
 */

import { Portfolio, Asset } from '../types';

/**
 * Generate a demo portfolio with 10 diverse assets
 * Includes stocks, bonds, and ETFs with realistic tickers and prices
 */
export function getDemoPortfolio(): Portfolio {
  const portfolioId = crypto.randomUUID();
  const now = new Date();

  // Create 10+ demo assets with diverse asset classes
  const assets: Asset[] = [
    // Stock ETF - Total US Market
    {
      id: crypto.randomUUID(),
      portfolioId,
      ticker: 'VTI',
      name: 'Vanguard Total Stock Market ETF',
      quantity: 50,
      currentPrice: 250.75,
      assetClass: 'etf',
      createdAt: now,
      updatedAt: now,
    },
    // Bond ETF - Total Bond Market
    {
      id: crypto.randomUUID(),
      portfolioId,
      ticker: 'BND',
      name: 'Vanguard Total Bond Market ETF',
      quantity: 100,
      currentPrice: 75.50,
      assetClass: 'etf',
      createdAt: now,
      updatedAt: now,
    },
    // Stock ETF - S&P 500
    {
      id: crypto.randomUUID(),
      portfolioId,
      ticker: 'VOO',
      name: 'Vanguard S&P 500 ETF',
      quantity: 25,
      currentPrice: 450.25,
      assetClass: 'etf',
      createdAt: now,
      updatedAt: now,
    },
    // Individual Stock - Apple
    {
      id: crypto.randomUUID(),
      portfolioId,
      ticker: 'AAPL',
      name: 'Apple Inc.',
      quantity: 30,
      currentPrice: 195.80,
      assetClass: 'stock',
      createdAt: now,
      updatedAt: now,
    },
    // Individual Stock - Microsoft
    {
      id: crypto.randomUUID(),
      portfolioId,
      ticker: 'MSFT',
      name: 'Microsoft Corporation',
      quantity: 20,
      currentPrice: 380.45,
      assetClass: 'stock',
      createdAt: now,
      updatedAt: now,
    },
    // Bond ETF - Aggregate Bonds
    {
      id: crypto.randomUUID(),
      portfolioId,
      ticker: 'AGG',
      name: 'iShares Core US Aggregate Bond ETF',
      quantity: 75,
      currentPrice: 101.30,
      assetClass: 'etf',
      createdAt: now,
      updatedAt: now,
    },
    // Gold ETF
    {
      id: crypto.randomUUID(),
      portfolioId,
      ticker: 'GLD',
      name: 'SPDR Gold Shares',
      quantity: 15,
      currentPrice: 195.20,
      assetClass: 'etf',
      createdAt: now,
      updatedAt: now,
    },
    // Stock ETF - NASDAQ 100
    {
      id: crypto.randomUUID(),
      portfolioId,
      ticker: 'QQQ',
      name: 'Invesco QQQ Trust',
      quantity: 35,
      currentPrice: 420.15,
      assetClass: 'etf',
      createdAt: now,
      updatedAt: now,
    },
    // Dividend ETF
    {
      id: crypto.randomUUID(),
      portfolioId,
      ticker: 'SCHD',
      name: 'Schwab US Dividend Equity ETF',
      quantity: 60,
      currentPrice: 82.40,
      assetClass: 'etf',
      createdAt: now,
      updatedAt: now,
    },
    // International Stock ETF
    {
      id: crypto.randomUUID(),
      portfolioId,
      ticker: 'VXUS',
      name: 'Vanguard Total International Stock ETF',
      quantity: 45,
      currentPrice: 68.90,
      assetClass: 'etf',
      createdAt: now,
      updatedAt: now,
    },
  ];

  // Calculate total portfolio value
  const totalValue = assets.reduce((sum, asset) => {
    return sum + asset.quantity * asset.currentPrice;
  }, 0);

  const portfolio: Portfolio = {
    id: portfolioId,
    name: 'Demo Portfolio',
    description: 'A diversified demonstration portfolio with stocks, bonds, and ETFs',
    assets,
    totalValue,
    createdAt: now,
    updatedAt: now,
  };

  return portfolio;
}
