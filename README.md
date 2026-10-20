# ⚜️ L'ATELIER & CO. — Haute Couture & Contemporary Tailoring
> **Đồ án môn học:** Xây dựng Website Thương mại Điện tử Thời trang May đo Cao cấp  
> **Kiến trúc:** Client - Server phân tầng độc lập (RESTful API, Stateless JWT)

---

## 📖 Giới thiệu Dự án

**L'ATELIER & CO.** là nền tảng thương mại điện tử chuyên biệt dành cho thương hiệu thời trang thiết kế may đo cao cấp (Haute Couture & Contemporary Tailoring). Website được xây dựng theo phong cách thiết kế **Hiện đại - Tối giản sang trọng (Modern Minimalist Luxury)** kết hợp bảng màu Champagne Gold / Charcoal Dark, hiệu ứng thị giác Glassmorphism và tối ưu hóa typography chuẩn tiếng Việt (Playfair Display & Be Vietnam Pro).

Dự án hiện thực hóa trọn vẹn quy trình nghiệp vụ bán lẻ thời trang may đo trực tuyến từ duyệt bộ sưu tập, chọn biến thể đa thuộc tính (Màu sắc, Kích cỡ, Tồn kho độc lập), giỏ hàng trượt, áp dụng mã giảm giá, đặt hàng cho đến thanh toán trực tuyến qua cổng VNPay Sandbox và cổng quản trị vận hành Admin Portal chuyên nghiệp.

---

## 🛠️ Công nghệ Sử dụng

### 1. Phía Máy chủ (Backend Server)
- **Ngôn ngữ:** Java 21 LTS
- **Framework:** Spring Boot 3.4.3
- **Bảo mật & Phân quyền:** Spring Security 6, JSON Web Token (JWT với thuật toán ký số HMAC-SHA512), Password Encoder (BCrypt)
- **Tầng dữ liệu:** Spring Data JPA, Hibernate ORM 6.6
- **Cơ sở dữ liệu:** MySQL 8.0 (14 bảng quan hệ, chuẩn hóa 3NF, bảng mã `utf8mb4_unicode_ci`)
- **Tài liệu API:** OpenAPI 3 / Swagger UI (`/swagger-ui/index.html`)

### 2. Phía Máy khách (Frontend Client)
- **Thư viện:** React 19 (Single Page Application - SPA)
- **Ngôn ngữ:** TypeScript (Strongly Typed)
- **Công cụ phát triển & Đóng gói:** Vite 8.x (Hot Module Replacement)
- **Thiết kế & Giao diện:** Vanilla CSS Luxury Design System, Responsive đa thiết bị
- **Biểu tượng:** Lucide React
- **Nghệ thuật chữ:** Playfair Display (Serif cao cấp) & Be Vietnam Pro (Sans-serif chuẩn tiếng Việt)

### 3. Tích hợp Ngoại vi
- **Cổng thanh toán:** VNPay Gateway Sandbox Simulation

---

## ✨ Tính năng Nổi bật

### 🛍️ Phân hệ Khách hàng (Customer Storefront)
- **Trang chủ & Banner thời trang:** Trưng bày các bộ sưu tập giới hạn (Capsule Collection) với hình ảnh chất lượng cao.
- **Bộ lọc sản phẩm đa tiêu chí:** Lọc theo danh mục thời trang, mức giá trượt, thương hiệu và tìm kiếm từ khóa thông minh.
- **Chi tiết sản phẩm & Biến thể may đo:** 
  - Chọn nút màu tròn (Color Swatches) tự động chuyển đổi ảnh góc chụp theo màu tương ứng.
  - Chọn kích cỡ (Size S, M, L) hiển thị tình trạng tồn kho thời gian thực.
  - Hiển thị chất liệu vải thượng hạng (Cashmere, Lụa tơ tằm, Cotton Poplin) và hướng dẫn bảo quản đồ may đo.
- **Túi mua sắm trượt (Cart Drawer):** Thêm nhanh, tăng/giảm số lượng có kiểm tra tồn kho, xóa sản phẩm; hỗ trợ lưu giỏ hàng cho cả khách vãng lai (Session ID) và tài khoản đăng nhập.
- **Khuyến mãi Coupon:** Áp dụng mã ưu đãi (`LUXE10` giảm 10%, `VIP200K` giảm 200.000đ) tự động khấu trừ vào hóa đơn.
- **Đặt hàng & Thanh toán:**
  - Hỗ trợ thanh toán tiền mặt khi nhận hàng (COD).
  - Tích hợp cổng thanh toán trực tuyến VNPay Sandbox với mã giao dịch tự động.
  - Trang xác nhận đơn hàng (Order Confirmation) và lịch sử đơn hàng cá nhân (My Orders).

### 👔 Phân hệ Quản trị viên (Admin Portal)
- **Bảo mật phân quyền (RBAC):** Bảo vệ bằng mã JWT Token, kiểm tra quyền `ROLE_ADMIN`.
- **Bảng điều khiển (Dashboard Analytics):** Thống kê 5 chỉ số KPI then chốt (Tổng doanh thu, Tổng đơn hàng, Đơn chờ xử lý, Tổng thiết kế, Khách VIP); biểu đồ tỷ lệ trạng thái đơn; cảnh báo sản phẩm sắp hết hàng (< 10 sản phẩm).
- **Quản lý đơn hàng:** Danh sách đơn hàng phân trang, lọc theo trạng thái (`PENDING`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`), dropdown cập nhật tiến độ giao hàng tức thì.
- **Quản lý sản phẩm & Biến thể tồn kho:** Xem danh sách sản phẩm; Modal tạo mới thiết kế gồm thông tin gốc và danh sách các dòng biến thể màu/size/giá/tồn kho trong cùng 1 giao dịch.
- **Quản lý khách hàng:** Tra cứu danh sách thành viên trong hệ thống.

---

## 🔑 Tài khoản Mẫu Thử nghiệm

| Vai trò | Email đăng nhập | Mật khẩu | Chức năng kiểm thử |
|:---|:---|:---|:---|
| **Quản Trị Viên (Admin)** | `admin@luxeatelier.com` | `admin123` | Toàn quyền truy cập Admin Portal, Dashboard, Quản lý đơn & sản phẩm |
| **Khách Hàng (Customer)** | `customer@gmail.com` | `customer123` | Mua sắm, giỏ hàng, áp mã giảm giá, thanh toán VNPay, xem đơn hàng |

*(Hệ thống hỗ trợ 2 nút bấm tiện ích `[Admin]` và `[Khách Hàng]` ngay trên modal Đăng nhập để tự động điền tài khoản).*

---

## 🚀 Hướng dẫn Cài đặt & Khởi chạy

### 1. Yêu cầu Môi trường
- **Java:** JDK 21 trở lên
- **Node.js:** v18 trở lên (khuyến nghị v20+)
- **MySQL:** MySQL Server 8.0 trở lên

### 2. Khởi tạo Cơ sở Dữ liệu
Mở MySQL Workbench hoặc terminal MySQL và chạy các tệp script trong thư mục `database/`:
```sql
CREATE DATABASE IF NOT EXISTS clothing_store CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE clothing_store;

-- Chạy file tạo bảng
SOURCE database/schema.sql;

-- Chạy file nạp dữ liệu mẫu
SOURCE database/seed.sql;
```

### 3. Cấu hình & Chạy Backend (Spring Boot)
Tệp cấu hình tại `backend/src/main/resources/application.yml`. Mặc định kết nối:
- `url: jdbc:mysql://localhost:3306/clothing_store`
- `username: root`
- `password: 123456` (hoặc đặt biến môi trường `MYSQL_PASSWORD`)

Khởi chạy máy chủ Backend:
```bash
cd backend
./mvnw spring-boot:run
```
Máy chủ Backend chạy tại: **http://localhost:8080**  
Swagger UI API Docs tại: **http://localhost:8080/swagger-ui/index.html**

### 4. Cấu hình & Chạy Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Trình duyệt mở tại: **http://localhost:5173**

---

## 📂 Cấu trúc Thư mục Dự án

```text
fashion-shop-website/
├── backend/                             # Máy chủ Spring Boot 3 (Java 21)
│   ├── src/main/java/com/example/clothingstore/
│   │   ├── address/                     # Quản lý địa chỉ giao hàng
│   │   ├── admin/                       # Nghiệp vụ Dashboard & Quản trị
│   │   ├── brand/                       # Thương hiệu thời trang
│   │   ├── cart/                        # Giỏ hàng & Cart Items
│   │   ├── category/                    # Danh mục thời trang
│   │   ├── common/                      # ApiResponse, PagedResponse, Exception Handler
│   │   ├── config/                      # WebSecurityConfig, DataInitializer
│   │   ├── coupon/                      # Mã giảm giá
│   │   ├── order/                       # Đơn hàng & Chi tiết đơn
│   │   ├── payment/                     # Cổng thanh toán VNPay
│   │   ├── product/                     # Sản phẩm, Biến thể, Thư viện ảnh
│   │   ├── review/                      # Nhận xét & Đánh giá
│   │   ├── security/                    # JWT Filter, Provider, UserDetails
│   │   └── user/                        # Xác thực, Tài khoản, Phân quyền
│   └── src/main/resources/application.yml
├── frontend/                            # Máy khách React 19 + TypeScript + Vite
│   ├── src/
│   │   ├── components/                  # Header, Footer, CartDrawer, AuthModal, VNPayModal...
│   │   ├── context/                     # AuthContext, CartContext, ToastContext
│   │   ├── pages/                       # HomePage, ShopPage, ProductDetailPage, CheckoutPage, AdminPage...
│   │   ├── services/                    # api.ts (Fetch API Client)
│   │   └── types/                       # Định nghĩa TypeScript Models
│   ├── index.html
│   └── vite.config.ts
├── database/                            # Kịch bản cơ sở dữ liệu MySQL
│   ├── schema.sql                       # Cấu trúc 14 bảng quan hệ chuẩn 3NF
│   └── seed.sql                         # Dữ liệu mẫu trang phục may đo & tài khoản
├── docs/                                # Tài liệu kỹ thuật
│   ├── api-specification.md             # Đặc tả RESTful API
│   ├── database-erd.md                  # Sơ đồ quan hệ thực thể
│   └── requirements.md                  # Yêu cầu bài toán
├── BAO_CAO_DO_AN_MON_HOC_FASHION_SHOP.md # Báo cáo đồ án môn học hoàn chỉnh (20-30 trang)
└── README.md
```

---

## 📄 Báo cáo Đồ án Môn học
Nội dung chi tiết toàn bộ báo cáo khoa học theo chuẩn quy định của trường (Font Times New Roman, cấu trúc Mở đầu, Chương 1, Chương 2 với 7 Use Case chi tiết & biểu đồ BCE/VOPC, Chương 3 với 19 ca kiểm thử và hướng dẫn chụp ảnh) được biên soạn đầy đủ tại:
👉 [BAO_CAO_DO_AN_MON_HOC_FASHION_SHOP.md](./BAO_CAO_DO_AN_MON_HOC_FASHION_SHOP.md)

---
*© 2026 L'ATELIER & CO. Đồ án môn học Công nghệ Thông tin / Kỹ thuật Phần mềm.*
