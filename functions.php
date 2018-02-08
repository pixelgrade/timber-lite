<?php
/**
 * Timber functions and definitions
 *
 * @package Timber
 * @since Timber 1.0
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

		add_theme_support( 'custom-logo'  );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
		 */
		add_theme_support( 'post-thumbnails' );

		//used for the small images of projects
		add_image_size( 'timber-small-image', 400, 9999, false );

		//used for the large images of projects
		add_image_size( 'timber-large-image', 1920, 9999, false );

		// Used for single project full view
		add_image_size( 'timber-fullview-image', 2560, 2560, false );

		//used for blog archive
		add_image_size( 'timber-square-image', 350, 350, true );

		// This theme uses wp_nav_menu() in two locations.
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

		/**
		 * Enable support for Post Formats.
		 * See http://codex.wordpress.org/Post_Formats
		 */
		add_theme_support( 'post-formats', array(
			'aside',
			'image',
			'gallery',
			'video',
			'audio',
			'quote',
			'link',
		) );

		// custom javascript handlers - make sure it is the last one added
		add_action( 'wp_head', 'timber_load_custom_js_header', 999 );
		add_action( 'wp_footer', 'timber_load_custom_js_footer', 999 );

		/**
		 * Enable Woocommerce support
		 * See http://docs.woothemes.com/document/third-party-custom-theme-compatibility/
		 */
		add_theme_support( 'woocommerce' );

		add_filter( 'attachment_link', 'timber_filter_attachment_links_on_singles', 2, 2 );

		/**
		 * Pixcare Helper Plugin
		 */
		add_theme_support( 'pixelgrade_care', array(
				'support_url'   => 'https://pixelgrade.com/docs/timber/',
				'changelog_url' => 'https://wupdates.com/timber-changelog',
				'ock'           => 'Lm12n034gL19',
				'ocs'           => '6AU8WKBK1yZRDerL57ObzDPM7SGWRp21Csi5Ti5LdVNG9MbP'
			)
		);
	}
endif; // timber_setup
add_action( 'after_setup_theme', 'timber_setup' );

/**
 * We need to force ajax off attachment links on posts and pages since it is a chance to trigger a modal opening
 * and an ajax call
 * @param $link
 * @param $id
 *
 * @return string
 */
function timber_filter_attachment_links_on_singles( $link, $id  ){
	if ( wp_attachment_is_image( $id ) && ( is_singular( 'post' ) || is_page()) ) {
		return $link . '#';
	}
	return $link;
}


/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *x
 * @global int $content_width
 */
function timber_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'timber_content_width', 2570 );
}
add_action( 'after_setup_theme', 'timber_content_width', 0 );

/*
 * Disable comments for the Portfolio CPT
 */
function timber_remove_custom_post_comment() {
	remove_post_type_support( 'jetpack-portfolio', 'comments' );
}
add_action( 'init', 'timber_remove_custom_post_comment' );

/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function timber_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Overlay — Left Sidebar (1/4)', 'timber' ),
		'id'            => 'overlay-widget-area-1',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h4 class="widget-title">',
		'after_title'   => '</h4>',
	) );

	register_sidebar( array(
		'name'          => esc_html__( 'Overlay — Right Sidebar (1/4)', 'timber' ),
		'id'            => 'overlay-widget-area-2',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h4 class="widget-title">',
		'after_title'   => '</h4>',
	) );

	register_sidebar( array(
		'name'          => esc_html__( 'Overlay — Content (2/4)', 'timber' ),
		'id'            => 'overlay-widget-area-3',
		'description'   => 'Add a full-height photo using the Profile Image widget.',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h4 class="widget-title">',
		'after_title'   => '</h4>',
	) );
}
add_action( 'widgets_init', 'timber_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function timber_scripts_styles() {

	$theme_data = wp_get_theme();

	$dependencies = array( 'jquery', 'wp-mediaelement' );

	// Main Style - we use this path instead of get_stylesheet_uri() so a child theme can extend this not override it.
	wp_enqueue_style( 'timber-style', get_template_directory_uri() . '/style.css', array( 'wp-mediaelement' ), $theme_data->get( 'Version' ) );


	// if the woocommerce user wants prettyPhoto, here is the only way it will work.
	if ( ! function_exists( 'is_plugin_active' ) ) {
		include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
	}

	if ( is_plugin_active( 'woocommerce/woocommerce.php' ) && 'yes' == get_option( 'woocommerce_enable_lightbox' ) && file_exists( WP_PLUGIN_DIR . '/woocommerce/assets/css/prettyPhoto.css' ) ) {
		$woo_asssets_url = plugins_url( '/woocommerce/assets/', WP_PLUGIN_DIR . '/' );
		$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		wp_enqueue_style( 'woocommerce_prettyPhoto_css', $woo_asssets_url . 'css/prettyPhoto.css' );
		wp_enqueue_script( 'prettyPhoto-init', $woo_asssets_url . 'js/prettyPhoto/jquery.prettyPhoto.init' . $suffix . '.js', array( 'jquery','prettyPhoto' ) );
		wp_enqueue_script( 'prettyPhoto', $woo_asssets_url . 'js/prettyPhoto/jquery.prettyPhoto' . $suffix . '.js', array( 'jquery' ), '3.1.6', true );

	}

	if ( is_plugin_active( 'woocommerce/woocommerce.php' ) ) {
		$dependencies[] = 'wp-util';
    }

	wp_enqueue_script( 'modernizr', get_template_directory_uri() . '/assets/js/plugins/modernizr.min.js', array( 'jquery' ), '3.3.1' );
	$dependencies[] = 'modernizr';
	wp_enqueue_script( 'tween-max', '//cdnjs.cloudflare.com/ajax/libs/gsap/1.18.5/TweenMax.min.js', array( 'jquery' ) );
	$dependencies[] = 'tween-max';
	wp_enqueue_script( 'scroll-to-plugin', '//cdnjs.cloudflare.com/ajax/libs/gsap/1.18.5/plugins/ScrollToPlugin.min.js', array( 'jquery' ) );
	$dependencies[] = 'scroll-to-plugin';
	wp_enqueue_script( 'timber-rs', '//pxgcdn.com/js/rs/9.5.7/index.js', array( 'jquery' ) );
	$dependencies[] = 'timber-rs';
	wp_enqueue_script( 'timber-mix', '//pxgcdn.com/js/mixitup/2.1.11/index.js', array( 'jquery' ) );
	$dependencies[] = 'timber-mix';
	wp_register_script( 'timber-scripts', get_template_directory_uri() . '/assets/js/main.js', $dependencies, $theme_data->get( 'Version' ), true );
	
	// Localize the script with new data
	$translation_array = array
	(
		'tPrev' => __('Previous (Left arrow key)', 'timber'),
		'tNext' => __('Next (Right arrow key)', 'timber'),
		'tCounter' => __('of', 'timber'),
		'infscrLoadingText' => __("<em>Loading more...</em>", 'timber'),
		'infscrReachedEnd' => __("<em>Nothing left to load.</em>", 'timber'),
	);

	wp_localize_script( 'timber-scripts', 'objectl10n', $translation_array );

	wp_localize_script( 'timber-scripts', 'timber_ajax', array(
		'ajax_url' => admin_url('admin-ajax.php'),
		'nonce' => wp_create_nonce( 'timber_ajax' ),
		'posts_number' => get_option( 'posts_per_page' ),
	) );

	// Enqueued script with localized data.
	wp_enqueue_script( 'timber-scripts' );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	if ( is_singular() && pixelgrade_option( 'show_share_links' ) ) {
		wp_enqueue_script( 'addthis-api' , '//s7.addthis.com/js/250/addthis_widget.js#async=1', array( 'jquery' ), '1.0.0', true );
	}

	wp_enqueue_script('mousewheel' , get_template_directory_uri() . '/assets/js/plugins/jquery.mousewheel.min.js', array('jquery'), '3.1.13', true );

	// For back to top link
	global $timber_show_footer;

	$timber_show_footer = false;
	if ( ! (get_post_type() == 'proof_gallery') && ! timber_post_is_project() && ( is_page() || is_single() ) ) {
		$timber_show_footer = true;
		$this_template = basename( get_page_template() );

		if ( is_page() && $this_template  === 'custom-portfolio-page.php' ) {
			$custom_portfolio_page_type = get_post_meta( timber_get_post_id(), 'custom_portfolio_page_type', true);

			if ( $custom_portfolio_page_type === 'project_slider' ) {
				$timber_show_footer = false;
			}
		}
	}

	// if jetpack's carousel is enabled, enqueue the scripts in root
	// this way the assets will get registered with the proper root url
	if ( class_exists( 'Jetpack_Carousel' ) ) {
		// Create new carousel so we can use the enqueue_assets() method. Not ideal, but there is a decent amount
		// of logic in that method that shouldn't be duplicated.
		$carousel = new Jetpack_Carousel();

		// First parameter is $output, which comes from filters, and causes bypass of the asset enqueuing. Passing null is correct.
		$carousel->enqueue_assets( null );
	}
	add_filter( 'jp_carousel_force_enable', true );

}
add_action( 'wp_enqueue_scripts', 'timber_scripts_styles' );

/*
 * Enqueue some custom JS in the admin area for various small tasks
 */
add_action('admin_enqueue_scripts','timber_add_admin_page_scripts');
function timber_add_admin_page_scripts( $hook ){

	wp_enqueue_script(
		'timber_admin_custom_js', //unique handle
		get_template_directory_uri().'/assets/js/admin/admin.js', //location
		array('jquery') //dependencies
	);
}

/// add custom css to the new-project admin page
add_action('admin_head','timber_add_new_project_admin_style');
function timber_add_new_project_admin_style( $hook ){
	global $typenow;

	if ( 'jetpack-portfolio' === $typenow ) {

$output = '
<style>

.collection-settings {
	display: none;
}

</style>';

		echo $output;
	}
}

function timber_add_new_project_admin_editor_style() {
	global $typenow;

	if ( 'jetpack-portfolio' === $typenow ) {
		add_editor_style( 'project-editor-style.css' );
	}
}
add_action( 'admin_init', 'timber_add_new_project_admin_editor_style' );

/**
 * Load custom javascript set by theme options
 * This method is invoked by wpgrade_callback_themesetup
 * The function is executed on wp_enqueue_scripts
 */
function timber_load_custom_js_header() {
	$custom_js = pixelgrade_option( 'custom_js' );
	if ( ! empty( $custom_js ) ) {
		//first lets test is the js code is clean or has <script> tags and such
		//if we have <script> tags than we will not enclose it in anything - raw output
		if ( strpos( $custom_js, '</script>' ) !== false ) {
			echo $custom_js . "\n";
		} else {
			echo "<script type=\"text/javascript\">\n;(function($){\n" . $custom_js . "\n})(jQuery);\n</script>\n";
		}
	}
}

function timber_load_custom_js_footer() {
	$custom_js = pixelgrade_option( 'custom_js_footer' );
	if ( ! empty( $custom_js ) ) {
		//first lets test is the js code is clean or has <script> tags and such
		//if we have <script> tags than we will not enclose it in anything - raw output
		if ( strpos( $custom_js, '</script>' ) !== false ) {
			echo $custom_js . "\n";
		} else {
			echo "<script type=\"text/javascript\">\n;(function($){\n" . $custom_js . "\n})(jQuery);\n</script>\n";
		}
	}
}

/**
 * Get an array with all queued scripts
 *
 * @return array
 */
function timber_get_queued_scripts() {
	global $wp_scripts;

	$loading_scripts = array();
	foreach ( $wp_scripts->queue as $key => $handle ) {
		if ( strpos( $wp_scripts->registered[ $handle ]->src, 'http' ) === false && strpos( $wp_scripts->registered[ $handle ]->src, '//' ) !== 0 ) {
			$loading_scripts[ $handle ]['src'] = site_url() . $wp_scripts->registered[ $handle ]->src;
		} else {
			$loading_scripts[ $handle ]['src'] = $wp_scripts->registered[ $handle ]->src;
		}

		if ( isset( $wp_scripts->registered[ $handle ]->extra ) && isset( $wp_scripts->registered[ $handle ]->extra['data'] )){
			$loading_scripts[ $handle ]['data'] = $wp_scripts->registered[ $handle ]->extra['data'];
		}
	}
	return $loading_scripts;
}

/**
 * Get an array with all queued styles
 *
 * @return array
 */
function timber_get_queued_styles() {
	global $wp_styles;

	$loading_styles = array();
	foreach ( $wp_styles->queue as $key => $handle ) {
		if ( strpos( $wp_styles->registered[ $handle ]->src, 'http' ) === false && strpos( $wp_styles->registered[ $handle ]->src, '//' ) !== 0 ) {
			$loading_styles[ $handle ] = site_url() . $wp_styles->registered[ $handle ]->src;
		} else {
			$loading_styles[ $handle ] = $wp_styles->registered[ $handle ]->src;
		}
	}
	return $loading_styles;
}

add_action( 'wp_enqueue_scripts', 'timber_localize_scripts_and_styles', 999999999 );
/**
 * Localize a static list with resources already loaded on the first page load this lists will be filled on
 * each d-jax request which has new resources
 *
 * Note: make this dependent to timber-scripts because we know for sure it is there
 */
function timber_localize_scripts_and_styles() {
	wp_localize_script( 'timber-scripts', 'timber_static_resources', array(
		'scripts' => timber_get_queued_scripts(),
		'styles'  => timber_get_queued_styles()
	) );
}

add_action('wp_footer', 'timber_last_function', 999999999);

function timber_last_function(){
	/**
	 * Display dynamic generated data while runing d-jax requests :
	 *
	 * a script which will load others scripts on the run
	 */
	$dynamic_scripts = timber_get_queued_scripts();
	$dynamic_styles  = timber_get_queued_styles();?>
	<div id="djax_list_scripts_and_styles">
		<script id="timber_list_scripts_and_styles"  class="djax-updatable">
			(function ($) {
				// wait for all dom elements
				$(document).ready(function () {
					var globalDebug = false;
					// run this only if we have resources
					if (!window.hasOwnProperty('timber_static_resources')) return;
					window.timber_dynamic_loaded_scripts = <?php echo json_encode( $dynamic_scripts ); ?>;
					window.timber_dynamic_loaded_styles = <?php echo json_encode( $dynamic_styles ); ?>;

					// timber_dynamic_loaded_scripts is generated in footer when all the scripts should be already enqueued
					$.each( window.timber_dynamic_loaded_scripts, function (key, data) {

						if (key in timber_static_resources.scripts) return;

						var url = data['src'];
						// add this script to our global stack so we don't enqueue it again
						timber_static_resources.scripts[key] = url;

						// if this script has localized content, we need to ensure that it's presence in page
						if ( typeof data['data'] !== "undefined" && data['data'].indexOf('=')  > 0 ) {

							var object_name_start = data['data'].indexOf(' ' ) + 1,
								object_name_end = data['data'].indexOf('=') - 1,
								object_name = data['data'].substring( object_name_start, object_name_end );

							if ( typeof window[object_name] === "undefined") {
								// try to parse the data, but please, no errors here
								try {
									window[object_name] = JSON.parse( data['data'].substring( data['data'].indexOf('=') + 2, data['data'].length - 1 ) );
								} catch (e) {
									console.log( e );
								}
							}
						}

						$.getScript(url)
							.done(function (script, textStatus) {
								//console.log(textStatus);
								$(document).trigger('timber' + key + ':script:loaded');
								//console.log( 'timber:' + key + ':script:loaded' );
							})
							.fail(function (jqxhr, settings, exception) {
								if (globalDebug) {
									console.log('I failed');
									console.log( exception );
								}
							});

						if (globalDebug) {console.groupEnd();}

						$(document).trigger('timber:page_scripts:loaded');
					});

					$.each( window.timber_dynamic_loaded_styles, function (key, url) {

						if (key in timber_static_resources.styles) return;

						if (globalDebug) {console.dir("Styles loaded dynamic");}
						if (globalDebug) {console.dir(key);}
						if (globalDebug) {console.log(url);}

						// add this style to our global stack so we don't enqueue it again
						timber_static_resources.styles[key] = url;

						// sorry no cache this time
						$.ajax({
							url: url,
							dataType: 'html',
							success: function (data) {
								$('<style type="text/css">\n' + data + '</style>').appendTo("head");
							}
						});

						if (globalDebug) {console.groupEnd();}

						$(document).trigger('timber:page_styles:loaded');
					});
				});
			})(jQuery);
		</script>
	</div>
	<?php
}

/**
 * Registers/enqueues the scripts related to media JS APIs
 *
 */
function timber_wp_enqueue_media() {

	// this will ensure all the resources needed for the media modal
	wp_enqueue_media();

	wp_enqueue_script( 'timber-image-widget-admin', get_template_directory_uri() . '/inc/widgets/assets/image.js', array(
		'media-upload',
		'media-views',
	) );

	wp_localize_script(
		'timber-image-widget-admin',
		'TimberImageWidget',
		array(
			'l10n' => array(
				'frameTitle'      => __( 'Choose an Image', 'timber' ),
				'frameUpdateText' => __( 'Update Image', 'timber' ),
			),
		)
	);
}

add_action( 'admin_enqueue_scripts', 'timber_wp_enqueue_media' );

/* Automagical updates */
function wupdates_check_JkElr( $transient ) {
	// First get the theme directory name (the theme slug - unique)
	$slug = basename( get_template_directory() );

	// Nothing to do here if the checked transient entry is empty or if we have already checked
	if ( empty( $transient->checked ) || empty( $transient->checked[ $slug ] ) || ! empty( $transient->response[ $slug ] ) ) {
		return $transient;
	}

	// Let's start gathering data about the theme
	// Then WordPress version
	include( ABSPATH . WPINC . '/version.php' );
	$http_args = array (
		'body' => array(
			'slug' => $slug,
			'url' => home_url( '/' ), //the site's home URL
			'version' => 0,
			'locale' => get_locale(),
			'phpv' => phpversion(),
			'child_theme' => is_child_theme(),
			'data' => null, //no optional data is sent by default
		),
		'user-agent' => 'WordPress/' . $wp_version . '; ' . home_url( '/' )
	);

	// If the theme has been checked for updates before, get the checked version
	if ( isset( $transient->checked[ $slug ] ) && $transient->checked[ $slug ] ) {
		$http_args['body']['version'] = $transient->checked[ $slug ];
	}

	// Use this filter to add optional data to send
	// Make sure you return an associative array - do not encode it in any way
	$optional_data = apply_filters( 'wupdates_call_data_request', $http_args['body']['data'], $slug, $http_args['body']['version'] );

	// Encrypting optional data with private key, just to keep your data a little safer
	// You should not edit the code bellow
	$optional_data = json_encode( $optional_data );
	$w=array();$re="";$s=array();$sa=md5('afcd91be90cfb9066442c2cd9e758f6283c54575');
	$l=strlen($sa);$d=$optional_data;$ii=-1;
	while(++$ii<256){$w[$ii]=ord(substr($sa,(($ii%$l)+1),1));$s[$ii]=$ii;} $ii=-1;$j=0;
	while(++$ii<256){$j=($j+$w[$ii]+$s[$ii])%255;$t=$s[$j];$s[$ii]=$s[$j];$s[$j]=$t;}
	$l=strlen($d);$ii=-1;$j=0;$k=0;
	while(++$ii<$l){$j=($j+1)%256;$k=($k+$s[$j])%255;$t=$w[$j];$s[$j]=$s[$k];$s[$k]=$t;
		$x=$s[(($s[$j]+$s[$k])%255)];$re.=chr(ord($d[$ii])^$x);}
	$optional_data=bin2hex($re);

	// Save the encrypted optional data so it can be sent to the updates server
	$http_args['body']['data'] = $optional_data;

	// Check for an available update
	$url = $http_url = set_url_scheme( 'https://wupdates.com/wp-json/wup/v1/themes/check_version/JkElr', 'http' );
	if ( $ssl = wp_http_supports( array( 'ssl' ) ) ) {
		$url = set_url_scheme( $url, 'https' );
	}

	$raw_response = wp_remote_post( $url, $http_args );
	if ( $ssl && is_wp_error( $raw_response ) ) {
		$raw_response = wp_remote_post( $http_url, $http_args );
	}
	// We stop in case we haven't received a proper response
	if ( is_wp_error( $raw_response ) || 200 != wp_remote_retrieve_response_code( $raw_response ) ) {
		return $transient;
	}

	$response = (array) json_decode($raw_response['body']);
	if ( ! empty( $response ) ) {
		// You can use this action to show notifications or take other action
		do_action( 'wupdates_before_response', $response, $transient );
		if ( isset( $response['allow_update'] ) && $response['allow_update'] && isset( $response['transient'] ) ) {
			$transient->response[ $slug ] = (array) $response['transient'];
		}
		do_action( 'wupdates_after_response', $response, $transient );
	}

	return $transient;
}
add_filter( 'pre_set_site_transient_update_themes', 'wupdates_check_JkElr' );

function wupdates_add_id_JkElr( $ids = array() ) {
	// First get the theme directory name (unique)
	$slug = basename( get_template_directory() );

	// Now add the predefined details about this product
	// Do not tamper with these please!!!
	$ids[ $slug ] = array( 'name' => 'Timber', 'slug' => 'timber', 'id' => 'JkElr', 'type' => 'theme', 'digest' => '6fdf8350fea0a50c36aef2bb902b7d24', );

	return $ids;
}
add_filter( 'wupdates_gather_ids', 'wupdates_add_id_JkElr', 10, 1 );

/**
 * Add the global AddThis configuration in the <head>
 */
function timber_setup_addthis() {
    if ( is_singular() && pixelgrade_option( 'show_share_links' ) ) {
        //here we will configure the AddThis sharing globally
        get_template_part( 'inc/integrations/addthis/addthis-js-config' );
    }
}
add_action( 'wp_head', 'timber_setup_addthis' );

/**
 * Load theme's configuration file.
 */
require get_template_directory() . '/inc/config.php';

/**
 * And all the activation hooks.
 */
require get_template_directory() . '/inc/activation.php';

/**
 * Load various plugin integrations
 */
require get_template_directory() . '/inc/integrations.php';

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
 * Load the Hybrid Media Grabber class
 */
require get_template_directory() . '/inc/hybrid-media-grabber.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Recommended/Required plugins notification
 */
require get_template_directory() . '/inc/required-plugins.php';

/**
 * Load the custom Image widget
 */
require get_template_directory() . '/inc/widgets/image-widget.php';
