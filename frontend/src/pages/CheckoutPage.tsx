import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Tag, CreditCard, Banknote, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { Cart, Order, User } from '../types';

interface CheckoutPageProps {
  cart: Cart | null;
  user: User | null;
  onOrderSuccess: (order: Order) => void;
  onNavigate: (page: string) => void;
  onOpenPaymentModal: (order: Order) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cart,
  user,
  onOrderSuccess,
  onNavigate,
  onOpenPaymentModal,
}) => {
  const [customerName, setCustomerName] = useState(user?.fullName || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('TP. Hồ Chí Minh');
  const [district, setDistrict] = useState('Quận 1');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'VNPAY'>('COD');

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const items = cart?.items || [];
  const subtotal = cart?.subtotal || 0;
  const shippingFee = subtotal >= 1000000 ? 0 : 30000;
  const finalTotal = Math.max(0, subtotal + shippingFee - discountAmount);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setCouponLoading(true);
    setCouponError(null);
    try {
      const res = await api.applyCoupon(couponCode.trim(), subtotal);
      setAppliedCoupon(res.code);
      setDiscountAmount(res.discountAmount);
    } catch (err: any) {
      setCouponError(err.message || 'Mã giảm giá không hợp lệ');
      setAppliedCoupon(null);
      setDiscountAmount(0);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setError('Giỏ hàng của bạn đang trống');
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const fullAddress = `${streetAddress}, ${district}, ${city}`;
      const order = await api.createOrder({
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress: fullAddress,
        note: note.trim() || undefined,
        paymentMethod,
        couponCode: appliedCoupon || undefined,
      });

      if (paymentMethod === 'VNPAY') {
        // Open online payment simulation
        onOpenPaymentModal(order);
      } else {
        // COD Direct success
        onOrderSuccess(order);
      }
    } catch (err: any) {
      setError(err.message || 'Không thể tạo đơn hàng, vui lòng thử lại');
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '8rem 0' }}>
        <h2>Túi mua sắm đang trống</h2>
        <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem', marginBottom: '2rem' }}>
          Vui lòng chọn sản phẩm vào túi trước khi thanh toán.
        </p>
        <button onClick={() => onNavigate('shop')} className="btn btn-primary">
          Khám Phá Bộ Sưu Tập
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '7rem' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 600 }}>
          THANH TOÁN AN TOÀN
        </span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '0.25rem' }}>
          Thông Tin Giao Hàng & Đơn Hàng
        </h1>
      </div>

      {error && (
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto 2rem',
          padding: '1rem',
          backgroundColor: 'var(--color-danger-bg)',
          color: 'var(--color-danger)',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <AlertCircle size={18} /> {error}
        </div>
      )}

      <form onSubmit={handleSubmitOrder}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3.5rem', alignItems: 'start' }}>
          
          {/* LEFT COLUMN: Customer Info & Address */}
          <div>
            {/* Step 1: Contact Info */}
            <div style={{
              backgroundColor: 'var(--color-surface)',
              padding: '2rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>1. Thông Tin Người Nhận</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0912 345 678"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Địa chỉ Email (để nhận hóa đơn & mã tra cứu) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div style={{
              backgroundColor: 'var(--color-surface)',
              padding: '2rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>2. Địa Chỉ Giao Hàng</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Tỉnh / Thành phố *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Quận / Huyện *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Quận 1, Quận Bình Thạnh..."
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Số nhà, tên đường, tòa nhà *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Căn hộ 12B, Landmark 81, 720A Điện Biên Phủ"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Ghi chú cho đơn hàng (tùy chọn)
                </label>
                <textarea
                  rows={2}
                  placeholder="Giao giờ hành chính, gọi điện trước khi giao..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div style={{
              backgroundColor: 'var(--color-surface)',
              padding: '2rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)'
            }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>3. Phương Thức Thanh Toán</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* COD Option */}
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  border: paymentMethod === 'COD' ? '2px solid var(--color-dark)' : '1px solid var(--color-border)',
                  backgroundColor: paymentMethod === 'COD' ? 'var(--color-surface-hover)' : 'var(--color-surface)',
                  cursor: 'pointer'
                }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                  />
                  <Banknote size={24} style={{ color: 'var(--color-dark)' }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Thanh toán khi nhận hàng (COD)</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                      Kiểm tra hàng trước khi thanh toán tiền mặt cho nhân viên giao hàng.
                    </div>
                  </div>
                </label>

                {/* Online Payment Option */}
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  border: paymentMethod === 'VNPAY' ? '2px solid var(--color-dark)' : '1px solid var(--color-border)',
                  backgroundColor: paymentMethod === 'VNPAY' ? 'var(--color-surface-hover)' : 'var(--color-surface)',
                  cursor: 'pointer'
                }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'VNPAY'}
                    onChange={() => setPaymentMethod('VNPAY')}
                  />
                  <CreditCard size={24} style={{ color: 'var(--color-gold)' }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      Cổng thanh toán trực tuyến VNPay / Thẻ ngân hàng
                      <span className="badge badge-gold" style={{ fontSize: '0.68rem' }}>Khuyên Dùng</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                      Quét mã QR qua ứng dụng ngân hàng hoặc thẻ ATM / Visa / Mastercard nội địa & quốc tế.
                    </div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Order Summary & Coupon */}
          <div style={{
            backgroundColor: 'var(--color-surface)',
            padding: '2rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
            position: 'sticky',
            top: '100px'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Đơn Hàng ({items.length})</h3>

            {/* Items summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '300px', overflowY: 'auto', paddingRight: '0.5rem', marginBottom: '1.5rem' }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                  <img
                    src={item.imageUrl || 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=150&q=80'}
                    alt={item.productName}
                    style={{ width: '50px', height: '64px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.productName}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {item.colorName} / {item.size} × {item.quantity}
                    </div>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    {formatCurrency(item.itemTotal)}
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Code Input */}
            <div style={{ padding: '1rem 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Mã giảm giá (ví dụ: LUXE10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  style={{ flex: 1, textTransform: 'uppercase', fontSize: '0.85rem' }}
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={couponLoading || !couponCode.trim()}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '0.7rem 1.25rem' }}
                >
                  {couponLoading ? 'Đang kiểm tra...' : 'Áp Dụng'}
                </button>
              </div>

              {appliedCoupon && (
                <div style={{ marginTop: '0.6rem', fontSize: '0.8rem', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <CheckCircle2 size={14} /> Đã áp dụng mã: <strong>{appliedCoupon}</strong> (-{formatCurrency(discountAmount)})
                </div>
              )}

              {couponError && (
                <div style={{ marginTop: '0.6rem', fontSize: '0.8rem', color: 'var(--color-danger)' }}>
                  {couponError}
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Tạm tính</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Phí vận chuyển</span>
                <span>{shippingFee === 0 ? <strong style={{ color: 'var(--color-success)' }}>Miễn Phí</strong> : formatCurrency(shippingFee)}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-success)' }}>
                  <span>Chiết khấu mã giảm</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--color-border)',
                fontSize: '1.25rem',
                fontWeight: 700
              }}>
                <span>Tổng Thanh Toán</span>
                <span style={{ color: 'var(--color-text-primary)' }}>{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary btn-block"
              style={{ padding: '1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              {submitting ? 'Đang Xử Lý Đơn Hàng...' : 'Hoàn Tất Đặt Hàng'} <ArrowRight size={18} />
            </button>

            <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
              <ShieldCheck size={14} /> Giao dịch được bảo mật và mã hóa chuẩn SSL 256-bit
            </div>
          </div>

        </div>
      </form>

    </div>
  );
};
