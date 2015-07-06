<div id="primary" class="content-area">
	<main id="main" class="site-main" role="main">

		<?php
		$featured = timber_get_featured_projects();

		$projects_slider_height = get_post_meta( timber_get_post_id(), 'projects_slider_height', true);
		$show_adjacent_projects = get_post_meta( timber_get_post_id(), 'show_adjacent_projects', true);

		if ( ! empty( $featured ) ) : ?>

			<div class="projects-slider  royalSlider  js-pixslider"
			     data-slidertransition="move"
			     data-imagealigncenter
			     data-imagescale="fill"
			     data-visiblenearby
				 <?php if($show_adjacent_projects == "show_prev_next") echo 'data-nearbycenter'; ?>
			     data-keyboardnav
				 data-bullets>

				<?php foreach ( $featured as $post ) : setup_postdata( $post );

					get_template_part( 'template-parts/content', 'project-featured' );

				endforeach; ?>

			</div><!-- .featured-projects-slider -->

		<?php else :

			get_template_part( 'template-parts/content', 'none' );

		endif; ?>

	</main><!-- #main -->
</div><!-- #primary -->
