import React from 'react';
import { Mail, MapPin, Phone, Globe, Share2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer style={{
      backgroundColor: 'var(--color-dark)',
      color: 'var(--color-text-inverse)',
      paddingTop: '5rem',
      paddingBottom: '3rem',
      borderTop: '1px solid var(--color-dark-border)'
    }}>
      <div className="container">
        
        {/* Top 4-Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          paddingBottom: '4rem',
          borderBottom: '1px solid var(--color-dark-border)'
        }}>
          
          {/* Brand Info */}
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
              L'ATELIER
            </div>
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1.25rem', fontWeight: 600 }}>
              HAUTE COUTURE PARIS
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Thương hiệu may đo cao cấp mang tinh thần tối giản đương đại, kết hợp kỹ thuật cắt may thủ công Pháp và sợi Cashmere, Lụa tơ tằm thượng hạng.
            </p>
            <div style={{ display: 'flex', gap: '1rem', color: 'var(--color-gold)' }}>
              <Globe size={18} style={{ cursor: 'pointer' }} />
              <Share2 size={18} style={{ cursor: 'pointer' }} />
              <Mail size={18} style={{ cursor: 'pointer' }} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
              Bộ Sưu Tập
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              <button onClick={() => onNavigate('shop', 'category=1')} style={{ textAlign: 'left', color: 'inherit' }}>
                Áo Blazer Dạ Cashmere
              </button>
              <button onClick={() => onNavigate('shop', 'category=2')} style={{ textAlign: 'left', color: 'inherit' }}>
                Đầm Lụa Tơ Tằm Dáng Dài
              </button>
              <button onClick={() => onNavigate('shop', 'category=3')} style={{ textAlign: 'left', color: 'inherit' }}>
                Sơ Mi Supima Cotton Cổ Ý
              </button>
              <button onClick={() => onNavigate('shop', 'category=4')} style={{ textAlign: 'left', color: 'inherit' }}>
                Quần Âu Xếp Ly Dáng Rủ
              </button>
              <button onClick={() => onNavigate('shop', 'category=5')} style={{ textAlign: 'left', color: 'inherit' }}>
                Bộ Sưu Tập Capsule Tối Giản
              </button>
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
              Dịch Vụ Khách Hàng
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              <span style={{ cursor: 'pointer' }}>Hướng Dẫn Chọn Size May Đo</span>
              <span style={{ cursor: 'pointer' }}>Chính Sách Đổi Trả Trong 14 Ngày</span>
              <span style={{ cursor: 'pointer' }}>Bảo Dưỡng Cúc & Đường May Miễn Phí</span>
              <span style={{ cursor: 'pointer' }}>Chính Sách Vận Chuyển Hỏa Tốc</span>
              <span style={{ cursor: 'pointer' }}>Điều Khoản & Bảo Mật Khách Hàng VIP</span>
            </div>
          </div>

          {/* Boutiques */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
              Hệ Thống Boutique
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <MapPin size={16} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '2px' }} />
                <span>68 Đồng Khởi, Bến Nghé, Quận 1, TP. Hồ Chí Minh</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <MapPin size={16} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '2px' }} />
                <span>24 Tràng Tiền, Hoàn Kiếm, Hà Nội</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem' }}>
                <Phone size={15} style={{ color: 'var(--color-gold)' }} />
                <span style={{ fontWeight: 600, color: '#fff' }}>Hotline VIP: 1900 8899</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.78rem',
          color: 'rgba(255, 255, 255, 0.45)'
        }}>
          <div>
            © 2026 L'ATELIER & CO. Bản quyền thuộc về L'ATELIER Haute Couture. All rights reserved.
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span>Thanh toán bảo mật:</span>
            <span style={{ color: '#FFFFFF', fontWeight: 600 }}>COD</span>
            <span style={{ color: 'var(--color-gold)', fontWeight: 600 }}>VNPAY QR</span>
            <span style={{ color: '#FFFFFF', fontWeight: 600 }}>VISA / MASTER</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
