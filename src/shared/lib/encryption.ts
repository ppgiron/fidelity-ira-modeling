/**
 * Web Crypto API wrapper for encryption/decryption operations
 * Implements OWASP-compliant PBKDF2 key derivation and AES-GCM encryption
 */

// Constants following OWASP recommendations (2025)
const PBKDF2_ITERATIONS = 600000; // OWASP minimum for 2025
const KEY_LENGTH = 256; // 256-bit key
const SALT_LENGTH = 16; // 128-bit salt
const IV_LENGTH = 12; // 96-bit IV for AES-GCM
const VERIFICATION_STRING = 'VALID_PASSPHRASE_V1'; // Magic string to verify decryption

export interface EncryptedData {
  ciphertext: string; // Base64 encoded
  iv: string; // Base64 encoded
  salt: string; // Base64 encoded
  verification: string; // Encrypted verification string
}

/**
 * Check if Web Crypto API is supported
 */
export function isCryptoSupported(): boolean {
  return typeof window !== 'undefined' &&
         window.crypto !== undefined &&
         window.crypto.subtle !== undefined;
}

/**
 * Validate passphrase meets minimum requirements
 */
export function validatePassphrase(passphrase: string): { valid: boolean; error?: string } {
  if (passphrase.length < 8) {
    return { valid: false, error: 'Passphrase must be at least 8 characters' };
  }
  return { valid: true };
}

/**
 * Generate cryptographically random salt
 */
function generateSalt(): Uint8Array<ArrayBuffer> {
  return window.crypto.getRandomValues(new Uint8Array(SALT_LENGTH)) as Uint8Array<ArrayBuffer>;
}

/**
 * Generate cryptographically random IV
 */
function generateIV(): Uint8Array<ArrayBuffer> {
  return window.crypto.getRandomValues(new Uint8Array(IV_LENGTH)) as Uint8Array<ArrayBuffer>;
}

/**
 * Derive encryption key from passphrase using PBKDF2
 * NOTE: This is a synchronous fallback. For production, use deriveKeyInWorker()
 */
async function deriveKey(passphrase: string, salt: Uint8Array<ArrayBuffer>): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const passphraseKey = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    passphraseKey,
    { name: 'AES-GCM', length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Derive key using Web Worker (prevents UI blocking)
 * Returns a promise that resolves to the derived key
 */
export async function deriveKeyInWorker(
  passphrase: string,
  salt: Uint8Array<ArrayBuffer>
): Promise<CryptoKey> {
  // Try to use Web Worker if available
  if (typeof Worker !== 'undefined') {
    try {
      return await deriveKeyWithWorker(passphrase, salt);
    } catch (error) {
      console.warn('Web Worker failed, falling back to main thread:', error);
      return deriveKey(passphrase, salt);
    }
  } else {
    // Fallback to main thread if Workers not supported
    console.warn('Web Workers not supported, using main thread for key derivation');
    return deriveKey(passphrase, salt);
  }
}

/**
 * Derive key using Web Worker
 */
async function deriveKeyWithWorker(
  passphrase: string,
  salt: Uint8Array<ArrayBuffer>
): Promise<CryptoKey> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      new URL('./crypto.worker.ts', import.meta.url),
      { type: 'module' }
    );

    worker.onmessage = async (event: MessageEvent) => {
      const { type, keyData, error } = event.data;

      if (type === 'deriveKey') {
        if (error) {
          worker.terminate();
          reject(new Error(error));
          return;
        }

        try {
          // Import the key data back into a CryptoKey
          const key = await window.crypto.subtle.importKey(
            'raw',
            keyData,
            { name: 'AES-GCM', length: KEY_LENGTH },
            false,
            ['encrypt', 'decrypt']
          );
          worker.terminate();
          resolve(key);
        } catch (err) {
          worker.terminate();
          reject(err);
        }
      }
    };

    worker.onerror = (error) => {
      worker.terminate();
      reject(new Error(`Worker error: ${error.message}`));
    };

    // Send derivation request to worker
    worker.postMessage({
      type: 'deriveKey',
      passphrase,
      salt,
    });
  });
}

/**
 * Encrypt data using AES-GCM
 */
export async function encrypt(data: string, passphrase: string): Promise<EncryptedData> {
  if (!isCryptoSupported()) {
    throw new Error('Web Crypto API is not supported in this browser');
  }

  const validation = validatePassphrase(passphrase);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const encoder = new TextEncoder();
  const salt = generateSalt();
  const iv = generateIV();

  // Derive key from passphrase
  const key = await deriveKeyInWorker(passphrase, salt);

  // Encrypt the actual data
  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    encoder.encode(data)
  );

  // Encrypt verification string to detect wrong passphrase vs corruption
  const encryptedVerification = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    encoder.encode(VERIFICATION_STRING)
  );

  // Convert to base64 for storage
  return {
    ciphertext: arrayBufferToBase64(encryptedData),
    iv: arrayBufferToBase64(iv),
    salt: arrayBufferToBase64(salt),
    verification: arrayBufferToBase64(encryptedVerification),
  };
}

/**
 * Decrypt data using AES-GCM
 */
export async function decrypt(
  encryptedData: EncryptedData,
  passphrase: string
): Promise<string> {
  if (!isCryptoSupported()) {
    throw new Error('Web Crypto API is not supported in this browser');
  }

  const validation = validatePassphrase(passphrase);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const decoder = new TextDecoder();
  const salt = base64ToArrayBuffer(encryptedData.salt);
  const iv = base64ToArrayBuffer(encryptedData.iv);

  // Derive key from passphrase
  const key = await deriveKeyInWorker(passphrase, salt);

  // First, verify the passphrase by decrypting the verification string
  try {
    const decryptedVerification = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      base64ToArrayBuffer(encryptedData.verification)
    );

    const verificationString = decoder.decode(decryptedVerification);
    if (verificationString !== VERIFICATION_STRING) {
      // Decryption succeeded but verification string doesn't match - data corruption
      throw new Error('Data corruption detected. Unable to decrypt data.');
    }
  } catch (error) {
    // If crypto.subtle.decrypt fails, it's because the key is wrong (wrong passphrase)
    // DOMException is thrown when AES-GCM authentication tag verification fails
    if (error instanceof Error && error.message.includes('Data corruption')) {
      throw error; // Re-throw data corruption error
    }
    // Any other decryption failure is wrong passphrase
    throw new Error('Incorrect passphrase. Please try again.');
  }

  // Decrypt the actual data
  try {
    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      base64ToArrayBuffer(encryptedData.ciphertext)
    );

    return decoder.decode(decryptedData);
  } catch {
    throw new Error('Failed to decrypt data. Data may be corrupted.');
  }
}

/**
 * Convert ArrayBuffer to Base64 string
 */
function arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Convert Base64 string to ArrayBuffer
 */
function base64ToArrayBuffer(base64: string): Uint8Array<ArrayBuffer> {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes as Uint8Array<ArrayBuffer>;
}
