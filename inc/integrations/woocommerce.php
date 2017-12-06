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

// remove the title from woocommerce_single_product_summary because we are calling it a few lines before
remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_title', 5);

// remove the breadcrumb from woocommerce_before_main_content because we are calling it after title
remove_action('woocommerce_before_main_content', 'woocommerce_breadcrumb', 20);

// remove rating from woocommerce_single_product_summary, it doesn't apply on our design.
// if you really need this, override this file with a child theme
remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_rating', 10 );

remove_action('woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10 );
