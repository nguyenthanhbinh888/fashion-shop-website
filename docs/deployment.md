# HƯỚNG DẪN CÀI ĐẶT & VẬN HÀNH DỰ ÁN TRÊN LOCAL (LOCAL DEPLOYMENT GUIDE)

Tài liệu này hướng dẫn cách chạy toàn bộ hệ sinh thái dự án (MySQL, Spring Boot Backend, React Vite Frontend) trên môi trường phát triển máy cá nhân.

---

## 1. Yêu cầu môi trường (Prerequisites)
* **Java:** JDK 21 trở lên (Đã cài đặt sẵn trên máy: Oracle JDK 21.0.12).
* **Maven:** Apache Maven 3.9+ (Đã cài đặt: Maven 3.9.16).
* **Node.js:** Node 20+ (Đã cài đặt: Node v24.21.0 & npm 11.19.0).
* **MySQL:** MySQL 8.0 (Đang chạy dịch vụ `MySQL80` tại `localhost:3306`, user: `root`, password: `123456`).

---

## 2. Khởi tạo Cơ sở dữ liệu
Nếu chưa chạy khởi tạo, mở PowerShell tại thư mục gốc của dự án:
```powershell
# Chạy tạo Schema
Get-Content -Raw "database/schema.sql" | mysql -u root -p123456

# Chạy nạp dữ liệu mẫu ban đầu
Get-Content -Raw "database/seed.sql" | mysql -u root -p123456
```

---

## 3. Khởi chạy Backend (Spring Boot)
1. Di chuyển vào thư mục backend:
   ```powershell
   cd backend
   ```
2. Build và tải dependencies:
   ```powershell
   mvn clean install -DskipTests
   ```
3. Khởi động ứng dụng Spring Boot:
   ```powershell
   mvn spring-boot:run
   ```
4. Backend sẽ sẵn sàng tại địa chỉ: `http://localhost:8080` (API Base: `http://localhost:8080/api/v1`).

---

## 4. Khởi chạy Frontend (React + Vite)
1. Mở cửa sổ terminal thứ 2 và di chuyển vào thư mục frontend:
   ```powershell
   cd frontend
   ```
2. Cài đặt thư viện:
   ```powershell
   cmd.exe /c npm install
   ```
3. Chạy môi trường phát triển:
   ```powershell
   cmd.exe /c npm run dev
   ```
4. Truy cập giao diện tại: `http://localhost:5173`.

---

## 5. Tài khoản mẫu để kiểm thử
* **Tài khoản Khách hàng (Customer):**
  - Email: `customer@gmail.com`
  - Mật khẩu: `customer123`
* **Tài khoản Quản trị viên (Admin):**
  - Email: `admin@luxeatelier.com`
  - Mật khẩu: `admin123`
