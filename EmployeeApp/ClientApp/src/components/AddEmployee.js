import React, { Component } from 'react';
import { api_url } from './FetchData'

export class AddEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", loading: true, empData: [], emailValid: false, fnValid: false, lnValid: false };

        var empid = this.props.match.params["empid"];

        //// Get the details of the employee to edit
        if (empid > 0) {
            fetch(api_url + '/Employees/Details/' + empid)
                .then(response => response.json())
                .then(data => {
                    this.setState({ title: "Edit", loading: false, empData: data });
                    if (data.EmailAddress) {
                        this.validateField(this.state.empData.EmailAddress, "email");
                        this.validateField(this.state.empData.FirstName, "fname");
                        this.validateField(this.state.empData.LastName, "lname");
                    }
                });
        }
        else {
            this.state = { title: "Create", loading: false, empData: [] };
        }

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    //// Event for first name change
    handleFirstNameChange(event) {
        this.validateField(event.target.value.trim(), "fname");
        this.setState({ firstname: event.target.value.trim() });
    }

    //// Event for last name change
    handleLastNameChange(event) {
        this.validateField(event.target.value.trim(), "lname");
        this.setState({ lastname: event.target.value.trim() });
    }

    //// Event for email address change
    handleEmailChange(event) {
        this.validateField(event.target.value.trim(), "email");
        this.setState({ email: event.target.value.trim() });

    }

    //// To validate the input details
    validateField(value, trigger) {
        let validData;
        if (trigger === "email") {
            validData = this.state.emailValid;
            validData = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            this.setState({ emailValid: validData });
        }
        else if (trigger === "fname") {
            validData = this.state.fnValid;
            validData = value.length > 0;
            this.setState({ fnValid: validData });
        }
        else if (trigger === "lname") {
            validData = this.state.lnValid;
            validData = value.length > 0;
            this.setState({ lnValid: validData });
        }
    }

    //// Method to save the employee details
    handleSave(event) {
        event.preventDefault();
        const employeeData = {
            "EmployeeID": this.state.empData.EmployeeID,
            "FirstName": this.state.firstname || this.state.empData.FirstName,
            "LastName": this.state.lastname || this.state.empData.LastName,
            "EmailAddress": this.state.email || this.state.empData.EmailAddress
        };

        //// API call for update and add based on the request   
        if (this.state.empData.EmployeeID) {
            fetch(api_url + '/Employees/UpdateEmployee', {
                method: 'PUT', headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(employeeData),
            }).then((response) => response.json())
                .then(() => {
                    this.props.history.push("/fetchdata");
                })
        }
        else {
            fetch(api_url + '/Employees/AddEmployee', {
                method: 'POST', headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(employeeData),
            }).then((response) => response.json())
                .then(() => {
                    this.props.history.push("/fetchdata");
                })
        }
    }

    handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchdata");
    }

    //// returns the HTML element to create the form
    renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="employeeId" value={this.state.empData.EmployeeID} />
                </div>
                <div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="First Name">First Name <span className="text-danger font-weight-bold">*</span></label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" maxLength="40" name="firstname" placeholder="Enter First Name" defaultValue={this.state.empData.FirstName} required onChange={this.handleFirstNameChange} />
                    </div>
                </div >
                <div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Last Name">Last Name <span className="text-danger font-weight-bold">*</span></label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" maxLength="40" name="lastname" placeholder="Enter Last Name" defaultValue={this.state.empData.LastName} required onChange={this.handleLastNameChange} />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Email Address" >Email Address <span className="text-danger font-weight-bold">*</span></label>
                    <div className="col-md-4">
                        <input className="form-control" type="email" maxLength="40" name="EmailAddress" placeholder="Enter Email Address" defaultValue={this.state.empData.EmailAddress} required onChange={this.handleEmailChange} />
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-info" disabled={!(this.state.emailValid && this.state.fnValid && this.state.lnValid)}>Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }

    //// Render method
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();
        return <div className="main-container">
            <div className="card border-info">
                <div className="card-header bg-info">
                    <h3 className="card-title text-white">{this.state.title} Employee</h3>
                </div>
                <div className="card-body">
                    {contents}
                </div>
            </div>
        </div>;
    }
}