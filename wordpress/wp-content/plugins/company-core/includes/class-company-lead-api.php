<?php
/**
 * Bộ xử lý form lead, đặt lịch và voucher.
 */

if (!defined('ABSPATH')) {
    exit;
}

class Company_Lead_Api
{
    public static function register(): void
    {
        add_shortcode('company_lead_form', [self::class, 'render_lead_form']);
        add_shortcode('company_booking_form', [self::class, 'render_booking_form']);

        add_action('admin_post_nopriv_company_submit_lead', [self::class, 'handle_lead']);
        add_action('admin_post_company_submit_lead', [self::class, 'handle_lead']);

        add_action('admin_post_nopriv_company_submit_booking', [self::class, 'handle_booking']);
        add_action('admin_post_company_submit_booking', [self::class, 'handle_booking']);

        add_action('admin_post_nopriv_company_claim_voucher', [self::class, 'handle_voucher_claim']);
        add_action('admin_post_company_claim_voucher', [self::class, 'handle_voucher_claim']);
    }

    public static function render_lead_form(): string
    {
        ob_start();
        ?>
        <form class="card" method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
            <input type="hidden" name="action" value="company_submit_lead">
            <?php wp_nonce_field('company_submit_lead_action', 'company_submit_lead_nonce'); ?>
            <h3><?php esc_html_e('Đăng ký tư vấn', 'company-core'); ?></h3>
            <div class="company-form-row">
                <label><?php esc_html_e('Họ tên', 'company-core'); ?></label>
                <input type="text" name="name" required>
            </div>
            <div class="company-form-row">
                <label><?php esc_html_e('Số điện thoại', 'company-core'); ?></label>
                <input type="tel" name="phone" required>
            </div>
            <div class="company-form-row">
                <label><?php esc_html_e('Email', 'company-core'); ?></label>
                <input type="email" name="email">
            </div>
            <button type="submit"><?php esc_html_e('Gửi thông tin', 'company-core'); ?></button>
        </form>
        <?php
        return (string) ob_get_clean();
    }

    public static function render_booking_form(): string
    {
        ob_start();
        ?>
        <form class="card" method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
            <input type="hidden" name="action" value="company_submit_booking">
            <?php wp_nonce_field('company_submit_booking_action', 'company_submit_booking_nonce'); ?>
            <h3><?php esc_html_e('Đặt lịch tư vấn', 'company-core'); ?></h3>
            <div class="company-form-row">
                <label><?php esc_html_e('Họ tên', 'company-core'); ?></label>
                <input type="text" name="name" required>
            </div>
            <div class="company-form-row">
                <label><?php esc_html_e('Số điện thoại', 'company-core'); ?></label>
                <input type="tel" name="phone" required>
            </div>
            <div class="company-form-row">
                <label><?php esc_html_e('Ngày hẹn', 'company-core'); ?></label>
                <input type="date" name="booking_date" required>
            </div>
            <div class="company-form-row">
                <label><?php esc_html_e('Nội dung', 'company-core'); ?></label>
                <textarea name="message" rows="4"></textarea>
            </div>
            <button type="submit"><?php esc_html_e('Đặt lịch', 'company-core'); ?></button>
        </form>
        <?php
        return (string) ob_get_clean();
    }

    public static function handle_lead(): void
    {
        if (!isset($_POST['company_submit_lead_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['company_submit_lead_nonce'])), 'company_submit_lead_action')) {
            self::redirect_with_notice('nonce_failed');
        }

        $name = sanitize_text_field((string) wp_unslash($_POST['name'] ?? ''));
        $phone = sanitize_text_field((string) wp_unslash($_POST['phone'] ?? ''));
        $email = sanitize_email((string) wp_unslash($_POST['email'] ?? ''));

        if ($name === '' || $phone === '') {
            self::redirect_with_notice('missing_required');
        }

        global $wpdb;
        $leadTable = $wpdb->prefix . 'company_leads';
        $wpdb->insert(
            $leadTable,
            [
                'name' => $name,
                'phone' => $phone,
                'email' => $email,
                'source' => 'lead_form',
                'created_at' => current_time('mysql', true),
            ],
            ['%s', '%s', '%s', '%s', '%s']
        );

        wp_mail(get_option('admin_email'), 'Lead mới từ website', "Họ tên: {$name}\nSố điện thoại: {$phone}\nEmail: {$email}");
        self::redirect_with_notice('lead_submitted');
    }

    public static function handle_booking(): void
    {
        if (!isset($_POST['company_submit_booking_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['company_submit_booking_nonce'])), 'company_submit_booking_action')) {
            self::redirect_with_notice('nonce_failed');
        }

        $name = sanitize_text_field((string) wp_unslash($_POST['name'] ?? ''));
        $phone = sanitize_text_field((string) wp_unslash($_POST['phone'] ?? ''));
        $bookingDate = sanitize_text_field((string) wp_unslash($_POST['booking_date'] ?? ''));
        $message = sanitize_textarea_field((string) wp_unslash($_POST['message'] ?? ''));

        if ($name === '' || $phone === '' || $bookingDate === '') {
            self::redirect_with_notice('missing_required');
        }

        $postId = wp_insert_post(
            [
                'post_type' => 'company_booking',
                'post_title' => sprintf('%s - %s', $name, $bookingDate),
                'post_status' => 'publish',
                'post_content' => $message,
                'meta_input' => [
                    '_company_booking_name' => $name,
                    '_company_booking_phone' => $phone,
                    '_company_booking_date' => $bookingDate,
                ],
            ],
            true
        );

        if (is_wp_error($postId)) {
            self::redirect_with_notice('booking_failed');
        }

        wp_mail(get_option('admin_email'), 'Yêu cầu đặt lịch mới', "Họ tên: {$name}\nSố điện thoại: {$phone}\nNgày hẹn: {$bookingDate}\n\n{$message}");
        self::redirect_with_notice('booking_submitted');
    }

    public static function handle_voucher_claim(): void
    {
        if (!isset($_POST['company_claim_voucher_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['company_claim_voucher_nonce'])), 'company_claim_voucher_action')) {
            self::redirect_with_notice('nonce_failed');
        }

        $name = sanitize_text_field((string) wp_unslash($_POST['name'] ?? ''));
        $phone = sanitize_text_field((string) wp_unslash($_POST['phone'] ?? ''));
        $email = sanitize_email((string) wp_unslash($_POST['email'] ?? ''));
        $consent = sanitize_text_field((string) wp_unslash($_POST['consent'] ?? '0'));

        if ($name === '' || $phone === '' || $consent !== '1') {
            self::redirect_with_notice('missing_required');
        }

        global $wpdb;
        $leadTable = $wpdb->prefix . 'company_leads';
        $wpdb->insert(
            $leadTable,
            [
                'name' => $name,
                'phone' => $phone,
                'email' => $email,
                'source' => 'voucher_popup',
                'created_at' => current_time('mysql', true),
            ],
            ['%s', '%s', '%s', '%s', '%s']
        );

        $voucher = Company_Voucher_Service::upsert_for_phone($phone);
        $zalo = Company_Zalo_Client::send_voucher($phone, $voucher['voucher_code'], $voucher['expires_at']);
        self::log_voucher_delivery($voucher['voucher_code'], $zalo);

        if ($zalo['success']) {
            Company_Voucher_Service::update_delivery_status($voucher['voucher_code'], 'sent');
            self::redirect_with_notice('voucher_sent');
        }

        Company_Voucher_Service::update_delivery_status($voucher['voucher_code'], 'failed');
        if ($email !== '') {
            wp_mail(
                $email,
                'Mã voucher dự phòng',
                sprintf(
                    "Mã voucher của bạn: %s\nHạn sử dụng: %s\n\nGửi qua Zalo thất bại nên hệ thống gửi qua email.",
                    $voucher['voucher_code'],
                    $voucher['expires_at']
                )
            );
        }
        self::redirect_with_notice('voucher_fallback');
    }

    private static function log_voucher_delivery(string $voucherCode, array $zaloResult): void
    {
        global $wpdb;
        $table = $wpdb->prefix . 'company_voucher_logs';
        $wpdb->insert(
            $table,
            [
                'voucher_code' => $voucherCode,
                'provider' => 'zalo_oa',
                'request_payload' => (string) ($zaloResult['request_payload'] ?? ''),
                'response_payload' => (string) ($zaloResult['response'] ?? ''),
                'status' => !empty($zaloResult['success']) ? 'sent' : 'failed',
                'created_at' => current_time('mysql', true),
            ],
            ['%s', '%s', '%s', '%s', '%s', '%s']
        );
    }

    private static function redirect_with_notice(string $notice): void
    {
        $referer = wp_get_referer();
        if (!is_string($referer) || $referer === '') {
            $referer = home_url('/');
        }
        wp_safe_redirect(add_query_arg('company_notice', rawurlencode($notice), $referer));
        exit;
    }
}
