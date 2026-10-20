import React, { useEffect, useState } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Package,
  Clock,
  Users,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Tag,
  DollarSign,
  Search,
  Filter,
  Plus,
  X,
  Trash2,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { api } from '../services/api';
import {
  DashboardStats,
  Order,
  ProductListDto,
  User,
  Category,
  Brand,
  CreateProductRequest
} from '../types';

interface AdminPortalProps {
  user: User | null;
  onNavigate: (page: string) => void;
  onViewOrder: (order: Order) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ user, onNavigate, onViewOrder }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'coupons' | 'customers'>('dashboard');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<ProductListDto[]>([]);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderFilter, setOrderFilter] = useState<string>('');
  const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null);

  // Add Product Modal State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [submittingProduct, setSubmittingProduct] = useState(false);
  const [productFeedback, setProductFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const defaultVariants = [
    { colorName: 'Đen Obsidian', colorCode: '#111111', size: 'S', price: '', stockQuantity: 20 },
    { colorName: 'Đen Obsidian', colorCode: '#111111', size: 'M', price: '', stockQuantity: 25 },
    { colorName: 'Trắng Ngà Ivory', colorCode: '#F8F6F0', size: 'S', price: '', stockQuantity: 15 },
  ];

  const [productForm, setProductForm] = useState({
    name: '',
    categoryId: 1,
    brandId: 1,
    basePrice: '',
    originalPrice: '',
    material: '',
    careInstructions: '',
    description: '',
    isFeatured: false,
    primaryImageUrl: '',
    additionalImages: '',
    variants: defaultVariants
  });

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, ordersData, prodData, usersData, catsData, brandsData] = await Promise.all([
        api.getDashboardStats().catch(err => { console.error('Stats error:', err); return null; }),
        api.getAdminOrders(orderFilter || undefined).catch(err => { console.error('Orders error:', err); return { content: [] }; }),
        api.getProducts({ size: 100 }).catch(err => { console.error('Products error:', err); return { content: [], totalElements: 0, totalPages: 0 }; }),
        api.getAdminUsers().catch(err => { console.error('Users error:', err); return []; }),
        api.getCategories().catch(err => { console.error('Categories error:', err); return []; }),
        api.getBrands().catch(err => { console.error('Brands error:', err); return []; }),
      ]);
      if (statsData) setStats(statsData);
      if (ordersData?.content) setOrders(ordersData.content);
      if (prodData?.content) setProducts(prodData.content);
      if (usersData) setUsersList(usersData);
      if (catsData) setCategories(catsData);
      if (brandsData) setBrands(brandsData);
      if (catsData && catsData.length > 0) setProductForm(prev => ({ ...prev, categoryId: catsData[0].id }));
      if (brandsData && brandsData.length > 0) setProductForm(prev => ({ ...prev, brandId: brandsData[0].id }));
    } catch (err) {
      console.error('Error fetching admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [orderFilter]);

  const handleUpdateStatus = async (orderId: number, newStatus: string) => {
    setUpdatingOrderId(orderId);
    try {
      await api.updateOrderStatus(orderId, newStatus);
      // Refresh orders
      const ordersData = await api.getAdminOrders(orderFilter || undefined);
      setOrders(ordersData.content);
      const updatedStats = await api.getDashboardStats();
      setStats(updatedStats);
    } catch (err: any) {
      alert(err.message || 'Lỗi khi cập nhật trạng thái');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleAddVariantRow = () => {
    setProductForm(prev => ({
      ...prev,
      variants: [
        ...prev.variants,
        { colorName: 'Đen Obsidian', colorCode: '#111111', size: 'L', price: prev.basePrice, stockQuantity: 20 }
      ]
    }));
  };

  const handleRemoveVariantRow = (index: number) => {
    setProductForm(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const handleVariantChange = (index: number, field: string, value: any) => {
    setProductForm(prev => {
      const updated = [...prev.variants];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, variants: updated };
    });
  };

  const handleCreateProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProductFeedback(null);

    if (!productForm.name.trim()) {
      setProductFeedback({ type: 'error', message: 'Vui lòng nhập tên thiết kế sản phẩm' });
      return;
    }
    if (!productForm.basePrice || Number(productForm.basePrice) <= 0) {
      setProductFeedback({ type: 'error', message: 'Vui lòng nhập giá niêm yết hợp lệ' });
      return;
    }
    if (!productForm.primaryImageUrl.trim()) {
      setProductFeedback({ type: 'error', message: 'Vui lòng nhập link hình ảnh chính cho sản phẩm' });
      return;
    }
    if (productForm.variants.length === 0) {
      setProductFeedback({ type: 'error', message: 'Vui lòng khai báo ít nhất 1 biến thể size/màu sắc' });
      return;
    }

    setSubmittingProduct(true);
    try {
      const addImages = productForm.additionalImages
        .split('\n')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const payload: CreateProductRequest = {
        name: productForm.name.trim(),
        categoryId: Number(productForm.categoryId),
        brandId: Number(productForm.brandId),
        basePrice: Number(productForm.basePrice),
        originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : undefined,
        material: productForm.material.trim() || undefined,
        careInstructions: productForm.careInstructions.trim() || undefined,
        description: productForm.description.trim() || undefined,
        isFeatured: productForm.isFeatured,
        primaryImageUrl: productForm.primaryImageUrl.trim(),
        additionalImages: addImages,
        variants: productForm.variants.map(v => ({
          colorName: v.colorName,
          colorCode: v.colorCode,
          size: v.size,
          price: v.price ? Number(v.price) : Number(productForm.basePrice),
          stockQuantity: Number(v.stockQuantity) || 0,
        }))
      };

      await api.createProduct(payload);
      setProductFeedback({ type: 'success', message: 'Thêm thiết kế sản phẩm mới thành công!' });

      // Refresh list
      const prodData = await api.getProducts({ size: 100 });
      setProducts(prodData.content);
      const statsData = await api.getDashboardStats();
      setStats(statsData);

      setTimeout(() => {
        setIsAddProductOpen(false);
        setProductFeedback(null);
        setProductForm(prev => ({
          ...prev,
          name: '',
          basePrice: '',
          originalPrice: '',
          material: '',
          careInstructions: '',
          description: '',
          primaryImageUrl: '',
          additionalImages: '',
          isFeatured: false,
          variants: defaultVariants
        }));
      }, 1200);

    } catch (err: any) {
      console.error(err);
      setProductFeedback({ type: 'error', message: err.message || 'Không thể tạo sản phẩm. Vui lòng thử lại.' });
    } finally {
      setSubmittingProduct(false);
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  if (!user || user.role !== 'ROLE_ADMIN') {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '8rem 0' }}>
        <ShieldCheck size={48} style={{ color: 'var(--color-danger)', margin: '0 auto 1rem' }} />
        <h2>Quyền Truy Cập Bị Giới Hạn</h2>
        <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem', marginBottom: '2rem' }}>
          Bạn cần đăng nhập bằng tài khoản Quản Trị Viên (Admin) để truy cập chức năng này.
        </p>
        <button onClick={() => onNavigate('home')} className="btn btn-primary">
          Về Trang Chủ
        </button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F6F5F2', minHeight: '90vh', paddingBottom: '6rem' }}>
      
      {/* Admin Sub-Header */}
      <div style={{ backgroundColor: 'var(--color-dark)', color: '#FFFFFF', padding: '1.75rem 0', borderBottom: '1px solid var(--color-dark-border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="badge badge-gold">Quản Trị Hệ Thống</span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>L'ATELIER Backoffice v2.6</span>
            </div>
            <h1 style={{ color: '#FFFFFF', fontSize: '2rem', marginTop: '0.25rem' }}>
              Bảng Điều Khiển Quản Trị Viên
            </h1>
          </div>

          <button
            onClick={fetchDashboardData}
            className="btn btn-secondary"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              fontSize: '0.8rem',
              padding: '0.6rem 1.25rem'
            }}
          >
            <RefreshCw size={15} /> Làm Mới Dữ Liệu
          </button>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2rem' }}>
        
        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid var(--color-border)',
          marginBottom: '2rem',
          overflowX: 'auto'
        }}>
          {[
            { id: 'dashboard', label: 'Tổng Quan (Dashboard)', icon: TrendingUp },
            { id: 'orders', label: `Quản Lý Đơn Hàng (${orders.length})`, icon: Package },
            { id: 'products', label: `Sản Phẩm & Tồn Kho (${products.length})`, icon: Tag },
            { id: 'customers', label: `Khách Hàng (${usersList.length})`, icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '0.85rem 1.5rem',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  borderBottom: isActive ? '3px solid var(--color-dark)' : '3px solid transparent',
                  color: isActive ? 'var(--color-dark)' : 'var(--color-text-secondary)',
                  backgroundColor: 'transparent',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={17} /> {tab.label}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '6rem 0', color: 'var(--color-text-muted)' }}>
            Đang tổng hợp dữ liệu hệ thống...
          </div>
        ) : (
          <>
            {/* TAB 1: DASHBOARD OVERVIEW */}
            {activeTab === 'dashboard' && stats && (
              <div>
                {/* 5 KPI Metric Cards */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                  gap: '1.25rem',
                  marginBottom: '2.5rem'
                }}>
                  <div style={{
                    backgroundColor: 'var(--color-surface)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-subtle)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-gold)', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>TỔNG DOANH THU</span>
                      <DollarSign size={20} />
                    </div>
                    <div style={{ fontSize: '1.7rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {formatCurrency(stats.totalRevenue)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-success)', marginTop: '0.35rem' }}>
                      ↑ Doanh thu thực tế (đã trừ hủy)
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: 'var(--color-surface)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-subtle)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-dark)', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>TỔNG ĐƠN HÀNG</span>
                      <Package size={20} />
                    </div>
                    <div style={{ fontSize: '1.7rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {stats.totalOrders}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
                      Tất cả các kênh
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: 'var(--color-surface)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-subtle)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-warning)', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>ĐƠN CHỜ TIẾP NHẬN</span>
                      <Clock size={20} />
                    </div>
                    <div style={{ fontSize: '1.7rem', fontWeight: 700, color: 'var(--color-warning)' }}>
                      {stats.pendingOrders}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
                      Cần xác nhận sớm
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: 'var(--color-surface)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-subtle)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-dark)', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>TỔNG THIẾT KẾ</span>
                      <Tag size={20} />
                    </div>
                    <div style={{ fontSize: '1.7rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {stats.totalProducts}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
                      Đang niêm yết
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: 'var(--color-surface)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-subtle)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-dark)', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>KHÁCH HÀNG VIP</span>
                      <Users size={20} />
                    </div>
                    <div style={{ fontSize: '1.7rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {stats.totalCustomers}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
                      Tài khoản đã kích hoạt
                    </div>
                  </div>
                </div>

                {/* Low Stock Alerts */}
                {stats.lowStockVariants && stats.lowStockVariants.length > 0 && (
                  <div style={{
                    backgroundColor: 'var(--color-surface)',
                    padding: '1.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-subtle)',
                    marginBottom: '2.5rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-warning)', fontWeight: 600, marginBottom: '1rem' }}>
                      <AlertTriangle size={20} />
                      <span style={{ fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>
                        Cảnh Báo Biến Thể Tồn Kho Thấp ({stats.lowStockVariants.length} mặt hàng)
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                      {stats.lowStockVariants.map((v) => (
                        <div
                          key={v.id}
                          style={{
                            padding: '1rem',
                            backgroundColor: 'var(--color-bg)',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--color-border)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{v.sku}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                              Màu: {v.colorName} | Size: {v.size}
                            </div>
                          </div>
                          <span className="badge badge-danger">
                            Còn {v.stockQuantity} SP
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Orders Overview */}
                <div style={{
                  backgroundColor: 'var(--color-surface)',
                  padding: '1.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-subtle)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.25rem' }}>Đơn Hàng Gần Đây Cần Xử Lý</h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      style={{ fontSize: '0.85rem', color: 'var(--color-gold-hover)', fontWeight: 600 }}
                    >
                      Xem tất cả đơn hàng →
                    </button>
                  </div>

                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                          <th style={{ padding: '0.75rem 1rem' }}>Mã Đơn</th>
                          <th style={{ padding: '0.75rem 1rem' }}>Khách Hàng</th>
                          <th style={{ padding: '0.75rem 1rem' }}>Số Điện Thoại</th>
                          <th style={{ padding: '0.75rem 1rem' }}>Tổng Tiền</th>
                          <th style={{ padding: '0.75rem 1rem' }}>Thanh Toán</th>
                          <th style={{ padding: '0.75rem 1rem' }}>Trạng Thái Đơn</th>
                          <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Thao Tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.recentOrders?.map((ord) => (
                          <tr key={ord.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                            <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{ord.orderCode}</td>
                            <td style={{ padding: '0.85rem 1rem' }}>{ord.customerName}</td>
                            <td style={{ padding: '0.85rem 1rem' }}>{ord.customerPhone}</td>
                            <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{formatCurrency(ord.totalAmount)}</td>
                            <td style={{ padding: '0.85rem 1rem' }}>
                              <span className={`badge ${ord.paymentStatus === 'COMPLETED' ? 'badge-success' : 'badge-warning'}`}>
                                {ord.paymentMethod} - {ord.paymentStatus === 'COMPLETED' ? 'Đã thu' : 'Chưa thu'}
                              </span>
                            </td>
                            <td style={{ padding: '0.85rem 1rem' }}>
                              <select
                                value={ord.orderStatus}
                                onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                                disabled={updatingOrderId === ord.id}
                                style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)' }}
                              >
                                <option value="PENDING">Chờ xử lý (PENDING)</option>
                                <option value="CONFIRMED">Đã xác nhận (CONFIRMED)</option>
                                <option value="PROCESSING">Đang đóng gói (PROCESSING)</option>
                                <option value="SHIPPED">Đang giao hàng (SHIPPED)</option>
                                <option value="DELIVERED">Đã giao thành công (DELIVERED)</option>
                                <option value="CANCELLED">Hủy đơn (CANCELLED)</option>
                              </select>
                            </td>
                            <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                              <button
                                onClick={() => onViewOrder(ord)}
                                style={{ color: 'var(--color-dark)', textDecoration: 'underline', fontSize: '0.8rem' }}
                              >
                                Xem Chi Tiết
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ORDERS MANAGEMENT */}
            {activeTab === 'orders' && (
              <div style={{
                backgroundColor: 'var(--color-surface)',
                padding: '2rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-subtle)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <h3 style={{ fontSize: '1.3rem' }}>Quản Lý Đơn Hàng Chi Tiết</h3>

                  {/* Filter by status */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Filter size={16} />
                    <select
                      value={orderFilter}
                      onChange={(e) => setOrderFilter(e.target.value)}
                      style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
                    >
                      <option value="">Tất cả trạng thái</option>
                      <option value="PENDING">Chờ xử lý (PENDING)</option>
                      <option value="CONFIRMED">Đã xác nhận (CONFIRMED)</option>
                      <option value="PROCESSING">Đang chuẩn bị (PROCESSING)</option>
                      <option value="SHIPPED">Đang vận chuyển (SHIPPED)</option>
                      <option value="DELIVERED">Đã giao thành công (DELIVERED)</option>
                      <option value="CANCELLED">Đã hủy (CANCELLED)</option>
                    </select>
                  </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                        <th style={{ padding: '0.75rem 1rem' }}>Mã Đơn</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Khách Hàng</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Địa Chỉ Nhận</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Số Tiền</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Phương Thức</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Chuyển Trạng Thái</th>
                        <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((ord) => (
                        <tr key={ord.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                          <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{ord.orderCode}</td>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <div>{ord.customerName}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{ord.customerPhone}</div>
                          </td>
                          <td style={{ padding: '0.85rem 1rem', maxWidth: '240px', fontSize: '0.82rem' }}>
                            {ord.shippingAddress}
                          </td>
                          <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{formatCurrency(ord.totalAmount)}</td>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <span className={`badge ${ord.paymentStatus === 'COMPLETED' ? 'badge-success' : 'badge-warning'}`}>
                              {ord.paymentMethod}
                            </span>
                          </td>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <select
                              value={ord.orderStatus}
                              onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                              disabled={updatingOrderId === ord.id}
                              style={{ padding: '0.4rem 0.65rem', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)' }}
                            >
                              <option value="PENDING">Chờ xử lý (PENDING)</option>
                              <option value="CONFIRMED">Đã xác nhận (CONFIRMED)</option>
                              <option value="PROCESSING">Đang đóng gói (PROCESSING)</option>
                              <option value="SHIPPED">Đang giao hàng (SHIPPED)</option>
                              <option value="DELIVERED">Đã giao thành công (DELIVERED)</option>
                              <option value="CANCELLED">Hủy đơn (CANCELLED)</option>
                            </select>
                          </td>
                          <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                            <button
                              onClick={() => onViewOrder(ord)}
                              style={{ color: 'var(--color-dark)', textDecoration: 'underline', fontSize: '0.8rem' }}
                            >
                              Xem Chi Tiết
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: PRODUCTS & INVENTORY */}
            {activeTab === 'products' && (
              <div style={{
                backgroundColor: 'var(--color-surface)',
                padding: '2rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-subtle)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.3rem' }}>Danh Sách Thiết Kế & Tồn Kho Chi Tiết</h3>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                      Tổng cộng: <strong>{products.length}</strong> sản phẩm trong bộ sưu tập
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setProductFeedback(null);
                      setIsAddProductOpen(true);
                    }}
                    className="btn btn-primary"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.65rem 1.25rem',
                      fontSize: '0.82rem',
                      letterSpacing: '0.08em'
                    }}
                  >
                    <Plus size={16} /> THÊM SẢN PHẨM MỚI
                  </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                        <th style={{ padding: '0.75rem 1rem' }}>Hình Ảnh</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Tên Sản Phẩm</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Danh Mục</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Nhà Mốt</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Giá Niêm Yết</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Tồn Kho Tổng</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Kích Cỡ Có Sẵn</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <img
                              src={p.primaryImageUrl}
                              alt={p.name}
                              style={{ width: '48px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                            />
                          </td>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{p.name}</td>
                          <td style={{ padding: '0.75rem 1rem' }}>{p.categoryName}</td>
                          <td style={{ padding: '0.75rem 1rem' }}>{p.brandName}</td>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{formatCurrency(p.basePrice)}</td>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <span className={`badge ${p.totalStock <= 25 ? 'badge-warning' : 'badge-success'}`}>
                              {p.totalStock} chiếc
                            </span>
                          </td>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <div style={{ display: 'flex', gap: '0.25rem' }}>
                              {p.availableSizes?.map((s) => (
                                <span key={s} style={{ fontSize: '0.75rem', border: '1px solid var(--color-border)', padding: '0.1rem 0.4rem', borderRadius: '2px' }}>
                                  {s}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: CUSTOMERS */}
            {activeTab === 'customers' && (
              <div style={{
                backgroundColor: 'var(--color-surface)',
                padding: '2rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-subtle)'
              }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Danh Sách Khách Hàng VIP & Quản Trị Viên</h3>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                        <th style={{ padding: '0.75rem 1rem' }}>Họ Và Tên</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Email Đăng Ký</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Số Điện Thoại</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Vai Trò (Role)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersList.map((u) => (
                        <tr key={u.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                          <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{u.fullName}</td>
                          <td style={{ padding: '0.85rem 1rem' }}>{u.email}</td>
                          <td style={{ padding: '0.85rem 1rem' }}>{u.phone || 'Chưa cập nhật'}</td>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <span className={`badge ${u.role === 'ROLE_ADMIN' ? 'badge-gold' : 'badge-dark'}`}>
                              {u.role === 'ROLE_ADMIN' ? 'Quản Trị Viên (Admin)' : 'Khách Hàng (Customer)'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

      </div>

      {/* ADD PRODUCT MODAL */}
      {isAddProductOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.72)',
          backdropFilter: 'blur(6px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          overflowY: 'auto'
        }}>
          <div style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-sm)',
            width: '100%',
            maxWidth: '850px',
            maxHeight: '90vh',
            overflowY: 'auto',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '1.5rem 2rem',
              borderBottom: '1px solid var(--color-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'var(--color-background)'
            }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={20} style={{ color: 'var(--color-gold)' }} /> THÊM THIẾT KẾ SẢN PHẨM MỚI
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                  Tạo sản phẩm và khởi tạo ma trận tồn kho theo biến thể Màu sắc & Kích cỡ
                </p>
              </div>
              <button
                onClick={() => setIsAddProductOpen(false)}
                style={{
                  padding: '0.5rem',
                  borderRadius: '50%',
                  color: 'var(--color-text-muted)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Feedback Alert */}
            {productFeedback && (
              <div style={{
                padding: '1rem 2rem',
                backgroundColor: productFeedback.type === 'success' ? '#e6f7ec' : '#fdf2f2',
                color: productFeedback.type === 'success' ? '#157347' : '#bb2d3b',
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                {productFeedback.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                {productFeedback.message}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleCreateProductSubmit} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {/* Section 1: Basic Info */}
              <div>
                <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem', color: 'var(--color-gold)' }}>
                  1. Thông Tin Cơ Bản
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">Tên Sản Phẩm / Thiết Kế *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Áo Blazer Dạ Cashmere Signature..."
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Danh Mục Sản Phẩm *</label>
                    <select
                      value={productForm.categoryId}
                      onChange={(e) => setProductForm({ ...productForm, categoryId: Number(e.target.value) })}
                      className="form-control"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Thương Hiệu / Nhà Mốt *</label>
                    <select
                      value={productForm.brandId}
                      onChange={(e) => setProductForm({ ...productForm, brandId: Number(e.target.value) })}
                      className="form-control"
                    >
                      {brands.map((b) => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Giá Niêm Yết (VNĐ) *</label>
                    <input
                      type="number"
                      required
                      min="1000"
                      step="10000"
                      placeholder="Ví dụ: 1850000"
                      value={productForm.basePrice}
                      onChange={(e) => setProductForm({ ...productForm, basePrice: e.target.value })}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Giá Gốc Trước Giảm (VNĐ - tùy chọn)</label>
                    <input
                      type="number"
                      min="0"
                      step="10000"
                      placeholder="Ví dụ: 2200000"
                      value={productForm.originalPrice}
                      onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                      className="form-control"
                    />
                  </div>
                </div>

                <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={productForm.isFeatured}
                    onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                    style={{ cursor: 'pointer' }}
                  />
                  <label htmlFor="isFeatured" style={{ fontSize: '0.85rem', cursor: 'pointer' }}>
                    Gắn nhãn Thiết kế nổi bật (Featured Collection) trên trang chủ
                  </label>
                </div>
              </div>

              {/* Section 2: Details */}
              <div>
                <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem', color: 'var(--color-gold)' }}>
                  2. Chất Liệu & Hướng Dẫn
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Chất Liệu Cao Cấp</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: 100% Lụa Tơ Tằm Tự Nhiên / Wool Ý..."
                      value={productForm.material}
                      onChange={(e) => setProductForm({ ...productForm, material: e.target.value })}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Hướng Dẫn Bảo Quản</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Giặt khô chuyên dụng, không sấy nhiệt..."
                      value={productForm.careInstructions}
                      onChange={(e) => setProductForm({ ...productForm, careInstructions: e.target.value })}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">Mô Tả Thiết Kế Chi Tiết</label>
                    <textarea
                      rows={3}
                      placeholder="Mô tả phong cách, đường may tinh xảo, cảm hứng thiết kế..."
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Media */}
              <div>
                <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem', color: 'var(--color-gold)' }}>
                  3. Hình Ảnh Sản Phẩm
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">URL Ảnh Đại Diện Chính (Primary Image) *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://images.unsplash.com/photo-..."
                      value={productForm.primaryImageUrl}
                      onChange={(e) => setProductForm({ ...productForm, primaryImageUrl: e.target.value })}
                      className="form-control"
                    />
                  </div>

                  {productForm.primaryImageUrl && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.65rem 1rem', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                      <img
                        src={productForm.primaryImageUrl}
                        alt="Xem trước ảnh chính"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        style={{ width: '50px', height: '65px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                      />
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Xem trước ảnh đại diện chính</span>
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">URL Các Ảnh Chi Tiết Phụ (Mỗi dòng 1 link URL)</label>
                    <textarea
                      rows={2}
                      placeholder="https://images.unsplash.com/photo-detail-1...&#10;https://images.unsplash.com/photo-detail-2..."
                      value={productForm.additionalImages}
                      onChange={(e) => setProductForm({ ...productForm, additionalImages: e.target.value })}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Variants Matrix */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-gold)' }}>
                    4. Ma Trận Biến Thể & Số Lượng Tồn Kho
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddVariantRow}
                    className="btn"
                    style={{
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.8rem',
                      border: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <Plus size={14} /> Thêm Biến Thể
                  </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                        <th style={{ padding: '0.5rem', textAlign: 'left' }}>Tên Màu</th>
                        <th style={{ padding: '0.5rem', textAlign: 'left' }}>Mã Màu (HEX)</th>
                        <th style={{ padding: '0.5rem', textAlign: 'left' }}>Size</th>
                        <th style={{ padding: '0.5rem', textAlign: 'left' }}>Số Lượng Tồn</th>
                        <th style={{ padding: '0.5rem', textAlign: 'left' }}>Giá Biến Thể</th>
                        <th style={{ padding: '0.5rem', textAlign: 'center' }}>Xóa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productForm.variants.map((v, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                          <td style={{ padding: '0.4rem 0.5rem' }}>
                            <input
                              type="text"
                              value={v.colorName}
                              placeholder="Đen Obsidian"
                              onChange={(e) => handleVariantChange(idx, 'colorName', e.target.value)}
                              className="form-control"
                              style={{ padding: '0.35rem 0.5rem', fontSize: '0.82rem' }}
                            />
                          </td>
                          <td style={{ padding: '0.4rem 0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              <input
                                type="color"
                                value={v.colorCode}
                                onChange={(e) => handleVariantChange(idx, 'colorCode', e.target.value)}
                                style={{ width: '28px', height: '28px', padding: 0, border: 'none', cursor: 'pointer', borderRadius: '2px' }}
                              />
                              <input
                                type="text"
                                value={v.colorCode}
                                onChange={(e) => handleVariantChange(idx, 'colorCode', e.target.value)}
                                className="form-control"
                                style={{ width: '80px', padding: '0.35rem 0.5rem', fontSize: '0.82rem' }}
                              />
                            </div>
                          </td>
                          <td style={{ padding: '0.4rem 0.5rem' }}>
                            <select
                              value={v.size}
                              onChange={(e) => handleVariantChange(idx, 'size', e.target.value)}
                              className="form-control"
                              style={{ padding: '0.35rem 0.5rem', fontSize: '0.82rem' }}
                            >
                              <option value="XS">XS</option>
                              <option value="S">S</option>
                              <option value="M">M</option>
                              <option value="L">L</option>
                              <option value="XL">XL</option>
                              <option value="Freesize">Freesize</option>
                            </select>
                          </td>
                          <td style={{ padding: '0.4rem 0.5rem' }}>
                            <input
                              type="number"
                              min="0"
                              value={v.stockQuantity}
                              onChange={(e) => handleVariantChange(idx, 'stockQuantity', e.target.value)}
                              className="form-control"
                              style={{ width: '90px', padding: '0.35rem 0.5rem', fontSize: '0.82rem' }}
                            />
                          </td>
                          <td style={{ padding: '0.4rem 0.5rem' }}>
                            <input
                              type="number"
                              min="0"
                              step="10000"
                              placeholder={productForm.basePrice ? String(productForm.basePrice) : 'Mặc định'}
                              value={v.price}
                              onChange={(e) => handleVariantChange(idx, 'price', e.target.value)}
                              className="form-control"
                              style={{ width: '130px', padding: '0.35rem 0.5rem', fontSize: '0.82rem' }}
                            />
                          </td>
                          <td style={{ padding: '0.4rem 0.5rem', textAlign: 'center' }}>
                            <button
                              type="button"
                              onClick={() => handleRemoveVariantRow(idx)}
                              disabled={productForm.variants.length <= 1}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: productForm.variants.length <= 1 ? '#ccc' : 'var(--color-danger)',
                                cursor: productForm.variants.length <= 1 ? 'not-allowed' : 'pointer',
                                padding: '0.2rem'
                              }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Footer Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="btn"
                  style={{ padding: '0.75rem 1.75rem', border: '1px solid var(--color-border)' }}
                >
                  HỦY BỎ
                </button>
                <button
                  type="submit"
                  disabled={submittingProduct}
                  className="btn btn-primary"
                  style={{ padding: '0.75rem 2.25rem', letterSpacing: '0.08em' }}
                >
                  {submittingProduct ? 'ĐANG LƯU THIẾT KẾ...' : 'HOÀN TẤT & LƯU SẢN PHẨM'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
