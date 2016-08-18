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
		
		
        if(this.props.emp.id != nextProps.emp.id) {
        	// Necessary to populate form when existing Emp is loaded fully
        	this.setState({emp: Object.assign({}, nextProps.emp)});
        }
	}

	updateEmpState(event) {
		

		const field = event.target.name;
		let emp = this.state.emp;
		emp[field] = event.target.value;
		return this.setState({emp: emp});

	}

    	authorFormIsValid() {
		var formIsValid = true;
		this.state.errors = {}; //clear any previous error

		if(this.state.emp.name.length <3) {
             alert(this.state.emp.name);
			this.state.errors.name = "Name must be at least 3 characters";
			formIsValid = false;
		}
		if(this.state.emp.gender == "") {
            alert(this.state.emp.gender.value);
			this.state.errors.gender = "select gender";
			formIsValid = false;
		}

		if(this.state.emp.age < 20 || this.state.emp.age > 50) {

			this.state.errors.age = "Age should be within 20 to 50";
			formIsValid = false;
		}

		if(this.state.emp.salary < 10000) {

			this.state.errors.salary = "Salary should be higher than Rs.10000";
			formIsValid = false;
		}

		this.setState({errors: this.state.errors});
		return formIsValid;
	}
	saveEmp(event) {
	 	event.preventDefault();
	 	// var emp = this.state.emp;
	 	// if(emp.name.length >0 && emp.name.length <15) {
	 	// 	alert("employee name between 1-15 characters");
	 	// }
	 	// else if(emp.gender == "Male" || emp.gender == "Female") {
	 	// 	alert("Please Select Gender");
	 	// }
	 	// else if (20 < emp.age < 50) {
	 	// 	alert("employee age should be between 20 to 50");
	 	// }
	 	// else if (emp.salary.length > 3) {
	 	// 	alert("employee salary should be above 1000");
	 	// }
	 	// else {

	 	if(!this.authorFormIsValid()) {
			return;
		}
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


	
	return {
		emp: emp
	};
}

function mapDispatchToProps(dispatch) {
	
	return {
		actions: bindActionCreators(empActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageEmpPage);