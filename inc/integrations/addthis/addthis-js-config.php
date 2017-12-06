<?php
/*
 * Output the global AddThis JavaScript config
 *
 * @package Timber
 * @since   Timber 1.0
 */

global $post;

if ( empty( $post ) ) {
    return;
} ?>

<script type="text/javascript">
addthis_config = {
	ui_click : false,
	ui_delay : 100,
	ui_offset_top: 0,
	ui_offset_left: 0,
	ui_use_css : true,
	data_track_addressbar : false,
	data_track_clickback : false
};

addthis_share = {
	url : "<?php echo timber_get_current_canonical_url(); ?>",
	title : "<?php echo html_entity_decode( wp_title( '|', false, 'right' ) ); ?>",
	description : '<?php echo json_encode( trim( strip_tags( get_the_excerpt() ) ) ); ?>'
};
</script>