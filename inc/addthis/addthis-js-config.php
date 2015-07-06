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
}

$username = timber_get_option( 'share_buttons_addthis_username' );
$ga_id = timber_get_option('share_buttons_ga_id'); ?>

<script type="text/javascript">
addthis_config = {
	<?php if ( ! empty( $username ) ) {
		echo 'username : "' . $username . '",';
	} ?>
	ui_click : false,
	ui_delay : 100,
	ui_offset_top: 0,
	ui_offset_left: 0,
	ui_use_css : true,
	data_track_addressbar : false,
	data_track_clickback : false
	<?php if ( ! empty( $ga_id ) ) {
		echo ', data_ga_property: "' . $ga_id .'"';
		echo ', data_ga_social : true';
	} ?>
};

addthis_share = {
	url : "<?php echo timber_get_current_canonical_url(); ?>",
	title : "<?php echo html_entity_decode( wp_title( '|', false, 'right' ) ); ?>",
	description : "<?php echo trim( strip_tags( get_the_excerpt() ) ); ?>"
};
</script>