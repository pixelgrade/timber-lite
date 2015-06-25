<?php
/**
 * The template used for displaying Jetpack Portfolio posts on the Porfolio landing page
 *
 * @package Timber
 */
?>
<article id="post-<?php the_ID(); ?>" <?php post_class('portfolio  portfolio--grid  portfolio--project  js-portfolio'); ?>>

	<?php
	/**
	 * Project Thumbnail
	 */
	?>
	<?php if ( has_post_thumbnail() ) : ?>
		<div class="project-thumbnail">
			<?php the_post_thumbnail( 'snaps-thumbnails' ); ?>
		</div>
	<?php endif; ?>

	<?php
	/**
	 * Project Title and Link
	 */
	?>
	<div class="portfolio__header">
		<div class="portfolio__category">Category</div>
		<h2 class="portfolio__title h1">
			<a href="<?php the_permalink(); ?>" class="block-link" title="<?php echo esc_attr( sprintf( __( 'Permalink to %s', 'timber' ), the_title_attribute( 'echo=0' ) ) ); ?>" rel="bookmark">
				<?php
					if ( get_the_title() != '' ) :
						// check if the post has a title
						the_title();
					else :
						// if no, use generic text instead
						_e( 'View Project', 'timber' );
					endif;
				?>
			</a>
		</h2>
	</div>

	<?php
	/*
	 * Project film strip
	 */
	timber_the_film_strip();
	?>

</article><!-- #post-<?php the_ID(); ?> -->
