<?php
/**
 * This file has been "borrowed" from the awesome Jetpack plugin to provide a smooth transition in case one decides to use the plugin
 * See: http://jetpack.me/
 */

/**
 * Load the Responsive videos plugin
 */
function timber_jetpack_responsive_videos_init() {

	/* If the doesn't theme support 'jetpack-responsive-videos', don't continue */
	if ( ! current_theme_supports( 'jetpack-responsive-videos' ) ) {
		return;
	}

	/* If the theme does support 'jetpack-responsive-videos', wrap the videos */
	add_filter( 'wp_video_shortcode', 'timber_jetpack_responsive_videos_embed_html' );
	add_filter( 'embed_oembed_html',  'timber_jetpack_responsive_videos_embed_html' );
	add_filter( 'video_embed_html',   'timber_jetpack_responsive_videos_embed_html' );

	/* Wrap videos in Buddypress */
	add_filter( 'bp_embed_oembed_html', 'timber_jetpack_responsive_videos_embed_html' );

}
add_action( 'after_setup_theme', 'timber_jetpack_responsive_videos_init', 99 );

/**
 * Adds a wrapper to videos and enqueue script
 *
 * @return string
 */
function timber_jetpack_responsive_videos_embed_html( $html ) {
	if ( empty( $html ) || ! is_string( $html ) ) {
		return $html;
	}

	if ( defined( 'SCRIPT_DEBUG' ) && true == SCRIPT_DEBUG ) {
		wp_enqueue_script( 'jetpack-responsive-videos-script', get_stylesheet_directory_uri() . '/inc/jetpack/responsive-videos/responsive-videos.js', array( 'jquery' ), '1.1', true );
	} else {
		wp_enqueue_script( 'jetpack-responsive-videos-min-script', get_stylesheet_directory_uri() . '/inc/jetpack/responsive-videos/responsive-videos.min.js', array( 'jquery' ), '1.1', true );
	}

	return '<div class="jetpack-video-wrapper">' . $html . '</div>';
}
