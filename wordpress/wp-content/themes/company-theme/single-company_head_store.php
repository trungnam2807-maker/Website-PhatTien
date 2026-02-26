<?php
/**
 * Mẫu chi tiết chi nhánh HEAD.
 *
 * @package company-theme
 */

get_header();
?>
<article class="card">
    <?php while (have_posts()) : the_post(); ?>
        <?php
        $address = (string) get_post_meta(get_the_ID(), '_company_store_address', true);
        $phone = (string) get_post_meta(get_the_ID(), '_company_store_phone', true);
        $hours = (string) get_post_meta(get_the_ID(), '_company_store_hours', true);
        $mapEmbed = (string) get_post_meta(get_the_ID(), '_company_store_map_embed', true);
        ?>
        <h1><?php the_title(); ?></h1>
        <p><strong><?php esc_html_e('Địa chỉ:', 'company-theme'); ?></strong> <?php echo esc_html($address); ?></p>
        <p><strong><?php esc_html_e('Điện thoại:', 'company-theme'); ?></strong> <?php echo esc_html($phone); ?></p>
        <p><strong><?php esc_html_e('Giờ làm việc:', 'company-theme'); ?></strong> <?php echo esc_html($hours); ?></p>

        <div><?php the_content(); ?></div>

        <?php if ($mapEmbed !== '') : ?>
            <section class="store-map">
                <h2><?php esc_html_e('Bản đồ chi nhánh', 'company-theme'); ?></h2>
                <div class="store-map__frame">
                    <?php echo wp_kses($mapEmbed, ['iframe' => ['src' => true, 'width' => true, 'height' => true, 'style' => true, 'allowfullscreen' => true, 'loading' => true, 'referrerpolicy' => true]]); ?>
                </div>
            </section>
        <?php endif; ?>

        <p class="section-actions">
            <a class="button" href="<?php echo esc_url(home_url('/contact')); ?>">
                <?php esc_html_e('Liên hệ tư vấn tại chi nhánh này', 'company-theme'); ?>
            </a>
        </p>
    <?php endwhile; ?>
</article>
<?php
get_footer();
