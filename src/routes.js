import React from 'react';
import {Route, IndexRoute } from 'react-router';

import App from './components/App';


import EmpsPage from './components/emp/EmpsPage';
import ManageEmpPage from './components/emp/ManageEmpPage';


export default (

	<Route path = "/" component={App}>
	    
	    <Route path="emps" component={EmpsPage} />
	    <Route path="emp" component={ManageEmpPage} />
	    <Route path="emp/:id" component={ManageEmpPage} />
	    
	</Route>
);