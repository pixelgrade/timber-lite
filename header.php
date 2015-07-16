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
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?> <?php timber_body_attributes(); ?>>

<header id="masthead" class="site-header">
	<div class="bar--fixed">

	<div class="site-branding">

		<?php if ( jetpack_has_site_logo() ) : // display the Site Logo if present
			jetpack_the_site_logo();
		else : ?>
			<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
		<?php endif; ?>
		<p class="site-description"><?php bloginfo( 'description' ); ?></p>
	</div><!-- .site-branding -->

	<nav id="site-navigation" class="main-navigation">
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
			'menu_class' => 'nav nav--social',
			'menu_id' => 'social-menu',
			'fallback_cb' => false,
		) ); ?>
		<?php if ( is_active_sidebar( 'overlay-widget-area-1' ) ||
		           is_active_sidebar( 'overlay-widget-area-2' ) ||
		           is_active_sidebar( 'overlay-widget-area-3' )) : ?>
		<button class="toggle  js-overlay-trigger"><?php get_template_part('assets/svg/navgrid-svg'); ?></button>
		<?php endif; ?>
	</nav>

	</div>

	<button class="js-nav-toggle  nav-toggle"><i class="icon icon-bars"></i></button>
	<button class="toggle  toggle--mobile  js-overlay-trigger"><?php get_template_part('assets/svg/navgrid-svg'); ?></button>
</header><!-- #masthead -->


<div id="page">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'timber' ); ?></a>
	<div id="djaxContainer" class="hfeed site djax-updatable">
		<div class="mobile-header">
			<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
		</div>
