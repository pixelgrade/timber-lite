<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @package Timber
 * @since Timber 1.0
 */

get_header(); ?>
<div class="site-header  site-header--placeholder"></div>
<div class="site-container  site-content">
	<section class="no-results not-found">
		<header class="page-header">
			<h1 class="page-title"><?php esc_html_e( 'Oops! That page can&rsquo;t be found.', 'timber' ); ?></h1>
		</header><!-- .page-header -->

		<div class="page-content">

			<p><?php esc_html_e( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', 'timber' ); ?></p>

			<?php get_search_form(); ?>

		</div><!-- .page-content -->
	</section><!-- .no-results -->
</div>

<div class="site-footer">
	<div class="bar--fixed"></div>
</div>

<?php get_footer(); ?>