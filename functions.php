<?php
/**
 * Timber functions and definitions
 *
 * @package Timber
 */

if ( ! function_exists( 'timber_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function timber_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on Timber, use a find and replace
	 * to change 'timber' to the name of your theme in all the template files
	 */
	load_theme_textdomain( 'timber', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary Menu', 'timber' ),
		'social' => esc_html__( 'Social Menu', 'timber' )
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 * See http://codex.wordpress.org/Post_Formats
	 */
	add_theme_support( 'post-formats', array(
		'aside',
		'image',
		'video',
		'quote',
		'link',
	) );

	/*
	 * Add editor custom style to make it look more like the frontend
	 * Also enqueue the custom Google Fonts also
	 */
	add_editor_style( array( 'editor-style.css', timber_fonts_url() ) );
}
endif; // timber_setup
add_action( 'after_setup_theme', 'timber_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *x
 * @global int $content_width
 */
function timber_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'timber_content_width', 1200 );
}
add_action( 'after_setup_theme', 'timber_content_width', 0 );

/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function timber_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'timber' ),
		'id'            => 'sidebar-1',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
}
add_action( 'widgets_init', 'timber_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function timber_scripts() {

	// Main Style - we use this path instead of get_stylesheet_uri() so a child theme can extend this not override it.
	wp_enqueue_style( 'timber-style', get_template_directory_uri() . '/style.css' );

	wp_enqueue_script( 'timber-scripts', get_stylesheet_directory_uri() . '/assets/js/main.js', array(
		'jquery',
	), '1.0.0', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	if ( is_singular() && timber_get_option( 'show_share_links' ) ) {
		wp_enqueue_script( 'addthis-api' , '//s7.addthis.com/js/250/addthis_widget.js#async=1', array( 'jquery' ), '1.0.0', true );
	}
}
add_action( 'wp_enqueue_scripts', 'timber_scripts' );

/**
 * Load theme's configuration file.
 */
require get_template_directory() . '/inc/config.php';

/**
 * And all the activation hooks.
 */
require get_template_directory() . '/inc/activation.php';

 /**
 * Add the global AddThis configuration in the <head>
 */
function timber_setup_addthis() {
	if ( is_singular() && timber_get_option( 'show_share_links' ) ) {
		//here we will configure the AddThis sharing globally
		get_template_part( 'inc/addthis/addthis-js-config' );
	}
}
add_action( 'wp_head', 'timber_setup_addthis' );

/**
 * MB string functions for when the MB library is not available
 */
require get_template_directory() . '/inc/mb_compat.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Recommended/Required plugins notification
 */
require get_template_directory() . '/inc/required-plugins/required-plugins.php';

/**
 * Load the theme update logic
 */
require_once( get_template_directory() . '/inc/wp-updates-theme.php');
new WPUpdatesThemeUpdater_1447( 'http://wp-updates.com/api/2/theme', basename( get_template_directory() ) );
