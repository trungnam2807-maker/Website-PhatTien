# Runbook Go-live và Bàn Giao

## 1. Trước cutover (T-24h)

- Đóng băng thay đổi nội dung và plugin.
- Xuất backup mới nhất từ staging và môi trường thật.
- Kiểm tra DNS TTL và người phụ trách rollback.
- Xác nhận cổng thanh toán và SMTP đã ở chế độ môi trường thật.

## 2. Các bước cutover

1. Bật trang bảo trì trên môi trường thật.
2. Triển khai gói theme và plugin từ dự án này.
3. Chạy migrate database và search-replace URL nếu cần.
4. Flush permalink và xóa toàn bộ cache.
5. Tắt trang bảo trì.

## 3. Smoke test (30 phút đầu)

- Mở các trang Home/About/Services/Blog/Contact.
- Gửi thử lead và booking.
- Test popup voucher và thực hiện một lượt claim.
- Thêm sản phẩm vào giỏ và chạy thử một đơn checkout.
- Kiểm tra luồng event real-time trong GA4.

## 4. Hypercare (72 giờ đầu)

- Theo dõi uptime và lỗi hệ thống mỗi 4 giờ.
- Theo dõi tỉ lệ chuyển đổi lead/voucher hằng ngày.
- Ghi nhận lỗi người dùng và phân loại theo mức độ nghiêm trọng.

## 5. Gói bàn giao cuối cùng

- Bàn giao tài khoản admin qua kênh bảo mật.
- Bàn giao mã nguồn theme/plugin.
- SOP backup và restore.
- SOP cập nhật nội dung cho đội vận hành.
- Danh sách backlog cho phase 2.
