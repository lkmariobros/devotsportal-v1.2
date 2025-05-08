/**
 * Utility functions for formatting data in the application
 */

/**
 * Format a number as Malaysian Ringgit (MYR) currency
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
  }).format(amount);
}

/**
 * Format a date string into a human-readable format
 * @param dateString - ISO date string to format
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/**
 * Format a percentage value
 * @param value - The percentage value
 * @param decimalPlaces - Number of decimal places (default: 1)
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, decimalPlaces = 1): string {
  return `${value.toFixed(decimalPlaces)}%`;
}

/**
 * Determine if a percentage change is positive, negative, or neutral
 * @param value - The percentage change value
 * @returns 'positive', 'negative', or 'neutral'
 */
export function getChangeType(value: number | undefined | null): 'positive' | 'negative' | 'neutral' {
  if (value === undefined || value === null || value === 0) return 'neutral';
  return value > 0 ? 'positive' : 'negative';
}
