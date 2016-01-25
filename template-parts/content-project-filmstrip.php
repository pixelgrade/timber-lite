<?php
/**
 * The template used for displaying a project (Jetpack Portfolio Single Post) using the Filmstrip layout
 *
 * @package Timber
 * @since Timber 1.0
 */
?>


<header class="site-sidebar">
    <div class="site-sidebar__content">

    <?php
    /*
     * Project Title
     */
    the_title( '<h1 ' . timber_get_post_title_class_attr( 'site-sidebar__text' ) . '>', '</h1>' );
    echo '<div class="divider"></div>';
    timber_the_project_types();
    ?>

    </div>
</header>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<?php
	/*
	 * Project film strip
	 */
	timber_the_film_strip();
	?>

    <div class="portfolio__item  portfolio__item--text  portfolio__item--nav">
        <div>
            <?php next_post_link( '%link', '<div class="caption">' . __( 'next', 'timber' ) . '</div> <div class="nav__label">%title</div>' ); ?>
            <?php previous_post_link( '%link', '<div class="caption">' . __( 'prev', 'timber' ) . '</div> <div class="nav__label">%title</div>' ); ?>
            <a class="nav__link--archive" href="<?php echo timber_get_portfolio_page_link(); ?>">
                <div class="caption"><?php _e( 'back to', 'timber' ); ?></div>
                <div class="nav__label"><?php _e( "Index", 'timber' ); ?></div>
            </a>
        </div>
    </div>

</article><!-- #post-<?php the_ID(); ?> .entry-content -->

<div class="site-content__mask  mask--project"></div>