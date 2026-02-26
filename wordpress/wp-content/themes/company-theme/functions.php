<?php
/**
 * Khởi tạo theme Company.
 *
 * @package company-theme
 */

if (!defined('ABSPATH')) {
    exit;
}

function company_theme_setup(): void
{
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption']);
    add_theme_support('woocommerce');

    register_nav_menus(
        [
            'primary' => __('Menu chính', 'company-theme'),
            'footer' => __('Menu chân trang', 'company-theme'),
        ]
    );
}
add_action('after_setup_theme', 'company_theme_setup');

function company_theme_enqueue_assets(): void
{
    wp_enqueue_style(
        'company-theme-style',
        get_stylesheet_uri(),
        [],
        wp_get_theme()->get('Version')
    );

    wp_enqueue_script(
        'company-theme-main',
        get_template_directory_uri() . '/assets/js/main.js',
        [],
        wp_get_theme()->get('Version'),
        true
    );

    wp_localize_script(
        'company-theme-main',
        'companyTheme',
        [
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('company_ajax_nonce'),
        ]
    );
}
add_action('wp_enqueue_scripts', 'company_theme_enqueue_assets');

function company_theme_widgets_init(): void
{
    register_sidebar(
        [
            'name' => __('Thanh bên', 'company-theme'),
            'id' => 'company-sidebar',
            'description' => __('Khu vực thanh bên chính', 'company-theme'),
            'before_widget' => '<section class="card widget %2$s" id="%1$s">',
            'after_widget' => '</section>',
            'before_title' => '<h3>',
            'after_title' => '</h3>',
        ]
    );
}
add_action('widgets_init', 'company_theme_widgets_init');
