<?php
/**
* Require files that deal with various plugin integrations.
*
* @package Timber
*/

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/integrations/jetpack.php';

/**
 * Load WooCommerce compatibility file.
 */
require get_template_directory() . '/inc/integrations/woocommerce.php';
