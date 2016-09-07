<?php
/**
 * The template for displaying product category thumbnails within loops
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-product_cat.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @author  WooThemes
 * @package WooCommerce/Templates
 * @version 2.6.1
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}



$image_meta =  get_woocommerce_term_meta( $category->term_id, 'thumbnail_id', true  );
if ( ! isset( $image_meta['width'] ) || empty( $image_meta['width'] ) ) {
	$image_meta['width'] = 500;
}

if ( ! isset( $image_meta['height'] ) || empty( $image_meta['height'] ) ) {
	$image_meta['height'] = 500;
}

?>
<div <?php wc_product_cat_class( 'portfolio__item  js-portfolio-item product__item', $category ); ?> data-width="<?php echo $image_meta['width']; ?>"  data-height="<?php echo $image_meta['height']; ?>">
	<?php
	/**
	 * woocommerce_before_subcategory hook.
	 *
	 * @hooked woocommerce_template_loop_category_link_open - 10
	 */
	do_action( 'woocommerce_before_subcategory', $category ); ?>

	<span class="product__link" >

	<?php
	/**
	 * woocommerce_before_subcategory_title hook.
	 *
	 * @hooked woocommerce_subcategory_thumbnail - 10
	 */
	do_action( 'woocommerce_before_subcategory_title', $category ); ?>

		<span class="product__details">
			<h1 class="h3  product_title">
			<?php
			echo $category->name;

			if ( $category->count > 0 )
				echo apply_filters( 'woocommerce_subcategory_count_html', ' <span>(' . $category->count . ')</span>', $category );
			?>
			</h1>
		</span>

	<?php
	/**
	 * woocommerce_after_subcategory_title hook.
	 */
	do_action( 'woocommerce_after_subcategory_title', $category ); ?>

	</span><!-- .product__link -->

	<?php
	/**
	 * woocommerce_after_subcategory hook.
	 *
	 * @hooked woocommerce_template_loop_category_link_close - 10
	 */
	do_action( 'woocommerce_after_subcategory', $category ); ?>
</div>
