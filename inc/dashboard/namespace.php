<?php
/**
 * Dashboard Analytics
 *
 * @package aws-analytics
 */

namespace Altis\Analytics\Dashboard;

function setup() {
	add_filter( 'manage_posts_columns', __NAMESPACE__ . '\\remove_default_columns', 10, 2 );
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
