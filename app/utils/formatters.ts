export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export const formatPercent = (value: number): string => {
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(Math.round(num));
};

export const formatCompactNumber = (num: number): string => {
  if (num >= 1e9) return `₹${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `₹${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `₹${(num / 1e3).toFixed(1)}K`;
  return `₹${num.toFixed(0)}`;
};

export const truncateAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const getChangeColor = (change: number): string => {
  return change >= 0 ? 'text-success' : 'text-danger';
};

export const getChangeBgColor = (change: number): string => {
  return change >= 0 ? 'bg-success/10' : 'bg-danger/10';
};
