import React, {useState} from 'react';
import '../styles/SignUp.css';
import fructe from '../data/citrus.webp'
import {SignUpForm} from "../components/SignUpForm";
import logo from "../data/logo.png";

const SignUp = () => {
    return (
        <div className="login-page">
            <div className="login-image">
                <img src={fructe} alt="Image"/>
            </div>
            <div className="login-content">
                <div className="login-header">
                    <a href="#" className="login-brand">
                        <div className="login-logo">
                            <img className="logo-login" src={logo} alt="Logo"/>
                        </div>
                        KitchenSpace
                    </a>
                </div>
                <div className="login-main">
                    <div className="login-form-container">
                    <SignUpForm/>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default SignUp;