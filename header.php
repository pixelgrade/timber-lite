<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package Timber
 * @since Timber 1.0
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<meta name="mobile-web-app-capable" content="yes">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<?php wp_head();  ?>
</head>

<body <?php body_class(); ?> <?php timber_body_attributes(); ?> data-first-letter="<?php echo timber_first_site_title_character(); ?>">

<header id="masthead" class="site-header">
	<div class="bar--fixed">

	<div class="site-branding">

		<?php if ( function_exists( 'has_custom_logo' ) && has_custom_logo() ) : // display the Site Logo if present
			timber_the_custom_logo();
		else : ?>
			<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
		<?php endif; ?>
		<p class="site-description"><?php bloginfo( 'description' ); ?></p>
	</div><!-- .site-branding -->

	<nav id="site-navigation" class="main-navigation djax-updatable">
		<?php wp_nav_menu( array(
			'theme_location' => 'primary',
			'menu_class' => 'nav nav--main',
			'menu_id' => 'primary-menu',
			'fallback_cb' => false,
		) ); ?>
	</nav><!-- #site-navigation -->

	<nav class="social-navigation">
		<?php wp_nav_menu( array(
			'theme_location' => 'social',
			'menu_class' => 'nav nav--main nav--social',
			'menu_id' => 'social-menu',
			'fallback_cb' => false,
		) ); ?>
		<?php
			if ( in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {
				global $woocommerce; ?>
				<div class="cart-widget" data-shop-url="<?php echo get_permalink( get_option( 'woocommerce_shop_page_id' ) ); ?>" data-cart-url="<?php echo get_permalink( get_option( 'woocommerce_cart_page_id' ) ); ?>">
					<div class="widget_shopping_cart_content"></div>
				</div>
			<?php }
		?>
		<?php if ( is_active_sidebar( 'overlay-widget-area-1' ) ||
		           is_active_sidebar( 'overlay-widget-area-2' ) ||
		           is_active_sidebar( 'overlay-widget-area-3' )) : ?>
		<button class="toggle  js-overlay-trigger"><?php get_template_part('assets/svg/navgrid-svg'); ?></button>
		<?php endif; ?>
	</nav>

	</div>

	<button class="js-nav-toggle  nav-toggle"><i class="icon icon-bars"></i></button>
</header><!-- #masthead -->


<div id="page">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'timber' ); ?></a>
	<div id="djaxContainer" class="hfeed site djax-updatable">
		<div class="mobile-header">
			<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
			<?php if ( is_active_sidebar( 'overlay-widget-area-1' ) ||
			           is_active_sidebar( 'overlay-widget-area-2' ) ||
			           is_active_sidebar( 'overlay-widget-area-3' )) : ?>
			<button class="toggle  toggle--mobile  js-overlay-trigger"><?php get_template_part('assets/svg/navgrid-svg'); ?></button>
			<?php endif; ?>
		</div>
