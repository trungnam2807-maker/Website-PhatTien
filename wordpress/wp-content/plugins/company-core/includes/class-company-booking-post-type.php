<?php
/**
 * Đăng ký post type đặt lịch.
 */

if (!defined('ABSPATH')) {
    exit;
}

class Company_Booking_Post_Type
{
    public static function register(): void
    {
        register_post_type(
            'company_booking',
            [
                'label' => __('Yêu cầu đặt lịch', 'company-core'),
                'public' => false,
                'show_ui' => true,
                'show_in_menu' => true,
                'supports' => ['title', 'editor'],
                'menu_icon' => 'dashicons-calendar',
                'capability_type' => 'post',
                'map_meta_cap' => true,
            ]
        );
    }
}
