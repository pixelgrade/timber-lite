<?php
/**
 * The template for displaying single gallery post format posts.
 *
 * @package Timber
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php
	/* translators: used between list items, there is a space after the comma */
	$category_list = get_the_category_list( __( ', ', 'timber' ) ); ?>

	<header class="entry-header">
		<?php the_title( '<h1 class="entry-title  h0">', '</h1>' ); ?>

		<div class="entry-meta">

			<?php timber_posted_on(); ?>

			<?php timber_post_format_link( get_the_ID(), '<span class="divider"></span>' ); ?>

			<?php if ( $category_list && timber_categorized_blog() ) { ?>

				<span class="divider"></span>
				<span class="cat-links">
					<?php echo $category_list; ?>
				</span>

			<?php } // End if categories ?>

		</div><!-- .entry-meta -->

		<?php //output the first gallery in the content - if it exists
		$gallery = get_post_gallery();
		if ( $gallery ) { ?>

			<div class="entry-featured  entry-gallery">
				<?php echo $gallery; ?>
			</div><!-- .entry-gallery -->

		<?php } ?>

	</header><!-- .entry-header -->

	<div class="entry-content">

		<?php the_content(); ?>
		<?php
		wp_link_pages( array(
			'before'           => '<div class="page-links  pagination">',
			'after'            => '</div>',
			'next_or_number'   => 'number',
			'nextpagelink'     => __( 'Next page', 'timber' ),
			'previouspagelink' => __( 'Previous page', 'timber' ),
			'pagelink'         => '%',
			'echo'             => 1,
		) ); ?>

	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php timber_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->