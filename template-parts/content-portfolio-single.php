<?php
/**
 * The template used for displaying Jetpack Portfolio posts on single porfolio pages
 *
 * @package Timber
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<?php
	/*
	 * Project Title
	 */
	the_title( '<header class="entry-header"><h1 class="entry-title">', '</h1></header>' ); ?>

	<div class="entry-content">
		<div class="entry-content-wrap">
			<?php
			/*
			 * Project film strip
			 */
			timber_the_film_strip();
			?>
		</div>

		<div class="entry-meta-wrap">
			<?php
			/*
			 * Project meta information
			 */
			$separate_meta = _x( ', ', 'Used between list items, there is a space after the comma.', 'timber' );
			echo get_the_term_list( $post->ID, 'jetpack-portfolio-type', '<span class="entry-meta meta-categories">' . sprintf( '%1s: ', __( 'Type', 'timber' ) ), $separate_meta, '</span>' );
			echo get_the_term_list( $post->ID, 'jetpack-portfolio-tag', '<span class="entry-meta meta-tags">' . sprintf( '%1s: ', __( 'Tags', 'timber' ) ), $separate_meta, '</span>' );

			if ( ! post_password_required() && ( comments_open() || '0' != get_comments_number() ) ) : ?>
				<span class="entry-meta comments-link">
					<?php comments_popup_link( __( 'Leave a comment', 'timber' ), __( '1 Comment', 'spans' ), __( '% Comments', 'spans' ) ); ?>
				</span>
			<?php endif;

			edit_post_link( __( 'Edit', 'timber' ), '<span class="edit-link entry-meta">', '</span>' );
			?>
		</div>
	</div><!-- .entry-content -->

</article><!-- #post-<?php the_ID(); ?> -->
