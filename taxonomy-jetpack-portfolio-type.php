<?php
/**
 * The template for displaying archive pages for the portfolio types.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package Timber
 * @since Timber 1.0
 */

get_header(); ?>

<div class="site-header  site-header--placeholder"></div>
<div class="site-container">

    <div class="site-sidebar">
        <div class="site-sidebar__content">
            <h1 class="site-sidebar__text"><?php $tax = get_queried_object(); echo esc_html( $tax->name ); ?></h1>
        </div>
    </div>
    <div class="site-content">

        <?php
            if ( have_posts() ) :
                while ( have_posts() ) : the_post();
                    get_template_part( 'template-parts/content', 'portfolio' );
                endwhile;
            else :
                get_template_part( 'template-parts/content', 'none' );
            endif;
        ?>

    </div>
</div>

<?php get_footer(); ?>