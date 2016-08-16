import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import * as empActions from '../../actions/empActions';
import {bindActionCreators} from 'redux';
import EmpList from './EmpList';
import {browserHistory} from 'react-router';

class empsPage extends React.Component {
	
	constructor(props, context) {
		super(props, context);

		this.redirectToAddEmpPage = this.redirectToAddEmpPage.bind(this);

	}

	redirectToAddEmpPage() {
		debugger;
		browserHistory.push('/emp');
	}



	render() {
		debugger;
		const {emps, actions} = this.props;
		return(
			<div>
			   <input 
			      type ="submit"
			      value ="Add Employee"
			      className ="btn btn-primary"
			      onClick = {this.redirectToAddEmpPage} />

			   <EmpList emps={ emps } deleteEmp={actions.deleteEmp}/>
            </div>
		);
	}
}

empsPage.propTypes = {
	// dispatch: PropTypes.func.isRequired,
	emps: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
	debugger;
	return {
		emps: state.emps
	};
}

function mapDispatchToProps(dispatch) {
	debugger;
	return {
		actions: bindActionCreators(empActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(empsPage);
