<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/archive-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see 	    https://docs.woocommerce.com/document/template-structure/
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     3.3.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header( 'shop' );

/**
 * Hook: woocommerce_before_main_content.
 *
 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
 * @hooked woocommerce_breadcrumb - 20
 * @hooked WC_Structured_Data::generate_website_data() - 30
 */
do_action( 'woocommerce_before_main_content' );

?>
		<div class="site-header  site-header--placeholder"></div>
		<div class="site-content  site-container  shop">

		<?php if ( apply_filters( 'woocommerce_show_page_title', true ) ) : ?>

		<?php endif; ?>

		<?php
		/**
		 * Hook: woocommerce_archive_description.
		 *
		 * @hooked woocommerce_taxonomy_archive_description - 10
		 * @hooked woocommerce_product_archive_description - 10
		 */
		do_action( 'woocommerce_archive_description' );
		?>

		<?php if ( have_posts() ) {

				/**
				 * woocommerce_before_shop_loop hook
				 *
				 * @hooked woocommerce_result_count - 20
				 * @hooked woocommerce_catalog_ordering - 30
				 */
				do_action( 'woocommerce_before_shop_loop' );

				$data = 'data-post_type="product"';

				$this_tax = get_query_var( 'taxonomy' );

				if ( ! empty( $this_tax ) ) {
					$data .= ' data-taxonomy="' . $this_tax . '"';
				}

				$this_term = get_query_var( 'term' );

				if ( ! empty( $this_term ) ) {
					$data .= ' data-term_id="' . get_queried_object()->term_id . '"';
				}

			global $wp_query;
			if ( isset( $wp_query->post_count ) ) {
				$data .= ' data-offset="' . $wp_query->post_count . '"';
			}

			if ( isset( $wp_query->found_posts ) ) {
				$data .= ' data-totalposts="' . $wp_query->found_posts . '"';
			} ?>
			<div class="site-sidebar  site-sidebar--archive  site-sidebar--shop">
				<div class="site-sidebar__content  site-sidebar__text"><?php _e( 'Shop', 'timber' ); ?></div>
			</div>

			<div class="portfolio  entry-content  product-list  js-product-list" <?php echo $data; ?>>

				<?php woocommerce_product_subcategories(); ?>

				<?php while ( have_posts() ) : the_post(); ?>

					<?php wc_get_template_part( 'content', 'product' ); ?>

				<?php endwhile; // end of the loop. ?>

			</div><!-- .filmstrip -->

			<?php
				/**
				 * woocommerce_after_shop_loop hook
				 *
				 * @hooked woocommerce_pagination - 10
				 */
				do_action( 'woocommerce_after_shop_loop' );
			?>

		<?php } elseif ( ! woocommerce_output_product_categories( array( 'before' => woocommerce_product_loop_start( false ), 'after' => woocommerce_product_loop_end( false ) ) ) ) { ?>

			<?php wc_get_template( 'loop/no-products-found.php' ); ?>

		<?php } ?>

		</div><!-- .site-container  .site-content  .shop -->

<?php
/**
 * Hook: woocommerce_after_main_content.
 *
 * @hooked woocommerce_output_content_wrapper_end - 10 (outputs closing divs for the content)
 */
do_action( 'woocommerce_after_main_content' );

/**
 * Hook: woocommerce_sidebar.
 *
 * @hooked woocommerce_get_sidebar - 10
 */
do_action( 'woocommerce_sidebar' );

get_footer( 'shop' );
