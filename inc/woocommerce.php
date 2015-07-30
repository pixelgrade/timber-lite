<?php
/**
 * In this file we will put every function or hook which is needed to provide woocommerce compatibility
 */

/**
 * First remove the woocommerce style. We'll provide one.
 */
add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );