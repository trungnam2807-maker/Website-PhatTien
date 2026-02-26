<?php
/**
 * Plugin Name: Company Hardening
 * Description: Tăng cường bảo mật và hiệu năng cơ bản cho môi trường vận hành thật.
 */

if (!defined('ABSPATH')) {
    exit;
}

// Tắt XML-RPC để giảm nguy cơ brute-force và lạm dụng pingback.
add_filter('xmlrpc_enabled', '__return_false');

// Ẩn phiên bản WordPress ở phía frontend.
remove_action('wp_head', 'wp_generator');

// Thiết lập một số security header cơ bản.
add_action('send_headers', static function (): void {
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');
    header('Referrer-Policy: strict-origin-when-cross-origin');
});

// Bỏ query string ở static asset để tăng hiệu quả cache trên một số CDN.
add_filter('script_loader_src', static function (string $src): string {
    return remove_query_arg('ver', $src);
}, 15);

add_filter('style_loader_src', static function (string $src): string {
    return remove_query_arg('ver', $src);
}, 15);
