<?php
/**
 * Mẫu trang lưu trữ.
 *
 * @package company-theme
 */

get_header();
?>
<section class="card">
    <h1><?php the_archive_title(); ?></h1>
    <p><?php the_archive_description(); ?></p>
    <?php if (have_posts()) : ?>
        <div class="grid posts">
            <?php while (have_posts()) : the_post(); ?>
                <article>
                    <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                    <p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 24)); ?></p>
                </article>
            <?php endwhile; ?>
        </div>
        <?php the_posts_pagination(); ?>
    <?php else : ?>
        <p><?php esc_html_e('Không có mục lưu trữ nào.', 'company-theme'); ?></p>
    <?php endif; ?>
</section>
<?php
get_footer();
