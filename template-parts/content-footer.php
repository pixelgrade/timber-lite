<?php
/**
 * Template part for displaying the post footer.
 *
 * @package Timber
 * @since Timber 1.0
 */
?>

<footer id="colophon" class="site-footer" role="contentinfo">

    <div class="project-addthis-container">
        <?php get_template_part('template-parts/addthis-share'); ?>
    </div>

    <div class="site-info">
        <a href="<?php echo esc_url( __( 'http://wordpress.org/', 'timber' ) ); ?>"><?php printf( esc_html__( 'Proudly powered by %s', 'timber' ), 'WordPress' ); ?></a>
        <span class="sep"> | </span>
        <?php printf( esc_html__( 'Theme: %1$s by %2$s.', 'timber' ), 'timber', '<a href="https://pixelgrade.com" rel="designer">Pixelgrade</a>' ); ?>
    </div><!-- .site-info -->
    <button class="show-button"><span><?php _e( 'show thumbnails', 'timber' ); ?></span></button>
</footer><!-- #colophon -->