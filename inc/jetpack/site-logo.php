<?php
/**
 * This file has been "borrowed" from the awesome Jetpack plugin to provide a smooth transition in case one decides to use the plugin
 * See: http://jetpack.me/
 */

/*
 * Plugin Name: Site Logo
 * Plugin URI: http://wordpress.com
 * Description: Add a logo to your WordPress site. Set it once, and all themes that support it will display it automatically.
 * Author: Automattic
 * Version: 1.0
 * Author URI: http://wordpress.com
 * License: GPL2 or later
 */

/**
 * Activate the Site Logo plugin.
 *
 * @uses current_theme_supports()
 * @since 3.2
 */
function timber_site_logo_init() {
	// Only load our code if our theme declares support, and the standalone plugin is not activated.
	if ( current_theme_supports( 'site-logo' ) && ! class_exists( 'Site_Logo', false ) ) {
		// Load our class for namespacing.
		require( dirname( __FILE__ ) . '/site-logo/inc/class-site-logo.php' );

		// Load template tags.
		require( dirname( __FILE__ ) . '/site-logo/inc/functions.php' );

		// Load backwards-compatible template tags.
		require( dirname( __FILE__ ) . '/site-logo/inc/compat.php' );
	}
}
add_action( 'init', 'timber_site_logo_init' );
