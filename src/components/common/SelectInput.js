import React, {PropTypes} from 'react';

const SelectInput = ({name, label, onChange, defaultOption, value, error}) => {


	return (
		<div className="form-group">
		   <label htmlFor={name}>{label}</label>
		   <div className="field">
		      <select 
		         name={name}
		         value={value}
		         className="form-control"
		         onChange={onChange} required>
		         <option value="">{defaultOption}</option>
		         <option value="Male">Male</option>
		         <option value="Female">Female</option>
		      </select>
		         {error && <div className="alert alert-danger">{error}</div>}
		   </div>
		</div>
	);
};

SelectInput.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	defaultOption: PropTypes.string,
	value: PropTypes.string,
	required: PropTypes.bool,
	error: PropTypes.string,
	options:PropTypes.arrayOf(PropTypes.object)
};

export default SelectInput;