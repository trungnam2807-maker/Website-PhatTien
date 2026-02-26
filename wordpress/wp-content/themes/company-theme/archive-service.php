<?php
/**
 * Mẫu lưu trữ dịch vụ.
 *
 * @package company-theme
 */

get_header();
?>
<section class="card">
    <h1><?php esc_html_e('Dịch vụ', 'company-theme'); ?></h1>
    <?php if (have_posts()) : ?>
        <div class="grid services">
            <?php while (have_posts()) : the_post(); ?>
                <article>
                    <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                    <p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 22)); ?></p>
                </article>
            <?php endwhile; ?>
        </div>
        <?php the_posts_pagination(); ?>
    <?php else : ?>
        <p><?php esc_html_e('Hiện chưa có dịch vụ.', 'company-theme'); ?></p>
    <?php endif; ?>
</section>
<?php
get_footer();
