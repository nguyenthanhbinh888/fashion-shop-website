import React, { useEffect, useState } from 'react';
import { Star, ShieldCheck, Truck, RotateCcw, ChevronDown, ChevronUp, Plus, Minus, Check, ShoppingBag, Sparkles } from 'lucide-react';
import { api } from '../services/api';
import { ProductDetailDto, ProductVariant, Review, User } from '../types';

interface ProductDetailPageProps {
  slug: string;
  user: User | null;
  onAddToCart: (variantId: number, quantity: number) => Promise<void>;
  onBuyNow: (variantId: number, quantity: number) => Promise<void>;
  onOpenAuth: () => void;
  onNavigate: (page: string, param?: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  user,
  onAddToCart,
  onBuyNow,
  onOpenAuth,
  onNavigate,
}) => {
  const [product, setProduct] = useState<ProductDetailDto | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Selected Variant state
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>('');

  // Accordion state
  const [accordionOpen, setAccordionOpen] = useState<{ details: boolean; care: boolean; shipping: boolean }>({
    details: true,
    care: false,
    shipping: false,
  });

  // Review Form state
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const prod = await api.getProductBySlug(slug);
        setProduct(prod);

        if (prod.images && prod.images.length > 0) {
          setActiveImage(prod.images[0].imageUrl);
        }

        if (prod.variants && prod.variants.length > 0) {
          const first = prod.variants[0];
          setSelectedColor(first.colorName);
          setSelectedSize(first.size);
          setSelectedVariant(first);
          if (first.imageUrl) {
            setActiveImage(first.imageUrl);
          }
        }

        const revs = await api.getReviews(prod.id);
        setReviews(revs);
      } catch (err) {
        console.error('Error loading product detail', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // When color or size changes, update selectedVariant
  useEffect(() => {
    if (!product || !selectedColor) return;

    // Available sizes for this color
    const variantsForColor = product.variants.filter((v) => v.colorName === selectedColor);
    
    // Check if current selectedSize exists in this color
    let matched = variantsForColor.find((v) => v.size === selectedSize);
    if (!matched && variantsForColor.length > 0) {
      matched = variantsForColor[0];
      setSelectedSize(matched.size);
    }

    if (matched) {
      setSelectedVariant(matched);
      if (matched.imageUrl) {
        setActiveImage(matched.imageUrl);
      }
      setQuantity(1);
    }
  }, [selectedColor, selectedSize, product]);

  const handleColorSelect = (colorName: string) => {
    setSelectedColor(colorName);
    const variantWithColor = product?.variants.find((v) => v.colorName === colorName);
    if (variantWithColor?.imageUrl) {
      setActiveImage(variantWithColor.imageUrl);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onOpenAuth();
      return;
    }
    if (!product || !newComment.trim()) return;

    setReviewSubmitting(true);
    try {
      const added = await api.addReview(product.id, newRating, newComment.trim());
      setReviews([added, ...reviews]);
      setNewComment('');
      setReviewSuccess(true);
      setTimeout(() => setReviewSuccess(false), 4000);
    } catch (err: any) {
      alert(err.message || 'Không thể gửi nhận xét');
    } finally {
      setReviewSubmitting(false);
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '8rem 0', color: 'var(--color-text-muted)' }}>
        Đang tải thông tin thiết kế...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '8rem 0' }}>
        <h2>Không tìm thấy sản phẩm</h2>
        <button onClick={() => onNavigate('shop')} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Quay lại cửa hàng
        </button>
      </div>
    );
  }

  // Unique colors and sizes
  const uniqueColors = Array.from(
    new Map(product.variants.map((v) => [v.colorName, v])).values()
  );

  const availableSizesForColor = product.variants
    .filter((v) => v.colorName === selectedColor)
    .map((v) => ({ size: v.size, stock: v.stockQuantity, variant: v }));

  const currentStock = selectedVariant?.stockQuantity || 0;
  const isOutOfStock = currentStock === 0;

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '7rem' }}>
      
      {/* Breadcrumb */}
      <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
        <button onClick={() => onNavigate('home')}>Trang Chủ</button>
        <span>/</span>
        <button onClick={() => onNavigate('shop')}>Bộ Sưu Tập</button>
        <span>/</span>
        <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{product.name}</span>
      </div>

      {/* Main 2-Column Product Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)', gap: '4rem', alignItems: 'start' }}>
        
        {/* Left: Gallery */}
        <div>
          {/* Main Large Image */}
          <div style={{
            position: 'relative',
            aspectRatio: '3 / 4',
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
            backgroundColor: '#EEECE7',
            marginBottom: '1rem',
            boxShadow: 'var(--shadow-card)'
          }}>
            <img
              src={activeImage}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {product.originalPrice && product.originalPrice > product.basePrice && (
              <span className="badge badge-dark" style={{ position: 'absolute', top: '16px', left: '16px' }}>
                Giảm {Math.round(((product.originalPrice - product.basePrice) / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Thumbnails row */}
          {product.images && product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {product.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(img.imageUrl)}
                  style={{
                    width: '76px',
                    height: '96px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    border: activeImage === img.imageUrl ? '2px solid var(--color-dark)' : '1px solid var(--color-border)',
                    opacity: activeImage === img.imageUrl ? 1 : 0.65,
                    transition: 'all 0.2s',
                    flexShrink: 0
                  }}
                >
                  <img src={img.imageUrl} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Purchase & Variant Selection */}
        <div>
          {/* Brand & Category */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 600 }}>
              {product.brandName || "L'ATELIER HAUTE COUTURE"}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              Mã SKU: <strong>{selectedVariant?.sku || '---'}</strong>
            </span>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: '2.5rem', lineHeight: 1.2, marginBottom: '1rem' }}>
            {product.name}
          </h1>

          {/* Rating Summary */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', color: 'var(--color-gold)' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="currentColor" />)}
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
              5.0 ({reviews.length} đánh giá xác thực)
            </span>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '1.9rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {formatCurrency(selectedVariant ? selectedVariant.price : product.basePrice)}
            </span>
            {product.originalPrice && product.originalPrice > product.basePrice && (
              <span style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Color Selection */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>
                Màu sắc: <span style={{ fontWeight: 400, color: 'var(--color-text-secondary)' }}>{selectedColor}</span>
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {uniqueColors.map((v) => (
                <button
                  key={v.colorName}
                  onClick={() => handleColorSelect(v.colorName)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.45rem 0.9rem',
                    borderRadius: 'var(--radius-sm)',
                    border: selectedColor === v.colorName ? '2px solid var(--color-dark)' : '1px solid var(--color-border)',
                    backgroundColor: selectedColor === v.colorName ? 'var(--color-surface-hover)' : 'var(--color-surface)',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  <span style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: v.colorCode || '#000',
                    border: '1px solid rgba(0,0,0,0.1)'
                  }} />
                  <span>{v.colorName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>
                Kích cỡ: <span style={{ fontWeight: 400, color: 'var(--color-text-secondary)' }}>{selectedSize}</span>
              </span>
              <span style={{ fontSize: '0.8rem', color: currentStock <= 10 ? 'var(--color-danger)' : 'var(--color-success)', fontWeight: 600 }}>
                {isOutOfStock ? 'Hết hàng tạm thời' : currentStock <= 10 ? `Chỉ còn ${currentStock} sản phẩm` : `Còn hàng (${currentStock} sản phẩm)`}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              {availableSizesForColor.map(({ size, stock }) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  disabled={stock === 0}
                  style={{
                    width: '56px',
                    height: '46px',
                    borderRadius: 'var(--radius-sm)',
                    border: selectedSize === size ? '2px solid var(--color-dark)' : '1px solid var(--color-border)',
                    backgroundColor: selectedSize === size ? 'var(--color-dark)' : stock === 0 ? '#f0f0f0' : 'var(--color-surface)',
                    color: selectedSize === size ? 'var(--color-text-inverse)' : stock === 0 ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: stock === 0 ? 'not-allowed' : 'pointer',
                    textDecoration: stock === 0 ? 'line-through' : 'none'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Actions */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            {/* Quantity Stepper */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              backgroundColor: 'var(--color-surface)'
            }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ padding: '0.8rem 1rem', color: 'var(--color-text-primary)' }}
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span style={{ padding: '0 1rem', fontSize: '1rem', fontWeight: 600 }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                style={{ padding: '0.8rem 1rem', color: 'var(--color-text-primary)' }}
                disabled={quantity >= currentStock}
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Add to Bag */}
            <button
              onClick={() => {
                if (selectedVariant) onAddToCart(selectedVariant.id, quantity);
              }}
              disabled={isOutOfStock}
              className="btn btn-secondary"
              style={{ flex: 1, padding: '0.9rem' }}
            >
              <ShoppingBag size={18} /> Thêm Vào Túi
            </button>

            {/* Buy Now */}
            <button
              onClick={() => {
                if (selectedVariant) onBuyNow(selectedVariant.id, quantity);
              }}
              disabled={isOutOfStock}
              className="btn btn-primary"
              style={{ flex: 1.2, padding: '0.9rem' }}
            >
              Mua Ngay
            </button>
          </div>

          {/* Guarantees */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            padding: '1.25rem',
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
            marginBottom: '2.5rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <Truck size={20} style={{ color: 'var(--color-gold)', margin: '0 auto 0.3rem' }} />
              <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>Miễn Phí Vận Chuyển</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Đơn từ 1.000.000 đ</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <ShieldCheck size={20} style={{ color: 'var(--color-gold)', margin: '0 auto 0.3rem' }} />
              <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>Chính Hãng 100%</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Chất liệu thượng hạng</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <RotateCcw size={20} style={{ color: 'var(--color-gold)', margin: '0 auto 0.3rem' }} />
              <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>Đổi Trả Trong 14 Ngày</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Hỗ trợ tận nơi</div>
            </div>
          </div>

          {/* Accordion Sections */}
          <div style={{ borderTop: '1px solid var(--color-border)' }}>
            
            {/* Details & Description */}
            <div style={{ borderBottom: '1px solid var(--color-border)' }}>
              <button
                onClick={() => setAccordionOpen({ ...accordionOpen, details: !accordionOpen.details })}
                style={{ width: '100%', padding: '1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600, fontSize: '0.95rem' }}
              >
                <span>MÔ TẢ CHI TIẾT & CHẤT LIỆU</span>
                {accordionOpen.details ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {accordionOpen.details && (
                <div style={{ paddingBottom: '1.25rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  <p style={{ marginBottom: '0.75rem' }}>{product.description}</p>
                  {product.material && (
                    <p><strong>Thành phần chất liệu:</strong> {product.material}</p>
                  )}
                </div>
              )}
            </div>

            {/* Care Instructions */}
            <div style={{ borderBottom: '1px solid var(--color-border)' }}>
              <button
                onClick={() => setAccordionOpen({ ...accordionOpen, care: !accordionOpen.care })}
                style={{ width: '100%', padding: '1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600, fontSize: '0.95rem' }}
              >
                <span>HƯỚNG DẪN BẢO QUẢN</span>
                {accordionOpen.care ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {accordionOpen.care && (
                <div style={{ paddingBottom: '1.25rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  <p>{product.careInstructions || 'Giặt khô chuyên nghiệp hoặc giặt tay với nước lạnh, phơi ngang trong bóng mát.'}</p>
                </div>
              )}
            </div>

            {/* Shipping & Delivery */}
            <div style={{ borderBottom: '1px solid var(--color-border)' }}>
              <button
                onClick={() => setAccordionOpen({ ...accordionOpen, shipping: !accordionOpen.shipping })}
                style={{ width: '100%', padding: '1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600, fontSize: '0.95rem' }}
              >
                <span>GIAO HÀNG & ĐÓNG GÓI SANG TRỌNG</span>
                {accordionOpen.shipping ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {accordionOpen.shipping && (
                <div style={{ paddingBottom: '1.25rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  <p>Mỗi đơn hàng được đóng gói trong hộp cứng lót giấy lụa thơm, bọc ruy băng lụa và kèm túi vải bảo quản trang phục chuyên dụng. Giao hàng hỏa tốc trong 2-4 giờ tại TP.HCM & Hà Nội.</p>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* CUSTOMER REVIEWS & RATINGS */}
      <section style={{ marginTop: '6rem', borderTop: '1px solid var(--color-border)', paddingTop: '4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
          <div>
            <span style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 600 }}>
              ĐÁNH GIÁ TỪ KHÁCH HÀNG
            </span>
            <h2 style={{ fontSize: '2.2rem', marginTop: '0.4rem' }}>Nhận Xét Về Sản Phẩm</h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '4rem', alignItems: 'start' }}>
          
          {/* Reviews List */}
          <div>
            {reviews.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Chưa có đánh giá nào cho thiết kế này. Hãy là người đầu tiên chia sẻ cảm nhận!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    style={{
                      padding: '1.5rem',
                      backgroundColor: 'var(--color-surface)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-surface-hover)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.8rem'
                        }}>
                          {rev.userName.charAt(0)}
                        </div>
                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{rev.userName}</span>
                      </div>
                      <div style={{ display: 'flex', color: 'var(--color-gold)' }}>
                        {[...Array(rev.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                      </div>
                    </div>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Write a Review Box */}
          <div style={{
            backgroundColor: 'var(--color-surface)',
            padding: '2rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Viết Đánh Giá Của Quý Khách</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Cảm nhận về chất liệu, đường may và trải nghiệm mặc thực tế.
            </p>

            {reviewSuccess && (
              <div style={{
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--color-success-bg)',
                color: 'var(--color-success)',
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Check size={16} /> Cảm ơn bạn! Đánh giá đã được gửi thành công.
              </div>
            )}

            <form onSubmit={handleReviewSubmit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  Đánh giá số sao
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      style={{ color: star <= newRating ? 'var(--color-gold)' : 'var(--color-border)' }}
                    >
                      <Star size={24} fill={star <= newRating ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  Nhận xét chi tiết
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Chia sẻ cảm nhận về phom dáng, chất vải..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>

              {user ? (
                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className="btn btn-primary btn-block"
                  style={{ padding: '0.85rem' }}
                >
                  {reviewSubmitting ? 'Đang gửi...' : 'Gửi Đánh Giá'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="btn btn-secondary btn-block"
                  style={{ padding: '0.85rem' }}
                >
                  Đăng Nhập Để Gửi Đánh Giá
                </button>
              )}
            </form>
          </div>

        </div>
      </section>

    </div>
  );
};
