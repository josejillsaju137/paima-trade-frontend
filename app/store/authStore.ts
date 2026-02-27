import { create } from 'zustand';

interface AuthStore {
  isLoggedIn: boolean;
  user: {
    id: string;
    email: string;
    username: string;
    avatar?: string;
  } | null;
  
  login: (email: string, password: string) => void;
  register: (email: string, username: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  user: null,
  
  login: (email, password) => {
    // Mock login - in real app, would verify with backend
    const user = {
      id: '1',
      email,
      username: email.split('@')[0],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };
    
    set({ isLoggedIn: true, user });
    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },
  
  register: (email, username, password) => {
    // Mock register - in real app, would create account on backend
    const user = {
      id: `${Date.now()}`,
      email,
      username,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };
    
    set({ isLoggedIn: true, user });
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },
  
  logout: () => {
    set({ isLoggedIn: false, user: null });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  },
}));
