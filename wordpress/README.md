# Gói Triển Khai Website Doanh Nghiệp WordPress

Thư mục này chứa bộ triển khai sẵn sàng bàn giao cho website doanh nghiệp chạy WordPress trên hosting cPanel.

## Cấu trúc

- `docs/`: tài liệu thực thi, checklist bàn giao, kịch bản QA.
- `wp-content/themes/company-theme/`: khung custom theme WordPress.
- `wp-content/plugins/company-core/`: plugin nghiệp vụ cho lead, đặt lịch, voucher và tích hợp Zalo.

## Thứ tự triển khai khuyến nghị

1. Đọc `docs/01-prd-sitemap-userflow.md`.
2. Đọc `docs/02-figma-to-tech-spec.md`.
3. Thiết lập staging theo `docs/03-cpanel-staging-setup.md`.
4. Cài theme và plugin từ gói này.
5. Cấu hình WooCommerce theo `docs/06-woocommerce-operations.md`.
6. Chạy checklist QA theo `docs/07-qa-seo-performance-security.md`.
7. Go-live theo quy trình trong `docs/08-go-live-handover.md`.
