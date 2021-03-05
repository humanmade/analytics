<?php
/**
 * Dashboard Analytics
 *
 * @package aws-analytics
 */

namespace Altis\Analytics\Dashboard;

function setup() {
	add_filter( 'manage_posts_columns', __NAMESPACE__ . '\\remove_default_columns', 10, 2 );
	add_filter( 'bulk_actions-edit-xb', '__return_empty_array' );
	add_filter( 'views_edit-xb', '__return_null' );
	add_filter( 'months_dropdown_results', __NAMESPACE__ . '\\remove_date_filter', 10, 2 );
}

function remove_default_columns( $columns, $post_type ) {
	if ( $post_type !== 'xb' ) {
		return $columns;
	}

	unset( $columns['cb'] );
	unset( $columns['title'] );
	unset( $columns['altis_publication_checklist_status'] );

	return $columns;
}

function remove_date_filter( $months, $post_type ) {
	if ( 'xb' === $post_type ) {
		return [];
	}

	return $months;
}

function render_block_column() {
	global $post;
	?>
	<strong><a href="#"><?php echo esc_attr( $post->post_title ); ?></a></strong>
	<?php
}