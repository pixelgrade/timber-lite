<?php
/**
 * Jetpack Compatibility File - load the theme's duplicate files if Jetpack is not present
 * This way we provide a smooth transition to those that decide to use Jetpack
 * See: http://jetpack.me/
 *
 * @package Timber
 * @since Timber 1.0
 */

function timber_load_jetpack_compatibility() {
	//first test if Jetpack is present and activated
	// only if it is not present load the duplicated code from the theme
	if ( ! class_exists( 'Jetpack' ) ) {
		//these are safe as they do their own house cleaning
		require_once get_template_directory() . '/inc/jetpack/featured-content.php';
		require_once get_template_directory() . '/inc/jetpack/site-logo.php';
		//this is not safe -- needed to prefix the functions
		require_once get_template_directory() . '/inc/jetpack/responsive-videos.php';
	}
}
add_action( 'plugins_loaded', 'timber_load_jetpack_compatibility' );

function timber_jetpack_setup() {
	/**
	 * Add theme support for Featured Content
	 * See: http://jetpack.me/support/featured-content/
	 */
	add_theme_support( 'featured-content', array(
		'filter'     => 'timber_get_featured_posts',
		'max_posts'  => 10,
		'post_types' => array( 'jetpack-portfolio' ),
	) );

	/**
	 * Add theme support for site logo
	 *
	 * First, it's the image size we want to use for the logo thumbnails
	 * Second, the 2 classes we want to use for the "Display Header Text" Customizer logic
	 */
	add_theme_support( 'site-logo', array(
		'size'        => 'timber-site-logo',
		'header-text' => array(
			'site-title',
			'site-description-text',
		)
	) );

	add_image_size( 'timber-site-logo', 1000, 500, false );

	/**
	 * Add theme support for Jetpack responsive videos
	 */
	add_theme_support( 'jetpack-responsive-videos' );
}

add_action( 'after_setup_theme', 'timber_jetpack_setup' );

function timber_get_featured_posts() {
	return apply_filters( 'timber_get_featured_posts', array() );
}

function timber_has_featured_posts( $minimum = 1 ) {
	if ( is_paged() ) {
		return false;
	}

	$minimum = absint( $minimum );
	$featured_posts = timber_get_featured_posts();

	if ( ! is_array( $featured_posts ) ) {
		return false;
	}

	if ( $minimum > count( $featured_posts ) ) {
		return false;
	}

	return true;
} ?>