<?php
/**
 * Mẫu danh sách hệ thống HEAD.
 *
 * @package company-theme
 */

get_header();
?>
<section class="card">
    <h1><?php esc_html_e('Hệ thống HEAD Honda Phát Tiến', 'company-theme'); ?></h1>
    <p><?php esc_html_e('Danh sách chi nhánh hỗ trợ mua xe, bảo dưỡng và các dịch vụ hậu mãi.', 'company-theme'); ?></p>

    <?php if (have_posts()) : ?>
        <div class="grid stores">
            <?php while (have_posts()) : the_post(); ?>
                <?php
                $address = (string) get_post_meta(get_the_ID(), '_company_store_address', true);
                $phone = (string) get_post_meta(get_the_ID(), '_company_store_phone', true);
                $hours = (string) get_post_meta(get_the_ID(), '_company_store_hours', true);
                ?>
                <article class="store-card">
                    <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                    <p><strong><?php esc_html_e('Địa chỉ:', 'company-theme'); ?></strong> <?php echo esc_html($address); ?></p>
                    <p><strong><?php esc_html_e('Điện thoại:', 'company-theme'); ?></strong> <?php echo esc_html($phone); ?></p>
                    <p><strong><?php esc_html_e('Giờ làm việc:', 'company-theme'); ?></strong> <?php echo esc_html($hours); ?></p>
                    <a class="button" href="<?php the_permalink(); ?>"><?php esc_html_e('Xem chi tiết chi nhánh', 'company-theme'); ?></a>
                </article>
            <?php endwhile; ?>
        </div>
        <?php the_posts_pagination(); ?>
    <?php else : ?>
        <p><?php esc_html_e('Chưa có dữ liệu chi nhánh.', 'company-theme'); ?></p>
    <?php endif; ?>
</section>
<?php
get_footer();
