<?php
/**
 * The template for displaying the footer for single posts.
 *
 * @package Timber
 * @since Timber 1.0
 */ ?>
<footer id="colophon" class="site-footer  site-footer--single">
	<div class="theme-name"><?php
		/* translators: 1: Theme slug */
		printf( esc_html__( 'Theme &#8212; %1$s', 'timber-lite' ), 'timber-lite' ); ?></div>
	<?php pixelgrade_footer_the_copyright() ?>
	<a href="#top" class="back-to-top"><?php _e( 'Back to top', 'timber-lite' ); ?></a>
</footer><!-- #colophon -->
