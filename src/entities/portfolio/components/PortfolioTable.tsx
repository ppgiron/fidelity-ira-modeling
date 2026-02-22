import { formatCurrency } from '@/shared/lib/formatters';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';
import { Asset } from '@/entities/portfolio/model/types';

interface PortfolioTableProps {
  assets: Asset[];
  isLoading: boolean;
}

export const PortfolioTable: React.FC<PortfolioTableProps> = ({ assets, isLoading }) => {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (assets.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>No assets found in this portfolio.</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="portfolio assets table">
        <TableHead>
          <TableRow>
            <TableCell>Asset Ticker</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Current Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell component="th" scope="row">
                {asset.ticker}
              </TableCell>
              <TableCell align="right">{asset.quantity.toLocaleString()}</TableCell>
              <TableCell align="right">
                {formatCurrency(asset.quantity * asset.currentPrice)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
