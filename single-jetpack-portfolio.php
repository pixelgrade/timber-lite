<?php
/**
 * The Template for displaying all single portfolio posts
 *
 * @package Timber
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

		<?php while ( have_posts() ) : the_post(); ?>

			<?php get_template_part( 'template-parts/content', 'portfolio-single' ); ?>

			<?php the_post_navigation(); ?>

			<?php comments_template(); ?>

		<?php endwhile; // end of the loop. ?>

		</main><!-- #main -->
	</div><!-- #primary .content-area -->

<?php get_footer(); ?>
