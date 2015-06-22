<?php
/**
 * Hook into the Customify's fields and settings
 * @param $options array - Contains the plugin's options array right before they are used, so edit with care
 *
 * @return mixed
 */
function timber_add_customify_options( $options ) {

	$options['opt-name'] = 'timber_options';
	/**
	 * COLORS - This section will handle different elements colors (eg. links, headings)
	 */
	$options['sections'] = array(
		'presets_section' => array(
			'title'    => __( 'Style Presets', 'timber' ),
			'options' => array(
				'theme_style'   => array(
					'type'      => 'preset',
					'label'     => __( 'Select a style:', 'timber' ),
					'desc' => __( 'Conveniently change the design of your site with built-in style presets. Easy as pie.', 'timber' ),
					'default'   => 'timber',
					'choices_type' => 'awesome',
					'choices'  => array(
						'timber' => array(
							'label' => __( 'Patch', 'timber' ),
							'preview' => array(
								'color-text' => '#ffffff',
								'background-card' => '#121012',
								'background-label' => '#fee900',
								'font-main' => 'Oswald',
								'font-alt' => 'Roboto',
							),
							'options' => array(
								'accent_color' => '#ffeb00',
								'headings_color' => '#171617',
								'body_color' => '#3d3e40',
								'headings_font' => 'Oswald',
								'headings_caps' => true,
								'body_font' => 'Roboto',
							)
						),


						'adler' => array(
							'label' => __( 'Adler', 'timber' ),
							'preview' => array(
								'color-text' => '#fff',
								'background-card' => '#0e364f',
								'background-label' => '#000000',
								'font-main' => 'Permanent Marker',
								'font-alt' => 'Droid Sans Mono',
							),
							'options' => array(
								'accent_color' => '#68f3c8',
								'headings_color' => '#0e364f',
								'body_color' => '#45525a',
								'headings_font' => 'Permanent Marker',
								'headings_caps' => true,
								'body_font' => 'Droid Sans Mono'
							)
						),

						'royal' => array(
							'label' => __( 'Royal', 'timber' ),
							'preview' => array(
								'color-text' => '#ffffff',
								'background-card' => '#615375',
								'background-label' => '#46414c',
								'font-main' => 'Abril Fatface',
								'font-alt' => 'PT Serif',
							),
							'options' => array(
								'accent_color' => '#8eb2c5',
								'headings_color' => '#725c92',
								'body_color' => '#6f8089',
								'headings_font' => 'Abril Fatface',
								'headings_caps' => false,
								'body_font' => 'PT Serif',
							)
						),

						'queen' => array(
							'label' => __( 'Queen', 'timber' ),
							'preview' => array(
								'color-text' => '#fbedec',
								'background-card' => '#a33b61',
								'background-label' => '#41212a',
								'font-main' => 'Playfair Display',
								'font-alt' => 'Merriweather',
							),
							'options' => array(
								'accent_color' => '#c17390',
								'headings_color' => '#a33b61',
								'body_color' => '#403b3c',
								'headings_font' => 'Playfair Display',
								'headings_caps' => false,
								'body_font' => 'Merriweather',
							)
						),
						'carrot' => array(
							'label' => __( 'Carrot', 'timber' ),
							'preview' => array(
								'color-text' => '#ffffff',
								'background-card' => '#df421d',
								'background-label' => '#85210a',
								'font-main' => 'Oswald',
								'font-alt' => 'PT Sans Narrow',
							),
							'options' => array(
								'accent_color' => '#df421d',
								'headings_color' => '#df421d',
								'body_color' => '#7e7e7e',
								'headings_font' => 'Oswald',
								'headings_caps' => false,
								'body_font' => 'PT Sans Narrow',
							)
						),
						'velvet' => array(
							'label' => __( 'Velvet', 'timber' ),
							'preview' => array(
								'color-text' => '#ffffff',
								'background-card' => '#282828',
								'background-label' => '#000000',
								'font-main' => 'Pinyon Script',
								'font-alt' => 'Josefin Sans',
							),
							'options' => array(
								'accent_color' => '#000000',
								'headings_color' => '#000000',
								'body_color' => '#000000',
								'headings_font' => 'Pinyon Script',
								'headings_caps' => false,
								'body_font' => 'Josefin Sans',
							)
						),

					)
				),
			)
		),
		'colors_section' => array(
			'title'    => __( 'Colors', 'timber' ),
			'options' => array(
				'accent_color'   => array(
					'type'      => 'color',
					'label'     => __( 'Accent Color', 'timber' ),
					'live' => true,
					'default'   => '#ffeb00',
					'css'  => array(
						array(
							'property' => 'fill',
							'selector' => '#bar'
						),
						array(
							'property' => 'background-color',
							'selector' =>
								'.smart-link,
								.single .entry-content a,
								.page .entry-content a,
								.edit-link a,
								.author-info__link,
								.comments_add-comment,
								.comment .comment-reply-title a,
								.page-links a,
								:first-child:not(input) ~ .form-submit #submit,
								.sidebar .widget a:hover,
								.nav--main li[class*="current-menu"] > a,
								.nav--main li:hover > a,
								.highlight,
								.sticky .sticky-post,
								.nav--social a:hover:before,
								.jetpack_subscription_widget input[type="submit"],
								.widget_blog_subscription input[type="submit"],
								.search-form .search-submit,
								div#infinite-handle span:after,
								.cat-links,
								.entry-format',
						),
						array(
							'property' => 'background-color',
							'selector' => '::-moz-selection'
						),
						array(
							'property' => 'background-color',
							'selector' => '::selection'
						),
						array(
							'property' => 'border-top-color',
							'selector' => '.sticky .sticky-post:before,
								.sticky .sticky-post:after'
						)
					),
				),
				'headings_color' => array(
					'type'      => 'color',
					'label'     => __( 'Headings Color', 'timber' ),
					'live' => true,
					'default'   => '#171617',
					'css'  => array(
						array(
							'property' => 'color',
							'selector' => '.site-title a, h1, h2, h3, h4, h5, h6',
						)
					)
				),
				'body_color'     => array(
					'type'      => 'color',
					'label'     => __( 'Body Color', 'timber' ),
					'live' => true,
					'default'   => '#3d3e40',
					'css'  => array(
						array(
							'selector' => 'body',
							'property' => 'color'
						)
					)
				),
			)
		),



		/**
		 * FONTS - This section will handle different elements fonts (eg. headings, body)
		 */

		'typography_section' => array(
			'title'    => __( 'Fonts', 'timber' ),
			'options' => array(
				'headings_font' => array(
					'type'     => 'typography',
					'label'    => __( 'Headings', 'timber' ),
					'default'  => 'Oswald", sans-serif',
					'selector' => 'h1,
					.site-title,
					h2,
					h3,
					h4,
					.edit-link a,
					blockquote,
					.dropcap,
					.mfp-container,
					.entry-card .entry-image .hover,
					.entry-card .entry-title,
					.nav--main,
					.author-info__link,
					.comments-area-title .comments-title,
					.comment-reply-title .comments-title,
					.comments_add-comment,
					.comment-reply-title,
					.comment .comment-reply-title a,
					:first-child:not(input) ~ .form-submit #submit,
					.jetpack_subscription_widget input[type="submit"],
					.widget_blog_subscription input[type="submit"],
					.search-form .search-submit,
					.overlay--search .search-form,
					.overlay--search .search-field,
					.posts-navigation, #infinite-handle,
					body div.sharedaddy h3.sd-title,
					body div#jp-relatedposts h3.jp-relatedposts-headline,
					.entry-meta',
					'font_weight' => false,
					'load_all_weights' => true,
					'subsets' => true,
					'recommended' => array(
						'Oswald',
						'Lato',
						'Open Sans',
						'Exo',
						'PT Sans',
						'Ubuntu',
						'Vollkorn',
						'Lora',
						'Arvo',
						'Josefin Slab',
						'Crete Round',
						'Kreon',
						'Bubblegum Sans',
						'The Girl Next Door',
						'Pacifico',
						'Handlee',
						'Satify',
						'Pompiere'
					)
				),
				'body_font'     => array(
					'type'    => 'typography',
					'label'   => __( 'Body Text', 'timber' ),
					'default' => 'Roboto, sans-serif',
					'selector' => 'body, h5, .entry-card .entry-meta',
					'load_all_weights' => true,
					'recommended' => array(
						'Roboto',
						'Lato',
						'Open Sans',
						'PT Sans',
						'Cabin',
						'Gentium Book Basic',
						'PT Serif'
					)
				)
			)
		)

	);


	// @TODO for the momment keep it empty
	$options['sections'] = array();

	return $options;
}

add_filter( 'customify_filter_fields', 'timber_add_customify_options' );

/**
 * Get the current PixCodes configuration and check if there is something new
 */
function timber_pixcodes_setup() {

	$shortcodes = array(
		'Columns',
		'Button',
		'Icon',
		'Tabs',
		'Separator',
		'Slider',
	);

	// create an array with shortcodes which are needed by the
	// current theme
	$current_options = get_option( 'wpgrade_shortcodes_list' );
	if ( $current_options ) {
		$diff_added   = array_diff( $shortcodes, $current_options );
		$diff_removed = array_diff( $current_options, $shortcodes );
		if ( ( ! empty( $diff_added ) || ! empty( $diff_removed ) ) && is_admin() ) {
			update_option( 'wpgrade_shortcodes_list', $shortcodes );
		}
	} else { // there is no current shortcodes list
		update_option( 'wpgrade_shortcodes_list', $shortcodes );
	}

	// we need to remember the prefix of the metaboxes so it can be used
	// by the shortcodes plugin
	$current_prefix = get_option( 'wpgrade_metaboxes_prefix' );
	if ( empty( $current_prefix ) ) {
		update_option( 'wpgrade_metaboxes_prefix', '_timber_' );
	}
}

add_action( 'admin_head', 'timber_pixcodes_setup' );