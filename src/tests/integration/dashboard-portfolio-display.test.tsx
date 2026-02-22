import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from '@/app/App';
import { db } from '@/shared/lib/db';
import 'fake-indexeddb/auto'; // This will polyfill IndexedDB

describe('Dashboard Portfolio Display Integration Test', () => {
  beforeEach(async () => {
    // Clear the database before each test
    await db.delete();
    await db.open();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should display the loading indicator and then render the demo portfolio', async () => {
    render(<App />);

    // 1. Check for the loading indicator first
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // 2. Wait for the async operations (DB seeding, fetching, rendering) to complete
    //    and then check for the final rendered data.
    await waitFor(
      () => {
        // The loading indicator should disappear
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();

        // The portfolio data should be visible
        expect(screen.getByText('AAPL')).toBeInTheDocument();
        expect(screen.getByText('VTI')).toBeInTheDocument(); // From demo-portfolio.service.ts
        expect(screen.getByText('BND')).toBeInTheDocument();
      },
      { timeout: 5000 } // Increase timeout for async operations
    );
  });
});
