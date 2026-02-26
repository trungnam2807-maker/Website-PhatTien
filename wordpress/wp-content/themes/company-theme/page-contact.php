<?php
/**
 * Mẫu trang liên hệ.
 *
 * @package company-theme
 */

get_header();
?>
<section class="card">
    <h1><?php the_title(); ?></h1>
    <div><?php the_content(); ?></div>
    <?php echo do_shortcode('[company_lead_form]'); ?>
</section>
<?php
get_footer();
