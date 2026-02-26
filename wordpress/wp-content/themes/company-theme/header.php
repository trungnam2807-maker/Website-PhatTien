<?php
/**
 * Mẫu phần đầu trang.
 *
 * @package company-theme
 */

?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="site-header">
    <div class="container header-inner">
        <a class="site-logo" href="<?php echo esc_url(home_url('/')); ?>">
            <?php bloginfo('name'); ?>
        </a>
        <nav class="main-nav" aria-label="<?php esc_attr_e('Menu chính', 'company-theme'); ?>">
            <?php
            wp_nav_menu(
                [
                    'theme_location' => 'primary',
                    'container' => false,
                    'fallback_cb' => false,
                ]
            );
            ?>
        </nav>
    </div>
</header>
<main class="site-main">
    <div class="container">
