import React from 'react';
import { usePortfolioData } from '@/entities/portfolio/hooks/usePortfolioData';
import { PortfolioTable } from '@/entities/portfolio/components/PortfolioTable';
import { Typography, Box, Alert } from '@mui/material';

export const PortfolioOverview: React.FC = () => {
  const { portfolio, isLoading, error } = usePortfolioData();

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">
          <Typography>Error loading portfolio:</Typography>
          <Typography variant="body2">{error}</Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {portfolio?.name || 'Portfolio Overview'}
      </Typography>
      <PortfolioTable assets={portfolio?.assets ?? []} isLoading={isLoading} />
    </Box>
  );
};
