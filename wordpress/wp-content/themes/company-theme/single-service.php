<?php
/**
 * Mẫu chi tiết dịch vụ.
 *
 * @package company-theme
 */

get_header();
?>
<article class="card">
    <?php while (have_posts()) : the_post(); ?>
        <h1><?php the_title(); ?></h1>
        <div><?php the_content(); ?></div>
        <p>
            <a class="button" href="<?php echo esc_url(home_url('/contact')); ?>">
                <?php esc_html_e('Nhận báo giá', 'company-theme'); ?>
            </a>
        </p>
    <?php endwhile; ?>
</article>
<?php
get_footer();
