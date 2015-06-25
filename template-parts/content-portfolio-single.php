<?php
/**
 * The template used for displaying Jetpack Portfolio posts on single porfolio pages
 *
 * @package Timber
 */
?>


<header class="site-sidebar">
    <div class="site-sidebar__content">
    <?php
    /*
     * Project Title
     */
    the_title( '<h1 class="site-sidebar__text">', '</h1>' );

    /*
     * Project category list
     */
    $separate_meta = _x( ', ', 'Used between list items, there is a space after the comma.', 'timber' );
    echo get_the_term_list( $post->ID, 'jetpack-portfolio-type', '<span class="entry-meta meta-categories">' . sprintf( '%1s: ', __( 'Type', 'timber' ) ), $separate_meta, '</span>' );

    ?>
    </div>
</header>

<article id="post-<?php the_ID(); ?>" <?php post_class('portfolio js-portfolio entry-content'); ?>>

	<?php
	/*
	 * Project film strip
	 */
	timber_the_film_strip();
	?>

	<div class="portfolio-item  portfolio-item--content  hide">

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

	<!-- <div class="js-last"></div>
	<div class="js-compare"></div>
	<div class="js-reference"></div> -->

</article><!-- #post-<?php the_ID(); ?> .entry-content -->