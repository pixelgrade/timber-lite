<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package Timber
 */

?>


<?php //if ( is_page() || is_single() && ! get_post_type() == 'jetpack-portfolio' ) get_template_part( 'template-parts/content', 'single-footer' ); ?>

</div><!-- #page -->
<div class="overlay">
	<div class="overlay__wrapper">
		<?php if ( is_active_sidebar( 'overlay-widget-area-1' ) ) : ?>
		<div class="overlay__col  col1">
			<?php dynamic_sidebar( 'overlay-widget-area-1' ); ?>
		</div>
		<?php endif; ?>
		<?php if ( is_active_sidebar( 'overlay-widget-area-2' ) ) : ?>
		<div class="overlay__col  col2">
			<?php dynamic_sidebar( 'overlay-widget-area-2' ); ?>
		</div>
		<?php endif; ?>
		<?php if ( is_active_sidebar( 'overlay-widget-area-3' ) ) : ?>
		<div class="overlay__col  col3">
			<?php dynamic_sidebar( 'overlay-widget-area-3' ); ?>
		</div>
		<?php endif; ?>
	</div>
	<button class="overlay__close  js-overlay-trigger"><i class="fa  fa-times-circle-o"></i></button>
</div><!-- .overlay -->

<?php wp_footer(); ?>
</body>
</html>