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
	//this is a customized version of the Jetpack module
	require_once get_template_directory() . '/inc/jetpack/featured-content.php';

	//first test if Jetpack is present and activated
	// only if it is not present load the duplicated code from the theme
	if ( ! class_exists( 'Jetpack' ) ) {
		//these are safe as they do their own house cleaning
		require_once get_template_directory() . '/inc/jetpack/site-logo.php';
		//this is not safe -- needed to prefix the functions
		require_once get_template_directory() . '/inc/jetpack/responsive-videos.php';
	}
}
add_action( 'after_setup_theme', 'timber_load_jetpack_compatibility' );

function timber_jetpack_setup() {
	/**
	 * Add theme support for Timber Featured Content - Customized so it will not use/activate the module in Jetpack
	 * See: http://jetpack.me/support/featured-content/
	 */
	add_theme_support( 'timber-featured-content', array(
		'filter'     => 'timber_get_featured_projects',
		'max_posts'  => 20, //even if there are 20 here we will cap them at 10; this is so that in case we get posts also we have at least 10 projects
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

function timber_get_featured_projects() {
	$featured_projects = apply_filters( 'timber_get_featured_projects', array() );

	//filter to only allow for jetpack-portfolio type
	$featured_projects = array_filter( $featured_projects, 'timber_post_is_project');

	//cap to maximum 10 projects
	$featured_projects = array_slice( $featured_projects, 0, 10 );

	return $featured_projects;
}

function timber_post_is_project( $post ) {
	if ( $post->post_type !== 'jetpack-portfolio' ) {
		return false;
	}

	return true;
}

function timber_has_featured_projects( $minimum = 1 ) {
	if ( is_paged() ) {
		return false;
	}

	$minimum = absint( $minimum );
	$featured_projects = timber_get_featured_projects();

	if ( ! is_array( $featured_projects ) ) {
		return false;
	}

	if ( $minimum > count( $featured_projects ) ) {
		return false;
	}

	return true;
} ?>