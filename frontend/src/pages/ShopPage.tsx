import React, { useEffect, useState } from 'react';
import { Filter, ArrowUpDown, X, Search } from 'lucide-react';
import { api } from '../services/api';
import { Brand, Category, ProductListDto } from '../types';

interface ShopPageProps {
  initialCategory?: number;
  initialKeyword?: string;
  onOpenProductDetail: (slug: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory,
  initialKeyword,
  onOpenProductDetail,
}) => {
  const [products, setProducts] = useState<ProductListDto[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<number | undefined>(undefined);
  const [keyword, setKeyword] = useState<string>(initialKeyword || '');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (initialKeyword) setKeyword(initialKeyword);
  }, [initialKeyword]);

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          api.getCategories(),
          api.getBrands(),
        ]);
        setCategories(catRes);
        setBrands(brandRes);
      } catch (err) {
        console.error('Error fetching categories/brands', err);
      }
    };
    fetchMeta();
  }, []);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        let minPrice: number | undefined;
        let maxPrice: number | undefined;

        if (priceRange === 'under1m') {
          maxPrice = 1000000;
        } else if (priceRange === '1m-2m') {
          minPrice = 1000000;
          maxPrice = 2000000;
        } else if (priceRange === 'above2m') {
          minPrice = 2000000;
        }

        const res = await api.getProducts({
          categoryId: selectedCategory,
          brandId: selectedBrand,
          keyword: keyword.trim() || undefined,
          minPrice,
          maxPrice,
          sortBy,
          size: 40,
        });

        setProducts(res.content);
      } catch (err) {
        console.error('Error loading products', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [selectedCategory, selectedBrand, keyword, priceRange, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory(undefined);
    setSelectedBrand(undefined);
    setKeyword('');
    setPriceRange('all');
    setSortBy('newest');
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '6rem' }}>
      
      {/* Header & Title */}
      <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 600 }}>
          CATALOG THỜI TRANG CAO CẤP
        </span>
        <h1 style={{ fontSize: '2.8rem', marginTop: '0.25rem' }}>
          Bộ Sưu Tập Thiết Kế
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
          Được chế tác với các chuẩn mực may đo tinh xảo từ các thương hiệu thời trang độc quyền.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '3rem', alignItems: 'start' }}>
        
        {/* LEFT SIDEBAR FILTERS */}
        <aside style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={18} /> Bộ Lọc
            </h3>
            <button
              onClick={handleResetFilters}
              style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textDecoration: 'underline' }}
            >
              Đặt lại
            </button>
          </div>

          {/* Search in Catalog */}
          <div style={{ marginBottom: '1.75rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Tìm kiếm
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Từ khóa, chất liệu..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ width: '100%', paddingLeft: '2.25rem', fontSize: '0.85rem' }}
              />
              <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              {keyword && (
                <button
                  onClick={() => setKeyword('')}
                  style={{ position: 'absolute', right: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Categories Filter */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Danh mục
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                onClick={() => setSelectedCategory(undefined)}
                style={{
                  textAlign: 'left',
                  fontSize: '0.85rem',
                  color: selectedCategory === undefined ? 'var(--color-dark)' : 'var(--color-text-secondary)',
                  fontWeight: selectedCategory === undefined ? 700 : 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.25rem 0'
                }}
              >
                <span>Tất cả danh mục</span>
                {selectedCategory === undefined && <span>•</span>}
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  style={{
                    textAlign: 'left',
                    fontSize: '0.85rem',
                    color: selectedCategory === c.id ? 'var(--color-dark)' : 'var(--color-text-secondary)',
                    fontWeight: selectedCategory === c.id ? 700 : 400,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.25rem 0'
                  }}
                >
                  <span>{c.name}</span>
                  {selectedCategory === c.id && <span>•</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Brands Filter */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Thương hiệu
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                onClick={() => setSelectedBrand(undefined)}
                style={{
                  textAlign: 'left',
                  fontSize: '0.85rem',
                  color: selectedBrand === undefined ? 'var(--color-dark)' : 'var(--color-text-secondary)',
                  fontWeight: selectedBrand === undefined ? 700 : 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.25rem 0'
                }}
              >
                <span>Tất cả nhà mốt</span>
                {selectedBrand === undefined && <span>•</span>}
              </button>
              {brands.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBrand(b.id)}
                  style={{
                    textAlign: 'left',
                    fontSize: '0.85rem',
                    color: selectedBrand === b.id ? 'var(--color-dark)' : 'var(--color-text-secondary)',
                    fontWeight: selectedBrand === b.id ? 700 : 400,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.25rem 0'
                  }}
                >
                  <span>{b.name}</span>
                  {selectedBrand === b.id && <span>•</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Khoảng giá
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { id: 'all', label: 'Tất cả mức giá' },
                { id: 'under1m', label: 'Dưới 1.000.000 đ' },
                { id: '1m-2m', label: '1.000.000 đ - 2.000.000 đ' },
                { id: 'above2m', label: 'Trên 2.000.000 đ' },
              ].map((p) => (
                <label key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="priceRange"
                    checked={priceRange === p.id}
                    onChange={() => setPriceRange(p.id)}
                  />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>
          </div>

        </aside>

        {/* RIGHT MAIN CATALOG */}
        <main>
          {/* Top Bar: Count & Sort */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)'
          }}>
            <div style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
              Hiển thị <strong>{products.length}</strong> thiết kế phù hợp
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Sắp xếp:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
              >
                <option value="newest">Mới Nhất</option>
                <option value="price_asc">Giá Thấp Đến Cao</option>
                <option value="price_desc">Giá Cao Đến Thấp</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '6rem 0', color: 'var(--color-text-muted)' }}>
              Đang tải danh sách thiết kế...
            </div>
          ) : products.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '6rem 2rem',
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Không tìm thấy sản phẩm phù hợp</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                Vui lòng thử thay đổi tiêu chí lọc hoặc từ khóa tìm kiếm.
              </p>
              <button onClick={handleResetFilters} className="btn btn-secondary">
                Xóa Bộ Lọc
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem',
            }}>
              {products.map((product) => (
                <div
                  key={product.id}
                  className="product-card"
                  onClick={() => onOpenProductDetail(product.slug)}
                  style={{ cursor: 'pointer' }}
                >
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

                  <div className="product-card-info">
                    <div className="product-card-brand">{product.brandName || "L'ATELIER"}</div>
                    <h3 className="product-card-title">{product.name}</h3>

                    {/* Available color and size tags */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.4rem 0 0.85rem' }}>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        {product.availableColors?.map((col, idx) => (
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
        </main>
      </div>

    </div>
  );
};
