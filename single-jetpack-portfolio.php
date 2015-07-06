<?php
/**
 * The Template for displaying a single project
 *
 * @package Timber
 * @since Timber 1.0
 */

get_header();

$project_template = get_post_meta( timber_get_post_id(), 'project_template', true);
//in case nothing is returned default to a hybrid template
if ( empty( $project_template ) ) {
	$project_template = 'hybrid';
}

while ( have_posts() ) : the_post();
	if ( 'hybrid' == $project_template ): ?>

	<main id="content" class="site-content site-container site-content--filmstrip">

		<?php get_template_part( 'template-parts/content', 'project-filmstrip' ); ?>

	</main>

	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="bar--fixed">

			<?php get_template_part('template-parts/addthis-share'); ?>

			<div class="site-info">
				<div class="portfolio__position"></div>
				<a class="show-details caption js-details" href="#"><span><?php _e( 'details', 'timber' ); ?></span></a>
			</div><!-- .site-info -->
			<button class="show-button caption js-show-thumbnails"><span><?php _e( 'show thumbnails', 'timber' ); ?></span></button>
		</div>
	</footer><!-- #colophon -->

	<?php else : ?>

	<main id="content" class="site-content  site-container  site-content--fullscreen">

		<?php get_template_part( 'template-parts/content', 'project-fullscreen' ); ?>

	</main>

	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="bar--fixed">

			<?php get_template_part('template-parts/addthis-share'); ?>

			<div class="site-info">
				<div class="gallery-counter  js-gallery-counter">
					<span class="js-unit">1</span>
					<span>of</span>
					<span class="js-gallery-slides-total"></span>
				</div>
			</div><!-- .site-info -->
			<button class="show-button  js-show-thumbnails"></button>
		</div>
	</footer><!-- #colophon -->

	<?php endif;

endwhile; // end of the loop.

get_footer(); ?>