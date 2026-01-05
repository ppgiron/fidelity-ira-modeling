
import { renderHook, waitFor } from '@testing-library/react';
import { usePortfolioData } from './usePortfolioData';
import { retrieveAllEncrypted } from '@/shared/lib/db';
import { vi } from 'vitest';
import { Portfolio } from '@/entities/portfolio/model/types';

// Mock the db module
vi.mock('@/shared/lib/db', () => ({
  retrieveAllEncrypted: vi.fn(),
  db: {
    portfolios: 'mock_portfolios_table',
  },
}));

const mockPortfolio: Portfolio = {
  id: 'p1',
  name: 'Demo Portfolio',
  assets: [],
  totalValue: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('usePortfolioData', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return loading state initially', () => {
    (retrieveAllEncrypted as jest.Mock).mockResolvedValue([]);
    const { result } = renderHook(() => usePortfolioData());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.portfolio).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should return portfolio data on successful fetch', async () => {
    (retrieveAllEncrypted as jest.Mock).mockResolvedValue([mockPortfolio]);
    const { result } = renderHook(() => usePortfolioData());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.portfolio).toEqual(mockPortfolio);
    expect(result.current.error).toBeNull();
  });

  it('should return an error if no portfolio is found', async () => {
    (retrieveAllEncrypted as jest.Mock).mockResolvedValue([]);
    const { result } = renderHook(() => usePortfolioData());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.portfolio).toBeNull();
    expect(result.current.error).toBe('No portfolio found. Please ensure the demo portfolio has been initialized.');
  });

  it('should return an error on fetch failure', async () => {
    const errorMessage = 'Database connection failed';
    (retrieveAllEncrypted as jest.Mock).mockRejectedValue(new Error(errorMessage));
    const { result } = renderHook(() => usePortfolioData());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.portfolio).toBeNull();
    expect(result.current.error).toBe(`Failed to load portfolio data. ${errorMessage}`);
  });
});
