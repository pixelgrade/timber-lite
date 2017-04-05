<?php
/**
 * Custom template tags for this theme.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package Timber
 * @since Timber 1.0
 */

function timber_the_custom_logo() {
	if ( function_exists( 'the_custom_logo' ) ) {
		the_custom_logo();
	}
}

if ( ! function_exists( 'timber_paging_nav' ) ) :
	/**
	 * Display navigation to next/previous set of posts when applicable.
	 *
	 */
	function timber_paging_nav( $max_num_pages = '' ) {
		// Get max_num_pages if not provided
		if ( '' == $max_num_pages ) {
			$max_num_pages = $GLOBALS['wp_query']->max_num_pages;
		}
		// Don't print empty markup if there's only one page.
		if ( $max_num_pages < 2 ) {
			return;
		} ?>
		<nav class="navigation posts-navigation clearfix" role="navigation">
			<h2 class="screen-reader-text"><?php _e( 'Posts navigation', 'timber' ); ?></h2>
			<div class="nav-links">

				<?php if ( get_next_posts_link( '', $max_num_pages ) ) : ?>
					<div class="nav-previous"><?php next_posts_link( __( 'Older posts', 'timber' ), $max_num_pages ); ?></div>
				<?php endif; ?>

				<?php if ( get_previous_posts_link( '', $max_num_pages ) ) : ?>
					<div class="nav-next"><?php previous_posts_link( __( 'Newer posts', 'timber' ), $max_num_pages ); ?></div>
				<?php endif; ?>

			</div><!-- .nav-links -->
		</nav><!-- .navigation -->
	<?php
	}
endif;

if ( ! function_exists( 'the_post_navigation' ) ) :
/**
 * Display navigation to next/previous post when applicable.
 *
 * @todo Remove this function when WordPress 4.3 is released.
 */
function the_post_navigation() {
	// Don't print empty markup if there's nowhere to navigate.
	$previous = ( is_attachment() ) ? get_post( get_post()->post_parent ) : get_adjacent_post( false, '', true );
	$next     = get_adjacent_post( false, '', false );

	if ( ! $next && ! $previous ) {
		return;
	}
	?>
	<nav class="navigation post-navigation" role="navigation">
		<h2 class="screen-reader-text"><?php esc_html_e( 'Post navigation', 'timber' ); ?></h2>
		<div class="nav-links">
			<?php
				previous_post_link( '<div class="nav-previous">%link</div>', '%title' );
				next_post_link( '<div class="nav-next">%link</div>', '%title' );
			?>
		</div><!-- .nav-links -->
	</nav><!-- .navigation -->
	<?php
}
endif;

if ( ! function_exists( 'timber_posted_on' ) ) :
/**
 * Prints HTML with meta information for the current post-date/time and author.
 */
function timber_posted_on() {
	$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
//	if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
//		$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
//	}

	$time_string = sprintf( $time_string,
		esc_attr( get_the_date( 'c' ) ),
		esc_html( get_the_date() ),
		esc_attr( get_the_modified_date( 'c' ) ),
		esc_html( get_the_modified_date() )
	);

	$posted_on = sprintf(
		esc_html_x( '%s', 'post date', 'timber' ),
		'<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . $time_string . '</a>'
	);

	echo '<span class="posted-on">' . $posted_on . '</span>'; // WPCS: XSS OK.

}
endif;

if ( ! function_exists( 'timber_entry_footer' ) ) :
/**
 * Prints HTML with meta information for the categories, tags and comments.
 */
function timber_entry_footer() {
	// Hide category and tag text for pages.
	if ( 'post' == get_post_type() ) {
	echo '<div class="metabox">';
	get_template_part( 'template-parts/addthis-share' );
	echo '</div>';

		$tags_list = get_the_tag_list();
		if ( $tags_list ) {
			printf( '<span class="tags-links">' . esc_html__( '%1$s', 'timber' ) . '</span>', $tags_list ); // WPCS: XSS OK.
		}
	}

	if ( ! is_single() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
		echo '<span class="comments-link">';
		comments_popup_link( esc_html__( 'Leave a comment', 'timber' ), esc_html__( '1 Comment', 'timber' ), esc_html__( '% Comments', 'timber' ) );
		echo '</span>';
	}

	edit_post_link( esc_html__( 'Edit', 'timber' ), '<span class="edit-link">', '</span>' );
}
endif;

if ( ! function_exists( 'the_archive_title' ) ) :
/**
 * Shim for `the_archive_title()`.
 *
 * Display the archive title based on the queried object.
 *
 * @todo Remove this function when WordPress 4.3 is released.
 *
 * @param string $before Optional. Content to prepend to the title. Default empty.
 * @param string $after  Optional. Content to append to the title. Default empty.
 */
function the_archive_title( $before = '', $after = '' ) {
	if ( is_category() ) {
		$title = sprintf( esc_html__( 'Category: %s', 'timber' ), single_cat_title( '', false ) );
	} elseif ( is_tag() ) {
		$title = sprintf( esc_html__( 'Tag: %s', 'timber' ), single_tag_title( '', false ) );
	} elseif ( is_author() ) {
		$title = sprintf( esc_html__( 'Author: %s', 'timber' ), '<span class="vcard">' . get_the_author() . '</span>' );
	} elseif ( is_year() ) {
		$title = sprintf( esc_html__( 'Year: %s', 'timber' ), get_the_date( esc_html_x( 'Y', 'yearly archives date format', 'timber' ) ) );
	} elseif ( is_month() ) {
		$title = sprintf( esc_html__( 'Month: %s', 'timber' ), get_the_date( esc_html_x( 'F Y', 'monthly archives date format', 'timber' ) ) );
	} elseif ( is_day() ) {
		$title = sprintf( esc_html__( 'Day: %s', 'timber' ), get_the_date( esc_html_x( 'F j, Y', 'daily archives date format', 'timber' ) ) );
	} elseif ( is_tax( 'post_format' ) ) {
		if ( is_tax( 'post_format', 'post-format-aside' ) ) {
			$title = esc_html_x( 'Asides', 'post format archive title', 'timber' );
		} elseif ( is_tax( 'post_format', 'post-format-gallery' ) ) {
			$title = esc_html_x( 'Galleries', 'post format archive title', 'timber' );
		} elseif ( is_tax( 'post_format', 'post-format-image' ) ) {
			$title = esc_html_x( 'Images', 'post format archive title', 'timber' );
		} elseif ( is_tax( 'post_format', 'post-format-video' ) ) {
			$title = esc_html_x( 'Videos', 'post format archive title', 'timber' );
		} elseif ( is_tax( 'post_format', 'post-format-quote' ) ) {
			$title = esc_html_x( 'Quotes', 'post format archive title', 'timber' );
		} elseif ( is_tax( 'post_format', 'post-format-link' ) ) {
			$title = esc_html_x( 'Links', 'post format archive title', 'timber' );
		} elseif ( is_tax( 'post_format', 'post-format-status' ) ) {
			$title = esc_html_x( 'Statuses', 'post format archive title', 'timber' );
		} elseif ( is_tax( 'post_format', 'post-format-audio' ) ) {
			$title = esc_html_x( 'Audio', 'post format archive title', 'timber' );
		} elseif ( is_tax( 'post_format', 'post-format-chat' ) ) {
			$title = esc_html_x( 'Chats', 'post format archive title', 'timber' );
		}
	} elseif ( is_post_type_archive() ) {
		$title = sprintf( esc_html__( 'Archives: %s', 'timber' ), post_type_archive_title( '', false ) );
	} elseif ( is_tax() ) {
		$tax = get_taxonomy( get_queried_object()->taxonomy );
		/* translators: 1: Taxonomy singular name, 2: Current taxonomy term */
		$title = sprintf( esc_html__( '%1$s: %2$s', 'timber' ), $tax->labels->singular_name, single_term_title( '', false ) );
	} else {
		$title = esc_html__( 'Archives', 'timber' );
	}

	/**
	 * Filter the archive title.
	 *
	 * @param string $title Archive title to be displayed.
	 */
	$title = apply_filters( 'get_the_archive_title', $title );

	if ( ! empty( $title ) ) {
		echo $before . $title . $after;  // WPCS: XSS OK.
	}
}
endif;

if ( ! function_exists( 'the_archive_description' ) ) :
/**
 * Shim for `the_archive_description()`.
 *
 * Display category, tag, or term description.
 *
 * @todo Remove this function when WordPress 4.3 is released.
 *
 * @param string $before Optional. Content to prepend to the description. Default empty.
 * @param string $after  Optional. Content to append to the description. Default empty.
 */
function the_archive_description( $before = '', $after = '' ) {
	$description = apply_filters( 'get_the_archive_description', term_description() );

	if ( ! empty( $description ) ) {
		/**
		 * Filter the archive description.
		 *
		 * @see term_description()
		 *
		 * @param string $description Archive description to be displayed.
		 */
		echo $before . $description . $after;  // WPCS: XSS OK.
	}
}
endif;

/**
 * Returns true if a blog has more than 1 category.
 *
 * @return bool
 */
function timber_categorized_blog() {
	if ( false === ( $all_the_cool_cats = get_transient( 'timber_categories' ) ) ) {
		// Create an array of all the categories that are attached to posts.
		$all_the_cool_cats = get_categories( array(
			'fields'     => 'ids',
			'hide_empty' => 1,

			// We only need to know if there is more than one category.
			'number'     => 2,
		) );

		// Count the number of categories that are attached to the posts.
		$all_the_cool_cats = count( $all_the_cool_cats );

		set_transient( 'timber_categories', $all_the_cool_cats );
	}

	if ( $all_the_cool_cats > 1 ) {
		// This blog has more than 1 category so timber_categorized_blog should return true.
		return true;
	} else {
		// This blog has only 1 category so timber_categorized_blog should return false.
		return false;
	}
}

/**
 * Flush out the transients used in timber_categorized_blog.
 */
function timber_category_transient_flusher() {
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	// Like, beat it. Dig?
	delete_transient( 'timber_categories' );
}
add_action( 'edit_category', 'timber_category_transient_flusher' );
add_action( 'save_post',     'timber_category_transient_flusher' );


if ( ! function_exists( 'timber_get_custom_excerpt' ) ) :
/**
 * Generate a custom post excerpt suited to both latin alphabet languages and multibyte ones, like Chinese of Japanese
 *
 * @param int|WP_Post $id Optional. Post ID or post object.
 * @return string The custom excerpt
 */
function timber_get_custom_excerpt( $post_id = null ) {
	$post = get_post( $post_id );

	if ( empty( $post ) ) {
		return '';
	}

	//so we need to generate a custom excerpt
	//
	//the problem arises when we are dealing with multibyte characters
	//in this case we need to do a multibyte character length excerpt not the regular, number of words excerpt
	//but first we need to detect such a case

	//the excerpt returned by WordPress
	$excerpt = get_the_excerpt();
	//now we try to truncate the default excerpt with the length = number of words * 6 - the average word length in English
	$mb_excerpt = timber_truncate( $excerpt, ( apply_filters( 'excerpt_length', 55 ) * 6 ) );

	//if the multibyte excerpt's length is smaller then the regular excerpt's length divided by 1.8 (this is a conservative number)
	//then it's quite clear that the default one is no good
	//else leave things like they used to work
	if ( mb_strlen( $mb_excerpt ) < mb_strlen( $excerpt ) / 1.8 ) {
		$excerpt = $mb_excerpt;
	}
	return $excerpt;
}
endif;

if ( ! function_exists( 'timber_post_excerpt' ) ) :
	/**
	 * Display the post excerpt, either with the <!--more--> tag or regular excerpt
	 *
	 * @param int|WP_Post $id Optional. Post ID or post object.
	 */
	function timber_post_excerpt( $post_id = null ) {
		$post = get_post( $post_id );

		if ( empty( $post ) ) {
			return '';
		}

		// Check the content for the more text
		$has_more = strpos( $post->post_content, '<!--more' );

		//when we encounter a read more tag, we respect that and forget about doing anything automatic
		if ( $has_more ) {
			/* translators: %s: Name of current post */
			the_content( sprintf(
				wp_kses( __( 'Continue reading %s <span class="meta-nav">&rarr;</span>', 'timber' ), array( 'span' => array( 'class' => array() ) ) ),
				the_title( '<span class="screen-reader-text">', '</span>', false )
			) );
		} elseif ( has_excerpt( $post ) ) {
			//in case of a manual excerpt we will go forth as planned - no processing
			the_excerpt();
		} else {
			//need custom generated excerpt
			echo apply_filters('the_excerpt', timber_get_custom_excerpt( $post ) );
		}
	} #function
endif;

if ( ! function_exists( 'timber_the_post_thumbnail') ) :
    /**
     * Display the project featured image or the first content image
     *
     * @param int|WP_Post $id Optional. Post ID or post object.
     * @param string $size Optional. Thumbnail size. Default full
     * @param string|array $attr Optional. Query string or array of attributes. Default empty.
     */
    function timber_the_post_thumbnail( $post_id = null, $size = 'full', $attr = '' ) {
        $post = get_post( $post_id );

        if ( empty( $post ) ) {
            return;
        }

        if ( has_post_thumbnail() ) {
            the_post_thumbnail( $size, $attr );
        } else {
            $post_thumbnail_id = false;

            //we need to look for the first image in the content (first in a gallery then standalone)
            $galleries = get_post_galleries( $post, false );
            $gallery = reset( $galleries );

            if ( ! empty( $gallery['ids'] ) ) {
                $gallery_ids = explode(',', $gallery['ids'] );
                $post_thumbnail_id = reset( $gallery_ids );
            }

            if ( ! $post_thumbnail_id ) {
                //we need to look for the first image in the content
                preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post->post_content, $matches);

                if ( isset( $matches[1][0] ) ) {
                    $post_thumbnail_id = timber_attachment_url_to_postid( $matches[1][0] );
                }
            }

            if ( $post_thumbnail_id ) {

                /**
                 * Fires before fetching the post thumbnail HTML.
                 *
                 * Provides "just in time" filtering of all filters in wp_get_attachment_image().
                 *
                 * @since 2.9.0
                 *
                 * @param string $post_id The post ID.
                 * @param string $post_thumbnail_id The post thumbnail ID.
                 * @param string $size The post thumbnail size.
                 */
                do_action('begin_fetch_post_thumbnail_html', $post_id, $post_thumbnail_id, $size);
                if (in_the_loop())
                    update_post_thumbnail_cache();
                $html = wp_get_attachment_image($post_thumbnail_id, $size, false, $attr);

                /**
                 * Fires after fetching the post thumbnail HTML.
                 *
                 * @since 2.9.0
                 *
                 * @param string $post_id The post ID.
                 * @param string $post_thumbnail_id The post thumbnail ID.
                 * @param string $size The post thumbnail size.
                 */
                do_action('end_fetch_post_thumbnail_html', $post_id, $post_thumbnail_id, $size);
            } else {
                $html = '';
            }

            /**
             * Filter the post thumbnail HTML.
             *
             * @since 2.9.0
             *
             * @param string $html              The post thumbnail HTML.
             * @param string $post_id           The post ID.
             * @param string $post_thumbnail_id The post thumbnail ID.
             * @param string $size              The post thumbnail size.
             * @param string $attr              Query string of attributes.
             */
            echo apply_filters( 'post_thumbnail_html', $html, $post_id, $post_thumbnail_id, $size, $attr );
        }

        return;
    }
endif;

if ( ! function_exists( 'timber_get_option' ) ) :
	function timber_get_option( $option, $default = null ) {
		_deprecated_function('timber_get_option', '1.6.8', 'pixelgrade_option');
		return pixelgrade_option($option, $default);
	}
endif;

// This function should come from Customify, but we need to do our best to make things happen
if ( ! function_exists( 'pixelgrade_option') ) {
	/**
	 * Get option from the database
	 *
	 * @param string $option The option name.
	 * @param mixed $default Optional. The default value to return when the option was not found or saved.
	 * @param bool $force_default Optional. When true, we will use the $default value provided for when the option was not saved at least once.
	 *                          When false, we will let the option's default set value (in the Customify settings) kick in first, than our $default.
	 *                          It basically, reverses the order of fallback, first the option's default, then our own.
	 *                          This is ignored when $default is null.
	 *
	 * @return mixed
	 */
	function pixelgrade_option( $option, $default = null, $force_default = true ) {
		/** @var PixCustomifyPlugin $pixcustomify_plugin */
		global $pixcustomify_plugin;

		if ( $pixcustomify_plugin !== null ) {
			// if there is a customify value get it here

			// First we see if we are not supposed to force over the option's default value
			if ( $default !== null && $force_default == false ) {
				// We will not pass the default here so Customify will fallback on the option's default value, if set
				$customify_value = $pixcustomify_plugin->get_option( $option );

				// We only fallback on the $default if none was given from Customify
				if ( $customify_value == null ) {
					return $default;
				}
			} else {
				$customify_value = $pixcustomify_plugin->get_option( $option, $default );
			}

			return $customify_value;
		}

		return $default;
	}
}

if ( ! function_exists( 'timber_the_film_strip' ) ) :
	/**
	 * Display the film strip
	 *
     * @param int|WP_Post $post_id Optional. Post ID or post object.
     * @param boolean $ignore_text Optional. To ignore or not text boxes
     * @param boolean $ignore_videos Optional. To ignore or not video boxes
	 */
	function timber_the_film_strip( $post_id = null, $ignore_text = false, $ignore_videos = false ) {
		echo timber_get_processed_content( $post_id, $ignore_text, $ignore_videos );
	}

endif;

if ( ! function_exists( 'timber_the_project_slider_images' ) ) :
    /**
     * Display the film strip
     *
     * @param int|WP_Post $post_id Optional. Post ID or post object.
     * @param boolean $ignore_text Optional. To ignore or not text boxes
     * @param boolean $ignore_videos Optional. To ignore or not video boxes
     */
    function timber_the_project_slider_images( $post_id = null, $ignore_text = false, $ignore_videos = false ) {
        echo timber_get_processed_content( $post_id, $ignore_text, $ignore_videos, 'timber_get_slider_image' );
    }

endif;

if ( ! function_exists( 'timber_get_processed_content' ) ) :
	/**
	 * Return the film strip markup
	 *
	 * @param int|WP_Post $post_id Optional. Post ID or post object.
	 * @param boolean $ignore_text Optional. To ignore or not text boxes
     * @param boolean $ignore_videos Optional. To ignore or not video boxes
     * @param string $image_callback Optional. Function name to use to get the individual images markup
	 * @return string The film strip markup
	 */
	function timber_get_processed_content( $post_id = null, $ignore_text = false, $ignore_videos = false, $image_callback = 'timber_get_film_strip_image' ) {
		$post = get_post( $post_id );

		if ( empty( $post ) ) {
			return '';
		}

		$output = '';

		//let's get cranking at processing the content and make a film strip out of it
		$content = $post->post_content;

		/* FIRST DEAL WITH GALLERIES - [gallery] shortcode - THIS IS A HARD/TOP LEVEL LIMIT */

		$galleries = timber_get_post_galleries( $post, false );

		if ( ! empty( $galleries ) ) {
			foreach ( $galleries as $gallery ) {
				if ( ! empty( $gallery['ids'] ) ) {
					//we've got a proper gallery on our hands

					//let's get the content before the shortcode
					$pos = strpos( $content, $gallery['original'] );
					$before_content = substr( $content, 0, $pos );

					//now let's process this content and get it in the film strip
					$output .= timber_process_partial_content( $before_content, $ignore_text, $ignore_videos, true, $image_callback );

					//delete everything in front of the shortcode including it
					$content = trim( substr( $content, $pos + strlen( $gallery['original'] ) ) );

					//now make a film strip box for each image in the gallery
					$gallery_ids = explode(',', $gallery['ids'] );

					foreach ( $gallery_ids as $key => $attachment_id ) {
						$output .= call_user_func($image_callback, $attachment_id );
					}
				}
			}
		}

		if ( ! empty( $content ) ) {
			//there is some content left - let's process it
			$output .= timber_process_partial_content( $content, $ignore_text, $ignore_videos, true, $image_callback );
		}

		return $output;

	}

endif;

if ( ! function_exists( 'timber_process_partial_content' ) ) :
/**
 * Return markup for the film strip given a gallery-free piece of content
 *
 * @param string $content Partial post content
 * @param boolean $ignore_text Optional. To ignore or not text boxes
 * @param boolean $ignore_videos Optional. To ignore or not video boxes
 * @param boolean $the_content Optional. To apply or not the_content filters
 * @param string $image_callback Optional. Function name to use to get the individual images markup
 * @return string The markup
 */
function timber_process_partial_content( $content, $ignore_text = false, $ignore_videos = false, $the_content = true, $image_callback = 'timber_get_film_strip_image' ) {
	$markup = '';

	//a little bit of cleanup
	$content = trim( $content );

    //do nothing if we have no content
    if ( empty( $content ) ) {
        return $markup;
    }

    if ( true === $the_content ) {
        //let other plugins have their take on the content
        //although this might be a bit dangerous for those plugins that add something at the beginning or the end
        $content = apply_filters( 'the_content', $content );
    }


    //FIRST split this content by special videos (by the <div class="jetpack-video-wrapper"> )
    //this will use recursion to process content between the videos
    $num_matches = preg_match_all( "!<div \s*class=[\"|']jetpack-video-wrapper[\"|']\s*>.*</div\s*>!i", $content, $matches );

    //if no videos found, continue to processing videos that are not wrapped by Jetpack
    if ( $num_matches > 0 ) {
        for ( $idx = 0; $idx < $num_matches; $idx++ ) {
            //first let's see if there is some content before the current match
            $pos = strpos( $content, $matches[0][ $idx ] );

            $before_content = trim( substr( $content, 0, $pos ) );

            //process the before content recursively
            $markup .= timber_process_partial_content( $before_content, $ignore_text, $ignore_videos, false, $image_callback );

            //delete everything in front of the current match including it
            $content = trim( substr( $content, $pos + strlen( $matches[0][ $idx ] ) ) );

            if ( false == $ignore_videos ) {
                //now let's handle the current video match
                $markup .= '<div class="portfolio__item portfolio__item--video js-portfolio-item">' . $matches[0][ $idx ] . '</div><!-- .portfolio__item--video -->' . PHP_EOL;
            }
        }
    }

	//SECOND, split by iframes and embeds that were not wrapped by Jetpack
	//this will use recursion to process content between the videos
	$tags = implode( '|', array( 'video', 'audio', 'iframe', 'embed' ) );
	$num_matches = preg_match_all( '#<(?P<tag>' . $tags . ')[^<]*?(?:>[\s\S]*?<\/(?P=tag)>|\s*\/>)#', $content, $matches );

	//if no videos found, continue to processing images and text
	if ( $num_matches > 0 ) {
		for ( $idx = 0; $idx < $num_matches; $idx++ ) {
			//first let's see if there is some content before the current match
			$pos = strpos( $content, $matches[0][ $idx ] );

			$before_content = trim( substr( $content, 0, $pos ) );

			//process the before content recursively
			$markup .= timber_process_partial_content( $before_content, $ignore_text, $ignore_videos, false, $image_callback );

			//delete everything in front of the current match including it
			$content = trim( substr( $content, $pos + strlen( $matches[0][ $idx ] ) ) );

			if ( false == $ignore_videos ) {
				//now let's handle the current video match
				$markup .= '<div class="portfolio__item portfolio__item--video js-portfolio-item">' . $matches[0][ $idx ] . '</div><!-- .portfolio__item--video -->' . PHP_EOL;
			}
		}
	}


	//THIRD, once done with the videos, we are left with the content after the last video (it there was any)
	//split this content by images (<img>,<figure>)
	$num_matches = preg_match_all( "!(?:<\s*p\s?[^>]*>\s*)?(?:<\s*figure\s?.*>\s*)?(?:<\s*?a\s?.*>\s*)?<\s*img\s?.*src=[\"|']([^\"']*)[\"|'].*alt=[\"|']([^\"']*)[\"|'].*/>(?:\s*</a\s*>)?(?:\s*<\s*figcaption\s?[^>]*>([^>]*)\s*</figcaption\s*>)?(?:\s*</figure>)?(?:\s*</p\s*>)?!i", $content, $matches );

	for ( $idx = 0; $idx < $num_matches; $idx++ ) {
		//first let's see if there is some content before the current match
		$pos = strpos( $content, $matches[0][ $idx ] );
		$before_content = trim( substr( $content, 0, $pos ) );
		if ( ! $ignore_text && ! empty( $before_content ) ) {
			//first a little bit of safety - better safe than sorry
			$before_content = balanceTags( $before_content, true );

			//a quick text to see if we have some actual content
			$temp_content = strip_tags($before_content, 'img');
			if ( ! empty( $temp_content ) ) {
				//let's make a text box
				$markup .= '<div class="portfolio__item portfolio__item--text">' . $before_content . '</div><!-- .portfolio__item--text -->' . PHP_EOL;
			}
		}

		//delete everything in front of the current match including it
		$content = trim( substr( $content, $pos + strlen( $matches[0][ $idx ] ) ) );

		//now let's handle the current match
		//let's see if we have a caption
		$caption = "";
		if ( ! empty( $matches[3][ $idx ] ) ) {
			$caption = $matches[3][ $idx ];
		}
		//first try and get an attachment ID - we may fail because it is an external image
		$attachment_id = timber_attachment_url_to_postid( $matches[1][ $idx ] );
		if ( $attachment_id ) {
			$markup .= call_user_func( $image_callback, $attachment_id, $caption );
		} else {
			//we have an external image

			//IGNORE IT for now as we can't reliably get dimensions
		}
	}

	if ( ! $ignore_text && ! empty( $content ) ) {
		//we have one last text box

		//first a little bit of safety - better safe than sorry
		$content = balanceTags( $content, true );

		//a quick text to see if we have some actual content (we don't strip images as that is content)
		$temp_content = strip_tags($content, 'img');
		if ( ! empty( $temp_content ) ) {
			//let's make a text box
			$markup .= '<div class="portfolio__item portfolio__item--text">' . $content . '</div><!-- .portfolio__item--text -->' . PHP_EOL;
		}
	}

	return $markup;
}
endif;

if ( ! function_exists( 'timber_get_film_strip_image' ) ) :
	/**
	 * Return markup for a single image in the film strip
	 *
     * @param int $id Optional. Attachment ID
     * @param string $caption Optional. The caption
	 * @return string The image markup
	 */
	function timber_get_film_strip_image( $id = null, $caption = "", $class = '' ) {
		$markup = '';

		//do nothing if we have no ID
		if ( empty( $id ) ) {
			return $markup;
		}

        if ( empty( $caption ) ) {
            //try to get the caption from the attachment metadata
            $caption = timber_get_img_caption( $id );
        }
		$image_full_size = wp_get_attachment_image_src( $id, 'full' );
		$image_small_size = wp_get_attachment_image_src( $id, 'timber-small-image' );
		$image_large_size = wp_get_attachment_image_src( $id, 'timber-large-image' );

		//get directly the raw metadata because Jetpack Photon ruins stuff for us - no dimensions are returned by wp_get_attachment_image_src()
		$image_data = wp_get_attachment_metadata( $id );

		$markup .=
		'<div class="portfolio__item js-placeholder js-portfolio-item  proof-photo ' . $class . '"
			data-srcsmall="' . $image_small_size[0] . '"
			data-srclarge="' . $image_large_size[0] . '"
			data-srcfull="' . $image_full_size[0] . '"
			id="' . $id . '"
			data-attachment_id="' . $id . '"
			data-alt="' . esc_attr( timber_get_img_alt( $id ) ) . '"
			data-caption="' . esc_attr( $caption ) . '"
			data-description="' . esc_attr( timber_get_img_description( $id ) ) . '"
			data-exif="' . esc_attr( timber_get_img_exif( $id ) ) . '"
			data-width="' . $image_data["width"] . '"
			data-height="' . $image_data["height"] . '">

			<div class="spinner">
			    <span class="spinner__side side--left"><span class="spinner__fill"></span></span>
			    <span class="spinner__side side--right"><span class="spinner__fill"></span></span>
			</div>

			<div class="proof__overlay">
				<button class="proof-btn  proof-btn--thumbs  js-thumbs"></button>
				<button class="proof-btn  proof-btn--zoom  js-zoom"></button>
				<button data-photoid="' . $id . '" class="proof-btn  proof-btn--plus  js-plus  select-action"></button>
				<button data-photoid="' . $id . '" class="proof-btn  proof-btn--minus  js-plus  select-action"></button>
			</div>
			<div class="proof__selected"></div>

			<noscript>
				<img src="' . $image_small_size[0] . '" alt="' . esc_attr( timber_get_img_alt( $id ) ) . '" width="' . $image_small_size[1] . '" height="' . $image_small_size[2] . '">
			</noscript>
		</div><!-- .portfolio__item -->' . PHP_EOL;

		return $markup;
	}

endif;

if ( ! function_exists( 'timber_get_slider_image' ) ) :
    /**
     * Return markup for a single image in the slider
     *
     * @param int $id Optional. Attachment ID
     * @param string $caption Optional. The caption
     * @return string The image markup
     */
    function timber_get_slider_image( $id = null, $caption = "" ) {
        $markup = '';

        //do nothing if we have no ID
        if ( empty( $id ) ) {
            return $markup;
        }

        if ( empty( $caption ) ) {
            //try to get the caption from the attachment metadata
            $caption = timber_get_img_caption( $id );
        }

        $image_full_size = wp_get_attachment_image_src( $id, 'full' );

		//get directly the raw metadata because Jetpack Photon ruins stuff for us - no dimensions are returned by wp_get_attachment_image_src()
		$image_data = wp_get_attachment_metadata( $id );

        $markup .=
            '<div class="project-slide  rsContent">' .
				'<img itemprop="image" src="' . $image_full_size[0] . '" class="rsImg" alt="' . esc_attr( timber_get_img_alt( $id ) ) . '" width="' . $image_data["width"] . '" height="' . $image_data["height"] . '">';
        if ( ! empty($caption) ) {
            $markup .= '<figure class="rsCaption">' . $caption . '</figure>';
        }
		$markup .= '</div><!-- .project-slide -->' . PHP_EOL;

        return $markup;
    }

endif;

if ( ! function_exists( 'timber_get_post_galleries' ) ) :
	/**
	 * Retrieves galleries from the passed post's content.
	 * Modified version of the core get_post_galleries() because we wanted the matched string also returned
	 *
	 *
	 * @param int|WP_Post $post Post ID or object.
	 * @param bool        $html Optional. Whether to return HTML or data in the array. Default true.
	 * @return array A list of arrays, each containing gallery data and srcs parsed
	 *               from the expanded shortcode.
	 */
	function timber_get_post_galleries( $post, $html = true ) {
		if ( ! $post = get_post( $post ) )
			return array();

		if ( ! has_shortcode( $post->post_content, 'gallery' ) )
			return array();

		$galleries = array();
		if ( preg_match_all( '/' . get_shortcode_regex() . '/s', $post->post_content, $matches, PREG_SET_ORDER ) ) {
			foreach ( $matches as $shortcode ) {
				if ( 'gallery' === $shortcode[2] ) {
					$srcs = array();

					$gallery = do_shortcode_tag( $shortcode );
					if ( $html ) {
						$galleries[] = $gallery;
					} else {
						preg_match_all( '#src=([\'"])(.+?)\1#is', $gallery, $src, PREG_SET_ORDER );
						if ( ! empty( $src ) ) {
							foreach ( $src as $s )
								$srcs[] = $s[2];
						}

						$data = shortcode_parse_atts( $shortcode[3] );
						$data['src'] = array_values( array_unique( $srcs ) );

						//add the matched string also
						$data['original'] = $shortcode[0];
						$galleries[] = $data;
					}
				}
			}
		}

		/**
		 * Filter the list of all found galleries in the given post.
		 *
		 * @since 3.6.0
		 *
		 * @param array   $galleries Associative array of all found post galleries.
		 * @param WP_Post $post      Post object.
		 */
		return apply_filters( 'get_post_galleries', $galleries, $post );
	}
endif;

/**
 * Handles the output of the media for audio attachment posts. This should be used within The Loop.
 *
 * @return string
 */
function timber_audio_attachment() {
	return hybrid_media_grabber( array( 'type' => 'audio', 'split_media' => true ) );
}
/**
 * Handles the output of the media for video attachment posts. This should be used within The Loop.
 *
 * @return string
 */
function timber_video_attachment() {
	return hybrid_media_grabber( array( 'type' => 'video', 'split_media' => true ) );
}

/**
 * Prints HTML with the category of a certain post, with the most posts in it
 * The most important category of a post
 *
 * @param int|WP_Post $post_ID Optional. Post ID or post object.
 */
function timber_first_category( $post_ID = null ) {
	global $wp_rewrite;

	//use the current post ID is none given
	if ( empty( $post_ID ) ) {
		$post_ID = get_the_ID();
	}

	//obviously pages don't have categories
	if ( 'page' == get_post_type( $post_ID ) ) {
		return;
	}

	//first get all categories ordered by count
	$all_categories = get_categories( array(
		'orderby' => 'count',
		'order' => 'DESC',
	) );

	//get the post's categories
	$categories = get_the_category( $post_ID );

	//now intersect them so that we are left with e descending ordered array of the post's categories
	$categories = array_uintersect( $all_categories, $categories, 'timber_compare_categories' );

	//remove the Uncategorized category
	if ( ! empty( $categories ) ) {
		$first_category = reset( $categories );
		while ( ! empty( $first_category ) && $first_category->term_id == get_option( 'default_category' ) ) {
			$first_category = array_shift( $categories );
		}
	}

	if ( ! empty ( $categories ) ) {
		$first_category = array_shift( $categories );
		$rel = ( is_object( $wp_rewrite ) && $wp_rewrite->using_permalinks() ) ? 'rel="category tag"' : 'rel="category"';

		echo '<div class="divider"></div><span class="cat-links"><a href="' . esc_url( get_category_link( $first_category->term_id ) ) . '" ' . $rel . '>' . $first_category->name . '</a></span>';
	}

} #function

/**
 * Prints HTML with the category of a certain post, with the most posts in it
 * The most important category of a post
 *
 * @param int|WP_Post $post_ID Optional. Post ID or post object.
 */
function timber_first_project_category( $post_ID = null ) {
	global $wp_rewrite;

	//use the current post ID is none given
	if ( empty( $post_ID ) ) {
		$post_ID = get_the_ID();
	}

	//first get all project types ordered by count
	$all_types = get_terms( 'jetpack-portfolio-type', array(
		'orderby' => 'count',
		'order' => 'DESC',
	) );

	//get the project's categories
	$types = get_the_terms( $post_ID, 'jetpack-portfolio-type');
	if ( empty( $types ) ) {
		return;
	}

	//now intersect them so that we are left with a descending ordered array of the post's categories
	$types = array_uintersect( $all_types, $types, 'timber_compare_categories' );

	if ( ! empty ( $types ) ) {
		$type = array_shift( $types );
		$rel = ( is_object( $wp_rewrite ) && $wp_rewrite->using_permalinks() ) ? 'rel="category tag"' : 'rel="category"';

		echo '<span class="divider"></span><span class="cat-links"><a href="' . esc_url( get_term_link( $term->term_id ) ) . '" ' . $rel . '>' . $term->name . '</a></span>';
	}

} #function

function timber_compare_categories( $a1, $a2 ) {
	if ( $a1->term_id == $a2->term_id ) {
		return 0; //we are only interested by equality but PHP wants the whole thing
	}

	if ( $a1->term_id > $a2->term_id ) {
		return 1;
	}
	return -1;
}

if ( ! function_exists( 'timber_the_categories_nav' ) ) :
	/**
	 * Print the categories navigation used for filtering the blog posts
	 */
	function timber_the_categories_nav() {
		//get only the top level categories
		$categories = get_categories(array(
			'orderby' => 'name',
			'order' => 'ASC',
			'hide_empty' => 1,
			'hierarchical' => false,
			'parent' => 0,
//			'number' => 15, //15 is the maximum we can beautifully handle
			'exclude' => get_option( 'default_category' ),
		) );

		if ( ! empty( $categories ) ) : ?>

			<ul class="filter">
				<li class="filter__item active" data-filter="*"><?php _e( 'All', 'timber' ); ?></li>

				<?php foreach ( $categories as $category ) : ?>

					<li class="filter__item" data-filter=".category-<?php echo $category->slug; ?>"><?php echo $category->name; ?></li>

				<?php endforeach; ?>

			</ul>

		<?php endif;
	}
endif;

if ( ! function_exists( 'timber_the_mobile_categories_nav' ) ) :
	/**
	 * Print the categories navigation used for filtering the blog posts
	 */
	function timber_the_mobile_categories_nav() {
		//get only the top level categories
		$categories = get_categories(array(
			'orderby' => 'name',
			'order' => 'ASC',
			'hide_empty' => 1,
			'hierarchical' => false,
			'parent' => 0,
//			'number' => 15, //15 is the maximum we can beautifully handle
			'exclude' => get_option( 'default_category' ),
		) );

		if ( ! empty( $categories ) ) : ?>
			<div class="mobile-filter-wrapper">
				<select class="filter  filter--mobile  js-filter-mobile-journal">
					<option class="filter__item active" data-filter="*"><?php _e( 'All categories', 'timber' ); ?></option>

					<?php foreach ( $categories as $category ) : ?>

						<option class="filter__item" data-filter=".category-<?php echo $category->slug; ?>"><?php echo $category->name; ?></option>

					<?php endforeach; ?>

				</select>
			</div>

		<?php endif;
	}
endif;

/**
 * Prints HTML with the list of project types (categories)
 *
 * @param int|WP_Post $post_ID Optional. Post ID or post object.
 */
function timber_the_project_types( $post_ID = null, $before = '<span class="entry-meta meta-categories">', $after = '</span>' ) {
	//use the current post ID is none given

	if ( empty( $post_ID ) ) {
		$post_ID = get_the_ID();
	}

	/*
     * Project category list
     */
	$separate_meta = _x( ', ', 'Used between list items, there is a space after the comma.', 'timber' );

	$terms_list = get_the_term_list( $post_ID, 'jetpack-portfolio-type', $before , $separate_meta, $after );

	// $terms_list will turn into an wp_error when the taxonomy is missing so check it first
	if ( ! is_wp_error( $terms_list ) ) {
		echo $terms_list;
	}
}

if ( ! function_exists( 'timber_get_post_format_link' ) ) :

	/**
	 * Returns HTML with the post format link
	 *
	 * @param int|WP_Post $post_ID Optional. Post ID or post object.
	 */
	function timber_get_post_format_link( $post_ID = null, $before = '', $after = '' ) {

		//use the current post ID is none given
		if ( empty( $post_ID ) ) {
			$post_ID = get_the_ID();
		}

		$post_format = get_post_format( $post_ID );

		if ( empty( $post_format ) || 'standard' == $post_format ) {
			return '';
		}

		return $before . '<span class="entry-format">
				<a href="' . esc_url( get_post_format_link( $post_format ) ) .'" title="' . esc_attr( sprintf( __( 'All %s Posts', 'timber' ), get_post_format_string( $post_format ) ) ) . '">' .
		       get_post_format_string( $post_format ) .
		       '</a>
			</span>' . $after;

	} #function

endif;

if ( ! function_exists( 'timber_post_format_link' ) ) :

	/**
	 * Prints HTML with the post format link
	 *
	 * @param int|WP_Post $post_ID Optional. Post ID or post object.
	 */
	function timber_post_format_link( $post_ID = null, $before = '', $after = '' ) {

		echo timber_get_post_format_link( $post_ID, $before, $after );

	} #function

endif;

function timber_get_post_gallery_count( $post_ID = null ) {
	//use the current post ID is none given
	if ( empty( $post_ID ) ) {
		$post_ID = get_the_ID();
	}

	$images = get_post_gallery_images( $post_ID );

	if ( ! empty($images) ) {
		return count( $images );
	}

	return false;
}

/**
 * Get a number of random attachments attached to the jetpack-portfolio CPT
 *
 * @param int $maxnum Optional. Max number of random projects images to return
 * @return array List of images
 */
function timber_get_random_projects_images( $maxnum = 5 ) {
    $projects = get_posts( array(
        'post_type' => 'jetpack-portfolio',
        'posts_per_page' => -1,
        'fields' => 'ids'
    ) );

    if ( ! empty($projects) ) {
        $args = array(
            'post_parent__in' => $projects,
            'post_type'   => 'attachment',
            'numberposts' => $maxnum,
            'post_status' => 'any',
            'post_mime_type' => 'image',
            'orderby' => 'rand',
        );
        $images = get_posts( $args );

        return $images;
    }

    return array();
}

/**
 * Print a JSON encoded array of a number of random attachments srcs from those attached to the jetpack-portfolio CPT.
 *
 * @param int $maxnum Optional. Max number of random projects images srcs to return
 */
function timber_the_random_projects_images_srcs( $maxnum = 5 ) {
    $random_images = timber_get_random_projects_images( $maxnum );

    $image_srcs = array();
    if ( ! empty( $random_images ) ) {
        foreach ($random_images as $key => $image) {
            $thumbnail = wp_get_attachment_image_src( $image->ID, 'thumbnail' );
            if ( $thumbnail ) {
                $image_srcs[] = $thumbnail[0];
            }
        }
    }

    echo json_encode( $image_srcs );
}

/**
 * Print a JSON encoded array of a number of random attachments data uris from those attached to the jetpack-portfolio CPT.
 *
 * @param int $maxnum Optional. Max number of random projects images srcs to return
 */
function timber_the_random_projects_images_data_uri( $maxnum = 5 ) {
    $random_images = timber_get_random_projects_images( $maxnum );

    $image_data_uris = array();
    if ( ! empty( $random_images ) ) {
        $upload_dir = wp_upload_dir();

        foreach ($random_images as $key => $image) {
            $thumbnail = image_get_intermediate_size( $image->ID, 'thumbnail' );
            if ( $thumbnail ) {
                $image_data_uris[] = data_uri( trailingslashit( $upload_dir['basedir'] ) . $thumbnail['path'], $image->post_mime_type );
            }
        }
    }

    echo json_encode( $image_data_uris );
}

function data_uri($file, $mime)
{
    $contents = file_get_contents($file);
    $base64   = base64_encode($contents);
    return ('data:' . $mime . ';base64,' . $base64);
}

if ( ! function_exists('timber_body_attributes') ):
	function timber_body_attributes() {
		//we use this so we can generate links with post id
		//right now we use it to change the Edit Post link in the admin bar
		$data_currentID = '';
		$data_currentEditString = '';
		$data_currentTaxonomy = '';
//		if ( ( pixelgrade_option('use_ajax_loading') == 1 ) ) {
			$current_object = get_queried_object();

			if (!empty($current_object->post_type)
				&& ($post_type_object = get_post_type_object($current_object->post_type))
				&& current_user_can('edit_post', $current_object->ID)
				&& $post_type_object->show_ui && $post_type_object->show_in_admin_bar ) {
				$data_currentID = 'data-curpostid="' . $current_object->ID . '" ';
				if (isset($post_type_object->labels) && isset($post_type_object->labels->edit_item)) {
					$data_currentEditString = 'data-curpostedit="' . esc_attr( $post_type_object->labels->edit_item ) . '" ';
				}
			} elseif (!empty($current_object->taxonomy)
				&& ($tax = get_taxonomy($current_object->taxonomy))
				&& current_user_can($tax->cap->edit_terms)
				&& $tax->show_ui ) {
				$data_currentID = 'data-curpostid="' . esc_attr( $current_object->term_id ) . '" ';
				$data_currentTaxonomy = 'data-curtaxonomy="' . esc_attr( $current_object->taxonomy ) . '" ';
				if ( isset($tax->labels ) && isset( $tax->labels->edit_item ) ) {
					$data_currentEditString = 'data-curpostedit="' . esc_attr( $tax->labels->edit_item ) . '" ';
				}
			}

			echo $data_currentID . $data_currentEditString . $data_currentTaxonomy;
//		}
	}
endif;

/**
 * Display the classes for the post title div.
 *
 * @param string|array $class One or more classes to add to the class list.
 * @param int|WP_Post $post_id Optional. Post ID or post object.
 * @return string
 */
function timber_get_post_title_class_attr( $class = '', $post_id = null ) {
	// Separates classes with a single space, collates classes for post title
	return 'class="' . join( ' ', timber_get_post_title_class( $class, $post_id ) ) . '"';
}

if ( ! function_exists( 'timber_get_post_title_class' ) ) :

	/**
	 * Retrieve the classes for the post title,
	 * depending on the length of the title
	 *
	 * @param string|array $class One or more classes to add to the class list.
	 * @return array Array of classes.
	 */
	function timber_get_post_title_class( $class = '', $post_id = null ) {

		$post = get_post( $post_id );

		$classes = array();

		if ( empty( $post ) ) {
			return $classes;
		}

		$classes[] = 'entry-header';

		// .entry-header--[short|medium|long] depending on the title length
		// 0-29 chars = short
		// 30-59 = medium
		// 60+ = long
		$title_length = mb_strlen( get_the_title( $post ) );

		if ( $title_length < 30 ) {
			$classes[] = 'entry-header--short';
		} elseif ( $title_length < 60 ) {
			$classes[] = 'entry-header--medium';
		} else {
			$classes[] = 'entry-header--long';
		}

		if ( ! empty($class) ) {
			if ( ! is_array( $class ) ) {
				$class = preg_split( '#\s+#', $class );
			}

			$classes = array_merge( $classes, $class );
		}

		$classes = array_map( 'esc_attr', $classes );

		/**
		 * Filter the list of CSS classes for the current post title.
		 *
		 * @param array  $classes An array of post classes.
		 * @param string $class   A comma-separated list of additional classes added to the post.
		 * @param int    $post_id The post ID.
		 */
		$classes = apply_filters( 'timber_post_title_class', $classes, $class, $post->ID );

		return array_unique( $classes );
	} #function

endif;

if ( ! function_exists( 'timber_first_site_title_character' ) ) :
	/**
	 * Returns the first UTF-8 character of the site title
	 * returns empty string if nothing found
	 *
	 * @param bool $data_attribute
	 *
	 * @return string
	 */
	function timber_first_site_title_character() {
		$title = get_bloginfo('name');
		if ( empty($title) ) {
			return;
		}
		$first_letter = '';
		//find the first alphanumeric character - multibyte
		//suppress warnings and errors since this might fail if there is no appropiate UTF8 PHP support
		@preg_match( '/[\p{Xan}]/u', $title, $results );
		if ( isset( $results ) && ! empty( $results[0] ) ) {
			$first_letter = $results[0];
		} else {
			//lets try the old fashion way
			//find the first alphanumeric character - non-multibyte
			preg_match( '/[a-zA-Z\d]/', $title, $results );
			if ( isset( $results ) && ! empty( $results[0] ) ) {
				$first_letter = $results[0];
			}
		};
		return $first_letter;
	}
endif;

if ( ! function_exists( 'timber_get_portfolio_page_link' ) ) :
	// Return the slug of the page with the page-templates/custom-portfolio-archive.php template or the post type archive if no page was found
	function timber_get_portfolio_page_link() {

	    $pages = get_pages(
	        array(
	            'sort_order'  => 'DESC',
	            'sort_column' => 'ID',
	            'meta_key'    => '_wp_page_template',
	            'meta_value'  => 'page-templates/custom-portfolio-page.php',
	            'parent'      => -1,
	            'suppress_filters' => false, //allow filters - like WPML
	        )
	    );

	    if ( ! empty( $pages ) ) {
	        //find the page with the Portfolio Archive option selected
	        foreach ( $pages as $page ) {
	            $custom_portfolio_page_type = get_post_meta( timber_get_post_id( $page->ID, 'page' ), 'custom_portfolio_page_type', true);
	            if ( 'portfolio' === $custom_portfolio_page_type  ) {
	                //found it
	                return get_page_link( timber_get_post_id( $page->ID, 'page' ) );
	            }
	        }
	    }

	    //fallback to the archive slug
	    return get_post_type_archive_link( 'jetpack-portfolio' );
	}

endif;
