import { create } from 'zustand';
import { useTradeStore } from './tradeStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://paima-trade-backend-production.up.railway.app';

interface AuthStore {
  isLoggedIn: boolean;
  isInitializing: boolean;
  token: string | null;
  user: {
    id?: string;
    username: string;
    fiat_balance?: number;
    avatar?: string;
  } | null;

  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  initialize: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  isLoggedIn: false,
  isInitializing: true,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  user: null,

  initialize: async () => {
    const token = get().token;
    if (!token) {
      set({ isInitializing: false });
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        get().logout();
        set({ isInitializing: false });
        return;
      }
      const data = await res.json();

      // Some backends return the user object, some just return { fiat_balance }
      // The instructions state: "Returns the latest fiat_balance", so we patch it into the current user object
      const currentUsername = get().user?.username || 'Trader';

      set({
        isLoggedIn: true,
        isInitializing: false,
        user: {
          username: currentUsername,
          fiat_balance: data.fiat_balance,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUsername}`
        }
      });

      // Hydrate dashboard
      await useTradeStore.getState().fetchPortfolio();
      await useTradeStore.getState().fetchTradeHistory();
    } catch (err) {
      console.error('Session initialization failed:', err);
      get().logout();
      set({ isInitializing: false });
    }
  },

  login: async (username, password) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || err.error || 'Login failed');
    }

    const data = await res.json();
    const user = data.user || { username };
    user.avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`;

    if (typeof window !== 'undefined' && data.token) {
      localStorage.setItem('token', data.token);
    }
    set({ isLoggedIn: true, token: data.token, user });

    // Hydrate dashboard
    await useTradeStore.getState().fetchPortfolio();
    await useTradeStore.getState().fetchTradeHistory();
  },

  register: async (username, password) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || err.error || 'Registration failed');
    }

    const data = await res.json();
    const user = data.user || { username };
    user.avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`;

    if (typeof window !== 'undefined' && data.token) {
      localStorage.setItem('token', data.token);
    }

    set({ isLoggedIn: true, token: data.token, user });

    // Hydrate dashboard
    await useTradeStore.getState().fetchPortfolio();
    await useTradeStore.getState().fetchTradeHistory();
  },

  logout: () => {
    set({ isLoggedIn: false, user: null, token: null, isInitializing: false });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user'); // Clean up old mock
    }
  },
}));
