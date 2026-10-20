# Xây dựng website bán quần áo trực tuyến

## 1. Tổng quan dự án

Xây dựng một website bán quần áo trực tuyến theo mô hình Frontend – Backend – Database tách biệt. Dự án cần dễ phát triển, dễ kiểm thử, dễ triển khai và có thể mở rộng thêm chức năng trong tương lai.

### Công nghệ chính

- **Backend:** Java, Spring Boot.
- **Frontend:** React, TypeScript, HTML, CSS, JavaScript.
- **Database:** MySQL.
- **Hosting:** Chưa quyết định; chọn sau khi xác định phạm vi và hoàn thiện bản đầu.
- **Quản lý mã nguồn:** Git và GitHub.
- **Build Backend:** Maven.
- **Build Frontend:** Vite.

## 2. Công nghệ và thư viện đề xuất

### Backend — Java + Spring Boot

Sử dụng Spring Boot để xây dựng REST API và xử lý nghiệp vụ.

Các công nghệ bổ trợ:

- Spring Web: xây dựng REST API.
- Spring Data JPA: thao tác dữ liệu.
- Hibernate: ORM.
- Spring Security: xác thực và phân quyền.
- Bean Validation: kiểm tra dữ liệu đầu vào.
- Maven: quản lý thư viện và build dự án.

### Frontend — React + TypeScript

Sử dụng React để xây dựng giao diện khách hàng và trang quản trị Admin. TypeScript giúp kiểm soát kiểu dữ liệu.

Các công nghệ bổ trợ:

- React Router: định tuyến trang.
- Axios: gọi REST API từ Backend.
- CSS hoặc Tailwind CSS: xây dựng giao diện.
- Vite: khởi tạo và build ứng dụng React.
- TypeScript: định nghĩa kiểu dữ liệu và giảm lỗi do sai kiểu.

HTML, CSS và JavaScript vẫn là nền tảng của giao diện. Khi sử dụng React với TypeScript, phần lớn mã giao diện sẽ nằm trong các file `.tsx`.

### Database — MySQL

MySQL dùng để lưu trữ:

- Tài khoản và thông tin người dùng.
- Địa chỉ giao hàng.
- Danh mục, thương hiệu và sản phẩm.
- Biến thể sản phẩm theo màu sắc và kích cỡ.
- Tồn kho.
- Giỏ hàng.
- Đơn hàng và chi tiết đơn hàng.
- Thanh toán.
- Mã giảm giá.
- Đánh giá sản phẩm.

Kết nối Backend với MySQL thông qua Spring Data JPA và Hibernate.

## 3. Các chức năng của hệ thống

Nên chia hệ thống thành ba nhóm: website khách hàng, trang quản trị Admin và nghiệp vụ thương mại điện tử.

### 3.1. Website dành cho khách hàng

- Trang chủ, banner và bộ sưu tập.
- Danh sách sản phẩm.
- Tìm kiếm sản phẩm.
- Lọc sản phẩm theo giá, thương hiệu và loại quần áo.
- Trang chi tiết sản phẩm.
- Hiển thị hình ảnh, màu sắc, kích cỡ và số lượng tồn kho.
- Giỏ hàng.
- Đặt hàng và nhập địa chỉ giao hàng.
- Theo dõi trạng thái đơn hàng.
- Lịch sử mua hàng.
- Đăng ký, đăng nhập và đăng xuất.
- Quản lý hồ sơ cá nhân.
- Đánh giá sản phẩm.
- Danh sách sản phẩm yêu thích.

### 3.2. Trang quản trị Admin

- Dashboard tổng quan doanh thu, đơn hàng và sản phẩm.
- Thêm, xem, sửa, xóa sản phẩm (CRUD).
- Quản lý danh mục và thương hiệu.
- Quản lý biến thể theo kích cỡ, màu sắc và tồn kho.
- Quản lý đơn hàng.
- Cập nhật trạng thái đơn hàng và giao hàng.
- Quản lý tài khoản khách hàng.
- Phân quyền Customer và Admin.
- Quản lý mã giảm giá và chương trình khuyến mãi.
- Báo cáo doanh thu.
- Thống kê sản phẩm bán chạy.

### 3.3. Nghiệp vụ thương mại điện tử

- Kiểm tra tồn kho trước khi đặt hàng.
- Tính giá sản phẩm, giảm giá và phí vận chuyển.
- Lưu lịch sử trạng thái đơn hàng.
- Quản lý trạng thái thanh toán.
- Hỗ trợ thanh toán khi nhận hàng (COD).
- Có thể tích hợp thanh toán trực tuyến ở giai đoạn sau.
- Bảo vệ API và kiểm soát quyền Customer/Admin.
- Xác thực dữ liệu đầu vào.
- Xử lý lỗi và ghi log.
- Dùng transaction phù hợp khi tạo đơn hàng và cập nhật tồn kho.

**Lưu ý quan trọng:** Không nên chỉ lưu tồn kho theo sản phẩm. Ví dụ, áo thun AT01 có màu đen, trắng và các size S, M, L. Mỗi tổ hợp màu sắc và kích cỡ cần được quản lý tồn kho riêng thông qua biến thể sản phẩm (product variant/SKU).

## 4. Kiến trúc tổng thể

```text
┌──────────────────────────────────────────────┐
│       FRONTEND — React + TypeScript          │
│       Website khách hàng + Trang Admin       │
└──────────────────────┬───────────────────────┘
                       │ HTTPS / REST API
                       ▼
┌──────────────────────────────────────────────┐
│          BACKEND — Java + Spring Boot        │
│ REST API | Security | Business Logic         │
│ Validation | Order Processing | Error Handler│
└──────────────────────┬───────────────────────┘
                       │ Spring Data JPA
                       ▼
┌──────────────────────────────────────────────┐
│                  MySQL                       │
│ Users | Products | Variants | Orders         │
│ Carts | Payments | Coupons | Reviews         │
└──────────────────────────────────────────────┘
```

Hình ảnh sản phẩm có thể được lưu ở dịch vụ lưu trữ file riêng thay vì lưu trực tiếp dữ liệu ảnh trong MySQL. Database nên lưu đường dẫn hoặc URL ảnh.

### Ví dụ luồng đặt hàng

1. React gửi yêu cầu đặt hàng đến REST API.
2. Spring Boot xác thực người dùng và kiểm tra dữ liệu đặt hàng.
3. Backend kiểm tra giá, màu sắc, kích cỡ và tồn kho trong MySQL.
4. Backend tạo đơn hàng và cập nhật tồn kho trong một transaction phù hợp.
5. Frontend nhận kết quả và hiển thị thông tin đơn hàng.

Không tin cậy giá tiền do Frontend gửi lên; Backend phải tự kiểm tra và tính lại giá theo dữ liệu đáng tin cậy trong hệ thống.

## 5. Cấu trúc thư mục dự án

Đề xuất đặt Frontend và Backend trong hai thư mục riêng, cùng nằm trong một repository Git.

```text
clothing-store/
├── backend/
│   ├── pom.xml
│   └── src/
│       ├── main/
│       │   ├── java/com/example/clothingstore/
│       │   │   ├── config/
│       │   │   ├── security/
│       │   │   ├── user/
│       │   │   ├── address/
│       │   │   ├── product/
│       │   │   ├── category/
│       │   │   ├── brand/
│       │   │   ├── cart/
│       │   │   ├── order/
│       │   │   ├── payment/
│       │   │   ├── coupon/
│       │   │   ├── review/
│       │   │   └── common/
│       │   └── resources/
│       │       ├── application.yml
│       │       └── db/
│       └── test/
│
├── frontend/
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── features/
│       ├── services/
│       ├── types/
│       ├── routes/
│       ├── hooks/
│       ├── assets/
│       └── styles/
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── docs/
│   ├── requirements.md
│   ├── api-specification.md
│   ├── database-erd.md
│   └── deployment.md
│
├── .gitignore
└── README.md
```

### Trách nhiệm các module Backend

- `config/`: cấu hình ứng dụng.
- `security/`: xác thực, phân quyền và cấu hình bảo mật.
- `user/`: tài khoản người dùng.
- `address/`: địa chỉ giao hàng.
- `product/`: sản phẩm, biến thể và hình ảnh.
- `category/`: danh mục quần áo.
- `brand/`: thương hiệu.
- `cart/`: giỏ hàng.
- `order/`: đơn hàng và chi tiết đơn hàng.
- `payment/`: trạng thái và thông tin thanh toán.
- `coupon/`: mã giảm giá.
- `review/`: đánh giá sản phẩm.
- `common/`: xử lý lỗi, phản hồi chung và thành phần dùng chung.

Trong mỗi module, khi cần, có thể tổ chức các lớp theo vai trò như `controller`, `service`, `repository`, `entity`, `dto` và `mapper`.

### Trách nhiệm các thư mục Frontend

- `components/`: thành phần giao diện dùng chung.
- `pages/`: các trang.
- `features/`: nhóm chức năng theo nghiệp vụ.
- `services/`: gọi API.
- `types/`: kiểu dữ liệu TypeScript.
- `routes/`: cấu hình định tuyến.
- `hooks/`: React hooks dùng chung.
- `assets/`: hình ảnh, biểu tượng và tài nguyên.
- `styles/`: CSS dùng chung.

## 6. Thiết kế database ban đầu

| Bảng | Mục đích |
|---|---|
| `users` | Tài khoản khách hàng và quản trị viên |
| `addresses` | Địa chỉ giao hàng |
| `categories` | Danh mục quần áo |
| `brands` | Thương hiệu |
| `products` | Thông tin chung của sản phẩm |
| `product_variants` | SKU, size, màu sắc, giá và tồn kho |
| `product_images` | Hình ảnh sản phẩm |
| `carts` | Giỏ hàng |
| `cart_items` | Các biến thể và số lượng trong giỏ hàng |
| `orders` | Thông tin đơn hàng |
| `order_items` | Các sản phẩm trong đơn hàng |
| `payments` | Thông tin và trạng thái thanh toán |
| `coupons` | Mã giảm giá |
| `reviews` | Đánh giá sản phẩm |

Đây là danh sách bảng khởi đầu; không bắt buộc phải tạo tất cả trong ngày đầu tiên. Cần thiết kế ERD, khóa chính, khóa ngoại, ràng buộc và quan hệ trước khi triển khai Entity trong Java.

### Một số nguyên tắc dữ liệu

- Dùng ID làm khóa chính phù hợp với thiết kế.
- Đặt khóa ngoại cho các quan hệ cần bảo đảm toàn vẹn.
- Lưu giá tiền bằng kiểu dữ liệu chính xác như `DECIMAL`, không dùng số thực dấu phẩy động để lưu tiền.
- Lưu giá tại thời điểm mua trong `order_items` để lịch sử đơn hàng không thay đổi khi giá sản phẩm được cập nhật.
- Mỗi biến thể cần SKU duy nhất.
- Không lưu mật khẩu dạng văn bản thuần; lưu mật khẩu đã băm bằng cơ chế an toàn phù hợp.
- Không lưu thông tin thẻ thanh toán nhạy cảm trực tiếp nếu tích hợp cổng thanh toán.
- Dùng transaction và cơ chế kiểm soát tồn kho để hạn chế bán vượt số lượng còn lại.

## 7. Hosting và triển khai

Chưa cần quyết định hosting ngay. Có thể phát triển và kiểm thử trên máy cá nhân trước, sau đó chọn dịch vụ phù hợp với ngân sách và yêu cầu vận hành.

### Frontend

Có thể dùng Vercel hoặc một dịch vụ hosting static tương đương để triển khai ứng dụng React đã build.

### Backend

Có thể cân nhắc Render hoặc máy chủ hỗ trợ Java/Spring Boot. Trước khi chọn cần kiểm tra gói dịch vụ, giới hạn tài nguyên, thời gian hoạt động, cấu hình biến môi trường và chính sách vận hành hiện hành.

### Database

Ưu tiên dịch vụ MySQL được quản lý riêng, có sao lưu (backup), bảo mật mạng và cơ chế phục hồi phù hợp. Không nên mở database công khai cho toàn Internet.

### Phương án mở rộng

AWS hoặc VPS có thể phù hợp khi cần chủ động cấu hình hạ tầng hơn, nhưng đòi hỏi nhiều công sức vận hành và bảo mật hơn.

### Docker

Có thể sử dụng Docker để đóng gói Backend và các thành phần cần thiết nhằm giúp môi trường phát triển và triển khai nhất quán. Không bắt buộc phải dùng Docker ngay từ đầu.

## 8. Giao diện đề xuất

Chọn phong cách giao diện sau khi xác định đối tượng khách hàng và thương hiệu:

- **Hiện đại, tối giản:** bố cục thoáng, hình sản phẩm rõ ràng, dễ mua hàng.
- **Streetwear, trẻ trung:** màu sắc và bố cục năng động, phù hợp thời trang đường phố.
- **Cao cấp, sang trọng:** bảng màu tinh giản, hình ảnh lớn, kiểu chữ và khoảng trắng được chú trọng.

Dù chọn phong cách nào, giao diện nên tương thích điện thoại, máy tính bảng và máy tính; có trạng thái tải dữ liệu, lỗi API, danh sách rỗng và thông báo thao tác thành công.

## 9. Lộ trình phát triển đề xuất

### Giai đoạn 1 — Phân tích và thiết kế

1. Chốt phạm vi phiên bản đầu tiên.
2. Viết yêu cầu chức năng và phi chức năng.
3. Xác định vai trò Customer và Admin.
4. Thiết kế ERD và các bảng database.
5. Thiết kế danh sách REST API.
6. Phác thảo giao diện các trang chính.

### Giai đoạn 2 — Khởi tạo dự án

1. Tạo repository Git.
2. Khởi tạo Backend Spring Boot bằng Maven.
3. Khởi tạo Frontend React + TypeScript bằng Vite.
4. Cấu hình kết nối MySQL qua biến môi trường.
5. Thiết lập cấu trúc thư mục và quy tắc code.
6. Tạo hướng dẫn chạy dự án trong `README.md`.

### Giai đoạn 3 — Backend nền tảng

1. Cấu hình database và kiểm tra kết nối.
2. Tạo cấu trúc phản hồi API và xử lý lỗi chung.
3. Xây dựng đăng ký, đăng nhập và phân quyền.
4. Xây dựng API danh mục và thương hiệu.
5. Xây dựng API sản phẩm và biến thể.
6. Viết kiểm thử cho các nghiệp vụ quan trọng.

### Giai đoạn 4 — Frontend nền tảng

1. Xây dựng layout chung và định tuyến.
2. Xây dựng trang chủ.
3. Xây dựng danh sách và chi tiết sản phẩm.
4. Kết nối API Backend.
5. Xây dựng đăng nhập và đăng ký.
6. Xử lý trạng thái tải, lỗi và dữ liệu rỗng.

### Giai đoạn 5 — Giỏ hàng và đơn hàng

1. Xây dựng giỏ hàng.
2. Xây dựng quy trình đặt hàng.
3. Kiểm tra giá và tồn kho ở Backend.
4. Tạo đơn hàng và chi tiết đơn hàng.
5. Quản lý trạng thái đơn hàng.
6. Xây dựng lịch sử và theo dõi đơn hàng.

### Giai đoạn 6 — Trang Admin

1. Dashboard.
2. Quản lý sản phẩm và biến thể.
3. Quản lý danh mục và thương hiệu.
4. Quản lý tồn kho.
5. Quản lý đơn hàng.
6. Quản lý tài khoản và mã giảm giá.
7. Báo cáo cơ bản.

### Giai đoạn 7 — Hoàn thiện và triển khai

1. Kiểm thử chức năng và bảo mật.
2. Kiểm thử quy trình đặt hàng.
3. Tối ưu giao diện responsive.
4. Cấu hình môi trường production.
5. Triển khai Frontend, Backend và MySQL.
6. Cấu hình HTTPS, CORS, biến môi trường và backup.
7. Viết hướng dẫn vận hành và xử lý sự cố.

## 10. Phạm vi MVP khuyến nghị

Để tránh dự án quá lớn ngay từ đầu, phiên bản MVP có thể bao gồm:

- Trang chủ và danh sách sản phẩm.
- Tìm kiếm và lọc sản phẩm cơ bản.
- Chi tiết sản phẩm với size, màu sắc và tồn kho.
- Đăng ký, đăng nhập.
- Giỏ hàng.
- Đặt hàng bằng COD.
- Lịch sử đơn hàng.
- Admin quản lý sản phẩm, biến thể, tồn kho và đơn hàng.
- Phân quyền Customer/Admin.
- Kiểm thử các luồng quan trọng.

Các chức năng như thanh toán trực tuyến, đánh giá, yêu thích, khuyến mãi nâng cao và báo cáo mở rộng có thể thực hiện ở các giai đoạn tiếp theo.

## 11. Nguyên tắc triển khai

- Phát triển theo từng chức năng nhỏ, có thể chạy và kiểm thử được.
- Không viết toàn bộ hệ thống trong một lần rồi mới chạy thử.
- Backend chịu trách nhiệm xác thực, phân quyền và kiểm tra nghiệp vụ.
- Không tin cậy giá tiền hoặc quyền người dùng do Frontend gửi lên.
- Không commit mật khẩu, API key hoặc thông tin kết nối database lên Git.
- Dùng dữ liệu mẫu để kiểm thử.
- Viết kiểm thử cho nghiệp vụ đơn hàng, giá và tồn kho.
- Cập nhật `README.md` khi thay đổi cách cài đặt hoặc chạy dự án.
- Tài liệu tham khảo chính thức:
  - Spring Boot: https://docs.spring.io/spring-boot/system-requirements.html
  - React với TypeScript: https://react.dev/learn/typescript
  - Vite: https://vite.dev/guide/

## 12. Các quyết định cần chốt trước khi bắt đầu code

1. **Quy mô:** MVP cơ bản, thương mại điện tử đầy đủ hay hệ thống mở rộng.
2. **Admin:** Có xây dựng trang quản trị ngay từ đầu hay không.
3. **Thanh toán:** COD trước, thanh toán trực tuyến hay cả hai.
4. **Hosting:** Chạy local trước hay triển khai sớm.
5. **Phong cách giao diện:** Hiện đại tối giản, streetwear hay cao cấp.

Sau khi chốt các lựa chọn này, bước tiếp theo là hoàn thiện đặc tả yêu cầu, thiết kế ERD và danh sách API, sau đó triển khai từng module theo lộ trình.
