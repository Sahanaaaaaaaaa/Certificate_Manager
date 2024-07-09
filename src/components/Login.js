import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';
import logo from './img/logo.jpg';

const Login = ({ handleLogin }) => {
    const [d_username, setUsername] = useState('');
    const [d_password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (event) => {
        event.preventDefault();
        handleLogin({ d_username, d_password });
        navigate('/Home'); // Navigate to '/Home' after successful login
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <img src={logo} alt="Logo" className="logo" />
                <h2>Manager Name</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={d_username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={d_password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="login-button">
                    Login
                </button>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
