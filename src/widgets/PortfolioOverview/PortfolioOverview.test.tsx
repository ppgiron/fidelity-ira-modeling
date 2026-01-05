import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { PortfolioOverview } from './PortfolioOverview';
import { usePortfolioData } from '@/entities/portfolio/hooks/usePortfolioData';
import { Portfolio } from '@/entities/portfolio/model/types';

// Mock the usePortfolioData hook
vi.mock('@/entities/portfolio/hooks/usePortfolioData');

const mockPortfolio: Portfolio = {
  id: '1',
  name: 'Demo Portfolio',
  assets: [
    { id: '1', ticker: 'AAPL', quantity: 10, price: 150, value: 1500 },
    { id: '2', ticker: 'GOOGL', quantity: 5, price: 2800, value: 14000 },
  ],
};

describe('PortfolioOverview Widget', () => {
  it('should display a loading indicator when data is loading', () => {
    // Arrange
    (usePortfolioData as vi.Mock).mockReturnValue({
      portfolio: null,
      isLoading: true,
      error: undefined,
    });

    // Act
    render(<PortfolioOverview />);

    // Assert
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should display an error message when there is an error', () => {
    // Arrange
    const errorMessage = 'Failed to load portfolio';
    (usePortfolioData as vi.Mock).mockReturnValue({
      portfolio: null,
      isLoading: false,
      error: errorMessage,
    });

    // Act
    render(<PortfolioOverview />);

    // Assert
    expect(screen.getByText('Error loading portfolio:')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should display the portfolio table when data is loaded successfully', () => {
    // Arrange
    (usePortfolioData as vi.Mock).mockReturnValue({
      portfolio: mockPortfolio,
      isLoading: false,
      error: undefined,
    });

    // Act
    render(<PortfolioOverview />);

    // Assert
    expect(screen.getByText('Demo Portfolio')).toBeInTheDocument();
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('GOOGL')).toBeInTheDocument();
  });
});
