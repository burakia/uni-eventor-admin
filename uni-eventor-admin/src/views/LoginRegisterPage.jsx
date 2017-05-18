import React, { Component } from 'react';
import LoginForm from '../component/LoginForm.jsx';
import RegisterForm from '../component/RegisterForm.jsx';
import '../css/w3.css';

class LoginRegisterPage extends Component {
    render() {
        return (
            <div className="w3-content">
                <div className="w3-container w3-row">
                    <h1 className="w3-text-dark-gray">Welcome to Uni Eventor!</h1>
                    <p className="w3-text-dark-gray">
                        Login to your account to get started. <br />
                        Don't have an account? Don't worry, you can register for one right here!
                    </p>
                </div>
                <RegisterForm />
                <LoginForm />
            </div>
        );
    }
}

export default LoginRegisterPage;