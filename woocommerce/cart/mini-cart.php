<?php
/**
 * Mini-cart
 *
 * Contains the markup for the mini-cart, used by the cart widget
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.1.0
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
global $woocommerce;
?>

<?php do_action( 'woocommerce_before_mini_cart' ); ?>

<a href="<?php echo $woocommerce->cart->get_cart_url(); ?>" class="cart-widget-label">
	<i class="icon icon-shopping-cart"></i>
</a>
<span class="cart-items-number"><?php echo sprintf( _n( '%d', $woocommerce->cart->cart_contents_count, 'woothemes' ), $woocommerce->cart->cart_contents_count ); ?></span>
<div class="cart-widget-details">
	<?php if ($woocommerce->cart->cart_contents_count): ?>
		<p class="cart-widget-summary">
			<?php echo __( 'You have ', 'timber' ) . '<cart class="shop-items-number">' . sprintf( _n( '1 item in cart.', '%1$s items in cart.', $woocommerce->cart->cart_contents_count, 'timber' ), number_format_i18n( $woocommerce->cart->cart_contents_count ) ) .'</cart>'; ?>
		</p>
	<?php else: ?>
		<p class="cart-widget-summary cart--empty">
			<?php _e( 'Your cart is currently empty.', 'woocommerce' ); ?>
		</p>
	<?php endif; ?>

<ul class="cart_list product_list_widget <?php echo $args['list_class']; ?>">

	<?php if ( sizeof( WC()->cart->get_cart() ) > 0 ) : ?>

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
					<?php if ( ! $_product->is_visible() ) { ?>
						<?php echo str_replace( array( 'http:', 'https:' ), '', $thumbnail ) . $product_name; ?>
					<?php } else { ?>
						<a class="product-name" href="<?php echo get_permalink( $product_id ); ?>">
							<?php echo str_replace( array( 'http:', 'https:' ), '', $thumbnail ) . $product_name; ?>
						</a>
					<?php } ?>
					<?php echo WC()->cart->get_item_data( $cart_item ); ?>

					<?php echo '<div class="quantity"><span class="cart-items-number">' . $cart_item['quantity'] . '</span></div>' . $product_price; ?>
				</li>
			<?php
			}
		}
		?>

	<?php endif; ?>

</ul><!-- end product list -->

<?php if ( sizeof( WC()->cart->get_cart() ) > 0 ) : ?>

	<p class="total"><strong><?php _e( 'Subtotal', 'woocommerce' ); ?>:</strong> <?php echo WC()->cart->get_cart_subtotal(); ?></p>

	<?php do_action( 'woocommerce_widget_shopping_cart_before_buttons' ); ?>

	<p class="buttons">
		<a href="<?php echo WC()->cart->get_cart_url(); ?>" class="wc-forward"><?php _e( 'View Cart', 'woocommerce' ); ?></a>
		<a href="<?php echo WC()->cart->get_checkout_url(); ?>" class="checkout wc-forward"><?php _e( 'Checkout', 'woocommerce' ); ?></a>
	</p>

<?php endif; ?>

<?php do_action( 'woocommerce_after_mini_cart' ); ?>
