import { useState, useEffect } from 'react';
import { Portfolio } from '@/entities/portfolio/model/types';
import { db, retrieveAllEncrypted } from '@/shared/lib/db';

export const usePortfolioData = () => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const portfolios = await retrieveAllEncrypted(db.portfolios);
        const firstPortfolio = portfolios.find((p) => !!p);

        if (firstPortfolio) {
          setPortfolio(firstPortfolio);
        } else {
          setError('No portfolio found. Please ensure the demo portfolio has been initialized.');
        }
      } catch (e) {
        console.error('Failed to fetch portfolio:', e);
        const errorMessage = e instanceof Error ? e.message : String(e);
        setError(`Failed to load portfolio data. ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  return { portfolio, isLoading, error };
};
