/**
 * Web Worker for CPU-intensive cryptographic operations
 * Prevents UI blocking during PBKDF2 key derivation
 */

const PBKDF2_ITERATIONS = 600000;
const KEY_LENGTH = 256;

interface DeriveKeyMessage {
  type: 'deriveKey';
  passphrase: string;
  salt: Uint8Array;
}

/**
 * Handle messages from main thread
 */
self.onmessage = async (event: MessageEvent<DeriveKeyMessage>) => {
  const { type, passphrase, salt } = event.data;

  if (type === 'deriveKey') {
    try {
      const encoder = new TextEncoder();

      // Import passphrase as key material
      const passphraseKey = await crypto.subtle.importKey(
        'raw',
        encoder.encode(passphrase),
        'PBKDF2',
        false,
        ['deriveKey']
      );

      // Derive AES-GCM key using PBKDF2
      const derivedKey = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: salt,
          iterations: PBKDF2_ITERATIONS,
          hash: 'SHA-256',
        },
        passphraseKey,
        { name: 'AES-GCM', length: KEY_LENGTH },
        false,
        ['encrypt', 'decrypt']
      );

      // Export key to transfer back to main thread
      const exportedKey = await crypto.subtle.exportKey('raw', derivedKey);

      self.postMessage({
        type: 'deriveKey',
        keyData: exportedKey,
      });
    } catch (error) {
      self.postMessage({
        type: 'deriveKey',
        error: error instanceof Error ? error.message : 'Key derivation failed',
      });
    }
  }
};
