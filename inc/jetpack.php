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
		require_once get_template_directory() . '/inc/jetpack/site-logo.php';
		//this is not safe -- needed to prefix the functions
		require_once get_template_directory() . '/inc/jetpack/responsive-videos.php';
	}
}
add_action( 'after_setup_theme', 'timber_load_jetpack_compatibility' );

function timber_jetpack_setup() {

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

/**
 * This functions returns true if the current page should display a project layout
 * @param null $post
 *
 * @return bool
 */
function timber_post_is_project( $post = null ) {

	if ( $post === null ) {
		global $post;
	}

	// if we can't determine the post type we quit
	if ( ! isset( $post->post_type ) ) {
		return false;
	}

	if ( $post->post_type === 'jetpack-portfolio' ) {
		return true;
	} elseif ( $post->post_type === 'page' ) {
		$custom_portfolio_page_type = get_post_meta( timber_get_post_id(), 'custom_portfolio_page_type', true);
		if ( $custom_portfolio_page_type === 'project' ) {
			return true;
		}
	}

	return false;
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