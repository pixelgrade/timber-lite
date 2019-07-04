<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
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
			<div class="site-sidebar  site-sidebar--archive">
				<div class="site-sidebar__content  site-sidebar__text"><?php _e( 'Journal', 'timber-lite' ); ?></div>
				<?php timber_the_mobile_categories_nav(); ?>
			</div>
			<?php /* Start the Loop */ ?>
			<?php while ( have_posts() ) : the_post(); ?>
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
			<?php get_template_part( 'template-parts/preloader' ); ?>
		</div>
	<?php else : ?>
		<?php get_template_part( 'template-parts/content', 'none' ); ?>
	<?php endif; ?>
</div>

<div class="site-footer">
	<div class="bar--fixed">
		<?php timber_the_categories_nav(); ?>
	</div>
</div>

<?php get_footer(); ?>
