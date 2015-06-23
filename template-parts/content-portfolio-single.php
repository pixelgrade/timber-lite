<?php
/**
 * The template used for displaying Jetpack Portfolio posts on single porfolio pages
 *
 * @package Timber
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('gallery js-gallery entry-content'); ?>>

		<?php
		/*
		 * Project film strip
		 */
		timber_the_film_strip();
		?>

		<div class="gallery-item  gallery-item--content">

			<?php // echo get_the_term_list( $post->ID, 'jetpack-portfolio-tag', '<span class="entry-meta meta-tags">' . sprintf( '%1s: ', __( 'Tags', 'timber' ) ), $separate_meta, '</span>' );

			if ( ! post_password_required() && ( comments_open() || '0' != get_comments_number() ) ) : ?>
				<span class="comments-link">
					<?php comments_popup_link( __( 'Leave a comment', 'timber' ), __( '1 Comment', 'spans' ), __( '% Comments', 'spans' ) ); ?>
				</span>
			<?php endif;

			edit_post_link( __( 'Edit', 'timber' ), '<span class="edit-link">', '</span>' );
			?>

    		<?php the_post_navigation(); ?>
    		<?php comments_template(); ?>

		</div>

</article><!-- #post-<?php the_ID(); ?> .entry-content -->