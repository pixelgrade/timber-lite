<?php
/**
 * The template for displaying the footer for single posts.
 *
 * @package Timber
 * @since Timber 1.0
 */ ?>
<footer id="colophon" class="site-footer  site-footer--single" role="contentinfo">
	<div class="theme-name"><?php printf( esc_html__( 'Theme &#8212; %1$s', 'timber' ), 'Timber' ); ?></div>
	<div class="site-info">
		<?php echo timber_get_option( 'footer_copyright' ); ?>
	</div><!-- .site-info -->
	<button class="back-to-top  js-back-to-top"><?php _e( 'Back to top', 'timber' ); ?></button>
</footer><!-- #colophon -->