import React, {PropTypes} from 'react';

const TextInput = ({name, label, onChange, placeholder, value, pattern, error}) => {
	let wrapperClass = "form-group";
	if(error && error.length >0) {
		wrapperClass += " " + "has-error";
	}
	return (
		<div className={wrapperClass}>
		   <label htmlFor={name}>{label}</label>
		   <div className="field">
		      <input 
		         type="text"
		         name={name}
		         className="form-control"
		         placeholder={placeholder}
		         required
		         value={value}
		         pattern={pattern}
		         onChange={onChange}/>
		         {error && <div className="alert alert-danger">{error}</div>}
		   </div>
		</div>
	);
};

TextInput.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	pattern: PropTypes.string.isRequired,
	required: PropTypes.bool,
	error: PropTypes.string
};

export default TextInput;