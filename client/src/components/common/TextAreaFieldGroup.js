import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
	name,
	placeholder,
	value,
	error,
	info,
	onChange,
}) => {
	return (
		<div className="form-group">
			<textarea
				className={classNames('form-control form-control-lg', {
					'is-invalid': { error },
				})}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
			/>
			{info && <small className="form-text text-muted">{info} </small>}
			{error && <div className="invalid-feedback">{error} </div>}
		</div>
	);
};

TextAreaFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	error: PropTypes.string.isRequired,
	info: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default TextAreaFieldGroup;
