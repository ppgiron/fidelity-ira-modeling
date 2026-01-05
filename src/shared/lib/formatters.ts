/**
 * Shared formatting utilities
 */

/**
 * Formats a number as a USD currency string.
 * @param value - The number to format.
 * @returns A string representing the number as USD currency (e.g., "$1,234.56").
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}