import * as types from './actionsTypes';
import empApi from '../api/mockEmpApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import thunk from 'redux-thunk';
import fetch from 'isomorphic-fetch';

// Action Creators
export function loadEmpsSuccess(emps) {

	
	return { type: types.LOAD_EMPS_SUCCESS, emps };

}

export function createEmpSuccess(emp) {
	alert("c");

	return { type: types.CREATE_EMP_SUCCESS, emp };
}

export function updateEmpSuccess(emp) {
	alert("u");
	
	return { type: types.UPDATE_EMP_SUCCESS, emp };
}

export function deleteEmpSuccess(emps) {
	
	
	return { type: types.DELETE_EMP_SUCCESS, emps};
}

export function loadEmps() {
	

	return function(dispatch) {
		dispatch(beginAjaxCall());
		debugger;
		return fetch('http://localhost:1337/employees', {
            method: 'get'
		}).then(r=>(r.json())).then(employees => {
			alert(employees);
			dispatch(loadEmpsSuccess(employees));
		}).catch(error => {
			throw(error);
		});
	};

}

export function saveEmp(emp) {
	

	return (dispatch, getState) => {
		dispatch(beginAjaxCall());
		return saveEmployee(emp)
		.then(r=>(r.json()))
		.then(employees => {
            alert(JSON.stringify(employees));
			emp.id ? dispatch(updateEmpSuccess(employees)) :
			dispatch(createEmpSuccess(employees));
		}).catch(response => {
		  if(response.status >= 400) {
		  	throw new Error("bad response");
		  } 
		})

}
}

export function deleteEmp(empId) {
	

			return function(dispatch, getState) {
		dispatch(beginAjaxCall());
		return fetch(`http://localhost:1337/employees/${empId}`, {
            method: 'delete'
      
		}).then(r=>(r.json())).then(employees => {
		   dispatch(deleteEmpSuccess(employees));	
		}).catch(error => {
			throw(error);
		});
	};

}

function saveEmployee(emp) {
	if(!emp.id) {

	return fetch('http://localhost:1337/employees', {
            method: 'post',
                      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: emp.name,
    gender: emp.gender,
    age: emp.age,
    salary: emp.salary})
      
		})
}

else {
	      debugger;
	     let empId = emp.id;

		return fetch(`http://localhost:1337/employees/${empId}`, {
            method: 'put',
            body: JSON.stringify({ name: emp.name,
    gender: emp.gender,
    age: emp.age,
    salary: emp.salary})
      
		})

}

}