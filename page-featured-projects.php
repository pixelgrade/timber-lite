<?php
/**
 * Template Name: Featured Projects Slider
 *
 * @package Timber
 */

$projects = array(
	array(
		'title' => 'First project',
		'img'   => 'http://10.0.1.3/timber/wp-content/uploads/2011/07/dcp_2082.jpg',
	),
	array(
		'title' => 'Second project',
		'img'   => 'http://10.0.1.3/timber/wp-content/uploads/2011/07/dsc20051220_160808_102.jpg',
	),
	array(
		'title' => 'Third project',
		'img'   => 'http://10.0.1.3/timber/wp-content/uploads/2011/07/dsc20050102_192118_51.jpg',
	),
	array(
		'title' => 'Fourth project',
		'img'   => 'http://10.0.1.3/timber/wp-content/uploads/2011/07/windmill.jpg',
	),
	array(
		'title' => 'Fifth project',
		'img'   => 'http://10.0.1.3/timber/wp-content/uploads/2011/07/100_5540.jpg',
	)
);


get_header();

?>

<div class="featured-projects-slider  royalSlider  js-pixslider" data-slidertransition="move" data-imagealigncenter data-imagescale="fill">
	<?php
		foreach($projects as $project) {
			echo '<div class="project-slide  rsContent">';
			echo '<h1 class="project-slide__name">'. $project['title'] .'</h1>';
			echo '<img class="project-slide__image  rsImg" src="'. $project['img'] .'" />';
			echo '</div>';
		}
	?>
</div>

<?php

get_footer();