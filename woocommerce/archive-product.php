<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive.
 *
 * Override this template by copying it to yourtheme/woocommerce/archive-product.php
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

get_header('shop'); ?>
	<?php
		/**
		 * woocommerce_before_main_content hook
		 *
		 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
		 * @hooked woocommerce_breadcrumb - 20
		 */
		do_action( 'woocommerce_before_main_content' );
	?>
		<div class="site-header  site-header--placeholder"></div>
		<div class="site-container  site-content  shop">

		<?php if ( apply_filters( 'woocommerce_show_page_title', true ) ) : ?>

		<?php endif; ?>

		<?php //do_action( 'woocommerce_archive_description' ); ?>

		<?php if ( have_posts() ) : ?>
			<?php
				/**
				 * woocommerce_before_shop_loop hook
				 *
				 * @hooked woocommerce_result_count - 20
				 * @hooked woocommerce_catalog_ordering - 30
				 */
				get_template_part('woocommerce/loop/orderby');
				do_action( 'woocommerce_before_shop_loop' );
			?>

			<?php woocommerce_product_loop_start(); ?>

				<?php woocommerce_product_subcategories(); ?>

				<?php while ( have_posts() ) : the_post(); ?>

					<?php wc_get_template_part( 'content', 'product' ); ?>

				<?php endwhile; // end of the loop. ?>

			<?php woocommerce_product_loop_end(); ?>

			<?php
				/**
				 * woocommerce_after_shop_loop hook
				 *
				 * @hooked woocommerce_pagination - 10
				 */
				do_action( 'woocommerce_after_shop_loop' );
			?>
		<?php elseif ( ! woocommerce_product_subcategories( array( 'before' => woocommerce_product_loop_start( false ), 'after' => woocommerce_product_loop_end( false ) ) ) ) : ?>

			<?php wc_get_template( 'loop/no-products-found.php' ); ?>

		<?php endif; ?>

		</div><!-- .site-container  .site-content  .shop -->

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
					if ( !empty($all_link) ) {
						// also if the current_term doesn't have a term_id it means we are quering the shop and the "all categories" should be active
						echo '<li class="filter__item active" data-filter="*">' . _e( 'All', 'timber' ) . '</li>';
					}

					// display a link for each product category
					foreach ($terms as $key => $term ) {
						echo '<li class="filter__item" data-filter=".category-' . $term->slug . '">' . $term->name . '</li>';
					}
					echo '</ul>';
				} // close if !empty($terms)
				?>
			</div>
		</div>
	<?php
		/**
		 * woocommerce_after_main_content hook
		 *
		 * @hooked woocommerce_output_content_wrapper_end - 10 (outputs closing divs for the content)
		 */
		do_action( 'woocommerce_after_main_content' );
	?>

<?php get_footer( 'shop' ); ?>