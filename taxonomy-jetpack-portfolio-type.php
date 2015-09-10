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
    <div class="site-content  portfolio-archive  portfolio-category">
        <?php
        $data = '';
        if ( have_posts() ) {
            $queried_object = get_queried_object();
            if ( ! empty( $queried_object->taxonomy ) ) {
                $data .= ' data-taxonomy="' . esc_attr( $queried_object->taxonomy ) .'"';
                $data .= ' data-termid="' . esc_attr( $queried_object->term_taxonomy_id ) .'"';
            }
        } ?>
        <div class="portfolio-wrapper" <?php echo $data; ?>>
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

        <div class="projects-filter">
            <button class="filter__trigger  js-filter-trigger"></button>
            <span class="filter__text"><?php _e('Filter:', 'timber'); ?></span>
            <ul class="filter__list">
                <li>Filter item</li>
                <li>Filter item</li>
                <li>Filter item</li>
                <li>Filter item</li>
                <li>Filter item</li>
            </ul>
        </div>
    </div>
</div>

<?php get_footer(); ?>