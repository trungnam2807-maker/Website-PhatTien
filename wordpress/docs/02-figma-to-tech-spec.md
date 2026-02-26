# Chuyển Figma Sang Đặc Tả Kỹ Thuật

## 1. Giả định làm việc

- Figma có đầy đủ frame desktop và mobile cho toàn bộ trang trong MVP.
- Hệ thống thiết kế dùng token và component tái sử dụng.
- Đích triển khai là giao diện WordPress tùy biến.

## 2. Checklist bóc tách design token

- Màu sắc: brand, neutral, success, warning, error.
- Typography: font family, cỡ chữ, line-height, font-weight.
- Spacing: hệ lưới cơ sở 4/8 và khoảng cách section.
- Radius/shadow: quy chuẩn độ bo và chiều sâu cho card/button/modal.
- Breakpoint: `>=1200`, `992-1199`, `768-991`, `<=767`.

## 3. Danh mục component

- Thành phần global: header, mega menu, footer, breadcrumb.
- Khối nội dung: hero, intro split, services grid, testimonial, FAQ, CTA.
- Biểu mẫu: form lead, form đặt lịch, popup voucher.
- Khối thương mại: thẻ sản phẩm, gallery, tóm tắt giỏ hàng, bước checkout.
- Khối biên tập: thẻ bài viết, tác giả, bài liên quan, newsletter.

## 4. Ánh xạ từ Figma sang WordPress

- `Mẫu trang chủ` -> `front-page.php`.
- `Mẫu trang nội dung` (about, contact, booking, voucher) -> `page-{slug}.php` hoặc mẫu có điều kiện.
- `Services archive` -> `archive-service.php`.
- `Service detail` -> `single-service.php`.
- `Blog archive` -> `home.php` hoặc `archive.php`.
- `Blog detail` -> `single.php`.
- `Shop/product/cart/checkout` -> mẫu/hook của WooCommerce trong giao diện.

## 5. Mapping dữ liệu

- Trang dịch vụ -> CPT `service`.
- Yêu cầu đặt lịch -> CPT `company_booking`.
- Lead -> bảng custom `wp_company_leads`.
- Đăng ký voucher -> bảng custom `wp_company_vouchers`.
- Log voucher -> bảng custom `wp_company_voucher_logs`.

## 6. Ghi chú triển khai frontend

- Dùng semantic HTML và ARIA cho modal/form.
- Dùng CSS custom properties cho design token.
- JavaScript viết gọn, ưu tiên progressive enhancement.
- Dùng ảnh responsive và lazy-load.

## 7. Quy tắc cho đội biên tập nội dung

- Mỗi section trang cần map rõ sang Gutenberg block.
- Section lặp lại nên dùng block pattern tái sử dụng.
- Trường SEO quản lý qua plugin SEO (Yoast hoặc Rank Math).

## 8. Định nghĩa hoàn thành (UI)

- Khoảng cách và phân cấp hiển thị bám sát Figma.
- Responsive đạt yêu cầu trên mobile/tablet/desktop.
- Đủ trạng thái tương tác: hover, active, focus, error, disabled.
- Core Web Vitals không có hồi quy nghiêm trọng sau khi render mẫu giao diện.
