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
//					'presets_section' => array(
//						'title'    => __( 'Style Presets', 'timber-lite' ),
//						'options' => array(
//							'theme_style'   => array(
//								'type'      => 'preset',
//								'label'     => __( 'Select a style:', 'timber-lite' ),
//								'desc' => __( 'Conveniently change the design of your site with built-in style presets. Easy as pie.', 'timber-lite' ),
//								'default'   => 'timber-lite',
//								'choices_type' => 'awesome',
//								'choices'  => array(
//									'timber-lite' => array(
//										'label' => __( 'Patch', 'timber-lite' ),
//										'preview' => array(
//											'color-text' => '#ffffff',
//											'background-card' => '#121012',
//											'background-label' => '#fee900',
//											'font-main' => 'Oswald',
//											'font-alt' => 'Roboto',
//										),
//										'options' => array(
//											'accent_color' => '#ffeb00',
//											'headings_color' => '#171617',
//											'body_color' => '#3d3e40',
//											'headings_font' => 'Oswald',
//											'headings_caps' => true,
//											'body_font' => 'Roboto',
//										)
//									),
//
//
//									'adler' => array(
//										'label' => __( 'Adler', 'timber-lite' ),
//										'preview' => array(
//											'color-text' => '#fff',
//											'background-card' => '#0e364f',
//											'background-label' => '#000000',
//											'font-main' => 'Permanent Marker',
//											'font-alt' => 'Droid Sans Mono',
//										),
//										'options' => array(
//											'accent_color' => '#68f3c8',
//											'headings_color' => '#0e364f',
//											'body_color' => '#45525a',
//											'headings_font' => 'Permanent Marker',
//											'headings_caps' => true,
//											'body_font' => 'Droid Sans Mono'
//										)
//									),
//
//									'royal' => array(
//										'label' => __( 'Royal', 'timber-lite' ),
//										'preview' => array(
//											'color-text' => '#ffffff',
//											'background-card' => '#615375',
//											'background-label' => '#46414c',
//											'font-main' => 'Abril Fatface',
//											'font-alt' => 'PT Serif',
//										),
//										'options' => array(
//											'accent_color' => '#8eb2c5',
//											'headings_color' => '#725c92',
//											'body_color' => '#6f8089',
//											'headings_font' => 'Abril Fatface',
//											'headings_caps' => false,
//											'body_font' => 'PT Serif',
//										)
//									),
//
//									'queen' => array(
//										'label' => __( 'Queen', 'timber-lite' ),
//										'preview' => array(
//											'color-text' => '#fbedec',
//											'background-card' => '#a33b61',
//											'background-label' => '#41212a',
//											'font-main' => 'Playfair Display',
//											'font-alt' => 'Merriweather',
//										),
//										'options' => array(
//											'accent_color' => '#c17390',
//											'headings_color' => '#a33b61',
//											'body_color' => '#403b3c',
//											'headings_font' => 'Playfair Display',
//											'headings_caps' => false,
//											'body_font' => 'Merriweather',
//										)
//									),
//									'carrot' => array(
//										'label' => __( 'Carrot', 'timber-lite' ),
//										'preview' => array(
//											'color-text' => '#ffffff',
//											'background-card' => '#df421d',
//											'background-label' => '#85210a',
//											'font-main' => 'Oswald',
//											'font-alt' => 'PT Sans Narrow',
//										),
//										'options' => array(
//											'accent_color' => '#df421d',
//											'headings_color' => '#df421d',
//											'body_color' => '#7e7e7e',
//											'headings_font' => 'Oswald',
//											'headings_caps' => false,
//											'body_font' => 'PT Sans Narrow',
//										)
//									),
//									'velvet' => array(
//										'label' => __( 'Velvet', 'timber-lite' ),
//										'preview' => array(
//											'color-text' => '#ffffff',
//											'background-card' => '#282828',
//											'background-label' => '#000000',
//											'font-main' => 'Pinyon Script',
//											'font-alt' => 'Josefin Sans',
//										),
//										'options' => array(
//											'accent_color' => '#000000',
//											'headings_color' => '#000000',
//											'body_color' => '#000000',
//											'headings_font' => 'Pinyon Script',
//											'headings_caps' => false,
//											'body_font' => 'Josefin Sans',
//										)
//									),
//
//								)
//							),
//						)
//					),
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
							// 'spacing_header'   => array(
							// 	'type'      => 'range',
							// 	'label'     => __( 'Header Spacing', 'timber-lite' ),
							// 	 'input_attrs' => array(
							//         'min'   => 0,
							//         'max'   => 100,
							//         'step'  => 10,
							//     ),
							// 	'live' => true,
							// 	'default'   => 50,
							// 	'css'  => array(
							// 		array(
							// 			'property' => 'padding-top',
							// 			'selector' => '.site-header .bar--fixed',
							// 		),
							// 		array(
							// 			'property' => 'padding-bottom',
							// 			'selector' => '.site-header .bar--fixed',
							// 		)
							// 	),
							// ),
							// 'spacing_footer'   => array(
							// 	'type'      => 'range',
							// 	'label'     => __( 'Footer Spacing', 'timber-lite' ),
							// 	 'input_attrs' => array(
							//         'min'   => 0,
							//         'max'   => 100,
							//         'step'  => 10,
							//     ),
							// 	'live' => true,
							// 	'default'   => 0,
							// 	'css'  => array(
							// 		array(
							// 			'property' => 'padding-top',
							// 			'selector' => '.site-footer .bar--fixed',
							// 		),
							// 		array(
							// 			'property' => 'padding-bottom',
							// 			'selector' => '.site-footer .bar--fixed',
							// 		)
							// 	),
							// ),
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
//							'use_smooth_scroll' => array(
//								'type'     => 'checkbox',
//								'label'    => __( 'Smooth Scrolling', 'timber-lite' ),
//								'desc' => __( 'Enable / Disable smooth scrolling.', 'timber-lite' ),
//								'default'  => true
//							),
//							'use_ajax_loading' => array(
//								'type'     => 'checkbox',
//								'label'    => __( 'AJAX Loading', 'timber-lite' ),
//								'desc' => __( 'Enable / Disable dynamic page content loading using AJAX.', 'timber-lite' ),
//								'default'  => true
//							),

//							'hide_portfolio_page_content' => array(
//								'type'     => 'checkbox',
//								'label'    => __( 'Hide title and content on Portfolio Page Template.', 'timber-lite' ),
//								'default'  => false,
//							),

//							'disable_search_in_social_menu' => array(
//								'type'     => 'checkbox',
//								'label'    => __( 'Hide search button in Social Menu.', 'timber-lite' ),
//								'default'  => false,
//							),

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
