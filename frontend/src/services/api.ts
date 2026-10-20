import {
  AuthResponse,
  Cart,
  Category,
  Brand,
  CouponResponse,
  DashboardStats,
  Order,
  ProductDetailDto,
  ProductListDto,
  Review,
  User,
  CreateProductRequest
} from '../types';

const API_BASE = 'http://localhost:8080/api/v1';

// Session ID for anonymous carts
export const getSessionId = (): string => {
  let sessionId = localStorage.getItem('luxe_session_id');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('luxe_session_id', sessionId);
  }
  return sessionId;
};

// Auth Token management
export const getAuthToken = (): string | null => localStorage.getItem('luxe_token');

export const setAuthToken = (token: string): void => localStorage.setItem('luxe_token', token);

export const clearAuth = (): void => {
  localStorage.removeItem('luxe_token');
  localStorage.removeItem('luxe_user');
};

export const getSavedUser = (): User | null => {
  const userStr = localStorage.getItem('luxe_user');
  if (!userStr) return null;
  try {
    const u = JSON.parse(userStr);
    if (u && typeof u.fullName === 'string' && u.fullName.includes('?')) {
      if (u.email === 'customer@gmail.com') u.fullName = 'Nguyễn Minh Anh';
      else if (u.email === 'admin@luxeatelier.com') u.fullName = 'Quản Trị Viên (Admin)';
      localStorage.setItem('luxe_user', JSON.stringify(u));
    }
    return u;
  } catch {
    return null;
  }
};

export const saveUser = (user: User): void => {
  localStorage.setItem('luxe_user', JSON.stringify(user));
};

// Generic Fetch Wrapper
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const resJson = await response.json();

  if (!response.ok || !resJson.success) {
    throw new Error(resJson.message || 'Yêu cầu không thành công');
  }

  return resJson.data;
}

export const api = {
  // Authentication
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const data = await request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setAuthToken(data.token);
    saveUser(data.user);
    return data;
  },

  register: async (fullName: string, email: string, password: string, phone?: string): Promise<AuthResponse> => {
    const data = await request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ fullName, email, password, phone }),
    });
    setAuthToken(data.token);
    saveUser(data.user);
    return data;
  },

  getMe: async (): Promise<User> => {
    return request<User>('/auth/me');
  },

  // Categories & Brands
  getCategories: async (): Promise<Category[]> => {
    return request<Category[]>('/categories');
  },

  getBrands: async (): Promise<Brand[]> => {
    return request<Brand[]>('/brands');
  },

  // Products
  getProducts: async (params: {
    categoryId?: number;
    brandId?: number;
    featured?: boolean;
    keyword?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    page?: number;
    size?: number;
  }): Promise<{ content: ProductListDto[]; totalElements: number; totalPages: number }> => {
    const query = new URLSearchParams();
    if (params.categoryId) query.append('categoryId', params.categoryId.toString());
    if (params.brandId) query.append('brandId', params.brandId.toString());
    if (params.featured !== undefined) query.append('featured', params.featured.toString());
    if (params.keyword) query.append('keyword', params.keyword);
    if (params.minPrice) query.append('minPrice', params.minPrice.toString());
    if (params.maxPrice) query.append('maxPrice', params.maxPrice.toString());
    if (params.sortBy) query.append('sortBy', params.sortBy);
    if (params.page !== undefined) query.append('page', params.page.toString());
    if (params.size) query.append('size', params.size.toString());

    return request<{ content: ProductListDto[]; totalElements: number; totalPages: number }>(`/products?${query.toString()}`);
  },

  getFeaturedProducts: async (): Promise<ProductListDto[]> => {
    return request<ProductListDto[]>('/products/featured');
  },

  getProductBySlug: async (slug: string): Promise<ProductDetailDto> => {
    return request<ProductDetailDto>(`/products/slug/${slug}`);
  },

  getProductById: async (id: number): Promise<ProductDetailDto> => {
    return request<ProductDetailDto>(`/products/${id}`);
  },

  // Reviews
  getReviews: async (productId: number): Promise<Review[]> => {
    return request<Review[]>(`/products/${productId}/reviews`);
  },

  addReview: async (productId: number, rating: number, comment: string): Promise<Review> => {
    return request<Review>(`/products/${productId}/reviews`, {
      method: 'POST',
      body: JSON.stringify({ rating, comment }),
    });
  },

  // Cart
  getCart: async (): Promise<Cart> => {
    const sessionId = getSessionId();
    return request<Cart>(`/cart?sessionId=${sessionId}`);
  },

  addToCart: async (variantId: number, quantity: number): Promise<Cart> => {
    const sessionId = getSessionId();
    return request<Cart>('/cart/items', {
      method: 'POST',
      body: JSON.stringify({ variantId, quantity, sessionId }),
    });
  },

  updateCartItem: async (itemId: number, quantity: number): Promise<Cart> => {
    const sessionId = getSessionId();
    return request<Cart>(`/cart/items/${itemId}?sessionId=${sessionId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  },

  removeCartItem: async (itemId: number): Promise<Cart> => {
    const sessionId = getSessionId();
    return request<Cart>(`/cart/items/${itemId}?sessionId=${sessionId}`, {
      method: 'DELETE',
    });
  },

  // Coupons
  applyCoupon: async (code: string, subtotal: number): Promise<CouponResponse> => {
    return request<CouponResponse>('/coupons/apply', {
      method: 'POST',
      body: JSON.stringify({ code, subtotal }),
    });
  },

  // Orders & Checkout
  createOrder: async (data: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: string;
    note?: string;
    paymentMethod: string;
    couponCode?: string;
  }): Promise<Order> => {
    const sessionId = getSessionId();
    return request<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify({ ...data, sessionId }),
    });
  },

  getOrderByCode: async (orderCode: string): Promise<Order> => {
    return request<Order>(`/orders/${orderCode}`);
  },

  getMyOrders: async (): Promise<Order[]> => {
    return request<Order[]>('/orders/my-orders');
  },

  // Payment Confirmation
  confirmPayment: async (orderCode: string, transactionRef: string): Promise<void> => {
    return request<void>('/payments/confirm', {
      method: 'POST',
      body: JSON.stringify({ orderCode, transactionRef }),
    });
  },

  // Admin APIs
  getDashboardStats: async (): Promise<DashboardStats> => {
    return request<DashboardStats>('/admin/dashboard');
  },

  getAdminOrders: async (status?: string): Promise<{ content: Order[] }> => {
    const q = status ? `?status=${status}` : '';
    return request<{ content: Order[] }>(`/admin/orders${q}`);
  },

  updateOrderStatus: async (orderId: number, status: string): Promise<Order> => {
    return request<Order>(`/admin/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  getAdminUsers: async (): Promise<User[]> => {
    return request<User[]>('/admin/users');
  },

  createProduct: async (data: CreateProductRequest): Promise<ProductDetailDto> => {
    return request<ProductDetailDto>('/admin/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
