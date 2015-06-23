<?php
/**
 * The template used for displaying Jetpack Portfolio posts on the Porfolio landing page
 *
 * @package Timber
 */
?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<?php
	/**
	 * Project Thumbnail
	 */
	?>
	<div class="project-thumbnail">
		<?php if ( has_post_thumbnail() ) : ?>
			<?php the_post_thumbnail( 'snaps-thumbnails' ); ?>
		<?php endif; ?>
	</div>

	<div class="project-content-wrap">
		<?php
		/**
		 * Project Title and Link
		 */
		?>
		<h2 class="entry-title">
			<a href="<?php the_permalink(); ?>" class="block-link" title="<?php echo esc_attr( sprintf( __( 'Permalink to %s', 'timber' ), the_title_attribute( 'echo=0' ) ) ); ?>" rel="bookmark">
				<span class="title-text">
					<?php
						if ( get_the_title() != '' ) :
							// check if the post has a title
							the_title();
						else :
							// if no, use generic text instead
							_e( 'View Project', 'timber' );
						endif;
					?>
				</span>
			</a>
		</h2>
	</div>

</article><!-- #post-<?php the_ID(); ?> -->
