import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        const registerData = {
            username,
            email,
            password
        };

        try {
            const response = await axios.post('http://localhost:5122/api/Auth/register', registerData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const { success, message } = response.data;

            if (success) {
                navigate("/login", {
                    state: {
                        message: "Înregistrare reușită! Te rugăm să te autentifici.",
                        email: email
                    }
                });
            } else {
                setError(message || "Înregistrarea a eșuat");
            }
        } catch (err) {
            console.error("Registration error:", err);
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError(err.message || "A apărut o eroare în timpul înregistrării");
            }
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <form className={`login-form ${className || ""}`} {...props} onSubmit={handleSubmit}>
            <div className="login-form-header">
                <h1 className="login-form-title">Create your account</h1>
                <p className="login-form-description">Enter your data below to create an account</p>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="login-form-fields">
                <div className="form-field">
                    <label className="form-label">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        className="form-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-field">
                    <label className="form-label">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-field">
                    <div className="form-field-header">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                    </div>
                    <input
                        id="password"
                        type="password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="form-button button-primary"
                    disabled={loading}
                >
                    {loading ? "Creating account..." : "Sign up"}
                </button>
            </div>
            <div className="login-footer">
                Already have an account?{" "}
                <a className="signup-link">
                    <Link to={'/login'}> Login</Link>
                </a>
            </div>
        </form>
    );
}