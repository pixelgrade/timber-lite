<?php
/**
 * Template part for displaying posts.
 *
 * @package Timber
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">

		<?php if ( 'post' == get_post_type() ) : ?>
		<div class="entry-meta">

			<?php timber_posted_on(); ?>

			<?php timber_first_category(); ?>

		</div><!-- .entry-meta -->
		<?php endif; ?>

		<?php the_title( sprintf( '<h1 class="entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h1>' ); ?>
		
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

	<footer class="entry-footer">
		<?php timber_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->
