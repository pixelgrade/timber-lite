<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package Timber
 * @since Timber 1.0
 */

global $timber_show_footer;

if ( $timber_show_footer ) {
	get_template_part( 'footer-single' );
}

?>

</div><!-- #djaxContainer -->
</div><!-- #page -->
<div class="site-content__mask  mask--page  is-on-top">
	<div class="loader">
		<svg id="loaderSvg" class="loader__svg" width="150" height="300" viewBox="0 0 150 300"></svg>
	</div>
</div>

<div class="navigation-overlay  js-navigation-overlay"></div>

<div class="fullview">
    <div class="rsArrow rsArrowLeft">
        <div class="rsArrowIcn"></div>
    </div>
    <div class="rsArrow rsArrowRight">
        <div class="rsArrowIcn"></div>
    </div>
    <div class="fullview__close"></div>
</div>

<script>
     var loaderRandomImages = <?php timber_the_random_projects_images_srcs(); ?>;
</script>

<?php wp_footer();?>
</body>
</html>
