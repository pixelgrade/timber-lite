<?php
/**
 * The template for displaying search results pages.
 *
 * @package Timber
 */

get_header(); ?>

<div class="site-container  site-content">
	<?php if ( have_posts() ) : ?>
		<div class="filmstrip">
			<div class="site-sidebar">
				<div class="site-sidebar__content">
					<?php printf( esc_html__( 'Search Results for: %s', 'timber' ), '<span>' . get_search_query() . '</span>' ); ?>
				</div>
			</div>
			<?php /* Start the Loop */ ?>
			<?php while ( have_posts() ) : the_post(); ?>
				<div class="filmstrip__item">
				<?php

					/*
					 * Include the Post-Format-specific template for the content.
					 * If you want to override this in a child theme, then include a file
					 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
					 */
					get_template_part( 'template-parts/content', 'get_post_format()' );
				?>
				</div>
			<?php endwhile; ?>
		<?php timber_paging_nav(); ?>
		</div>
	<?php else : ?>
		<?php get_template_part( 'template-parts/content', 'none' ); ?>
	<?php endif; ?>
</div>

<div class="site-footer">
	<div class="bar--fixed"></div>
</div>

<?php get_footer(); ?>
