# Checklist QA, SEO, Hiệu Năng và Bảo Mật

## 1. QA chức năng

- Xác minh toàn bộ mẫu trang hiển thị đúng.
- Xác minh form lead gửi được và có email thông báo admin.
- Xác minh form booking tạo bản ghi `company_booking`.
- Xác minh popup voucher mở đúng khi bấm landing/banner.
- Xác minh submit voucher có lưu dữ liệu và gọi gửi Zalo.
- Xác minh WooCommerce cart/checkout hoàn tất đúng luồng.

## 2. Checklist SEO

- Title và description có đầy đủ cho trang/bài/sản phẩm.
- XML sitemap đã bật và submit lên Search Console.
- `robots.txt` được cấu hình cho môi trường thật.
- URL canonical hợp lệ (đặc biệt ở archive blog/sản phẩm).
- Có schema cho Organization, Article và Product khi áp dụng.

## 3. Checklist hiệu năng

- Plugin cache đã cấu hình và warm-up xong.
- Tối ưu ảnh và lazy-load đã bật.
- Minify JS/CSS đã bật sau khi kiểm tra tương thích.
- Đã kiểm tra LCP trang chủ và layout shift trên mobile.
- Core Web Vitals được kiểm tra bằng PageSpeed và test thực tế.

## 4. Checklist bảo mật

- Bắt buộc HTTPS cho toàn site.
- Tài khoản admin không dùng tên mặc định và đã bật 2FA.
- Tắt chỉnh sửa file trực tiếp trên môi trường thật.
- Backup tự động hoạt động (database + file hằng ngày).
- Đã test restore ít nhất một lần trên staging.
- Cập nhật plugin/giao diện luôn phải kiểm thử trên staging trước môi trường thật.

## 5. Theo dõi và quan sát hệ thống

- GA4 đã cài và xác minh event tracking.
- Event chuyển đổi đã map đủ: lead, booking, voucher, checkout.
- Bật ghi log lỗi trên WordPress và trong bảng điều khiển hosting.
