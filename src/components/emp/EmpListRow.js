import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const EmpListRow = ({emp, deleteEmp}) => {
	debugger;
	return (
		<tr>
		   <td>{emp.name}</td>
		   <td>{emp.gender}</td>
		   <td>{emp.age}</td>
		   <td>{emp.salary}</td>
		   <td><Link to={"/emp/" + emp.id }>edit</Link></td>
		   <td><Link to={"/emps"} onClick={deleteEmp}>delete</Link></td>
		</tr>
	);
};

EmpListRow.propTypes = {
	
	emp: PropTypes.object.isRequired,

};

export default EmpListRow;
