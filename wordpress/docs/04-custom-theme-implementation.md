# Ghi Chú Triển Khai Giao Diện Tùy Biến

## Các hạng mục bàn giao trong gói

- Đường dẫn giao diện: `wp-content/themes/company-theme`.
- Layout toàn cục: `header.php`, `footer.php`, `index.php`.
- Mẫu cốt lõi:
  - `front-page.php`
  - `page.php`
  - `home.php`
  - `archive.php`
  - `single.php`
  - `archive-service.php`
  - `single-service.php`
  - `woocommerce.php`
  - `page-contact.php`
  - `page-booking.php`
  - `page-voucher.php`
- Tài nguyên:
  - `style.css` chứa hệ token giao diện cơ bản.
  - `assets/js/main.js` xử lý tương tác popup/modal.

## Quy trình hiện thực từ Figma

1. Xuất design token từ Figma và map vào biến CSS trong `style.css`.
2. Dựng các section tái sử dụng dưới dạng phần mẫu hoặc block pattern.
3. Chuyển từng frame Figma thành mẫu trong hệ phân cấp WordPress.
4. Giữ logic nghiệp vụ trong plugin, hạn chế nhúng vào giao diện.

## Hành vi responsive

- Ưu tiên desktop-first với breakpoint chính ở mức 960px.
- Khối hero và các grid tự chuyển về 1 cột trên màn hình nhỏ.

## Chuẩn SEO và semantic HTML

- Đảm bảo thứ bậc heading đúng trong toàn bộ template.
- Mẫu archive/single ưu tiên cấu trúc nội dung rõ ràng.
- Tương thích tốt với plugin SEO để quản lý title/meta/schema.
