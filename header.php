<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package Timber
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

<body <?php body_class(); ?>>

<div id="page" class="hfeed site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'timber' ); ?></a>

	<header id="masthead" class="site-header" role="banner">
		<div class="bar--fixed">

		<div class="site-branding">

			<?php if ( function_exists( 'jetpack_the_site_logo' ) ) { // display the Site Logo if present
				jetpack_the_site_logo();
			} ?>

			<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
			<p class="site-description"><?php bloginfo( 'description' ); ?></p>
		</div><!-- .site-branding -->

		<nav id="site-navigation" class="main-navigation" role="navigation">
			<?php wp_nav_menu( array(
				'theme_location' => 'primary',
				'menu_class' => 'nav nav--main',
				'menu_id' => 'primary-menu',
				'fallback_cb' => false,
			) ); ?>
		</nav><!-- #site-navigation -->

		<nav class="social-navigation" role="navigation">
			<?php wp_nav_menu( array(
				'theme_location' => 'social',
				'menu_class' => 'nav nav--social',
				'menu_id' => 'social-menu',
				'fallback_cb' => false,
			) ); ?>
			<button class="toggle  js-toggle"></button>
		</nav>

		</div>
	</header><!-- #masthead -->
