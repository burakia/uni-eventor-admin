import React, { Component } from 'react';
import { makeApiRequest } from '../App.Request';
import '../css/w3.css';
//import * as AppRequest from "../App.Request.js"

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            surname: '',
            departmentId: -1
        };
    }

    submitHandler(e) {
        e.preventDefault();

        makeApiRequest('POST', '/api/Account/Register', this.state, (data) => {
            alert('success: ' + data);
        }, () => {
            alert('error')
        });
    }

    usernameChange(event) {
        this.setState(prevState => ({
            userName: event.target.value,
            email: prevState.email,
            password: prevState.password,
            confirmPassword: prevState.confirmPassword,
            name: prevState.name,
            surname: prevState.surname,
            departmentId: prevState.departmentId
        }));
    }

    emailChange(event) {
        this.setState(prevState => ({
            userName: prevState.userName,
            email: event.target.value,
            password: prevState.password,
            confirmPassword: prevState.confirmPassword,
            name: prevState.name,
            surname: prevState.surname,
            departmentId: prevState.departmentId
        }));
    }

    passwordChange(event) {
        this.setState(prevState => ({
            userName: prevState.userName,
            email: prevState.email,
            password: event.target.value,
            confirmPassword: prevState.confirmPassword,
            name: prevState.name,
            surname: prevState.surname,
            departmentId: prevState.departmentId
        }));
    }

    confirmPasswordChange(event) {
        this.setState(prevState => ({
            userName: prevState.userName,
            email: prevState.email,
            password: prevState.password,
            confirmPassword: event.target.value,
            name: prevState.name,
            surname: prevState.surname,
            departmentId: prevState.departmentId
        }));
    }

    nameChange(event) {
        this.setState(prevState => ({
            userName: prevState.userName,
            email: prevState.email,
            password: prevState.password,
            confirmPassword: prevState.confirmPassword,
            name: event.target.value,
            surname: prevState.surname,
            departmentId: prevState.departmentId
        }));
    }

    surnameChange(event) {
        this.setState(prevState => ({
            userName: prevState.userName,
            email: prevState.email,
            password: prevState.password,
            confirmPassword: prevState.confirmPassword,
            name: prevState.name,
            surname: event.target.value,
            departmentId: prevState.departmentId
        }));
    }

    departmentChange(event) {
        this.setState(prevState => ({
            userName: prevState.userName,
            email: prevState.email,
            password: prevState.password,
            confirmPassword: prevState.confirmPassword,
            name: prevState.name,
            surname: prevState.surname,
            departmentId: event.target.value
        }));
    }

    render() {
        var s = {
            width: '50px'
        };
        return (
            <div className="w3-section">
                <div className="w3-container w3-twothird">
                    <div className="w3-padding w3-card-4">
                        <h2 className="w3-text-blue-gray">Register</h2>

                        <form className="w3-text-blue-gray" onSubmit={this.submitHandler.bind(this)}>

                            <div className="w3-row w3-section">
                                <div className="w3-half w3-container">
                                    <div className="w3-col" style={s}><i className="w3-xxlarge fa fa-user"></i></div>
                                    <div className="w3-rest">
                                        <input className="w3-input w3-border" name="first" type="text" placeholder="First Name" onChange={this.nameChange.bind(this)} />
                                    </div>
                                </div>

                                <div className="w3-half w3-container">
                                    <div className="w3-col" style={s}><i className="w3-xxlarge fa fa-user"></i></div>
                                    <div className="w3-rest">
                                        <input className="w3-input w3-border" name="last" type="text" placeholder="Last Name" onChange={this.surnameChange.bind(this)} />
                                    </div>
                                </div>
                            </div>

                            <div className="w3-row w3-section w3-container">
                                <div className="w3-col" style={s}><i className="w3-xxlarge fa fa-envelope-o"></i></div>
                                <div className="w3-rest">
                                    <input className="w3-input w3-border" name="email" type="text" placeholder="Email" onChange={this.emailChange.bind(this)} />
                                </div>
                            </div>

                            <div className="w3-row w3-section w3-container">
                                <div className="w3-col" style={s}><i className="w3-xxlarge fa fa-user"></i></div>
                                <div className="w3-rest">
                                    <input className="w3-input w3-border" name="username" type="text" placeholder="User Name" onChange={this.usernameChange.bind(this)} />
                                </div>
                            </div>

                            <div className="w3-row w3-section">
                                <div className="w3-half w3-container">
                                    <div className="w3-col" style={s}><i className="w3-xxlarge fa fa-key"></i></div>
                                    <div className="w3-rest">
                                        <input className="w3-input w3-border" name="password" type="text" placeholder="Password" onChange={this.passwordChange.bind(this)} />
                                    </div>
                                </div>

                                <div className="w3-half w3-container">
                                    <div className="w3-col" style={s}><i className="w3-xxlarge fa fa-key"></i></div>
                                    <div className="w3-rest">
                                        <input className="w3-input w3-border" name="confirmPassword" type="text" placeholder="Confirm Password" onChange={this.confirmPasswordChange.bind(this)} />
                                    </div>
                                </div>
                            </div>

             

                            <div className="w3-row w3-section w3-container">
                                <div className="w3-col" style={s}><i className="w3-xxlarge fa fa-user"></i></div>
                                <div className="w3-rest">
                                    <select className="w3-select w3-border w3-text-blue-gray" name="Department">
                                        <option value="" disabled selected>Choose your department</option>
                                        <option value="1">Bilgisayar Muhendisligi Bolumu</option>
                                        <option value="2">Bilgisayar Muhendisligi Bolumu</option>
                                    </select>
                                </div>
                            </div>

                            <p className="w3-center">
                                <button className="w3-btn w3-section w3-blue-gray w3-ripple"> Register </button>
                            </p>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterForm;