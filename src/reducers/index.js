import {combineReducers} from 'redux';
import emps from './empReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

debugger;
const rootReducer = combineReducers({
	emps,
	ajaxCallsInProgress
});

export default rootReducer;