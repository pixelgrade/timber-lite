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

//	wp_enqueue_script('wp-ajax-response');
//	var_dump( wp_script_is('wp-ajax-response' ) );
	wp_enqueue_script( 'timber_customizer_preview', get_template_directory_uri() . '/assets/js/admin/customizer_preview.js', array( 'customize-preview' ), '20130508', true );
}
add_action( 'customize_preview_init', 'timber_customize_preview_js' );



/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function timber_load_customize_js() {

//	wp_enqueue_script('wp-ajax-response');

	wp_enqueue_script( 'timber_customizer', get_template_directory_uri() . '/assets/js/admin/customizer.js', array( 'wp-ajax-response' ), '20130508', true );
}
add_action( 'customize_controls_enqueue_scripts', 'timber_load_customize_js' );

// "One-Click import for demo data" feature
// ----------------------------------------

// @todo CLEANUP refactor function names

/**
 * Imports the demo data from the demo_data.xml file
 */
if ( ! function_exists( 'wpGrade_ajax_import_posts_pages' ) ) {
	function wpGrade_ajax_import_posts_pages() {
		// initialize the step importing
		$stepNumber    = 1;
		$numberOfSteps = 1;

		// get the data sent by the ajax call regarding the current step
		// and total number of steps
		if ( ! empty( $_REQUEST['step_number'] ) ) {
			$stepNumber = $_REQUEST['step_number'];
		}

		if ( ! empty( $_REQUEST['number_of_steps'] ) ) {
			$numberOfSteps = $_REQUEST['number_of_steps'];
		}

		$response = array(
			'what'         => 'import_posts_pages',
			'action'       => 'import_submit',
			'id'           => 'true',
			'supplemental' => array(
				'stepNumber'    => $stepNumber,
				'numberOfSteps' => $numberOfSteps,
			)
		);


		if ( ! defined( 'WP_LOAD_IMPORTERS' ) ) {
			define( 'WP_LOAD_IMPORTERS', true );
		}

		// Load Importer API file
		require_once ABSPATH . 'wp-admin/includes/import.php';
		//no errors yet :)
		$wpGrade_importerError = false;
		//the path to the demo files including the file name without the extension
		$import_filepath = get_template_directory() . '/inc/import/demo-data/demo_data';

		//check if wp_importer, the base importer class is available, otherwise include it
		if ( ! class_exists( 'WP_Importer' ) ) {
			$class_wp_importer = ABSPATH . 'wp-admin/includes/class-wp-importer.php';
			if ( file_exists( $class_wp_importer ) ) {
				require_once( $class_wp_importer );
			} else {
				$wpGrade_importerError = true;
			}
		}

		//check if the wp import class is available, this class handles the wordpress XML files. If not, include it
		if ( ! class_exists( 'WPGrade_WP_Import' ) ) {
			$class_wp_import = get_template_directory() . '/inc/import/wordpress-importer/wordpress-importer.php';
			if ( file_exists( $class_wp_import ) ) {
				require_once( $class_wp_import );
			} else {
				$wpGrade_importerError = true;
			}
		}

		if ( $wpGrade_importerError !== false ) {
			$response['id'] = new WP_Error( 'import_posts_pages_noscript', 'The Auto importing script could not be loaded. Please use the <a href="' . admin_url( 'import.php' ) . '">WordPress default import</a> and import the .XML file provided in the archive you\'ve received on purchase manually.' );
		} else {
			if ( class_exists( 'WPGrade_WP_Import' ) ) {
				include_once( 'import/wordpress-importer/wpgrade-import-class.php' );
			}
			if ( ! is_file( $import_filepath . '.xml' ) ) {
				$response['id'] = new WP_Error( 'import_posts_pages_nofile', 'The XML file containing the demo data could not be found or could not be read in <pre>' . get_template_directory() . 'inc/import/demo-data' . '</pre><br/> You might want to try to set the file permission to 777.<br/>If this doesn\'t work please use the <a href="' . admin_url( 'import.php' ) . '">WordPress default import</a> and import the .XML file provided in the archive you\'ve received on purchase manually.' );
			} else {
				ob_start();
				$wp_import                    = new wpGrade_import();
				$wp_import->fetch_attachments = true;
				$response['id']               = $wp_import->import_posts_pages( $import_filepath . '.xml', $response['supplemental']['stepNumber'], $response['supplemental']['numberOfSteps'] );
				//after the last step we assign the menus to the proper locations
				if ( $response['supplemental']['stepNumber'] == $response['supplemental']['numberOfSteps'] ) {
					$wp_import->set_menus();
				}
				$response['data'] = ob_get_contents();
				ob_end_clean();
			}
		}

		$response = new WP_Ajax_Response( $response );
		$response->send();
	}

	// hook into wordpress admin.php
	add_action( 'wp_ajax_wpGrade_ajax_import_posts_pages', 'wpGrade_ajax_import_posts_pages' );
}

/**
 * Imports the theme options from the demo_data.php file
 */
if ( ! function_exists( 'wpGrade_ajax_import_theme_options' ) ) {
	function wpGrade_ajax_import_theme_options() {
		$response = array(
			'what'   => 'import_theme_options',
			'action' => 'import_submit',
			'id'     => 'true',
		);

		// check if user is allowed to save and if its his intention with
		// a nonce check
		if ( function_exists( 'check_ajax_referer' ) ) {
			check_ajax_referer( 'wpGrade_nonce_import_demo_theme_options' );
		}
		require_once ( get_template_directory() . '/inc/import/import-demo-theme-options' . EXT );

		$response = new WP_Ajax_Response( $response );
		$response->send();
	}

	// hook into wordpress admin.php
	add_action( 'wp_ajax_wpGrade_ajax_import_theme_options', 'wpGrade_ajax_import_theme_options' );
}

/**
 * This function imports the widgets from the demo_data.php file and the menus
 */
if ( ! function_exists( 'wpGrade_ajax_import_widgets' ) ) {
	function wpGrade_ajax_import_widgets() {
		$response = array(
			'what'   => 'import_widgets',
			'action' => 'import_submit',
			'id'     => 'true',
		);

		// check if user is allowed to save and if its his intention with
		// a nonce check
		if ( function_exists( 'check_ajax_referer' ) ) {
			check_ajax_referer( 'wpGrade_nonce_import_demo_widgets' );
		}

		require_once (get_template_directory() . '/inc/import/import-demo-widgets' . EXT );

		$response = new WP_Ajax_Response( $response );
		$response->send();
	}

	//hook into wordpress admin.php
	add_action( 'wp_ajax_wpGrade_ajax_import_widgets', 'wpGrade_ajax_import_widgets' );
}

