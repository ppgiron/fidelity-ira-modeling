import { render, screen } from '@testing-library/react';
import { PortfolioTable } from './PortfolioTable';
import { Asset } from '@/entities/portfolio/model/types';
import '@testing-library/jest-dom';

const mockAssets: Asset[] = [
  {
    id: '1',
    portfolioId: 'p1',
    ticker: 'AAPL',
    name: 'Apple Inc.',
    quantity: 10,
    currentPrice: 150,
    assetClass: 'stock',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    portfolioId: 'p1',
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    quantity: 5,
    currentPrice: 2800,
    assetClass: 'stock',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('PortfolioTable', () => {
  it('should render a loading spinner when isLoading is true', () => {
    render(<PortfolioTable assets={[]} isLoading={true} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render "No assets found" message when assets array is empty', () => {
    render(<PortfolioTable assets={[]} isLoading={false} />);
    expect(screen.getByText('No assets found in this portfolio.')).toBeInTheDocument();
  });

  it('should render the table with asset data', () => {
    render(<PortfolioTable assets={mockAssets} isLoading={false} />);

    // Check for table headers
    expect(screen.getByText('Asset Ticker')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Current Value')).toBeInTheDocument();

    // Check for first asset
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('$1,500.00')).toBeInTheDocument();

    // Check for second asset
    expect(screen.getByText('GOOGL')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('$14,000.00')).toBeInTheDocument();
  });
});
