<footer id="colophon" class="site-footer" role="contentinfo">

    <?php get_template_part('template-parts/addthis-share'); ?>

    <div class="site-info">
        <a href="<?php echo esc_url( __( 'http://wordpress.org/', 'timber' ) ); ?>"><?php printf( esc_html__( 'Proudly powered by %s', 'timber' ), 'WordPress' ); ?></a>
        <span class="sep"> | </span>
        <?php printf( esc_html__( 'Theme: %1$s by %2$s.', 'timber' ), 'timber', '<a href="https://pixelgrade.com" rel="designer">Pixelgrade</a>' ); ?>
    </div><!-- .site-info -->
    <button class="show-button"><span><?php _e( 'show thumbnails', 'timber' ); ?></span></button>
</footer><!-- #colophon -->