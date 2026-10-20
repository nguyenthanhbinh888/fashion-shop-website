import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Cart } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Cart | null;
  onUpdateQuantity: (itemId: number, newQty: number) => void;
  onRemoveItem: (itemId: number) => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
}) => {
  if (!isOpen) return null;

  const items = cart?.items || [];
  const subtotal = cart?.subtotal || 0;
  const freeShippingThreshold = 1000000;
  const neededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Drawer Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, letterSpacing: '0.04em' }}>
              TÚI MUA SẮM
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              ({cart?.totalItems || 0} sản phẩm)
            </span>
          </div>
          <button 
            onClick={onClose} 
            style={{ color: 'var(--color-text-primary)', padding: '0.25rem' }}
            aria-label="Đóng"
          >
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Tracker */}
        <div style={{ padding: '1rem 1.5rem', backgroundColor: 'var(--color-gold-light)', borderBottom: '1px solid var(--color-border-light)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-gold-hover)', marginBottom: '0.4rem' }}>
            {neededForFreeShipping > 0
              ? `Thêm ${formatCurrency(neededForFreeShipping)} để được MIỄN PHÍ VẬN CHUYỂN`
              : '✦ Bạn đã đủ điều kiện MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC!'}
          </div>
          <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(197, 168, 128, 0.25)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{
              width: `${freeShippingPercent}%`,
              height: '100%',
              backgroundColor: 'var(--color-gold)',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '50%', 
                backgroundColor: 'var(--color-surface-hover)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'var(--color-text-muted)'
              }}>
                <ShoppingBag size={28} />
              </div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Túi của bạn đang trống</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                Khám phá những thiết kế may đo cao cấp mới nhất của chúng tôi.
              </p>
              <button 
                onClick={onClose} 
                className="btn btn-primary"
                style={{ fontSize: '0.8rem', padding: '0.7rem 1.5rem' }}
              >
                Tiếp Tục Mua Sắm
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {items.map((item) => (
                <div 
                  key={item.id} 
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    paddingBottom: '1.25rem',
                    borderBottom: '1px solid var(--color-border-light)'
                  }}
                >
                  {/* Thumbnail */}
                  <img
                    src={item.imageUrl || 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=200&q=80'}
                    alt={item.productName}
                    style={{
                      width: '76px',
                      height: '96px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: '#f5f5f5'
                    }}
                  />

                  {/* Info */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '0.25rem' }}>
                        {item.productName}
                      </h4>
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        style={{ color: 'var(--color-text-muted)', padding: '0.2rem' }}
                        title="Xóa sản phẩm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.78rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.colorCode || '#000', display: 'inline-block' }} />
                        {item.colorName}
                      </span>
                      <span>|</span>
                      <span>Size: <strong>{item.size}</strong></span>
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {/* Quantity Stepper */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        overflow: 'hidden'
                      }}>
                        <button
                          onClick={() => {
                            if (item.quantity > 1) onUpdateQuantity(item.id, item.quantity - 1);
                            else onRemoveItem(item.id);
                          }}
                          style={{ padding: '0.3rem 0.5rem', color: 'var(--color-text-primary)' }}
                          aria-label="Giảm"
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ padding: '0 0.6rem', fontSize: '0.85rem', fontWeight: 600 }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stockQuantity}
                          style={{ 
                            padding: '0.3rem 0.5rem', 
                            color: item.quantity >= item.stockQuantity ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
                            cursor: item.quantity >= item.stockQuantity ? 'not-allowed' : 'pointer'
                          }}
                          aria-label="Tăng"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Total for item */}
                      <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>
                        {formatCurrency(item.itemTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div style={{
            padding: '1.5rem',
            borderTop: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Tạm tính</span>
              <span style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {formatCurrency(subtotal)}
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
              Thuế và chi phí vận chuyển sẽ được tính toán khi thanh toán.
            </p>
            <button
              onClick={() => {
                onClose();
                onProceedCheckout();
              }}
              className="btn btn-primary btn-block"
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
            >
              Tiến Hành Thanh Toán <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
