import React, {useState} from 'react';
import { GalleryVerticalEnd } from "lucide-react"
import {LoginForm} from "../components/LoginForm";
import condimente from '../data/condimente.webp'
import "../styles/Login.css"
import logo from "../data/logo.png"

const Login = () => {
    return (
        <div className="login-page">
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
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="login-image">
                <img src={condimente} alt="Image" />
            </div>
        </div>
    )

}

export default Login;