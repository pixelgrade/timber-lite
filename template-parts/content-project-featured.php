<?php
/**
 * The template used for displaying a project (Jetpack Portfolio Single Post) on the Featured Projects Page
 *
 * @package Timber
 * @since Timber 1.0
 */
?>

<div class="project-slide"
    data-title="<?php the_title(); ?>"
    data-types='<?php timber_the_project_types( get_the_ID() ); ?>'
    data-link="<?php the_permalink(); ?>"
    data-link-title="<?php echo esc_attr( sprintf( __( 'Permalink to %s', 'timber' ), the_title_attribute( 'echo=0' ) ) ); ?>"
>
	<?php timber_the_post_thumbnail( get_the_ID(), 'full', array( 'class' => 'project-slide__image  rsImg' ) ); ?>
</div><!-- .project-slide -->
