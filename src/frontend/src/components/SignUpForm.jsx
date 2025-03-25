import type React from "react"
import {Link} from 'react-router-dom';

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
    return (
        <form className={`login-form ${className || ""}`} {...props}>
            <div className="login-form-header">
                <h1 className="login-form-title">Create your account</h1>
                <p className="login-form-description">Enter your data below to create an account</p>
            </div>
            <div className="login-form-fields">
                <div className="form-field">
                    <label className="form-label">
                        Username
                    </label>
                    <input id="username" type="text" className="form-input" required/>
                </div>
                <div className="form-field">
                    <label className="form-label">
                        Email
                    </label>
                    <input id="email" type="email" className="form-input" required/>
                </div>
                <div className="form-field">
                    <div className="form-field-header">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <a href="#" className="forgot-password">
                            Forgot your password?
                        </a>
                    </div>
                    <input id="password" type="password" className="form-input" required/>
                </div>
                <button type="submit" className="form-button button-primary">
                    Sign up
                </button>
            </div>
            <div className="login-footer">
                Already have an account?{" "}
                <a className="signup-link">
                    <Link to={'/login'}> Login</Link>
                </a>
            </div>
        </form>
    )
}

