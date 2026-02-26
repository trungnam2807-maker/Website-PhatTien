# Cấu Hình Và Vận Hành WooCommerce

## 1. Checklist thiết lập ban đầu

- Cài đặt và kích hoạt plugin WooCommerce.
- Chạy trình hướng dẫn thiết lập (tiền tệ, địa chỉ, khu vực vận chuyển, phương thức thanh toán).
- Tạo đủ trang bắt buộc: Shop, Cart, Checkout, My Account.
- Gán đúng các trang trong phần cài đặt WooCommerce.

## 2. Tích hợp theme và plugin trong gói này

- Theme có sẵn file `woocommerce.php` để bọc giao diện WooCommerce.
- Class plugin `class-company-woocommerce.php` đang xử lý:
  - tính năng gallery (zoom/lightbox/slider),
  - điều chỉnh trường checkout,
  - lưu nguồn đơn hàng qua cookie `utm_source`.

## 3. Chuẩn dữ liệu sản phẩm

- Tiêu đề sản phẩm cần chứa từ khóa chính.
- Mô tả ngắn nên tập trung chuyển đổi.
- Ảnh sản phẩm cần tối ưu trước khi upload.
- Mỗi sản phẩm cần khai báo tồn kho và nhóm vận chuyển.

## 4. Khuyến nghị cho checkout

- Bắt buộc số điện thoại.
- Chỉ giữ lại các trường checkout thiết yếu.
- Dùng cổng thanh toán tin cậy và bắt buộc HTTPS.
- Có thể bật thông báo bỏ giỏ ở phase 2 (tùy chọn).

## 5. Coupon và voucher

- Coupon gốc của WooCommerce có thể chạy song song với luồng voucher Zalo custom.
- Quy ước đặt tên campaign nên thống nhất giữa team marketing và bán hàng.
- Theo dõi tỷ lệ sử dụng mã theo campaign và kênh nguồn.
