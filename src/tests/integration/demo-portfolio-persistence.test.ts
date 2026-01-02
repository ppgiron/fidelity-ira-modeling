/**
 * Integration tests for Demo Portfolio Persistence
 * Tests the full flow of creating, encrypting, storing, and retrieving the demo portfolio
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { db, setEncryptionPassphrase, clearEncryptionPassphrase, storeEncrypted, retrieveEncrypted } from '@/shared/lib/db';
import { getDemoPortfolio } from '@/entities/portfolio/model/services/demo-portfolio.service';
import { portfolioSchema } from '@/entities/portfolio/model/types';

interface RawEncryptedObject {
  _encrypted: boolean;
  _encryptedData: {
    ciphertext: string;
    iv: string;
    salt: string;
    verification: string;
  };
}

describe('Demo Portfolio Persistence Integration', () => {
  const testPassphrase = 'test-passphrase-12345';

  beforeEach(async () => {
    // Clear database before each test
    await db.delete();
    await db.open();
    setEncryptionPassphrase(testPassphrase);
  });

  afterEach(async () => {
    clearEncryptionPassphrase();
    await db.delete();
  });

  it('should create database schema on first load', async () => {
    // Verify schema exists
    expect(db.portfolios).toBeDefined();
    expect(db.assets).toBeDefined();

    // Verify version
    expect(db.verno).toBe(1);
  });

  it('should store and retrieve demo portfolio with encryption', async () => {
    const demoPortfolio = getDemoPortfolio();

    // Validate against schema
    const validated = portfolioSchema.parse(demoPortfolio);

    // Store encrypted
    const id = await storeEncrypted(db.portfolios, validated);
    expect(id).toBeDefined();

    // Retrieve and decrypt
    const retrieved = await retrieveEncrypted(db.portfolios, id);
    expect(retrieved).toBeDefined();
    expect(retrieved?.id).toBe(demoPortfolio.id);
    expect(retrieved?.name).toBe(demoPortfolio.name);
    expect(retrieved?.assets.length).toBe(demoPortfolio.assets.length);
  });

  it('should store encrypted data as unreadable ciphertext in IndexedDB', async () => {
    const demoPortfolio = getDemoPortfolio();
    const id = await storeEncrypted(db.portfolios, demoPortfolio);

    // Access raw data directly from database (bypassing decryption)
    const rawData = await db.portfolios.get(id);
    expect(rawData).toBeDefined();

    // Verify the raw data contains encrypted fields
    const rawEncrypted = rawData as RawEncryptedObject;
    expect(rawEncrypted._encrypted).toBe(true);
    expect(rawEncrypted._encryptedData).toBeDefined();
    expect(rawEncrypted._encryptedData.ciphertext).toBeDefined();
    expect(rawEncrypted._encryptedData.iv).toBeDefined();
    expect(rawEncrypted._encryptedData.salt).toBeDefined();
    expect(rawEncrypted._encryptedData.verification).toBeDefined();

    // Verify ciphertext is not plain text
    expect(rawEncrypted._encryptedData.ciphertext).not.toContain('Demo Portfolio');
    expect(rawEncrypted._encryptedData.ciphertext).not.toContain('VTI');
  });

  it('should fail to decrypt with wrong passphrase', async () => {
    const demoPortfolio = getDemoPortfolio();
    const id = await storeEncrypted(db.portfolios, demoPortfolio);

    // Change passphrase
    setEncryptionPassphrase('wrong-passphrase-123');

    // Attempt to retrieve should fail
    await expect(retrieveEncrypted(db.portfolios, id)).rejects.toThrow();
  });

  it('should handle first load detection correctly', async () => {
    // Initial count should be 0
    const initialCount = await db.portfolios.count();
    expect(initialCount).toBe(0);

    // Add demo portfolio
    const demoPortfolio = getDemoPortfolio();
    await storeEncrypted(db.portfolios, demoPortfolio);

    // Count should now be 1
    const afterCount = await db.portfolios.count();
    expect(afterCount).toBe(1);
  });

  it('should validate demo portfolio against Zod schema before storage', () => {
    const demoPortfolio = getDemoPortfolio();

    // Should not throw
    expect(() => portfolioSchema.parse(demoPortfolio)).not.toThrow();

    // Verify all assets are valid
    demoPortfolio.assets.forEach((asset) => {
      expect(asset.id).toBeDefined();
      expect(asset.ticker).toBeDefined();
      expect(asset.quantity).toBeGreaterThan(0);
      expect(asset.currentPrice).toBeGreaterThanOrEqual(0);
    });
  });

  it('should support schema versioning for future migrations', () => {
    // Verify schema is versioned (v1)
    expect(db.verno).toBe(1);

    // Verify stores are properly defined
    const schema = db.tables.map((table) => ({
      name: table.name,
      schema: table.schema.primKey.name,
    }));

    expect(schema).toContainEqual({ name: 'portfolios', schema: 'id' });
    expect(schema).toContainEqual({ name: 'assets', schema: 'id' });
  });
});
