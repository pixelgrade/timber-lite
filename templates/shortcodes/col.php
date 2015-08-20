<?php
$output = '';
$ratios = array(
	1  => 'lap-one-twelfth',
	2  => 'lap-two-twelfths',
	3  => 'lap-three-twelfths',
	4  => 'lap-four-twelfths',
	5  => 'lap-five-twelfths',
	6  => 'lap-six-twelfths',
	7  => 'lap-seven-twelfths',
	8  => 'lap-eight-twelfths',
	9  => 'lap-nine-twelfths',
	10 => 'lap-ten-twelfths',
	11 => 'lap-eleven-twelfths',
	12 => 'lap-one-whole',
);

$output .= '<div class="grid__item ' . $ratios[ $size ] . ' one-whole ' . $class . '">' . PHP_EOL;
if( $class =='promo-box' ) $output .= '<div class="promo-box__container">' . $this->get_clean_content( $content ) . '</div>' . PHP_EOL;
else $output .= $this->get_clean_content( $content ) . PHP_EOL;
$output .= '</div>' . PHP_EOL;
echo $output;