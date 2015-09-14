<?php
/**
 * In this file we will put every function or hook which is needed to provide woocommerce compatibility
 */

/**
 * First remove the woocommerce style. We'll provide one.
 */
add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );

remove_action( 'woocommerce_after_shop_loop', 'woocommerce_pagination', 10 );

remove_action('woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30);

function timber_woocommerce_remove_tabs_header_desc( $desc ){
	return '';
}
add_filter('woocommerce_product_description_heading', 'timber_woocommerce_remove_tabs_header_desc', 11);

function timber_add_counter_on_shop() {

	if ( ! is_archive() ) {
		return;
	}

	$shop_page_display = get_option('woocommerce_shop_page_display');
	if ( $shop_page_display !== 'subcategories' ) { ?>
		<div class="site-footer">
			<div class="bar--fixed">
				<div class="site-info">
					<div class="portfolio__position"></div>
				</div><!-- .site-info -->
			</div>
		</div>
	<?php }

}

add_action( 'woocommerce_after_main_content', 'timber_add_counter_on_shop' );