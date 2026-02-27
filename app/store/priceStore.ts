import { create } from 'zustand';

export interface Asset {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  marketCap?: string;
  volume24h?: string;
  image?: string;
}

interface PriceStore {
  assets: Record<string, Asset>;
  setAssets: (assets: Record<string, Asset>) => void;
  updatePrice: (symbol: string, price: number, change24h: number, changePercent24h: number) => void;
  getPrice: (symbol: string) => number;
}

export const usePriceStore = create<PriceStore>((set, get) => ({
  assets: {},
  
  setAssets: (assets) => set({ assets }),
  
  updatePrice: (symbol, price, change24h, changePercent24h) => {
    set((state) => ({
      assets: {
        ...state.assets,
        [symbol]: {
          ...(state.assets[symbol] || { symbol, name: symbol }),
          price,
          change24h,
          changePercent24h,
        },
      },
    }));
  },
  
  getPrice: (symbol) => {
    return get().assets[symbol]?.price || 0;
  },
}));
