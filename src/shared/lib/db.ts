/**
 * Dexie.js database configuration with encryption
 * Implements versioned schema for IndexedDB persistence
 */

import Dexie, { Table } from 'dexie';
import { Portfolio, Asset } from '@/entities/portfolio/model/types';
import { encrypt, decrypt, EncryptedData } from './encryption';

/**
 * Database schema version 1
 */
export class AppDatabase extends Dexie {
  portfolios!: Table<Portfolio, string>;
  assets!: Table<Asset, string>;

  constructor() {
    super('FidelityIRAModeling');

    // Version 1 schema
    this.version(1).stores({
      portfolios: '++id',
      assets: '++id, portfolioId',
    });
  }
}

// Global database instance
export const db = new AppDatabase();

/**
 * Encryption key management
 * Key is stored in memory only and never persisted
 */
let encryptionPassphrase: string | null = null;

/**
 * Set encryption passphrase (in-memory only)
 */
export function setEncryptionPassphrase(passphrase: string): void {
  encryptionPassphrase = passphrase;
}

/**
 * Get encryption passphrase
 */
export function getEncryptionPassphrase(): string | null {
  return encryptionPassphrase;
}

/**
 * Clear encryption passphrase from memory
 */
export function clearEncryptionPassphrase(): void {
  encryptionPassphrase = null;
}

/**
 * Check if encryption passphrase is set
 */
export function hasEncryptionPassphrase(): boolean {
  return encryptionPassphrase !== null;
}

/**
 * Store encrypted data
 * Encrypts the data before storing in IndexedDB
 */
export async function storeEncrypted<T>(
  table: Table<T, string>,
  data: T
): Promise<string> {
  if (!encryptionPassphrase) {
    throw new Error('Encryption passphrase not set. Please authenticate first.');
  }

  const jsonData = JSON.stringify(data);
  const encryptedData = await encrypt(jsonData, encryptionPassphrase);

  // Store encrypted data as a special wrapper object
  const wrappedData = {
    ...data,
    _encrypted: true,
    _encryptedData: encryptedData,
  } as T;

  const id = await table.add(wrappedData);
  return id;
}

/**
 * Retrieve and decrypt data
 * Decrypts data after retrieving from IndexedDB
 */
export async function retrieveEncrypted<T>(
  table: Table<T, string>,
  id: string
): Promise<T | undefined> {
  if (!encryptionPassphrase) {
    throw new Error('Encryption passphrase not set. Please authenticate first.');
  }

  const wrappedData = await table.get(id);
  if (!wrappedData) {
    return undefined;
  }

  // Check if data is encrypted
  const data = wrappedData as T & { _encrypted?: boolean; _encryptedData?: EncryptedData };
  if (data._encrypted && data._encryptedData) {
    const decryptedJson = await decrypt(data._encryptedData, encryptionPassphrase);
    return JSON.parse(decryptedJson) as T;
  }

  // Return unencrypted data (for backward compatibility)
  return wrappedData;
}

/**
 * Retrieve all encrypted data
 */
export async function retrieveAllEncrypted<T>(
  table: Table<T, string>
): Promise<T[]> {
  if (!encryptionPassphrase) {
    throw new Error('Encryption passphrase not set. Please authenticate first.');
  }

  const allData = await table.toArray();
  const decrypted: T[] = [];

  for (const item of allData) {
    const data = item as T & { _encrypted?: boolean; _encryptedData?: EncryptedData };
    if (data._encrypted && data._encryptedData) {
      const decryptedJson = await decrypt(data._encryptedData, encryptionPassphrase);
      decrypted.push(JSON.parse(decryptedJson) as T);
    } else {
      decrypted.push(item);
    }
  }

  return decrypted;
}
