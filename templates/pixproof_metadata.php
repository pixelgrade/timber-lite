<?php
/**
 * Template used to display the pixproof gallery
 *
 * Available vars:
 * string       $client_name
 * string       $event_date
 * int          $number_of_images
 */
?>
<div id="pixproof_data" class="pixproof-data">
	<div class="grid">
		<?php if ( !empty($client_name)) { ?>
			<div class="grid__item  lap-one-quarter  desk-one-sixth">
	            <div class="entry__meta-box">
	                <span class="meta-box__title"><?php _e('Client', 'timber' ); ?></span>
	                <span><?php echo $client_name; ?></span>
	            </div>
			</div>
		<?php }
		if ( !empty($event_date)) { ?>
			<div class="grid__item  lap-one-quarter  desk-one-sixth">
	            <div class="entry__meta-box">
	                <span class="meta-box__title"><?php _e('Event date', 'timber' ); ?></span>
	                <span><?php echo $event_date; ?></span>
	            </div>
			</div>
		<?php }
		if ( !empty($number_of_images)) { ?>
			<div class="grid__item  lap-one-quarter  desk-one-sixth">
	            <div class="entry__meta-box">
	                <span class="meta-box__title"><?php _e('Images', 'timber' ); ?></span>
	                <span><?php echo $number_of_images; ?></span>
	            </div>
			</div>
		<?php }
		if ( !empty( $file ) ) { ?>
			<div class="grid__item  lap-one-quarter  desk-one-half">
	            <div class="entry__meta-box">
	                <button class="button-download  js-download  btn  btn--medium  btn--secondary" onclick="window.open('<?php echo $file; ?>')"><?php _e('Download', 'timber' ); ?></button>
	            </div>
			</div>
		<?php } ?>
	</div>
</div>
<?php
