# Hướng Dẫn Thiết Lập Staging Trên cPanel

## 1. Điều kiện tiên quyết

- Domain chính đã hoạt động.
- Có quyền truy cập cPanel và SSL.
- Có quyền tạo cơ sở dữ liệu MySQL.
- Có sẵn thông tin SMTP.

## 2. Tạo môi trường staging

1. Tạo subdomain: `staging.yourdomain.com`.
2. Tạo database và user có đầy đủ quyền.
3. Cài hệ quản trị nội dung WordPress trên subdomain staging.
4. Bật HTTPS và kiểm tra chứng chỉ SSL.

## 3. Hardening cơ bản

- Tắt XML-RPC nếu không sử dụng.
- Đặt mật khẩu admin mạnh và bật 2FA.
- Giới hạn số lần đăng nhập sai bằng plugin bảo mật.
- Chặn chỉnh sửa file trực tiếp trong WP admin (`DISALLOW_FILE_EDIT`).

## 4. Bộ plugin nền tảng bắt buộc

- Plugin SEO (Yoast SEO hoặc Rank Math).
- Plugin cache (LiteSpeed Cache nếu hosting hỗ trợ).
- Plugin bảo mật (Wordfence hoặc tương đương).
- Plugin backup (UpdraftPlus hoặc tương đương).
- Plugin SMTP (WP Mail SMTP).
- WooCommerce.

## 5. Triển khai gói dự án

1. Sao chép `wordpress/wp-content/themes/company-theme` vào `wp-content/themes/` của staging.
2. Sao chép `wordpress/wp-content/plugins/company-core` vào `wp-content/plugins/` của staging.
3. Kích hoạt theme `Company Theme`.
4. Kích hoạt plugin `Company Core`.
5. Vào Permalinks và bấm lưu để flush rewrite rules.

## 6. Cấu hình môi trường (khuyến nghị)

Thêm vào `wp-config.php`:

```php
define('WP_ENVIRONMENT_TYPE', 'staging');
define('DISALLOW_FILE_EDIT', true);
define('COMPANY_ZALO_API_URL', 'https://openapi.zalo.me/v3.0/oa/message/cs');
define('COMPANY_ZALO_ACCESS_TOKEN', 'replace_me');
define('COMPANY_VOUCHER_EXPIRY_DAYS', 7);
```

## 7. SMTP và email giao dịch

- Cấu hình email gửi bằng domain công ty.
- Kiểm tra gửi mail từ luồng lead, booking và voucher.
- Thiết lập mailbox giám sát khi gửi lỗi.

## 8. Quy trình migrate dữ liệu (khi sẵn sàng)

- Migrate nội dung bằng All-in-One WP Migration hoặc Duplicator.
- Tìm và thay URL từ staging sang môi trường thật.
- Tạo lại permalink và xóa toàn bộ cache.

## 9. Kế hoạch rollback

- Duy trì snapshot backup hằng ngày (file + database).
- Trước go-live, tạo một điểm khôi phục thủ công.
- Nếu release lỗi, restore snapshot và chạy lại checklist smoke test.
