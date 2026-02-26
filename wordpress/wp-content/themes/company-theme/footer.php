<?php
/**
 * Mẫu phần chân trang.
 *
 * @package company-theme
 */

?>
    </div>
</main>
<footer class="site-footer">
    <div class="container footer-inner">
        <div>
            <strong><?php bloginfo('name'); ?></strong>
            <div><?php echo esc_html(get_bloginfo('description')); ?></div>
        </div>
        <nav aria-label="<?php esc_attr_e('Menu chân trang', 'company-theme'); ?>">
            <?php
            wp_nav_menu(
                [
                    'theme_location' => 'footer',
                    'container' => false,
                    'fallback_cb' => false,
                ]
            );
            ?>
        </nav>
    </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
