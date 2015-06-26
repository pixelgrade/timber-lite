<?php
/**
 * The Template for displaying a project
 *
 * @package Timber
 */

get_header();

$project_template = get_post_meta( timber_get_post_id(), 'project_template', true);

while ( have_posts() ) : the_post();
	if ( $project_template == 'hybrid' ): ?>

	<main id="content" class="site-content site-container site-content--filmstrip">
		<?php get_template_part( 'template-parts/content', 'project-filmstrip' ); ?>
	</main>

	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="bar--fixed">
			<button class="share-button"><i class="fa fa-share-alt"></i></button>
			<div class="site-info">
				<div class="portfolio__position"></div>
				<a class="show-details js-details" href="#">show details</a>
			</div>
			<!-- .site-info -->
			<button class="show-button  js-show-thumbnails"><span>show thumbnails</span></button>
		</div>
	</footer><!-- #colophon -->

	<?php else : ?>

	<main id="content" class="site-content  site-container  site-content--fullscreen">
		<?php get_template_part( 'template-parts/content', 'project-fullscreen' ); ?>
	</main>

	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="bar--fixed">
			<button class="share-button"><i class="fa fa-share-alt"></i></button>
			<div class="site-info">
				<div class="gallery-counter  js-gallery-counter">
					<span class="js-unit">1</span>
					<span>of</span>
					<span class="js-gallery-slides-total"></span>
				</div>
			</div>
			<!-- .site-info -->
			<button class="show-button  js-show-thumbnails"></button>
		</div>
	</footer><!-- #colophon -->

	<?php endif;

endwhile; // end of the loop.

get_footer(); ?>
