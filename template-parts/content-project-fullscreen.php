<?php
/**
 * The template used for displaying a project (Jetpack Portfolio Single Post) using the Fullscreen layout
 *
 * @package Timber
 * @since Timber 1.0
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="fullscreen-slider  royalSlider  js-pixslider"
	     data-slidertransition="move"
	     data-imagealigncenter
	     data-imagescale="fill"
	     data-arrows
	     data-keyboardnav >

        <?php timber_the_project_slider_images( get_the_ID(), true, true ); ?>

	</div><!-- .featured-projects-slider -->
</article><!-- #post-<?php the_ID(); ?> .entry-content -->