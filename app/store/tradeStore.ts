import { create } from 'zustand';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://paima-trade-backend-production.up.railway.app';

export interface Trade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  timestamp: number;
  profitLoss?: number;
}

export interface Portfolio {
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
}

interface TradeStore {
  balance: number;
  portfolio: Record<string, Portfolio>;
  tradeHistory: Trade[];

  fetchPortfolio: () => Promise<void>;
  fetchTradeHistory: () => Promise<void>;

  // Trading operations
  buyAsset: (symbol: string, quantity: number, price: number) => Promise<boolean>;
  sellAsset: (symbol: string, quantity: number, price: number) => Promise<boolean>;

  // Portfolio calculations
  getTotalValue: (prices: Record<string, number>) => number;
  getPortfolioValue: (prices: Record<string, number>) => number;
  getTotalPNL: (prices: Record<string, number>) => number;
  getTotalPNLPercent: (prices: Record<string, number>) => number;

  // Reset
  resetAll: () => void;
}

export const useTradeStore = create<TradeStore>((set, get) => ({
  balance: 1000000,
  portfolio: {},
  tradeHistory: [],

  fetchPortfolio: async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) return;

      const res = await fetch(`${API_URL}/api/portfolio`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Failed to fetch portfolio');

      const data = await res.json();

      // Preserve existing valid properties like averagePrice if possible, otherwise assume current market prices
      const currentPortfolio = get().portfolio;
      const newPortfolio: Record<string, Portfolio> = {};

      if (data.holdings && Array.isArray(data.holdings)) {
        data.holdings.forEach((holding: any) => {
          const existing = currentPortfolio[holding.symbol];
          newPortfolio[holding.symbol] = {
            symbol: holding.symbol,
            quantity: holding.quantity,
            averagePrice: existing?.averagePrice || 0, // Fallback if backend doesn't supply it
            currentPrice: existing?.currentPrice || 0,
          };
        });
      }

      set({ balance: data.fiat_balance, portfolio: newPortfolio });
    } catch (err) {
      console.error('Error fetching portfolio:', err);
    }
  },

  fetchTradeHistory: async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) return;

      const res = await fetch(`${API_URL}/api/trade/history`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Failed to fetch trade history');

      const trades = await res.json();

      if (Array.isArray(trades)) {
        set({ tradeHistory: trades });
      }
    } catch (err) {
      console.error('Error fetching trades:', err);
    }
  },

  buyAsset: async (symbol, quantity, price) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) throw new Error('Unauthorized');

      const res = await fetch(`${API_URL}/api/trade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ symbol, type: 'buy', quantity, price })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || 'Buy order failed');

      // Refresh data
      await get().fetchPortfolio();
      await get().fetchTradeHistory();

      return true;
    } catch (err: any) {
      throw err;
    }
  },

  sellAsset: async (symbol, quantity, price) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) throw new Error('Unauthorized');

      const res = await fetch(`${API_URL}/api/trade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ symbol, type: 'sell', quantity, price })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || 'Sell order failed');

      // Refresh data
      await get().fetchPortfolio();
      await get().fetchTradeHistory();

      return true;
    } catch (err: any) {
      throw err;
    }
  },

  getTotalValue: (prices) => {
    const state = get();
    let value = state.balance;

    Object.entries(state.portfolio).forEach(([symbol, holding]) => {
      value += holding.quantity * (prices[symbol] || holding.currentPrice);
    });

    return value;
  },

  getPortfolioValue: (prices) => {
    const state = get();
    let value = 0;

    Object.entries(state.portfolio).forEach(([symbol, holding]) => {
      value += holding.quantity * (prices[symbol] || holding.currentPrice);
    });

    return value;
  },

  getTotalPNL: (prices) => {
    const state = get();
    const portfolioValue = get().getPortfolioValue(prices);
    const invested = Object.values(state.portfolio).reduce((sum, holding) => {
      return sum + holding.quantity * holding.averagePrice;
    }, 0);

    return portfolioValue - invested;
  },

  getTotalPNLPercent: (prices) => {
    const invested = Object.values(get().portfolio).reduce((sum, holding) => {
      return sum + holding.quantity * holding.averagePrice;
    }, 0);

    if (invested === 0) return 0;

    const pnl = get().getTotalPNL(prices);
    return (pnl / invested) * 100;
  },

  resetAll: () => set({
    balance: 1000000,
    portfolio: {},
    tradeHistory: [],
  }),
}));
