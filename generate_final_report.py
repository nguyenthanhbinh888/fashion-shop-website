# -*- coding: utf-8 -*-
"""
Full report generator script for L'ATELIER & CO. Fashion Shop Website.
Outputs:
- BAO_CAO_DO_AN_MON_HOC_FASHION_SHOP.docx
- BAO_CAO_DO_AN_MON_HOC_FASHION_SHOP.md
"""

import os
from docx.shared import Cm, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from report_sections import (
    init_doc, add_p, add_bullet, add_h1, add_h2, add_h3,
    add_table_title, add_figure_caption, add_image_placeholder,
    create_table_generic, create_use_case_table
)

def build_report():
    doc = init_doc()
    md_lines = []

    def md(line=""):
        md_lines.append(line)

    # ==========================================
    # TRANG BÌA & BÌA PHỤ
    # ==========================================
    md("# BỘ GIÁO DỤC VÀ ĐÀO TẠO")
    md("## TRƯỜNG ĐẠI HỌC ...")
    md("### KHOA CÔNG NGHỆ THÔNG TIN\n")
    md("---\n")
    md("# BÁO CÁO ĐỒ ÁN MÔN HỌC")
    md("## ĐỀ TÀI: XÂY DỰNG WEBSITE THƯƠNG MẠI ĐIỆN TỬ THỜI TRANG MAY ĐO CAO CẤP L'ATELIER & CO.\n")
    md("- **Giảng viên hướng dẫn:** [Tên Giảng Viên]")
    md("- **Sinh viên thực hiện:** [Tên Sinh Viên]")
    md("- **Mã số sinh viên:** [MSSV]")
    md("- **Lớp:** [Tên Lớp / Khóa]")
    md("- **Ngành:** Công nghệ Thông tin / Kỹ thuật Phần mềm")
    md("- **Năm học:** 2026\n")
    md("---\n\n")

    # Cover Page in Word
    p_cov_top = add_p(doc, "BỘ GIÁO DỤC VÀ ĐÀO TẠO\nTRƯỜNG ĐẠI HỌC ...\nKHOA CÔNG NGHỆ THÔNG TIN", align=WD_ALIGN_PARAGRAPH.CENTER)
    p_cov_top.runs[0].font.size = Pt(14)
    p_cov_top.runs[0].bold = True

    add_p(doc, "\n\n\n", align=WD_ALIGN_PARAGRAPH.CENTER)

    p_cov_title = add_p(doc, "BÁO CÁO ĐỒ ÁN MÔN HỌC\n\nĐỀ TÀI:\nXÂY DỰNG WEBSITE THƯƠNG MẠI ĐIỆN TỬ\nTHỜI TRANG MAY ĐO CAO CẤP L'ATELIER & CO.", align=WD_ALIGN_PARAGRAPH.CENTER)
    p_cov_title.runs[0].font.size = Pt(18)
    p_cov_title.runs[0].bold = True

    add_p(doc, "\n\n\n\n", align=WD_ALIGN_PARAGRAPH.CENTER)

    p_cov_info = add_p(doc,
        "Giảng viên hướng dẫn: [Điền tên Giảng viên hướng dẫn]\n"
        "Sinh viên thực hiện:    [Điền họ và tên Sinh viên]\n"
        "Mã số sinh viên:         [Điền mã số sinh viên]\n"
        "Lớp chuyên ngành:    [Điền tên lớp]\n"
        "Khóa học:                   2022 - 2026\n",
        align=WD_ALIGN_PARAGRAPH.LEFT
    )
    p_cov_info.runs[0].font.size = Pt(13)

    add_p(doc, "\n\n\n\n", align=WD_ALIGN_PARAGRAPH.CENTER)
    p_cov_bot = add_p(doc, "HÀ NỘI / TP. HỒ CHÍ MINH, NĂM 2026", align=WD_ALIGN_PARAGRAPH.CENTER)
    p_cov_bot.runs[0].font.size = Pt(13)
    p_cov_bot.runs[0].bold = True

    doc.add_page_break()

    # ==========================================
    # LỜI CẢM ƠN
    # ==========================================
    add_h1(doc, "LỜI CẢM ƠN")
    md("## LỜI CẢM ƠN\n")

    thanks_p1 = (
        "Trước tiên, em xin gửi lời cảm ơn chân thành và sâu sắc nhất tới quý Thầy, Cô khoa Công nghệ Thông tin "
        "đã tận tình truyền đạt những kiến thức chuyên môn quý báu, nền tảng lý thuyết và kỹ năng thực hành "
        "vững chắc trong suốt quá trình học tập tại nhà trường. Những bài giảng tâm huyết của quý Thầy, Cô chính là hành trang "
        "quan trọng giúp em có đủ tự tin và năng lực hoàn thành đồ án môn học này."
    )
    add_p(doc, thanks_p1)
    md(thanks_p1 + "\n")

    thanks_p2 = (
        "Đặc biệt, em xin bày tỏ lòng biết ơn sâu sắc tới Giảng viên hướng dẫn, người đã trực tiếp định hướng, tận tâm chỉ dẫn, "
        "đóng góp những ý kiến phản biện quý báu và hỗ trợ em giải quyết các vướng mắc kỹ thuật trong suốt các giai đoạn phân tích, "
        "thiết kế kiến trúc hệ thống và lập trình hoàn thiện website."
    )
    add_p(doc, thanks_p2)
    md(thanks_p2 + "\n")

    thanks_p3 = (
        "Dù đã nỗ lực hết mình để xây dựng hệ thống website thương mại điện tử hoàn chỉnh theo tiêu chuẩn cao cấp, "
        "song do kiến thức và kinh nghiệm thực tế còn hạn chế, đồ án không thể tránh khỏi những thiếu sót nhất định. "
        "Em kính mong nhận được những nhận xét, góp ý và chỉ dẫn của quý Thầy, Cô để hệ thống ngày càng hoàn thiện hơn."
    )
    add_p(doc, thanks_p3)
    md(thanks_p3 + "\n")

    p_sign = add_p(doc, "Sinh viên thực hiện\n(Ký và ghi rõ họ tên)", align=WD_ALIGN_PARAGRAPH.RIGHT)
    p_sign.runs[0].italic = True

    doc.add_page_break()

    # ==========================================
    # MỤC LỤC
    # ==========================================
    add_h1(doc, "MỤC LỤC")
    md("## MỤC LỤC\n")

    toc_items = [
        ("LỜI CẢM ƠN", "2"),
        ("MỤC LỤC", "3"),
        ("DANH MỤC CÁC CHỮ VIẾT TẮT", "4"),
        ("DANH MỤC CÁC BẢNG", "5"),
        ("DANH MỤC CÁC HÌNH", "6"),
        ("MỞ ĐẦU", "7"),
        ("CHƯƠNG 1: TỔNG QUAN VỀ CÔNG NGHỆ VÀ HỆ THỐNG", "9"),
        ("   1.1 Tổng quan về bài toán thương mại điện tử ngành thời trang may đo cao cấp", "9"),
        ("   1.2 Kiến trúc hệ thống Client - Server và mô hình RESTful API", "10"),
        ("   1.3 Công nghệ phát triển phía Backend (Spring Boot 3 & Java 21)", "11"),
        ("   1.4 Công nghệ phát triển phía Frontend (React 19, TypeScript, Vite)", "13"),
        ("   1.5 Tích hợp cổng thanh toán trực tuyến mô phỏng (VNPay Gateway Sandbox)", "14"),
        ("   1.6 Môi trường phát triển, biên dịch và công cụ kiểm thử", "15"),
        ("CHƯƠNG 2: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG", "16"),
        ("   2.1 Mô tả bài toán", "16"),
        ("   2.2 Yêu cầu bài toán", "17"),
        ("      2.2.1 Yêu cầu chức năng", "17"),
        ("      2.2.2 Yêu cầu phi chức năng", "18"),
        ("   2.3 Phân tích tác nhân hệ thống (Actors)", "19"),
        ("   2.4 Biểu đồ Use Case", "20"),
        ("      2.4.1 Biểu đồ Use Case tổng quát", "20"),
        ("      2.4.2 Biểu đồ Use Case phía Quản trị viên (Admin)", "21"),
        ("      2.4.3 Biểu đồ Use Case phía Người dùng (Khách hàng)", "22"),
        ("   2.5 Mô tả chi tiết các Use Case chính", "23"),
        ("      2.5.1 Use case Đăng ký và Đăng nhập hệ thống (UC_01)", "23"),
        ("      2.5.2 Use case Xem chi tiết và Lựa chọn biến thể sản phẩm (UC_02)", "25"),
        ("      2.5.3 Use case Quản lý giỏ hàng mua sắm (UC_03)", "27"),
        ("      2.5.4 Use case Đặt hàng và Thanh toán trực tuyến VNPay (UC_04)", "29"),
        ("      2.5.5 Use case Quản lý đơn hàng phía Quản trị viên (UC_05)", "31"),
        ("      2.5.6 Use case Thêm mới sản phẩm và biến thể tồn kho (UC_06)", "33"),
        ("      2.5.7 Use case Xem thống kê Dashboard phân tích kinh doanh (UC_07)", "35"),
        ("   2.6 Thiết kế Backend", "37"),
        ("      2.6.1 Thiết kế biểu đồ mô tả các chức năng (Sequence & VOPC Class Diagram)", "37"),
        ("      2.6.2 Biểu đồ lớp tổng thể (Overall Class Diagram)", "41"),
        ("      2.6.3 Thiết kế Cơ sở dữ liệu quan hệ (ERD và Data Dictionary)", "43"),
        ("CHƯƠNG 3: CHƯƠNG TRÌNH THỬ NGHIỆM VÀ KẾT QUẢ", "48"),
        ("   3.1 Môi trường triển khai và vận hành hệ thống", "48"),
        ("   3.2 Giao diện và kết quả thử nghiệm phía Khách hàng", "49"),
        ("   3.3 Giao diện và kết quả thử nghiệm phía Quản trị viên (Admin Portal)", "53"),
        ("   3.4 Kịch bản kiểm thử các ca kiểm thử chính (Test Cases)", "56"),
        ("   3.5 Đánh giá ưu điểm và hạn chế của hệ thống", "59"),
        ("KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN", "60"),
        ("TÀI LIỆU THAM KHẢO", "61"),
    ]

    for title, pg in toc_items:
        p_toc = doc.add_paragraph()
        p_toc.paragraph_format.line_spacing = 1.3
        p_toc.paragraph_format.space_before = Pt(2)
        p_toc.paragraph_format.space_after = Pt(2)
        r_t = p_toc.add_run(title)
        r_t.font.name = 'Times New Roman'
        r_t.font.size = Pt(12)
        if not title.startswith("   "):
            r_t.bold = True
        md(f"- **{title.strip()}** ... *trang {pg}*")

    doc.add_page_break()

    # ==========================================
    # DANH MỤC CHỮ VIẾT TẮT
    # ==========================================
    add_h1(doc, "DANH MỤC CÁC CHỮ VIẾT TẮT")
    md("\n## DANH MỤC CÁC CHỮ VIẾT TẮT\n")

    abbr_headers = ["STT", "Ký hiệu viết tắt", "Thuật ngữ tiếng Anh", "Ý nghĩa tiếng Việt"]
    abbr_data = [
        ["1", "API", "Application Programming Interface", "Giao diện lập trình ứng dụng"],
        ["2", "REST", "Representational State Transfer", "Kiến trúc truyền trạng thái đại diện"],
        ["3", "JWT", "JSON Web Token", "Mã thông báo định danh chuẩn JSON bảo mật"],
        ["4", "ORM", "Object-Relational Mapping", "Ánh xạ quan hệ đối tượng cơ sở dữ liệu"],
        ["5", "JPA", "Jakarta Persistence API", "Đặc tả chuẩn quản lý dữ liệu đối tượng Java"],
        ["6", "DTO", "Data Transfer Object", "Đối tượng truyền dữ liệu giữa các tầng kiến trúc"],
        ["7", "BCE", "Boundary - Control - Entity", "Mô hình phân tích đối tượng theo RUP/UML"],
        ["8", "VOPC", "View - Operation - Process - Control", "Biểu đồ lớp cộng tác hiện thực hóa chức năng"],
        ["9", "UI/UX", "User Interface / User Experience", "Giao diện người dùng / Trải nghiệm người dùng"],
        ["10", "SPA", "Single Page Application", "Ứng dụng web hiển thị động trên trang đơn"],
        ["11", "HMR", "Hot Module Replacement", "Cơ chế cập nhật mô-đun tức thì khi lập trình"],
        ["12", "SKU", "Stock Keeping Unit", "Mã phân loại đơn vị hàng hóa lưu kho"],
        ["13", "ERD", "Entity Relationship Diagram", "Biểu đồ thực thể liên kết cơ sở dữ liệu"],
        ["14", "CRUD", "Create, Read, Update, Delete", "Bốn thao tác dữ liệu cơ bản: Tạo, Đọc, Sửa, Xóa"],
        ["15", "RDBMS", "Relational Database Management System", "Hệ quản trị cơ sở dữ liệu quan hệ"]
    ]
    add_table_title(doc, "Bảng 0.1", "Danh mục các chữ viết tắt sử dụng trong đồ án")
    create_table_generic(doc, abbr_headers, abbr_data, col_widths=[1.5, 3.0, 5.5, 5.5])

    doc.add_page_break()

    # ==========================================
    # DANH MỤC BẢNG & HÌNH
    # ==========================================
    add_h1(doc, "DANH MỤC CÁC BẢNG VÀ HÌNH")
    md("\n## DANH MỤC CÁC BẢNG VÀ HÌNH\n")

    add_h2(doc, "1. Danh mục các bảng biểu")
    list_tables = [
        ("Bảng 0.1", "Danh mục các chữ viết tắt sử dụng trong đồ án"),
        ("Bảng 2.1", "Mô tả chi tiết Use case Đăng ký và Đăng nhập hệ thống (UC_01)"),
        ("Bảng 2.2", "Mô tả chi tiết Use case Xem chi tiết và Lựa chọn biến thể sản phẩm (UC_02)"),
        ("Bảng 2.3", "Mô tả chi tiết Use case Quản lý giỏ hàng mua sắm (UC_03)"),
        ("Bảng 2.4", "Mô tả chi tiết Use case Đặt hàng và Thanh toán trực tuyến VNPay (UC_04)"),
        ("Bảng 2.5", "Mô tả chi tiết Use case Quản lý đơn hàng phía Quản trị viên (UC_05)"),
        ("Bảng 2.6", "Mô tả chi tiết Use case Thêm mới sản phẩm và biến thể tồn kho (UC_06)"),
        ("Bảng 2.7", "Mô tả chi tiết Use case Xem thống kê Dashboard phân tích kinh doanh (UC_07)"),
        ("Bảng 2.8", "Cấu trúc bảng lưu trữ thông tin Người dùng (users)"),
        ("Bảng 2.9", "Cấu trúc bảng lưu trữ Danh mục sản phẩm (categories)"),
        ("Bảng 2.10", "Cấu trúc bảng lưu trữ Thương hiệu may đo (brands)"),
        ("Bảng 2.11", "Cấu trúc bảng lưu trữ Thông tin sản phẩm gốc (products)"),
        ("Bảng 2.12", "Cấu trúc bảng lưu trữ Biến thể sản phẩm: Màu sắc, Size, Tồn kho (product_variants)"),
        ("Bảng 2.13", "Cấu trúc bảng lưu trữ Hình ảnh minh họa theo màu sắc (product_images)"),
        ("Bảng 2.14", "Cấu trúc bảng lưu trữ Giỏ hàng người dùng và giỏ ẩn danh (carts)"),
        ("Bảng 2.15", "Cấu trúc bảng lưu trữ Chi tiết mặt hàng trong giỏ (cart_items)"),
        ("Bảng 2.16", "Cấu trúc bảng lưu trữ Đơn đặt hàng (orders)"),
        ("Bảng 2.17", "Cấu trúc bảng lưu trữ Chi tiết mặt hàng trong đơn hàng (order_items)"),
        ("Bảng 2.18", "Cấu trúc bảng lưu trữ Mã giảm giá khuyến mãi (coupons)"),
        ("Bảng 2.19", "Cấu trúc bảng lưu trữ Đánh giá và nhận xét của khách hàng (reviews)"),
        ("Bảng 2.20", "Cấu trúc bảng lưu trữ Sổ địa chỉ giao hàng (addresses)"),
        ("Bảng 2.21", "Cấu trúc bảng lưu trữ Giao dịch thanh toán trực tuyến (payments)"),
        ("Bảng 3.1", "Ca kiểm thử chức năng Đăng ký, Đăng nhập và Xác thực JWT (TC_AUTH)"),
        ("Bảng 3.2", "Ca kiểm thử chức năng Giỏ hàng, Tính toán số lượng và Tạm tính (TC_CART)"),
        ("Bảng 3.3", "Ca kiểm thử chức năng Áp dụng Coupon và Đặt hàng (TC_ORDER)"),
        ("Bảng 3.4", "Ca kiểm thử chức năng Thanh toán trực tuyến VNPay Sandbox (TC_PAY)"),
        ("Bảng 3.5", "Ca kiểm thử chức năng Quản trị: Thêm mới sản phẩm và biến thể (TC_ADMIN)"),
    ]
    for b_id, b_name in list_tables:
        p_tbl = doc.add_paragraph()
        p_tbl.paragraph_format.line_spacing = 1.3
        p_tbl.paragraph_format.space_before = Pt(2)
        p_tbl.paragraph_format.space_after = Pt(2)
        r_t = p_tbl.add_run(f"{b_id}: {b_name}")
        r_t.font.name = 'Times New Roman'
        r_t.font.size = Pt(12)
        md(f"- *{b_id}*: {b_name}")

    add_h2(doc, "2. Danh mục các hình ảnh và biểu đồ")
    list_figs = [
        ("Hình 1.1", "Sơ đồ kiến trúc phân tầng hệ thống Client - Server qua RESTful API"),
        ("Hình 2.1", "Biểu đồ Use Case tổng quát toàn bộ hệ thống L'ATELIER & CO."),
        ("Hình 2.2", "Biểu đồ Use Case phân rã chức năng phía Quản trị viên (Admin)"),
        ("Hình 2.3", "Biểu đồ Use Case phân rã chức năng phía Khách hàng (Customer)"),
        ("Hình 2.4", "Mô hình hóa Use case Đăng ký và Đăng nhập hệ thống (UC_01)"),
        ("Hình 2.5", "Mô hình hóa Use case Xem chi tiết và Lựa chọn biến thể sản phẩm (UC_02)"),
        ("Hình 2.6", "Mô hình hóa Use case Quản lý giỏ hàng mua sắm (UC_03)"),
        ("Hình 2.7", "Mô hình hóa Use case Đặt hàng và Thanh toán trực tuyến VNPay (UC_04)"),
        ("Hình 2.8", "Mô hình hóa Use case Quản lý đơn hàng phía Quản trị viên (UC_05)"),
        ("Hình 2.9", "Mô hình hóa Use case Thêm mới sản phẩm và biến thể (UC_06)"),
        ("Hình 2.10", "Mô hình hóa Use case Báo cáo thống kê Dashboard (UC_07)"),
        ("Hình 2.11", "Biểu đồ trình tự (Sequence Diagram) chức năng Đăng nhập hệ thống chuẩn BCE"),
        ("Hình 2.12", "Biểu đồ trình tự (Sequence Diagram) chức năng Đặt hàng và Thanh toán VNPay"),
        ("Hình 2.13", "Biểu đồ trình tự (Sequence Diagram) chức năng Thêm mới sản phẩm quản trị"),
        ("Hình 2.14", "Biểu đồ lớp phân tích VOPC cho ca sử dụng Đặt hàng và Thanh toán"),
        ("Hình 2.15", "Biểu đồ lớp phân tích VOPC cho ca sử dụng Quản trị sản phẩm"),
        ("Hình 2.16", "Biểu đồ lớp tổng thể (Overall Class Diagram) hệ thống Backend"),
        ("Hình 2.17", "Biểu đồ quan hệ thực thể (Entity Relationship Diagram - ERD) cơ sở dữ liệu"),
        ("Hình 3.1", "Giao diện Trang chủ và Khối giới thiệu Bộ sưu tập Capsule (Home Banner)"),
        ("Hình 3.2", "Giao diện Cửa hàng sản phẩm kèm Bộ lọc danh mục, mức giá và tìm kiếm"),
        ("Hình 3.3", "Giao diện Trang Chi tiết sản phẩm với lựa chọn tương tác Màu sắc & Size"),
        ("Hình 3.4", "Giao diện Túi mua sắm trượt (Cart Drawer) và tính năng cập nhật số lượng"),
        ("Hình 3.5", "Giao diện Trang Đặt hàng (Checkout) và cơ chế Áp dụng mã giảm giá"),
        ("Hình 3.6", "Giao diện Mô phỏng Cổng thanh toán trực tuyến bảo mật VNPay Sandbox"),
        ("Hình 3.7", "Giao diện Trang Xác nhận đơn hàng thành công (Order Confirmation)"),
        ("Hình 3.8", "Giao diện Trang Lịch sử đơn hàng của tôi (My Orders)"),
        ("Hình 3.9", "Giao diện Bảng điều khiển Quản trị viên (Dashboard KPI Analytics)"),
        ("Hình 3.10", "Giao diện Quản lý Đơn hàng và Cập nhật trạng thái giao hàng"),
        ("Hình 3.11", "Giao diện Quản lý Danh sách Sản phẩm, Tồn kho và Modal Thêm thiết kế mới"),
        ("Hình 3.12", "Giao diện Quản lý Danh sách Khách hàng trong hệ thống"),
    ]
    for f_id, f_name in list_figs:
        p_fig = doc.add_paragraph()
        p_fig.paragraph_format.line_spacing = 1.3
        p_fig.paragraph_format.space_before = Pt(2)
        p_fig.paragraph_format.space_after = Pt(2)
        r_f = p_fig.add_run(f"{f_id}: {f_name}")
        r_f.font.name = 'Times New Roman'
        r_f.font.size = Pt(12)
        md(f"- *{f_id}*: {f_name}")

    doc.add_page_break()

    # ==========================================
    # PHẦN MỞ ĐẦU
    # ==========================================
    add_h1(doc, "MỞ ĐẦU")
    md("\n# MỞ ĐẦU\n")

    add_h2(doc, "1. Lý do chọn đề tài")
    md("## 1. Lý do chọn đề tài\n")
    p_intro1 = (
        "Trong bối cảnh nền kinh tế số và thương mại điện tử (E-Commerce) bùng nổ mạnh mẽ trên phạm vi toàn cầu cũng như tại Việt Nam, "
        "thói quen tiêu dùng của khách hàng đã có sự chuyển dịch căn bản từ mua sắm truyền thống sang mua sắm trực tuyến. "
        "Tuy nhiên, đối với phân khúc thời trang may đo thiết kế cao cấp (Haute Couture & Tailoring), các nền tảng thương mại điện tử đại trà "
        "thường chưa đáp ứng được các yêu cầu khắt khe về thẩm mỹ thị giác, sự tinh tế trong trải nghiệm lựa chọn kích cỡ, phối màu biến thể, "
        "cũng như việc truyền tải câu chuyện thương hiệu và tinh thần nghệ thuật thủ công."
    )
    add_p(doc, p_intro1)
    md(p_intro1 + "\n")

    p_intro2 = (
        "Thương hiệu thời trang cao cấp đòi hỏi một website không chỉ hoạt động ổn định, bảo mật cao mà còn phải sở hữu ngôn ngữ thiết kế "
        "mang phong cách Hiện đại - Tối giản kết hợp định hướng Sang trọng (Modern Minimalist Luxury), tốc độ phản hồi tức thì và quy trình "
        "thanh toán trực tuyến mượt mà. Đề tài 'Xây dựng website thương mại điện tử thời trang may đo cao cấp L'ATELIER & CO.' được lựa chọn "
        "nhằm nghiên cứu và hiện thực hóa một giải pháp công nghệ toàn diện: áp dụng kiến trúc phần mềm tách biệt Client - Server hiện đại, "
        "kết hợp sức mạnh của framework Spring Boot phía Backend và thư viện React TypeScript phía Frontend, đồng thời tích hợp cổng thanh toán "
        "trực tuyến VNPay nhằm nâng cao chất lượng dịch vụ và tính khả thi trong kinh doanh thực tiễn."
    )
    add_p(doc, p_intro2)
    md(p_intro2 + "\n")

    add_h2(doc, "2. Mục tiêu đề tài")
    md("## 2. Mục tiêu đề tài\n")
    add_p(doc, "Đề tài tập trung giải quyết và đạt được các mục tiêu trọng tâm sau:")
    add_bullet(doc, "Nghiên cứu kiến trúc phần mềm hướng dịch vụ (Service-Oriented Architecture) dựa trên mô hình RESTful API chuẩn mực, phân tách độc lập giữa tầng xử lý nghiệp vụ Backend và tầng giao diện Frontend.", "Về mặt lý thuyết & kiến trúc: ")
    add_bullet(doc, "Xây dựng hệ thống Backend mạnh mẽ bằng Java 21, Spring Boot 3.4, bảo mật đăng nhập phân quyền bằng Spring Security và JWT; quản lý cơ sở dữ liệu quan hệ MySQL 8.0 thông qua Spring Data JPA và Hibernate ORM.", "Về mặt Backend: ")
    add_bullet(doc, "Xây dựng giao diện người dùng Single Page Application (SPA) bằng React 19, TypeScript, công cụ đóng gói Vite và hệ thống CSS thuần chuẩn thiết kế Modern Luxury; hỗ trợ tương tác mượt mà khi lọc sản phẩm, chọn màu sắc/kích cỡ và quản lý giỏ hàng.", "Về mặt Frontend: ")
    add_bullet(doc, "Tích hợp mô-đun mô phỏng Cổng thanh toán trực tuyến VNPay Sandbox, cho phép xử lý giao dịch điện tử an toàn, tự động cập nhật trạng thái hóa đơn và giảm trừ tồn kho sản phẩm chính xác.", "Về mặt thanh toán trực tuyến: ")
    add_bullet(doc, "Xây dựng phân hệ quản trị (Admin Portal) chuyên nghiệp với Dashboard thống kê doanh thu, quản lý đơn hàng nhiều trạng thái, quản lý tồn kho và thêm mới thiết kế thời trang trực quan.", "Về mặt quản trị hệ thống: ")

    md("- **Về mặt kiến trúc:** Phân tách hoàn toàn Client - Server qua RESTful API chuẩn mực.\n"
       "- **Về mặt Backend:** Sử dụng Java 21, Spring Boot 3.4, Spring Security JWT, Spring Data JPA, MySQL 8.0.\n"
       "- **Về mặt Frontend:** Ứng dụng React 19, TypeScript, Vite, Vanilla CSS Luxury Design System.\n"
       "- **Về mặt thanh toán:** Tích hợp mô phỏng Cổng thanh toán trực tuyến VNPay Sandbox.\n"
       "- **Về mặt quản trị:** Xây dựng Dashboard phân tích KPI, quản lý đơn hàng và thêm mới sản phẩm.\n")

    add_h2(doc, "3. Đối tượng và phạm vi nghiên cứu")
    md("## 3. Đối tượng và phạm vi nghiên cứu\n")
    add_p(doc, "Đối tượng nghiên cứu của đồ án bao gồm: quy trình bán lẻ thời trang may đo cao cấp; các giải pháp bảo mật phiên làm việc không trạng thái (Stateless Authentication) qua JWT; các kỹ thuật tối ưu hóa truy vấn dữ liệu quan hệ và cơ chế đồng bộ giỏ hàng cho người dùng ẩn danh lẫn người dùng đã xác thực.")
    add_p(doc, "Phạm vi đề tài tập trung triển khai và kiểm thử hoàn chỉnh trên môi trường máy chủ cục bộ (Localhost). Phân hệ nghiệp vụ bao gồm 2 nhóm người dùng chính: Khách hàng mua sắm (Customer) và Quản trị viên cửa hàng (Admin).")

    add_h2(doc, "4. Bố cục của báo cáo đồ án")
    md("## 4. Bố cục của báo cáo đồ án\n")
    add_p(doc, "Nội dung báo cáo được kết cấu thành 3 chương chính cùng phần Mở đầu, Kết luận và Tài liệu tham khảo theo đúng quy định của trường:")
    add_bullet(doc, "Trình bày tổng quan về nghiệp vụ thương mại điện tử thời trang, kiến trúc Client - Server, giới thiệu chi tiết các công nghệ Backend (Java, Spring Boot, MySQL), Frontend (React, TypeScript, CSS Luxury) và các công cụ phát triển, kiểm thử.", "Chương 1 - Tổng quan: ")
    add_bullet(doc, "Phân tích yêu cầu bài toán (chức năng và phi chức năng), xây dựng biểu đồ Use Case tổng quát và chi tiết, đặc tả chi tiết 7 Use Case then chốt, thiết kế biểu đồ trình tự (Sequence Diagram), biểu đồ lớp phân tích VOPC, biểu đồ lớp tổng thể và thiết kế chi tiết cơ sở dữ liệu quan hệ.", "Chương 2 - Phân tích, thiết kế: ")
    add_bullet(doc, "Mô tả môi trường triển khai, giới thiệu giao diện thực tế của từng chức năng phía Khách hàng và Quản trị viên, kịch bản các ca kiểm thử (Test Cases) và đánh giá ưu nhược điểm của sản phẩm.", "Chương 3 - Chương trình thử nghiệm: ")

    doc.add_page_break()

    # ==========================================
    # CHƯƠNG 1: TỔNG QUAN
    # ==========================================
    add_h1(doc, "CHƯƠNG 1: TỔNG QUAN")
    md("\n# CHƯƠNG 1: TỔNG QUAN\n")

    add_h2(doc, "1.1 Tổng quan về bài toán thương mại điện tử ngành thời trang may đo cao cấp")
    md("## 1.1 Tổng quan về bài toán thương mại điện tử ngành thời trang may đo cao cấp\n")
    p_c1_1 = (
        "Thời trang may đo cao cấp (Haute Couture và Contemporary Tailoring) là ngành hàng đòi hỏi tính chính xác, tính cá nhân hóa "
        "và thẩm mỹ thị giác vượt trội so với các mặt hàng tiêu dùng thông thường. Một sản phẩm thời trang cao cấp không chỉ có một mức giá cố định, "
        "mà gắn liền với nhiều biến thể (Variants) phức tạp bao gồm kích cỡ (S, M, L), bảng màu độc quyền (ví dụ: Đen Obsidian, Be Camel, "
        "Đen Onyx, Vàng Champagne), chất liệu thượng hạng (Cashmere Ý, Lụa dâu tằm 22 momme, Cotton Supima) và số lượng tồn kho riêng biệt cho từng biến thể."
    )
    add_p(doc, p_c1_1)
    md(p_c1_1 + "\n")

    p_c1_2 = (
        "Bài toán đặt ra cho hệ thống website L'ATELIER & CO. là số hóa trọn vẹn quy trình mua sắm thời trang sang trọng: "
        "từ việc truyền tải thị giác qua hình ảnh chất lượng cao, cung cấp cơ chế lọc danh mục thông minh, cho phép xem chi tiết từng màu sắc "
        "tương ứng với tồn kho thực tế, hỗ trợ giỏ hàng tức thì (Cart Drawer), tính toán giảm giá thông qua mã Coupon, cho tới quy trình đặt hàng "
        "và thanh toán trực tuyến qua cổng thanh toán bảo mật. Đồng thời, hệ thống cung cấp cho nhà quản trị một trung tâm điều hành (Backoffice Portal) "
        "để nắm bắt doanh thu, đơn hàng chờ xử lý và quản lý danh mục sản phẩm linh hoạt."
    )
    add_p(doc, p_c1_2)
    md(p_c1_2 + "\n")

    add_h2(doc, "1.2 Kiến trúc hệ thống Client - Server và mô hình RESTful API")
    md("## 1.2 Kiến trúc hệ thống Client - Server và mô hình RESTful API\n")
    p_c1_arch = (
        "Hệ thống được thiết kế theo mô hình kiến trúc Client - Server hiện đại với sự phân tách triệt để giữa tầng giao diện (Frontend) "
        "và tầng xử lý nghiệp vụ/dữ liệu (Backend). Hai thành phần này giao tiếp hoàn toàn không đồng bộ thông qua các giao thức HTTP/HTTPS "
        "và định dạng trao đổi dữ liệu chuẩn JSON (JavaScript Object Notation)."
    )
    add_p(doc, p_c1_arch)
    md(p_c1_arch + "\n")

    add_p(doc, "Các ưu điểm nổi bật của kiến trúc Client - Server phân tách:")
    add_bullet(doc, "Frontend và Backend có thể được phát triển song song, độc lập về công nghệ và chu kỳ triển khai.", "Tính độc lập cao: ")
    add_bullet(doc, "Tầng Backend cung cấp các API phi trạng thái (Stateless) có thể tái sử dụng cho nhiều nền tảng Client khác nhau như Web, Mobile App hoặc tích hợp bên thứ ba.", "Khả năng mở rộng (Scalability): ")
    add_bullet(doc, "Nhờ cơ chế Single Page Application (SPA), người dùng không cần tải lại toàn bộ trang web khi chuyển hướng hay tương tác, tạo cảm giác mượt mà như ứng dụng máy tính cục bộ.", "Tối ưu trải nghiệm người dùng: ")

    add_image_placeholder(doc,
        "Bạn hãy vẽ hoặc dán sơ đồ khối kiến trúc hệ thống Client - Server: gồm Browser (React 19 + TypeScript) "
        "kết nối qua HTTP/JSON RESTful API tới Spring Boot 3 Backend (Security, Controller, Service, Repository) "
        "và kết nối tới MySQL Database cùng VNPay Gateway.",
        code_content=(
            "graph LR\n"
            "    Client[Frontend: React 19 + TypeScript (Port 5173)] -- HTTP/JSON REST API --> Server[Backend: Spring Boot 3.4 (Port 8080)]\n"
            "    Server -- JDBC/JPA --> DB[(MySQL 8.0 Database)]\n"
            "    Server -- Redirect/IPN --> VNPay[VNPay Sandbox Payment Gateway]\n"
        )
    )
    add_figure_caption(doc, "Hình 1.1", "Sơ đồ kiến trúc phân tầng hệ thống Client - Server qua RESTful API")

    add_h2(doc, "1.3 Công nghệ phát triển phía Backend (Spring Boot 3 & Java 21)")
    md("## 1.3 Công nghệ phát triển phía Backend (Spring Boot 3 & Java 21)\n")
    add_p(doc, "Phía máy chủ Backend của dự án được xây dựng dựa trên ngăn xếp công nghệ tiên tiến của hệ sinh thái Java doanh nghiệp:")
    add_bullet(doc, "Phiên bản Java Long-Term Support (LTS) mang lại hiệu năng xử lý cao, hỗ trợ Virtual Threads (Project Loom), Record patterns và quản lý bộ nhớ tối ưu.", "Ngôn ngữ Java 21 LTS: ")
    add_bullet(doc, "Framework hàng đầu thế giới cho ứng dụng doanh nghiệp với cấu hình tự động (Auto-configuration), nhúng sẵn máy chủ Tomcat 10, hỗ trợ quy chuẩn RestController và xử lý ngoại lệ tập trung (GlobalExceptionHandler).", "Spring Boot 3.4.3: ")
    add_bullet(doc, "Cơ chế bảo mật theo mô hình không trạng thái (Stateless Security). Mật khẩu người dùng được mã hóa một chiều bằng giải thuật BCrypt (độ phức tạp salt 10 vòng). Các yêu cầu bảo vệ được xác thực qua JwtAuthenticationFilter dựa trên thư viện JJWT 0.12.6.", "Spring Security & JWT: ")
    add_bullet(doc, "Tự động sinh các câu lệnh truy vấn cơ sở dữ liệu dựa trên Entity và Repository Interface; hỗ trợ quản lý giao dịch (@Transactional) bảo đảm tính toàn vẹn ACID của đơn hàng.", "Spring Data JPA & Hibernate ORM 6.6: ")
    add_bullet(doc, "Hệ quản trị cơ sở dữ liệu quan hệ mạnh mẽ, được cấu hình toàn bộ bảng mã và phép đối chiếu utf8mb4_unicode_ci nhằm lưu trữ hoàn hảo tiếng Việt có dấu.", "Cơ sở dữ liệu MySQL 8.0: ")

    add_h2(doc, "1.4 Công nghệ phát triển phía Frontend (React 19, TypeScript, Vite)")
    md("## 1.4 Công nghệ phát triển phía Frontend (React 19, TypeScript, Vite)\n")
    add_p(doc, "Phía máy khách Frontend được định hướng xây dựng theo tiêu chuẩn thời trang xa xỉ đương đại:")
    add_bullet(doc, "Thư viện xây dựng giao diện người dùng dựa trên thành phần (Component-driven). Cơ chế Virtual DOM tối ưu hóa việc vẽ lại giao diện khi giỏ hàng hoặc bộ lọc thay đổi.", "React 19 & TypeScript: ")
    add_bullet(doc, "Công cụ đóng gói và máy chủ phát triển thế hệ mới dựa trên ES Modules và trình biên dịch Rollup, tốc độ khởi động cực nhanh và cập nhật mã nguồn (HMR) trong vài mili-giây.", "Vite Build Tool: ")
    add_bullet(doc, "Toàn bộ hệ thống giao diện được định nghĩa theo thiết kế riêng biệt (Modern Minimalist Luxury Design System) trong index.css với các biến màu CSS Variables (Gold #C5A880, Dark Charcoal #0E0E10, Surface Cream #FAF9F6), hiệu ứng kính mờ (Glassmorphism backdrop-filter) và chuyển động vi mô (Micro-animations).", "Vanilla CSS Design System: ")
    add_bullet(doc, "Tích hợp bộ font serif Playfair Display (chuẩn tạp chí thời trang Vogue/Harper's Bazaar) và Be Vietnam Pro (sans-serif thiết kế chuyên biệt cho ngôn ngữ tiếng Việt) từ Google Fonts.", "Nghệ thuật chữ (Typography): ")

    add_h2(doc, "1.5 Tích hợp cổng thanh toán trực tuyến mô phỏng (VNPay Gateway Sandbox)")
    md("## 1.5 Tích hợp cổng thanh toán trực tuyến mô phỏng (VNPay Gateway Sandbox)\n")
    p_c1_vnpay = (
        "Trong thương mại điện tử hiện đại, thanh toán không dùng tiền mặt là tiêu chí bắt buộc. Hệ thống L'ATELIER & CO. "
        "tích hợp phân hệ thanh toán trực tuyến hỗ trợ đồng thời hai phương thức: Thanh toán khi nhận hàng (COD) "
        "và Thanh toán điện tử mô phỏng qua cổng VNPay Sandbox. Đối với phương thức trực tuyến, hệ thống sinh mã đơn hàng duy nhất, "
        "kết nối tới modal xử lý giao dịch điện tử và cho phép khách hàng trải nghiệm quy trình xác thực thẻ ngân hàng an toàn. "
        "Sau khi giao dịch thành công, hệ thống tự động cập nhật trạng thái đơn hàng sang 'PROCESSING' hoặc 'CONFIRMED' và lưu lại vết giao dịch."
    )
    add_p(doc, p_c1_vnpay)
    md(p_c1_vnpay + "\n")

    add_h2(doc, "1.6 Môi trường phát triển, biên dịch và công cụ kiểm thử")
    md("## 1.6 Môi trường phát triển, biên dịch và công cụ kiểm thử\n")
    add_bullet(doc, "Microsoft Windows 10/11 64-bit, Node.js v20+, Java Development Kit (JDK) 21 LTS, MySQL Server 8.0.", "Môi trường hệ điều hành & runtime: ")
    add_bullet(doc, "Visual Studio Code, IntelliJ IDEA Ultimate, MySQL Workbench.", "Môi trường lập trình (IDE): ")
    add_bullet(doc, "Apache Maven 3.9 (quản lý thư viện Backend với cờ -parameters), npm/Vite (quản lý gói Frontend).", "Công cụ biên dịch & đóng gói: ")
    add_bullet(doc, "Postman, cURL, trình duyệt Google Chrome với DevTools (kiểm tra Network, Console, LocalStorage).", "Công cụ kiểm thử & gỡ lỗi: ")

    doc.add_page_break()

    # ==========================================
    # CHƯƠNG 2: PHÂN TÍCH, THIẾT KẾ
    # ==========================================
    add_h1(doc, "CHƯƠNG 2: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG")
    md("\n# CHƯƠNG 2: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG\n")

    add_h2(doc, "2.1 Mô tả bài toán")
    md("## 2.1 Mô tả bài toán\n")
    p_c2_prob = (
        "Hệ thống thương mại điện tử thời trang L'ATELIER & CO. được xây dựng nhằm cung cấp giải pháp bán hàng đa kênh "
        "trực tuyến cho các dòng sản phẩm may đo thủ công tinh xảo (Blazer dạ Cashmere, Đầm lụa bias-cut, Sơ mi Poplin, Măng tô Trench Coat). "
        "Bài toán bao gồm hai luồng quy trình nghiệp vụ trọng tâm:"
    )
    add_p(doc, p_c2_prob)
    md(p_c2_prob + "\n")

    add_p(doc, "1. Quy trình nghiệp vụ phía Khách hàng (Customer Journey):", bold_prefix="")
    add_bullet(doc, "Khách hàng có thể truy cập trang chủ để khám phá các bộ sưu tập theo mùa (Capsule Collection) hoặc duyệt trang Cửa hàng.", "Duyệt và tìm kiếm sản phẩm: ")
    add_bullet(doc, "Hệ thống hỗ trợ lọc theo Danh mục, mức giá tối thiểu/tối đa và từ khóa tìm kiếm theo tên hoặc chất liệu vải.", "Bộ lọc thông minh: ")
    add_bullet(doc, "Tại trang chi tiết, khách hàng chọn Màu sắc (kèm nút mẫu màu trực quan) và Kích cỡ tương ứng; hệ thống cập nhật ảnh và cảnh báo số lượng tồn kho.", "Lựa chọn biến thể may đo: ")
    add_bullet(doc, "Khách hàng có thể thêm vào giỏ mà không cần đăng nhập ngay (nhờ Session ID ẩn danh). Giỏ hàng dạng slide-over cho phép tăng/giảm số lượng hoặc xóa mặt hàng.", "Quản lý giỏ hàng: ")
    add_bullet(doc, "Khách hàng nhập thông tin nhận hàng, nhập mã ưu đãi (ví dụ: LUXE10, VIP200K), chọn phương thức thanh toán (COD hoặc VNPay trực tuyến) và gửi đơn hàng.", "Thanh toán & Áp dụng Coupon: ")
    add_bullet(doc, "Khách hàng đăng nhập có thể theo dõi tiến độ đơn hàng tại trang 'Đơn hàng của tôi'.", "Theo dõi trạng thái: ")

    add_p(doc, "2. Quy trình nghiệp vụ phía Quản trị viên (Admin Operations):", bold_prefix="")
    add_bullet(doc, "Theo dõi 5 chỉ số KPI then chốt gồm: Tổng doanh thu thực tế, Tổng đơn hàng, Đơn chờ xử lý, Tổng số thiết kế và Khách hàng VIP; biểu đồ tỷ lệ đơn hàng và cảnh báo tồn kho thấp.", "Bảng điều khiển (Dashboard): ")
    add_bullet(doc, "Xem danh sách đơn hàng theo trạng thái (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED), xem chi tiết sản phẩm, địa chỉ giao hàng và cập nhật trạng thái đơn hàng.", "Xử lý đơn hàng: ")
    add_bullet(doc, "Xem danh mục sản phẩm, biến thể tồn kho và tạo mới thiết kế với đầy đủ thuộc tính (Danh mục, Thương hiệu, Chất liệu, Cách bảo quản, Danh sách biến thể Màu/Size/Giá/Tồn kho).", "Quản lý kho hàng & Thêm mới: ")
    add_bullet(doc, "Xem danh sách khách hàng đăng ký, thông tin liên hệ và lịch sử giao dịch.", "Quản lý khách hàng: ")

    add_h2(doc, "2.2 Yêu cầu bài toán")
    md("## 2.2 Yêu cầu bài toán\n")

    add_h3(doc, "2.2.1 Yêu cầu chức năng")
    md("### 2.2.1 Yêu cầu chức năng\n")
    add_p(doc, "Hệ thống đáp ứng các nhóm yêu cầu chức năng cụ thể sau:")
    add_bullet(doc, "Đăng ký tài khoản, Đăng nhập (trả về JWT), Đăng xuất, Tự động khôi phục phiên qua LocalStorage, Xem thông tin cá nhân qua API /auth/me.", "Phân hệ Xác thực & Tài khoản: ")
    add_bullet(doc, "Hiển thị danh sách sản phẩm phân trang, Lọc theo Danh mục/Thương hiệu/Khoảng giá, Tìm kiếm từ khóa, Xem chi tiết sản phẩm kèm biến thể và hình ảnh theo màu sắc.", "Phân hệ Danh mục & Sản phẩm: ")
    add_bullet(doc, "Thêm sản phẩm biến thể vào giỏ, Xem giỏ hàng tức thì, Cập nhật số lượng, Xóa sản phẩm, Tự động tính tổng tiền và hỗ trợ Session Cart cho khách chưa đăng nhập.", "Phân hệ Giỏ hàng: ")
    add_bullet(doc, "Kiểm tra tính hợp lệ của mã giảm giá (giảm theo % hoặc số tiền cố định), kiểm tra giá trị đơn hàng tối thiểu và số lượt sử dụng tối đa.", "Phân hệ Khuyến mãi: ")
    add_bullet(doc, "Tạo đơn hàng mới, Lưu chi tiết từng sản phẩm tại thời điểm mua (Snapshot giá/tên), Hỗ trợ COD và VNPay, Gửi thông báo đặt hàng thành công.", "Phân hệ Đặt hàng & Thanh toán: ")
    add_bullet(doc, "Thống kê KPI tài chính, Quản lý đơn hàng, Chuyển trạng thái đơn hàng, Thêm sản phẩm mới kèm nhiều biến thể, Quản lý danh sách người dùng.", "Phân hệ Quản trị (Admin Portal): ")

    add_h3(doc, "2.2.2 Yêu cầu phi chức năng")
    md("### 2.2.2 Yêu cầu phi chức năng\n")
    add_bullet(doc, "Mật khẩu người dùng được băm an toàn bằng BCrypt; API quản trị bắt buộc quyền ROLE_ADMIN qua JWT Filter; ngăn chặn triệt để tấn công XSS và SQL Injection thông qua JPA Parameterized Queries.", "Tính bảo mật (Security): ")
    add_bullet(doc, "Thời gian phản hồi API trung bình dưới 200ms; trang web tải ban đầu dưới 1.5 giây nhờ cơ chế code-splitting của Vite và nén gzip tài nguyên.", "Hiệu năng (Performance): ")
    add_bullet(doc, "Cơ chế quản lý giao dịch Transactional đảm bảo số lượng tồn kho (stock_quantity) không bị trừ âm khi nhiều đơn hàng cùng mua đồng thời.", "Tính toàn vẹn dữ liệu (Data Integrity): ")
    add_bullet(doc, "Giao diện tương thích hoàn toàn trên mọi độ phân giải màn hình từ Desktop (1920x1080), Tablet (768px) đến Mobile (375px); ngôn ngữ thiết kế đồng nhất theo phong cách Luxury.", "Khả năng tương thích & UX/UI: ")

    add_h2(doc, "2.3 Phân tích tác nhân hệ thống (Actors)")
    md("## 2.3 Phân tích tác nhân hệ thống (Actors)\n")
    add_p(doc, "Hệ thống xác định 3 tác nhân (Actors) chính tương tác với ứng dụng:")
    add_bullet(doc, "Người dùng truy cập website để tìm kiếm, xem mẫu thiết kế thời trang, quản lý giỏ hàng, đặt hàng trực tuyến và theo dõi lịch sử đơn hàng của mình.", "1. Khách hàng (Customer): ")
    add_bullet(doc, "Nhân sự quản trị có quyền cao nhất trong hệ thống, được cấp quyền ROLE_ADMIN để xem bảng điều khiển doanh thu, xử lý trạng thái đơn hàng, bổ sung thiết kế và theo dõi người dùng.", "2. Quản trị viên (Admin): ")
    add_bullet(doc, "Hệ thống trung gian tài chính độc lập tiếp nhận yêu cầu thanh toán trực tuyến, xác thực thông tin thẻ/tài khoản và phản hồi kết quả giao dịch về hệ thống.", "3. Cổng thanh toán VNPay (External System): ")

    add_h2(doc, "2.4 Biểu đồ Use Case")
    md("## 2.4 Biểu đồ Use Case\n")

    add_h3(doc, "2.4.1 Biểu đồ Use Case tổng quát")
    md("### 2.4.1 Biểu đồ Use Case tổng quát\n")
    add_p(doc, "Biểu đồ Use Case tổng quát thể hiện mối quan hệ giữa các tác nhân (Khách hàng, Quản trị viên, Cổng VNPay) với toàn bộ các nhóm chức năng cốt lõi của hệ thống:")

    add_image_placeholder(doc,
        "Bạn hãy vẽ lại biểu đồ Use Case tổng quát này trên StarUML hoặc Draw.io "
        "(gồm 3 Actor: Customer, Admin, VNPay Gateway và các Use Case chính) rồi dán ảnh vào đây.",
        code_content=(
            "@startuml\n"
            "left to right direction\n"
            "actor \"Khách Hàng (Customer)\" as Cust\n"
            "actor \"Quản Trị Viên (Admin)\" as Adm\n"
            "actor \"Cổng VNPay\" as VNPay <<System>>\n\n"
            "rectangle \"Hệ Thống Thời Trang L'ATELIER & CO.\" {\n"
            "    usecase \"UC01: Đăng nhập & Đăng ký\" as UC1\n"
            "    usecase \"UC02: Duyệt & Lọc sản phẩm\" as UC2\n"
            "    usecase \"UC03: Quản lý giỏ hàng\" as UC3\n"
            "    usecase \"UC04: Đặt hàng & Thanh toán\" as UC4\n"
            "    usecase \"UC05: Quản lý đơn hàng Admin\" as UC5\n"
            "    usecase \"UC06: Thêm sản phẩm & Biến thể\" as UC6\n"
            "    usecase \"UC07: Báo cáo thống kê Dashboard\" as UC7\n"
            "}\n\n"
            "Cust --> UC1\n"
            "Cust --> UC2\n"
            "Cust --> UC3\n"
            "Cust --> UC4\n"
            "UC4 ..> VNPay : <<interact>>\n"
            "Adm --> UC1\n"
            "Adm --> UC5\n"
            "Adm --> UC6\n"
            "Adm --> UC7\n"
            "@enduml"
        )
    )
    add_figure_caption(doc, "Hình 2.1", "Biểu đồ Use Case tổng quát toàn bộ hệ thống L'ATELIER & CO.")

    add_h3(doc, "2.4.2 Biểu đồ Use Case phía Quản trị viên (Admin)")
    md("### 2.4.2 Biểu đồ Use Case phía Quản trị viên (Admin)\n")
    add_p(doc, "Phân hệ Quản trị viên tập trung vào các chức năng vận hành cửa hàng và quản trị dữ liệu kinh doanh:")

    add_image_placeholder(doc,
        "Bạn hãy vẽ lại biểu đồ Use Case phía Quản trị viên (Actor: Admin; các Use case: Xem Dashboard KPI, "
        "Quản lý Đơn hàng, Cập nhật trạng thái giao hàng, Thêm mới thiết kế thời trang, Quản lý biến thể màu/size, Xem danh sách khách hàng).",
        code_content=(
            "@startuml\n"
            "actor \"Quản Trị Viên (Admin)\" as Adm\n"
            "rectangle \"Phân Hệ Quản Trị (Admin Portal)\" {\n"
            "    usecase \"Xem Dashboard KPI Doanh Thu\" as UC_Dash\n"
            "    usecase \"Quản Lý Đơn Hàng\" as UC_Order\n"
            "    usecase \"Cập Nhật Trạng Thái Đơn\" as UC_Status\n"
            "    usecase \"Quản Lý Sản Phẩm & Tồn Kho\" as UC_Prod\n"
            "    usecase \"Thêm Mới Thiết Kế Thời Trang\" as UC_AddProd\n"
            "    usecase \"Quản Lý Khách Hàng\" as UC_Users\n"
            "}\n"
            "Adm --> UC_Dash\n"
            "Adm --> UC_Order\n"
            "Adm --> UC_Status\n"
            "Adm --> UC_Prod\n"
            "Adm --> UC_AddProd\n"
            "Adm --> UC_Users\n"
            "UC_Status ..> UC_Order : <<extend>>\n"
            "UC_AddProd ..> UC_Prod : <<include>>\n"
            "@enduml"
        )
    )
    add_figure_caption(doc, "Hình 2.2", "Biểu đồ Use Case phân rã chức năng phía Quản trị viên (Admin)")

    add_h3(doc, "2.4.3 Biểu đồ Use Case phía Người dùng (Khách hàng)")
    md("### 2.4.3 Biểu đồ Use Case phía Người dùng (Khách hàng)\n")
    add_p(doc, "Phân hệ Người dùng phục vụ trải nghiệm mua sắm trực tuyến khép kín của khách hàng:")

    add_image_placeholder(doc,
        "Bạn hãy vẽ biểu đồ Use Case phía Khách hàng (Actor: Khách hàng; các Use case: Duyệt bộ sưu tập, Lọc theo giá/danh mục, "
        "Xem chi tiết sản phẩm, Chọn biến thể Màu/Size, Thêm vào giỏ, Áp dụng mã Coupon, Thanh toán trực tuyến VNPay, Xem lịch sử đơn hàng).",
        code_content=(
            "@startuml\n"
            "actor \"Khách Hàng (Customer)\" as Cust\n"
            "actor \"Cổng VNPay\" as VNPay <<System>>\n"
            "rectangle \"Phân Hệ Mua Sắm (Customer Portal)\" {\n"
            "    usecase \"Duyệt Bộ Sưu Tập & Cửa Hàng\" as UC_Browse\n"
            "    usecase \"Tìm Kiếm & Lọc Theo Giá\" as UC_Filter\n"
            "    usecase \"Xem Chi Tiết & Chọn Biến Thể Màu/Size\" as UC_Detail\n"
            "    usecase \"Thêm Vào Giỏ & Quản Lý Giỏ Hàng\" as UC_Cart\n"
            "    usecase \"Áp Dụng Mã Giảm Giá\" as UC_Coupon\n"
            "    usecase \"Đặt Hàng & Thanh Toán\" as UC_Checkout\n"
            "    usecase \"Xem Lịch Sử Đơn Hàng\" as UC_MyOrders\n"
            "}\n"
            "Cust --> UC_Browse\n"
            "Cust --> UC_Filter\n"
            "Cust --> UC_Detail\n"
            "Cust --> UC_Cart\n"
            "Cust --> UC_Checkout\n"
            "Cust --> UC_MyOrders\n"
            "UC_Coupon ..> UC_Checkout : <<include>>\n"
            "UC_Checkout ..> VNPay : <<interact>>\n"
            "@enduml"
        )
    )
    add_figure_caption(doc, "Hình 2.3", "Biểu đồ Use Case phân rã chức năng phía Khách hàng (Customer)")

    # ==========================================
    # 2.5 MÔ TẢ CHI TIẾT CÁC USE CASE
    # ==========================================
    add_h2(doc, "2.5 Mô tả chi tiết các Use Case chính")
    md("## 2.5 Mô tả chi tiết các Use Case chính\n")
    add_p(doc, "Phần này mô tả đặc tả chi tiết 7 Use case then chốt của hệ thống theo cấu trúc chuẩn biểu mẫu của trường:")

    # UC 01
    add_h3(doc, "2.5.1 Use case Đăng ký và Đăng nhập hệ thống (UC_01)")
    add_table_title(doc, "Bảng 2.1", "Mô tả chi tiết Use case Đăng ký và Đăng nhập hệ thống (UC_01)")
    create_use_case_table(
        doc,
        uc_id="UC_01",
        uc_name="Đăng ký và Đăng nhập hệ thống",
        actor="Khách hàng, Quản trị viên",
        desc="Cho phép người dùng xác thực danh tính bằng Email và Mật khẩu, hoặc tạo mới tài khoản thành viên để lưu trữ thông tin và lịch sử mua sắm.",
        trigger="Người dùng nhấp vào biểu tượng tài khoản trên thanh tiêu đề (Header) của website.",
        pre_cond="Người dùng đã truy cập website và có kết nối Internet ổn định.",
        main_steps=[
            (1, "Người dùng", "Bấm vào icon tài khoản trên Header, hệ thống hiển thị Modal đăng nhập/đăng ký."),
            (2, "Người dùng", "Nhập Địa chỉ Email và Mật khẩu (hoặc bấm chọn tài khoản mẫu nhanh [Admin] / [Khách Hàng])."),
            (3, "Người dùng", "Bấm nút 'ĐĂNG NHẬP' (hoặc 'ĐĂNG KÝ')."),
            (4, "Hệ thống", "Backend kiểm tra tính hợp lệ của dữ liệu, truy vấn tài khoản trong bảng users và kiểm tra mật khẩu qua BCryptPasswordEncoder."),
            (5, "Hệ thống", "Nếu hợp lệ, sinh mã JWT Token (thời hạn 24 giờ), đóng gói đối tượng UserDto và trả về kết quả 200 OK."),
            (6, "Frontend", "Lưu JWT Token vào LocalStorage ('luxe_token'), cập nhật thông tin User ('luxe_user'), đóng Modal và hiển thị thông báo chào mừng."),
        ],
        alt_steps=[
            (1, "Hệ thống", "Nếu Email không tồn tại hoặc mật khẩu sai, hệ thống trả về mã lỗi 401/400 kèm thông báo: 'Email hoặc mật khẩu không chính xác'."),
            (2, "Hệ thống", "Nếu đăng ký mà Email đã được sử dụng trước đó, hiển thị thông báo lỗi 'Email này đã được đăng ký tài khoản'."),
        ],
        post_cond="Người dùng được đăng nhập thành công, phiên làm việc được duy trì và hiển thị quyền hạn tương ứng (Customer hoặc Admin)."
    )
    add_image_placeholder(doc,
        "Bạn hãy vẽ sơ đồ mô hình hóa ca sử dụng Đăng nhập (Actor Khách hàng/Admin kết nối tới Use case Đăng nhập, "
        "kèm liên kết <<include>> tới Use case Xác thực JWT và Kiểm tra BCrypt).",
        code_content=(
            "@startuml\n"
            "actor NgườiDùng\n"
            "usecase \"Đăng Nhập Hệ Thống\" as UC_Login\n"
            "usecase \"Kiểm Tra Mật Khẩu BCrypt\" as UC_BCrypt\n"
            "usecase \"Sinh Mã JWT Token\" as UC_JWT\n"
            "NgườiDùng --> UC_Login\n"
            "UC_Login ..> UC_BCrypt : <<include>>\n"
            "UC_Login ..> UC_JWT : <<include>>\n"
            "@enduml"
        )
    )
    add_figure_caption(doc, "Hình 2.4", "Mô hình hóa Use case Đăng ký và Đăng nhập hệ thống (UC_01)")

    # UC 02
    add_h3(doc, "2.5.2 Use case Xem chi tiết và Lựa chọn biến thể sản phẩm (UC_02)")
    add_table_title(doc, "Bảng 2.2", "Mô tả chi tiết Use case Xem chi tiết và Lựa chọn biến thể sản phẩm (UC_02)")
    create_use_case_table(
        doc,
        uc_id="UC_02",
        uc_name="Xem chi tiết và Lựa chọn biến thể sản phẩm",
        actor="Khách hàng",
        desc="Cho phép người dùng xem thông tin may đo chi tiết (chất liệu vải, cách bảo quản), thư viện ảnh tương ứng và tùy chọn biến thể màu sắc, kích cỡ theo tồn kho thực tế.",
        trigger="Khách hàng nhấp vào thẻ sản phẩm tại Trang chủ hoặc Trang cửa hàng.",
        pre_cond="Sản phẩm đang ở trạng thái kích hoạt (is_active = true) trên hệ thống.",
        main_steps=[
            (1, "Khách hàng", "Bấm vào thẻ sản phẩm hoặc nút 'Xem chi tiết', chuyển hướng đến ProductDetailPage theo slug sản phẩm."),
            (2, "Frontend", "Gửi yêu cầu GET /api/v1/products/slug/{slug} tới Backend."),
            (3, "Hệ thống", "Backend nạp thông tin sản phẩm từ bảng products, kèm danh sách biến thể variants và ảnh images theo mã màu."),
            (4, "Frontend", "Hiển thị tên thiết kế, giá gốc, giá ưu đãi, chất liệu vải thượng hạng, hướng dẫn giặt ủi và các nút chọn màu sắc."),
            (5, "Khách hàng", "Bấm chọn màu sắc mong muốn (ví dụ: Đen Onyx, Vàng Champagne)."),
            (6, "Frontend", "Tự động đổi ảnh lớn sang ảnh màu tương ứng và nạp danh sách kích cỡ (S, M, L) có tồn kho thực tế."),
            (7, "Khách hàng", "Bấm chọn kích cỡ, hệ thống hiển thị số lượng tồn kho còn lại."),
        ],
        alt_steps=[
            (1, "Frontend", "Nếu một biến thể có tồn kho bằng 0 (stock_quantity = 0), nút chọn kích cỡ chuyển sang trạng thái mờ (disabled) và thông báo 'Hết hàng tạm thời'."),
            (2, "Hệ thống", "Nếu slug sản phẩm không tồn tại, Backend trả về 404 Not Found; giao diện hiển thị thông báo không tìm thấy sản phẩm."),
        ],
        post_cond="Khách hàng nắm rõ thông tin sản phẩm và đã chọn được biến thể màu/size hợp lệ để sẵn sàng thêm vào giỏ hàng."
    )
    add_image_placeholder(doc,
        "Bạn hãy vẽ sơ đồ mô hình hóa ca sử dụng Xem chi tiết và chọn biến thể (Actor Khách hàng kết nối Use case Xem Chi Tiết, "
        "kèm các Use case con: Chọn Màu Sắc, Chọn Kích Cỡ, Đổi Thư Viện Ảnh).",
        code_content=(
            "@startuml\n"
            "actor KháchHàng\n"
            "usecase \"Xem Chi Tiết Sản Phẩm\" as UC_Detail\n"
            "usecase \"Chọn Biến Thể Màu Sắc\" as UC_Color\n"
            "usecase \"Chọn Kích Cỡ Size\" as UC_Size\n"
            "usecase \"Cập Nhật Ảnh & Tồn Kho\" as UC_Sync\n"
            "KháchHàng --> UC_Detail\n"
            "UC_Detail ..> UC_Color : <<include>>\n"
            "UC_Detail ..> UC_Size : <<include>>\n"
            "UC_Color ..> UC_Sync : <<include>>\n"
            "@enduml"
        )
    )
    add_figure_caption(doc, "Hình 2.5", "Mô hình hóa Use case Xem chi tiết và Lựa chọn biến thể sản phẩm (UC_02)")

    # UC 03
    add_h3(doc, "2.5.3 Use case Quản lý giỏ hàng mua sắm (UC_03)")
    add_table_title(doc, "Bảng 2.3", "Mô tả chi tiết Use case Quản lý giỏ hàng mua sắm (UC_03)")
    create_use_case_table(
        doc,
        uc_id="UC_03",
        uc_name="Quản lý giỏ hàng mua sắm",
        actor="Khách hàng",
        desc="Cho phép khách hàng lưu giữ các thiết kế đã chọn, thay đổi số lượng, xóa sản phẩm khỏi giỏ và tự động tính tổng thanh toán tức thì mà không bị mất dữ liệu khi làm mới trang.",
        trigger="Khách hàng nhấp nút 'THÊM VÀO TÚI' hoặc mở giỏ hàng từ Header.",
        pre_cond="Khách hàng đã chọn biến thể hợp lệ (Màu sắc và Size) tại trang chi tiết sản phẩm.",
        main_steps=[
            (1, "Khách hàng", "Bấm nút 'THÊM VÀO TÚI' với số lượng mong muốn."),
            (2, "Frontend", "Gửi yêu cầu POST /api/v1/cart/items kèm variantId, quantity và sessionId (hoặc JWT Token)."),
            (3, "Hệ thống", "Backend kiểm tra tồn kho của variant. Nếu đủ, lưu/cập nhật bản ghi trong cart_items và tính lại subtotal."),
            (4, "Frontend", "Nhận giỏ hàng mới, mở thanh trượt CartDrawer bên phải màn hình và hiển thị thông báo Toast thành công."),
            (5, "Khách hàng", "Có thể bấm nút '+' hoặc '-' để tăng giảm số lượng hoặc bấm nút icon thùng rác để xóa sản phẩm."),
            (6, "Frontend", "Gửi lệnh PUT/DELETE tương ứng đến Backend và cập nhật lại giao diện trong 0.1 giây."),
        ],
        alt_steps=[
            (1, "Hệ thống", "Nếu số lượng khách yêu cầu vượt quá tồn kho hiện có, Backend ném ngoại lệ BadRequestException: 'Số lượng yêu cầu vượt quá tồn kho khả dụng'."),
            (2, "Frontend", "Hiển thị thông báo cảnh báo và giữ nguyên số lượng cũ trong giỏ hàng."),
        ],
        post_cond="Giỏ hàng được cập nhật đồng bộ trên máy chủ và hiển thị chính xác tổng số lượng sản phẩm trên icon túi xách."
    )
    add_image_placeholder(doc,
        "Bạn hãy vẽ sơ đồ mô hình hóa ca sử dụng Quản lý giỏ hàng (Actor Khách hàng kết nối Use case Quản Lý Giỏ Hàng, "
        "kèm quan hệ <<include>> tới Thêm Sản Phẩm, Sửa Số Lượng, Xóa Sản Phẩm).",
        code_content=(
            "@startuml\n"
            "actor KháchHàng\n"
            "usecase \"Quản Lý Giỏ Hàng\" as UC_Cart\n"
            "usecase \"Thêm Sản Phẩm Biến Thể\" as UC_Add\n"
            "usecase \"Cập Nhật Số Lượng (+/-)\" as UC_Qty\n"
            "usecase \"Xóa Sản Phẩm Khỏi Giỏ\" as UC_Del\n"
            "usecase \"Kiểm Tra Tồn Kho\" as UC_Stock\n"
            "KháchHàng --> UC_Cart\n"
            "UC_Cart ..> UC_Add : <<include>>\n"
            "UC_Cart ..> UC_Qty : <<include>>\n"
            "UC_Cart ..> UC_Del : <<include>>\n"
            "UC_Add ..> UC_Stock : <<include>>\n"
            "@enduml"
        )
    )
    add_figure_caption(doc, "Hình 2.6", "Mô hình hóa Use case Quản lý giỏ hàng mua sắm (UC_03)")

    # UC 04
    add_h3(doc, "2.5.4 Use case Đặt hàng và Thanh toán trực tuyến VNPay (UC_04)")
    add_table_title(doc, "Bảng 2.4", "Mô tả chi tiết Use case Đặt hàng và Thanh toán trực tuyến VNPay (UC_04)")
    create_use_case_table(
        doc,
        uc_id="UC_04",
        uc_name="Đặt hàng và Thanh toán trực tuyến VNPay",
        actor="Khách hàng, Cổng thanh toán VNPay",
        desc="Cho phép khách hàng cung cấp thông tin người nhận, địa chỉ giao hàng, nhập mã giảm giá Coupon, lựa chọn hình thức thanh toán (COD hoặc VNPay) và hoàn tất đơn đặt hàng.",
        trigger="Khách hàng bấm nút 'TIẾN HÀNH ĐẶT HÀNG' từ giỏ hàng để chuyển sang trang Checkout.",
        pre_cond="Giỏ hàng có ít nhất một sản phẩm hợp lệ.",
        main_steps=[
            (1, "Khách hàng", "Kiểm tra danh sách đơn hàng tại trang Checkout, điền họ tên, số điện thoại, địa chỉ nhận hàng và ghi chú."),
            (2, "Khách hàng", "Nhập mã giảm giá (ví dụ: LUXE10) và bấm 'Áp dụng'; hệ thống xác thực và trừ tiền trực tiếp vào tổng đơn."),
            (3, "Khách hàng", "Chọn phương thức 'Thanh toán trực tuyến qua VNPAY' và bấm 'HOÀN TẤT ĐẶT HÀNG'."),
            (4, "Hệ thống", "Backend tạo bản ghi đơn hàng trong bảng orders ở trạng thái PENDING, trừ tồn kho trong product_variants và xóa sạch giỏ hàng."),
            (5, "Frontend", "Mở modal giả lập cổng thanh toán VNPay Gateway Sandbox với mã giao dịch và số tiền tương ứng."),
            (6, "Khách hàng", "Xác nhận thanh toán thành công trên giao diện cổng thanh toán."),
            (7, "Hệ thống", "Backend nhận thông báo xác nhận thanh toán (API /payments/confirm), cập nhật trạng thái đơn sang PROCESSING."),
            (8, "Frontend", "Chuyển hướng đến OrderConfirmationPage hiển thị đầy đủ hóa đơn may đo cao cấp."),
        ],
        alt_steps=[
            (1, "Hệ thống", "Nếu khách hàng chọn phương thức 'Thanh toán khi nhận hàng (COD)', hệ thống lưu đơn ở trạng thái PENDING và chuyển thẳng đến trang xác nhận mà không qua bước thanh toán thẻ."),
            (2, "Hệ thống", "Nếu khách hàng hủy thanh toán trực tuyến, đơn hàng được lưu lại và khách có thể thanh toán sau trong trang 'Đơn hàng của tôi'."),
        ],
        post_cond="Đơn hàng được lưu trữ an toàn trong cơ sở dữ liệu, số lượng tồn kho được cập nhật và khách hàng nhận được mã tra cứu đơn hàng."
    )
    add_image_placeholder(doc,
        "Bạn hãy vẽ sơ đồ mô hình hóa ca sử dụng Đặt hàng & Thanh toán (Actor Khách hàng và Cổng VNPay, "
        "kèm các Use case con: Áp Dụng Mã Giảm Giá, Trừ Tồn Kho, Thanh Toán Trực Tuyến).",
        code_content=(
            "@startuml\n"
            "actor KháchHàng\n"
            "actor \"Cổng VNPay\" as VNPay <<System>>\n"
            "usecase \"Đặt Hàng & Thanh Toán\" as UC_Order\n"
            "usecase \"Áp Dụng Coupon\" as UC_Coupon\n"
            "usecase \"Tạo Bản Ghi Đơn Hàng\" as UC_Create\n"
            "usecase \"Giảm Trừ Tồn Kho\" as UC_Deduct\n"
            "usecase \"Xác Thực Giao Dịch VNPay\" as UC_Pay\n"
            "KháchHàng --> UC_Order\n"
            "UC_Order ..> UC_Coupon : <<extend>>\n"
            "UC_Order ..> UC_Create : <<include>>\n"
            "UC_Order ..> UC_Deduct : <<include>>\n"
            "UC_Order ..> UC_Pay : <<include>>\n"
            "UC_Pay --> VNPay\n"
            "@enduml"
        )
    )
    add_figure_caption(doc, "Hình 2.7", "Mô hình hóa Use case Đặt hàng và Thanh toán trực tuyến VNPay (UC_04)")

    # UC 05
    add_h3(doc, "2.5.5 Use case Quản lý đơn hàng phía Quản trị viên (UC_05)")
    add_table_title(doc, "Bảng 2.5", "Mô tả chi tiết Use case Quản lý đơn hàng phía Quản trị viên (UC_05)")
    create_use_case_table(
        doc,
        uc_id="UC_05",
        uc_name="Quản lý đơn hàng phía Quản trị viên",
        actor="Quản trị viên (Admin)",
        desc="Cho phép người quản trị theo dõi toàn bộ danh sách đơn đặt hàng trong hệ thống, lọc đơn theo trạng thái và chuyển trạng thái giao hàng.",
        trigger="Admin chọn tab 'Quản Lý Đơn Hàng' tại giao diện Admin Portal.",
        pre_cond="Tài khoản đã đăng nhập thành công và sở hữu quyền ROLE_ADMIN.",
        main_steps=[
            (1, "Admin", "Nhấp vào tab 'Quản Lý Đơn Hàng' trên thanh điều hướng nội bộ."),
            (2, "Frontend", "Gửi yêu cầu GET /api/v1/admin/orders kèm Authorization Header chứa JWT Token."),
            (3, "Hệ thống", "Backend kiểm tra quyền hạn ROLE_ADMIN qua Spring Security, truy vấn danh sách đơn hàng kèm chi tiết người mua, địa chỉ, tổng tiền."),
            (4, "Frontend", "Hiển thị bảng dữ liệu đơn hàng với các thẻ Badge màu sắc tương ứng từng trạng thái."),
            (5, "Admin", "Chọn một trạng thái mới trong dropdown (ví dụ: Chuyển từ 'PROCESSING' sang 'SHIPPED' hoặc 'DELIVERED')."),
            (6, "Hệ thống", "Backend cập nhật trường order_status trong bảng orders và trả về kết quả cập nhật thành công."),
            (7, "Frontend", "Cập nhật lại trạng thái trên giao diện và hiển thị thông báo Toast thành công."),
        ],
        alt_steps=[
            (1, "Hệ thống", "Nếu đơn hàng đã ở trạng thái CANCELLED hoặc DELIVERED, hệ thống khóa không cho chuyển về trạng thái chờ xử lý để đảm bảo logic kế toán."),
        ],
        post_cond="Trạng thái đơn hàng được cập nhật nhất quán giữa bảng điều khiển quản trị và trang tra cứu đơn hàng của khách hàng."
    )
    add_image_placeholder(doc,
        "Bạn hãy vẽ sơ đồ mô hình hóa ca sử dụng Quản lý đơn hàng Admin (Actor Admin, Use case Xem Danh Sách Đơn Hàng, "
        "kèm liên kết <<include>> tới Lọc Đơn Theo Trạng Thái và Cập Nhật Trạng Thái Giao Hàng).",
        code_content=(
            "@startuml\n"
            "actor Admin\n"
            "usecase \"Quản Lý Đơn Hàng\" as UC_Order\n"
            "usecase \"Lọc Theo Trạng Thái (Status)\" as UC_Filter\n"
            "usecase \"Cập Nhật Tiến Độ Giao Hàng\" as UC_Update\n"
            "Admin --> UC_Order\n"
            "UC_Order ..> UC_Filter : <<include>>\n"
            "UC_Order ..> UC_Update : <<include>>\n"
            "@enduml"
        )
    )
    add_figure_caption(doc, "Hình 2.8", "Mô hình hóa Use case Quản lý đơn hàng phía Quản trị viên (UC_05)")

    # UC 06
    add_h3(doc, "2.5.6 Use case Thêm mới sản phẩm và biến thể tồn kho (UC_06)")
    add_table_title(doc, "Bảng 2.6", "Mô tả chi tiết Use case Thêm mới sản phẩm và biến thể tồn kho (UC_06)")
    create_use_case_table(
        doc,
        uc_id="UC_06",
        uc_name="Thêm mới sản phẩm và biến thể tồn kho",
        actor="Quản trị viên (Admin)",
        desc="Cho phép quản trị viên đăng tải mẫu thiết kế thời trang mới lên hệ thống, thiết lập thuộc tính sản phẩm gốc và khởi tạo danh sách các biến thể màu sắc, kích cỡ, tồn kho tương ứng.",
        trigger="Admin bấm nút '+ THÊM THIẾT KẾ MỚI' tại tab 'Sản Phẩm & Tồn Kho'.",
        pre_cond="Quản trị viên đã đăng nhập và đang mở trang Admin Portal.",
        main_steps=[
            (1, "Admin", "Nhấp nút '+ THÊM THIẾT KẾ MỚI', Modal biểu mẫu thêm sản phẩm mở ra."),
            (2, "Admin", "Nhập Tên sản phẩm, chọn Danh mục, Thương hiệu, nhập Giá bán niêm yết, Giá gốc, Chất liệu vải (ví dụ: Cashmere, Lụa dâu tằm), Hướng dẫn bảo quản, Mô tả và link ảnh chính."),
            (3, "Admin", "Tại khối biến thể, thêm các dòng màu sắc (Tên màu, Mã hex), Kích cỡ (S, M, L), Số lượng tồn kho và Giá biến thể."),
            (4, "Admin", "Bấm nút 'LƯU VÀ ĐĂNG THIẾT KẾ'."),
            (5, "Hệ thống", "Backend kiểm tra tính hợp lệ qua @Valid CreateProductRequest, sinh slug tự động, lưu bản ghi vào bảng products, đồng thời lưu hàng loạt bản ghi con vào product_variants và product_images trong cùng một giao dịch (@Transactional)."),
            (6, "Frontend", "Đóng Modal, nạp lại danh mục sản phẩm và hiển thị thông báo thành công."),
        ],
        alt_steps=[
            (1, "Frontend", "Nếu Admin bỏ trống các trường bắt buộc (Tên sản phẩm, Giá, Danh mục) hoặc chưa điền biến thể, hệ thống hiển thị thông báo lỗi tại chân biểu mẫu và ngăn chặn gửi dữ liệu."),
        ],
        post_cond="Thiết kế thời trang mới cùng các biến thể tồn kho được xuất bản tức thì lên hệ sinh thái website cho khách hàng đặt mua."
    )
    add_image_placeholder(doc,
        "Bạn hãy vẽ sơ đồ mô hình hóa ca sử dụng Thêm mới sản phẩm (Actor Admin, Use case Thêm Thiết Kế Mới, "
        "kèm liên kết <<include>> tới Nhập Thông Tin Gốc, Khởi Tạo Biến Thể Màu/Size, Lưu Kho Dữ Liệu).",
        code_content=(
            "@startuml\n"
            "actor Admin\n"
            "usecase \"Thêm Mới Thiết Kế Thời Trang\" as UC_Add\n"
            "usecase \"Nhập Thuộc Tính Gốc (Chất liệu, Giá)\" as UC_Base\n"
            "usecase \"Cấu Hình Biến Thể (Màu, Size, Tồn kho)\" as UC_Var\n"
            "usecase \"Lưu Giao Dịch Vào MySQL\" as UC_Save\n"
            "Admin --> UC_Add\n"
            "UC_Add ..> UC_Base : <<include>>\n"
            "UC_Add ..> UC_Var : <<include>>\n"
            "UC_Add ..> UC_Save : <<include>>\n"
            "@enduml"
        )
    )
    add_figure_caption(doc, "Hình 2.9", "Mô hình hóa Use case Thêm mới sản phẩm và biến thể (UC_06)")

    # UC 07
    add_h3(doc, "2.5.7 Use case Xem thống kê Dashboard phân tích kinh doanh (UC_07)")
    add_table_title(doc, "Bảng 2.7", "Mô tả chi tiết Use case Xem thống kê Dashboard phân tích kinh doanh (UC_07)")
    create_use_case_table(
        doc,
        uc_id="UC_07",
        uc_name="Xem thống kê Dashboard phân tích kinh doanh",
        actor="Quản trị viên (Admin)",
        desc="Cung cấp cái nhìn toàn cảnh về sức khỏe tài chính và hoạt động vận hành của cửa hàng thời trang qua các chỉ số định lượng thời gian thực.",
        trigger="Admin truy cập vào Admin Portal hoặc bấm nút 'LÀM MỚI DỮ LIỆU'.",
        pre_cond="Tài khoản sở hữu quyền ROLE_ADMIN.",
        main_steps=[
            (1, "Admin", "Truy cập URL /admin hoặc bấm vào nút 'ADMIN PORTAL' trên Header."),
            (2, "Frontend", "Gọi đồng thời API /api/v1/admin/dashboard và các API quản lý phụ trợ."),
            (3, "Hệ thống", "Backend tính toán tổng doanh thu thực tế (đã trừ đơn hủy), đếm số đơn hàng theo trạng thái, thống kê tổng sản phẩm và khách hàng đăng ký."),
            (4, "Frontend", "Kết xuất 5 thẻ KPI trọng yếu (Tổng doanh thu, Tổng đơn hàng, Đơn chờ xử lý, Tổng thiết kế, Khách VIP)."),
            (5, "Frontend", "Hiển thị biểu đồ phân bổ đơn hàng, bảng danh sách các đơn hàng mới nhất và danh sách cảnh báo tồn kho thấp (Low stock alert dưới 10 sản phẩm)."),
        ],
        alt_steps=[
            (1, "Hệ thống", "Nếu chưa có đơn hàng nào, các thẻ chỉ số hiển thị giá trị mặc định (0 đ, 0 đơn) mà không làm gián đoạn giao diện."),
        ],
        post_cond="Nhà quản trị nắm bắt chính xác hiện trạng doanh thu và các vấn đề tồn kho để đưa ra quyết định nhập hàng kịp thời."
    )
    add_image_placeholder(doc,
        "Bạn hãy vẽ sơ đồ mô hình hóa ca sử dụng Báo cáo thống kê Dashboard (Actor Admin, Use case Xem Dashboard KPI, "
        "kèm liên kết <<include>> tới Tính Tổng Doanh Thu, Phân Bổ Đơn Hàng, Cảnh Báo Tồn Kho Thấp).",
        code_content=(
            "@startuml\n"
            "actor Admin\n"
            "usecase \"Xem Báo Cáo Thống Kê Dashboard\" as UC_Dash\n"
            "usecase \"Tổng Hợp Doanh Thu & Đơn Hàng\" as UC_Rev\n"
            "usecase \"Phân Tích Tỷ Lệ Trạng Thái\" as UC_Ratio\n"
            "usecase \"Lọc Danh Sách Cảnh Báo Tồn Kho\" as UC_Alert\n"
            "Admin --> UC_Dash\n"
            "UC_Dash ..> UC_Rev : <<include>>\n"
            "UC_Dash ..> UC_Ratio : <<include>>\n"
            "UC_Dash ..> UC_Alert : <<include>>\n"
            "@enduml"
        )
    )
    add_figure_caption(doc, "Hình 2.10", "Mô hình hóa Use case Báo cáo thống kê Dashboard (UC_07)")

    doc.add_page_break()

    # ==========================================
    # 2.6 THIẾT KẾ BACKEND
    # ==========================================
    add_h2(doc, "2.6 Thiết kế Backend")
    md("## 2.6 Thiết kế Backend\n")

    add_h3(doc, "2.6.1 Thiết kế biểu đồ mô tả các chức năng (Sequence & VOPC Class Diagram)")
    md("### 2.6.1 Thiết kế biểu đồ mô tả các chức năng (Sequence & VOPC Class Diagram)\n")
    add_p(doc, "Thiết kế Backend tuân thủ nghiêm ngặt mô hình phân tích Boundary - Control - Entity (BCE):")
    add_bullet(doc, "Đóng vai trò tiếp nhận tương tác người dùng từ màn hình giao diện (UI) và nhận phản hồi từ hệ thống.", "Tầng Boundary (Biên): ")
    add_bullet(doc, "Đóng vai trò điều phối luồng nghiệp vụ, kiểm tra quy tắc và xử lý tính toán (gồm Controller và Service).", "Tầng Control (Điều khiển): ")
    add_bullet(doc, "Đại diện cho các đối tượng thực thể dữ liệu nghiệp vụ và tầng lưu trữ cơ sở dữ liệu (Entity, Repository và Database).", "Tầng Entity (Thực thể): ")

    # Sequence 1: Đăng nhập
    add_p(doc, "1. Biểu đồ trình tự chức năng Đăng nhập hệ thống (Sequence Diagram):", bold_prefix="")
    add_image_placeholder(doc,
        "Bạn hãy vẽ Biểu đồ trình tự đăng nhập theo chuẩn BCE: Actor NgườiDùng -> <<boundary>> AuthModalUI "
        "-> <<control>> AuthController -> <<control>> AuthService -> <<control>> PasswordEncoder "
        "-> <<entity>> UserRepository -> <<boundary>> MySQLDatabase.",
        code_content=(
            "@startuml\n"
            "autonumber\n"
            "actor \"Người Dùng\" as User\n"
            "boundary \":AuthModalUI\" as UI\n"
            "control \":AuthController\" as Ctrl\n"
            "control \":AuthService\" as Svc\n"
            "control \":PasswordEncoder\" as Pwd\n"
            "entity \":UserRepository\" as Repo\n"
            "database \"MySQL CSDL\" as DB\n\n"
            "User -> UI : 1. Nhập email, password & Click [Đăng Nhập]\n"
            "UI -> Ctrl : 2. POST /api/v1/auth/login (LoginRequest)\n"
            "Ctrl -> Svc : 3. login(email, password)\n"
            "Svc -> Repo : 4. findByEmail(email)\n"
            "Repo -> DB : 5. SELECT * FROM users WHERE email=?\n"
            "DB --> Repo : 6. Trả về bản ghi User\n"
            "Repo --> Svc : 7. User entity\n"
            "Svc -> Pwd : 8. matches(rawPassword, encodedPassword)\n"
            "Pwd --> Svc : 9. true (khớp mã băm BCrypt)\n"
            "Svc -> Svc : 10. jwtUtils.generateToken(email)\n"
            "Svc --> Ctrl : 11. AuthResponse (token, userDto)\n"
            "Ctrl --> UI : 12. 200 OK JSON (success, data)\n"
            "UI --> User : 13. Hiển thị thông báo & nạp thông tin tài khoản\n"
            "@enduml"
        )
    )
    add_figure_caption(doc, "Hình 2.11", "Biểu đồ trình tự (Sequence Diagram) chức năng Đăng nhập hệ thống chuẩn BCE")

    # Sequence 2: Đặt hàng & Thanh toán
    add_p(doc, "2. Biểu đồ trình tự chức năng Đặt hàng và Thanh toán trực tuyến VNPay:", bold_prefix="")
    add_image_placeholder(doc,
        "Bạn hãy vẽ Biểu đồ trình tự Đặt hàng & Thanh toán VNPay theo chuẩn BCE: Actor KháchHàng -> <<boundary>> CheckoutUI "
        "-> <<control>> OrderController -> <<control>> OrderService -> <<entity>> CartRepository, OrderRepository "
        "-> <<boundary>> VNPayModal -> <<control>> PaymentService -> <<boundary>> MySQLDatabase.",
        code_content=(
            "@startuml\n"
            "autonumber\n"
            "actor \"Khách Hàng\" as Cust\n"
            "boundary \":CheckoutUI\" as UI\n"
            "control \":OrderController\" as Ctrl\n"
            "control \":OrderService\" as Svc\n"
            "entity \":OrderRepository\" as OrderRepo\n"
            "entity \":VariantRepository\" as VarRepo\n"
            "boundary \":VNPayGatewayModal\" as VNPayUI\n"
            "control \":PaymentService\" as PaySvc\n"
            "database \"MySQL CSDL\" as DB\n\n"
            "Cust -> UI : 1. Điền thông tin giao hàng & chọn [VNPay] -> Bấm [Đặt Hàng]\n"
            "UI -> Ctrl : 2. POST /api/v1/orders (CreateOrderRequest)\n"
            "Ctrl -> Svc : 3. createOrder(email, request)\n"
            "Svc -> VarRepo : 4. Kiểm tra & giảm trừ tồn kho (stock_quantity - qty)\n"
            "Svc -> OrderRepo : 5. Lưu bản ghi Order (PENDING) & OrderItems\n"
            "OrderRepo -> DB : 6. INSERT INTO orders, order_items\n"
            "Svc --> Ctrl : 7. OrderDto (mã đơn hàng, tổng tiền)\n"
            "Ctrl --> UI : 8. 200 OK (OrderDto)\n"
            "UI -> VNPayUI : 9. Kích hoạt Modal thanh toán trực tuyến VNPay Sandbox\n"
            "Cust -> VNPayUI : 10. Xác nhận hoàn tất thanh toán điện tử\n"
            "VNPayUI -> PaySvc : 11. POST /api/v1/payments/confirm (orderCode, transRef)\n"
            "PaySvc -> DB : 12. UPDATE orders SET order_status='PROCESSING'\n"
            "PaySvc --> VNPayUI : 13. Giao dịch thành công\n"
            "VNPayUI --> UI : 14. Đóng modal & chuyển hướng OrderConfirmationPage\n"
            "@enduml"
        )
    )
    add_figure_caption(doc, "Hình 2.12", "Biểu đồ trình tự (Sequence Diagram) chức năng Đặt hàng và Thanh toán VNPay")

    # Sequence 3: Thêm sản phẩm
    add_p(doc, "3. Biểu đồ trình tự chức năng Thêm mới sản phẩm quản trị:", bold_prefix="")
    add_image_placeholder(doc,
        "Bạn hãy vẽ Biểu đồ trình tự Thêm mới sản phẩm: Admin -> <<boundary>> AdminPortalUI -> <<control>> AdminController "
        "-> <<control>> ProductService -> <<entity>> ProductRepository -> <<boundary>> MySQLDatabase.",
        code_content=(
            "@startuml\n"
            "autonumber\n"
            "actor \"Admin\" as Adm\n"
            "boundary \":AdminPortalUI\" as UI\n"
            "control \":AdminController\" as Ctrl\n"
            "control \":ProductService\" as Svc\n"
            "entity \":ProductRepository\" as ProdRepo\n"
            "entity \":VariantRepository\" as VarRepo\n"
            "database \"MySQL CSDL\" as DB\n\n"
            "Adm -> UI : 1. Điền thông tin thiết kế & cấu hình danh sách biến thể -> Bấm [Lưu]\n"
            "UI -> Ctrl : 2. POST /api/v1/admin/products (CreateProductRequest)\n"
            "Ctrl -> Svc : 3. createProduct(request)\n"
            "Svc -> Svc : 4. Tạo slug sản phẩm tự động từ tên tiếng Việt\n"
            "Svc -> ProdRepo : 5. Lưu Product entity gốc\n"
            "ProdRepo -> DB : 6. INSERT INTO products\n"
            "Svc -> VarRepo : 7. Lưu danh sách ProductVariant con (SKU, Màu, Size, Tồn kho)\n"
            "VarRepo -> DB : 8. INSERT INTO product_variants, product_images\n"
            "Svc --> Ctrl : 9. ProductDetailDto hoàn chỉnh\n"
            "Ctrl --> UI : 10. 200 OK (created ProductDetailDto)\n"
            "UI --> Adm : 11. Đóng modal & làm mới danh sách sản phẩm quản trị\n"
            "@enduml"
        )
    )
    add_figure_caption(doc, "Hình 2.13", "Biểu đồ trình tự (Sequence Diagram) chức năng Thêm mới sản phẩm quản trị")

    # VOPC Class Diagrams
    add_p(doc, "4. Biểu đồ lớp phân tích VOPC (View - Operation - Process - Control):", bold_prefix="")
    add_p(doc, "Biểu đồ lớp phân tích VOPC thể hiện mối quan hệ cộng tác cấu trúc tĩnh giữa các phần tử Boundary, Control và Entity tương ứng với mẫu thiết kế của trường:")

    add_image_placeholder(doc,
        "Bạn hãy vẽ biểu đồ lớp VOPC cho chức năng Đặt hàng & Thanh toán (gồm <<boundary>> CheckoutUI, VNPayModal; "
        "<<control>> OrderController, PaymentController; <<entity>> Order, OrderItem, ProductVariant; <<boundary>> ICSDL).",
        code_content=(
            "@startuml\n"
            "class CheckoutUI <<boundary>> {\n"
            "    + nhapThongTinGiaoHang()\n"
            "    + chonPhuongThucThanhToan()\n"
            "    + clickDatHang()\n"
            "}\n"
            "class VNPayModal <<boundary>> {\n"
            "    + hienThiSoTien()\n"
            "    + xacNhanThanhToan()\n"
            "}\n"
            "class OrderController <<control>> {\n"
            "    + createOrder()\n"
            "    + getOrderByCode()\n"
            "}\n"
            "class PaymentController <<control>> {\n"
            "    + confirmPayment()\n"
            "}\n"
            "class Order <<entity>> {\n"
            "    - id: Long\n"
            "    - orderCode: String\n"
            "    - totalAmount: BigDecimal\n"
            "    - orderStatus: String\n"
            "}\n"
            "class ICSDL <<boundary>> {\n"
            "    + saveOrder()\n"
            "    + updateStock()\n"
            "}\n"
            "CheckoutUI --> OrderController\n"
            "VNPayModal --> PaymentController\n"
            "OrderController --> Order\n"
            "OrderController --> ICSDL\n"
            "PaymentController --> Order\n"
            "@enduml"
        )
    )
    add_figure_caption(doc, "Hình 2.14", "Biểu đồ lớp phân tích VOPC cho ca sử dụng Đặt hàng và Thanh toán")

    add_image_placeholder(doc,
        "Bạn hãy vẽ biểu đồ lớp VOPC cho chức năng Quản trị sản phẩm (gồm <<boundary>> AdminPortalUI, <<control>> AdminController, "
        "<<control>> ProductService, <<entity>> Product, ProductVariant, <<boundary>> ICSDL).",
        code_content=(
            "@startuml\n"
            "class AdminPortalUI <<boundary>> {\n"
            "    + moFormThemSanPham()\n"
            "    + nhapThongTinThietKe()\n"
            "    + luuSanPham()\n"
            "}\n"
            "class AdminController <<control>> {\n"
            "    + createProduct()\n"
            "    + getProducts()\n"
            "}\n"
            "class Product <<entity>> {\n"
            "    - id: Long\n"
            "    - name: String\n"
            "    - basePrice: BigDecimal\n"
            "}\n"
            "class ProductVariant <<entity>> {\n"
            "    - sku: String\n"
            "    - colorName: String\n"
            "    - size: String\n"
            "    - stockQuantity: Integer\n"
            "}\n"
            "class ICSDL <<boundary>> {\n"
            "    + saveProduct()\n"
            "    + saveVariants()\n"
            "}\n"
            "AdminPortalUI --> AdminController\n"
            "AdminController --> Product\n"
            "AdminController --> ProductVariant\n"
            "AdminController --> ICSDL\n"
            "@enduml"
        )
    )
    add_figure_caption(doc, "Hình 2.15", "Biểu đồ lớp phân tích VOPC cho ca sử dụng Quản trị sản phẩm")

    add_h3(doc, "2.6.2 Biểu đồ lớp tổng thể (Overall Class Diagram)")
    md("### 2.6.2 Biểu đồ lớp tổng thể (Overall Class Diagram)\n")
    add_p(doc, "Biểu đồ lớp tổng thể thể hiện cấu trúc hướng đối tượng của toàn bộ hệ sinh thái Backend gồm các tầng Controller, Service, Repository và Entity liên kết chặt chẽ:")

    add_image_placeholder(doc,
        "Bạn hãy vẽ Biểu đồ lớp tổng thể hệ thống Backend gồm các Entity chính: User, Category, Brand, Product, "
        "ProductVariant, ProductImage, Cart, CartItem, Order, OrderItem, Coupon, Review, Address và các mối quan hệ (1-n, n-1).",
        code_content=(
            "@startuml\n"
            "class User {\n"
            "    - id: Long\n"
            "    - fullName: String\n"
            "    - email: String\n"
            "    - role: String\n"
            "}\n"
            "class Category {\n"
            "    - id: Long\n"
            "    - name: String\n"
            "    - slug: String\n"
            "}\n"
            "class Brand {\n"
            "    - id: Long\n"
            "    - name: String\n"
            "}\n"
            "class Product {\n"
            "    - id: Long\n"
            "    - name: String\n"
            "    - basePrice: BigDecimal\n"
            "}\n"
            "class ProductVariant {\n"
            "    - id: Long\n"
            "    - sku: String\n"
            "    - colorName: String\n"
            "    - size: String\n"
            "    - stockQuantity: Integer\n"
            "}\n"
            "class Order {\n"
            "    - id: Long\n"
            "    - orderCode: String\n"
            "    - totalAmount: BigDecimal\n"
            "    - orderStatus: String\n"
            "}\n"
            "class OrderItem {\n"
            "    - id: Long\n"
            "    - quantity: Integer\n"
            "    - unitPrice: BigDecimal\n"
            "}\n"
            "Product \"1\" *-- \"n\" ProductVariant\n"
            "Category \"1\" -- \"n\" Product\n"
            "Brand \"1\" -- \"n\" Product\n"
            "User \"1\" -- \"n\" Order\n"
            "Order \"1\" *-- \"n\" OrderItem\n"
            "ProductVariant \"1\" -- \"n\" OrderItem\n"
            "@enduml"
        )
    )
    add_figure_caption(doc, "Hình 2.16", "Biểu đồ lớp tổng thể (Overall Class Diagram) hệ thống Backend")

    add_h3(doc, "2.6.3 Thiết kế Cơ sở dữ liệu quan hệ (ERD và Data Dictionary)")
    md("### 2.6.3 Thiết kế Cơ sở dữ liệu quan hệ (ERD và Data Dictionary)\n")
    add_p(doc, "Cơ sở dữ liệu clothing_store được chuẩn hóa ở dạng chuẩn 3NF (Third Normal Form) gồm 14 bảng quan hệ, được cấu hình toàn bộ bảng mã và phép đối chiếu utf8mb4_unicode_ci để hỗ trợ tiếng Việt hoàn hảo:")

    add_image_placeholder(doc,
        "Bạn hãy vẽ Biểu đồ thực thể liên kết (ERD) thể hiện 14 bảng quan hệ của cơ sở dữ liệu clothing_store "
        "(users, categories, brands, products, product_variants, product_images, carts, cart_items, orders, order_items, coupons, reviews, addresses, payments).",
        code_content=(
            "@startuml\n"
            "entity users {\n"
            "    * id: BIGINT [PK]\n"
            "    --\n"
            "    full_name: VARCHAR(150)\n"
            "    email: VARCHAR(150) [UNIQUE]\n"
            "    password: VARCHAR(255)\n"
            "    role: VARCHAR(50)\n"
            "}\n"
            "entity products {\n"
            "    * id: BIGINT [PK]\n"
            "    --\n"
            "    name: VARCHAR(255)\n"
            "    slug: VARCHAR(255) [UNIQUE]\n"
            "    base_price: DECIMAL(12,2)\n"
            "    category_id: BIGINT [FK]\n"
            "    brand_id: BIGINT [FK]\n"
            "}\n"
            "entity product_variants {\n"
            "    * id: BIGINT [PK]\n"
            "    --\n"
            "    product_id: BIGINT [FK]\n"
            "    sku: VARCHAR(100) [UNIQUE]\n"
            "    color_name: VARCHAR(100)\n"
            "    size: VARCHAR(20)\n"
            "    stock_quantity: INT\n"
            "}\n"
            "entity orders {\n"
            "    * id: BIGINT [PK]\n"
            "    --\n"
            "    order_code: VARCHAR(50) [UNIQUE]\n"
            "    user_id: BIGINT [FK]\n"
            "    total_amount: DECIMAL(12,2)\n"
            "    order_status: VARCHAR(50)\n"
            "}\n"
            "products ||--o{ product_variants : has\n"
            "users ||--o{ orders : places\n"
            "@enduml"
        )
    )
    add_figure_caption(doc, "Hình 2.17", "Biểu đồ quan hệ thực thể (Entity Relationship Diagram - ERD) cơ sở dữ liệu")

    # Table 2.8: users
    add_table_title(doc, "Bảng 2.8", "Cấu trúc bảng lưu trữ thông tin Người dùng (users)")
    create_table_generic(doc, ["Tên cột", "Kiểu dữ liệu", "Khóa", "Mặc định", "Mô tả ý nghĩa"], [
        ["id", "BIGINT AUTO_INCREMENT", "PK", "None", "Khóa chính định danh người dùng duy nhất"],
        ["full_name", "VARCHAR(150)", "", "None", "Họ và tên người dùng (hỗ trợ tiếng Việt UTF-8)"],
        ["email", "VARCHAR(150)", "UNIQUE", "None", "Địa chỉ email duy nhất dùng đăng nhập hệ thống"],
        ["password", "VARCHAR(255)", "", "None", "Mật khẩu người dùng đã băm giải thuật BCrypt"],
        ["phone", "VARCHAR(20)", "", "NULL", "Số điện thoại liên hệ của khách hàng"],
        ["role", "VARCHAR(50)", "", "'ROLE_CUSTOMER'", "Vai trò quyền hạn: ROLE_CUSTOMER hoặc ROLE_ADMIN"],
        ["avatar_url", "VARCHAR(500)", "", "NULL", "Đường dẫn hình ảnh đại diện người dùng"],
        ["is_active", "TINYINT(1)", "", "1", "Cờ trạng thái hoạt động tài khoản (1: active, 0: khóa)"],
        ["created_at", "DATETIME", "", "CURRENT_TIMESTAMP", "Thời điểm tạo tài khoản"],
        ["updated_at", "DATETIME", "", "CURRENT_TIMESTAMP", "Thời điểm cập nhật tài khoản gần nhất"]
    ], col_widths=[2.8, 3.8, 1.8, 2.5, 4.6])

    # Table 2.11: products
    add_table_title(doc, "Bảng 2.11", "Cấu trúc bảng lưu trữ Thông tin sản phẩm gốc (products)")
    create_table_generic(doc, ["Tên cột", "Kiểu dữ liệu", "Khóa", "Mặc định", "Mô tả ý nghĩa"], [
        ["id", "BIGINT AUTO_INCREMENT", "PK", "None", "Khóa chính định danh sản phẩm gốc"],
        ["name", "VARCHAR(255)", "", "None", "Tên thiết kế thời trang may đo cao cấp"],
        ["slug", "VARCHAR(255)", "UNIQUE", "None", "Đường dẫn URL thân thiện SEO chuẩn SEO-URL"],
        ["description", "TEXT", "", "NULL", "Mô tả chi tiết kiểu dáng, phong cách thiết kế"],
        ["material", "VARCHAR(255)", "", "NULL", "Thành phần chất liệu vải cao cấp (Cashmere, Lụa)"],
        ["care_instructions", "VARCHAR(255)", "", "NULL", "Hướng dẫn giặt ủi và bảo quản thời trang"],
        ["base_price", "DECIMAL(12,2)", "", "None", "Giá bán tiêu chuẩn thấp nhất của sản phẩm"],
        ["original_price", "DECIMAL(12,2)", "", "NULL", "Giá gốc trước khi giảm giá (dùng tính % ưu đãi)"],
        ["category_id", "BIGINT", "FK", "None", "Khóa ngoại liên kết tới bảng danh mục categories"],
        ["brand_id", "BIGINT", "FK", "None", "Khóa ngoại liên kết tới bảng thương hiệu brands"],
        ["is_featured", "TINYINT(1)", "", "0", "Cờ đánh dấu sản phẩm nổi bật trên trang chủ"],
        ["is_active", "TINYINT(1)", "", "1", "Cờ hiển thị sản phẩm trên cửa hàng"]
    ], col_widths=[2.8, 3.8, 1.8, 2.5, 4.6])

    # Table 2.12: product_variants
    add_table_title(doc, "Bảng 2.12", "Cấu trúc bảng lưu trữ Biến thể sản phẩm: Màu sắc, Size, Tồn kho (product_variants)")
    create_table_generic(doc, ["Tên cột", "Kiểu dữ liệu", "Khóa", "Mặc định", "Mô tả ý nghĩa"], [
        ["id", "BIGINT AUTO_INCREMENT", "PK", "None", "Khóa chính định danh biến thể sản phẩm"],
        ["product_id", "BIGINT", "FK", "None", "Khóa ngoại tham chiếu bảng products (ON DELETE CASCADE)"],
        ["sku", "VARCHAR(100)", "UNIQUE", "None", "Mã đơn vị lưu kho duy nhất (ví dụ: BLZ-CASH-BLK-S)"],
        ["color_name", "VARCHAR(100)", "", "None", "Tên màu sắc thiết kế (ví dụ: Đen Obsidian, Be Camel)"],
        ["color_code", "VARCHAR(20)", "", "NULL", "Mã màu Hex hiển thị nút chọn (ví dụ: #111111)"],
        ["size", "VARCHAR(20)", "", "None", "Kích cỡ chuẩn may đo: S, M, L, XL"],
        ["price", "DECIMAL(12,2)", "", "None", "Giá bán của biến thể sản phẩm cụ thể"],
        ["stock_quantity", "INT", "", "0", "Số lượng sản phẩm còn lại trong kho hàng"],
        ["image_url", "VARCHAR(500)", "", "NULL", "Hình ảnh đại diện cho màu sắc của biến thể"],
        ["is_active", "TINYINT(1)", "", "1", "Trạng thái sẵn sàng kinh doanh của biến thể"]
    ], col_widths=[2.8, 3.8, 1.8, 2.5, 4.6])

    # Table 2.16: orders
    add_table_title(doc, "Bảng 2.16", "Cấu trúc bảng lưu trữ Đơn đặt hàng (orders)")
    create_table_generic(doc, ["Tên cột", "Kiểu dữ liệu", "Khóa", "Mặc định", "Mô tả ý nghĩa"], [
        ["id", "BIGINT AUTO_INCREMENT", "PK", "None", "Khóa chính định danh đơn hàng"],
        ["order_code", "VARCHAR(50)", "UNIQUE", "None", "Mã đơn hàng duy nhất (ví dụ: ORD-20261019-001)"],
        ["user_id", "BIGINT", "FK", "NULL", "Khóa ngoại liên kết bảng users (NULL nếu khách vãng lai)"],
        ["customer_name", "VARCHAR(150)", "", "None", "Họ tên người nhận hàng"],
        ["customer_email", "VARCHAR(150)", "", "None", "Email người nhận để gửi hóa đơn điện tử"],
        ["customer_phone", "VARCHAR(20)", "", "None", "Số điện thoại liên hệ giao hàng"],
        ["shipping_address", "VARCHAR(500)", "", "None", "Địa chỉ giao hàng chi tiết"],
        ["subtotal", "DECIMAL(12,2)", "", "None", "Tổng giá trị mặt hàng trước giảm giá"],
        ["shipping_fee", "DECIMAL(12,2)", "", "0.00", "Phí vận chuyển (miễn phí đơn trên 1.000.000đ)"],
        ["discount_amount", "DECIMAL(12,2)", "", "0.00", "Số tiền được khấu trừ từ mã giảm giá Coupon"],
        ["total_amount", "DECIMAL(12,2)", "", "None", "Tổng số tiền thực tế khách hàng phải trả"],
        ["coupon_code", "VARCHAR(50)", "", "NULL", "Mã Coupon đã áp dụng (nếu có)"],
        ["order_status", "VARCHAR(50)", "", "'PENDING'", "Trạng thái đơn: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED"],
        ["note", "VARCHAR(500)", "", "NULL", "Ghi chú giao hàng từ khách hàng"],
        ["created_at", "DATETIME", "", "CURRENT_TIMESTAMP", "Thời điểm phát sinh đơn đặt hàng"]
    ], col_widths=[2.8, 3.8, 1.8, 2.5, 4.6])

    doc.add_page_break()

    # ==========================================
    # CHƯƠNG 3: CHƯƠNG TRÌNH THỬ NGHIỆM
    # ==========================================
    add_h1(doc, "CHƯƠNG 3: CHƯƠNG TRÌNH THỬ NGHIỆM VÀ KẾT QUẢ")
    md("\n# CHƯƠNG 3: CHƯƠNG TRÌNH THỬ NGHIỆM VÀ KẾT QUẢ\n")

    add_h2(doc, "3.1 Môi trường triển khai và vận hành hệ thống")
    md("## 3.1 Môi trường triển khai và vận hành hệ thống\n")
    p_c3_env = (
        "Hệ thống đã được đóng gói, cấu hình và vận hành thử nghiệm hoàn chỉnh trên môi trường máy chủ cục bộ (Localhost). "
        "Máy chủ cơ sở dữ liệu MySQL 8.0 chạy tại cổng mặc định 3306; máy chủ Backend Spring Boot 3.4.3 vận hành tại cổng 8080 "
        "kết nối qua kết nối JDBC HikariCP; máy chủ phát triển Frontend chạy tại cổng 5173 hỗ trợ tính năng thay đổi mô-đun trực tiếp (HMR)."
    )
    add_p(doc, p_c3_env)
    md(p_c3_env + "\n")

    add_h2(doc, "3.2 Giao diện và kết quả thử nghiệm phía Người dùng (Khách hàng)")
    md("## 3.2 Giao diện và kết quả thử nghiệm phía Người dùng (Khách hàng)\n")
    add_p(doc, "Dưới đây là các giao diện chức năng chính được chụp trực tiếp từ sản phẩm đang chạy thực tế tại địa chỉ http://localhost:5173/:")

    # Screenshot 3.1: Home
    add_image_placeholder(doc,
        "📷 [BẠN HÃY CHỤP ẢNH TỪ DỰ ÁN VÀ DÁN VÀO ĐÂY]\n"
        "Hướng dẫn chụp: Mở trình duyệt tại http://localhost:5173/, chụp toàn bộ khu vực Trang chủ gồm: "
        "Thanh thông báo vàng đen đầu trang, Menu điều hướng, Logo L'ATELIER & CO., Banner ảnh Hero lớn, "
        "tiêu đề 'Chế tác vượt thời gian. Vẻ đẹp của sự tinh giản.' và 2 nút Khám phá bộ sưu tập / Xem áo blazer.")
    add_figure_caption(doc, "Hình 3.1", "Giao diện Trang chủ và Khối giới thiệu Bộ sưu tập Capsule (Home Banner)")

    # Screenshot 3.2: Shop & Filters
    add_image_placeholder(doc,
        "📷 [BẠN HÃY CHỤP ẢNH TỪ DỰ ÁN VÀ DÁN VÀO ĐÂY]\n"
        "Hướng dẫn chụp: Tại trang web, nhấp vào menu 'BỘ SƯU TẬP' (ShopPage). Chụp màn hình hiển thị: "
        "Thanh lọc bên trái (Bộ lọc danh mục, mức giá tối thiểu/tối đa, nhãn thương hiệu) "
        "và lưới sản phẩm bên phải với các thẻ sản phẩm hiển thị giá bán, tag giảm giá và ảnh may đo.")
    add_figure_caption(doc, "Hình 3.2", "Giao diện Cửa hàng sản phẩm kèm Bộ lọc danh mục, mức giá và tìm kiếm")

    # Screenshot 3.3: Product Detail
    add_image_placeholder(doc,
        "📷 [BẠN HÃY CHỤP ẢNH TỪ DỰ ÁN VÀ DÁN VÀO ĐÂY]\n"
        "Hướng dẫn chụp: Bấm vào một sản phẩm bất kỳ (ví dụ: 'Đầm Lụa Tơ Tằm Dáng Dài Silk Bias-Cut Dress'). "
        "Chụp khu vực chi tiết gồm: Ảnh sản phẩm lớn bên trái, Tên sản phẩm, Giá bán, "
        "khối chọn MÀU SẮC (các nút tròn màu ⚫ Đen Onyx, 🟡 Vàng Champagne), nút chọn KÍCH CỠ (S, M) và cảnh báo tồn kho.")
    add_figure_caption(doc, "Hình 3.3", "Giao diện Trang Chi tiết sản phẩm với lựa chọn tương tác Màu sắc & Size")

    # Screenshot 3.4: Cart Drawer
    add_image_placeholder(doc,
        "📷 [BẠN HÃY CHỤP ẢNH TỪ DỰ ÁN VÀ DÁN VÀO ĐÂY]\n"
        "Hướng dẫn chụp: Tại trang chi tiết, bấm nút 'THÊM VÀO TÚI' để thanh trượt giỏ hàng (CartDrawer) trượt ra từ bên phải. "
        "Chụp ảnh hiển thị: Danh sách sản phẩm trong giỏ, biến thể màu sắc/size đã chọn, nút tăng giảm (+/-), "
        "tạm tính tiền và nút 'TIẾN HÀNH ĐẶT HÀNG'.")
    add_figure_caption(doc, "Hình 3.4", "Giao diện Túi mua sắm trượt (Cart Drawer) và tính năng cập nhật số lượng")

    # Screenshot 3.5: Checkout & Coupon
    add_image_placeholder(doc,
        "📷 [BẠN HÃY CHỤP ẢNH TỪ DỰ ÁN VÀ DÁN VÀO ĐÂY]\n"
        "Hướng dẫn chụp: Bấm nút đặt hàng để sang trang Checkout. Nhập mã giảm giá (ví dụ: LUXE10 hoặc VIP200K) và bấm Áp dụng. "
        "Chụp ảnh hiển thị: Form điền thông tin người nhận hàng bên trái và Cột tổng kết đơn hàng bên phải có dòng giảm giá mã Coupon.")
    add_figure_caption(doc, "Hình 3.5", "Giao diện Trang Đặt hàng (Checkout) và cơ chế Áp dụng mã giảm giá")

    # Screenshot 3.6: VNPay Modal
    add_image_placeholder(doc,
        "📷 [BẠN HÃY CHỤP ẢNH TỪ DỰ ÁN VÀ DÁN VÀO ĐÂY]\n"
        "Hướng dẫn chụp: Chọn phương thức 'Thanh toán trực tuyến qua VNPAY' rồi bấm Đặt hàng. "
        "Modal mô phỏng cổng thanh toán VNPay sẽ hiện lên giữa màn hình với logo VNPay, mã giao dịch, số tiền và nút 'XÁC NHẬN THANH TOÁN THÀNH CÔNG'. Hãy chụp modal này.")
    add_figure_caption(doc, "Hình 3.6", "Giao diện Mô phỏng Cổng thanh toán trực tuyến bảo mật VNPay Sandbox")

    # Screenshot 3.7: Order Confirmation
    add_image_placeholder(doc,
        "📷 [BẠN HÃY CHỤP ẢNH TỪ DỰ ÁN VÀ DÁN VÀO ĐÂY]\n"
        "Hướng dẫn chụp: Sau khi thanh toán, chụp trang 'Đặt Hàng Thành Công' (OrderConfirmationPage) "
        "với biểu tượng dấu tích xanh, Mã đơn hàng (ví dụ: ORD-...), Địa chỉ giao hàng và Bảng chi tiết hóa đơn may đo.")
    add_figure_caption(doc, "Hình 3.7", "Giao diện Trang Xác nhận đơn hàng thành công (Order Confirmation)")

    # Screenshot 3.8: My Orders
    add_image_placeholder(doc,
        "📷 [BẠN HÃY CHỤP ẢNH TỪ DỰ ÁN VÀ DÁN VÀO ĐÂY]\n"
        "Hướng dẫn chụp: Đăng nhập tài khoản khách hàng (customer@gmail.com / customer123). "
        "Bấm vào avatar ở Header và chọn 'Đơn hàng của tôi'. Chụp màn hình danh sách các đơn hàng đã đặt và trạng thái tương ứng.")
    add_figure_caption(doc, "Hình 3.8", "Giao diện Trang Lịch sử đơn hàng của tôi (My Orders)")

    add_h2(doc, "3.3 Giao diện và kết quả thử nghiệm phía Quản trị viên (Admin Portal)")
    md("## 3.3 Giao diện và kết quả thử nghiệm phía Quản trị viên (Admin Portal)\n")
    add_p(doc, "Giao diện quản trị viên chỉ hiển thị khi đăng nhập với tài khoản quản trị (admin@luxeatelier.com / admin123):")

    # Screenshot 3.9: Dashboard
    add_image_placeholder(doc,
        "📷 [BẠN HÃY CHỤP ẢNH TỪ DỰ ÁN VÀ DÁN VÀO ĐÂY]\n"
        "Hướng dẫn chụp: Đăng nhập Admin và bấm vào nút 'ADMIN PORTAL' trên Header. "
        "Tại tab 'Tổng Quan (Dashboard)', chụp màn hình hiển thị: 5 thẻ KPI đầu trang (Tổng doanh thu, Tổng đơn hàng, "
        "Đơn chờ tiếp nhận, Tổng thiết kế, Khách hàng VIP), Biểu đồ tỷ lệ trạng thái đơn hàng và Bảng cảnh báo tồn kho thấp.")
    add_figure_caption(doc, "Hình 3.9", "Giao diện Bảng điều khiển Quản trị viên (Dashboard KPI Analytics)")

    # Screenshot 3.10: Order Management
    add_image_placeholder(doc,
        "📷 [BẠN HÃY CHỤP ẢNH TỪ DỰ ÁN VÀ DÁN VÀO ĐÂY]\n"
        "Hướng dẫn chụp: Tại trang Admin, nhấp vào tab 'Quản Lý Đơn Hàng'. "
        "Chụp màn hình danh sách các đơn hàng có các nút lọc trạng thái và dropdown chọn trạng thái (PENDING, PROCESSING, SHIPPED, DELIVERED).")
    add_figure_caption(doc, "Hình 3.10", "Giao diện Quản lý Đơn hàng và Cập nhật trạng thái giao hàng")

    # Screenshot 3.11: Product Management & Add Product Modal
    add_image_placeholder(doc,
        "📷 [BẠN HÃY CHỤP ẢNH TỪ DỰ ÁN VÀ DÁN VÀO ĐÂY]\n"
        "Hướng dẫn chụp: Nhấp vào tab 'Sản Phẩm & Tồn Kho' và bấm nút '+ THÊM THIẾT KẾ MỚI'. "
        "Chụp màn hình Modal thêm sản phẩm mở ra với các trường thông tin: Tên thiết kế, Danh mục, Thương hiệu, "
        "Giá bán, Chất liệu vải, Bảng danh sách các dòng biến thể (Màu sắc, Size, Tồn kho).")
    add_figure_caption(doc, "Hình 3.11", "Giao diện Quản lý Danh sách Sản phẩm, Tồn kho và Modal Thêm thiết kế mới")

    # Screenshot 3.12: Customer Management
    add_image_placeholder(doc,
        "📷 [BẠN HÃY CHỤP ẢNH TỪ DỰ ÁN VÀ DÁN VÀO ĐÂY]\n"
        "Hướng dẫn chụp: Nhấp vào tab 'Khách Hàng' tại Admin Portal. Chụp màn hình danh sách tài khoản khách hàng đăng ký "
        "với thông tin Họ tên, Email, Số điện thoại và Vai trò quyền hạn.")
    add_figure_caption(doc, "Hình 3.12", "Giao diện Quản lý Danh sách Khách hàng trong hệ thống")

    add_h2(doc, "3.4 Kịch bản kiểm thử các ca kiểm thử chính (Test Cases)")
    md("## 3.4 Kịch bản kiểm thử các ca kiểm thử chính (Test Cases)\n")
    add_p(doc, "Hệ thống đã trải qua quá trình kiểm thử chức năng (Functional Testing) toàn diện trên môi trường máy chủ cục bộ. Dưới đây là các bảng kết quả kiểm thử tiêu biểu:")

    # Table 3.1: TC Auth
    add_table_title(doc, "Bảng 3.1", "Ca kiểm thử chức năng Đăng ký, Đăng nhập và Xác thực JWT (TC_AUTH)")
    create_table_generic(doc, ["Mã TC", "Mục tiêu kiểm thử", "Dữ liệu đầu vào", "Kết quả mong đợi", "Kết quả thực tế", "Đánh giá"], [
        ["TC_01", "Đăng nhập thành công với tài khoản Admin", "admin@luxeatelier.com / admin123", "Trả về JWT Token, vai trò ROLE_ADMIN, mở quyền vào trang Admin", "Đăng nhập thành công, xuất hiện nút Admin Portal", "ĐẠT (PASS)"],
        ["TC_02", "Đăng nhập với mật khẩu sai", "admin@luxeatelier.com / sai_pass", "Báo lỗi 401: 'Email hoặc mật khẩu không chính xác'", "Hiển thị thông báo lỗi màu đỏ, không cấp token", "ĐẠT (PASS)"],
        ["TC_03", "Đăng ký thành viên mới", "Nguyen Van A / test@gmail.com / 123456", "Tạo tài khoản mới, mã hóa BCrypt vào bảng users, tự động đăng nhập", "Tạo mới thành công, chào mừng người dùng", "ĐẠT (PASS)"],
        ["TC_04", "Kiểm tra phiên đăng nhập tự động", "Tải lại trang web (F5)", "Hệ thống đọc JWT Token từ LocalStorage và gọi /auth/me để duy trì phiên", "Người dùng vẫn ở trạng thái đăng nhập", "ĐẠT (PASS)"]
    ], col_widths=[1.5, 3.2, 3.2, 3.2, 3.0, 1.4])

    # Table 3.2: TC Cart
    add_table_title(doc, "Bảng 3.2", "Ca kiểm thử chức năng Giỏ hàng, Tính toán số lượng và Tạm tính (TC_CART)")
    create_table_generic(doc, ["Mã TC", "Mục tiêu kiểm thử", "Dữ liệu đầu vào", "Kết quả mong đợi", "Kết quả thực tế", "Đánh giá"], [
        ["TC_05", "Thêm sản phẩm biến thể vào giỏ hàng", "Variant ID: 6 (Đầm Lụa - Đen Onyx - S), Số lượng: 1", "Sản phẩm được lưu vào cart_items, giỏ hàng trượt ra hiển thị đúng mẫu", "Sản phẩm xuất hiện trong giỏ, tổng tiền 1.980.000đ", "ĐẠT (PASS)"],
        ["TC_06", "Tăng số lượng mặt hàng trong giỏ", "Bấm nút [+] tăng lên 2", "Số lượng đổi thành 2, tổng tiền nhân đôi thành 3.960.000đ", "Số lượng và thành tiền cập nhật tức thì", "ĐẠT (PASS)"],
        ["TC_07", "Xóa sản phẩm khỏi giỏ hàng", "Bấm nút icon thùng rác", "Xóa mặt hàng khỏi cart_items, tổng giỏ hàng về 0đ", "Giỏ hàng hiển thị thông báo 'Túi mua sắm trống'", "ĐẠT (PASS)"]
    ], col_widths=[1.5, 3.2, 3.2, 3.2, 3.0, 1.4])

    # Table 3.3: TC Coupon & Checkout
    add_table_title(doc, "Bảng 3.3", "Ca kiểm thử chức năng Áp dụng Coupon và Đặt hàng (TC_ORDER)")
    create_table_generic(doc, ["Mã TC", "Mục tiêu kiểm thử", "Dữ liệu đầu vào", "Kết quả mong đợi", "Kết quả thực tế", "Đánh giá"], [
        ["TC_08", "Áp dụng mã Coupon hợp lệ", "Mã: LUXE10, Đơn hàng: 1.980.000đ", "Giảm 10% (198.000đ), tổng thanh toán còn 1.812.000đ", "Hệ thống hiển thị dòng giảm giá chính xác", "ĐẠT (PASS)"],
        ["TC_09", "Áp dụng mã Coupon không tồn tại", "Mã: SAI_MA", "Báo lỗi: 'Mã giảm giá không tồn tại hoặc đã hết hạn'", "Hiển thị thông báo lỗi, giữ nguyên tiền gốc", "ĐẠT (PASS)"],
        ["TC_10", "Đặt hàng với phương thức COD", "Nhập thông tin người nhận, chọn COD", "Tạo bản ghi đơn hàng PENDING, trừ tồn kho kho hàng, xóa giỏ", "Chuyển sang trang OrderConfirmationPage", "ĐẠT (PASS)"]
    ], col_widths=[1.5, 3.2, 3.2, 3.2, 3.0, 1.4])

    # Table 3.4: TC Payment
    add_table_title(doc, "Bảng 3.4", "Ca kiểm thử chức năng Thanh toán trực tuyến VNPay Sandbox (TC_PAY)")
    create_table_generic(doc, ["Mã TC", "Mục tiêu kiểm thử", "Dữ liệu đầu vào", "Kết quả mong đợi", "Kết quả thực tế", "Đánh giá"], [
        ["TC_11", "Kích hoạt cổng thanh toán trực tuyến", "Chọn VNPay, bấm Đặt Hàng", "Mở modal VNPay với đúng số tiền đơn hàng", "Modal VNPay Gateway hiển thị đầy đủ", "ĐẠT (PASS)"],
        ["TC_12", "Xác nhận thanh toán trực tuyến thành công", "Bấm 'XÁC NHẬN THANH TOÁN THÀNH CÔNG'", "Gọi API /payments/confirm, chuyển trạng thái đơn sang PROCESSING", "Đơn hàng chuyển trạng thái Đang xử lý thành công", "ĐẠT (PASS)"]
    ], col_widths=[1.5, 3.2, 3.2, 3.2, 3.0, 1.4])

    # Table 3.5: TC Admin
    add_table_title(doc, "Bảng 3.5", "Ca kiểm thử chức năng Quản trị: Thêm mới sản phẩm và Biến thể (TC_ADMIN)")
    create_table_generic(doc, ["Mã TC", "Mục tiêu kiểm thử", "Dữ liệu đầu vào", "Kết quả mong đợi", "Kết quả thực tế", "Đánh giá"], [
        ["TC_13", "Thêm mới thiết kế thời trang kèm biến thể", "Tên: Áo Khoác Lông Cừu, 3 biến thể màu/size", "Lưu sản phẩm vào bảng products, sinh 3 biến thể trong product_variants", "Sản phẩm xuất hiện ngay trong cửa hàng và tồn kho", "ĐẠT (PASS)"],
        ["TC_14", "Cập nhật trạng thái đơn hàng", "Chuyển đơn từ PROCESSING sang SHIPPED", "Cập nhật order_status = 'SHIPPED' trong cơ sở dữ liệu", "Giao diện cập nhật thẻ trạng thái xanh", "ĐẠT (PASS)"]
    ], col_widths=[1.5, 3.2, 3.2, 3.2, 3.0, 1.4])

    add_h2(doc, "3.5 Đánh giá ưu điểm và hạn chế của hệ thống")
    md("## 3.5 Đánh giá ưu điểm và hạn chế của hệ thống\n")
    add_p(doc, "1. Ưu điểm nổi bật của hệ thống:", bold_prefix="")
    add_bullet(doc, "Kiến trúc Client - Server hiện đại, tách biệt hoàn toàn giữa Spring Boot và React TypeScript; API chuẩn RESTful phi trạng thái.", "Kiến trúc chuẩn mực: ")
    add_bullet(doc, "Bảo mật tài khoản đa tầng với mã hóa BCrypt và JWT Token; phân quyền rõ ràng giữa Khách hàng và Quản trị viên.", "An toàn & Bảo mật: ")
    add_bullet(doc, "Giao diện người dùng sang trọng, tinh tế, chuẩn phong cách thời trang cao cấp; tối ưu hóa font chữ tiếng Việt không lỗi font; tốc độ phản hồi cực nhanh.", "Thẩm mỹ & Trải nghiệm UX: ")
    add_bullet(doc, "Mô hình dữ liệu quan hệ hoàn chỉnh, giải quyết bài toán phức tạp về biến thể may đo (Màu sắc, Kích cỡ, Tồn kho riêng biệt) và tích hợp cổng thanh toán trực tuyến.", "Nghiệp vụ chuyên sâu: ")

    add_p(doc, "2. Hạn chế còn tồn tại:", bold_prefix="")
    add_bullet(doc, "Hệ thống thanh toán VNPay hiện đang chạy dưới dạng môi trường mô phỏng (Sandbox Simulation) phục vụ mục đích học tập và bảo vệ đồ án.", "Môi trường thanh toán: ")
    add_bullet(doc, "Chưa tích hợp dịch vụ gửi Email thông báo hóa đơn tự động (như SendGrid hoặc JavaMailSender) khi khách hàng hoàn tất đặt hàng.", "Thông báo tự động: ")

    doc.add_page_break()

    # ==========================================
    # KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN
    # ==========================================
    add_h1(doc, "KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN")
    md("\n# KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN\n")

    add_h2(doc, "1. Kết quả đạt được của đồ án")
    md("## 1. Kết quả đạt được của đồ án\n")
    p_conc1 = (
        "Sau thời gian nghiêm túc nghiên cứu lý thuyết và bắt tay vào hiện thực hóa sản phẩm, đồ án môn học "
        "'Xây dựng website thương mại điện tử thời trang may đo cao cấp L'ATELIER & CO.' đã hoàn thành đầy đủ "
        "tất cả các mục tiêu và yêu cầu đề ra ban đầu. Cụ thể:"
    )
    add_p(doc, p_conc1)
    md(p_conc1 + "\n")

    add_bullet(doc, "Xây dựng thành công hệ sinh thái Backend hoàn chỉnh bằng Java 21 và Spring Boot 3.4.3 với hơn 85 lớp mã nguồn, triển khai kiến trúc 3 tầng chuẩn (Controller - Service - Repository), tích hợp Spring Security JWT và bảo vệ phiên làm việc an toàn.", "Về mặt Backend: ")
    add_bullet(doc, "Xây dựng cơ sở dữ liệu quan hệ MySQL 8.0 gồm 14 bảng dữ liệu đạt chuẩn chuẩn hóa 3NF, cấu hình toàn vẹn khóa ngoại (Foreign Keys) và bảng mã utf8mb4 lưu trữ tiếng Việt sắc nét.", "Về mặt Cơ sở dữ liệu: ")
    add_bullet(doc, "Xây dựng ứng dụng Frontend Single Page Application hoàn thiện bằng React 19, TypeScript và Vite; thiết lập hệ thống thiết kế Modern Minimalist Luxury với độ phản hồi giao diện mượt mà và trực quan.", "Về mặt Frontend: ")
    add_bullet(doc, "Hiện thực hóa quy trình nghiệp vụ mua sắm thời trang khép kín: từ duyệt sản phẩm, lọc theo khoảng giá, chọn biến thể màu sắc/size, giỏ hàng slide-over, áp dụng mã ưu đãi Coupon đến thanh toán trực tuyến qua cổng VNPay.", "Về mặt Nghiệp vụ: ")
    add_bullet(doc, "Xây dựng trung tâm quản trị Admin Portal chuyên nghiệp với Dashboard thống kê 5 chỉ số KPI tài chính, quản lý đơn hàng nhiều trạng thái và chức năng thêm mới sản phẩm nhiều biến thể.", "Về mặt Quản trị: ")

    add_h2(doc, "2. Hướng phát triển trong tương lai")
    md("## 2. Hướng phát triển trong tương lai\n")
    add_p(doc, "Để đưa sản phẩm từ đồ án môn học trở thành một nền tảng thương mại điện tử thực tế thương mại hóa trên thị trường, hệ thống có thể mở rộng theo các hướng phát triển sau:")
    add_bullet(doc, "Đăng ký Merchant chính thức với Cổng thanh toán quốc gia VNPay và Cổng thanh toán quốc tế Stripe/PayPal để chấp nhận thẻ tín dụng Visa/MasterCard thật.", "1. Kết nối Cổng thanh toán chính thức: ")
    add_bullet(doc, "Tích hợp công nghệ thực tế ảo tăng cường (AR) cho phép khách hàng ướm thử trang phục hoặc xem mô hình 3D của các thiết kế may đo trên cơ thể.", "2. Tính năng thử đồ ảo (Virtual Fitting Room): ")
    add_bullet(doc, "Ứng dụng các thuật toán học máy (Machine Learning / AI) để gợi ý các mẫu trang phục phù hợp với sở thích, phong cách và lịch sử mua sắm của từng khách hàng.", "3. Hệ thống gợi ý thông minh (AI Recommendation): ")
    add_bullet(doc, "Đóng gói ứng dụng thành các Docker Container và triển khai lên hạ tầng điện toán đám mây (AWS, Google Cloud hoặc Microsoft Azure) kết hợp cơ chế CI/CD tự động.", "4. Đóng gói Container & Triển khai Cloud: ")

    doc.add_page_break()

    # ==========================================
    # TÀI LIỆU THAM KHẢO
    # ==========================================
    add_h1(doc, "TÀI LIỆU THAM KHẢO")
    md("\n# TÀI LIỆU THAM KHẢO\n")

    references = [
        ("1", "Craig Walls (2022), Spring in Action, Sixth Edition, Manning Publications, New York."),
        ("2", "Alex Banks & Eve Porcello (2020), Learning React: Modern Patterns for Developing React Apps, 2nd Edition, O'Reilly Media."),
        ("3", "Boris Cherny (2019), Programming TypeScript: Making Your JavaScript Applications Scale, O'Reilly Media."),
        ("4", "Robert C. Martin (2017), Clean Architecture: A Craftsman's Guide to Software Structure and Design, Prentice Hall."),
        ("5", "Trần Đình Quế, Nguyễn Mạnh Hùng (2018), Giáo trình Phân tích và Thiết kế hệ thống thông tin theo hướng đối tượng UML, NXB Thông tin và Truyền thông."),
        ("6", "Tài liệu kỹ thuật chính thức Spring Boot: https://spring.io/projects/spring-boot (Truy cập tháng 10/2026)."),
        ("7", "Tài liệu kỹ thuật chính thức ReactJS: https://react.dev (Truy cập tháng 10/2026)."),
        ("8", "Tài liệu đặc tả kỹ thuật kết nối Cổng thanh toán điện tử VNPay: https://sandbox.vnpayment.vn/apis/docs/huong-dan-tich-hop (Truy cập tháng 10/2026)."),
        ("9", "Chuẩn mã thông báo JSON Web Token (RFC 7519): https://jwt.io (Truy cập tháng 10/2026)."),
        ("10", "Tài liệu tối ưu hóa cơ sở dữ liệu MySQL 8.0 Reference Manual: https://dev.mysql.com/doc/refman/8.0/en (Truy cập tháng 10/2026).")
    ]

    for ref_num, ref_text in references:
        p_ref = doc.add_paragraph()
        p_ref.paragraph_format.line_spacing = 1.3
        p_ref.paragraph_format.space_before = Pt(3)
        p_ref.paragraph_format.space_after = Pt(3)
        p_ref.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        r_num = p_ref.add_run(f"[{ref_num}] ")
        r_num.font.name = 'Times New Roman'
        r_num.font.size = Pt(12)
        r_num.bold = True
        r_txt = p_ref.add_run(ref_text)
        r_txt.font.name = 'Times New Roman'
        r_txt.font.size = Pt(12)
        md(f"[{ref_num}] {ref_text}")

    # Save documents
    docx_path = "BAO_CAO_DO_AN_MON_HOC_FASHION_SHOP.docx"
    md_path = "BAO_CAO_DO_AN_MON_HOC_FASHION_SHOP.md"

    doc.save(docx_path)
    with open(md_path, 'w', encoding='utf-8') as f:
        f.write("\n".join(md_lines))

    print(f"Generated {docx_path} successfully!")
    print(f"Generated {md_path} successfully!")

if __name__ == '__main__':
    build_report()
