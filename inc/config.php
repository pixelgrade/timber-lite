<?php
/**
 * Timber Options Config
 *
 * @package Timber
 * @since Timber 1.0
 */

/**
 * Hook into the Customify's fields and settings
 * @param $options array - Contains the plugin's options array right before they are used, so edit with care
 *
 * @return mixed
 */
if ( ! function_exists( 'timber_add_customify_options' ) ) :
	function timber_add_customify_options( $options ) {

		$options['opt-name'] = 'timber_options';

		// keep this empty now
		$options['sections'] = array();

		$options['panels'] = array(

			'style' => array(
				'title'    => __( 'Style', 'timber-lite' ),
				'sections' => array(
					/**
					 * COLORS - This section will handle different elements colors (eg. links, headings)
					 */
					'colors_section' => array(
						'title'    => __( 'Colors', 'timber-lite' ),
						'options' => array(
							'headings_color' => array(
								'type'      => 'color',
								'label'     => __( 'Headings Color', 'timber-lite' ),
								'live' => true,
								'default'   => '#171617',
								'css'  => array(
									array(
										'property' => 'color',
										'selector' => 'h1, h2, h3, h4, h5, h6, .entry-title, .entry-title a,
														.page-template-default .entry-title,
														.page-no-featured-image .entry-title,
														.portfolio__title a',
									)
								)
							),
							'body_color'     => array(
								'type'      => 'color',
								'label'     => __( 'Body Color', 'timber-lite' ),
								'live' => true,
								'default'   => '#222222',
								'css'  => array(
									array(
										'property' => 'color',
										'selector' => 'body',
									)
								)
							),
							'caption_color'     => array(
								'type'      => 'color',
								'label'     => __( 'Caption Color', 'timber-lite' ),
								'live' => true,
								'default'   => '#9B9B9B',
								'css'  => array(
									array(
										'property' => 'color',
										'selector' => '.caption, small, .site-footer--single',
									)
								)
							),
							'links_color'   => array(
								'type'      => 'color',
								'label'     => __( 'Links Color', 'timber-lite' ),
								'live' => true,
								'default'   => '#222222',
								'css'  => array(
									array(
										'property' => 'color',
										'selector' => 'a, .filter__item, .toggle, .share-box,
														.tags-links a',
									)
								),
							),
							'border_color' => array(
								'type'      => 'color',
								'label'     => __( 'Border Color', 'timber-lite' ),
								'live' => true,
								'default'   => '#171617',
								'css'  => array(
									array(
										'property' => 'border-color',
										'selector' => 'body:after',
									)
								)
							),
						)
					),
					/**
					 * FONTS - This section will handle different elements fonts (eg. headings, body)
					 */
					'typography_section' => array(
						'title'    => __( 'Fonts', 'timber-lite' ),
						'options' => array(
							'headings_font' => array(
								'type'     => 'typography',
								'label'    => __( 'Headings', 'timber-lite' ),
								'default'  => 'Ek Mukta',
								'selector' => 'h1, h2, h3, h4, h5, h6, .entry-title, .entry-title a,
												.project-slide__content h1, .vertical-title span,
												.page-template-default .entry-title,
												.page-no-featured-image .entry-title,
												.portfolio__title a',
								'font_weight' => false,
								'load_all_weights' => true,
								'subsets' => true,
								'recommended' => array(
									'Ek Mukta',
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
							'headings_caps' => array(
								'type'	=> 'checkbox',
								'default' => true,
								'label' => __( 'Capitalize Headings', 'timber-lite' ),
								'css'	=> array(
									array(
										'property' => 'text-transform',
										'selector' => 'h1, .site-title, h2, h4, h5',
										'callback_filter' => 'timber_capitalize_headings'
									),
								)
							),
							'body_font'     => array(
								'type'    => 'typography',
								'label'   => __( 'Body Text', 'timber-lite' ),
								'default' => 'Ek Mukta',
								'selector' => 'body',
								'load_all_weights' => true,
								'recommended' => array(
									'Ek Mukta',
									'Roboto',
									'Lato',
									'Open Sans',
									'PT Sans',
									'Cabin',
									'Gentium Book Basic',
									'PT Serif'
								)
							),
							'caption_font'     => array(
								'type'    => 'typography',
								'label'   => __( 'Caption Text', 'timber-lite' ),
								'default' => 'Libre Baskerville',
								'selector' => '.caption, small',
								'recommended' => array(
									'Libre Baskerville',
									'Roboto',
									'Lato',
									'Open Sans',
									'PT Sans',
									'Cabin',
									'Gentium Book Basic',
									'PT Serif'
								)
							),
							'nav_font'     => array(
								'type'    => 'typography',
								'label'   => __( 'Navigation Text', 'timber-lite' ),
								'default' => 'Ek Mukta',
								'selector' => '.main-navigation',
								'recommended' => array(
									'Ek Mukta',
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
					),

					/**
					 * SIZING AND SPACING - This section will handle different elements colors (eg. links, headings)
					 */
					'sizes_section' => array(
						'title'    => __( 'Sizes and Spacings', 'timber-lite' ),
						'options' => array(
							'logo_height'   => array(
								'type'      => 'range',
								'label'     => __( 'Logo Height', 'timber-lite' ),
								 'input_attrs' => array(
							        'min'   => 20,
							        'max'   => 240,
							        'step'  => 1,
							    ),
								'live' => true,
								'default'   => 40,
								'css'  => array(
									array(
										'property' => 'max-height',
										'selector' => '.custom-logo-link img',
									)
								),
							),
							'filmstrip_spacing'   => array(
								'type'      => 'range',
								'label'     => __( 'Filmstrip Images Spacing', 'timber-lite' ),
								 'input_attrs' => array(
							        'min'   => 0,
							        'max'   => 100,
							        'step'  => 1,
							    ),
								'live' => true,
								'default'   => 10,
								'css'  => array(
									array(
										'property' => 'margin-right',
										'unit'	=> 'px',
										'selector' => '.portfolio__item',
									)
								),
							),
						)
					),
				)
			),

			'theme_options' => array(
				'title'    => __( 'Theme Options', 'timber-lite' ),
				'sections' => array(
					'general' => array (
						'title'    => __( 'General', 'timber-lite' ),
						'options' => array(
							'footer_copyright' => array(
								'type'     => 'textarea',
								'label'             => esc_html__( 'Copyright Text', 'timber-lite' ),
								'desc'              => esc_html__( 'Set the text that will appear in the footer area. Use %year% to display the current year.', 'timber-lite' ),
								'default'           => sprintf( esc_html__( '%%year%% &copy; Handcrafted with love by the %1$s Team', 'timber-lite' ), '&nbsp;<a href="https://pixelgrade.com/" rel="designer">Pixelgrade</a>&nbsp;' ),
								'sanitize_callback' => 'wp_kses_post',
								'live' => array( '.site-info' )
							),

							'custom_js' => array(
								'type'     => 'ace_editor',
								'label'    => __( 'Custom JavaScript (header)', 'timber-lite' ),
								'desc' => __( 'Enter your custom Javascript code. This code will be loaded in the head section of your pages.', 'timber-lite' ),
								'editor_type'     => 'javascript',
							),
							'custom_js_footer' => array(
								'type'     => 'ace_editor',
								'label'    => __( 'Custom JavaScript (footer)', 'timber-lite' ),
								'desc' => __( 'This javascript code will be loaded in the footer.', 'timber-lite' ),
								'editor_type'     => 'javascript',
							),
						)
					),

					'share_settings' => array(
						'title'    => __( 'Share Settings', 'timber-lite' ),
						'options' => array(
							'show_share_links' => array(
								'type'	=> 'checkbox',
								'default' => true,
								'label' => __( 'Show Share Links', 'timber-lite' ),
							),
							'share_buttons_settings' => array(
								'type'	=> 'text',
								'default' => 'preferred,preferred,preferred,preferred,more',
								'label' => __( 'Share Services', 'timber-lite' ),
								'desc' => __( 'Add here the share services you want to use, single comma delimited (no spaces). You can find the full list of services here: http://www.addthis.com/services/list. Also you can use the more tag to show the plus sign and the counter tag to show a global share counter.', 'timber-lite' ),
							),
						),
					),
				),
			),
		);

		return $options;
	}
endif;

add_filter( 'customify_filter_fields', 'timber_add_customify_options' );

function timber_capitalize_headings( $value, $selector, $property, $unit ) {

	$result = $value ? 'uppercase' : 'none';

	$output = $selector .'{
		text-transform: ' . $result . ";\n" .
	"}\n";

	return $output;
}
