<?php
/**
 * The template used for displaying a project(Jetpack Portfolio Single Post) using the Fullscreen layout
 *
 * @package Timber
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php echo '<h1>' . get_the_title($post->ID) . ' Fullscreen </h1>'; ?>
</article><!-- #post-<?php the_ID(); ?> .entry-content -->