<?php
global $post;

$project_template 	= get_post_meta( timber_get_post_id(), 'project_template', true);
$image_scaling 		= get_post_meta( timber_get_post_id(), 'fullscreen_image_scaling', true);

//in case nothing is returned default to a filmstrip template
if ( empty( $project_template ) ) {
	$project_template = 'filmstrip';
}

if ( empty( $image_scaling ) ) {
	$image_scaling = 'fill';
}

// the $post variable will be served be the parent template

if ( 'fullscreen' == $project_template ): ?>

<main id="content" class="site-content  site-container  site-content--fullscreen  <?php echo 'image-scaling--' . $image_scaling; ?>">

	<?php get_template_part( 'template-parts/content', 'project-fullscreen' ); ?>

</main>

<footer id="colophon" class="site-footer" role="contentinfo">
	<div class="bar--fixed">
		<div class="site-info">
			<div class="gallery-counter  js-gallery-counter">
				<span class="js-unit">1</span>
				<span><?php _e( 'of', 'timber-lite' ); ?></span>
				<span class="js-gallery-slides-total"></span>
			</div>
		</div><!-- .site-info -->
	</div>
</footer><!-- #colophon -->

<?php else : ?>

<div class="site-header  site-header--placeholder"></div>

<main id="content" class="site-content site-container  <?php echo 'image-scaling--' . $image_scaling; ?>">

	<?php get_template_part( 'template-parts/content', 'project-filmstrip' ); ?>

</main>

<footer id="colophon" class="site-footer" role="contentinfo">
	<div class="bar--fixed">
		<div class="site-info">
			<div class="portfolio__position"></div>
			<button class="show-details caption js-details"><span><?php _e( 'details', 'timber-lite' ); ?></span></button>
		</div><!-- .site-info -->
	</div>
</footer><!-- #colophon -->

<?php endif;
