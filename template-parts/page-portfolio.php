<div class="site-header  site-header--placeholder"></div>
<div class="site-container">
	<div class="site-content  portfolio-archive">

		<?php
		/**
		 * @TODO wait for it
		 * Displays portfolio page content if user opts to
		 * Can be controlled in Appearance > Customize > Theme Options

		if ( ! pixelgrade_option( 'hide_portfolio_page_content', false ) ) : ?>

			<?php while ( have_posts() ) : the_post(); ?>

				<?php get_template_part( 'template-parts/content', 'page' ); ?>

			<?php endwhile; // end of the loop.
		endif;
		 */

		if ( get_query_var( 'paged' ) ) :
			$paged = get_query_var( 'paged' );
		elseif ( get_query_var( 'page' ) ) :
			$paged = get_query_var( 'page' );
		else :
			$paged = 1;
		endif;

		$posts_per_page = get_option( 'jetpack_portfolio_posts_per_page', '12' );

		$portfolio_types = get_terms( 'jetpack-portfolio-type' );

		$args = array(
			'post_type' => 'jetpack-portfolio',
			'paged' => $paged,
			'posts_per_page' => $posts_per_page,
		);

		$project_query = new WP_Query( $args );

		if ( $project_query -> have_posts() ) : ?>

			<div class="site-sidebar  site-sidebar--archive">
				<h1 class="site-sidebar__content  site-sidebar__text"><?php the_title(); ?></h1>
				<?php if ( ! is_wp_error($portfolio_types) && ! empty( $portfolio_types ) ) : ?>
				<div class="mobile-filter-wrapper">
					<select class="filter  filter--mobile  js-filter-mobile-portfolio">
						<option class="filter__item active" data-filter="*"><?php _e( 'All categories', 'timber' ); ?></option>

						<?php foreach ( $portfolio_types as $type ) : ?>

							<option class="filter__item" data-filter=".jetpack-portfolio-type-<?php echo $type->slug; ?>"><?php echo $type->name; ?></option>

						<?php endforeach; ?>

					</select>
				</div>
				<?php endif; ?>
			</div>

			<div class="portfolio-wrapper">

				<?php while ( $project_query -> have_posts() ) : $project_query -> the_post();

					get_template_part( 'template-parts/content', 'portfolio' );

				endwhile;

				timber_paging_nav( $project_query->max_num_pages );

				wp_reset_postdata(); ?>

				<?php get_template_part( 'template-parts/preloader' ); ?>
			</div>

		<?php else :

			get_template_part( 'template-parts/content', 'none' );

		endif; ?>
	</div>

	<div class="projects-filter  js-projects-filter">
		<button class="filter__trigger  js-projects-filter-trigger"></button>
		<div class="filter__content  js-projects-filter-content">
			<span class="filter__text"><?php _e('Filter:', 'timber'); ?></span>
			<?php
			if ( ! is_wp_error($portfolio_types) && ! empty( $portfolio_types ) ) { ?>
				<ul id="portfolio-category" class="filter__list  js-projects-filter-list">
					<li><button class="filter__item  active" data-filter="*"><?php _e( 'All', 'timber' );?></button></li>
					<?php foreach ( $portfolio_types as $type ) { ?>
						<li><button class="filter__item" data-filter="<?php echo esc_attr( '.jetpack-portfolio-type-' . $type->slug ) ?>"><?php echo $type->name; ?></button></li>
					<?php } ?>
				</ul>
				<?php
			} ?>
		</div>
	</div>
</div>