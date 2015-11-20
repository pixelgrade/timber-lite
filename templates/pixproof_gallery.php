<?php
global $post;
/**
 * Template used to display the pixproof gallery
 *
 * Available vars:
 * string       $ids_string         A string with attachments ids separated by coma
 * array        $gallery_ids        An array with all attachments ids
 * object       $attachments        An object with all the attachments
 * string       $number_of_images   Count attachments
 * string       $columns            Number of columns
 */
global $pixproof_plugin;

$idx = 1;
foreach ( $attachments as $attachment ) {
	$class = PixProofPlugin::get_attachment_class( $attachment );

	if ( 'selected' == $class ) {
		$select_label = __( 'Deselect', 'timber' );
	} else {
		$select_label = __( 'Select', 'timber' );
	}

	$thumb_img  = $thumb_img = wp_get_attachment_image_src( $attachment->ID, 'small-size' );
	$image_full = wp_get_attachment_image_src( $attachment->ID, 'full-size' );

	$thumb_img_ratio = 70; //some default aspect ratio in case something has gone wrong and the image has no dimensions - it happens
	if ( isset( $thumb_img[1] ) && isset( $thumb_img[2] ) && $thumb_img[1] > 0 ) {
		$thumb_img_ratio = $thumb_img[2] * 100 / $thumb_img[1];
	}

	// lets determine what should we display under each image according to settings
	// also what id should we assign to that image so the auto comments linking works
	$image_name   = '';
	$image_id_tag = '';

	if ( isset( $photo_display_name ) && ! empty( $photo_display_name ) ) {
		switch ( $photo_display_name ) {
			case 'unique_ids':
				$image_name   = '#' . $attachment->ID;
				$image_id_tag = 'item-' . $attachment->ID;
				break;
			case 'consecutive_ids':
				$image_name   = '#' . $idx;
				$image_id_tag = 'item-' . $idx;
				break;
			case 'file_name':
				$image_name   = '#' . $attachment->post_name;
				$image_id_tag = 'item-' . $attachment->post_name;
				break;
			case 'unique_ids_photo_title':
				$image_name   = '#' . $attachment->ID . ' ' . $attachment->post_title;
				$image_id_tag = 'item-' . $attachment->ID;
				break;
			case 'consecutive_ids_photo_title':
				$image_name   = '#' . $idx . ' ' . $attachment->post_title;
				$image_id_tag = 'item-' . $idx;
				break;
			default:
				$image_name   = '#' . $attachment->ID;
				$image_id_tag = 'item-' . $attachment->ID;
		}
	} else {
		//default to unique ids aka attachment id
		$image_name   = '#' . $attachment->ID;
		$image_id_tag = 'item-' . $attachment->ID;
	}

	echo timber_get_film_strip_image( $attachment->ID, $image_name, $class );

	$idx ++;
} ?>

<div class="pixproof__wrap">
	<div class="pixproof__content">
