<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package Timber
 */

?>

       </div><!-- #content -->

   </div><!-- .site-container -->

<?php if ( is_page() || is_single() ) get_template_part( 'template-parts/content', 'single-footer' ); ?>

</div><!-- #page -->

<?php wp_footer(); ?>
</body>
</html>
