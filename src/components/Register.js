import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
/* import Home from './Home'; */
import './Login.css'; // Use the same CSS file for styling
import logo from './img/logo.jpg';

const Register = ({ handleRegister }) => {
    const [d_username, setUsername] = useState('');
    const [d_password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (d_password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        handleRegister({ d_username, d_password });
        navigate('/Home'); // Navigate to '/Home' after successful registration
    };

    return (
        <div className="login-container">
            <div className="login-header">
            <img src={logo} alt="" className="logo"/>
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
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="login-button">Register</button>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
