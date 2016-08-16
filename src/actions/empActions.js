import * as types from './actionsTypes';
import empApi from '../api/mockEmpApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

// Action Creators
export function loadEmpsSuccess(emps) {

	debugger;
	return { type: types.LOAD_EMPS_SUCCESS, emps };

}

export function createEmpSuccess(emp) {
	debugger;

	return { type: types.CREATE_EMP_SUCCESS, emp };
}

export function updateEmpSuccess(emp) {
	debugger;
	
	return { type: types.UPDATE_EMP_SUCCESS, emp };
}

export function deleteEmpSuccess(emps) {
	debugger;
	
	return { type: types.DELETE_EMP_SUCCESS, emps};
}

export function loadEmps() {
	debugger;

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
	debugger;

	return function(dispatch, getState) {
		dispatch(beginAjaxCall());
		return empApi.saveEmp(emp).then(savedEmp => {

			debugger;
			emp.id ? dispatch(updateEmpSuccess(savedEmp)) :
			dispatch(createEmpSuccess(savedEmp));
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