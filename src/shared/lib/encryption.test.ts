/**
 * Unit tests for Encryption utilities
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { encrypt, decrypt, validatePassphrase, isCryptoSupported } from './encryption';

describe('Encryption Utilities', () => {
  beforeAll(() => {
    // Ensure crypto is available in test environment
    if (!isCryptoSupported()) {
      throw new Error('Crypto API not available in test environment');
    }
  });

  describe('validatePassphrase', () => {
    it('should reject passphrases shorter than 8 characters', () => {
      const result = validatePassphrase('short');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('8 characters');
    });

    it('should accept passphrases of 8+ characters', () => {
      const result = validatePassphrase('validpass123');
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should accept exactly 8 characters', () => {
      const result = validatePassphrase('exactly8');
      expect(result.valid).toBe(true);
    });
  });

  describe('isCryptoSupported', () => {
    it('should return true when crypto.subtle is available', () => {
      expect(isCryptoSupported()).toBe(true);
    });
  });

  describe('encrypt and decrypt', () => {
    const testData = 'Test portfolio data';
    const testPassphrase = 'testpassphrase123';

    it('should encrypt data successfully', async () => {
      const encrypted = await encrypt(testData, testPassphrase);

      expect(encrypted).toBeDefined();
      expect(encrypted.ciphertext).toBeDefined();
      expect(encrypted.iv).toBeDefined();
      expect(encrypted.salt).toBeDefined();
      expect(encrypted.verification).toBeDefined();
    });

    it('should produce different ciphertext for same data (due to random IV/salt)', async () => {
      const encrypted1 = await encrypt(testData, testPassphrase);
      const encrypted2 = await encrypt(testData, testPassphrase);

      expect(encrypted1.ciphertext).not.toBe(encrypted2.ciphertext);
      expect(encrypted1.iv).not.toBe(encrypted2.iv);
      expect(encrypted1.salt).not.toBe(encrypted2.salt);
    });

    it('should decrypt data successfully with correct passphrase', async () => {
      const encrypted = await encrypt(testData, testPassphrase);
      const decrypted = await decrypt(encrypted, testPassphrase);

      expect(decrypted).toBe(testData);
    });

    it('should throw error when decrypting with wrong passphrase', async () => {
      const encrypted = await encrypt(testData, testPassphrase);

      await expect(decrypt(encrypted, 'wrongpassphrase123')).rejects.toThrow();
    });

    it('should distinguish wrong passphrase from data corruption', async () => {
      const encrypted = await encrypt(testData, testPassphrase);

      try {
        await decrypt(encrypted, 'wrongpassphrase123');
        expect.fail('Should have thrown error');
      } catch (error) {
        expect(error instanceof Error).toBe(true);
        expect((error as Error).message).toContain('passphrase');
      }
    });

    it('should reject encryption with invalid passphrase', async () => {
      await expect(encrypt(testData, 'short')).rejects.toThrow();
    });

    it('should reject decryption with invalid passphrase', async () => {
      const encrypted = await encrypt(testData, testPassphrase);

      await expect(decrypt(encrypted, 'short')).rejects.toThrow();
    });
  });
});
