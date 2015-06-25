<?php
/**
 * The template used for displaying Jetpack Portfolio posts on the Front Page Slider
 *
 * @package Timber
 */
?>

<div class="project-slide  rsContent">

	<?php //project category list
	$separate_meta = _x( ', ', 'Used between list items, there is a space after the comma.', 'timber' );
	echo get_the_term_list( $post->ID, 'jetpack-portfolio-type', '<div class="portfolio__categories">', $separate_meta, '</div>' );
	?>

	<h2 class="project-slide__name">
		<a href="<?php the_permalink(); ?>" class="block-link" title="<?php echo esc_attr( sprintf( __( 'Permalink to %s', 'timber' ), the_title_attribute( 'echo=0' ) ) ); ?>" rel="bookmark">
			<?php the_title(); ?>
			<span class="portfolio__view-more"><?php _e( 'View Project', 'timber' ); ?></span>
		</a>
	</h2>

	<?php
	// Project Image
	the_post_thumbnail( 'full', array( 'class' => 'project-slide__image  rsImg' ) ); ?>

</div><!-- .project-slide.rsContent -->
