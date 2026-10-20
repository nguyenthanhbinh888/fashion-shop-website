import React, { useEffect, useState } from 'react';
import { Package, Clock, ShieldCheck, Truck, Check, ArrowRight, ShoppingBag } from 'lucide-react';
import { api } from '../services/api';
import { Order, User } from '../types';

interface MyOrdersPageProps {
  user: User | null;
  onOpenAuth: () => void;
  onNavigate: (page: string) => void;
  onViewOrder: (order: Order) => void;
}

export const MyOrdersPage: React.FC<MyOrdersPageProps> = ({
  user,
  onOpenAuth,
  onNavigate,
  onViewOrder,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await api.getMyOrders();
        setOrders(data);
      } catch (err) {
        console.error('Error loading my orders', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span className="badge badge-warning">Chờ Tiếp Nhận</span>;
      case 'CONFIRMED':
        return <span className="badge badge-gold">Đã Xác Nhận</span>;
      case 'PROCESSING':
        return <span className="badge badge-dark">Đang Đóng Gói</span>;
      case 'SHIPPED':
        return <span className="badge badge-dark">Đang Giao Hàng</span>;
      case 'DELIVERED':
        return <span className="badge badge-success">Đã Giao Thành Công</span>;
      case 'CANCELLED':
        return <span className="badge badge-danger">Đã Hủy</span>;
      default:
        return <span className="badge badge-dark">{status}</span>;
    }
  };

  if (!user) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '8rem 0' }}>
        <h2>Đăng Nhập Để Xem Đơn Hàng</h2>
        <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem', marginBottom: '2rem' }}>
          Quý khách vui lòng đăng nhập vào tài khoản để theo dõi lịch sử và tiến độ giao hàng.
        </p>
        <button onClick={onOpenAuth} className="btn btn-primary">
          Đăng Nhập Ngay
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '7rem', maxWidth: '980px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 600 }}>
          HỒ SƠ KHÁCH HÀNG VIP
        </span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '0.25rem' }}>
          Lịch Sử Đơn Hàng Của Quý Khách
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
          Xin chào <strong>{user.fullName}</strong> ({user.email})
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '6rem 0', color: 'var(--color-text-muted)' }}>
          Đang nạp danh sách đơn hàng...
        </div>
      ) : orders.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '6rem 2rem',
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-border)'
        }}>
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
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Quý khách chưa có đơn hàng nào</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Khám phá ngay bộ sưu tập may đo cao cấp mùa này.
          </p>
          <button onClick={() => onNavigate('shop')} className="btn btn-primary">
            Khám Phá Bộ Sưu Tập
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {orders.map((ord) => (
            <div
              key={ord.id}
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-subtle)',
                overflow: 'hidden'
              }}
            >
              {/* Order Header bar */}
              <div style={{
                padding: '1.25rem 1.75rem',
                backgroundColor: 'var(--color-bg)',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>MÃ ĐƠN HÀNG</div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-text-primary)' }}>
                    {ord.orderCode}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>NGÀY ĐẶT</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                    {new Date(ord.createdAt).toLocaleDateString('vi-VN')}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>TỔNG TIỀN</div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>
                    {formatCurrency(ord.totalAmount)}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>TRẠNG THÁI</div>
                  {getStatusBadge(ord.orderStatus)}
                </div>

                <button
                  onClick={() => onViewOrder(ord)}
                  className="btn btn-secondary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  Xem Chi Tiết <ArrowRight size={14} />
                </button>
              </div>

              {/* Items List Preview */}
              <div style={{ padding: '1.5rem 1.75rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {ord.items?.map((item) => (
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
                            Màu: {item.colorName} | Size: {item.size} | Số lượng: {item.quantity}
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
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
