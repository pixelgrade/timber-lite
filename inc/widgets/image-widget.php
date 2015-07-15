<?php
/**
 * Timber image widget
 *
 * @package Timber
 * @since Timber 1.0
 */

if ( ! function_exists( 'timber_image_widget_init' ) ) :
	/**
	 * Register the widget for use in Appearance -> Widgets
	 */
	add_action( 'widgets_init', 'timber_image_widget_init' );
	function timber_image_widget_init() {
		register_widget( 'Timber_Image_Widget' );
	}
endif;

if ( ! class_exists( 'Timber_Image_Widget' ) ) :

	class Timber_Image_Widget extends WP_Widget {
		var $default_title = '';

		/**
		 * Register widget with WordPress.
		 */
		public function __construct() {
			parent::__construct(
				'timber-image',
				apply_filters( 'timber_widget_name', esc_html__( 'Profile Image', 'timber' ) ),
				array(
					'classname'   => 'widget_timber_image',
					'description' => __( 'Display a full-height image within the "Overlay — Content" widget area.', 'timber' )
				)
			);

			$this->default_title = __( 'Image', 'timber' );
		}

		/**
		 * Front-end display of widget.
		 *
		 * @see WP_Widget::widget()
		 *
		 * @param array $args Widget arguments.
		 * @param array $instance Saved values from database.
		 */
		public function widget( $args, $instance ) {

			$instance = wp_parse_args( $instance, array(
				'image_src'   => '',
			) );

			$args['before_widget'] = substr( $args['before_widget'], 0, -1 ) . ' tabindex="0">';
			echo $args['before_widget'] . PHP_EOL;

			// The Background Image - empty string in case of error
			$image = wp_get_attachment_image_src( $instance['image_id'], 'full' );
			if ( false !== $image ) {
				$image = $image[0];
			} else {
				$image = '';
			}
			echo '<div class="timber-widget-background-image" style="background-image: url(\''. $image .'\');"></div>' . PHP_EOL;
			echo '<img class="timber-widget-image" src="'. $image .'" alt="img" />' . PHP_EOL;

			echo $args['after_widget'] . PHP_EOL;
		}

		/**
		 * Sanitize widget form values as they are saved.
		 *
		 * @see WP_Widget::update()
		 *
		 * @param array $new_instance Values just sent to be saved.
		 * @param array $old_instance Previously saved values from database.
		 *
		 * @return array Updated safe values to be saved.
		 */
		public function update( $new_instance, $old_instance ) {

			$instance = $old_instance;

			$instance['image_id'] = absint( $new_instance['image_id'] );

			return $instance;
		}

		/**
		 * Back-end widget form.
		 *
		 * @see WP_Widget::form()
		 *
		 * @param array $instance Previously saved values from database.
		 * @return null
		 */
		public function form( $instance ) {
			$instance = wp_parse_args(
				(array) $instance,
				array(
					'image_id' => '',
				)
			);

			$title = '';
			if ( false === $title ) {
				$title = $this->default_title;
			}

			$image_id     = $instance['image_id'];
			?>

			<div class="timber-image-widget-form">
				<p class="timber-image-widget-image-control<?php echo ( $image_id ) ? ' has-image' : ''; ?>"
				   data-title="<?php esc_attr_e( 'Choose an Image', 'timber' ); ?>"
				   data-update-text="<?php esc_attr_e( 'Update Image', 'timber' ); ?>">
					<?php
					if ( ! empty( $image_id ) ) {
						echo wp_get_attachment_image( $image_id, 'medium', false );
					}
					?>
					<input class="timber-widget-image-id" type="hidden" name="<?php echo esc_attr( $this->get_field_name( 'image_id' ) ); ?>" id="<?php echo esc_attr( $this->get_field_id( 'image_id' ) ); ?>" value="<?php echo esc_attr( $image_id ); ?>">
					<a class="button timber-image-widget-image-control__choose" href="#"><?php _e( 'Choose an Image', 'timber' ); ?></a>
				</p>
			</div>

		<?php
		}

	} // Class Silk About Me Widget

endif; ?>