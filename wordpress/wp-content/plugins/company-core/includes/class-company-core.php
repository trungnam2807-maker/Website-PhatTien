<?php
/**
 * Khởi tạo plugin chính.
 */

if (!defined('ABSPATH')) {
    exit;
}

class Company_Core
{
    public static function bootstrap(): void
    {
        add_action('init', [Company_Booking_Post_Type::class, 'register']);
        add_action('init', [self::class, 'register_service_post_type']);
        add_action('init', [self::class, 'register_head_store_post_type']);
        add_action('init', [self::class, 'register_shortcodes']);
        add_action('add_meta_boxes', [self::class, 'register_head_store_meta_boxes']);
        add_action('save_post_company_head_store', [self::class, 'save_head_store_meta']);

        Company_Lead_Api::register();
        Company_WooCommerce::register();
    }

    public static function activate(): void
    {
        self::create_tables();
        Company_Booking_Post_Type::register();
        self::register_service_post_type();
        self::register_head_store_post_type();
        flush_rewrite_rules();
    }

    public static function deactivate(): void
    {
        flush_rewrite_rules();
    }

    public static function register_service_post_type(): void
    {
        register_post_type(
            'service',
            [
                'label' => __('Dịch vụ', 'company-core'),
                'public' => true,
                'has_archive' => true,
                'show_in_rest' => true,
                'supports' => ['title', 'editor', 'excerpt', 'thumbnail'],
                'menu_icon' => 'dashicons-hammer',
                'rewrite' => ['slug' => 'services'],
            ]
        );
    }

    public static function register_head_store_post_type(): void
    {
        register_post_type(
            'company_head_store',
            [
                'label' => __('Hệ thống HEAD', 'company-core'),
                'public' => true,
                'has_archive' => true,
                'show_in_rest' => true,
                'supports' => ['title', 'editor', 'excerpt', 'thumbnail'],
                'menu_icon' => 'dashicons-store',
                'rewrite' => ['slug' => 'he-thong-head'],
            ]
        );
    }

    public static function register_shortcodes(): void
    {
        add_shortcode('company_voucher_popup', [self::class, 'render_voucher_popup']);
    }

    public static function register_head_store_meta_boxes(): void
    {
        add_meta_box(
            'company_head_store_info',
            __('Thông tin chi nhánh HEAD', 'company-core'),
            [self::class, 'render_head_store_meta_box'],
            'company_head_store',
            'normal',
            'high'
        );
    }

    public static function render_head_store_meta_box(WP_Post $post): void
    {
        wp_nonce_field('company_head_store_meta_action', 'company_head_store_meta_nonce');
        $address = (string) get_post_meta($post->ID, '_company_store_address', true);
        $phone = (string) get_post_meta($post->ID, '_company_store_phone', true);
        $hours = (string) get_post_meta($post->ID, '_company_store_hours', true);
        $mapEmbed = (string) get_post_meta($post->ID, '_company_store_map_embed', true);
        ?>
        <p>
            <label for="company_store_address"><strong><?php esc_html_e('Địa chỉ', 'company-core'); ?></strong></label><br>
            <input id="company_store_address" name="company_store_address" type="text" class="widefat" value="<?php echo esc_attr($address); ?>">
        </p>
        <p>
            <label for="company_store_phone"><strong><?php esc_html_e('Số điện thoại', 'company-core'); ?></strong></label><br>
            <input id="company_store_phone" name="company_store_phone" type="text" class="widefat" value="<?php echo esc_attr($phone); ?>">
        </p>
        <p>
            <label for="company_store_hours"><strong><?php esc_html_e('Giờ làm việc', 'company-core'); ?></strong></label><br>
            <input id="company_store_hours" name="company_store_hours" type="text" class="widefat" value="<?php echo esc_attr($hours); ?>">
        </p>
        <p>
            <label for="company_store_map_embed"><strong><?php esc_html_e('Mã nhúng bản đồ (iframe)', 'company-core'); ?></strong></label>
            <textarea id="company_store_map_embed" name="company_store_map_embed" class="widefat" rows="6"><?php echo esc_textarea($mapEmbed); ?></textarea>
        </p>
        <?php
    }

    public static function save_head_store_meta(int $postId): void
    {
        if (!isset($_POST['company_head_store_meta_nonce'])) {
            return;
        }

        $nonce = sanitize_text_field(wp_unslash($_POST['company_head_store_meta_nonce']));
        if (!wp_verify_nonce($nonce, 'company_head_store_meta_action')) {
            return;
        }

        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        if (!current_user_can('edit_post', $postId)) {
            return;
        }

        $address = sanitize_text_field((string) wp_unslash($_POST['company_store_address'] ?? ''));
        $phone = sanitize_text_field((string) wp_unslash($_POST['company_store_phone'] ?? ''));
        $hours = sanitize_text_field((string) wp_unslash($_POST['company_store_hours'] ?? ''));
        $mapEmbedRaw = (string) wp_unslash($_POST['company_store_map_embed'] ?? '');
        $mapEmbed = wp_kses($mapEmbedRaw, ['iframe' => ['src' => true, 'width' => true, 'height' => true, 'style' => true, 'allowfullscreen' => true, 'loading' => true, 'referrerpolicy' => true]]);

        update_post_meta($postId, '_company_store_address', $address);
        update_post_meta($postId, '_company_store_phone', $phone);
        update_post_meta($postId, '_company_store_hours', $hours);
        update_post_meta($postId, '_company_store_map_embed', $mapEmbed);
    }

    public static function render_voucher_popup(): string
    {
        ob_start();
        ?>
        <div class="company-modal" data-company-voucher-modal aria-hidden="true">
            <div class="company-modal__panel">
                <button type="button" data-company-voucher-close aria-label="<?php esc_attr_e('Đóng', 'company-core'); ?>">
                    ×
                </button>
                <h3><?php esc_html_e('Đăng ký nhận voucher', 'company-core'); ?></h3>
                <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                    <input type="hidden" name="action" value="company_claim_voucher">
                    <?php wp_nonce_field('company_claim_voucher_action', 'company_claim_voucher_nonce'); ?>
                    <div class="company-form-row">
                        <label for="company_name"><?php esc_html_e('Họ tên', 'company-core'); ?></label>
                        <input id="company_name" type="text" name="name" required>
                    </div>
                    <div class="company-form-row">
                        <label for="company_phone"><?php esc_html_e('Số điện thoại', 'company-core'); ?></label>
                        <input id="company_phone" type="tel" name="phone" required>
                    </div>
                    <div class="company-form-row">
                        <label for="company_email"><?php esc_html_e('Email (tùy chọn)', 'company-core'); ?></label>
                        <input id="company_email" type="email" name="email">
                    </div>
                    <div class="company-form-row">
                        <label>
                            <input type="checkbox" name="consent" value="1" required>
                            <?php esc_html_e('Tôi đồng ý cho phép lưu thông tin để nhận voucher.', 'company-core'); ?>
                        </label>
                    </div>
                    <button type="submit"><?php esc_html_e('Nhận mã voucher', 'company-core'); ?></button>
                    <p class="company-notice"><?php esc_html_e('Mã voucher sẽ được gửi qua Zalo OA.', 'company-core'); ?></p>
                </form>
            </div>
        </div>
        <?php
        return (string) ob_get_clean();
    }

    private static function create_tables(): void
    {
        global $wpdb;

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        $charsetCollate = $wpdb->get_charset_collate();
        $leadTable = $wpdb->prefix . 'company_leads';
        $voucherTable = $wpdb->prefix . 'company_vouchers';
        $voucherLogTable = $wpdb->prefix . 'company_voucher_logs';

        $sql = "
            CREATE TABLE {$leadTable} (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                name VARCHAR(120) NOT NULL,
                phone VARCHAR(30) NOT NULL,
                email VARCHAR(190) NULL,
                source VARCHAR(60) NOT NULL DEFAULT 'website',
                created_at DATETIME NOT NULL,
                PRIMARY KEY (id),
                KEY idx_phone (phone),
                KEY idx_created (created_at)
            ) {$charsetCollate};

            CREATE TABLE {$voucherTable} (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                phone VARCHAR(30) NOT NULL,
                voucher_code VARCHAR(50) NOT NULL,
                expires_at DATETIME NOT NULL,
                zalo_status VARCHAR(30) NOT NULL DEFAULT 'pending',
                created_at DATETIME NOT NULL,
                PRIMARY KEY (id),
                UNIQUE KEY uniq_phone (phone),
                UNIQUE KEY uniq_voucher_code (voucher_code)
            ) {$charsetCollate};

            CREATE TABLE {$voucherLogTable} (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                voucher_code VARCHAR(50) NOT NULL,
                provider VARCHAR(30) NOT NULL,
                request_payload LONGTEXT NULL,
                response_payload LONGTEXT NULL,
                status VARCHAR(30) NOT NULL,
                created_at DATETIME NOT NULL,
                PRIMARY KEY (id),
                KEY idx_voucher_code (voucher_code)
            ) {$charsetCollate};
        ";

        dbDelta($sql);
    }
}
