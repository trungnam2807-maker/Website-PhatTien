<?php
/**
 * Mẫu trang chủ.
 *
 * @package company-theme
 */

get_header();
?>
<section class="hero">
    <div class="card">
        <h1><?php bloginfo('name'); ?></h1>
        <p><?php echo esc_html(get_bloginfo('description')); ?></p>
        <p>
            <a class="button" href="<?php echo esc_url(home_url('/contact')); ?>">
                <?php esc_html_e('Nhận tư vấn', 'company-theme'); ?>
            </a>
        </p>
    </div>
    <div
        class="hero-banner"
        data-company-voucher-trigger="hero"
        role="button"
        tabindex="0"
        aria-label="<?php esc_attr_e('Mở popup voucher', 'company-theme'); ?>"
    >
        <?php if (has_post_thumbnail()) : ?>
            <?php the_post_thumbnail('large', ['loading' => 'lazy']); ?>
        <?php else : ?>
            <div class="card">
                <strong><?php esc_html_e('Nhận voucher ưu đãi', 'company-theme'); ?></strong>
                <p><?php esc_html_e('Bấm vào đây để mở popup đăng ký.', 'company-theme'); ?></p>
            </div>
        <?php endif; ?>
    </div>
</section>

<section class="card">
    <h2><?php esc_html_e('Dòng xe nổi bật', 'company-theme'); ?></h2>
    <p><?php esc_html_e('Khám phá các mẫu xe Honda chính hãng đang được quan tâm tại Head Honda Phát Tiến.', 'company-theme'); ?></p>
    <div class="quick-links">
        <?php
        $productCategories = get_terms(
            [
                'taxonomy' => 'product_cat',
                'hide_empty' => true,
                'number' => 4,
            ]
        );
        if (!is_wp_error($productCategories) && !empty($productCategories)) :
            foreach ($productCategories as $category) :
                $categoryLink = get_term_link($category);
                if (is_wp_error($categoryLink)) {
                    continue;
                }
                ?>
                <a class="chip-link" href="<?php echo esc_url($categoryLink); ?>">
                    <?php echo esc_html($category->name); ?>
                </a>
                <?php
            endforeach;
        endif;
        ?>
    </div>
    <div class="grid products">
        <?php
        $featuredProducts = new WP_Query(
            [
                'post_type' => 'product',
                'posts_per_page' => 8,
                'post_status' => 'publish',
            ]
        );
        if ($featuredProducts->have_posts()) :
            while ($featuredProducts->have_posts()) :
                $featuredProducts->the_post();
                $priceHtml = '';
                if (function_exists('wc_get_product')) {
                    $wcProduct = wc_get_product(get_the_ID());
                    if ($wcProduct) {
                        $priceHtml = $wcProduct->get_price_html();
                    }
                }
                ?>
                <article class="product-card">
                    <a href="<?php the_permalink(); ?>">
                        <?php if (has_post_thumbnail()) : ?>
                            <?php the_post_thumbnail('medium', ['loading' => 'lazy']); ?>
                        <?php endif; ?>
                        <h3><?php the_title(); ?></h3>
                    </a>
                    <p class="company-notice"><?php echo wp_kses_post($priceHtml); ?></p>
                    <a class="button" href="<?php the_permalink(); ?>">
                        <?php esc_html_e('Xem chi tiết', 'company-theme'); ?>
                    </a>
                </article>
                <?php
            endwhile;
            wp_reset_postdata();
        else :
            ?>
            <p><?php esc_html_e('Chưa có sản phẩm. Hãy thêm sản phẩm trong WooCommerce.', 'company-theme'); ?></p>
        <?php endif; ?>
    </div>
    <p class="section-actions">
        <a class="button" href="<?php echo esc_url(home_url('/shop')); ?>">
            <?php esc_html_e('Xem tất cả sản phẩm', 'company-theme'); ?>
        </a>
    </p>
</section>

<section class="card">
    <h2><?php esc_html_e('Dịch vụ nổi bật', 'company-theme'); ?></h2>
    <div class="grid services">
        <?php
        $services = new WP_Query(
            [
                'post_type' => 'service',
                'posts_per_page' => 6,
                'post_status' => 'publish',
            ]
        );
        if ($services->have_posts()) :
            while ($services->have_posts()) :
                $services->the_post();
                ?>
                <article>
                    <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                    <p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 20)); ?></p>
                </article>
                <?php
            endwhile;
            wp_reset_postdata();
        else :
            ?>
            <p><?php esc_html_e('Chưa có dịch vụ. Bạn có thể thêm trong khu vực quản trị WordPress.', 'company-theme'); ?></p>
        <?php endif; ?>
    </div>
</section>

<section class="card">
    <h2><?php esc_html_e('Hệ thống HEAD tại TP.HCM', 'company-theme'); ?></h2>
    <p><?php esc_html_e('Tìm chi nhánh gần bạn để được tư vấn mua xe, bảo dưỡng và hỗ trợ tài chính nhanh chóng.', 'company-theme'); ?></p>
    <div class="grid stores">
        <?php
        $headStores = new WP_Query(
            [
                'post_type' => 'company_head_store',
                'posts_per_page' => 6,
                'post_status' => 'publish',
            ]
        );
        if ($headStores->have_posts()) :
            while ($headStores->have_posts()) :
                $headStores->the_post();
                $storeAddress = (string) get_post_meta(get_the_ID(), '_company_store_address', true);
                $storePhone = (string) get_post_meta(get_the_ID(), '_company_store_phone', true);
                ?>
                <article>
                    <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                    <p><?php echo esc_html($storeAddress); ?></p>
                    <p class="company-notice"><?php echo esc_html($storePhone); ?></p>
                </article>
                <?php
            endwhile;
            wp_reset_postdata();
        else :
            ?>
            <p><?php esc_html_e('Chưa có dữ liệu chi nhánh HEAD. Bạn có thể thêm trong khu vực quản trị.', 'company-theme'); ?></p>
        <?php endif; ?>
    </div>
    <p class="section-actions">
        <a class="button" href="<?php echo esc_url(get_post_type_archive_link('company_head_store') ?: home_url('/he-thong-head')); ?>">
            <?php esc_html_e('Xem toàn bộ hệ thống HEAD', 'company-theme'); ?>
        </a>
    </p>
</section>

<section class="card">
    <h2><?php esc_html_e('Tin mới', 'company-theme'); ?></h2>
    <div class="grid posts">
        <?php
        $latest_posts = new WP_Query(
            [
                'post_type' => 'post',
                'posts_per_page' => 4,
                'post_status' => 'publish',
            ]
        );
        if ($latest_posts->have_posts()) :
            while ($latest_posts->have_posts()) :
                $latest_posts->the_post();
                ?>
                <article>
                    <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                    <p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 26)); ?></p>
                </article>
                <?php
            endwhile;
            wp_reset_postdata();
        else :
            ?>
            <p><?php esc_html_e('Chưa có bài viết.', 'company-theme'); ?></p>
        <?php endif; ?>
    </div>
</section>

<section class="card cta-section">
    <h2><?php esc_html_e('Bạn cần tư vấn chọn xe?', 'company-theme'); ?></h2>
    <p><?php esc_html_e('Đội ngũ Head Honda Phát Tiến sẽ liên hệ nhanh để báo giá và tư vấn dòng xe phù hợp nhu cầu của bạn.', 'company-theme'); ?></p>
    <div class="quick-links">
        <a class="button" href="<?php echo esc_url(home_url('/contact')); ?>"><?php esc_html_e('Nhận tư vấn ngay', 'company-theme'); ?></a>
        <a class="button button-outline" href="<?php echo esc_url(home_url('/booking')); ?>"><?php esc_html_e('Đặt lịch xem xe', 'company-theme'); ?></a>
    </div>
</section>

<?php echo do_shortcode('[company_voucher_popup]'); ?>
<?php
get_footer();
