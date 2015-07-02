<?php
/*
 * Output the global AddThis JavaScript config
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
	ui_offset_top: 16,
	ui_offset_left: -12,
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
	title : "<?php wp_title( '|', true, 'right' ); ?>",
	description : "<?php echo trim( strip_tags( get_the_excerpt() ) ); ?>"
};
</script>