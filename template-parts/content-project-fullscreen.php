<?php
/**
 * The template used for displaying a project (Jetpack Portfolio Single Post) using the Fullscreen layout
 *
 * @package Timber
 * @since Timber 1.0
 */

$image_scaling 		= get_post_meta( timber_get_post_id(), 'fullscreen_image_scaling', true);

if ( empty( $image_scaling ) ) {
	$image_scaling = 'fill';
}

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="fullscreen-slider  royalSlider  js-pixslider"
	     data-slidertransition="move"
	     data-imagealigncenter
	     data-imagescale="<?php echo $image_scaling; ?>"
	     data-arrows
	     data-keyboardnav >

        <?php timber_the_project_slider_images( get_the_ID(), true, true ); ?>

	</div><!-- .featured-projects-slider -->
</article><!-- #post-<?php the_ID(); ?> .entry-content -->