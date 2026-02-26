# Kịch Bản UAT

## Trang doanh nghiệp

- Trang chủ hiển thị đúng và CTA điều hướng chính xác.
- Trang Giới thiệu và Dịch vụ khớp nội dung đã duyệt.
- Form ở trang Liên hệ gửi thành công và trả thông báo đúng.

## Lead và đặt lịch

- Lead form lưu đúng dữ liệu vào `company_leads`.
- Booking form tạo bản ghi mới trong `company_booking`.
- Admin nhận email thông báo cho cả lead và booking.

## Voucher và Zalo

- Popup voucher mở đúng khi bấm ảnh/banner trên landing.
- Submit hợp lệ tạo mới/cập nhật voucher theo số điện thoại.
- Gọi Zalo thành công thì lưu trạng thái `sent` và ghi log.
- Gọi Zalo lỗi thì lưu trạng thái `failed` và gửi email dự phòng.

## WooCommerce

- Trang danh sách sản phẩm và chi tiết sản phẩm hiển thị đúng.
- Giỏ hàng thêm/sửa/xóa sản phẩm hoạt động đúng.
- Checkout xác thực bắt buộc trường số điện thoại.
- Trang xác nhận đơn hiển thị đúng sau thanh toán.

## SEO và hiệu năng

- Sitemap truy cập được và có đủ URL cần thiết.
- Metadata hiển thị đúng trong mã nguồn trang chính.
- Điểm PageSpeed mobile không có hồi quy nghiêm trọng.
- Security header xuất hiện đầy đủ trong response.
