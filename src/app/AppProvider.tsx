import { ReactNode, useState, useEffect } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  CircularProgress,
  Typography,
  Alert,
} from '@mui/material';
import { PassphraseDialog } from '@/shared/ui/PassphraseDialog';
import { setEncryptionPassphrase, hasEncryptionPassphrase, db } from '@/shared/lib/db';
import { isCryptoSupported } from '@/shared/lib/encryption';
import { useInitDemoPortfolio } from './hooks/useInitDemoPortfolio';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

interface AppProviderProps {
  children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  const [passphraseDialogOpen, setPassphraseDialogOpen] = useState(false);
  const [passphraseMode, setPassphraseMode] = useState<'setup' | 'unlock'>('unlock');
  const [passphraseError, setPassphraseError] = useState<string | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cryptoSupported, setCryptoSupported] = useState(true);
  const [isInitializing, setIsInitializing] = useState(true);

  // Initialize demo portfolio after authentication
  const {
    isLoading: isDemoLoading,
    error: demoError,
    isInitialized: isDemoInitialized,
  } = useInitDemoPortfolio();

  useEffect(() => {
    const initializeApp = async () => {
      // Check crypto support
      if (!isCryptoSupported()) {
        setCryptoSupported(false);
        setIsInitializing(false);
        console.error('Web Crypto API not supported');
        return;
      }

      // Check if database is empty (first run)
      const portfolioCount = await db.portfolios.count();
      if (portfolioCount === 0) {
        setPassphraseMode('setup');
      } else {
        setPassphraseMode('unlock');
      }

      // Show passphrase dialog if not authenticated
      if (!hasEncryptionPassphrase()) {
        setPassphraseDialogOpen(true);
      } else {
        setIsAuthenticated(true);
      }

      setIsInitializing(false);
    };

    initializeApp();
  }, []);

  const handlePassphraseSubmit = async (passphrase: string) => {
    try {
      setEncryptionPassphrase(passphrase);

      if (passphraseMode === 'unlock') {
        // Verify passphrase by attempting to read from database
        try {
          await db.portfolios.toArray();
          setIsAuthenticated(true);
          setPassphraseDialogOpen(false);
          setPassphraseError(undefined);
        } catch {
          setPassphraseError('Incorrect passphrase. Please try again.');
          setIsAuthenticated(false);
        }
      } else {
        // Setup mode - passphrase is valid
        setIsAuthenticated(true);
        setPassphraseDialogOpen(false);
        setPassphraseError(undefined);
      }
    } catch (_error) {
      const errorMessage = _error instanceof Error ? _error.message : 'Failed to set passphrase';
      setPassphraseError(errorMessage);
      setIsAuthenticated(false);
    }
  };

  if (!cryptoSupported) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ p: 4 }}>
          <Alert severity="error">
            <Typography variant="h6" gutterBottom>
              Browser Not Supported
            </Typography>
            <Typography variant="body2">
              Your browser does not support the Web Crypto API required for secure data encryption.
              Please use a modern browser like Chrome, Firefox, Safari, or Edge.
            </Typography>
          </Alert>
        </Box>
      </ThemeProvider>
    );
  }

  if (isInitializing) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            gap: 2,
          }}
        >
          <CircularProgress />
          <Typography variant="body2" color="text.secondary">
            Initializing application...
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  if (isDemoLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            gap: 2,
          }}
        >
          <CircularProgress />
          <Typography variant="body2" color="text.secondary">
            Preparing your demo portfolio...
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  if (demoError) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ p: 4 }}>
          <Alert severity="error">
            <Typography variant="h6" gutterBottom>
              Initialization Error
            </Typography>
            <Typography variant="body2">{demoError}</Typography>
          </Alert>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PassphraseDialog
        open={passphraseDialogOpen}
        mode={passphraseMode}
        onSubmit={handlePassphraseSubmit}
        error={passphraseError}
      />
      {isAuthenticated && isDemoInitialized ? children : null}
    </ThemeProvider>
  );
}

export default AppProvider;
