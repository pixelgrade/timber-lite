<?php
/**
 * Template Name: Custom Portfolio Template
 *
 * Aimed at being used as a static front page where you can showcase your featured projects in a fullscreen slideshow
 *
 * @package Timber
 * @since Timber 1.0
 */

get_header();

$custom_portfolio_page_type = get_post_meta( timber_get_post_id(), 'custom_portfolio_page_type', true);

$template_part = 'template-parts/page-featured-projects';

if ( $custom_portfolio_page_type === 'portfolio' ) {
	$template_part = 'template-parts/page-portfolio';
}

if ( $custom_portfolio_page_type === 'project' ) {
// @TODO try to recreate the single-jetpack-portfolio as simple as possible here
/*
	$homepage_project = get_post_meta( timber_get_post_id(), 'homepage_project', true);

	if ( is_numeric($homepage_project) ) {

		$the_post = get_post( $homepage_project );
		$post = $the_post;
		setup_postdata( $post );

		$project_template = get_post_meta( timber_get_post_id( $the_post->ID ), 'project_template', true);

		//in case nothing is returned default to a hybrid template
		if ( empty( $project_template ) ) {
			$project_template = 'hybrid';
		}

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

		wp_reset_postdata();
	}
*/
} else {
	get_template_part( $template_part );
}

wp_reset_query();
get_footer();