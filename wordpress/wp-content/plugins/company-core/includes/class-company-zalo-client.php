<?php
/**
 * Client API Zalo OA.
 */

if (!defined('ABSPATH')) {
    exit;
}

class Company_Zalo_Client
{
    public static function send_voucher(string $phone, string $voucherCode, string $expiresAt): array
    {
        $apiUrl = self::api_url();
        $token = self::access_token();

        if ($apiUrl === '' || $token === '') {
            return [
                'success' => false,
                'error' => 'Thiếu cấu hình API Zalo',
                'response' => null,
            ];
        }

        $payload = [
            'recipient' => ['user_id_by_phone' => $phone],
            'message' => [
                'text' => sprintf(
                    'Mã voucher của bạn: %s. Hạn sử dụng đến %s.',
                    $voucherCode,
                    gmdate('d/m/Y', strtotime($expiresAt))
                ),
            ],
        ];

        $response = wp_remote_post(
            $apiUrl,
            [
                'timeout' => 20,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'access_token' => $token,
                ],
                'body' => wp_json_encode($payload),
            ]
        );

        if (is_wp_error($response)) {
            return [
                'success' => false,
                'error' => $response->get_error_message(),
                'response' => null,
            ];
        }

        $code = (int) wp_remote_retrieve_response_code($response);
        $body = (string) wp_remote_retrieve_body($response);

        return [
            'success' => $code >= 200 && $code < 300,
            'error' => $code >= 200 && $code < 300 ? '' : "HTTP {$code}",
            'response' => $body,
            'request_payload' => wp_json_encode($payload),
        ];
    }

    private static function api_url(): string
    {
        $env = defined('COMPANY_ZALO_API_URL') ? COMPANY_ZALO_API_URL : '';
        return apply_filters('company_zalo_api_url', (string) $env);
    }

    private static function access_token(): string
    {
        $env = defined('COMPANY_ZALO_ACCESS_TOKEN') ? COMPANY_ZALO_ACCESS_TOKEN : '';
        return apply_filters('company_zalo_access_token', (string) $env);
    }
}
