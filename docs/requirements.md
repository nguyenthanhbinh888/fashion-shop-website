# YÊU CẦU HỆ THỐNG WEBSITE THỜI TRANG CAO CẤP (REQUIREMENTS SPECIFICATION)

## 1. Giới thiệu
Hệ thống là một giải pháp thương mại điện tử chuyên biệt cho ngành hàng thời trang may đo và thiết kế cao cấp, bao gồm hai phân hệ chính:
- **Khách hàng (Customer Storefront):** Trải nghiệm mua sắm sang trọng, mượt mà, trực quan, hỗ trợ chọn biến thể (size, màu sắc) thời gian thực và thanh toán đa kênh.
- **Quản trị viên (Admin Portal):** Quản lý tập trung sản phẩm, biến thể tồn kho, đơn hàng, khách hàng, chương trình khuyến mãi và phân tích doanh thu.

---

## 2. Yêu cầu chức năng (Functional Requirements)

### 2.1. Phân hệ Khách hàng (Customer)
1. **Trang chủ & Bộ sưu tập:**
   - Hero banner phong cách editorial cao cấp.
   - Danh mục sản phẩm nổi bật, sản phẩm mới, best seller.
   - Thương hiệu đối tác / Triết lý thiết kế (Brand Story).
2. **Tìm kiếm & Bộ lọc sản phẩm (Catalog):**
   - Tìm kiếm theo từ khóa (tên, mô tả, mã SKU).
   - Lọc đa tiêu chí: Danh mục, Thương hiệu, Khoảng giá, Kích cỡ (S, M, L, XL), Màu sắc.
   - Sắp xếp: Mới nhất, Giá tăng dần, Giá giảm dần, Bán chạy nhất.
3. **Chi tiết sản phẩm (Product Detail Page):**
   - Gallery ảnh sắc nét, phóng to ảnh khi hover.
   - Chọn màu sắc -> Cập nhật hình ảnh tương ứng.
   - Chọn kích cỡ -> Hiển thị trạng thái còn hàng / số lượng tồn kho khả dụng thời gian thực.
   - Thông tin chất liệu cao cấp và hướng dẫn bảo quản trang phục.
   - Đánh giá & nhận xét từ khách hàng đã mua sản phẩm.
4. **Giỏ hàng & Mini-Cart Drawer:**
   - Xem nhanh giỏ hàng dạng trượt (Slide-over drawer).
   - Thêm sản phẩm với biến thể cụ thể, cập nhật số lượng, xóa sản phẩm.
   - Kiểm tra tồn kho trước khi cho phép tăng số lượng.
5. **Thanh toán & Đặt hàng (Checkout):**
   - Nhập thông tin người nhận, địa chỉ giao hàng chi tiết.
   - Áp dụng mã giảm giá (Coupon voucher) kiểm tra điều kiện ngay lập tức.
   - Tùy chọn phương thức thanh toán:
     - **COD:** Thanh toán khi nhận hàng.
     - **Thanh toán trực tuyến (Online Payment Gateway):** Tích hợp cổng thanh toán trực tuyến (Sandbox VNPay / MoMo / Thẻ quốc tế).
   - Chốt đơn hàng an toàn với transaction ở Backend và tự động trừ kho.
6. **Lịch sử & Theo dõi đơn hàng (Order Tracking):**
   - Theo dõi tiến trình 5 bước: `PENDING` -> `CONFIRMED` -> `PROCESSING` -> `SHIPPED` -> `DELIVERED`.
   - Xem chi tiết hóa đơn, giá trị mua và sản phẩm đã nhận.
7. **Tài khoản cá nhân:**
   - Đăng ký, đăng nhập bảo mật qua JWT.
   - Quản lý sổ địa chỉ giao hàng.
   - Đổi mật khẩu, xem hồ sơ.

### 2.2. Phân hệ Quản trị viên (Admin Portal)
1. **Bảng điều khiển (Dashboard KPI):**
   - Tổng quan doanh thu theo thời gian, số lượng đơn hàng, số khách hàng mới, sản phẩm bán chạy.
   - Cảnh báo tồn kho thấp (Low Stock Alert).
2. **Quản lý Sản phẩm & Biến thể (Product & Variant Management):**
   - CRUD sản phẩm (thông tin chung, chất liệu, giá cơ sở, danh mục, thương hiệu).
   - Quản lý ma trận biến thể theo Màu sắc, Kích cỡ, Mã SKU, Giá bán riêng và Số lượng tồn kho.
   - Quản lý thư viện hình ảnh theo sản phẩm và màu sắc.
3. **Quản lý Đơn hàng (Order Management):**
   - Danh sách đơn hàng với bộ lọc trạng thái.
   - Cập nhật trạng thái đơn hàng (`PENDING`, `CONFIRMED`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`).
   - Cập nhật trạng thái thanh toán.
4. **Quản lý Danh mục & Thương hiệu:**
   - Thêm/sửa danh mục thời trang và thương hiệu.
5. **Quản lý Mã giảm giá (Coupons):**
   - Tạo mã giảm giá theo tỷ lệ % hoặc số tiền cố định, giới hạn lượt dùng, thời hạn hiệu lực.
6. **Quản lý Khách hàng & Phân quyền:**
   - Xem danh sách người dùng, kích hoạt/khóa tài khoản, nâng cấp quyền Admin.

---

## 3. Yêu cầu phi chức năng (Non-Functional Requirements)
1. **Hiệu năng & Tốc độ:**
   - Phản hồi API trung bình dưới 150ms trên local.
   - Lazy loading cho hình ảnh, tối ưu bundle qua Vite.
2. **Bảo mật & Toàn vẹn dữ liệu:**
   - Xác thực người dùng bằng JWT Token (Stateless).
   - Mật khẩu mã hóa BCrypt với cost factor tiêu chuẩn.
   - Tính toán giá tiền và kiểm tra số dư/tồn kho hoàn toàn tại Backend (Zero-Trust Frontend).
   - Database Transaction (`@Transactional`) với mức cô lập phù hợp khi tạo đơn hàng để tránh Over-selling (bán vượt tồn kho).
3. **Trải nghiệm người dùng & Thẩm mỹ:**
   - Thiết kế theo ngôn ngữ Modern Minimalist Luxury: sang trọng, đường nét dứt khoát, typography đẳng cấp.
   - Responsive hoàn hảo trên Mobile, Tablet và Desktop.
   - Phản hồi tương tác (feedback) tức thì cho mọi hành động: Toast thông báo, Loading skeleton, Empty state trực quan.
