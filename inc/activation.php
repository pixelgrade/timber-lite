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
				'timber_gallery'   => array(
					'labels'        => array(
						'name'               => __( 'Gallery', 'timber' ),
						'singular_name'      => __( 'Gallery', 'timber' ),
						'add_new'            => __( 'Add New', 'timber' ),
						'add_new_item'       => __( 'Add New Gallery', 'timber' ),
						'edit_item'          => __( 'Edit Gallery', 'timber' ),
						'new_item'           => __( 'New Gallery', 'timber' ),
						'all_items'          => __( 'All Galleries', 'timber' ),
						'view_item'          => __( 'View Gallery', 'timber' ),
						'search_items'       => __( 'Search Galleries', 'timber' ),
						'not_found'          => __( 'No Gallery found', 'timber' ),
						'not_found_in_trash' => __( 'No Gallery found in Trash', 'timber' ),
						'menu_name'          => __( 'Galleries', 'timber' ),
					),
					'public'        => true,
					'rewrite'       => array(
						'slug'       => 'timber_galleries',
						'with_front' => false,
					),
					'has_archive'   => 'galleries-archive',
					'menu_icon'     => 'slider.png',
					'menu_position' => null,
					'supports'      => array( 'title', 'thumbnail', 'page-attributes', 'excerpt', 'revisions' ),
					//'yarpp_support' => true,
				),
			),
			'taxonomies'       => array(
				'timber_gallery_categories'   => array(
					'hierarchical'      => true,
					'labels'            => array(
						'name'              => __( 'Gallery Categories', 'timber' ),
						'singular_name'     => __( 'Gallery Category', 'timber' ),
						'search_items'      => __( 'Search Gallery Category', 'timber' ),
						'all_items'         => __( 'All Gallery Categories', 'timber' ),
						'parent_item'       => __( 'Parent Gallery Category', 'timber' ),
						'parent_item_colon' => __( 'Parent Gallery Category: ', 'timber' ),
						'edit_item'         => __( 'Edit Gallery Category', 'timber' ),
						'update_item'       => __( 'Update Gallery Category', 'timber' ),
						'add_new_item'      => __( 'Add New Gallery Category', 'timber' ),
						'new_item_name'     => __( 'New Gallery Category Name', 'timber' ),
						'menu_name'         => __( 'Gallery Categories', 'timber' ),
					),
					'show_admin_column' => true,
					'rewrite'           => array( 'slug' => 'gallery-category', 'with_front' => false ),
					'sort'              => true,
					'post_types'        => array( 'timber_gallery' )
				),
			),
			'metaboxes'        => array(
				'timber_gallery_details'  => array(
					'id'         => 'timber_gallery_details',
					'title'      => __( 'Gallery Details', 'timber' ),
					'pages'      => array( 'timber_gallery' ), // Post type
					'context'    => 'normal',
					'priority'   => 'high',
					'show_names' => true, // Show field names on the left
					'fields'     => array(
						array(
							'name' => __( 'Images', 'timber' ),
							'id'   => 'main_gallery',
							'type' => 'gallery',
						),
						array(
							'name'    => __( 'Template Style', 'timber' ),
							'id'      => 'gallery_template',
							'type'    => 'select',
							'options' => array(
								array(
									'name'  => __( 'Grid', 'timber' ),
									'value' => 'grid'
								),
								array(
									'name'  => __( 'Slideshow', 'timber' ),
									'value' => 'slideshow'
								),
							),
							'std'     => 'grid',
						),
						array(
							'name'       => __( 'Grid Thumbnails', 'timber' ),
							'id'         => 'grid_thumbnails',
							'type'       => 'select',
							'options'    => array(
								array(
									'name'  => __( 'Square', 'timber' ),
									'value' => 'square'
								),
								array(
									'name'  => __( 'Masonry', 'timber' ),
									'value' => 'masonry'
								),
							),
							'display_on' => array(
								'display' => true,
								'on'      => array(
									'field' => 'gallery_template',
									'value' => 'grid'
								)
							),
							'std'        => 'square',
						),
						array(
							'name'       => __( 'Show gallery title', 'timber' ),
							'id'         => 'show_gallery_title',
							'type'       => 'select',
							'options'    => array(
								array(
									'name'  => __( 'Show', 'timber' ),
									'value' => 'show'
								),
								array(
									'name'  => __( 'Hide', 'timber' ),
									'value' => 'hide'
								)
							),
							'std'        => 'hide',
							'display_on' => array(
								'display' => true,
								'on'      => array(
									'field' => 'gallery_template',
									'value' => 'grid'
								)
							),
						),
						array(
							'name'       => __( 'Image Scaling', 'timber' ),
							'desc'       => __( '<p class="cmb_metabox_description"><strong>Fill</strong> scales image to completely fill slider container (recommended for landscape images)</p>
	<p class="cmb_metabox_description"><strong>Fit</strong> scales image to fit the container (recommended for portrait images)</p>
	<p class="cmb_metabox_description"><a target="_blank" href="http://bit.ly/slider-image-scaling">Visual explanation</a></p>', 'timber' ),
							'id'         => 'gallery_slider_image_scale_mode',
							'type'       => 'select',
							'display_on' => array(
								'display' => true,
								'on'      => array(
									'field' => 'gallery_template',
									'value' => 'slideshow'
								)
							),
							'options'    => array(
								array(
									'name'  => __( 'Fit', 'timber' ),
									'value' => 'fit'
								),
								array(
									'name'  => __( 'Fill', 'timber' ),
									'value' => 'fill'
								),
							),
							'std'        => 'fill'
						),
						array(
							'name'       => __( 'Show Nearby Images', 'timber' ),
							'desc'       => __( 'Enable this if you want to avoid having empty spaces on the sides of the image when using mostly portrait images.', 'timber' ),
							'id'         => 'gallery_slider_visiblenearby',
							'type'       => 'select',
							'display_on' => array(
								'display' => true,
								'on'      => array(
									'field' => 'gallery_template',
									'value' => 'slideshow'
								)
							),
							'options'    => array(
								array(
									'name'  => __( 'Enabled', 'timber' ),
									'value' => true
								),
								array(
									'name'  => __( 'Disabled', 'timber' ),
									'value' => false
								)
							),
							'std'        => false
						),
						array(
							'name'       => __( 'Slider Transition Animation', 'timber' ),
							'id'         => 'gallery_slider_transition',
							'type'       => 'select',
							'display_on' => array(
								'display' => true,
								'on'      => array(
									'field' => 'gallery_template',
									'value' => 'slideshow'
								)
							),
							'options'    => array(
								array(
									'name'  => __( 'Slide/Move', 'timber' ),
									'value' => 'move'
								),
								array(
									'name'  => __( 'Fade', 'timber' ),
									'value' => 'fade'
								)
							),
							'std'        => 'fade'
						),
						array(
							'name'       => __( 'Slider Transition Direction', 'timber' ),
							'id'         => 'gallery_slider_transition_direction',
							'type'       => 'select',
							'display_on' => array(
								'display' => true,
								'on'      => array(
									'field' => 'gallery_slider_transition',
									'value' => 'move'
								)
							),
							'options'    => array(
								array(
									'name'  => __( 'Horizontal', 'timber' ),
									'value' => 'horizontal'
								),
								array(
									'name'  => __( 'Vertical', 'timber' ),
									'value' => 'vertical'
								)
							),
							'std'        => 'horizontal'
						),
						array(
							'name'       => __( 'Slider Autoplay', 'timber' ),
							'id'         => 'gallery_slider_autoplay',
							'type'       => 'select',
							'display_on' => array(
								'display' => true,
								'on'      => array(
									'field' => 'gallery_template',
									'value' => 'slideshow'
								)
							),
							'options'    => array(
								array(
									'name'  => __( 'Enabled', 'timber' ),
									'value' => true
								),
								array(
									'name'  => __( 'Disabled', 'timber' ),
									'value' => false
								)
							),
							'std'        => false
						),
						array(
							'name'       => __( 'Autoplay delay between slides (in milliseconds)', 'timber' ),
							'id'         => 'gallery_slider_delay',
							'type'       => 'text_small',
							'display_on' => array(
								'display' => true,
								'on'      => array(
									'field' => 'gallery_slider_autoplay',
									'value' => true
								)
							),
							'std'        => '1000'
						),
						array(
							'name'       => __( 'Full Screen Button', 'timber' ),
							'id'         => 'full_screen_button',
							'type'       => 'select',
							'display_on' => array(
								'display' => true,
								'on'      => array(
									'field' => 'gallery_template',
									'value' => 'slideshow'
								)
							),
							'options'    => array(
								array(
									'name'  => __( 'Show', 'timber' ),
									'value' => 'show'
								),
								array(
									'name'  => __( 'Hide', 'timber' ),
									'value' => 'hide'
								)
							),
							'std'        => 'show'
						),
						array(
							'name'    => __( 'Social Share Buttons', 'timber' ),
							'desc'    => __( 'Display your AddThis social sharing buttons configured in the <i>Theme Options > Social and SEO</i> section.', 'timber' ),
							'id'      => 'gallery_share_button',
							'type'    => 'select',
							'options' => array(
								array(
									'name'  => __( 'Show', 'timber' ),
									'value' => 'true'
								),
								array(
									'name'  => __( 'Hide', 'timber' ),
									'value' => 'false'
								)
							),
							'std'     => 'true'
						),
						array(
							'name'    => __( 'Exclude From Archives', 'timber' ),
							'desc'    => __( 'Exclude this gallery from the galleries archives (main, categories, etc).', 'timber' ),
							'id'      => 'exclude_from_archives',
							'type'    => 'select',
							'options' => array(
								array(
									'name'  => __( 'No', 'timber' ),
									'value' => false
								),
								array(
									'name'  => __( 'Yes', 'timber' ),
									'value' => true
								)
							),
							'std'     => false
						),
					)
				),
	//			'timber_gallery_cover'    => array(
	//				'id'         => 'timber_gallery_cover',
	//				'title'      => __( 'Gallery Cover', 'timber' ),
	//				'pages'      => array( 'timber_gallery' ), // Post type
	//				'context'    => 'normal',
	//				'priority'   => 'high',
	//				'display_on' => array(
	//					'display' => true,
	//					'on'      => array(
	//						'field' => 'gallery_template',
	//						'value' => 'slideshow'
	//					)
	//				),
	//				'show_names' => true, // Show field names on the left
	//				'fields'     => array(
	//					array(
	//						'name'    => __( 'Use first gallery image as cover', 'timber' ),
	//						'id'      => 'set_first_img_as_cover',
	//						'type'    => 'radio',
	//						'options' => array(
	//							array(
	//								'name'  => __( 'Yes', 'timber' ),
	//								'value' => 'yes'
	//							),
	//							array(
	//								'name'  => __( 'No', 'timber' ),
	//								'value' => 'no'
	//							),
	//						),
	//						'std'     => 'no',
	//					),
	//					array(
	//						'name'       => __( 'Cover Title Style', 'timber' ),
	//						'desc'       => __( 'Choose one of the 3 cover styles (fonts defined in Theme Options > Gallery).', 'timber' ),
	//						'id'         => 'cover_title_style',
	//						'type'       => 'select',
	//						'display_on' => array(
	//							'display' => true,
	//							'on'      => array(
	//								'field' => 'set_first_img_as_cover',
	//								'value' => 'yes'
	//							)
	//						),
	//						'options'    => array(
	//							array(
	//								'name'  => __( 'Style 1', 'timber' ),
	//								'value' => 'style1'
	//							),
	//							array(
	//								'name'  => __( 'Style 2', 'timber' ),
	//								'value' => 'style2'
	//							),
	//							array(
	//								'name'  => __( 'Style 3', 'timber' ),
	//								'value' => 'style3'
	//							)
	//						),
	//						'std'        => 'style_1'
	//					),
	//					array(
	//						'name'       => __( 'First Subtitle', 'timber' ),
	//						'id'         => 'gallery_cover_first_subtitle',
	//						'type'       => 'wysiwyg',
	//						'options'    => array(
	//							'media_buttons' => false,
	//							'textarea_rows' => 1,
	//							'teeny'         => true,
	//							'tinymce'       => false,
	//							'quicktags'     => false
	//						),
	//						'display_on' => array(
	//							'display' => true,
	//							'on'      => array(
	//								'field' => 'set_first_img_as_cover',
	//								'value' => 'yes'
	//							)
	//						),
	//					),
	//					array(
	//						'name'       => __( 'Title', 'timber' ),
	//						'id'         => 'gallery_cover_title',
	//						'type'       => 'wysiwyg',
	//						'options'    => array(
	//							'media_buttons' => false,
	//							'textarea_rows' => 1,
	//							'teeny'         => true,
	//							'tinymce'       => false,
	//							'quicktags'     => false
	//						),
	//						'display_on' => array(
	//							'display' => true,
	//							'on'      => array(
	//								'field' => 'set_first_img_as_cover',
	//								'value' => 'yes'
	//							)
	//						),
	//					),
	//					array(
	//						'name'       => __( 'Second Subtitle', 'timber' ),
	//						'id'         => 'gallery_cover_second_subtitle',
	//						'type'       => 'wysiwyg',
	//						'options'    => array(
	//							'media_buttons' => false,
	//							'textarea_rows' => 1,
	//							'teeny'         => true,
	//							'tinymce'       => false,
	//							'quicktags'     => false
	//						),
	//						'display_on' => array(
	//							'display' => true,
	//							'on'      => array(
	//								'field' => 'set_first_img_as_cover',
	//								'value' => 'yes'
	//							)
	//						),
	//					),
	//					array(
	//						'name'       => __( 'Text Color', 'timber' ),
	//						'id'         => 'gallery_cover_text_color',
	//						'type'       => 'colorpicker',
	//						'display_on' => array(
	//							'display' => true,
	//							'on'      => array(
	//								'field' => 'set_first_img_as_cover',
	//								'value' => 'yes'
	//							)
	//						),
	//					)
	//				)
	//			),
				'timber_homepage_chooser' => array(
					'id'         => 'timber_homepage_chooser',
					'title'      => __( 'Choose Your Home Page', 'timber' ),
					'pages'      => array( 'page' ), // Post type
					'context'    => 'normal',
					'priority'   => 'high',
					'hidden'     => true,
					'show_on'    => array( 'key' => 'page-template', 'value' => array( 'page-frontpage.php' ), ),
					'show_names' => true, // Show field names on the left
					'fields'     => array(
						array(
							'name'    => __( 'Choose:', 'timber' ),
							'desc'    => __( 'Select what would you like to be your home page. If you want to have a static page as your homepage simply go the WordPress classic way and set it up in Settings > Reading (instead of this one).', 'timber' ),
							'id'      => 'custom_homepage',
							'type'    => 'radio',
							'options' => array(
								array(
									'name'  => __( 'Galleries Archive', 'timber' ),
									'value' => 'timber_galleries_archive',
								),
								array(
									'name'  => __( 'Galleries Category', 'timber' ),
									'value' => 'timber_galleries_cat',
								),
								array(
									'name'  => __( 'Gallery', 'timber' ),
									'value' => 'timber_gallery',
								),
							),
							'std'     => 'timber_galleries_archive',
						),
						array(
							'name'       => __( 'Select a galleries category', 'timber' ),
							'desc'       => __( 'Select a galleries category and we will show it on your homepage.', 'timber' ),
							'id'         => 'homepage_galleries_category',
							'type'       => 'select_cpt_term',
							'taxonomy'   => 'timber_gallery_categories',
							'options'    => array(//'hidden' => true,
							),
							'display_on' => array(
								'display' => true,
								'on'      => array(
									'field' => 'custom_homepage',
									'value' => 'timber_galleries_cat'
								)
							),
						),
						array(
							'name'       => __( 'Select a gallery', 'timber' ),
							'desc'       => __( 'Select a gallery and we will show it on your homepage.', 'timber' ),
							'id'         => 'homepage_gallery',
							'type'       => 'select_cpt_post',
							'options'    => array(
								'args' => array(
									'post_type' => 'timber_gallery',
								),
								//'hidden' => true,
							),
							'display_on' => array(
								'display' => true,
								'on'      => array(
									'field' => 'custom_homepage',
									'value' => 'timber_gallery'
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