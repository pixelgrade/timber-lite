<?php
/**
* Require files that deal with various plugin integrations.
*
* @package Timber
*/

/**
 * Load PixCare compatibility file.
 */
require get_template_directory() . '/inc/integrations/pixcare.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/integrations/jetpack.php';

/**
 * Load WooCommerce compatibility file.
 */
require get_template_directory() . '/inc/integrations/woocommerce.php';