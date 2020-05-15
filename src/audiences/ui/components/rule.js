import React from 'react';
import styled from 'styled-components';

import SelectOperator from './select-operator';

const { Button } = wp.components;
const { useSelect } = wp.data;
const { __ } = wp.i18n;

const StyledRule = styled.div`
	margin: 0 0 15px;
	display: flex;

	select, input {
		flex: 1;
	}

	&& > * + * {
		margin-left: 5px;
	}

	.audience-editor__rule-operator,
	button {
		flex 0;
	}
`;

const RuleInput = props => {
	const {
		disabled,
		currentField,
		name,
		operator,
		value,
		onChange,
	} = props;

	switch ( currentField.type ) {
		case 'number':
			return (
				<input
					className="regular-text"
					disabled={ disabled }
					name={ name }
					placeholder={ `${ __( 'Average value: ', 'altis-analytics' ) } ${ currentField.stats.avg || __( 'unknown', 'altis-analytics' ) }` }
					type="number"
					value={ value }
					onChange={ onChange }
				/>
			);

		case 'string':
		default:
			switch ( operator ) {
				case '=':
				case '!=':
					return (
						<select
							className="audience-editor__rule-value"
							disabled={ disabled }
							name={ name }
							value={ value }
							onChange={ onChange }
						>
							<option value="">{ __( 'Empty', 'altis-analytics' ) }</option>

							{ currentField.data && currentField.data.map( datum => (
								<option
									key={ datum.value }
									value={ datum.value }
								>
									{ datum.value }
								</option>
							) ) }
						</select>
					);

				case '*=':
				case '!*':
				case '^=':
					return (
						<input
							className="regular-text"
							disabled={ disabled }
							name={ name }
							type="text"
							value={ value }
							onChange={ onChange }
						/>
					);

				default:
					return null;
			}
	}
};

export default function Rule( props ) {
	const {
		canRemove,
		field,
		namePrefix,
		operator,
		value,
		onChange,
		onRemove,
	} = props;

	const fields = useSelect( select => select( 'audience' ).getFields(), [] );
	const currentField = fields.find( fieldData => fieldData.name === field ) || {};

	return (
		<StyledRule className="audience-editor__rule">
			<select
				className="audience-editor__rule-field"
				name={ `${namePrefix}[field]` }
				value={ field }
				onChange={ e => onChange( { field: e.target.value } ) }
				disabled={ fields.length === 0 }
			>
				<option
					className="placeholder"
					value=""
				>
					{ __( 'Select a field', 'altis-analytics' ) }
				</option>

				{ fields.map( fieldData => (
					<option
						key={ fieldData.name }
						value={ fieldData.name }
					>
						{ fieldData.label }
					</option>
				) ) }
			</select>

			<SelectOperator
				className="audience-editor__rule-operator"
				name={ `${ namePrefix }[operator]` }
				value={ operator }
				onChange={ e => onChange( { operator: e.target.value } ) }
				type={ currentField.type || 'string' }
				disabled={ fields.length === 0 }
			/>

			<RuleInput
				disabled={ fields.length === 0 }
				currentField={ currentField }
				name={ `${ namePrefix }[value]` }
				operator={ operator }
				value={ value }
				onChange={ e => onChange( { value: e.target.value } ) }
			/>

			{ canRemove && (
				<Button
					className="audience-editor__rule-remove"
					isDestructive
					isLink
					onClick={ onRemove }
				>
					{ __( 'Remove', 'altis-analytics' ) }
				</Button>
			) }
		</StyledRule>
	);
}