<?php
/**
 * Template Name: Front Page Template
 *
 * Aimed at being used as a static front page where you can showcase your featured projects in a fullscreen slideshow
 *
 * @package Timber
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<?php
			$featured = timber_get_featured_projects();

			if ( ! empty( $featured ) ) : ?>

				<div class="featured-projects-slider  royalSlider  js-pixslider" data-slidertransition="move" data-imagealigncenter data-imagescale="fill">

				<?php foreach ( $featured as $post ) : setup_postdata( $post );

					get_template_part( 'template-parts/content', 'portfolio-featured' );

				endforeach; ?>

				</div><!-- .featured-projects-slider -->

			<?php else :

				get_template_part( 'template-parts/content', 'none' );

			endif;
			?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>