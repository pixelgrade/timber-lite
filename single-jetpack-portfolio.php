<?php
/**
 * The Template for displaying all single portfolio posts
 *
 * @package Timber
 */

get_header(); ?>

	<?php while ( have_posts() ) : the_post(); ?>
        <main id="content" class="site-content site-container site-content--filmstrip">
    		<?php get_template_part( 'template-parts/content', 'portfolio-single' ); ?>
        </main>

        <footer id="colophon" class="site-footer" role="contentinfo">
            <div class="bar--fixed">
                <button class="share-button"><i class="fa fa-share-alt"></i></button>
                <div class="site-info">
                    <div class="portfolio__position"></div>
                    <a class="show-details js-details" href="#">show details</a>
                </div><!-- .site-info -->
                <button class="show-button  js-show-thumbnails"><span>show thumbnails</span></button>
            </div>
        </footer><!-- #colophon -->

	<?php endwhile; // end of the loop. ?>

<?php get_footer(); ?>
