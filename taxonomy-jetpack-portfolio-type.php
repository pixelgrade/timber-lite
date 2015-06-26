<?php get_header(); ?>

<div class="site-container">

    <div class="site-sidebar">
        <div class="site-sidebar__content">
            <h1 class="site-sidebar__text"><?php echo $wp_query->queried_object->name; ?></h1>
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