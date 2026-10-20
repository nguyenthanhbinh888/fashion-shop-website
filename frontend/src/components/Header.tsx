import React, { useState } from 'react';
import { ShoppingBag, User as UserIcon, Search, ShieldCheck, LogOut, Package, Menu, X } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  onNavigate: (page: string, param?: string) => void;
  currentPage: string;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  cartCount,
  onOpenCart,
  onOpenAuth,
  onLogout,
  onNavigate,
  currentPage,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onNavigate('shop', `keyword=${encodeURIComponent(searchTerm.trim())}`);
      setSearchOpen(false);
      setSearchTerm('');
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        ✦ MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC CHO ĐƠN TỪ 1.000.000Đ | THỜI TRANG MAY ĐO CAO CẤP ✦
      </div>

      {/* Main Glass Header */}
      <header className="header-glass">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
          
          {/* Mobile Menu Button */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'none', background: 'none', color: 'var(--color-text-primary)' }}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <button 
              onClick={() => onNavigate('home')}
              style={{ 
                fontWeight: 600, 
                fontSize: '0.85rem', 
                letterSpacing: '0.08em', 
                textTransform: 'uppercase',
                color: currentPage === 'home' ? 'var(--color-dark)' : 'var(--color-text-secondary)',
                borderBottom: currentPage === 'home' ? '2px solid var(--color-dark)' : '2px solid transparent',
                paddingBottom: '4px'
              }}
            >
              Trang Chủ
            </button>
            <button 
              onClick={() => onNavigate('shop')}
              style={{ 
                fontWeight: 600, 
                fontSize: '0.85rem', 
                letterSpacing: '0.08em', 
                textTransform: 'uppercase',
                color: currentPage === 'shop' ? 'var(--color-dark)' : 'var(--color-text-secondary)',
                borderBottom: currentPage === 'shop' ? '2px solid var(--color-dark)' : '2px solid transparent',
                paddingBottom: '4px'
              }}
            >
              Bộ Sưu Tập
            </button>
            <button 
              onClick={() => onNavigate('shop', 'category=1')}
              style={{ 
                fontWeight: 500, 
                fontSize: '0.85rem', 
                letterSpacing: '0.08em', 
                textTransform: 'uppercase',
                color: 'var(--color-text-secondary)',
                paddingBottom: '4px'
              }}
            >
              Áo Blazer
            </button>
            <button 
              onClick={() => onNavigate('shop', 'category=2')}
              style={{ 
                fontWeight: 500, 
                fontSize: '0.85rem', 
                letterSpacing: '0.08em', 
                textTransform: 'uppercase',
                color: 'var(--color-text-secondary)',
                paddingBottom: '4px'
              }}
            >
              Đầm Lụa
            </button>
            <button 
              onClick={() => onNavigate('shop', 'category=3')}
              style={{ 
                fontWeight: 500, 
                fontSize: '0.85rem', 
                letterSpacing: '0.08em', 
                textTransform: 'uppercase',
                color: 'var(--color-text-secondary)',
                paddingBottom: '4px'
              }}
            >
              Sơ Mi
            </button>
            
            {user?.role === 'ROLE_ADMIN' && (
              <button 
                onClick={() => onNavigate('admin')}
                className="badge badge-gold"
                style={{ cursor: 'pointer', padding: '0.35rem 0.8rem' }}
              >
                <ShieldCheck size={14} /> Admin Portal
              </button>
            )}
          </nav>

          {/* Brand Logo */}
          <div 
            onClick={() => onNavigate('home')} 
            style={{ textAlign: 'center', cursor: 'pointer', userSelect: 'none' }}
          >
            <div style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '1.9rem', 
              fontWeight: 700, 
              letterSpacing: '0.12em',
              lineHeight: 1 
            }}>
              L'ATELIER
            </div>
            <div style={{ 
              fontSize: '0.62rem', 
              letterSpacing: '0.25em', 
              textTransform: 'uppercase', 
              color: 'var(--color-gold)', 
              marginTop: '3px',
              fontWeight: 600
            }}>
              HAUTE COUTURE PARIS
            </div>
          </div>

          {/* Right Action Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            
            {/* Search Button & Input */}
            <div style={{ position: 'relative' }}>
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="Tìm sản phẩm, chất liệu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                    style={{
                      width: '240px',
                      padding: '0.45rem 0.85rem',
                      fontSize: '0.85rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-surface)',
                    }}
                  />
                  <button 
                    type="button" 
                    onClick={() => setSearchOpen(false)}
                    style={{ marginLeft: '0.5rem', color: 'var(--color-text-muted)' }}
                  >
                    <X size={18} />
                  </button>
                </form>
              ) : (
                <button 
                  onClick={() => setSearchOpen(true)}
                  style={{ color: 'var(--color-text-primary)' }}
                  title="Tìm kiếm"
                >
                  <Search size={21} />
                </button>
              )}
            </div>

            {/* User Account / Profile */}
            <div style={{ position: 'relative' }}>
              {user ? (
                <div>
                  <button 
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      padding: '0.35rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-surface)'
                    }}
                  >
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-gold)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 700
                    }}>
                      {user.fullName.charAt(0)}
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user.fullName.split(' ')[0]}</span>
                  </button>

                  {userMenuOpen && (
                    <div style={{
                      position: 'absolute',
                      right: 0,
                      top: '110%',
                      backgroundColor: 'var(--color-surface)',
                      borderRadius: 'var(--radius-sm)',
                      boxShadow: 'var(--shadow-modal)',
                      minWidth: '200px',
                      zIndex: 200,
                      padding: '0.5rem 0',
                      border: '1px solid var(--color-border)'
                    }}>
                      <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid var(--color-border-light)' }}>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{user.fullName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{user.email}</div>
                      </div>

                      <button
                        onClick={() => { onNavigate('my-orders'); setUserMenuOpen(false); }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.65rem 1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.85rem',
                          color: 'var(--color-text-primary)'
                        }}
                      >
                        <Package size={16} /> Đơn hàng của tôi
                      </button>

                      {user.role === 'ROLE_ADMIN' && (
                        <button
                          onClick={() => { onNavigate('admin'); setUserMenuOpen(false); }}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '0.65rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.85rem',
                            color: 'var(--color-gold-hover)',
                            fontWeight: 600
                          }}
                        >
                          <ShieldCheck size={16} /> Trang Quản Trị Admin
                        </button>
                      )}

                      <button
                        onClick={() => { onLogout(); setUserMenuOpen(false); }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.65rem 1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.85rem',
                          color: 'var(--color-danger)',
                          borderTop: '1px solid var(--color-border-light)'
                        }}
                      >
                        <LogOut size={16} /> Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={onOpenAuth}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-primary)' }}
                  title="Đăng nhập / Đăng ký"
                >
                  <UserIcon size={21} />
                </button>
              )}
            </div>

            {/* Shopping Bag Button */}
            <button 
              onClick={onOpenCart}
              style={{ position: 'relative', color: 'var(--color-text-primary)' }}
              title="Túi mua sắm"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-8px',
                  backgroundColor: 'var(--color-dark)',
                  color: 'var(--color-text-inverse)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid var(--color-surface)'
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
