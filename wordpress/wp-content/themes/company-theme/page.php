<?php
/**
 * Mẫu trang tiêu chuẩn.
 *
 * @package company-theme
 */

get_header();
?>
<article class="card">
    <?php while (have_posts()) : the_post(); ?>
        <h1><?php the_title(); ?></h1>
        <div><?php the_content(); ?></div>
    <?php endwhile; ?>
</article>
<?php
get_footer();
