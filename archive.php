<?php
/**
 * The template for displaying archive pages.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package Timber
 */

get_header(); ?>

	<?php if ( have_posts() ) : ?>

		<div class="filmstrip">

		<header class="page-header">
			<?php
				the_archive_title( '<h1 class="page-title">', '</h1>' );
				the_archive_description( '<div class="taxonomy-description">', '</div>' );
			?>
		</header><!-- .page-header -->

		<?php if ( is_post_type_archive( 'jetpack-portfolio' ) || is_tax( 'jetpack-portfolio-type' ) || is_tax( 'jetpack-portfolio-tag' ) ) :
			/**
			 * Loop for Portfolio post types
			 */
			?>
				<?php while ( have_posts() ) : the_post(); ?>
					<div class="filmstrip--item">
						<?php get_template_part( 'template-parts/content', 'portfolio' ); ?>
					</div>
				<?php endwhile; ?>

		<?php
		else :
			/**
			 * Loop for all other post types
			 */
			?>
			<div class="archive-posts posts" id="posts">
				<?php
				while ( have_posts() ) : the_post();
					get_template_part( 'template-parts/content', get_post_format() );
				endwhile;
				?>
			</div>

		<?php
		endif;

		timber_paging_nav(); ?>

	<?php else : ?>

		<?php get_template_part( 'template-parts/content', 'none' ); ?>

	<?php endif; ?>

	</div>

<?php get_footer(); ?>
