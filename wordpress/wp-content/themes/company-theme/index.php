<?php
/**
 * Mẫu dự phòng cho index.
 *
 * @package company-theme
 */

get_header();
?>
<div class="card">
    <?php if (have_posts()) : ?>
        <?php while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                <?php the_excerpt(); ?>
            </article>
            <hr>
        <?php endwhile; ?>
        <?php the_posts_pagination(); ?>
    <?php else : ?>
        <p><?php esc_html_e('Không tìm thấy nội dung.', 'company-theme'); ?></p>
    <?php endif; ?>
</div>
<?php
get_footer();
