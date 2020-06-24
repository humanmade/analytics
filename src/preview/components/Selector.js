/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

export default function Selector() {
	const [ selected, setSelected ] = useState( Altis.Analytics.getAudiences() );
	const {
		audiences,
		editLabel,
		editUrl,
		label,
	} = window.AltisExperimentsPreview;

	const isSelected = id => selected.indexOf( id ) >= 0;
	const onClick = ( e, id ) => {
		e.preventDefault();

		if ( selected.indexOf( id ) >= 0 ) {
			const nextSelected = selected.filter( val => val !== id );
			setSelected( nextSelected );
			Altis.Analytics.overrideAudiences( nextSelected );
		} else {
			const nextSelected = [ ...selected, id ];
			setSelected( nextSelected );
			Altis.Analytics.overrideAudiences( nextSelected );
		}
	};

	return (
		<>
			<a
				aria-haspopup="true"
				className="ab-item"
				href="#qm-overview"
			>
				{ label }
			</a>
			<div className="ab-sub-wrapper">
				<ul className="ab-submenu">
					{ audiences.map( audience => (
						<li
							key={ audience.id }
							className="aa-preview-item"
						>
							<a
								className={ `ab-item ${ isSelected( audience.id ) ? 'altis-analytics-preview-selected' : '' }` }
								href="#"
								role="button"
								onClick={ e => onClick( e, audience.id ) }
							>
								{ audience.title }
							</a>
						</li>
					) ) }
					{ audiences.length === 0 && (
						<li>
							<a
								className="ab-item"
								href={ editUrl }
							>
								{ editLabel }
							</a>
						</li>
					) }
				</ul>
			</div>
		</>
	);
}
