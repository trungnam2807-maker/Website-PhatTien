<?php
/**
 * Mẫu bài viết chi tiết.
 *
 * @package company-theme
 */

get_header();
?>
<article class="card">
    <?php while (have_posts()) : the_post(); ?>
        <h1><?php the_title(); ?></h1>
        <p class="company-notice">
            <?php echo esc_html(get_the_date()); ?> · <?php the_author(); ?>
        </p>
        <div><?php the_content(); ?></div>
    <?php endwhile; ?>
</article>
<?php
get_footer();
