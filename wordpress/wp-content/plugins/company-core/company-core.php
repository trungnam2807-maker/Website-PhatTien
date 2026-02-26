<?php
/**
 * Plugin Name: Company Core
 * Description: Plugin nghiệp vụ lõi cho thu lead, đặt lịch, sinh voucher, gửi Zalo và tùy biến WooCommerce.
 * Version: 1.0.0
 * Requires at least: 6.2
 * Requires PHP: 8.0
 * Author: Project Delivery Pack
 * Text Domain: company-core
 */

if (!defined('ABSPATH')) {
    exit;
}

define('COMPANY_CORE_VERSION', '1.0.0');
define('COMPANY_CORE_PATH', plugin_dir_path(__FILE__));
define('COMPANY_CORE_URL', plugin_dir_url(__FILE__));

require_once COMPANY_CORE_PATH . 'includes/class-company-voucher-service.php';
require_once COMPANY_CORE_PATH . 'includes/class-company-zalo-client.php';
require_once COMPANY_CORE_PATH . 'includes/class-company-lead-api.php';
require_once COMPANY_CORE_PATH . 'includes/class-company-booking-post-type.php';
require_once COMPANY_CORE_PATH . 'includes/class-company-woocommerce.php';
require_once COMPANY_CORE_PATH . 'includes/class-company-core.php';

register_activation_hook(__FILE__, ['Company_Core', 'activate']);
register_deactivation_hook(__FILE__, ['Company_Core', 'deactivate']);

Company_Core::bootstrap();
