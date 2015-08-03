<?php
/**
 * In this file we will put every function or hook which is needed to provide woocommerce compatibility
 */

/**
 * First remove the woocommerce style. We'll provide one.
 */
add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );

remove_action( 'woocommerce_after_shop_loop', 'woocommerce_pagination', 10 );

function timber_woocommerce_remove_tabs_header_desc( $desc ){
	return '';
}

add_filter('woocommerce_product_description_heading', 'timber_woocommerce_remove_tabs_header_desc', 11);