import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as empActions from '../../actions/empActions';
import EmpForm from './EmpForm';
import toastr from 'toastr';


// container component
// smart component

class ManageEmpPage extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			emp: Object.assign({}, this.props.emp),
			errors: {},
			saving: false
		};

		this.updateEmpState = this.updateEmpState.bind(this);
		this.saveEmp = this.saveEmp.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		debugger;
		
        if(this.props.emp.id != nextProps.emp.id) {
        	// Necessary to populate form when existing Emp is loaded fully
        	this.setState({emp: Object.assign({}, nextProps.emp)});
        }
	}

	updateEmpState(event) {
		debugger;

		const field = event.target.name;
		let emp = this.state.emp;
		emp[field] = event.target.value;
		return this.setState({emp: emp});

	}

	saveEmp(event) {
	 	event.preventDefault();
	 	debugger;
	 	this.setState({saving: true});
	 	this.props.actions.saveEmp(this.state.emp)
	 	.then(() => this.redirect())
	 	.catch(error => {
	 		toastr.error(error);
	 		this.setState({saving: false});
	 	});
	 	
    }
    redirect() {
    	this.setState({saving: false});
    	toastr.success('Emp saved');
    	this.context.router.push('/emps');
    }
	render() {
		return (
			<div>
				<EmpForm 
					onChange={this.updateEmpState}
					onSave = {this.saveEmp}
					emp={this.state.emp} 
					errors={this.state.errors}
					saving={this.state.saving} />
			</div>

		);
	}
}

ManageEmpPage.propTypes = {
    emp: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

//pull in the react router context so router is availabe on this.context.router
ManageEmpPage.contextTypes = {
	router: PropTypes.object
};

function getEmpById(emps, id) {
	debugger;
	const emp = emps.filter(emp => emp.id == id)
	if(emp) {
		return emp[0]; //since filter reurns an Array only.
	}
	return null;
}
function mapStateToProps(state, ownProps) {
	const empId = ownProps.params.id; // from the path '/Emp/:id'

	let emp = {id: '', name: '', gender: '', age: '', salary: ''};

	if(empId && state.emps.length > 0) {
		emp = getEmpById(state.emps, empId);
	}


	debugger;
	return {
		emp: emp
	};
}

function mapDispatchToProps(dispatch) {
	debugger;
	return {
		actions: bindActionCreators(empActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageEmpPage);