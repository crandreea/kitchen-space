import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:5122/api/Auth/login",
                {
                    username,
                    password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );


            if (response.data.success && response.data.data) {
                const { token, userId, username } = response.data.data;
                localStorage.setItem("authToken", token);
                localStorage.setItem("userId", userId);
                localStorage.setItem("username", username);
                navigate("/profile");
            } else {
                setError(response.data.message || "Login failed");
            }
        } catch (err) {
            console.error("Login error:", err);
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "An error occurred during login";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={`login-form ${className || ""}`} {...props} onSubmit={handleSubmit}>
            <div className="login-form-header">
                <h1 className="login-form-title">Login to your account</h1>
                <p className="login-form-description">Enter your username below to login to your account</p>
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
                    <div className="form-field-header">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <a href="#" className="forgot-password">
                            Forgot your password?
                        </a>
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
                    {loading ? "Logging in..." : "Login"}
                </button>
            </div>
            <div className="login-footer">
                Don&apos;t have an account?{" "}
                <a className="signup-link">
                    <Link to={'/signup'}> Sign up</Link>
                </a>
            </div>
        </form>
    );
}
