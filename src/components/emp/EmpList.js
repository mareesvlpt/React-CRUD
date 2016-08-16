import React, {PropTypes} from 'react';
import EmpListRow from './EmpListRow';
import * as empActions from '../../actions/empActions';

const EmpList = ({emps, deleteEmp}) => {



	return (
		<table className = "table">
		{emps.length > 0 && 
		   <thead>
		      <tr>
		        <th>Name</th>
		        <th>Gender</th>
		        <th>Age</th>
		        <th>Salary</th>
		        <th>Edit</th>
		        <th>Delete</th>
		      </tr>
		    </thead> }

		   <tbody>
		   		{emps.map(emp => 
		    	<EmpListRow key={emp.id} emp={emp} deleteEmp={deleteEmp.bind(null, emp.id)}/>

		    )}
		   </tbody>
		</table>
	);
};

EmpList.propTypes = {
	emps: PropTypes.array.isRequired,
	
};

export default EmpList;