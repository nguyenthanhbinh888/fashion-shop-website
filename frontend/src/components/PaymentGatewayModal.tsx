import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, QrCode, CreditCard, Lock } from 'lucide-react';
import { api } from '../services/api';
import { Order } from '../types';

interface PaymentGatewayModalProps {
  isOpen: boolean;
  order: Order | null;
  onSuccess: (order: Order) => void;
  onCancel: () => void;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  isOpen,
  order,
  onSuccess,
  onCancel,
}) => {
  if (!isOpen || !order) return null;

  const [activeTab, setActiveTab] = useState<'qr' | 'card'>('qr');
  const [processing, setProcessing] = useState(false);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const handleConfirmSuccess = async () => {
    setProcessing(true);
    try {
      const txnRef = 'VNPAY_SANDBOX_' + Date.now();
      await api.confirmPayment(order.orderCode, txnRef);
      
      const updatedOrder = {
        ...order,
        paymentStatus: 'COMPLETED' as const,
        orderStatus: 'CONFIRMED' as const,
      };

      onSuccess(updatedOrder);
    } catch (err: any) {
      alert(err.message || 'Lỗi xác nhận thanh toán');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '480px', padding: '0', overflow: 'hidden' }}
      >
        {/* Header */}
        <div style={{
          backgroundColor: '#0c2340',
          color: '#ffffff',
          padding: '1.75rem 2rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4aa3df', fontWeight: 600, marginBottom: '0.25rem' }}>
            CỔNG THANH TOÁN ĐIỆN TỬ VNPAY SANDBOX
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 600 }}>
            L'ATELIER & CO.
          </div>
          <div style={{ marginTop: '0.75rem', fontSize: '1.5rem', fontWeight: 700, color: '#f3c053' }}>
            {formatCurrency(order.totalAmount)}
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '0.25rem' }}>
            Mã đơn hàng: <strong>{order.orderCode}</strong>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)' }}>
          <button
            type="button"
            onClick={() => setActiveTab('qr')}
            style={{
              flex: 1,
              padding: '0.85rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              borderBottom: activeTab === 'qr' ? '2px solid var(--color-dark)' : '2px solid transparent',
              color: activeTab === 'qr' ? 'var(--color-dark)' : 'var(--color-text-muted)',
              backgroundColor: activeTab === 'qr' ? 'var(--color-surface)' : 'var(--color-bg)'
            }}
          >
            <QrCode size={16} /> Quét Mã QR Ngân Hàng
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('card')}
            style={{
              flex: 1,
              padding: '0.85rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              borderBottom: activeTab === 'card' ? '2px solid var(--color-dark)' : '2px solid transparent',
              color: activeTab === 'card' ? 'var(--color-dark)' : 'var(--color-text-muted)',
              backgroundColor: activeTab === 'card' ? 'var(--color-surface)' : 'var(--color-bg)'
            }}
          >
            <CreditCard size={16} /> Thẻ Quốc Tế / Nội Địa
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '2rem' }}>
          {activeTab === 'qr' ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '180px',
                height: '180px',
                margin: '0 auto 1.25rem',
                backgroundColor: '#ffffff',
                border: '2px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-subtle)',
                position: 'relative'
              }}>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=VNPAY_PAYMENT_SIMULATION"
                  alt="QR Code"
                  style={{ width: '160px', height: '160px' }}
                />
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                Mở ứng dụng Mobile Banking của quý khách để quét mã thanh toán.
              </p>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-gold-hover)', fontWeight: 600 }}>
                Thời gian hiệu lực giao dịch: <strong>14:59</strong>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                  Số Thẻ Demo (Mô phỏng)
                </label>
                <input
                  type="text"
                  readOnly
                  value="9704 1985 2026 8888"
                  style={{ width: '100%', fontSize: '0.9rem', backgroundColor: 'var(--color-bg)' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                    Hạn Thẻ
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="12/28"
                    style={{ width: '100%', fontSize: '0.9rem', backgroundColor: 'var(--color-bg)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                    Mã CVV
                  </label>
                  <input
                    type="password"
                    readOnly
                    value="888"
                    style={{ width: '100%', fontSize: '0.9rem', backgroundColor: 'var(--color-bg)' }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                  Tên Chủ Thẻ
                </label>
                <input
                  type="text"
                  readOnly
                  value="NGUYEN MINH ANH"
                  style={{ width: '100%', fontSize: '0.9rem', backgroundColor: 'var(--color-bg)' }}
                />
              </div>
            </div>
          )}

          {/* Action Simulator Buttons */}
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={handleConfirmSuccess}
              disabled={processing}
              className="btn btn-gold btn-block"
              style={{ padding: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              <CheckCircle2 size={18} />
              {processing ? 'Đang Xử Lý Giao Dịch...' : 'Xác Nhận Thanh Toán Thành Công (Sandbox)'}
            </button>

            <button
              type="button"
              onClick={onCancel}
              disabled={processing}
              style={{
                padding: '0.65rem',
                fontSize: '0.85rem',
                color: 'var(--color-text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.3rem'
              }}
            >
              <XCircle size={15} /> Hủy giao dịch và quay lại
            </button>
          </div>

          <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.72rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
            <Lock size={12} /> Cổng thanh toán Sandbox được mã hóa an toàn TLS 1.3
          </div>
        </div>
      </div>
    </div>
  );
};
