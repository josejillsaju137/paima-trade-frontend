import { create } from 'zustand';

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

  // Balance operations
  setBalance: (amount: number) => void;
  updateBalance: (amount: number) => void;

  // Trading operations
  buyAsset: (symbol: string, quantity: number, price: number) => boolean;
  sellAsset: (symbol: string, quantity: number, price: number) => boolean;

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

  setBalance: (amount) => set({ balance: amount }),

  updateBalance: (amount) => set((state) => ({
    balance: state.balance + amount,
  })),

  buyAsset: (symbol, quantity, price) => {
    const cost = quantity * price;
    const state = get();

    if (state.balance < cost) {
      return false;
    }

    set((prevState) => {
      const newBalance = prevState.balance - cost;
      const portfolio = { ...prevState.portfolio };

      if (portfolio[symbol]) {
        const existing = portfolio[symbol];
        const totalQuantity = existing.quantity + quantity;
        const totalCost = existing.quantity * existing.averagePrice + cost;
        existing.averagePrice = totalCost / totalQuantity;
        existing.quantity = totalQuantity;
        existing.currentPrice = price;
      } else {
        portfolio[symbol] = {
          symbol,
          quantity,
          averagePrice: price,
          currentPrice: price,
        };
      }

      const trade: Trade = {
        id: `${Date.now()}-${Math.random()}`,
        symbol,
        type: 'buy',
        quantity,
        price,
        timestamp: Date.now(),
      };

      return {
        balance: newBalance,
        portfolio,
        tradeHistory: [trade, ...prevState.tradeHistory],
      };
    });

    return true;
  },

  sellAsset: (symbol, quantity, price) => {
    const state = get();
    const holding = state.portfolio[symbol];

    if (!holding || holding.quantity < quantity) {
      return false;
    }

    set((prevState) => {
      const portfolio = { ...prevState.portfolio };
      const revenue = quantity * price;
      const profitLoss = revenue - (quantity * holding.averagePrice);

      if (holding.quantity === quantity) {
        delete portfolio[symbol];
      } else {
        portfolio[symbol] = {
          ...holding,
          quantity: holding.quantity - quantity,
          currentPrice: price,
        };
      }

      const trade: Trade = {
        id: `${Date.now()}-${Math.random()}`,
        symbol,
        type: 'sell',
        quantity,
        price,
        timestamp: Date.now(),
        profitLoss,
      };

      return {
        balance: prevState.balance + revenue,
        portfolio,
        tradeHistory: [trade, ...prevState.tradeHistory],
      };
    });

    return true;
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
