export interface User {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  role: 'ROLE_CUSTOMER' | 'ROLE_ADMIN';
  avatarUrl?: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  user: User;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  displayOrder: number;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
}

export interface ProductVariant {
  id: number;
  sku: string;
  colorName: string;
  colorCode: string;
  size: string;
  price: number;
  stockQuantity: number;
  imageUrl?: string;
  isActive: boolean;
}

export interface ProductImage {
  id: number;
  imageUrl: string;
  colorName?: string;
  isPrimary: boolean;
  displayOrder: number;
}

export interface ProductListDto {
  id: number;
  name: string;
  slug: string;
  categoryName: string;
  categoryId?: number;
  brandName: string;
  brandId?: number;
  basePrice: number;
  originalPrice?: number;
  primaryImageUrl: string;
  isFeatured: boolean;
  availableColors: string[];
  availableSizes: string[];
  totalStock: number;
}

export interface ProductDetailDto {
  id: number;
  name: string;
  slug: string;
  description: string;
  material?: string;
  careInstructions?: string;
  basePrice: number;
  originalPrice?: number;
  categoryId?: number;
  categoryName: string;
  brandId?: number;
  brandName: string;
  isFeatured: boolean;
  variants: ProductVariant[];
  images: ProductImage[];
}

export interface CartItem {
  id: number;
  variantId: number;
  productId?: number;
  productName: string;
  productSlug: string;
  sku: string;
  colorName: string;
  colorCode: string;
  size: string;
  price: number;
  quantity: number;
  stockQuantity: number;
  itemTotal: number;
  imageUrl?: string;
}

export interface Cart {
  id: number;
  items: CartItem[];
  totalItems: number;
  subtotal: number;
}

export interface OrderItem {
  id: number;
  variantId: number;
  productName: string;
  colorName: string;
  size: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  imageUrl?: string;
}

export interface Order {
  id: number;
  orderCode: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  totalAmount: number;
  couponCode?: string;
  orderStatus: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  note?: string;
  paymentMethod: 'COD' | 'VNPAY' | 'MOMO' | 'CREDIT_CARD';
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  paymentUrl?: string;
  items: OrderItem[];
  createdAt: string;
}

export interface Review {
  id: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CouponResponse {
  code: string;
  discountType: 'PERCENT' | 'FIXED_AMOUNT';
  discountValue: number;
  discountAmount: number;
  newTotal: number;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  totalProducts: number;
  totalCustomers: number;
  recentOrders: Order[];
  lowStockVariants: ProductVariant[];
}

export interface CreateProductVariantRequest {
  colorName: string;
  colorCode: string;
  size: string;
  price: number;
  stockQuantity: number;
  sku?: string;
  imageUrl?: string;
}

export interface CreateProductRequest {
  name: string;
  slug?: string;
  description?: string;
  material?: string;
  careInstructions?: string;
  basePrice: number;
  originalPrice?: number;
  categoryId: number;
  brandId?: number;
  isFeatured?: boolean;
  primaryImageUrl: string;
  additionalImages?: string[];
  variants?: CreateProductVariantRequest[];
}
