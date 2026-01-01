import { z } from 'zod';

// Asset Zod Schema
export const assetSchema = z.object({
  id: z.string().uuid(),
  portfolioId: z.string().uuid(),
  ticker: z.string().min(1).max(10),
  name: z.string().min(1),
  quantity: z.number().positive(),
  currentPrice: z.number().nonnegative(),
  assetClass: z.enum(['stock', 'bond', 'etf', 'mutual-fund', 'cash', 'other']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Portfolio Zod Schema
export const portfolioSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  assets: z.array(assetSchema),
  totalValue: z.number().nonnegative(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// TypeScript Interfaces derived from Zod schemas
export type Asset = z.infer<typeof assetSchema>;
export type Portfolio = z.infer<typeof portfolioSchema>;

// Helper type for creating new assets (without generated fields)
export type NewAsset = Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>;

// Helper type for creating new portfolios (without generated fields)
export type NewPortfolio = Omit<Portfolio, 'id' | 'createdAt' | 'updatedAt' | 'totalValue'>;
