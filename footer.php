<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package Timber
 * @since Timber 1.0
 */

if ( ( is_page() && ! is_page_template( 'page-templates/custom-portfolio-page.php' ) ) || ( is_single() && ! get_post_type() == 'jetpack-portfolio') ) {
	get_template_part( 'footer-single' );
} ?>

</div><!-- #page -->
<div class="overlay">
	<div class="overlay__wrapper">
		<?php if ( is_active_sidebar( 'overlay-widget-area-1' ) ) : ?>
		<div class="overlay__col  col1">
			<?php dynamic_sidebar( 'overlay-widget-area-1' ); ?>
		</div>
		<?php endif; ?>
		<?php if ( is_active_sidebar( 'overlay-widget-area-2' ) || is_active_sidebar( 'overlay-widget-area-3' ) ) : ?>
		<div class="overlay__col  col2">
				<div class="sub-col">
					<?php if ( is_active_sidebar( 'overlay-widget-area-2' ) ) : ?>
						<?php dynamic_sidebar( 'overlay-widget-area-2' ); ?>
					<?php endif; ?>
				</div>
				<div class="sub-col">
					<?php if ( is_active_sidebar( 'overlay-widget-area-3' ) ) : ?>
						<?php dynamic_sidebar( 'overlay-widget-area-3' ); ?>
					<?php endif; ?>
				</div>
		</div>
		<?php endif; ?>
	</div>
	<button class="overlay__close  js-overlay-trigger"><i class="fa  fa-times-circle-o"></i></button>
</div><!-- .overlay -->

<script>
    var loaderRandomImages = <?php timber_the_random_projects_images_srcs(); ?>;
</script>

<?php wp_footer();?>
</body>
</html>