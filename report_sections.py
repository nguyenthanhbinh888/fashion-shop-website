# -*- coding: utf-8 -*-
"""
Builder module for generating the complete Academic Course Project Report
Project: Website Thương mại điện tử Thời trang may đo cao cấp L'ATELIER & CO.
"""

import sys
import docx
from docx import Document
from docx.shared import Cm, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

from docx_helpers import set_cell_margins, set_cell_shading, set_cell_border, add_header_page_number

def init_doc():
    doc = Document()
    section = doc.sections[0]
    section.top_margin = Cm(3.0)
    section.bottom_margin = Cm(3.0)
    section.left_margin = Cm(3.5)
    section.right_margin = Cm(2.0)
    section.page_width = Cm(21.0)
    section.page_height = Cm(29.7)

    header = section.header
    header_p = header.paragraphs[0]
    header_p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    run_header = header_p.add_run()
    run_header.font.name = 'Times New Roman'
    run_header.font.size = Pt(10)
    run_header.font.color.rgb = RGBColor(120, 120, 120)
    add_header_page_number(run_header)

    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Times New Roman'
    normal_style.font.size = Pt(13)
    normal_style.font.color.rgb = RGBColor(0, 0, 0)
    normal_style.paragraph_format.line_spacing = 1.5
    normal_style.paragraph_format.space_before = Pt(6)
    normal_style.paragraph_format.space_after = Pt(6)

    return doc

def add_p(doc, text, bold_prefix="", italic=False, align=WD_ALIGN_PARAGRAPH.JUSTIFY):
    p = doc.add_paragraph()
    p.alignment = align
    p.paragraph_format.line_spacing = 1.5
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after = Pt(6)
    if bold_prefix:
        r_b = p.add_run(bold_prefix)
        r_b.font.name = 'Times New Roman'
        r_b.font.size = Pt(13)
        r_b.bold = True
    if text:
        r = p.add_run(text)
        r.font.name = 'Times New Roman'
        r.font.size = Pt(13)
        r.italic = italic
    return p

def add_bullet(doc, text, bold_prefix=""):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.line_spacing = 1.5
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.space_after = Pt(4)
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    if bold_prefix:
        r_b = p.add_run(bold_prefix)
        r_b.font.name = 'Times New Roman'
        r_b.font.size = Pt(13)
        r_b.bold = True
    r = p.add_run(text)
    r.font.name = 'Times New Roman'
    r.font.size = Pt(13)
    return p

def add_h1(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(20)
    p.paragraph_format.space_after = Pt(12)
    p.paragraph_format.line_spacing = 1.5
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    r = p.add_run(text)
    r.font.name = 'Times New Roman'
    r.font.size = Pt(16)
    r.bold = True
    return p

def add_h2(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.space_after = Pt(8)
    p.paragraph_format.line_spacing = 1.5
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    r = p.add_run(text)
    r.font.name = 'Times New Roman'
    r.font.size = Pt(14)
    r.bold = True
    return p

def add_h3(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(10)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.line_spacing = 1.5
    p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    r = p.add_run(text)
    r.font.name = 'Times New Roman'
    r.font.size = Pt(13)
    r.bold = True
    return p

def add_table_title(doc, table_num, table_name):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(12)
    r1 = p.add_run(f"{table_num}. ")
    r1.font.name = 'Times New Roman'
    r1.font.size = Pt(12)
    r1.italic = True
    r2 = p.add_run(table_name)
    r2.font.name = 'Times New Roman'
    r2.font.size = Pt(12)
    r2.italic = False
    return p

def add_figure_caption(doc, fig_num, fig_name):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after = Pt(14)
    r1 = p.add_run(f"{fig_num}: ")
    r1.font.name = 'Times New Roman'
    r1.font.size = Pt(12)
    r1.italic = True
    r2 = p.add_run(fig_name)
    r2.font.name = 'Times New Roman'
    r2.font.size = Pt(12)
    r2.italic = False
    return p

def add_image_placeholder(doc, instructions, code_content=None):
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = table.cell(0, 0)
    cell.width = Cm(15.5)
    set_cell_shading(cell, "F8F9FA")
    set_cell_margins(cell, top=140, bottom=140, left=180, right=180)
    set_cell_border(cell,
                    top={'val': 'dashed', 'sz': '6', 'color': 'A0AEC0'},
                    bottom={'val': 'dashed', 'sz': '6', 'color': 'A0AEC0'},
                    left={'val': 'dashed', 'sz': '6', 'color': 'A0AEC0'},
                    right={'val': 'dashed', 'sz': '6', 'color': 'A0AEC0'})
    p = cell.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.space_after = Pt(4)
    r_box = p.add_run("📷 [HƯỚNG DẪN DÁN HÌNH ẢNH / BIỂU ĐỒ BÁO CÁO]\n")
    r_box.font.name = 'Times New Roman'
    r_box.font.size = Pt(11)
    r_box.bold = True
    r_box.font.color.rgb = RGBColor(180, 83, 9)

    r_inst = p.add_run(instructions)
    r_inst.font.name = 'Times New Roman'
    r_inst.font.size = Pt(10.5)
    r_inst.italic = True
    r_inst.font.color.rgb = RGBColor(75, 85, 99)

    if code_content:
        p_code = cell.add_paragraph()
        p_code.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p_code.paragraph_format.space_before = Pt(6)
        p_code.paragraph_format.space_after = Pt(2)
        r_c_title = p_code.add_run("Mã PlantUML / Mermaid gợi ý để vẽ biểu đồ:\n")
        r_c_title.font.name = 'Times New Roman'
        r_c_title.font.size = Pt(10)
        r_c_title.bold = True
        r_c = p_code.add_run(code_content)
        r_c.font.name = 'Consolas'
        r_c.font.size = Pt(9)
        r_c.font.color.rgb = RGBColor(30, 41, 59)

def format_cell_text(cell, text, bold=False, italic=False, size=12, align=WD_ALIGN_PARAGRAPH.LEFT, color_rgb=None):
    set_cell_margins(cell, top=80, bottom=80, left=120, right=120)
    p = cell.paragraphs[0]
    p.alignment = align
    p.paragraph_format.line_spacing = 1.15
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.space_after = Pt(4)
    r = p.add_run(text)
    r.font.name = 'Times New Roman'
    r.font.size = Pt(size)
    r.bold = bold
    r.italic = italic
    if color_rgb:
        r.font.color.rgb = color_rgb

def create_table_generic(doc, headers, rows_data, col_widths=None):
    table = doc.add_table(rows=len(rows_data) + 1, cols=len(headers))
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    hdr_cells = table.rows[0].cells
    for i, h_text in enumerate(headers):
        hdr_cells[i].text = ""
        format_cell_text(hdr_cells[i], h_text, bold=True, size=12, align=WD_ALIGN_PARAGRAPH.CENTER)
        set_cell_shading(hdr_cells[i], "E2E8F0")
        if col_widths and i < len(col_widths):
            hdr_cells[i].width = Cm(col_widths[i])
        set_cell_border(hdr_cells[i],
                        top={'val': 'single', 'sz': '6', 'color': '718096'},
                        bottom={'val': 'single', 'sz': '6', 'color': '718096'},
                        left={'val': 'single', 'sz': '4', 'color': 'CBD5E0'},
                        right={'val': 'single', 'sz': '4', 'color': 'CBD5E0'})

    for r_idx, row_values in enumerate(rows_data):
        row_cells = table.rows[r_idx + 1].cells
        bg_col = "F8FAFC" if r_idx % 2 == 1 else "FFFFFF"
        for c_idx, val in enumerate(row_values):
            row_cells[c_idx].text = ""
            is_center = (c_idx == 0 or len(str(val)) < 8)
            format_cell_text(row_cells[c_idx], str(val), bold=False, size=12,
                             align=WD_ALIGN_PARAGRAPH.CENTER if is_center else WD_ALIGN_PARAGRAPH.LEFT)
            set_cell_shading(row_cells[c_idx], bg_col)
            if col_widths and c_idx < len(col_widths):
                row_cells[c_idx].width = Cm(col_widths[c_idx])
            set_cell_border(row_cells[c_idx],
                            top={'val': 'single', 'sz': '4', 'color': 'E2E8F0'},
                            bottom={'val': 'single', 'sz': '4', 'color': 'E2E8F0'},
                            left={'val': 'single', 'sz': '4', 'color': 'E2E8F0'},
                            right={'val': 'single', 'sz': '4', 'color': 'E2E8F0'})
    return table

def create_use_case_table(doc, uc_id, uc_name, actor, desc, trigger, pre_cond, main_steps, alt_steps, post_cond):
    """
    Creates a Use Case specification table matching university format:
    Mã Use case | Tên Use case
    Tác nhân | Mô tả
    Sự kiện kích hoạt
    Tiền điều kiện
    Luồng sự kiện chính (#, Thực hiện bởi, Hành động)
    Luồng sự kiện thay thế (STT, Thực hiện bởi, Hành động)
    Hậu điều kiện
    """
    table = doc.add_table(rows=8, cols=4)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER

    widths = [Cm(3.0), Cm(4.5), Cm(3.0), Cm(5.0)]

    # Row 0: Mã Use case | [uc_id] | Tên Use case | [uc_name]
    r0 = table.rows[0].cells
    format_cell_text(r0[0], "Mã Use case", bold=True, size=12)
    format_cell_text(r0[1], uc_id, bold=True, size=12, color_rgb=RGBColor(30, 58, 138))
    format_cell_text(r0[2], "Tên Use case", bold=True, size=12)
    format_cell_text(r0[3], uc_name, bold=True, size=12)

    # Row 1: Tác nhân | [actor] (merge 1..3)
    r1 = table.rows[1].cells
    format_cell_text(r1[0], "Tác nhân", bold=True, size=12)
    cell_actor = r1[1]
    cell_actor.merge(r1[3])
    format_cell_text(cell_actor, actor, size=12)

    # Row 2: Mô tả | [desc] (merge 1..3)
    r2 = table.rows[2].cells
    format_cell_text(r2[0], "Mô tả", bold=True, size=12)
    cell_desc = r2[1]
    cell_desc.merge(r2[3])
    format_cell_text(cell_desc, desc, size=12)

    # Row 3: Sự kiện kích hoạt | [trigger] (merge 1..3)
    r3 = table.rows[3].cells
    format_cell_text(r3[0], "Sự kiện kích hoạt", bold=True, size=12)
    cell_trig = r3[1]
    cell_trig.merge(r3[3])
    format_cell_text(cell_trig, trigger, size=12)

    # Row 4: Tiền điều kiện | [pre_cond] (merge 1..3)
    r4 = table.rows[4].cells
    format_cell_text(r4[0], "Tiền điều kiện", bold=True, size=12)
    cell_pre = r4[1]
    cell_pre.merge(r4[3])
    format_cell_text(cell_pre, pre_cond, size=12)

    # Row 5: Luồng sự kiện chính
    r5 = table.rows[5].cells
    format_cell_text(r5[0], "Luồng sự kiện chính", bold=True, size=12)
    cell_main = r5[1]
    cell_main.merge(r5[3])
    # Build text for main steps
    main_txt = ""
    for idx, who, action in main_steps:
        main_txt += f"Bước {idx} [{who}]: {action}\n"
    format_cell_text(cell_main, main_txt.strip(), size=12)

    # Row 6: Luồng sự kiện thay thế
    r6 = table.rows[6].cells
    format_cell_text(r6[0], "Luồng sự kiện thay thế", bold=True, size=12)
    cell_alt = r6[1]
    cell_alt.merge(r6[3])
    alt_txt = ""
    for idx, who, action in alt_steps:
        alt_txt += f"STT {idx} [{who}]: {action}\n"
    format_cell_text(cell_alt, alt_txt.strip() if alt_txt else "Không có", size=12)

    # Row 7: Hậu điều kiện
    r7 = table.rows[7].cells
    format_cell_text(r7[0], "Hậu điều kiện", bold=True, size=12)
    cell_post = r7[1]
    cell_post.merge(r7[3])
    format_cell_text(cell_post, post_cond, size=12)

    # Format borders and shading for all cells
    for row in table.rows:
        for c in row.cells:
            set_cell_border(c,
                            top={'val': 'single', 'sz': '4', 'color': '4A5568'},
                            bottom={'val': 'single', 'sz': '4', 'color': '4A5568'},
                            left={'val': 'single', 'sz': '4', 'color': '4A5568'},
                            right={'val': 'single', 'sz': '4', 'color': '4A5568'})
    # Header cells shaded
    set_cell_shading(r0[0], "EDF2F7")
    set_cell_shading(r0[2], "EDF2F7")
    set_cell_shading(r1[0], "EDF2F7")
    set_cell_shading(r2[0], "EDF2F7")
    set_cell_shading(r3[0], "EDF2F7")
    set_cell_shading(r4[0], "EDF2F7")
    set_cell_shading(r5[0], "EDF2F7")
    set_cell_shading(r6[0], "EDF2F7")
    set_cell_shading(r7[0], "EDF2F7")

    return table

print("Table builders ready.")
