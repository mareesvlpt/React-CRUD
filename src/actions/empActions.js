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
			debugger;
			dispatch(loadEmpsSuccess(emps));
		}).catch(error => {
			throw(error);
		});
	};

}

export function saveEmp(emp) {
	

	return function(dispatch, getState) {
		dispatch(beginAjaxCall());
		return fetch(`http://localhost:1337/employees/${emp.id}.json`).then(response => response.json())
		.then(json => {

			debugger;
			json.id ? dispatch(updateEmpSuccess(json)) :
			dispatch(createEmpSuccess(json));
		}).catch(error => {
			dispatch(ajaxCallError(error));
			throw(error);
		});
	};

}

export function deleteEmp(empId) {
	debugger;

	return function(dispatch, getState) {
		dispatch(beginAjaxCall());
		return empApi.deleteEmp(empId).then(emps => {
		   dispatch(deleteEmpSuccess(emps));	
		}).catch(error => {
			throw(error);
		});
	};

}