<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package Timber
 * @since Timber 1.0
 */

if ( ! timber_post_is_project() && ( is_page() || is_single() ) ) {

	$show_footer = true;
	if ( is_page() ) {
		$custom_portfolio_page_type = get_post_meta( timber_get_post_id(), 'custom_portfolio_page_type', true);
		IF ( $custom_portfolio_page_type === 'project_slider' ) {
			$show_footer = false;
		}
	}

	if ( $show_footer ) {
		get_template_part( 'footer-single' );
	}
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