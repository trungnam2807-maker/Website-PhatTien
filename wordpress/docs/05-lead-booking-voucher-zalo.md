# Luồng Lead, Đặt Lịch, Voucher và Zalo

## Hạng mục plugin đã bàn giao

- Đường dẫn plugin: `wp-content/plugins/company-core`.
- File khởi động chính: `company-core.php`.
- Module nghiệp vụ:
  - `class-company-lead-api.php`
  - `class-company-voucher-service.php`
  - `class-company-zalo-client.php`
  - `class-company-booking-post-type.php`

## Bảng dữ liệu tạo khi kích hoạt plugin

- `wp_company_leads`
- `wp_company_vouchers`
- `wp_company_voucher_logs`

## Shortcode

- `[company_lead_form]` dùng cho trang liên hệ/thu lead.
- `[company_booking_form]` dùng cho trang đặt lịch.
- `[company_voucher_popup]` dùng cho giao diện popup voucher.

## Bộ xử lý submit

- `company_submit_lead`: xác thực và lưu lead, gửi email thông báo admin.
- `company_submit_booking`: lưu yêu cầu đặt lịch vào CPT `company_booking`.
- `company_claim_voucher`: lưu lead, tạo/upsert voucher, gửi voucher qua Zalo OA.

## Hành vi voucher và Zalo

- Mã voucher sinh theo dạng `VC-YYYYMMDD-XXXXXX`.
- Số điện thoại đã tồn tại sẽ nhận lại voucher đang hiệu lực.
- Trạng thái gửi được lưu (`pending`, `sent`, `failed`).
- Nếu gửi Zalo thất bại và có email, hệ thống gửi phương án dự phòng qua email.

## Biến cấu hình bắt buộc trong `wp-config.php`

```php
define('COMPANY_ZALO_API_URL', 'https://openapi.zalo.me/v3.0/oa/message/cs');
define('COMPANY_ZALO_ACCESS_TOKEN', 'replace_me');
define('COMPANY_VOUCHER_EXPIRY_DAYS', 7);
```

## Ghi chú bảo mật

- Bộ xử lý form dùng nonce của WordPress.
- Dữ liệu đầu vào được sanitize trước khi lưu.
- Redirect-after-post giúp tránh submit trùng khi refresh trình duyệt.
