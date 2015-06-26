<?php
/**
 * Theme activation hook
 */
if ( ! function_exists( 'timber_config_getting_active' ) ) :
	function timber_config_getting_active() {
		/**
		 * ACTIVATION SETTINGS
		 * These settings will be needed when the theme will get active
		 * Careful with the first setup, most of them will go in the clients database and they will be stored there
		 */

		$pixtypes_conf_settings = array(
			'first_activation' => true,
			'metaboxes'        => array(
				'timber_frontpage_settings' => array(
					'id'         => 'timber_frontpage_settings',
					'title'      => __( 'Frontpage settings', 'timber' ),
					'pages'      => array( 'page' ), // Post type
					'context'    => 'side',
					'priority'   => 'default',
					'hidden'     => true,
					'show_on'    => array( 'key' => 'page-template', 'value' => array( 'page-templates/front-page.php' ), ),
					'show_names' => true, // Show field names on the left
					'fields'     => array(
						array(
							'name'       => __( 'Slide height', 'timber' ),
							//'desc'       => __( 'Select a galleries category and we will show it on your homepage.', 'timber' ),
							'id'         => 'homepage_slide_height',
							'type'       => 'select',
							'default'    => 'default',
							'options'    => array(
								array(
									'name' => __( 'Default', 'timber' ),
									'value' => 'default'
								),
								array(
									'name' => __( 'Full-height', 'timber' ),
									'value' => 'full-height'
								)
							)
						),
						array(
							'name'       => __( 'Show adjacent projects', 'timber' ),
							//'desc'       => __( 'Select a galleries category and we will show it on your homepage.', 'timber' ),
							'id'         => 'homepage_slide_height',
							'type'       => 'select',
							'default'    => 'default',
							'options'    => array(
								array(
									'name' => __( 'Show prev/next', 'timber' ),
									'value' => 'show_prev_next'
								),
								array(
									'name' => __( 'Show next', 'timber' ),
									'value' => 'show_next'
								)
							)
						),
					)
				),
				'timber_project_settings' => array(
					'id'         => 'timber_project_settings',
					'title'      => __( 'Project settings', 'timber' ),
					'pages'      => array( 'jetpack-portfolio' ), // Post type
					'context'    => 'side',
					'priority'   => 'default',
					'show_names' => true, // Show field names on the left
					'fields'     => array(
						array(
							'name'       => __( 'Template', 'timber' ),
							//'desc'       => __( 'Select a galleries category and we will show it on your homepage.', 'timber' ),
							'id'         => 'homepage_slide_height',
							'type'       => 'select',
							'default'    => 'hybrid',
							'options'    => array(
								array(
									'name' => __( 'Hybrid', 'timber' ),
									'value' => 'hybrid'
								),
								array(
									'name' => __( 'Slider', 'timber' ),
									'value' => 'slider'
								)
							)
						)
					)
				),
			),
		);

		/**
		 * After this line we won't config nothing.
		 * Let's add these settings into WordPress's options db
		 */

		// First, Pixtypes
		$types_options = get_option( 'pixtypes_themes_settings' );
		if ( empty( $types_options ) ) {
			$types_options = array();
		}
		$types_options[ 'timber_pixtypes_theme' ] = $pixtypes_conf_settings;
		update_option( 'pixtypes_themes_settings', $types_options );
	}
endif; // end timber_config_getting_active

add_action( 'after_switch_theme', 'timber_config_getting_active' );


// pixtypes requires these things below for a pixelgrade theme
// for the momment we'll shim them until we update pixtypes
if ( ! class_exists( 'wpgrade' ) ) :
class wpgrade {
	static function shortname() {
		return 'timber';
	}

	/** @var WP_Theme */
	protected static $theme_data = null;

	/**
	 * @return WP_Theme
	 */
	static function themedata() {
		if ( self::$theme_data === null ) {
			if ( is_child_theme() ) {
				$theme_name       = get_template();
				self::$theme_data = wp_get_theme( $theme_name );
			} else {
				self::$theme_data = wp_get_theme();
			}
		}

		return self::$theme_data;
	}

	/**
	 * @return string
	 */
	static function themeversion() {
		return wpgrade::themedata()->Version;
	}
}

function wpgrade_callback_geting_active() {
	timber_config_getting_active();
}

endif;