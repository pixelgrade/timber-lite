<?php
/**
 * The template for displaying single video post format posts.
 *
 * @package Timber
 * @since Timber 1.0
 */

//get the media objects from the content and bring up only the first one
$media  = timber_video_attachment(); ?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php
	/* translators: used between list items, there is a space after the comma */
	$category_list = get_the_category_list( __( ', ', 'timber' ) ); ?>

	<header class="entry-header">
		<?php the_title( '<h1 ' . timber_get_post_title_class_attr( 'entry-title  h0' ) . '>', '</h1>' ); ?>

		<div class="entry-meta">

			<?php timber_posted_on(); ?>

			<?php if ( $category_list && timber_categorized_blog() ) : ?>

				<span class="divider"></span>
				<span class="cat-links">
					<?php echo $category_list; ?>
				</span>

			<?php endif; // End if categories ?>

		</div><!-- .entry-meta -->

		<?php if ( ! empty( $media ) ) : ?>

			<div class="entry-featured entry-media">

				<?php echo $media; ?>

			</div><!-- .entry-media -->

		<?php endif; ?>

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