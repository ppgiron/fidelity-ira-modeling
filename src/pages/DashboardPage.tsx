import React from 'react';
import { PortfolioOverview } from '@/widgets/PortfolioOverview/PortfolioOverview';
import { Box } from '@mui/material';

const DashboardPage: React.FC = () => {
  return (
    <Box>
      <PortfolioOverview />
    </Box>
  );
};

export default DashboardPage;
