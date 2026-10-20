import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Shield, Award, Clock, Star, Heart } from 'lucide-react';
import { api } from '../services/api';
import { Category, ProductListDto } from '../types';

interface HomePageProps {
  onNavigate: (page: string, param?: string) => void;
  onQuickAdd: (productId: number) => void;
  onOpenProductDetail: (slug: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onQuickAdd,
  onOpenProductDetail,
}) => {
  const [featuredProducts, setFeaturedProducts] = useState<ProductListDto[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.getFeaturedProducts(),
          api.getCategories(),
        ]);
        setFeaturedProducts(prodRes);
        setCategories(catRes);
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <div style={{ paddingBottom: '5rem' }}>
      
      {/* 1. HERO EDITORIAL SECTION */}
      <section style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(rgba(14, 14, 16, 0.45), rgba(14, 14, 16, 0.65)), url("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=85") center/cover no-repeat',
        color: 'var(--color-text-inverse)',
        padding: '4rem 1.5rem',
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '680px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.78rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              fontWeight: 600,
              marginBottom: '1.25rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '0.4rem 1rem',
              borderRadius: 'var(--radius-full)',
              backdropFilter: 'blur(10px)'
            }}>
              <Sparkles size={14} /> BỘ SƯU TẬP CAPSULE 2026
            </div>
            
            <h1 style={{
              color: '#FFFFFF',
              fontSize: '3.6rem',
              fontWeight: 400,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              letterSpacing: '-0.01em'
            }}>
              Chế tác vượt thời gian. <br />
              <span style={{ fontStyle: 'italic', fontWeight: 300, color: '#F3F1EC' }}>Vẻ đẹp của sự tinh giản.</span>
            </h1>

            <p style={{
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
              fontWeight: 300
            }}>
              Mỗi thiết kế tại L'ATELIER được may đo thủ công từ sợi len Cashmere nguyên bản của Ý 
              và Lụa dâu tằm 22 momme, tôn vinh phong thái chuẩn mực và sự tự tin thuần khiết.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate('shop')}
                className="btn btn-gold"
                style={{ padding: '1rem 2.25rem', fontSize: '0.85rem' }}
              >
                Khám Phá Bộ Sưu Tập <ArrowRight size={17} />
              </button>
              <button
                onClick={() => onNavigate('shop', 'category=1')}
                style={{
                  padding: '1rem 2rem',
                  fontSize: '0.85rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  color: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.2s'
                }}
              >
                Xem Áo Blazer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SPOTLIGHT */}
      <section className="container" style={{ marginTop: '5rem', marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 600 }}>
            DANH MỤC THỜI TRANG
          </span>
          <h2 style={{ fontSize: '2.4rem', marginTop: '0.5rem' }}>Đường Nét Thiết Kế Đặc Trưng</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {categories.slice(0, 4).map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('shop', `category=${cat.id}`)}
              style={{
                position: 'relative',
                height: '420px',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <img
                src={cat.imageUrl || 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80'}
                alt={cat.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(14, 14, 16, 0.85) 0%, rgba(14, 14, 16, 0.1) 60%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '2rem 1.5rem',
                color: '#FFFFFF'
              }}>
                <h3 style={{ color: '#FFFFFF', fontSize: '1.6rem', marginBottom: '0.4rem', fontFamily: 'var(--font-serif)' }}>
                  {cat.name}
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.4 }}>
                  {cat.description}
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                  color: 'var(--color-gold)'
                }}>
                  Khám phá danh mục <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (BEST SELLERS) */}
      <section className="container" style={{ marginBottom: '6rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
          <div>
            <span style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 600 }}>
              SẢN PHẨM TIÊU BIỂU
            </span>
            <h2 style={{ fontSize: '2.4rem', marginTop: '0.4rem' }}>Thiết Kế Được Yêu Thích Nhất</h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: 600,
              fontSize: '0.85rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--color-dark)',
              borderBottom: '1px solid var(--color-dark)',
              paddingBottom: '2px'
            }}
          >
            Xem Tất Cả <ArrowRight size={16} />
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-muted)' }}>
            Đang tải dữ liệu sản phẩm...
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem',
          }}>
            {featuredProducts.map((product) => (
              <div 
                key={product.id} 
                className="product-card"
                onClick={() => onOpenProductDetail(product.slug)}
                style={{ cursor: 'pointer' }}
              >
                {/* Product Image */}
                <div className="product-card-img-wrapper">
                  <img
                    src={product.primaryImageUrl}
                    alt={product.name}
                    className="product-card-img"
                    loading="lazy"
                  />
                  {product.originalPrice && product.originalPrice > product.basePrice && (
                    <span 
                      className="badge badge-dark"
                      style={{ position: 'absolute', top: '12px', left: '12px', fontSize: '0.7rem' }}
                    >
                      -{Math.round(((product.originalPrice - product.basePrice) / product.originalPrice) * 100)}%
                    </span>
                  )}
                  {product.isFeatured && (
                    <span 
                      className="badge badge-gold"
                      style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '0.7rem' }}
                    >
                      Bán Chạy
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="product-card-info">
                  <div className="product-card-brand">{product.brandName || "L'ATELIER"}</div>
                  <h3 className="product-card-title">{product.name}</h3>

                  {/* Colors & Sizes preview */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.5rem 0 1rem' }}>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      {product.availableColors?.slice(0, 3).map((col, idx) => (
                        <span 
                          key={idx}
                          style={{
                            fontSize: '0.7rem',
                            color: 'var(--color-text-muted)',
                            backgroundColor: 'var(--color-bg)',
                            padding: '0.15rem 0.45rem',
                            borderRadius: 'var(--radius-sm)'
                          }}
                        >
                          {col}
                        </span>
                      ))}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      Tồn: <strong>{product.totalStock}</strong>
                    </span>
                  </div>

                  <div className="product-card-price-row">
                    <span className="price-current">{formatCurrency(product.basePrice)}</span>
                    {product.originalPrice && (
                      <span className="price-original">{formatCurrency(product.originalPrice)}</span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenProductDetail(product.slug);
                    }}
                    className="btn btn-secondary btn-block"
                    style={{ marginTop: '1rem', fontSize: '0.78rem', padding: '0.65rem' }}
                  >
                    Xem Chi Tiết & Đặt Hàng
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. BRAND CRAFTSMANSHIP & PILLARS */}
      <section style={{ backgroundColor: 'var(--color-dark)', color: 'var(--color-text-inverse)', padding: '6rem 1.5rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 4rem' }}>
            <span style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 600 }}>
              TRIẾT LÝ THƯƠNG HIỆU
            </span>
            <h2 style={{ color: '#FFFFFF', fontSize: '2.6rem', marginTop: '0.5rem', marginBottom: '1.25rem' }}>
              Nghệ Thuật May Đo Sartorial Hiện Đại
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1rem', lineHeight: 1.7 }}>
              Chúng tôi tin rằng sự xa xỉ thực sự không nằm ở những chi tiết phô trương, mà ẩn giấu trong 
              đường kim mũi chỉ sắc sảo, phom dáng cân đối hoàn mỹ và cảm giác nâng niu trên làn da.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            <div style={{
              backgroundColor: 'var(--color-dark-surface)',
              padding: '2.5rem 2rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-dark-border)'
            }}>
              <div style={{ color: 'var(--color-gold)', marginBottom: '1.25rem' }}>
                <Award size={36} />
              </div>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.4rem', marginBottom: '0.75rem' }}>
                Chất Liệu Tuyển Chọn Thượng Hạng
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Len Cashmere Ý, Lụa dâu tằm 22 momme và Cotton Supima sợi dài với chứng nhận nguồn gốc tự nhiên, bền vững theo năm tháng.
              </p>
            </div>

            <div style={{
              backgroundColor: 'var(--color-dark-surface)',
              padding: '2.5rem 2rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-dark-border)'
            }}>
              <div style={{ color: 'var(--color-gold)', marginBottom: '1.25rem' }}>
                <Shield size={36} />
              </div>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.4rem', marginBottom: '0.75rem' }}>
                Cắt May Tỉ Mỉ Chuẩn Form Dáng
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Phom dáng được hiệu chỉnh tỉ mỉ qua hàng trăm bản rập, đảm bảo vừa vặn, tôn vinh đường nét cơ thể nhưng vẫn thoải mái tuyệt đối.
              </p>
            </div>

            <div style={{
              backgroundColor: 'var(--color-dark-surface)',
              padding: '2.5rem 2rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-dark-border)'
            }}>
              <div style={{ color: 'var(--color-gold)', marginBottom: '1.25rem' }}>
                <Clock size={36} />
              </div>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.4rem', marginBottom: '0.75rem' }}>
                Dịch Vụ & Bảo Hành Trọn Đời
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Hỗ trợ chỉnh sửa phom áo, bảo dưỡng cúc xà cừ và đường chỉ miễn phí trọn đời cho mọi khách hàng thân thiết.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="container" style={{ marginTop: '6rem', marginBottom: '6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 600 }}>
            ĐÁNH GIÁ TỪ KHÁCH HÀNG
          </span>
          <h2 style={{ fontSize: '2.4rem', marginTop: '0.4rem' }}>Trải Nghiệm Sự Khác Biệt</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          <div style={{
            backgroundColor: 'var(--color-surface)',
            padding: '2rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <div style={{ display: 'flex', color: 'var(--color-gold)', marginBottom: '1rem' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p style={{ fontStyle: 'italic', color: 'var(--color-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              "Áo blazer dạ Cashmere của L'ATELIER thực sự đã vượt xa kỳ vọng. Phom vai đứng dáng, lót trong lụa cupro mềm mịn tuyệt đối khi mặc cả ngày làm việc."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#eee', overflow: 'hidden' }}>
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Chị Phương Thảo</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Giám Đốc Sáng Tạo, TP.HCM</div>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--color-surface)',
            padding: '2rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <div style={{ display: 'flex', color: 'var(--color-gold)', marginBottom: '1rem' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p style={{ fontStyle: 'italic', color: 'var(--color-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              "Đầm lụa cắt bias-cut ôm rủ tự nhiên rất quyến rũ, chất lụa dâu tằm 22 momme không bị dính sát tĩnh điện. Đóng gói hộp rất chỉn chu, có thiệp cảm ơn viết tay."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#eee', overflow: 'hidden' }}>
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80" alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Bảo Ngọc</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Khách hàng VIP, Hà Nội</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NEWSLETTER */}
      <section className="container">
        <div style={{
          backgroundColor: 'var(--color-surface)',
          padding: '4rem 2rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
          boxShadow: 'var(--shadow-card)'
        }}>
          <span style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 600 }}>
            L'ATELIER PRIVÉ
          </span>
          <h2 style={{ fontSize: '2.2rem', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
            Đăng Ký Nhận Đặc Quyền Thành Viên
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', maxWidth: '540px', margin: '0 auto 2rem' }}>
            Nhận mã giảm giá <strong>10%</strong> cho đơn hàng đầu tiên (Mã: <strong>LUXE10</strong>) và lời mời tham dự các sự kiện ra mắt bộ sưu tập giới hạn.
          </p>

          <form 
            onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn quý khách đã đăng ký nhận bản tin VIP của L\'ATELIER!'); }}
            style={{ display: 'flex', gap: '0.5rem', maxWidth: '480px', margin: '0 auto' }}
          >
            <input
              type="email"
              required
              placeholder="Nhập địa chỉ email của quý khách..."
              style={{ flex: 1, padding: '0.85rem 1.25rem' }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
              Đăng Ký
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};
