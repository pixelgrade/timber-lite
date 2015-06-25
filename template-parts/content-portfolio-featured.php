<?php
/**
 * The template used for displaying Jetpack Portfolio posts on the Front Page Slider
 *
 * @package Timber
 */
//project category list

$separate_meta = _x( ', ', 'Used between list items, there is a space after the comma.', 'timber' );
?>
<div class="project-slide  rsContent">
	<span class="vertical-title left-align"><?php the_title(); ?></span>
	<div class="project-slide__content">
		<?php echo get_the_term_list( $post->ID, 'jetpack-portfolio-type', '<a href="#" class="project-slide__text">', $separate_meta, '</a>' ); ?>
		<a href="<?php the_permalink(); ?>" class="project-slide__link" title="<?php echo esc_attr( sprintf( __( 'Permalink to %s', 'timber' ), the_title_attribute( 'echo=0' ) ) ); ?>" rel="bookmark">
			<h1 class="project-slide__title"><?php the_title(); ?></h1>
			<span class="project-slide__text"><?php _e( '&#8594; View Project', 'timber' ); ?></span>
		</a>
	</div>
	<span class="vertical-title right-align"><?php the_title(); ?></span>
	<?php the_post_thumbnail( 'full', array( 'class' => 'project-slide__image  rsImg' ) ); ?>
</div><!-- .project-slide -->
