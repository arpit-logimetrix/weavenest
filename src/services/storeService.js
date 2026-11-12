// Store service wired for Node.js + PostgreSQL REST APIs with localStorage fallback
// so the frontend works seamlessly before and after backend deployment.

import { apiRequest } from './apiClient';

const STORAGE_KEYS = {
  CART: 'weavenest_cart_v1',
  WISHLIST: 'weavenest_wishlist_v1',
  ADDRESSES: 'weavenest_addresses_v1',
  ORDERS: 'weavenest_orders_v1',
  NEWSLETTER: 'weavenest_newsletter_v1',
  USER: 'weavenest_user_v1',
};

const DEFAULT_ADDRESSES = [
  {
    id: 'addr-default-1',
    name: 'Arpit Rai',
    line1: 'Vikas Khand, Gomti Nagar',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    pincode: '226010',
    country: 'India',
    phone: '+91 98200 00000',
    isDefault: true,
  },
];

function safeRead(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function safeWrite(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota or private browsing errors gracefully
  }
}

export const storeService = {
  getUser() {
    return safeRead(STORAGE_KEYS.USER, null);
  },

  loginUser({ email, name }) {
    const cleanEmail = String(email || '').trim().toLowerCase();
    const displayName =
      String(name || '').trim() ||
      cleanEmail
        .split('@')[0]
        .replace(/[._-]+/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()) ||
      'Weavenest Guest';
    const user = {
      id: `usr-${Date.now()}`,
      name: displayName,
      email: cleanEmail,
      signedInAt: new Date().toISOString(),
    };
    safeWrite(STORAGE_KEYS.USER, user);
    apiRequest('/auth/login', { method: 'POST', body: JSON.stringify({ email: cleanEmail }) }).catch(() => {});
    return user;
  },

  registerUser({ name, email }) {
    const cleanEmail = String(email || '').trim().toLowerCase();
    const user = {
      id: `usr-${Date.now()}`,
      name: String(name || '').trim() || 'Weavenest Member',
      email: cleanEmail,
      signedInAt: new Date().toISOString(),
    };
    safeWrite(STORAGE_KEYS.USER, user);
    apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(user) }).catch(() => {});
    return user;
  },

  logoutUser() {
    try {
      window.localStorage.removeItem(STORAGE_KEYS.USER);
    } catch {
      // Ignore storage errors
    }
    apiRequest('/auth/logout', { method: 'POST' }).catch(() => {});
    return null;
  },

  getCart() {
    return safeRead(STORAGE_KEYS.CART, []);
  },

  saveCart(items) {
    safeWrite(STORAGE_KEYS.CART, items);
    apiRequest('/cart', { method: 'PUT', body: JSON.stringify({ items }) }).catch(() => {});
    return items;
  },

  getWishlist() {
    return safeRead(STORAGE_KEYS.WISHLIST, []);
  },

  saveWishlist(ids) {
    safeWrite(STORAGE_KEYS.WISHLIST, ids);
    apiRequest('/wishlist', { method: 'PUT', body: JSON.stringify({ ids }) }).catch(() => {});
    return ids;
  },

  getAddresses() {
    const list = safeRead(STORAGE_KEYS.ADDRESSES, null);
    if (!Array.isArray(list) || list.length === 0) {
      safeWrite(STORAGE_KEYS.ADDRESSES, DEFAULT_ADDRESSES);
      return DEFAULT_ADDRESSES;
    }
    return list;
  },

  saveAddresses(addresses) {
    safeWrite(STORAGE_KEYS.ADDRESSES, addresses);
    apiRequest('/addresses', { method: 'PUT', body: JSON.stringify({ addresses }) }).catch(() => {});
    return addresses;
  },

  getOrders() {
    return safeRead(STORAGE_KEYS.ORDERS, []);
  },

  placeOrder({ items, address, paymentMethod, subtotal, shipping, total }) {
    const order = {
      id: `WN-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
      items,
      address,
      paymentMethod,
      subtotal,
      shipping,
      total,
    };
    const nextOrders = [order, ...this.getOrders()];
    safeWrite(STORAGE_KEYS.ORDERS, nextOrders);
    safeWrite(STORAGE_KEYS.CART, []);
    apiRequest('/orders', { method: 'POST', body: JSON.stringify(order) }).catch(() => {});
    return order;
  },

  subscribeNewsletter(email) {
    const existing = safeRead(STORAGE_KEYS.NEWSLETTER, []);
    if (!existing.includes(email)) {
      safeWrite(STORAGE_KEYS.NEWSLETTER, [...existing, email]);
    }
    apiRequest('/newsletter', { method: 'POST', body: JSON.stringify({ email }) }).catch(() => {});
    return { ok: true, email };
  },

  submitContactMessage(payload) {
    apiRequest('/contact', { method: 'POST', body: JSON.stringify(payload) }).catch(() => {});
    return { ok: true };
  },

  checkPincodeDelivery(pincode) {
    const clean = String(pincode || '').trim();
    if (!/^\d{6}$/.test(clean)) {
      return {
        valid: false,
        message: 'Please enter a valid 6-digit Indian pincode.',
      };
    }
    return {
      valid: true,
      message: `Estimated delivery to ${clean} in 3–5 business days. Free shipping over ₹1,999.`,
    };
  },
};
