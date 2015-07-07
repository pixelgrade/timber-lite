<?php

$projects_slider_height = get_post_meta( timber_get_post_id(), 'projects_slider_height', true);
$show_adjacent_projects = get_post_meta( timber_get_post_id(), 'show_adjacent_projects', true);

$featured = timber_get_featured_projects();

if ( ! empty( $featured ) ) : ?>
<div id="primary" class="content-area">
	<main id="main" class="site-main <?php echo 'slider--' . $show_adjacent_projects . ' slider--' . $projects_slider_height ?>" role="main">

			<div class="projects-slider">

				<?php
				$index = 1;
				foreach ( $featured as $post ) : setup_postdata( $post );
					get_template_part( 'template-parts/content', 'project-featured' );
					if ($index == 1) { $current_post = $post; }
					if ($index == 2) { $next_post = $post; }
					$index++;
				endforeach; ?>

			</div><!-- .featured-projects-slider -->

			<div class="vertical-title prev"><span><?php the_title(); ?></span></div>
			<div class="vertical-title next"><span><?php echo $next_post->post_title; ?></span></div>

			<div class="project-slide__content">

				<?php timber_the_project_types( $current_post->ID, '<div class="portfolio_types">', '</div>' ); ?>

				<a href="<?php echo $current_post->permalink ?>" class="project-slide__link" title="<?php echo esc_attr( sprintf( __( 'Permalink to %s', 'timber' ), the_title_attribute( array( 'echo' => 0, 'post' => $current_post->ID) ) ) ); ?>" rel="bookmark">
					<div class="project-slide__title js-title-mask">
						<h1><?php echo $current_post->post_title; ?></h1>
					</div>
					<div class="project-slide__text"><?php _e( '&#8594; View Project', 'timber' ); ?></div>
				</a>
			</div>

		<div class="projects-slider__bullets  rsBullets"></div>

	</main><!-- #main -->
</div><!-- #primary -->

<?php else :

	get_template_part( 'template-parts/content', 'none' );

endif; ?>
