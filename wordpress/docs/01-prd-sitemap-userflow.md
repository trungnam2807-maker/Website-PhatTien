# PRD, Sitemap và User Flow (Phase 1)

## 1. Mục tiêu sản phẩm

- Xây dựng website doanh nghiệp định hướng chuyển đổi, có khả năng quản trị nội dung linh hoạt.
- Thu thập lead từ các trang chính và từ landing page voucher.
- Hỗ trợ đặt lịch tư vấn và luồng mua hàng online.
- Đảm bảo đội vận hành nội dung không kỹ thuật vẫn dùng được dễ dàng.

## 2. Phạm vi (MVP đã chốt)

- Nhóm trang doanh nghiệp: Trang chủ, Giới thiệu, Dịch vụ, Liên hệ.
- Blog/Tin tức có cấu trúc SEO và schema cơ bản.
- Form thu lead có gửi email và khả năng tích hợp webhook.
- Luồng đặt lịch tư vấn có theo dõi trạng thái.
- Gian hàng WooCommerce và thanh toán.
- Landing page voucher có popup và gửi mã qua Zalo.

## 3. Nhóm người dùng chính

- `Khách truy cập`: xem dịch vụ, đọc blog, gửi lead.
- `Đội kinh doanh`: tiếp nhận và xử lý lead/đặt lịch.
- `Biên tập nội dung`: cập nhật trang, bài viết, landing page.
- `Quản trị cửa hàng`: quản lý sản phẩm và đơn hàng.

## 4. Kiến trúc thông tin (sitemap)

- `/` Trang chủ
- `/about/` Giới thiệu
- `/services/` Danh sách dịch vụ
- `/services/{service-slug}/` Chi tiết dịch vụ
- `/blog/` Danh sách bài viết
- `/blog/{post-slug}/` Chi tiết bài viết
- `/contact/` Liên hệ
- `/booking/` Đặt lịch
- `/voucher/` Landing voucher
- `/shop/` Danh sách sản phẩm
- `/product/{product-slug}/` Chi tiết sản phẩm
- `/cart/` Giỏ hàng
- `/checkout/` Thanh toán
- `/my-account/` Tài khoản khách hàng
- Trang tiện ích: `/privacy-policy/`, `/terms/`, `/thank-you/`

## 5. Sự kiện chuyển đổi cần theo dõi

- Gửi lead thành công.
- Gửi đặt lịch thành công.
- Đăng ký voucher thành công.
- Gửi voucher qua Zalo thành công.
- Thêm vào giỏ hàng.
- Thanh toán thành công.

## 6. Điểm chính của user flow

### A. Luồng lead

1. Khách truy cập vào trang.
2. Khách gửi form lead.
3. Hệ thống xác thực dữ liệu và chống spam.
4. Hệ thống lưu bản ghi lead.
5. Hệ thống gửi email thông báo cho đội sales.
6. Tùy chọn đẩy dữ liệu sang CRM qua webhook.
7. Khách được chuyển sang trang cảm ơn.

### B. Luồng voucher (popup landing)

1. Khách bấm vào ảnh hero/banner ở trang voucher.
2. Popup xuất hiện với các trường bắt buộc (tên, số điện thoại, đồng ý điều khoản).
3. Hệ thống xác thực và lưu thông tin.
4. Hệ thống sinh mã voucher duy nhất.
5. Hệ thống gửi mã qua API Zalo OA.
6. Hệ thống ghi log trạng thái gửi.
7. Khách thấy thông báo thành công hoặc fallback.

### C. Luồng đặt lịch

1. Khách mở trang đặt lịch và chọn ngày/giờ mong muốn.
2. Hệ thống xác thực dữ liệu liên hệ.
3. Yêu cầu đặt lịch được lưu thành custom post type.
4. Hệ thống gửi email thông báo cho đội vận hành.
5. Khách nhận màn hình xác nhận.

### D. Luồng mua hàng

1. Khách mở shop và xem chi tiết sản phẩm.
2. Khách thêm sản phẩm vào giỏ hàng.
3. Khách thanh toán bằng phương thức đã cấu hình.
4. WooCommerce tạo đơn hàng.
5. Khách nhận xác nhận đơn hàng.

## 7. Quy tắc nghiệp vụ ban đầu

- Định dạng mã voucher: `VC-{DATE}-{RAND6}`.
- Mỗi số điện thoại chỉ nhận một voucher còn hiệu lực trong một campaign.
- Hạn voucher mặc định 7 ngày, trừ khi có cấu hình khác.
- Đặt lịch bắt buộc số điện thoại và ngày hẹn.
- Dữ liệu lead/đặt lịch được lưu tối thiểu 12 tháng.
