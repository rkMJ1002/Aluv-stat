export function formatUSD(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

// Backward-compatible alias
export function formatIDR(amount: number): string {
  return formatUSD(amount);
}
