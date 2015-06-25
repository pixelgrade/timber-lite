<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package Timber
 */

?>


<?php if ( is_page() || is_single() && !get_post_type() == 'jetpack-portfolio' ) get_template_part( 'template-parts/content', 'single-footer' ); ?>

</div><!-- #page -->

<?php wp_footer(); ?>
</body>
</html>
