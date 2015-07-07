<?php
/**
 * The template for displaying archive pages.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package Timber
 * @since Timber 1.0
 */

get_header(); ?>

<div class="site-header  site-header--placeholder"></div>
<div class="site-container  site-content">
	<?php if ( have_posts() ) : ?>
		<div class="filmstrip">
			<div class="site-sidebar">
				<div class="site-sidebar__content"><?php the_archive_title(); ?></div>
			</div>

			<?php
			/* Start the Loop */
			while ( have_posts() ) : the_post(); ?>
				<?php

					/*
					 * Include the Post-Format-specific template for the content.
					 * If you want to override this in a child theme, then include a file
					 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
					 */
					get_template_part( 'template-parts/content', get_post_format() );
				?>
			<?php endwhile; ?>
		    <?php timber_paging_nav(); ?>

		</div>
	<?php else : ?>
		<?php get_template_part( 'template-parts/content', 'none' ); ?>
	<?php endif; ?>
</div>

<?php get_footer(); ?>