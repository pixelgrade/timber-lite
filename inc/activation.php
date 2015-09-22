<?php
/**
 * Theme activation hook
 *
 * @package Timber
 * @since Timber 1.0
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
			'post_types'       => array(
				'jetpack-portfolio'   => array(
					'description' => __( 'Portfolio Items', 'timber' ),
					'labels'        => array(
						'name'               => __( 'Projects', 'timber' ),
						'singular_name'      => __( 'Project', 'timber' ),
						'add_new'            => __( 'Add New', 'timber' ),
						'add_new_item'       => __( 'Add New Project', 'timber' ),
						'edit_item'          => __( 'Edit Project', 'timber' ),
						'new_item'           => __( 'New Project', 'timber' ),
						'all_items'          => __( 'All Projects', 'timber' ),
						'view_item'          => __( 'View Project', 'timber' ),
						'search_items'       => __( 'Search Projects', 'timber' ),
						'not_found'          => __( 'No Projects found', 'timber' ),
						'not_found_in_trash' => __( 'No Projects found in Trash', 'timber' ),
						'menu_name'          => __( 'Portfolio', 'timber' ),
					),
					'public'        => true,
					'rewrite' => array(
						'slug'       => 'portfolio',
						'with_front' => false,
						'feeds'      => true,
						'pages'      => true,
					),
					'supports' => array(
						'title',
						'editor',
						'thumbnail',
						'comments',
						'revisions',
						'publicize',
						'wpcom-markdown',
					),
					'has_archive'   => 'portfolio-archive',
					'menu_icon'     => 'slider.png',
					'menu_position' => null,

					'show_ui'         => true,                   // below Pages
					'capability_type' => 'page',
					'map_meta_cap'    => true,
					'taxonomies'      => array( 'jetpack-portfolio-tag', 'jetpack-portfolio-type' ),
					'query_var'       => 'portfolio',

					//'yarpp_support' => true,
				),
			),
			'taxonomies'       => array(

				'jetpack-portfolio-type'   => array(
					'hierarchical'      => true,
					'labels'            => array(
						'name'              => esc_html__( 'Project Types',         'jetpack' ),
						'singular_name'     => esc_html__( 'Project Type',          'jetpack' ),
						'menu_name'         => esc_html__( 'Project Types',         'jetpack' ),
						'all_items'         => esc_html__( 'All Project Types',     'jetpack' ),
						'edit_item'         => esc_html__( 'Edit Project Type',     'jetpack' ),
						'view_item'         => esc_html__( 'View Project Type',     'jetpack' ),
						'update_item'       => esc_html__( 'Update Project Type',   'jetpack' ),
						'add_new_item'      => esc_html__( 'Add New Project Type',  'jetpack' ),
						'new_item_name'     => esc_html__( 'New Project Type Name', 'jetpack' ),
						'parent_item'       => esc_html__( 'Parent Project Type',   'jetpack' ),
						'parent_item_colon' => esc_html__( 'Parent Project Type:',  'jetpack' ),
						'search_items'      => esc_html__( 'Search Project Types',  'jetpack' ),
					),
					'public'            => true,
					'show_ui'           => true,
					'show_in_nav_menus' => true,
					'show_admin_column' => true,
					'query_var'         => true,
					'rewrite'           => array( 'slug' => 'project-type' ),
					'post_types'        => array( 'jetpack-portfolio' )
				),

				'jetpack-portfolio-tag'   => array(
					'hierarchical'      => false,
					'labels'            => array(
						'name'                       => __( 'Project Tags',                   'timber' ),
						'singular_name'              => __( 'Project Tag',                    'timber' ),
						'menu_name'                  => __( 'Project Tags',                   'timber' ),
						'all_items'                  => __( 'All Project Tags',               'timber' ),
						'edit_item'                  => __( 'Edit Project Tag',               'timber' ),
						'view_item'                  => __( 'View Project Tag',               'timber' ),
						'update_item'                => __( 'Update Project Tag',             'timber' ),
						'add_new_item'               => __( 'Add New Project Tag',            'timber' ),
						'new_item_name'              => __( 'New Project Tag Name',           'timber' ),
						'search_items'               => __( 'Search Project Tags',            'timber' ),
						'popular_items'              => __( 'Popular Project Tags',           'timber' ),
						'separate_items_with_commas' => __( 'Separate tags with commas',      'timber' ),
						'add_or_remove_items'        => __( 'Add or remove tags',             'timber' ),
						'choose_from_most_used'      => __( 'Choose from the most used tags', 'timber' ),
						'not_found'                  => __( 'No tags found.',                 'timber' ),
					),
					'show_admin_column' => true,
					'rewrite'           => array( 'slug' => 'project-tag' ),
					'sort'              => true,
					'post_types'        => array( 'jetpack-portfolio' )
				),
			),

			'metaboxes'        => array(

				'custom_portfolio_page_settings'   => array(
					'id'         => 'custom_portfolio_page_settings',
					'title'      => __( 'Custom Portfolio Template Options', 'timber' ),
					'pages'      => array( 'page' ), // Post type
					'context'    => 'normal',
					'priority'   => 'high',
					'show_on'    => array( 'key' => 'page-template', 'value' => array( 'page-templates/custom-portfolio-page.php' ), ),
					'show_names' => true, // Show field names on the left
					'fields'     => array(
						array(
							'name'    => __( 'Page Content<a class="tooltip" title="Select what content would you like to be on this page."></a>', 'timber' ),
							'desc'    => __( ' <p class="cmb_metabox_description" style="font-size: 90%">If you want to set this page as your <a href="https://en.support.wordpress.com/pages/front-page/" target="_blank">Front page</a>, simply go to <a href="customize.php">Customizer</a>, click on the <b>Static Front Page</b> tab on the left and select this one.</p>', 'timber' ),
							'id'      => 'custom_portfolio_page_type',
							'type'    => 'radio',
							'std'     => 'project_slider',
							'options' => array(
								array(
									'name'  => __( '<span class="dashicons dashicons-format-gallery"></span> Projects Slider', 'timber' ),
									'value' => 'project_slider',
								),
								array(
									'name'  => __( '<span class="dashicons dashicons-portfolio"></span> Portfolio Archive', 'timber' ),
									'value' => 'portfolio',
								),
//								array(
//									'name'  => __( 'Projects Category', 'timber' ),
//									'value' => 'portfolio_cat',
//								),
								array(
									'name'  => __( '<span class="dashicons dashicons-format-image"></span> Single Project <a class="tooltip" title="This feature is designed so you can have the option of a simple gallery on the Front page."></a>', 'timber' ),
									'value' => 'project',
								),
							)
						),

						array(
							'name'    => __( 'Featured Projects', 'timber' ),
							'id'      => 'portfolio_featured_projects',
							'desc'    => __( 'Choose your featured projects. Drag and drop to reorder them to your liking.', 'timber' ),
							'type'    => 'pw_multiselect_cpt',
							'options' => array(
								'args' => array(
									'post_type' => 'jetpack-portfolio',
									'post_status' => 'publish'
								),
							),
							'sanitization_cb' => 'pw_select2_sanitise',

							'display_on' => array(
								'display' => true,
								'on'      => array(
									'field' => 'custom_portfolio_page_type',
									'value' => 'project_slider'
								)
							),
						),

						array(
							'name'       => __( 'Slider Height', 'timber' ),
							//'desc'       => __( 'Select a galleries category and we will show it on your homepage.', 'timber' ),
							'id'         => 'projects_slider_height',
							'type'       => 'radio',
							'std'    => 'default',
							'options'    => array(
								array(
									'name' => __( '<span class="dashicons dashicons-editor-insertmore"></span> Standard', 'timber' ),
									'value' => 'default'
								),
								array(
									'name' => __( '<span class="dashicons dashicons-editor-expand"></span> Full Height', 'timber' ),
									'value' => 'full-height'
								)
							),
							'display_on' => array(
								'display' => true,
								'on'      => array(
									'field' => 'custom_portfolio_page_type',
									'value' => 'project_slider'
								)
							),
						),
						array(
							'name'       => __( 'Slider Navigation', 'timber' ),
							//'desc'       => __( 'Select a galleries category and we will show it on your homepage.', 'timber' ),
							'id'         => 'show_adjacent_projects',
							'type'       => 'radio',
							'std'    => 'show_next',
							'options'    => array(
								array(
									'name' => __( '<span class="dashicons dashicons-leftright"></span> Next and Prev', 'timber' ),
									'value' => 'show_prev_next'
								),
								array(
									'name' => __( '<span class="dashicons dashicons-arrow-right"></span> Next Only', 'timber' ),
									'value' => 'show_next'
								)
							),
							'display_on' => array(
								'display' => true,
								'on'      => array(
									'field' => 'custom_portfolio_page_type',
									'value' => 'project_slider'
								)
							),
						),

//						array(
//							'name'       => __( 'Select a project category', 'timber' ),
//							'desc'       => __( 'Select a project category and we will show it on your homepage.', 'timber' ),
//							'id'         => 'project_category',
//							'type'       => 'select_cpt_term',
//							'taxonomy'   => 'lens_portfolio_categories',
//							'options'    => array( // 'hidden' => true,
//							),
//							'display_on' => array(
//								'display' => true,
//								'on'      => array(
//									'field' => 'custom_portfolio_page_type',
//									'value' => 'portfolio_cat'
//								)
//							),
//						),

						array(
							'name'       => __( 'Select the project', 'timber' ),
							'desc'       => __( 'Example: You can have a Filmstrip or Fullscreen gallery on the Front page (see above for details).', 'timber' ),
							'id'         => 'homepage_project',
							'type'       => 'select_cpt_post',
							'options'    => array(
								'args' => array(
									'post_type' => 'jetpack-portfolio',
								),
								//'hidden' => true,
							),

							'display_on' => array(
								'display' => true,
								'on'      => array(
									'field' => 'custom_portfolio_page_type',
									'value' => 'project'
								),
							),
							'sanitization_cb' => 'pw_select2_sanitise',
						),
					),
				),

				'timber_project_settings' => array(
					'id'         => 'timber_project_settings',
					'title'      => __( 'Project settings', 'timber' ),
					'pages'      => array( 'jetpack-portfolio' ), // Post type
					'context'    => 'normal',
					'priority'   => 'high',
					'show_names' => true, // Show field names on the left
					'fields'     => array(
						array(
							'name'       => __( 'Layout Style<a class="tooltip" title="Select the initial layout for this project."></a>', 'timber' ),
							// 'desc'       => __( 'Select the initial layout. ', 'timber' ),
							'id'         => 'project_template',
							'type'       => 'radio',
							'std'    => 'filmstrip',
							'options'    => array(
								array(
									'name' => __( 'Thumbnails', 'timber' ),
									'value' => 'thumbnails'
								),
								array(
									'name' => __( 'Filmstrip', 'timber' ),
									'value' => 'filmstrip'
								),
								array(
									'name' => __( 'Fullscreen', 'timber' ),
									'value' => 'fullscreen'
								)
							),
						),
						array(
							'name'		=> __('Fullscreen Image Scaling', 'timber'),
							'id'		=> 'fullscreen_image_scaling',
							'type'		=> 'radio',
							'std'		=> 'fill',
							'options'	=> array(
								array(
									'name' => __( 'FILL - the image covers the entire screen and can be explored using an immersive panning effect', 'timber'),
									'value' => 'fill'
								),
								array(
									'name' => __( 'FIT - the image is resized to fit inside the container and it\'s fully visible from the start', 'timber' ),
									'value' => 'fit'
								),
							),
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

		// force some pixproof settings
		$pixproof_settings = get_option( 'pixproof_settings' );
		if ( is_array($pixproof_settings) ) {
			$pixproof_settings['disable_pixproof_style'] = '1';
			update_option( 'pixproof_settings', $pixproof_settings );
		} else {
			$pixproof_settings = array (
				'disable_pixproof_style' => '1'
			);
			update_option( 'pixproof_settings', $pixproof_settings );
		}
	}
endif; // end timber_config_getting_active

add_action( 'after_switch_theme', 'timber_config_getting_active' );


// pixtypes requires these things below for a pixelgrade theme
// for the moment we'll shim them until we update pixtypes
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