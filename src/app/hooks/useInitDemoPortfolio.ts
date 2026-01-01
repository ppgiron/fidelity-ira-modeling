/**
 * Hook to initialize demo portfolio on first load
 * Handles seeding the database with demo data when empty
 */

import { useEffect, useState } from 'react';
import { db, storeEncrypted, hasEncryptionPassphrase } from '@/shared/lib/db';
import { getDemoPortfolio } from '@/entities/portfolio/model/services/demo-portfolio.service';
import { portfolioSchema } from '@/entities/portfolio/model/types';

interface UseInitDemoPortfolioResult {
  isLoading: boolean;
  error: string | undefined;
  isInitialized: boolean;
}

export function useInitDemoPortfolio(): UseInitDemoPortfolioResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeDemoPortfolio = async () => {
      // Only initialize if passphrase is set
      if (!hasEncryptionPassphrase()) {
        return;
      }

      try {
        setIsLoading(true);
        setError(undefined);

        // Check if database is empty (first load detection)
        const portfolioCount = await db.portfolios.count();

        if (portfolioCount === 0) {
          // Database is empty - seed with demo portfolio
          console.log('First load detected. Seeding demo portfolio...');

          const demoPortfolio = getDemoPortfolio();

          // Validate against Zod schema
          const validatedPortfolio = portfolioSchema.parse(demoPortfolio);

          // Store encrypted portfolio
          await storeEncrypted(db.portfolios, validatedPortfolio);

          console.log('Demo portfolio successfully seeded');
        } else {
          console.log('Portfolio data already exists. Skipping seeding.');
        }

        setIsInitialized(true);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to initialize demo portfolio';
        console.error('Demo portfolio initialization error:', err);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    initializeDemoPortfolio();
  }, []);

  return {
    isLoading,
    error,
    isInitialized,
  };
}
