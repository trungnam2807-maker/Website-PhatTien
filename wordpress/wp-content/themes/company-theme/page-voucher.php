<?php
/**
 * Mẫu landing voucher.
 *
 * @package company-theme
 */

get_header();
?>
<section class="hero">
    <div class="card">
        <h1><?php the_title(); ?></h1>
        <div><?php the_content(); ?></div>
        <button type="button" data-company-voucher-trigger="landing">
            <?php esc_html_e('Đăng ký nhận voucher ngay', 'company-theme'); ?>
        </button>
    </div>
    <div class="card hero-banner" data-company-voucher-trigger="banner" role="button" tabindex="0">
        <h2><?php esc_html_e('Nhận ưu đãi doanh nghiệp', 'company-theme'); ?></h2>
        <p><?php esc_html_e('Bấm vào banner để mở popup và nhận mã qua Zalo.', 'company-theme'); ?></p>
    </div>
</section>

<?php echo do_shortcode('[company_voucher_popup]'); ?>
<?php
get_footer();
