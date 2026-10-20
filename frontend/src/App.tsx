import React, { useEffect, useState } from 'react';
import { api, clearAuth, getAuthToken, getSavedUser, saveUser } from './services/api';
import { Cart, Order, User } from './types';
import { Header } from './components/Header';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { PaymentGatewayModal } from './components/PaymentGatewayModal';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { MyOrdersPage } from './pages/MyOrdersPage';
import { AdminPortal } from './pages/AdminPortal';
import { CheckCircle2 } from 'lucide-react';

export function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pageParam, setPageParam] = useState<string | undefined>(undefined);
  const [currentProductSlug, setCurrentProductSlug] = useState<string>('');
  
  const [user, setUser] = useState<User | null>(getSavedUser());
  const [cart, setCart] = useState<Cart | null>(null);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Load initial cart
  const refreshCart = async () => {
    try {
      const c = await api.getCart();
      setCart(c);
    } catch (err) {
      console.error('Error loading cart', err);
    }
  };

  useEffect(() => {
    refreshCart();
    // Auto-sync user profile from backend to ensure clean encoding
    if (getAuthToken()) {
      api.getMe()
        .then((freshUser) => {
          if (freshUser) {
            setUser(freshUser);
            saveUser(freshUser);
          }
        })
        .catch((err) => {
          console.warn('Could not sync user profile:', err);
        });
    }
  }, []);

  const handleNavigate = (page: string, param?: string) => {
    setCurrentPage(page);
    setPageParam(param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProductDetail = (slug: string) => {
    setCurrentProductSlug(slug);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = async (variantId: number, quantity: number) => {
    try {
      const updatedCart = await api.addToCart(variantId, quantity);
      setCart(updatedCart);
      setIsCartOpen(true);
      showToast('Đã thêm thiết kế vào túi mua sắm');
    } catch (err: any) {
      alert(err.message || 'Không thể thêm vào giỏ hàng');
    }
  };

  const handleBuyNow = async (variantId: number, quantity: number) => {
    try {
      const updatedCart = await api.addToCart(variantId, quantity);
      setCart(updatedCart);
      handleNavigate('checkout');
    } catch (err: any) {
      alert(err.message || 'Không thể tiến hành mua ngay');
    }
  };

  const handleUpdateCartQuantity = async (itemId: number, newQty: number) => {
    try {
      const updatedCart = await api.updateCartItem(itemId, newQty);
      setCart(updatedCart);
    } catch (err: any) {
      alert(err.message || 'Không thể cập nhật số lượng');
    }
  };

  const handleRemoveCartItem = async (itemId: number) => {
    try {
      const updatedCart = await api.removeCartItem(itemId);
      setCart(updatedCart);
      showToast('Đã xóa sản phẩm khỏi túi');
    } catch (err: any) {
      alert(err.message || 'Không thể xóa sản phẩm');
    }
  };

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    refreshCart();
    showToast(`Xin chào mừng, ${loggedInUser.fullName}!`);
  };

  const handleLogout = () => {
    clearAuth();
    setUser(null);
    refreshCart();
    showToast('Đã đăng xuất tài khoản thành công');
    if (currentPage === 'admin' || currentPage === 'my-orders') {
      setCurrentPage('home');
    }
  };

  // Parse category id or keyword from param
  const getInitialCategory = () => {
    if (pageParam && pageParam.startsWith('category=')) {
      return parseInt(pageParam.replace('category=', ''), 10);
    }
    return undefined;
  };

  const getInitialKeyword = () => {
    if (pageParam && pageParam.startsWith('keyword=')) {
      return decodeURIComponent(pageParam.replace('keyword=', ''));
    }
    return undefined;
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Global Header */}
      <Header
        user={user}
        cartCount={cart?.totalItems || 0}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      {/* Main Routed Page Content */}
      <main style={{ flex: 1 }}>
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onQuickAdd={(productId) => handleOpenProductDetail(`product-${productId}`)}
            onOpenProductDetail={handleOpenProductDetail}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            initialCategory={getInitialCategory()}
            initialKeyword={getInitialKeyword()}
            onOpenProductDetail={handleOpenProductDetail}
          />
        )}

        {currentPage === 'product-detail' && (
          <ProductDetailPage
            slug={currentProductSlug}
            user={user}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onOpenAuth={() => setIsAuthOpen(true)}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            cart={cart}
            user={user}
            onNavigate={handleNavigate}
            onOrderSuccess={(order) => {
              setActiveOrder(order);
              refreshCart();
              setCurrentPage('order-confirmation');
            }}
            onOpenPaymentModal={(order) => {
              setActiveOrder(order);
              setIsPaymentOpen(true);
            }}
          />
        )}

        {currentPage === 'order-confirmation' && activeOrder && (
          <OrderConfirmationPage
            order={activeOrder}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'my-orders' && (
          <MyOrdersPage
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
            onNavigate={handleNavigate}
            onViewOrder={(ord) => {
              setActiveOrder(ord);
              setCurrentPage('order-confirmation');
            }}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPortal
            user={user}
            onNavigate={handleNavigate}
            onViewOrder={(ord) => {
              setActiveOrder(ord);
              setCurrentPage('order-confirmation');
            }}
          />
        )}
      </main>

      {/* Global Luxury Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          handleNavigate('checkout');
        }}
      />

      {/* Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Online Payment Gateway Simulator Modal */}
      <PaymentGatewayModal
        isOpen={isPaymentOpen}
        order={activeOrder}
        onSuccess={(updatedOrder) => {
          setIsPaymentOpen(false);
          setActiveOrder(updatedOrder);
          refreshCart();
          showToast('Thanh toán đơn hàng thành công qua VNPay!');
          setCurrentPage('order-confirmation');
        }}
        onCancel={() => {
          setIsPaymentOpen(false);
          refreshCart();
          showToast('Giao dịch đã được lưu, quý khách có thể thanh toán sau');
          if (activeOrder) {
            setCurrentPage('order-confirmation');
          }
        }}
      />

      {/* Toast Notification */}
      {toast && (
        <div className="toast-container">
          <div className="toast">
            <CheckCircle2 size={18} style={{ color: 'var(--color-gold)' }} />
            <span>{toast}</span>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
