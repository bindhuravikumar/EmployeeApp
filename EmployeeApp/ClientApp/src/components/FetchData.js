import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const api_url = "http://localhost:63094/api";

export class FetchData extends Component {
    displayName = FetchData.name

    constructor(props) {
        super(props);
        this.state = { employeeData: [], loading: true };

        fetch(api_url + '/Employees/get')
            .then(response => response.json())
            .then(data => {
                this.setState({ employeeData: data, loading: false });
            });

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    //// Method to delete the employee
    handleDelete(id, firstname, lastname) {
        if (!window.confirm("Do you want to delete " + firstname + ' ' + lastname + ' ?'))
            return;
        else {
            fetch(api_url + '/Employees/DeleteEmployee/' + id, {
                method: 'delete'
            }).then(() => {
                this.setState(
                    {
                        employeeData: this.state.employeeData.filter((item) => {
                            return (item.EmployeeID !== id);
                        })
                    });
            });
        }
    }

    //// Redirect to Edit page
    handleEdit(id) {
        this.props.history.push("/employee/edit/" + id);
    }

    //// Returns the HTML element of the grid
    renderEmployeeGrid(employeeData) {
        if (employeeData.length > 0) {
            return <table className='table table-fixed'>
                <thead>
                    <tr>
                        <th className="width-200 height-51"></th>
                        <th className="width-200">Employee ID</th>
                        <th className="width-200">Employee Name</th>
                        <th className="width-200">Email Address</th>
                        <th className="width-555">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeData.map(data =>
                        <tr key={data.EmployeeID}>
                            <td className="width-200"><span className="rounded-circle border-info bg-info text-white">{data.FirstName.charAt(0).toUpperCase()}{data.LastName.charAt(0).toUpperCase()}</span> </td>
                            <td className="width-200">{data.EmployeeID}</td>
                            <td className="width-200">{data.FirstName} {data.LastName}</td>
                            <td className="width-200">{data.EmailAddress}</td>
                            <td className="action-button width-555">
                                <button className="btn"><a className="text-info font-weight-bold" title="Edit Employee" onClick={(id) => this.handleEdit(data.EmployeeID)}>Edit</a></button>
                                <button className="btn"><a className="text-info font-weight-bold" title="Delete Employee" onClick={(id) => this.handleDelete(data.EmployeeID, data.FirstName, data.LastName)}>Delete</a></button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>;
        } else {
            return <div>No details found. Please click to Create.</div>
        }
    }

    //// Render method
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderEmployeeGrid(this.state.employeeData);
        return <div className="main-container">

            <div className="card border-info">
                <div className="card-header bg-info">
                    <Row>
                        <Col sm={10}>
                            <h3 className="card-title text-white">Employee Details</h3>
                        </Col>
                        <Col sm={2} className="text-right">
                            <button className="btn btn-normal">  <Link to="/addemployee" title="Create Employee" >Create</Link> </button>
                        </Col>
                    </Row>
                </div>
                <div className="card-body">
                    {contents}
                </div>
            </div>
        </div>;
    }
}
