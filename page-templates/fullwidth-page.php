<?php
/**
 * Template Name: Full Width Page
 *
 * @package Timber
 * @since Timber 1.0
 */

get_header();

if ( post_password_required() ) {
	echo get_the_password_form();
} else { ?>
	<div id="primary" class="content-area">
		<main id="main" class="site-main">

			<div class="site-header site-header--placeholder"></div>

			<?php while ( have_posts() ) : the_post(); ?>

				<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
					<header class="entry-header">
						<?php the_title( '<h1 ' . timber_get_post_title_class_attr( 'entry-title  h0' ) . '>', '</h1>' ); ?>
					</header>
					<!-- .entry-header -->

					<div class="entry-content--fullwidth">
						<?php the_content(); ?>
						<?php
						wp_link_pages( array(
							'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'timber' ),
							'after'  => '</div>',
						) );
						?>
					</div>
					<!-- .entry-content -->
				</article><!-- #post-## -->

			<?php endwhile; // End of the loop. ?>

		</main>
		<!-- #main -->
	</div><!-- #primary -->
<?php }

get_footer(); ?>