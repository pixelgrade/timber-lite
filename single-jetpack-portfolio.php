<?php
/**
 * The Template for displaying all single portfolio posts
 *
 * @package Timber
 */

get_header(); ?>

	<?php while ( have_posts() ) : the_post(); ?>

        <div class="site-container">
            <header class="site-sidebar">
                <div class="site-sidebar__content">
                <?php
                /*
                 * Project Title
                 */
                the_title( '<h1 class="gallery__title">', '</h1>' );

                /*
                 * Project meta information
                 */
                $separate_meta = _x( ', ', 'Used between list items, there is a space after the comma.', 'timber' );
                echo get_the_term_list( $post->ID, 'jetpack-portfolio-type', '<span class="entry-meta meta-categories">' . sprintf( '%1s: ', __( 'Type', 'timber' ) ), $separate_meta, '</span>' );

                ?>
                </div>
            </header>

            <main id="content" class="site-content">
        		<?php get_template_part( 'template-parts/content', 'portfolio-single' ); ?>
            </main>

        </div>

        <footer id="colophon" class="site-footer" role="contentinfo">
            <button class="share-button"><i class="fa fa-share-alt"></i></button>
            <div class="site-info"></div><!-- .site-info -->
            <button class="show-button  js-show-thumbnails"><span>show thumbnails</span></button>
        </footer><!-- #colophon -->

	<?php endwhile; // end of the loop. ?>

<?php get_footer(); ?>
