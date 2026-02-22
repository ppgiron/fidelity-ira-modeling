/**
 * Unit tests for Demo Portfolio Service
 */

import { describe, it, expect } from 'vitest';
import { getDemoPortfolio } from './demo-portfolio.service';
import { portfolioSchema, assetSchema } from '../types';

describe('getDemoPortfolio', () => {
  it('should return a valid Portfolio object', () => {
    const portfolio = getDemoPortfolio();

    expect(portfolio).toBeDefined();
    expect(portfolio.id).toBeDefined();
    expect(portfolio.name).toBe('Demo Portfolio');
    expect(portfolio.assets).toBeInstanceOf(Array);
  });

  it('should return at least 10 assets', () => {
    const portfolio = getDemoPortfolio();

    expect(portfolio.assets.length).toBeGreaterThanOrEqual(10);
  });

  it('should have diverse asset classes', () => {
    const portfolio = getDemoPortfolio();
    const assetClasses = new Set(portfolio.assets.map((a) => a.assetClass));

    // Should have both stocks and ETFs at minimum
    expect(assetClasses.has('stock')).toBe(true);
    expect(assetClasses.has('etf')).toBe(true);
  });

  it('should include realistic tickers', () => {
    const portfolio = getDemoPortfolio();
    const tickers = portfolio.assets.map((a) => a.ticker);

    // Verify some expected tickers from requirements
    expect(tickers).toContain('VTI');
    expect(tickers).toContain('BND');
    expect(tickers).toContain('VOO');
    expect(tickers).toContain('AAPL');
    expect(tickers).toContain('MSFT');
  });

  it('should validate against Portfolio Zod schema', () => {
    const portfolio = getDemoPortfolio();

    // Should not throw validation error
    expect(() => portfolioSchema.parse(portfolio)).not.toThrow();
  });

  it('should have all assets validate against Asset Zod schema', () => {
    const portfolio = getDemoPortfolio();

    portfolio.assets.forEach((asset) => {
      expect(() => assetSchema.parse(asset)).not.toThrow();
    });
  });

  it('should calculate total value correctly', () => {
    const portfolio = getDemoPortfolio();

    const calculatedTotal = portfolio.assets.reduce(
      (sum, asset) => sum + asset.quantity * asset.currentPrice,
      0
    );

    expect(portfolio.totalValue).toBe(calculatedTotal);
  });

  it('should have positive quantities and prices', () => {
    const portfolio = getDemoPortfolio();

    portfolio.assets.forEach((asset) => {
      expect(asset.quantity).toBeGreaterThan(0);
      expect(asset.currentPrice).toBeGreaterThanOrEqual(0);
    });
  });

  it('should have valid UUIDs for IDs', () => {
    const portfolio = getDemoPortfolio();
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    expect(portfolio.id).toMatch(uuidRegex);

    portfolio.assets.forEach((asset) => {
      expect(asset.id).toMatch(uuidRegex);
      expect(asset.portfolioId).toBe(portfolio.id);
    });
  });

  it('should have timestamps set', () => {
    const portfolio = getDemoPortfolio();

    expect(portfolio.createdAt).toBeInstanceOf(Date);
    expect(portfolio.updatedAt).toBeInstanceOf(Date);

    portfolio.assets.forEach((asset) => {
      expect(asset.createdAt).toBeInstanceOf(Date);
      expect(asset.updatedAt).toBeInstanceOf(Date);
    });
  });
});
