import * as types from '../actions/actionsTypes';
import initialState from './initialState';

export default function empReducer(state = initialState.emps, action) {
		switch(action.type) {
		case types.LOAD_EMPS_SUCCESS: 
			// state.push(action.course);
			// return state;
			
			return action.emps;

		case types.CREATE_EMP_SUCCESS:
		    return [
		       ...state,
		       Object.assign({}, action.emp)
		    ];

		case types.UPDATE_EMP_SUCCESS:
		    return [
		    //copy of filtered result
		       ...state.filter(emp => emp.id !== action.emp.id),
		       Object.assign({}, action.emp)
		    ];

		    case types.DELETE_EMP_SUCCESS:
		          return action.emps;
		    


		default: 
			return state;
	}

}