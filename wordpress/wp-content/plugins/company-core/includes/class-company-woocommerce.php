<?php
/**
 * Tùy biến WooCommerce.
 */

if (!defined('ABSPATH')) {
    exit;
}

class Company_WooCommerce
{
    public static function register(): void
    {
        add_action('after_setup_theme', [self::class, 'enable_theme_support']);
        add_filter('woocommerce_checkout_fields', [self::class, 'customize_checkout_fields']);
        add_action('woocommerce_checkout_update_order_meta', [self::class, 'save_source_meta']);
    }

    public static function enable_theme_support(): void
    {
        add_theme_support('woocommerce');
        add_theme_support('wc-product-gallery-zoom');
        add_theme_support('wc-product-gallery-lightbox');
        add_theme_support('wc-product-gallery-slider');
    }

    public static function customize_checkout_fields(array $fields): array
    {
        $fields['billing']['billing_phone']['required'] = true;
        $fields['billing']['billing_company']['required'] = false;
        $fields['order']['order_comments']['placeholder'] = __('Ghi chú thêm cho đơn hàng', 'company-core');

        return $fields;
    }

    public static function save_source_meta(int $orderId): void
    {
        if (!isset($_COOKIE['utm_source'])) {
            return;
        }

        $source = sanitize_text_field(wp_unslash($_COOKIE['utm_source']));
        if ($source !== '') {
            update_post_meta($orderId, '_company_order_utm_source', $source);
        }
    }
}
