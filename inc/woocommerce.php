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

function timber_add_categories_on_shop() {

	if ( ! is_archive() ) {
		return;
	}

	$shop_page_display = get_option('woocommerce_shop_page_display');
	if ( $shop_page_display !== 'subcategories' ) { ?>
		<div class="site-footer">
			<div class="bar--fixed">
				<?php
				global $wp_query;

				// get all product categories
				$terms = get_terms('product_cat');

				// if there is a category queried cache it
				$current_term =	get_queried_object();

				if ( !empty( $terms ) /*&& wpgrade::option('display_product_filters', '0')*/ ) {
					// create a link which should link to the shop
					$all_link = get_post_type_archive_link('product');

					echo '<ul class="filter  filter--shop">';
					// display the shop link first if there is one
					if ( ! empty( $all_link ) ) {
						// also if the current_term doesn't have a term_id it means we are quering the shop and the "all categories" should be active
						echo '<li class="filter__item active" data-filter="*">' . __( 'All', 'timber' ) . '</li>';
					}

					// display a link for each product category
					foreach ($terms as $key => $term ) {
						echo '<li class="filter__item" data-filter=".product_cat-' . $term->slug . '">' . $term->name . '</li>';
					}
					echo '</ul>';
				} // close if !empty($terms)
				?>
			</div>
		</div>
	<?php }

}

add_action( 'woocommerce_after_main_content', 'timber_add_categories_on_shop' );