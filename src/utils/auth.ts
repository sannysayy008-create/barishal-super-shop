import { User } from '../types';

const USER_STORAGE_KEY = 'bss_user';
const TOKEN_STORAGE_KEY = 'bss_token';

export const AuthUtils = {
  // Save user to localStorage
  saveUser: (user: User) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  },

  // Get user from localStorage
  getUser: (): User | null => {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  // Save auth token
  saveToken: (token: string) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  },

  // Get auth token
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  },

  // Check if user is logged in
  isLoggedIn: (): boolean => {
    return !!localStorage.getItem(TOKEN_STORAGE_KEY) && !!localStorage.getItem(USER_STORAGE_KEY);
  },

  // Logout user
  logout: () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  },

  // Simulate login (for demo purposes)
  mockLogin: (email: string, password: string): User => {
    const user: User = {
      id: `user-${Date.now()}`,
      name: 'সাধারণ ব্যবহারকারী',
      email,
      phone: '01700000000',
      verified: true,
      role: 'buyer',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    AuthUtils.saveUser(user);
    AuthUtils.saveToken(`token-${Date.now()}`);
    
    return user;
  },

  // Simulate register (for demo purposes)
  mockRegister: (name: string, email: string, phone: string, password: string): User => {
    const user: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone,
      verified: false,
      role: 'buyer',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    AuthUtils.saveUser(user);
    AuthUtils.saveToken(`token-${Date.now()}`);

    return user;
  },
};
