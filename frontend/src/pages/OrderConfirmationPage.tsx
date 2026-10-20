import React from 'react';
import { CheckCircle2, Clock, Package, Truck, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { Order } from '../types';

interface OrderConfirmationPageProps {
  order: Order;
  onNavigate: (page: string) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ order, onNavigate }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const steps = [
    { key: 'PENDING', label: 'Tiếp Nhận', icon: Clock },
    { key: 'CONFIRMED', label: 'Đã Xác Nhận', icon: ShieldCheck },
    { key: 'PROCESSING', label: 'Đóng Gói', icon: Package },
    { key: 'SHIPPED', label: 'Đang Giao', icon: Truck },
    { key: 'DELIVERED', label: 'Hoàn Tất', icon: Check },
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'PENDING': return 0;
      case 'CONFIRMED': return 1;
      case 'PROCESSING': return 2;
      case 'SHIPPED': return 3;
      case 'DELIVERED': return 4;
      default: return 0;
    }
  };

  const currentStep = getStepIndex(order.orderStatus);

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '7rem', maxWidth: '860px' }}>
      
      {/* Success Hero */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-success-bg)',
          color: 'var(--color-success)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: 'var(--shadow-card)'
        }}>
          <CheckCircle2 size={40} />
        </div>

        <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 600 }}>
          ĐẶT HÀNG THÀNH CÔNG
        </span>
        <h1 style={{ fontSize: '2.6rem', marginTop: '0.35rem', marginBottom: '0.75rem' }}>
          Cảm Ơn Quý Khách Đã Lựa Chọn L'ATELIER
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', maxWidth: '580px', margin: '0 auto' }}>
          Mã đơn hàng của quý khách là <strong style={{ color: 'var(--color-text-primary)' }}>{order.orderCode}</strong>. Thông tin xác nhận chi tiết đã được gửi đến hộp thư <strong>{order.customerEmail}</strong>.
        </p>
      </div>

      {/* Order Status Stepper */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        padding: '2.5rem 2rem',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-subtle)',
        marginBottom: '2.5rem'
      }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '2rem', textAlign: 'center' }}>
          Tiến Trình Xử Lý Đơn Hàng
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          {/* Connecting Line */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '40px',
            right: '40px',
            height: '2px',
            backgroundColor: 'var(--color-border)',
            zIndex: 1
          }}>
            <div style={{
              width: `${(currentStep / (steps.length - 1)) * 100}%`,
              height: '100%',
              backgroundColor: 'var(--color-dark)',
              transition: 'width 0.4s ease'
            }} />
          </div>

          {/* Stepper nodes */}
          {steps.map((st, idx) => {
            const Icon = st.icon;
            const isDone = idx <= currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div key={st.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: isDone ? 'var(--color-dark)' : 'var(--color-surface)',
                  color: isDone ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
                  border: isCurrent ? '2px solid var(--color-gold)' : isDone ? 'none' : '2px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.6rem',
                  transition: 'all 0.3s'
                }}>
                  <Icon size={18} />
                </div>
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: isCurrent ? 700 : isDone ? 600 : 400,
                  color: isCurrent ? 'var(--color-dark)' : 'var(--color-text-secondary)',
                  textAlign: 'center'
                }}>
                  {st.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Details Receipt */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        padding: '2.5rem',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-subtle)',
        marginBottom: '2.5rem'
      }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
          Chi Tiết Hóa Đơn & Giao Hàng
        </h3>

        {/* Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>
              Người nhận
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{order.customerName}</div>
            <div style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>{order.customerPhone}</div>
            <div style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>{order.shippingAddress}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>
              Thanh toán & Trạng thái
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
              Phương thức: {order.paymentMethod === 'VNPAY' ? 'VNPay / Cổng trực tuyến' : 'Thanh toán COD'}
            </div>
            <div style={{ fontSize: '0.88rem', marginTop: '0.25rem' }}>
              Trạng thái thanh toán:{' '}
              <span className={`badge ${order.paymentStatus === 'COMPLETED' ? 'badge-success' : 'badge-warning'}`}>
                {order.paymentStatus === 'COMPLETED' ? 'Đã Thanh Toán' : 'Chưa Thanh Toán'}
              </span>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '1rem' }}>
            Sản phẩm trong kiện hàng
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {order.items?.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <img
                    src={item.imageUrl || 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=150&q=80'}
                    alt={item.productName}
                    style={{ width: '48px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.productName}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      Màu: {item.colorName} | Size: {item.size} | SL: {item.quantity}
                    </div>
                  </div>
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                  {formatCurrency(item.totalPrice)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <div style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          alignItems: 'flex-end'
        }}>
          <div style={{ display: 'flex', gap: '3rem', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>Tạm tính:</span>
            <span>{formatCurrency(order.subtotal)}</span>
          </div>
          <div style={{ display: 'flex', gap: '3rem', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>Phí vận chuyển:</span>
            <span>{order.shippingFee === 0 ? 'Miễn phí' : formatCurrency(order.shippingFee)}</span>
          </div>
          {order.discountAmount > 0 && (
            <div style={{ display: 'flex', gap: '3rem', fontSize: '0.9rem', color: 'var(--color-success)' }}>
              <span>Mã giảm giá ({order.couponCode}):</span>
              <span>-{formatCurrency(order.discountAmount)}</span>
            </div>
          )}
          <div style={{ display: 'flex', gap: '3rem', fontSize: '1.25rem', fontWeight: 700, marginTop: '0.5rem' }}>
            <span>Tổng cộng:</span>
            <span>{formatCurrency(order.totalAmount)}</span>
          </div>
        </div>

      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button
          onClick={() => onNavigate('shop')}
          className="btn btn-primary"
          style={{ padding: '0.9rem 2rem' }}
        >
          Tiếp Tục Mua Sắm <ArrowRight size={16} />
        </button>
        <button
          onClick={() => onNavigate('my-orders')}
          className="btn btn-secondary"
          style={{ padding: '0.9rem 2rem' }}
        >
          Xem Đơn Hàng Của Tôi
        </button>
      </div>

    </div>
  );
};
