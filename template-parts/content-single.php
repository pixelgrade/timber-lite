<?php
/**
 * Template part for displaying single posts.
 *
 * @package Timber
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php the_title( '<h1 class="entry-title  h0">', '</h1>' ); ?>

		<div class="entry-meta">
			<?php timber_posted_on(); ?>
			<span class="divider"></span>
			<span class="cat-links"><?php echo get_the_category_list( ',' ); ?></span>
		</div><!-- .entry-meta -->
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php the_content(); ?>
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

