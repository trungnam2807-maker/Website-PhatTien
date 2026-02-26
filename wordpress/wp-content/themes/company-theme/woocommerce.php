<?php
/**
 * Mẫu bao cho WooCommerce.
 *
 * @package company-theme
 */

get_header();
?>
<section class="card">
    <?php woocommerce_content(); ?>
</section>
<?php
get_footer();
