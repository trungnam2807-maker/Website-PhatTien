<?php
/**
 * Dịch vụ xử lý voucher.
 */

if (!defined('ABSPATH')) {
    exit;
}

class Company_Voucher_Service
{
    public static function generate_code(): string
    {
        return sprintf('VC-%s-%s', gmdate('Ymd'), strtoupper(wp_generate_password(6, false, false)));
    }

    public static function expiry_datetime(): string
    {
        $days = (int) apply_filters('company_voucher_expiry_days', (int) (defined('COMPANY_VOUCHER_EXPIRY_DAYS') ? COMPANY_VOUCHER_EXPIRY_DAYS : 7));
        return gmdate('Y-m-d H:i:s', strtotime("+{$days} days"));
    }

    public static function upsert_for_phone(string $phone): array
    {
        global $wpdb;

        $table = $wpdb->prefix . 'company_vouchers';
        $existing = $wpdb->get_row(
            $wpdb->prepare("SELECT * FROM {$table} WHERE phone = %s LIMIT 1", $phone),
            ARRAY_A
        );

        if (is_array($existing) && !empty($existing['voucher_code'])) {
            return $existing;
        }

        $code = self::generate_code();
        $expiresAt = self::expiry_datetime();
        $wpdb->insert(
            $table,
            [
                'phone' => $phone,
                'voucher_code' => $code,
                'expires_at' => $expiresAt,
                'zalo_status' => 'pending',
                'created_at' => current_time('mysql', true),
            ],
            ['%s', '%s', '%s', '%s', '%s']
        );

        return [
            'phone' => $phone,
            'voucher_code' => $code,
            'expires_at' => $expiresAt,
            'zalo_status' => 'pending',
        ];
    }

    public static function update_delivery_status(string $voucherCode, string $status): void
    {
        global $wpdb;
        $table = $wpdb->prefix . 'company_vouchers';
        $wpdb->update(
            $table,
            ['zalo_status' => $status],
            ['voucher_code' => $voucherCode],
            ['%s'],
            ['%s']
        );
    }
}
