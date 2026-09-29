import { POST_PRICING, PostingPayment, ProductItem, User } from '../types';

const USER_KEY = 'bss_user';
const TOKEN_KEY = 'bss_token';
const PAYMENTS_KEY = 'bss_posting_payments';

export const AuthUtils = {
  saveUser(user: User) { localStorage.setItem(USER_KEY, JSON.stringify(user)); },
  getUser(): User | null {
    try { const value = localStorage.getItem(USER_KEY); return value ? JSON.parse(value) as User : null; }
    catch { return null; }
  },
  saveToken(token: string) { localStorage.setItem(TOKEN_KEY, token); },
  getToken() { return localStorage.getItem(TOKEN_KEY); },
  isLoggedIn() { return Boolean(this.getUser() && this.getToken()); },
  logout() { localStorage.removeItem(USER_KEY); localStorage.removeItem(TOKEN_KEY); },
  mockLogin(email: string): User {
    const existing = this.getUser();
    const user: User = existing ?? { id: `user-${Date.now()}`, name: email.split('@')[0], email, phone: '', verified: true, role: 'buyer', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    this.saveUser(user); this.saveToken(`demo-token-${Date.now()}`); return user;
  },
};

export const PostingPaymentUtils = {
  getPrice(featured: boolean) { return featured ? POST_PRICING.featured : POST_PRICING.standard; },
  createPayment(user: User, product: ProductItem, featured: boolean, method: PostingPayment['method'] = 'bkash'): PostingPayment {
    const payment: PostingPayment = { id: `post-payment-${Date.now()}`, productId: product.id, userId: user.id, amount: this.getPrice(featured), plan: featured ? 'featured' : 'standard', method, status: 'pending', createdAt: new Date().toISOString() };
    const old = JSON.parse(localStorage.getItem(PAYMENTS_KEY) || '[]') as PostingPayment[];
    localStorage.setItem(PAYMENTS_KEY, JSON.stringify([payment, ...old])); return payment;
  },
  markPaid(id: string, transactionId?: string) {
    const payments = JSON.parse(localStorage.getItem(PAYMENTS_KEY) || '[]') as PostingPayment[];
    const updated = payments.map(payment => payment.id === id ? { ...payment, status: 'paid' as const, transactionId } : payment);
    localStorage.setItem(PAYMENTS_KEY, JSON.stringify(updated)); return updated.find(payment => payment.id === id) ?? null;
  },
};
