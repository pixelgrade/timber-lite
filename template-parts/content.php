<?php
/**
 * Template part for displaying posts.
 *
 * @package Timber
 * @since Timber 1.0
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('filmstrip__item'); ?>>
	<a href="<?php the_permalink(); ?>">
		<aside class="entry-thumbnail">

			<?php timber_the_post_thumbnail( get_the_ID(), 'timber-image-square' ); ?>

			<?php if ( 'post' == get_post_type() && in_array( get_post_format(), array( 'gallery', 'video', 'audio' ) ) ) : ?>

				<div class="post-meta">
					<div class="post-meta__content">
						<?php
						$post_format = get_post_format();
						switch ( $post_format ) {
							case 'video':
							case 'audio': echo '<i class="icon  icon-play"></i>';
								break;
							case 'gallery': echo timber_get_post_gallery_count();
                                break;
						} ?>
					</div>
				</div>

			<?php endif; ?>
		</aside>
	</a>

	<header class="entry-header">
		<div class="entry-meta">

			<?php if ( 'post' == get_post_type() ) {
                timber_posted_on();
                timber_first_category();
            } else {
                echo get_post_type();
            } ?>

		</div><!-- .entry-meta -->

		<?php the_title( sprintf( '<h1 class="entry-title h3"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h1>' ); ?>

	</header><!-- .entry-header -->

	<div class="entry-content">

		<?php timber_post_excerpt(); ?>

		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'timber' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->

</article><!-- #post-## -->
