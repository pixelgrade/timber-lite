<?php
/**
 * Timber Theme Customizer
 *
 * @package Timber
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function timber_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';

	// Rename the label to "Display Site Title & Tagline" in order to make this option clearer.
	$wp_customize->get_control( 'display_header_text' )->label = __( 'Display Site Title &amp; Tagline', 'timber' );

	/*
	 * Add custom settings
	 */

	$wp_customize->add_section( 'timber_theme_options', array(
		'title'             => __( 'Theme Options', 'timber' ),
		'priority'          => 30,
	) );

	$wp_customize->add_setting( 'timber_hide_portfolio_page_content', array(
		'default' => '',
		'sanitize_callback' => 'timber_sanitize_checkbox',
	) );

	$wp_customize->add_control( 'timber_hide_portfolio_page_content', array(
		'label'   => __( 'Hide title and content on Portfolio Page Template', 'timber' ),
		'section' => 'timber_theme_options',
		'type'    => 'checkbox',
	) );

	$wp_customize->add_setting( 'timber_disable_search_in_social_menu', array(
		'default'           => '',
		'sanitize_callback' => 'timber_sanitize_checkbox',
	) );

	$wp_customize->add_control( 'timber_disable_search_in_social_menu', array(
		'label'             => __( 'Hide search button in Social Menu.', 'timber' ),
		'section'           => 'timber_theme_options',
		'type'              => 'checkbox',
	) );

	$wp_customize->add_setting( 'timber_footer_copyright', array(
		'default'           => '',
		'sanitize_callback' => 'wp_kses_post',
	) );

	$wp_customize->add_control( 'timber_footer_copyright', array(
		'label'             => __( 'Additional Copyright Text', 'timber' ),
		'description' => '',
		'section'           => 'timber_theme_options',
		'type'              => 'text',
	) );
}
add_action( 'customize_register', 'timber_customize_register' );

/**
 * Sanitize the checkbox.
 *
 * @param boolean $input.
 * @return boolean true if is 1 or '1', false if anything else
 */
function timber_sanitize_checkbox( $input ) {
	if ( 1 == $input ) {
		return true;
	} else {
		return false;
	}
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function timber_customize_preview_js() {
	wp_enqueue_script( 'timber_customizer', get_template_directory_uri() . '/assets/js/admin/customizer.js', array( 'customize-preview' ), '20130508', true );
}
add_action( 'customize_preview_init', 'timber_customize_preview_js' );
