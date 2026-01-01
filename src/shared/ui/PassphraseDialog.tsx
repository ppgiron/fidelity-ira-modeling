/**
 * Passphrase/PIN Dialog for encryption key collection
 * Displayed on app startup to collect user's passphrase
 */

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  Typography,
  Box,
} from '@mui/material';
import { validatePassphrase } from '@/shared/lib/encryption';

interface PassphraseDialogProps {
  open: boolean;
  mode: 'setup' | 'unlock';
  onSubmit: (passphrase: string) => void;
  error?: string;
}

export function PassphraseDialog({ open, mode, onSubmit, error }: PassphraseDialogProps) {
  const [passphrase, setPassphrase] = useState('');
  const [confirmPassphrase, setConfirmPassphrase] = useState('');
  const [validationError, setValidationError] = useState<string | undefined>();

  const handleSubmit = () => {
    // Validate passphrase
    const validation = validatePassphrase(passphrase);
    if (!validation.valid) {
      setValidationError(validation.error);
      return;
    }

    // For setup mode, check confirmation matches
    if (mode === 'setup' && passphrase !== confirmPassphrase) {
      setValidationError('Passphrases do not match');
      return;
    }

    setValidationError(undefined);
    onSubmit(passphrase);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Dialog
      open={open}
      disableEscapeKeyDown
      maxWidth="sm"
      fullWidth
      aria-labelledby="passphrase-dialog-title"
    >
      <DialogTitle id="passphrase-dialog-title">
        {mode === 'setup' ? 'Set Up Encryption' : 'Unlock Your Data'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          {mode === 'setup' ? (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Create a passphrase to encrypt your portfolio data. This passphrase will be
              required each time you access the application.
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Enter your passphrase to decrypt and access your portfolio data.
            </Typography>
          )}

          {(error || validationError) && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error || validationError}
            </Alert>
          )}

          <TextField
            autoFocus
            fullWidth
            type="password"
            label={mode === 'setup' ? 'Create Passphrase' : 'Passphrase'}
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            onKeyPress={handleKeyPress}
            helperText="Minimum 8 characters"
            sx={{ mb: 2 }}
          />

          {mode === 'setup' && (
            <TextField
              fullWidth
              type="password"
              label="Confirm Passphrase"
              value={confirmPassphrase}
              onChange={(e) => setConfirmPassphrase(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" disabled={!passphrase}>
          {mode === 'setup' ? 'Create' : 'Unlock'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
