<?php
/**
 * Mini-cart
 *
 * Contains the markup for the mini-cart, used by the cart widget.
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/cart/mini-cart.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you (the theme developer).
 * will need to copy the new files to your theme to maintain compatibility. We try to do this.
 * as little as possible, but it does happen. When this occurs the version of the template file will.
 * be bumped and the readme will list any important changes.
 *
 * @see     http://docs.woothemes.com/document/template-structure/
 * @author  WooThemes
 * @package WooCommerce/Templates
 * @version 2.5.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

?>

<?php do_action( 'woocommerce_before_mini_cart' ); ?>

<a href="<?php echo esc_url( wc_get_cart_url() ); ?>" class="cart-widget-label">
<!--	<i class="icon icon-shopping-cart"></i>-->
</a>
<span class="cart-items-number"><?php echo sprintf( _n( '%d', WC()->cart->get_cart_contents_count(), 'woothemes' ), WC()->cart->get_cart_contents_count() ); ?></span>
<div class="cart-widget-details">
	<?php if ( ! WC()->cart->is_empty() ) : ?>
		<p class="cart-widget-summary">
			<?php echo __( 'You have ', 'timber' ) . '<cart class="shop-items-number">' . sprintf( _n( '1 item in cart.', '%1$s items in cart.', WC()->cart->get_cart_contents_count(), 'timber' ), number_format_i18n( WC()->cart->get_cart_contents_count() ) ) .'</cart>'; ?>
		</p>
	<?php else: ?>
		<p class="cart-widget-summary cart--empty">
			<?php _e( 'Your cart is currently empty.', 'woocommerce' ); ?>
		</p>
	<?php endif; ?>

<ul class="cart_list product_list_widget <?php echo $args['list_class']; ?>">

	<?php if ( ! WC()->cart->is_empty() ) : ?>

		<?php
		foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
			$_product     = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
			$product_id   = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );

			if ( $_product && $_product->exists() && $cart_item['quantity'] > 0 && apply_filters( 'woocommerce_widget_cart_item_visible', true, $cart_item, $cart_item_key ) ) {

				$product_name  = apply_filters( 'woocommerce_cart_item_name', $_product->get_title(), $cart_item, $cart_item_key );
				$thumbnail     = apply_filters( 'woocommerce_cart_item_thumbnail', $_product->get_image(), $cart_item, $cart_item_key );
				$product_price = apply_filters( 'woocommerce_cart_item_price', WC()->cart->get_product_price( $_product ), $cart_item, $cart_item_key );

				?>
				<li class="clearfix">
					<?php if ( ! $_product->is_visible() ) : ?>
						<?php echo str_replace( array( 'http:', 'https:' ), '', $thumbnail ) . $product_name . '&nbsp;'; ?>
					<?php else : ?>
						<a class="product-name" href="<?php echo esc_url( $_product->get_permalink( $cart_item ) ); ?>">
							<?php echo str_replace( array( 'http:', 'https:' ), '', $thumbnail ) . $product_name . '&nbsp;'; ?>
						</a>
					<?php endif; ?>
					<?php echo WC()->cart->get_item_data( $cart_item ); ?>

					<?php echo apply_filters( 'woocommerce_widget_cart_item_quantity', '<div class="quantity"><span class="cart-items-number">' . $cart_item['quantity'] . '</span></div>' . $product_price, $cart_item, $cart_item_key ); ?>
				</li>
			<?php
			}
		}
	?>

	<?php endif; ?>

</ul><!-- end product list -->

<?php if ( ! WC()->cart->is_empty() ) : ?>

	<p class="total"><strong><?php _e( 'Subtotal', 'woocommerce' ); ?>:</strong> <?php echo WC()->cart->get_cart_subtotal(); ?></p>

	<?php do_action( 'woocommerce_widget_shopping_cart_before_buttons' ); ?>

	<p class="buttons">
		<a href="<?php echo esc_url( wc_get_cart_url() ); ?>" class="wc-forward"><?php _e( 'View Cart', 'woocommerce' ); ?></a>
		<a href="<?php echo esc_url( wc_get_checkout_url() ); ?>" class="checkout wc-forward"><?php _e( 'Checkout', 'woocommerce' ); ?></a>
	</p>

<?php endif; ?>

<?php do_action( 'woocommerce_after_mini_cart' ); ?>
