import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

def create_document():
    doc = docx.Document()

    # Page setup - Standard Margins (0.8 inch)
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)
        section.header_distance = Inches(0.4)
        section.footer_distance = Inches(0.4)
        
        # Header & Footer
        header = section.header
        hp = header.paragraphs[0]
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        hrun = hp.add_run("OmniSign Cloud™ | Client Proposal & Technical Feature Specification")
        hrun.font.name = "Arial"
        hrun.font.size = Pt(8.5)
        hrun.font.color.rgb = RGBColor(140, 140, 140)

        footer = section.footer
        fp = footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        frun = fp.add_run("Confidential & Proprietary • OmniSign Digital Signage Network")
        frun.font.name = "Arial"
        frun.font.size = Pt(8.5)
        frun.font.color.rgb = RGBColor(140, 140, 140)

    # Color Palette Constants
    NAVY_HEX = "0F172A"
    ORANGE_HEX = "EA580C"
    AMBER_HEX = "D97706"
    EMERALD_HEX = "059669"
    LIGHT_BG_HEX = "FEFCE8"
    SOFT_AMBER_BG = "FFFBEB"
    SOFT_BLUE_BG = "EFF6FF"
    BORDER_HEX = "E2E8F0"
    DARK_TEXT = RGBColor(15, 23, 42)
    MUTED_TEXT = RGBColor(100, 116, 139)
    WHITE = RGBColor(255, 255, 255)

    def set_cell_background(cell, fill_hex):
        tcPr = cell._tc.get_or_add_tcPr()
        shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
        tcPr.append(shd)

    def set_cell_margins(cell, top=140, bottom=140, left=180, right=180):
        tcPr = cell._tc.get_or_add_tcPr()
        tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
        tcPr.append(tcMar)

    def add_callout(text_list, title="KEY HIGHLIGHT", bg_hex="FFFBEB", border_hex="F59E0B"):
        tbl = doc.add_table(rows=1, cols=1)
        tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
        tbl.autofit = False
        tbl.columns[0].width = Inches(6.8)
        cell = tbl.cell(0, 0)
        set_cell_background(cell, bg_hex)
        set_cell_margins(cell, top=160, bottom=160, left=200, right=200)

        # Left border styling
        tcPr = cell._tc.get_or_add_tcPr()
        borders = parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="none"/><w:left w:val="single" w:sz="36" w:space="0" w:color="{border_hex}"/><w:bottom w:val="none"/><w:right w:val="none"/></w:tcBorders>')
        tcPr.append(borders)

        cp = cell.paragraphs[0]
        cp.paragraph_format.space_before = Pt(2)
        cp.paragraph_format.space_after = Pt(4)
        crun_title = cp.add_run(f"★ {title}\n")
        crun_title.bold = True
        crun_title.font.name = "Arial"
        crun_title.font.size = Pt(10.5)
        crun_title.font.color.rgb = RGBColor(180, 83, 9)

        for line in text_list:
            lp = cell.add_paragraph()
            lp.paragraph_format.space_before = Pt(1)
            lp.paragraph_format.space_after = Pt(2)
            lrun = lp.add_run(line)
            lrun.font.name = "Arial"
            lrun.font.size = Pt(9.5)
            lrun.font.color.rgb = RGBColor(30, 41, 59)
        
        doc.add_paragraph().paragraph_format.space_after = Pt(6)

    def add_h1(text, icon="📌"):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(18)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(f"{icon} {text}")
        run.bold = True
        run.font.name = "Arial"
        run.font.size = Pt(16)
        run.font.color.rgb = RGBColor(15, 23, 42)

    def add_h2(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(12)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.bold = True
        run.font.name = "Arial"
        run.font.size = Pt(12.5)
        run.font.color.rgb = RGBColor(234, 88, 12)

    def add_body(text, bold_prefix=None):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.line_spacing = 1.15
        if bold_prefix:
            br = p.add_run(bold_prefix)
            br.bold = True
            br.font.name = "Arial"
            br.font.size = Pt(10)
            br.font.color.rgb = DARK_TEXT
        r = p.add_run(text)
        r.font.name = "Arial"
        r.font.size = Pt(10)
        r.font.color.rgb = DARK_TEXT

    # -------------------------------------------------------------
    # 1. COVER PAGE / HERO BANNER
    # -------------------------------------------------------------
    cover_table = doc.add_table(rows=1, cols=1)
    cover_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    cover_table.autofit = False
    cover_table.columns[0].width = Inches(6.8)
    cover_cell = cover_table.cell(0, 0)
    set_cell_background(cover_cell, NAVY_HEX)
    set_cell_margins(cover_cell, top=400, bottom=400, left=300, right=300)

    cp0 = cover_cell.paragraphs[0]
    cp0.alignment = WD_ALIGN_PARAGRAPH.CENTER
    c_badge = cp0.add_run("ENTERPRISE DIGITAL SIGNAGE & DOOH PLATFORM\n\n")
    c_badge.font.name = "Arial"
    c_badge.font.size = Pt(9.5)
    c_badge.bold = True
    c_badge.font.color.rgb = RGBColor(245, 158, 11)

    c_title = cp0.add_run("OmniSign Cloud™\n")
    c_title.font.name = "Arial"
    c_title.font.size = Pt(28)
    c_title.bold = True
    c_title.font.color.rgb = WHITE

    c_sub = cp0.add_run("Client Proposal & Comprehensive Feature Specification\n\n")
    c_sub.font.name = "Arial"
    c_sub.font.size = Pt(13)
    c_sub.font.color.rgb = RGBColor(203, 213, 225)

    c_desc = cp0.add_run("A unified cloud-native Digital Signage Content Management System (CMS), Multi-Zone Canvas Studio, Daypart Scheduling Engine, and Programmatic Out-of-Home (pDOOH) Ad Network.\n")
    c_desc.font.name = "Arial"
    c_desc.font.size = Pt(10)
    c_desc.font.color.rgb = RGBColor(148, 163, 184)

    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # Document Meta Table
    meta_tbl = doc.add_table(rows=2, cols=2)
    meta_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    meta_tbl.autofit = False
    meta_tbl.columns[0].width = Inches(3.4)
    meta_tbl.columns[1].width = Inches(3.4)
    
    meta_cell_1 = meta_tbl.cell(0, 0)
    meta_cell_2 = meta_tbl.cell(0, 1)
    meta_cell_3 = meta_tbl.cell(1, 0)
    meta_cell_4 = meta_tbl.cell(1, 1)

    for c in [meta_cell_1, meta_cell_2, meta_cell_3, meta_cell_4]:
        set_cell_background(c, "F8FAFC")
        set_cell_margins(c, top=100, bottom=100, left=140, right=140)

    meta_cell_1.paragraphs[0].add_run("Prepared For: Valued Enterprise Client / Media Agency").bold = True
    meta_cell_2.paragraphs[0].add_run("Version: v2.4.0 (Enterprise Release)").bold = True
    meta_cell_3.paragraphs[0].add_run("Domain: Digital Signage & DOOH Advertising")
    meta_cell_4.paragraphs[0].add_run("Deployment: Cloud CMS + Edge Hardware Players")

    doc.add_paragraph().paragraph_format.space_after = Pt(14)

    # -------------------------------------------------------------
    # 2. EXECUTIVE SUMMARY & CLIENT PROPOSAL
    # -------------------------------------------------------------
    add_h1("Executive Summary & Business Proposal", "💼")
    add_body("OmniSign Cloud is an end-to-end digital signage and Programmatic Out-of-Home (pDOOH) advertising platform. In modern business and retail environments, dynamic visual communication drives customer engagement, increases foot-traffic conversion by up to 33%, and creates new recurring advertising revenue streams.")
    add_body("This document presents a complete proposal for deploying OmniSign Cloud across your commercial hardware network (LED Billboards, Retail Displays, Kiosks, Airport Totems, and Digital Menu Boards).")

    add_callout([
        "• Centralized Management: Control 1 to 10,000+ screens globally from a single responsive cloud dashboard.",
        "• High Revenue Potential: Monetize screen downtime with Programmatic Real-Time Bidding (RTB) and targeted brand campaigns.",
        "• Zero Blackout Resilience: Intelligent offline edge caching ensures screens keep playing even if internet disconnects.",
        "• 100% Verified Proof-of-Play: Automated cryptographic logs prove exact broadcast delivery for billing and auditing."
    ], title="CORE VALUE PROPOSITIONS FOR YOUR BUSINESS", bg_hex="EFF6FF", border_hex="2563EB")

    # -------------------------------------------------------------
    # 3. COMPREHENSIVE FEATURE SPECIFICATION
    # -------------------------------------------------------------
    add_h1("Comprehensive Feature Breakdown", "⚙️")

    add_h2("1. Smart Hardware Display Fleet Management")
    add_body("Real-time telemetry and management for all physical displays connected to the network.")
    add_body(" Displays show pairing codes on boot. Enter the 6-digit PIN on the dashboard to register and provision in under 5 seconds.", "• Instant 6-Digit PIN Pairing: ")
    add_body(" CPU load, RAM usage, internal temperature (°C), storage capacity (GB), and real-time online/offline heartbeats.", "• Real-Time Hardware Health: ")
    add_body(" Remotely trigger hardware reboots, force payload synchronizations, or adjust screen brightness and volume.", "• Remote Edge Controls: ")
    add_body(" Organize screens into logical groups (e.g. 'Highway Billboards', 'Mall Kiosks', 'Flagship Entrance') for targeted batch publishing.", "• Hierarchical Grouping: ")

    add_h2("2. Multi-Zone Canvas Studio & Layout Builder")
    add_body("Create dynamic, split-screen multi-zone layouts without any design expertise.")
    add_body(" Native support for 16:9 Landscape (TVs, Billboards), 9:16 Portrait (Totems, Mall Kiosks), and 32:9 Ultra-Wide Video Walls.", "• Multi-Aspect Ratio Engine: ")
    add_body(" Split screens into independent zones (e.g. 70% Video Showcase, 30% Promo Sidebar, 10% Bottom Ticker).", "• Pixel-Perfect Split Zones: ")
    add_body(" Instant access to pre-configured templates for Retail Stores, Cafe Menu Boards, Executive L-Bars, and Transit Terminals.", "• Layout Template Library: ")

    add_h2("3. Dynamic Interactive Live Widgets")
    add_body("Engage audiences with live real-time dynamic data widgets embedded in canvas zones:")
    
    # Widget Table
    wtbl = doc.add_table(rows=6, cols=3)
    wtbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    wtbl.autofit = False
    wtbl.columns[0].width = Inches(1.8)
    wtbl.columns[1].width = Inches(2.2)
    wtbl.columns[2].width = Inches(2.8)

    wheaders = ["Widget Name", "Key Capabilities", "Primary Use Case"]
    for i, h in enumerate(wheaders):
        c = wtbl.cell(0, i)
        set_cell_background(c, "FEF3C7")
        set_cell_margins(c, 100, 100, 120, 120)
        p = c.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        r = p.add_run(h)
        r.bold = True
        r.font.name = "Arial"
        r.font.size = Pt(9.5)
        r.font.color.rgb = RGBColor(146, 64, 14)

    wdata = [
        ("News Marquee Ticker", "Smooth scrolling text ticker with customizable speed, colors, and live RSS feeds.", "Breaking announcements & special discount alerts."),
        ("Smart Clock & Date", "Timezone-aware digital and analog world clock widgets.", "Airport terminals, corporate lobbies & wayfinding."),
        ("Live Weather Feed", "Real-time temperature, condition icons (°C/°F), and forecasts.", "Outdoor LED billboards, transit stops & hotels."),
        ("Interactive QR Connect", "Dynamic scannable QR codes for mobile coupon/menu downloads.", "Retail checkouts, promotional posters & menus."),
        ("Digital Menu Boards", "Structured menu lists with category tags, pricing, and dietary badges.", "Restaurants, cafes, food trucks & bistros.")
    ]

    for row_idx, data in enumerate(wdata, start=1):
        for col_idx, val in enumerate(data):
            c = wtbl.cell(row_idx, col_idx)
            set_cell_background(c, "FFFFFF" if row_idx % 2 == 1 else "FFFBEB")
            set_cell_margins(c, 80, 80, 100, 100)
            p = c.paragraphs[0]
            r = p.add_run(val)
            r.font.name = "Arial"
            r.font.size = Pt(9)
            r.font.color.rgb = DARK_TEXT

    doc.add_paragraph().paragraph_format.space_after = Pt(8)

    add_h2("4. Media Creative Vault & VAST 4.2 Support")
    add_body("Central asset repository for storing, categorizing, and optimizing 4K MP4 videos, WebM, PNG, JPEG, dynamic HTML5 banners, and programmatic VAST 4.2 video tags with automated compliance checks.")

    add_h2("5. Smart Dayparting & Automated Scheduling Engine")
    add_body("Automate content rotation based on time-of-day, day-of-week, and campaign priority.")
    add_body(" Schedule breakfast promotions from 07:00–11:30 AM and transition to evening retail campaigns automatically.", "• Time-Slot Precision: ")
    add_body(" Configure distinct schedules for weekdays vs. weekends across specific display target groups.", "• 7-Day Matrix: ")
    add_body(" Four-tier priority system (Emergency > High Yield > Standard > Remnant Fill).", "• Priority Resolution: ")

    add_h2("6. 1-Click Multi-Screen Publish & Instant Rollback")
    add_body("Deploy new layouts to 1,000+ displays in milliseconds. All deployment versions are recorded with a 1-click Rollback capability to instantly restore previous layouts if needed.")

    add_h2("7. Live Hardware Player & Standalone Web Player")
    add_body("Control room emulator mirrors physical screens in real-time. Displays can run standalone in any web browser via the dedicated URL (`?view=player&screen=scr-001`).")

    add_h2("8. Proof of Play (PoP) & Cryptographic Billing Audit")
    add_body("Every ad broadcast is logged with timestamps, screen IDs, and duration. Generate MRC-accredited Proof of Play reports for client invoicing.")

    add_h2("9. Emergency Public Safety Alert Takeover")
    add_body("Instantly override all scheduled advertising with high-visibility emergency evacuation, weather warning, or security notices with a single click.")

    # -------------------------------------------------------------
    # 4. ADVERTISING & DOOH USE CASES
    # -------------------------------------------------------------
    add_h1("Advertising & DOOH Market Applications", "🎯")
    
    use_cases = [
        ("🛣️ Outdoor Highway LED Billboards", "Deliver high-impact 10–30s video loops with weather triggers (e.g. coffee ads when raining, cold beverage ads when >28°C) and automated night dimming."),
        ("🛍️ Shopping Malls & Retail Totems", "Interactive 9:16 portrait kiosks offering store directories, flash sales, and QR-based mobile discount collection."),
        ("✈️ Transit Hubs (Airports & Metro)", "Split-screen displays featuring live flight/train schedules alongside premium brand sponsorships and news tickers."),
        ("☕ Quick Service Restaurants (QSR) & Cafes", "Automated digital menu boards with breakfast, lunch, and dinner daypart switching and live price updates."),
        ("🏢 Corporate Campuses & Conference Centers", "Branded L-Bar layouts displaying executive announcements, meeting schedules, and live financial tickers.")
    ]

    for title, desc in use_cases:
        add_body(desc, f"• {title}: ")

    doc.add_paragraph().paragraph_format.space_after = Pt(8)

    # -------------------------------------------------------------
    # 5. TECHNICAL ARCHITECTURE & DEPLOYMENT TOPOLOGY
    # -------------------------------------------------------------
    add_h1("Technical Architecture & Edge Reliability", "🏗️")

    arch_tbl = doc.add_table(rows=5, cols=2)
    arch_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    arch_tbl.autofit = False
    arch_tbl.columns[0].width = Inches(2.2)
    arch_tbl.columns[1].width = Inches(4.6)

    arch_data = [
        ("Cloud Backend CMS", "High-availability cloud infrastructure with REST APIs, WebSocket real-time event distribution, and secure token authentication."),
        ("Hardware Player Client", "Lightweight edge player compatible with Android TV, SignageOS, Ubuntu Core, Samsung Tizen, LG webOS, and Windows 11 IoT."),
        ("Offline Edge Caching", "Media assets are pre-cached locally on hardware storage. If internet connection drops, content continues playing seamlessly without interruption."),
        ("Security & RBAC", "Strict Role-Based Access Control (Super Admin, Content Manager, Screen Operator, Viewer) with encrypted audit logging.")
    ]

    for i, (k, v) in enumerate(arch_data):
        c1 = arch_tbl.cell(i, 0)
        c2 = arch_tbl.cell(i, 1)
        set_cell_background(c1, "F8FAFC")
        set_cell_background(c2, "FFFFFF")
        set_cell_margins(c1, 80, 80, 100, 100)
        set_cell_margins(c2, 80, 80, 100, 100)
        
        p1 = c1.paragraphs[0]
        r1 = p1.add_run(k)
        r1.bold = True
        r1.font.name = "Arial"
        r1.font.size = Pt(9)
        r1.font.color.rgb = DARK_TEXT

        p2 = c2.paragraphs[0]
        r2 = p2.add_run(v)
        r2.font.name = "Arial"
        r2.font.size = Pt(9)
        r2.font.color.rgb = DARK_TEXT

    doc.add_paragraph().paragraph_format.space_after = Pt(10)

    # -------------------------------------------------------------
    # 6. COMMERCIAL PROPOSAL & IMPLEMENTATION TIMELINE
    # -------------------------------------------------------------
    add_h1("Commercial Proposal & Implementation Plan", "📊")

    add_callout([
        "Phase 1: Hardware Audit & Screen Provisioning (Days 1–3)",
        "Phase 2: Cloud CMS Deployment & Template Customization (Days 4–7)",
        "Phase 3: Media Upload & Automated Daypart Schedule Setup (Days 8–10)",
        "Phase 4: Staff Training & Go-Live Network Launch (Days 11–14)"
    ], title="14-DAY RAPID DEPLOYMENT ROADMAP", bg_hex="ECFDF5", border_hex="059669")

    add_body("Thank you for considering OmniSign Cloud™ as your digital signage and DOOH advertising technology partner. We are committed to providing world-class reliability, rich visual experiences, and continuous revenue growth for your screen network.")

    # Save Document
    output_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "OmniSign_Cloud_Client_Proposal_and_Feature_Specification.docx"))
    doc.save(output_path)
    print(f"Successfully generated: {output_path}")

if __name__ == "__main__":
    create_document()
