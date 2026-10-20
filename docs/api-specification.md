# ĐẶC TẢ TÀI LIỆU REST API (API SPECIFICATION)

Base URL: `http://localhost:8080/api/v1`

---

## 1. Authentication & Users (`/auth`, `/users`)
* `POST /auth/register`: Đăng ký tài khoản khách hàng mới.
* `POST /auth/login`: Đăng nhập, trả về JWT Token và thông tin user.
* `GET /auth/me`: Lấy thông tin user hiện tại (yêu cầu Bearer Token).
* `GET /users/addresses`: Lấy danh sách địa chỉ giao hàng của user.
* `POST /users/addresses`: Thêm địa chỉ mới.
* `PUT /users/addresses/{id}/default`: Đặt làm địa chỉ mặc định.

---

## 2. Danh mục & Thương hiệu (`/categories`, `/brands`)
* `GET /categories`: Danh sách danh mục sản phẩm đang hoạt động.
* `GET /categories/{id}`: Chi tiết danh mục.
* `GET /brands`: Danh sách thương hiệu thời trang.

---

## 3. Sản phẩm & Biến thể (`/products`)
* `GET /products`: Danh sách sản phẩm có phân trang, lọc theo:
  - `categoryId`: Lọc theo danh mục.
  - `brandId`: Lọc theo thương hiệu.
  - `keyword`: Tìm kiếm tên, mô tả.
  - `minPrice`, `maxPrice`: Lọc khoảng giá.
  - `size`, `color`: Lọc theo kích cỡ, màu sắc.
  - `featured`: Lấy sản phẩm nổi bật (`true`/`false`).
  - `sortBy`: `newest`, `price_asc`, `price_desc`.
* `GET /products/{id}`: Chi tiết sản phẩm kèm danh sách biến thể (`variants`) và thư viện ảnh (`images`).
* `GET /products/slug/{slug}`: Chi tiết sản phẩm theo slug thân thiện SEO.
* `GET /products/{id}/reviews`: Danh sách đánh giá của sản phẩm.
* `POST /products/{id}/reviews`: Gửi đánh giá cho sản phẩm (Cần Auth).

---

## 4. Giỏ hàng (`/cart`)
* `GET /cart`: Lấy thông tin giỏ hàng hiện tại (theo User JWT hoặc Session ID).
* `POST /cart/items`: Thêm sản phẩm biến thể vào giỏ (`variantId`, `quantity`).
* `PUT /cart/items/{itemId}`: Cập nhật số lượng của mục trong giỏ.
* `DELETE /cart/items/{itemId}`: Xóa sản phẩm khỏi giỏ.
* `DELETE /cart`: Làm trống giỏ hàng.

---

## 5. Mã giảm giá (`/coupons`)
* `POST /coupons/apply`: Kiểm tra tính hợp lệ của mã giảm giá cho đơn hàng (mã code, giá trị đơn tạm tính). Trả về số tiền được giảm.

---

## 6. Đơn hàng & Thanh toán (`/orders`, `/payments`)
* `POST /orders`: Tạo đơn hàng mới:
  - Payload: thông tin khách, địa chỉ giao hàng, danh sách item (hoặc lấy từ giỏ), phương thức thanh toán (`COD`, `VNPAY`), mã voucher.
  - Backend kiểm tra tồn kho, trừ kho, tính giá chính xác và tạo Payment record.
* `GET /orders/my-orders`: Danh sách đơn hàng của khách hàng đang đăng nhập.
* `GET /orders/{orderCode}`: Chi tiết đơn hàng theo mã đơn (`ORD-...`).
* `POST /payments/create-url`: Khởi tạo liên kết thanh toán trực tuyến (cho cổng VNPay/MoMo Sandbox).
* `GET /payments/vnpay-callback`: Xử lý kết quả trả về từ cổng thanh toán, đối soát chữ ký điện tử và cập nhật trạng thái đơn sang `PAID`/`CONFIRMED`.

---

## 7. Quản trị viên (`/admin`) - Yêu cầu quyền `ROLE_ADMIN`
* `GET /admin/dashboard/stats`: Thống kê tổng doanh thu, số đơn hàng, tổng sản phẩm, khách hàng, đơn chờ xử lý.
* `GET /admin/dashboard/revenue-chart`: Doanh thu theo tháng/ngày.
* `GET /admin/products`: Danh sách sản phẩm quản trị (kèm tồn kho tổng).
* `POST /admin/products`: Tạo sản phẩm mới kèm các biến thể (SKU, Size, Color, Stock, Price).
* `PUT /admin/products/{id}`: Cập nhật sản phẩm & biến thể.
* `DELETE /admin/products/{id}`: Xóa mềm hoặc ẩn sản phẩm.
* `GET /admin/orders`: Danh sách tất cả đơn hàng kèm phân trang, lọc trạng thái.
* `PUT /admin/orders/{id}/status`: Cập nhật trạng thái đơn hàng (`PENDING`, `CONFIRMED`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`).
* `GET /admin/coupons`: Danh sách mã giảm giá.
* `POST /admin/coupons`: Tạo mã giảm giá mới.
* `GET /admin/users`: Danh sách tài khoản người dùng và phân quyền.
