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
							'id'         => 'project_template',
							'type'       => 'select',
							'std'    => 'fullscreen',
							'options'    => array(
								array(
									'name' => __( 'Hybrid', 'timber' ),
									'value' => 'hybrid'
								),
								array(
									'name' => __( 'Fullscreen', 'timber' ),
									'value' => 'fullscreen'
								)
							)
						)
					)
				),

				'custom_portfolio_page_settings'   => array(
					'id'         => 'custom_portfolio_page_settings',
					'title'      => __( 'Choose Page Layout and source', 'timber' ),
					'pages'      => array( 'page' ), // Post type
					'context'    => 'normal',
					'priority'   => 'high',
					'show_on'    => array( 'key' => 'page-template', 'value' => array( 'page-templates/custom-portfolio-page.php' ), ),
					'show_names' => true, // Show field names on the left
					'fields'     => array(
						array(
							'name'    => __( 'Choose:', 'timber' ),
							'desc'    => __( 'Select what would you like to be your home page. If you want to have a static page as your homepage simply go the WP classic way and set it up in Settings > Reading (instead of this one).', 'timber' ),
							'id'      => 'custom_portfolio_page_type',
							'type'    => 'radio',
							'options' => array(
								array(
									'name'  => __( 'Project Slider', 'timber' ),
									'value' => 'project_slider',
								),
								array(
									'name'  => __( 'Projects Archive', 'timber' ),
									'value' => 'portfolio',
								),
//								array(
//									'name'  => __( 'Projects Category', 'timber' ),
//									'value' => 'portfolio_cat',
//								),
//								array(
//									'name'  => __( 'Project', 'timber' ),
//									'value' => 'project',
//								),
							),
							'std'     => 'project_slider',
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
							'name'       => __( 'Slider height', 'timber' ),
							//'desc'       => __( 'Select a galleries category and we will show it on your homepage.', 'timber' ),
							'id'         => 'projects_slider_height',
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
							'name'       => __( 'Show adjacent projects', 'timber' ),
							//'desc'       => __( 'Select a galleries category and we will show it on your homepage.', 'timber' ),
							'id'         => 'show_adjacent_projects',
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
							'name'       => __( 'Select a project', 'timber' ),
							'desc'       => __( 'Select a project and we will show it on your homepage.', 'timber' ),
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
								)
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