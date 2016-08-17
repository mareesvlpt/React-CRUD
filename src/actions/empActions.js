import * as types from './actionsTypes';
import empApi from '../api/mockEmpApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

// Action Creators
export function loadEmpsSuccess(emps) {

	
	return { type: types.LOAD_EMPS_SUCCESS, emps };

}

export function createEmpSuccess(emp) {
	

	return { type: types.CREATE_EMP_SUCCESS, emp };
}

export function updateEmpSuccess(emp) {
	
	
	return { type: types.UPDATE_EMP_SUCCESS, emp };
}

export function deleteEmpSuccess(emps) {
	
	
	return { type: types.DELETE_EMP_SUCCESS, emps};
}

export function loadEmps() {
	

	return function(dispatch) {
		dispatch(beginAjaxCall());
		return empApi.getAllEmps().then(emps => {
			
			dispatch(loadEmpsSuccess(emps));
		}).catch(error => {
			throw(error);
		});
	};

}

export function saveEmp(emp) {
	

	return (dispatch, getState) => {
		dispatch(beginAjaxCall());
		return fetch('http://localhost:1337/employees', {
            method: 'post',
            body: JSON.stringify({ name: emp.name,
    gender: emp.gender,
    age: emp.age,
    salary: emp.salary})
      
		}).then(response => {
		  if(response.status >= 400) {throw new Error("bad response");}
		 return response.json }).then(employees => {
            alert(employees);
			
			// emp.id ? dispatch(updateEmpSuccess(json)) :
			dispatch(createEmpSuccess(JSON.stringify(employees)));
		});

}
}

export function deleteEmp(empId) {
	

	return function(dispatch, getState) {
		dispatch(beginAjaxCall());
		return empApi.deleteEmp(empId).then(emps => {
		   dispatch(deleteEmpSuccess(emps));	
		}).catch(error => {
			throw(error);
		});
	};

}