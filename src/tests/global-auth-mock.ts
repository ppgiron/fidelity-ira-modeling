import { vi } from 'vitest';

// Global mock for database encryption to prevent "Encryption passphrase not set" errors in integration tests
vi.mock('@/shared/lib/db', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/shared/lib/db')>();

  // Set the passphrase in the real module so internal checks pass
  original.setEncryptionPassphrase('test-password');

  return {
    ...original,
    // Ensure these always return valid values even if state is reset elsewhere (though setEncryptionPassphrase should handle it)
    hasEncryptionPassphrase: () => true,
    getEncryptionPassphrase: () => 'test-password',
  };
});
