<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package Timber
 */

?>

       </div><!-- #content -->

   </div><!-- .site-container -->

	<footer id="colophon" class="site-footer" role="contentinfo">
        <button class="share-button"><i class="fa fa-share-alt"></i></button>
		<div class="site-info">
			<a href="<?php echo esc_url( __( 'http://wordpress.org/', 'timber' ) ); ?>"><?php printf( esc_html__( 'Proudly powered by %s', 'timber' ), 'WordPress' ); ?></a>
			<span class="sep"> | </span>
			<?php printf( esc_html__( 'Theme: %1$s by %2$s.', 'timber' ), 'timber', '<a href="https://pixelgrade.com" rel="designer">Pixelgrade</a>' ); ?>
		</div><!-- .site-info -->
        <button class="show-button"><span>show thumbnails</span></button>
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
