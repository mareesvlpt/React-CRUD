import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import NumberInput from '../common/NumberInput';

const EmpForm = ({emp, onSave, onChange, saving, errors}) => {
	return (
		<form>
		   <h1>Manage Employee</h1>
		   <TextInput
		     name="name"
		     label="Name"
		     placeholder="Name"
		     value={emp.name}
		     onChange={onChange}
		     error={errors.name} 
		     pattern="[A-Za-z ]{1,15}"/>

		   <SelectInput
		     name="gender"
		     label="Gender"
		     value={emp.gender}
		     defaultOption="Select"
		     onChange={onChange}
		     error={errors.gender} />

		   <NumberInput
		     name="age"
		     label="Age"
		     placeholder="Age"
		     value={emp.age}
		     onChange={onChange}
		     error={errors.age} 
		     pattern="[0-9 ]{2}"/>

		   <NumberInput
		     name="salary"
		     label="Salary"
		     placeholder="Salary"
		     value={emp.salary}
		     onChange={onChange}
		     error={errors.salary} 
		     pattern="[0-9 ]{4,6}"/>

		   <input 
		     type="submit"
		     disabled={saving}
		     value={saving ? 'Saving...' : 'Save'}
		     className="btn btn-primary"
		     onClick={onSave} />
		</form>
	);

};

EmpForm.propTypes = {
	emp: React.PropTypes.object.isRequired,
	onSave: React.PropTypes.func.isRequired,
	onChange: React.PropTypes.func.isRequired,
	saving: React.PropTypes.bool,
	errors: React.PropTypes.object
};

export default EmpForm;