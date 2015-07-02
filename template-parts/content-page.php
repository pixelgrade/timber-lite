<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package Timber
 */

$background_image = wp_get_attachment_url( get_post_thumbnail_id($post->ID), 'full' );
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php if ( !empty($background_image) ) : ?>
	<header class="entry-header  cover  full-height" style="background-image: url('<?php  echo $background_image; ?>');">
	<?php else : ?>
	<header class="entry-header  cover  half-height  no-image">
	<?php endif; ?>
		<?php the_title( '<h1 class="entry-title  h0">', '</h1>' ); ?>
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
		<?php edit_post_link( esc_html__( 'Edit', 'timber' ), '<span class="edit-link">', '</span>' ); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->

