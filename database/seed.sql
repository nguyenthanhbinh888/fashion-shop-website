-- ============================================================
-- DỮ LIỆU KHỞI TẠO HỆ THỐNG THỜI TRANG CAO CẤP (CLOTHING STORE)
-- ============================================================

USE `clothing_store`;

-- 1. SEED TÀI KHOẢN (Mật khẩu mặc định: admin123 và customer123)
-- BCrypt hash của 'admin123': $2a$10$6tztJzyfkV8ndDg/72I5COuRQbv1w3RCJofdZogaUAM5bV9UWFnL.
-- BCrypt hash của 'customer123': $2a$10$3Bn7VGXyGuyGyCVUvs1.4uVqglr52K1gXGA0w/eCMd5RQLpGmuOve
INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `phone`, `role`, `avatar_url`, `is_active`) VALUES
(1, 'Quản Trị Viên (Admin)', 'admin@luxeatelier.com', '$2a$10$6tztJzyfkV8ndDg/72I5COuRQbv1w3RCJofdZogaUAM5bV9UWFnL.', '0901234567', 'ROLE_ADMIN', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', 1),
(2, 'Nguyễn Minh Anh', 'customer@gmail.com', '$2a$10$3Bn7VGXyGuyGyCVUvs1.4uVqglr52K1gXGA0w/eCMd5RQLpGmuOve', '0912345678', 'ROLE_CUSTOMER', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', 1)
ON DUPLICATE KEY UPDATE `full_name` = VALUES(`full_name`), `password` = VALUES(`password`);

-- 2. SEED ĐỊA CHỈ KHÁCH HÀNG
INSERT INTO `addresses` (`id`, `user_id`, `receiver_name`, `phone`, `street_address`, `ward`, `district`, `city`, `is_default`) VALUES
(1, 2, 'Nguyễn Minh Anh', '0912345678', 'Toà nhà Landmark 81, 720A Điện Biên Phủ', 'Phường 22', 'Quận Bình Thạnh', 'TP. Hồ Chí Minh', 1)
ON DUPLICATE KEY UPDATE `receiver_name` = VALUES(`receiver_name`);

-- 3. SEED THƯƠNG HIỆU (BRANDS)
INSERT INTO `brands` (`id`, `name`, `slug`, `description`, `logo_url`) VALUES
(1, 'L''ATELIER', 'latelier', 'Thương hiệu may đo cao cấp mang tinh thần Parisian Chic sang trọng.', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=200&q=80'),
(2, 'NOIR & BLANC', 'noir-blanc', 'Phong cách tối giản đương đại với bảng màu đơn sắc thanh lịch.', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=200&q=80'),
(3, 'AURA TAILORING', 'aura-tailoring', 'Kỹ thuật may đo thủ công tinh xảo dành cho trang phục công sở hiện đại.', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=200&q=80'),
(4, 'KINSHIP STUDIO', 'kinship-studio', 'Thời trang đô thị thời thượng kết hợp chất liệu tự nhiên bền vững.', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=200&q=80')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- 4. SEED DANH MỤC (CATEGORIES)
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `parent_id`, `display_order`) VALUES
(1, 'Áo Blazer & Khoác Ngoài', 'ao-blazer-khoac-ngoai', 'Các thiết kế áo khoác, trench coat và blazer cắt may tỉ mỉ.', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80', NULL, 1),
(2, 'Đầm & Váy Lụa Cao Cấp', 'dam-vay-lua-cao-cap', 'Đầm dự tiệc và váy slip dress từ lụa tơ tằm thượng hạng.', 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80', NULL, 2),
(3, 'Áo Sơ Mi & Blouse', 'ao-so-mi-blouse', 'Sơ mi poplin cotton và lụa mềm mại với form dáng chuẩn mực.', 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80', NULL, 3),
(4, 'Quần Âu & Chân Váy', 'quan-au-chan-vay', 'Quần âu xếp ly tôn dáng và chân váy midi thời thượng.', 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80', NULL, 4),
(5, 'Bộ Sưu Tập Tối Giản', 'bo-suu-tap-toi-gian', 'Những món đồ tinh giản vượt thời gian (Capsule Wardrobe).', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80', NULL, 5)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- 5. SEED SẢN PHẨM (PRODUCTS)
INSERT INTO `products` (`id`, `name`, `slug`, `description`, `material`, `care_instructions`, `base_price`, `original_price`, `category_id`, `brand_id`, `is_featured`, `is_active`) VALUES
(1, 'Áo Blazer Dạ Cashmere Oversized Signature', 'ao-blazer-da-cashmere-oversized-signature', 
'Áo Blazer dáng suông oversized chế tác từ sợi cashmere pha len cao cấp nhập khẩu từ Ý. Thiết kế ve áo notch lapel thanh mảnh, đệm vai tinh tế giúp định hình phom dáng quyền lực nhưng vẫn phóng khoáng.',
'90% Wool, 10% Cashmere Ý, Lót 100% Cupro lụa', 'Chỉ giặt khô chuyên nghiệp, ủi hơi nước ở nhiệt độ thấp.', 
2450000, 2890000, 1, 1, 1, 1),

(2, 'Đầm Lụa Tơ Tằm Dáng Dài Silk Bias-Cut Dress', 'dam-lua-to-tam-dang-dai-silk-bias-cut-dress', 
'Chiếc đầm lụa cắt chéo (bias-cut) ôm nhẹ theo từng chuyển động cơ thể, mang lại vẻ quyến rũ tự nhiên và sang trọng vượt bậc trong những buổi dạ tiệc hay bữa tối lãng mạn.',
'100% Mulberry Silk (Lụa dâu tằm 22 momme)', 'Giặt tay nhẹ nhàng với nước lạnh hoặc giặt khô, phơi trong bóng râm.', 
1980000, 2350000, 2, 1, 1, 1),

(3, 'Áo Sơ Mi Poplin Cotton Cổ Ý Tailored Fit', 'ao-so-mi-poplin-cotton-co-y-tailored-fit', 
'Áo sơ mi cổ điển phong cách Ý dệt từ sợi bông Supima sợi dài với độ bóng mờ tinh xảo. Khuy áo xà cừ tự nhiên khắc laser tỉ mỉ, độ bền vượt trội và cảm giác thoáng mịn cả ngày.',
'100% Supima Cotton sợi dài', 'Giặt máy chế độ nhẹ 30°C, ủi khi còn ẩm.', 
950000, 1150000, 3, 3, 1, 1),

(4, 'Quần Âu Ống Suông Xếp Ly Pleated Wide-Leg Trousers', 'quan-au-ong-suong-xep-ly-pleated-wide-leg-trousers', 
'Quần âu xếp ly kép tạo độ rủ hoàn hảo, cạp cao tôn dáng tối đa. Chi tiết khóa cài ẩn và đỉa quần may giấu chỉ thể hiện kỹ thuật may đo đỉnh cao.',
'70% Wool pha, 28% Viscose, 2% Elastane', 'Giặt khô hoặc giặt nhẹ, không dùng chất tẩy.', 
1350000, 1590000, 4, 2, 1, 1),

(5, 'Áo Khoác Trench Coat Dáng Dài Classic Double-Breasted', 'ao-khoac-trench-coat-dang-dai-classic-double-breasted', 
'Biểu tượng thời trang vượt thời gian với thiết kế 2 hàng khuy (double-breasted), đai thắt eo tôn dáng và chất liệu cotton gabardine kháng nước nhẹ.',
'100% Cotton Gabardine cao cấp, trượt nước nhẹ', 'Giặt khô chuyên dụng.', 
3200000, 3800000, 1, 4, 1, 1),

(6, 'Áo Len Dệt Kim Cổ Lọ Merino Wool Knitwear', 'ao-len-det-kim-co-lo-merino-wool-knitwear', 
'Chất len cừu Merino Extra Fine siêu mịn, không dặm ngứa. Thiết kế cổ lọ thanh lịch, giữ ấm tối ưu mà vẫn giữ trọn form dáng thanh thoát.',
'100% Extra Fine Merino Wool', 'Giặt tay với nước lạnh và dầu gội/nước giặt len, phơi phẳng.', 
1150000, 1390000, 5, 3, 1, 1),

(7, 'Chân Váy Chữ A Lụa Satin Midi Skirt', 'chan-vay-chu-a-lua-satin-midi-skirt', 
'Chân váy midi dáng chữ A nhẹ nhàng, cạp thun co giãn ẩn bên trong tạo cảm giác vừa vặn tuyệt đối. Ánh satin mềm óng ánh dưới ánh đèn.',
'95% Silk Satin, 5% Spandex', 'Giặt tay nhẹ nhàng, ủi mặt trái ở nhiệt độ thấp.', 
1250000, 1450000, 4, 1, 0, 1),

(8, 'Áo Thun Heavyweight Organic Cotton Boxy Tee', 'ao-thun-heavyweight-organic-cotton-boxy-tee', 
'Áo thun form boxy hiện đại với định lượng vải 280 GSM dày dặn đứng form. Bo cổ dệt rib kép không giãn xệ sau nhiều lần giặt.',
'100% GOTS Certified Organic Cotton', 'Giặt máy nhiệt độ thường, không sấy nhiệt độ cao.', 
550000, 650000, 5, 2, 0, 1)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- 6. SEED BIẾN THỂ SẢN PHẨM (PRODUCT_VARIANTS: SKU, Size, Color, Stock, Price)
INSERT INTO `product_variants` (`id`, `product_id`, `sku`, `color_name`, `color_code`, `size`, `price`, `stock_quantity`, `image_url`, `is_active`) VALUES
-- Sản phẩm 1: Blazer Dạ Cashmere
(1, 1, 'BLZ-CASH-BLK-S', 'Đen Obsidian', '#0c0c0e', 'S', 2450000, 15, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80', 1),
(2, 1, 'BLZ-CASH-BLK-M', 'Đen Obsidian', '#0c0c0e', 'M', 2450000, 20, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80', 1),
(3, 1, 'BLZ-CASH-BLK-L', 'Đen Obsidian', '#0c0c0e', 'L', 2450000, 12, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80', 1),
(4, 1, 'BLZ-CASH-BGE-S', 'Be Camel', '#c5a880', 'S', 2450000, 18, 'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?auto=format&fit=crop&w=800&q=80', 1),
(5, 1, 'BLZ-CASH-BGE-M', 'Be Camel', '#c5a880', 'M', 2450000, 25, 'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?auto=format&fit=crop&w=800&q=80', 1),

-- Sản phẩm 2: Đầm Lụa Tơ Tằm
(6, 2, 'DRS-SILK-BLK-S', 'Đen Onyx', '#111111', 'S', 1980000, 10, 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80', 1),
(7, 2, 'DRS-SILK-BLK-M', 'Đen Onyx', '#111111', 'M', 1980000, 15, 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80', 1),
(8, 2, 'DRS-SILK-GLD-S', 'Vàng Champagne', '#e6c88f', 'S', 1980000, 8, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80', 1),
(9, 2, 'DRS-SILK-GLD-M', 'Vàng Champagne', '#e6c88f', 'M', 1980000, 12, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80', 1),

-- Sản phẩm 3: Áo Sơ Mi Poplin
(10, 3, 'SHR-POPL-WHT-S', 'Trắng Tinh Khiết', '#ffffff', 'S', 950000, 30, 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80', 1),
(11, 3, 'SHR-POPL-WHT-M', 'Trắng Tinh Khiết', '#ffffff', 'M', 950000, 45, 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80', 1),
(12, 3, 'SHR-POPL-WHT-L', 'Trắng Tinh Khiết', '#ffffff', 'L', 950000, 25, 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80', 1),
(13, 3, 'SHR-POPL-BLU-M', 'Xanh Baby', '#d4e6f1', 'M', 950000, 20, 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80', 1),

-- Sản phẩm 4: Quần Âu Ống Suông
(14, 4, 'TRS-PLTD-BLK-S', 'Đen Than', '#1a1a1a', 'S', 1350000, 20, 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80', 1),
(15, 4, 'TRS-PLTD-BLK-M', 'Đen Than', '#1a1a1a', 'M', 1350000, 30, 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80', 1),
(16, 4, 'TRS-PLTD-GRY-M', 'Xám Ghi', '#707070', 'M', 1350000, 18, 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=800&q=80', 1),

-- Sản phẩm 5: Trench Coat
(17, 5, 'TRN-CLSC-BGE-M', 'Be Hạt Dẻ', '#d7ba89', 'M', 3200000, 14, 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80', 1),
(18, 5, 'TRN-CLSC-BGE-L', 'Be Hạt Dẻ', '#d7ba89', 'L', 3200000, 10, 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80', 1),

-- Sản phẩm 6: Áo Len Merino
(19, 6, 'KNT-MRNO-BLK-M', 'Đen Tuyển', '#0a0a0a', 'M', 1150000, 22, 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80', 1),
(20, 6, 'KNT-MRNO-IVR-M', 'Kem Sữa', '#f4efe6', 'M', 1150000, 19, 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80', 1),

-- Sản phẩm 7: Chân Váy Satin
(21, 7, 'SKR-SATN-GLD-S', 'Vàng Ánh Kim', '#d4af37', 'S', 1250000, 15, 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80', 1),
(22, 7, 'SKR-SATN-GLD-M', 'Vàng Ánh Kim', '#d4af37', 'M', 1250000, 16, 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80', 1),

-- Sản phẩm 8: Áo Thun Boxy Tee
(23, 8, 'TEE-BOXY-WHT-M', 'Trắng Tối Giản', '#fcfcfc', 'M', 550000, 50, 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80', 1),
(24, 8, 'TEE-BOXY-BLK-M', 'Đen Mờ', '#1e1e1e', 'M', 550000, 40, 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80', 1)
ON DUPLICATE KEY UPDATE `sku` = VALUES(`sku`);

-- 7. SEED HÌNH ẢNH SẢN PHẨM (PRODUCT_IMAGES)
INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `color_name`, `is_primary`, `display_order`) VALUES
(1, 1, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80', 'Đen Obsidian', 1, 1),
(2, 1, 'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?auto=format&fit=crop&w=800&q=80', 'Be Camel', 0, 2),
(3, 2, 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80', 'Đen Onyx', 1, 1),
(4, 2, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80', 'Vàng Champagne', 0, 2),
(5, 3, 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80', 'Trắng Tinh Khiết', 1, 1),
(6, 4, 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80', 'Đen Than', 1, 1),
(7, 5, 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80', 'Be Hạt Dẻ', 1, 1),
(8, 6, 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80', 'Đen Tuyển', 1, 1),
(9, 7, 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80', 'Vàng Ánh Kim', 1, 1),
(10, 8, 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80', 'Trắng Tối Giản', 1, 1)
ON DUPLICATE KEY UPDATE `image_url` = VALUES(`image_url`);

-- 8. SEED MÃ GIẢM GIÁ (COUPONS)
INSERT INTO `coupons` (`id`, `code`, `discount_type`, `discount_value`, `min_order_value`, `max_discount_amount`, `usage_limit`, `used_count`, `start_date`, `end_date`, `is_active`) VALUES
(1, 'LUXE10', 'PERCENT', 10.00, 1000000, 300000, 200, 15, '2026-01-01 00:00:00', '2026-12-31 23:59:59', 1),
(2, 'VIP200K', 'FIXED_AMOUNT', 200000, 2000000, 200000, 100, 8, '2026-01-01 00:00:00', '2026-12-31 23:59:59', 1),
(3, 'WELCOME50', 'FIXED_AMOUNT', 50000, 500000, 50000, 500, 42, '2026-01-01 00:00:00', '2026-12-31 23:59:59', 1)
ON DUPLICATE KEY UPDATE `code` = VALUES(`code`);

-- 9. SEED ĐÁNH GIÁ MẪU (REVIEWS)
INSERT INTO `reviews` (`id`, `product_id`, `user_id`, `rating`, `comment`, `created_at`) VALUES
(1, 1, 2, 5, 'Form áo blazer cực kỳ xuất sắc, chất len cashmere sờ mướt tay, đứng dáng chuẩn high-end. Rất đáng tiền!', '2026-09-15 10:20:00'),
(2, 2, 2, 5, 'Lụa tơ tằm thật sự mềm nhẹ, độ bóng vừa phải rất sang. Mặc đi tiệc ai cũng khen!', '2026-09-20 14:35:00'),
(3, 3, 2, 4, 'Chất cotton Supima mát, cổ áo đứng form, khuy xà cừ đẹp mắt.', '2026-10-02 09:15:00')
ON DUPLICATE KEY UPDATE `comment` = VALUES(`comment`);

-- 10. SEED ĐƠN HÀNG MẪU (CHO ADMIN DASHBOARD)
INSERT INTO `orders` (`id`, `order_code`, `user_id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `subtotal`, `shipping_fee`, `discount_amount`, `total_amount`, `coupon_code`, `order_status`, `note`, `created_at`) VALUES
(1, 'ORD-20261001-001', 2, 'Nguyễn Minh Anh', 'customer@gmail.com', '0912345678', 'Toà nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh', 2450000, 0, 200000, 2250000, 'VIP200K', 'DELIVERED', 'Giao hàng giờ hành chính', '2026-10-01 11:00:00'),
(2, 'ORD-20261015-002', 2, 'Nguyễn Minh Anh', 'customer@gmail.com', '0912345678', 'Toà nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh', 1980000, 30000, 198000, 1812000, 'LUXE10', 'PROCESSING', 'Vui lòng gọi trước khi giao', '2026-10-15 16:30:00')
ON DUPLICATE KEY UPDATE `order_code` = VALUES(`order_code`);

INSERT INTO `order_items` (`id`, `order_id`, `variant_id`, `product_name`, `color_name`, `size`, `sku`, `unit_price`, `quantity`, `total_price`, `image_url`) VALUES
(1, 1, 2, 'Áo Blazer Dạ Cashmere Oversized Signature', 'Đen Obsidian', 'M', 'BLZ-CASH-BLK-M', 2450000, 1, 2450000, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80'),
(2, 2, 7, 'Đầm Lụa Tơ Tằm Dáng Dài Silk Bias-Cut Dress', 'Đen Onyx', 'M', 'DRS-SILK-BLK-M', 1980000, 1, 1980000, 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80')
ON DUPLICATE KEY UPDATE `sku` = VALUES(`sku`);

INSERT INTO `payments` (`id`, `order_id`, `payment_method`, `payment_status`, `transaction_reference`, `amount`, `paid_at`, `created_at`) VALUES
(1, 1, 'COD', 'COMPLETED', 'COD-TXN-1001', 2250000, '2026-10-03 14:00:00', '2026-10-01 11:00:00'),
(2, 2, 'VNPAY', 'COMPLETED', 'VNPAY-20261015-88992', 1812000, '2026-10-15 16:32:00', '2026-10-15 16:30:00')
ON DUPLICATE KEY UPDATE `payment_status` = VALUES(`payment_status`);
