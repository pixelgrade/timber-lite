<?php
/**
 * Custom functions that act independently of the theme templates
 *
 * Eventually, some of the functionality here could be replaced by core features
 *
 * @package Timber
 */

/**
 * Returns the proper post id in case WPML is active and a the post has a translation
 * @param $id
 * @param string $post_type
 *
 * @return int The id of the post
 */
function timber_get_post_id( $id = null, $post_type = 'post' ) {
	global $post;

	if ( $id === null ) {
		$id  = get_the_ID();
	}

	if ( function_exists( 'icl_object_id' ) ) {
		// make this work for any post type
		if ( isset( $post->post_type ) && $post->post_type !== $post_type ) {
			$post_type = $post->post_type;
		}

		return icl_object_id( $id, $post_type, true );
	} else {
		return $id;
	}
}

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function timber_body_classes( $classes ) {
	// Adds a class of group-blog to blogs with more than 1 published author.
	if ( is_multi_author() ) {
		$classes[] = 'group-blog';
	}

	// let the body_class know what project layout we have and what height has the page slider
	global $post;

	if ( isset( $post->post_type ) ) {

		if ( $post->post_type === 'jetpack-portfolio' ) {
			$project_layout = get_post_meta( timber_get_post_id(), 'project_layout', true );

			if ( ! empty( $project_layout ) ) {
				$classes[] = 'project_layout-' . $project_layout;
			}
		} elseif ( $post->post_type === 'page' && basename( get_page_template() ) === 'featured-projects-page.php' ) {

			$projects_slider_height = get_post_meta( timber_get_post_id(), 'projects_slider_height', true );

			if ( ! empty( $projects_slider_height ) ) {
				$classes[] = 'slider_height-' . $projects_slider_height;
			}
		}
	}


	return $classes;
}
add_filter( 'body_class', 'timber_body_classes' );

/**
 * Extend the default WordPress post classes.
 *
 * @since Timber 1.0
 *
 * @param array $classes A list of existing post class values.
 * @return array The filtered post class list.
 */
function timber_post_classes( $classes ) {

	//add classes for portfolio
	if ( 'jetpack-portfolio' == get_post_type( get_the_ID() ) ) {
		if ( is_single() ) {
			$project_template = get_post_meta( timber_get_post_id(), 'project_template', true);
			if (empty($project_template)) {
				$project_template = 'hybrid';
			}

			if($project_template == 'hybrid')
				$classes[] = 'portfolio  js-portfolio  entry-content';
			else
				$classes[] = 'portfolio  entry-content';
		} else {
			//this is a project displayed in some sort of archive
			$classes[] = 'portfolio  portfolio--grid  portfolio--project  portfolio--visible  js-portfolio';
		}
	}

	return $classes;
}

add_filter( 'post_class', 'timber_post_classes' );

if ( version_compare( $GLOBALS['wp_version'], '4.1', '<' ) ) :
	/**
	 * Filters wp_title to print a neat <title> tag based on what is being viewed.
	 *
	 * @param string $title Default title text for current view.
	 * @param string $sep Optional separator.
	 * @return string The filtered title.
	 */
	function timber_wp_title( $title, $sep ) {
		if ( is_feed() ) {
			return $title;
		}

		global $page, $paged;

		// Add the blog name.
		$title .= get_bloginfo( 'name', 'display' );

		// Add the blog description for the home/front page.
		$site_description = get_bloginfo( 'description', 'display' );
		if ( $site_description && ( is_home() || is_front_page() ) ) {
			$title .= " $sep $site_description";
		}

		// Add a page number if necessary.
		if ( ( $paged >= 2 || $page >= 2 ) && ! is_404() ) {
			$title .= " $sep " . sprintf( esc_html__( 'Page %s', 'timber' ), max( $paged, $page ) );
		}

		return $title;
	}
	add_filter( 'wp_title', 'timber_wp_title', 10, 2 );

	/**
	 * Title shim for sites older than WordPress 4.1.
	 *
	 * @link https://make.wordpress.org/core/2014/10/29/title-tags-in-4-1/
	 * @todo Remove this function when WordPress 4.3 is released.
	 */
	function timber_render_title() {
		?>
		<title><?php wp_title( '|', true, 'right' ); ?></title>
		<?php
	}
	add_action( 'wp_head', 'timber_render_title' );
endif;

if ( ! function_exists( 'timber_fonts_url' ) ) :

	/**
	 * Register Google fonts for Timber.
	 *
	 * @since Timber 1.0
	 *
	 * @return string Google fonts URL for the theme.
	 */
	function timber_fonts_url() {
		$fonts_url = '';
		$fonts     = array();
		$subsets   = 'latin,latin-ext';

		/* Translators: If there are characters in your language that are not
		* supported by Roboto, translate this to 'off'. Do not translate
		* into your own language.
		*/
		if ( 'off' !== _x( 'on', 'Roboto font: on or off', 'timber' ) ) {
			$fonts[] = 'Roboto:500,400,300,500italic,400italic,300italic';
		}

		/* Translators: If there are characters in your language that are not
		* supported by Oswald, translate this to 'off'. Do not translate
		* into your own language.
		*/
		if ( 'off' !== _x( 'on', 'Oswald font: on or off', 'timber' ) ) {
			$fonts[] = 'Oswald:300,400,700';
		}

		/* translators: To add an additional character subset specific to your language, translate this to 'greek', 'cyrillic', 'devanagari' or 'vietnamese'. Do not translate into your own language. */
		$subset = _x( 'no-subset', 'Add new subset (greek, cyrillic, devanagari, vietnamese)', 'timber' );

		if ( 'cyrillic' == $subset ) {
			$subsets .= ',cyrillic,cyrillic-ext';
		} elseif ( 'greek' == $subset ) {
			$subsets .= ',greek,greek-ext';
		} elseif ( 'devanagari' == $subset ) {
			$subsets .= ',devanagari';
		} elseif ( 'vietnamese' == $subset ) {
			$subsets .= ',vietnamese';
		}

		if ( $fonts ) {
			$fonts_url = add_query_arg( array(
				'family' => urlencode( implode( '|', $fonts ) ),
				'subset' => urlencode( $subsets ),
			), '//fonts.googleapis.com/css' );
		}

		return $fonts_url;
	} #function

endif;

if ( ! function_exists( 'timber_comment' ) ) :
	/**
	 * Display individual comment layout
	 *
	 * @since Timber 1.0
	 */
	function timber_comment( $comment, $args, $depth ) {
		static $comment_number;

		if ( ! isset( $comment_number ) ) {
			$comment_number = $args[ 'per_page' ] * ( $args[ 'page' ] - 1 ) + 1;
		} else {
			$comment_number ++;
		}

		$GLOBALS[ 'comment' ] = $comment; ?>
	<li <?php comment_class(); ?>>
		<article id="comment-<?php comment_ID() ?>" class="comment-article  media">
			<span class="comment-number"><?php echo $comment_number ?></span>
			<?php
			//grab the avatar - by default the Mystery Man
			$avatar = get_avatar( $comment, 60, '', '', array( 'extra_attr' => '' ) ); ?>

			<aside class="comment__avatar  media__img"><?php echo $avatar; ?></aside>

			<div class="media__body">
				<header class="comment__meta comment-author">
					<?php printf( '<span class="comment__author-name">%s</span>', get_comment_author_link() ) ?>
					<time class="comment__time" datetime="<?php comment_time( 'c' ); ?>">
						<a href="<?php echo esc_url( get_comment_link( get_comment_ID() ) ) ?>" class="comment__timestamp"><?php printf( __( 'on %s at %s', 'timber' ), get_comment_date(), get_comment_time() ); ?></a>
					</time>
					<div class="comment__links">
						<?php
						//we need some space before Edit
						edit_comment_link( __( 'Edit', 'timber' ), '  ' );

						comment_reply_link( array_merge( $args, array(
							'depth'     => $depth,
							'max_depth' => $args[ 'max_depth' ]
						) ) );
						?>
					</div>
				</header>
				<!-- .comment-meta -->
				<?php if ( $comment->comment_approved == '0' ) : ?>
					<div class="alert info">
						<p><?php _e( 'Your comment is awaiting moderation.', 'timber' ) ?></p>
					</div>
				<?php endif; ?>
				<section class="comment__content comment">
					<?php comment_text() ?>
				</section>
			</div>
		</article>
		<!-- </li> is added by WordPress automatically -->
	<?php
	} // don't remove this bracket!

endif;

/**
 * Filter the default editor content for projects when creating a new project
 *
 * @param string
 * @return string
 */
function timber_project_editor_content( $content, $post ) {
    if ( 'jetpack-portfolio' == $post->post_type ) {
        $content = "[gallery]";
    }
    return $content;
}
add_filter( 'default_content', 'timber_project_editor_content', 10, 3 );

if ( ! function_exists('timber_get_featured_projects' ) ) {
	function timber_get_featured_projects() {

		$featured_projects = array();
		$featured_projects_ids = get_post_meta( timber_get_post_id(), 'portfolio_featured_projects', true);
		// turn from string to array
		$featured_projects_ids = explode( ',', $featured_projects_ids );

		if ( ! empty($featured_projects_ids) ) {
			$query_args  = array(
				'post_type'      => 'jetpack-portfolio',
				'post__in'       => $featured_projects_ids, // pass array of ids into `include` parameter
				'orderby'        => 'post__in',
				'posts_per_page' => - 1, //get all featured projects
			);
			$featured_projects = get_posts( $query_args );
		}
		return $featured_projects;
	}
}


/**
 * Filter comment_form_defaults to remove the notes after the comment form textarea.
 *
 * @since Timber 1.0
 *
 * @param array $defaults
 * @return array
 */
function timber_comment_form_remove_notes_after( $defaults ) {
	$defaults['comment_notes_after'] = '';

	return $defaults;
}

add_filter( 'comment_form_defaults', 'timber_comment_form_remove_notes_after' );

/**
 * Filter wp_link_pages to wrap current page in span.
 *
 * @since Timber 1.0
 *
 * @param string $link
 * @return string
 */
function timber_link_pages( $link ) {
	if ( is_numeric( $link ) ) {
		return '<span class="current">' . $link . '</span>';
	}

	return $link;
}

add_filter( 'wp_link_pages_link', 'timber_link_pages' );

/**
 * Wrap more link
 */
function timber_read_more_link( $link ) {
	return '<div class="more-link-wrapper">' . $link . '</div>';
}

add_filter( 'the_content_more_link', 'timber_read_more_link' );

/**
 * Constrain the excerpt length to 35 words - about a medium sized excerpt
 */
function timber_excerpt_length( $length ) {
	return 35;
}

add_filter( 'excerpt_length', 'timber_excerpt_length', 999 );

/**
 * When dealing with gallery post format, we need to strip the first gallery in the content since we show it at the top
 */
function timber_strip_first_content_gallery( $content ) {
	if ( 'gallery' == get_post_format() ) {
		$regex   = '/\[gallery.*]/';
		$content = preg_replace( $regex, '', $content, 1 );
	}

	return $content;
}

add_filter( 'the_content', 'timber_strip_first_content_gallery' );

/**
 * This function was borrowed from CakePHP and adapted.
 * https://github.com/cakephp/cakephp/blob/53fdb18655119d4cca966d769b6c33f8eaaa8da0/src/Utility/Text.php
 *
 * Bellow is the copyright notice:
 *
 * ========================
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 *
 * ========================
 *
 * Truncates text.
 *
 * Cuts a string to the length of $length and replaces the last characters
 * with the ellipsis if the text is longer than length.
 *
 * ### Options:
 *
 * - `ellipsis` Will be used as ending and appended to the trimmed string
 * - `exact` If false, $text will not be cut mid-word
 * - `html` If true, HTML tags would be handled correctly
 *
 * @param string $text String to truncate.
 * @param int $length Length of returned string, including ellipsis.
 * @param array $options An array of HTML attributes and options.
 * @return string Trimmed string.
 * @link http://book.cakephp.org/3.0/en/core-libraries/string.html#truncating-text
 */
function timber_truncate($text, $length = 100, $options = array() ) {
	$default = array(
		'ellipsis' => apply_filters('excerpt_more', '[…]' ),
		'exact' => false,
		'html' => false,
	);

	if ( ! empty( $options['html'] ) && strtolower( mb_internal_encoding() ) === 'utf-8') {
		$default['ellipsis'] = "\xe2\x80\xa6";
	}
	$options = array_merge( $default, $options );
	extract($options);

	if ( true === $html ) {
		if ( mb_strlen( preg_replace( '/<.*?>/', '', $text ) ) <= $length) {
			return $text;
		}
		$totalLength = mb_strlen( strip_tags( $ellipsis ) );
		$openTags = array();
		$truncate = '';
		preg_match_all( '/(<\/?([\w+]+)[^>]*>)?([^<>]*)/', $text, $tags, PREG_SET_ORDER );
		foreach ( $tags as $tag ) {
			if ( ! preg_match( '/img|br|input|hr|area|base|basefont|col|frame|isindex|link|meta|param/s', $tag[2] ) ) {
				if ( preg_match( '/<[\w]+[^>]*>/s', $tag[0] ) ) {
					array_unshift( $openTags, $tag[2] );
				} elseif ( preg_match( '/<\/([\w]+)[^>]*>/s', $tag[0], $closeTag ) ) {
					$pos = array_search( $closeTag[1], $openTags );
					if ( false !== $pos ) {
						array_splice( $openTags, $pos, 1 );
					}
				}
			}
			$truncate .= $tag[1];
			$contentLength = mb_strlen( preg_replace( '/&[0-9a-z]{2,8};|&#[0-9]{1,7};|&#x[0-9a-f]{1,6};/i', ' ', $tag[3] ) );
			if ( $contentLength + $totalLength > $length ) {
				$left = $length - $totalLength;
				$entitiesLength = 0;
				if ( preg_match_all( '/&[0-9a-z]{2,8};|&#[0-9]{1,7};|&#x[0-9a-f]{1,6};/i', $tag[3], $entities, PREG_OFFSET_CAPTURE ) ) {
					foreach ( $entities[0] as $entity ) {
						if ( $entity[1] + 1 - $entitiesLength <= $left ) {
							$left--;
							$entitiesLength += mb_strlen( $entity[0] );
						} else {
							break;
						}
					}
				}
				$truncate .= mb_substr( $tag[3], 0, $left + $entitiesLength );
				break;
			} else {
				$truncate .= $tag[3];
				$totalLength += $contentLength;
			}
			if ( $totalLength >= $length ) {
				break;
			}
		}
	} else {
		if ( mb_strlen( $text) <= $length ) {
			return $text;
		}
		$truncate = mb_substr( $text, 0, $length - mb_strlen( $ellipsis ) );
	}
	if ( false === $exact ) {
		$spacepos = mb_strrpos( $truncate, ' ' );
		if ( true === $html ) {
			$truncateCheck = mb_substr( $truncate, 0, $spacepos );
			$lastOpenTag = mb_strrpos( $truncateCheck, '<' );
			$lastCloseTag = mb_strrpos( $truncateCheck, '>' );
			if ( $lastOpenTag > $lastCloseTag ) {
				preg_match_all( '/<[\w]+[^>]*>/s', $truncate, $lastTagMatches );
				$lastTag = array_pop( $lastTagMatches[0] );
				$spacepos = mb_strrpos( $truncate, $lastTag ) + mb_strlen( $lastTag );
			}
			$bits = mb_substr( $truncate, $spacepos );
			preg_match_all( '/<\/([a-z]+)>/', $bits, $droppedTags, PREG_SET_ORDER );
			if ( ! empty( $droppedTags ) ) {
				if ( ! empty( $openTags ) ) {
					foreach ( $droppedTags as $closingTag ) {
						if ( ! in_array( $closingTag[1], $openTags ) ) {
							array_unshift( $openTags, $closingTag[1] );
						}
					}
				} else {
					foreach ( $droppedTags as $closingTag ) {
						$openTags[] = $closingTag[1];
					}
				}
			}
		}
		$truncate = mb_substr( $truncate, 0, $spacepos );
		// If truncate still empty, then we don't need to count ellipsis in the cut.
		if ( 0 === mb_strlen( $truncate ) ) {
			$truncate = mb_substr( $text, 0, $length );
		}
	}
	$truncate .= $ellipsis;
	if ( true === $html ) {
		foreach ( $openTags as $tag ) {
			$truncate .= '</' . $tag . '>';
		}
	}
	return $truncate;
}

function timber_allow_skype_protocol( $protocols ) {
	$protocols[] = 'skype';
	return $protocols;
}
add_filter( 'kses_allowed_protocols' , 'timber_allow_skype_protocol' );

/**
 * The following code is inspired by Yoast SEO.
 */
function timber_get_current_canonical_url() {
	global $wp_query;

	if ( $wp_query->is_404 || $wp_query->is_search ) {
		return false;
	}

	$haspost = count( $wp_query->posts ) > 0;

	if ( get_query_var( 'm' ) ) {
		$m = preg_replace( '/[^0-9]/', '', get_query_var( 'm' ) );
		switch ( strlen( $m ) ) {
			case 4:
				$link = get_year_link( $m );
				break;
			case 6:
				$link = get_month_link( substr( $m, 0, 4 ), substr( $m, 4, 2 ) );
				break;
			case 8:
				$link = get_day_link( substr( $m, 0, 4 ), substr( $m, 4, 2 ), substr( $m, 6, 2 ) );
				break;
			default:
				return false;
		}
	} elseif ( ( $wp_query->is_single || $wp_query->is_page ) && $haspost ) {
		$post = $wp_query->posts[0];
		$link = get_permalink( timber_get_post_id( $post->ID ) );
	} elseif ( $wp_query->is_author && $haspost ) {
		$author = get_userdata( get_query_var( 'author' ) );
		if ( $author === false ) {
			return false;
		}
		$link = get_author_posts_url( $author->ID, $author->user_nicename );
	} elseif ( $wp_query->is_category && $haspost ) {
		$link = get_category_link( get_query_var( 'cat' ) );
	} elseif ( $wp_query->is_tag && $haspost ) {
		$tag = get_term_by( 'slug', get_query_var( 'tag' ), 'post_tag' );
		if ( ! empty( $tag->term_id ) ) {
			$link = get_tag_link( $tag->term_id );
		}
	} elseif ( $wp_query->is_day && $haspost ) {
		$link = get_day_link( get_query_var( 'year' ), get_query_var( 'monthnum' ), get_query_var( 'day' ) );
	} elseif ( $wp_query->is_month && $haspost ) {
		$link = get_month_link( get_query_var( 'year' ), get_query_var( 'monthnum' ) );
	} elseif ( $wp_query->is_year && $haspost ) {
		$link = get_year_link( get_query_var( 'year' ) );
	} elseif ( $wp_query->is_home ) {
		if ( ( get_option( 'show_on_front' ) == 'page' ) && ( $pageid = get_option( 'page_for_posts' ) ) ) {
			$link = get_permalink( $pageid );
		} else {
			if ( function_exists( 'icl_get_home_url' ) ) {
				$link = icl_get_home_url();
			} else { // icl_get_home_url does not exist
				$link = home_url();
			}
		}
	} elseif ( $wp_query->is_tax && $haspost ) {
		$taxonomy = get_query_var( 'taxonomy' );
		$term     = get_query_var( 'term' );
		$link     = get_term_link( $term, $taxonomy );
	} elseif ( $wp_query->is_archive && function_exists( 'get_post_type_archive_link' ) && ( $post_type = get_query_var( 'post_type' ) ) ) {
		$link = get_post_type_archive_link( $post_type );
	} else {
		return false;
	}

	//let's see about the page number
	$page = get_query_var( 'page' );
	if ( empty( $page ) ) {
		$page = get_query_var( 'paged' );
	}

	if ( ! empty( $page ) && $page > 1 ) {
		$link = trailingslashit( $link ) . "page/$page";
		$link = user_trailingslashit( $link, 'paged' );
	}

	return $link;
}

function timber_get_img_alt( $attachment_ID ) {
	$img_alt = trim( strip_tags( get_post_meta( $attachment_ID, '_wp_attachment_image_alt', true ) ) );
	return $img_alt;
}

function timber_get_img_caption( $attachment_ID ) {
    $attachment = get_post( $attachment_ID );
    $img_caption = trim( strip_tags( $attachment->post_excerpt ) );
    return $img_caption;
}

function timber_get_img_description( $attachment_ID ) {
    $attachment = get_post( $attachment_ID );
    $img_description = trim( strip_tags( $attachment->post_content ) );
    return $img_description;
}

function timber_get_img_exif( $attachment_ID ) {
    $meta_data = wp_get_attachment_metadata( $attachment_ID );

    if ( isset( $meta_data['image_meta'] ) ) {
        $exif = array();

        if ( ! empty( $meta_data['image_meta']['camera'] ) ) {
            $exif['camera'] = $meta_data['image_meta']['camera'];
        }

        if ( ! empty( $meta_data['image_meta']['aperture'] ) ) {
            $exif['aperture'] = '&#402;/' . $meta_data['image_meta']['aperture'];
        }

        if ( ! empty( $meta_data['image_meta']['focal_length'] ) ) {
            $exif['focal'] = $meta_data['image_meta']['focal_length'] . 'mm';
        }

        if ( ! empty( $meta_data['image_meta']['shutter_speed'] ) ) {
            $exif['exposure'] = '';

            //conversion from decimal to fraction inspired by http://enliteart.com/blog/2008/08/30/quick-shutter-speed-fix-for-wordpress-exif/
            //this is the reverse of what WordPress does to raw EXIF data - quite dumb but that's life
            if ( ( 1 / $meta_data['image_meta']['shutter_speed'] ) > 1 ) {
                $exif['exposure'] .= "1/";
                if ( ( number_format( ( 1 / $meta_data['image_meta']['shutter_speed'] ), 1 ) ) == 1.3
                    or number_format( ( 1 / $meta_data['image_meta']['shutter_speed'] ), 1 ) == 1.5
                    or number_format( ( 1 / $meta_data['image_meta']['shutter_speed'] ), 1 ) == 1.6
                    or number_format( ( 1 / $meta_data['image_meta']['shutter_speed'] ), 1 ) == 2.5 ) {
                    $exif['exposure'] .= number_format( ( 1 / $meta_data['image_meta']['shutter_speed'] ), 1, '.', '' );
                } else {
                    $exif['exposure'] .= number_format( ( 1 / $meta_data['image_meta']['shutter_speed'] ), 0, '.', '' );
                }
            } else {
                $exif['exposure'] .= $meta_data['image_meta']['shutter_speed'];
            }
        }

        if ( ! empty( $meta_data['image_meta']['iso'] ) ) {
            $exif['iso'] = $meta_data['image_meta']['iso'];
        }

        return json_encode( $exif );
    }

    return '';
}

/**
 * Tries to convert an attachment URL into a post ID.
 * This is a modified version of the one from core to account for resized urls - thumbnails
 *
 * @global wpdb $wpdb WordPress database abstraction object.
 *
 * @param string $url The URL to resolve.
 * @return int The found post ID, or 0 on failure.
 */
function timber_attachment_url_to_postid( $url ) {
	global $wpdb;

	$dir = wp_upload_dir();
	$path = $url;

	if ( 0 === strpos( $path, $dir['baseurl'] . '/' ) ) {
		$path = substr( $path, strlen( $dir['baseurl'] . '/' ) );
	}

	$path = preg_replace( '/-[0-9]{1,4}x[0-9]{1,4}\.(jpg|jpeg|png|gif|bmp)$/i', '.$1', $path );

	$sql = $wpdb->prepare(
		"SELECT post_id FROM $wpdb->postmeta WHERE meta_key = '_wp_attached_file' AND meta_value = %s",
		$path
	);
	$post_id = $wpdb->get_var( $sql );

	/**
	 * Filter an attachment id found by URL.
	 *
	 * @since 4.2.0
	 *
	 * @param int|null $post_id The post_id (if any) found by the function.
	 * @param string   $url     The URL being looked up.
	 */
	$post_id = apply_filters( 'attachment_url_to_postid', $post_id, $url );

	return (int) $post_id;
}

/**
 * Replace the submit input with button because the <input> tag doesn't allow CSS styling with ::before or ::after
 */
function timber_search_form( $form ) {
	$form = '<form role="search" method="get" class="search-form" action="' . esc_url( home_url( '/' ) ) . '">
				<label>
					<span class="screen-reader-text">' . _x( 'Search for:', 'label' , 'timber' ) . '</span>
					<input type="search" class="search-field" placeholder="' . esc_attr_x( 'Search &hellip;', 'placeholder' , 'timber' ) . '" value="' . get_search_query() . '" name="s" title="' . esc_attr_x( 'Search for:', 'label' , 'timber' ) . '" />
				</label>
				<button class="search-submit"><i class="fa fa-search"></i></button>
			</form>';

	return $form;
}

add_filter( 'get_search_form', 'timber_search_form' );


/**
 * Add "Styles" drop-down
 */
add_filter( 'mce_buttons_2', 'timber_mce_editor_buttons' );
function timber_mce_editor_buttons( $buttons ) {
	array_unshift($buttons, 'styleselect' );
	return $buttons;
}

/**
 * Add styles/classes to the "Styles" drop-down
 */
add_filter( 'tiny_mce_before_init', 'timber_mce_before_init' );
function timber_mce_before_init( $settings ) {

	$style_formats =array(
		array( 'title' => __( 'Intro Text', 'timber' ), 'selector' => 'p', 'classes' => 'intro'),
		array( 'title' => __( 'Dropcap', 'timber' ), 'inline' => 'span', 'classes' => 'dropcap'),
		array( 'title' => __( 'Highlight', 'timber' ), 'inline' => 'span', 'classes' => 'highlight' ),
		array( 'title' => __( 'Two Columns', 'timber' ), 'selector' => 'p', 'classes' => 'twocolumn', 'wrapper' => true ),
		array( 'title' => __( 'Caption', 'timber' ), 'inline' => 'span', 'classes' => 'caption' )
	);

	$settings['style_formats'] = json_encode( $style_formats );

	return $settings;
}

/*
 * Ajax loading posts
 */
add_action( 'wp_ajax_timber_load_next_posts', 'timber_load_next_posts' );
add_action( 'wp_ajax_nopriv_timber_load_next_posts', 'timber_load_next_posts' );
function timber_load_next_posts() {
	global $post;

	if ( ! wp_verify_nonce( $_REQUEST['nonce'], 'timber_ajax' ) ) {
		wp_send_json_error();
	}

	//set the query args
	$args = array();

	if ( isset( $_REQUEST['posts_number'] ) && 'all' == $_REQUEST['posts_number'] ) {
		$args['posts_per_page'] = 999;
	} else {
		$args['posts_per_page'] = get_option('posts_per_page');
	}

	//check if we have a offset in $_POST
	if ( isset( $_POST['offset'] ) ) {
		$args['offset'] = (int)$_POST['offset'];
	}

	$posts = get_posts( $args );
	if ( ! empty( $posts ) ) {
		ob_start();

		foreach ( $posts as $post ) : setup_postdata( $post );
			get_template_part( 'template-parts/content', get_post_format() );
		endforeach;

		/* Restore original Post Data */
		wp_reset_postdata();

		wp_send_json_success( array(
			'posts' => ob_get_clean(),
		) );
	} else {
		wp_send_json_error();
	}
}

/*
 * Ajax loading projects
 */
add_action( 'wp_ajax_timber_load_next_projects', 'timber_load_next_projects' );
add_action( 'wp_ajax_nopriv_timber_load_next_projects', 'timber_load_next_projects' );
function timber_load_next_projects() {
    global $post;

    if ( ! wp_verify_nonce( $_REQUEST['nonce'], 'timber_ajax' ) ) {
        wp_send_json_error();
    }

    //set the query args
    $args = array('post_type' => 'jetpack-portfolio');

    if ( isset( $_REQUEST['posts_number'] ) && 'all' == $_REQUEST['posts_number'] ) {
        $args['posts_per_page'] = 999;
    } else {
        $args['posts_per_page'] = get_option( 'jetpack_portfolio_posts_per_page', '12' );
    }

    //check if we have a offset in $_POST
    if ( isset( $_POST['offset'] ) ) {
        $args['offset'] = (int)$_POST['offset'];
    }

    $posts = get_posts( $args );
    if ( ! empty( $posts ) ) {
        ob_start();

        foreach ( $posts as $post ) : setup_postdata( $post );
            get_template_part( 'template-parts/content', 'portfolio' );
        endforeach;

        /* Restore original Post Data */
        wp_reset_postdata();

        wp_send_json_success( array(
            'posts' => ob_get_clean(),
        ) );
    } else {
        wp_send_json_error();
    }
}