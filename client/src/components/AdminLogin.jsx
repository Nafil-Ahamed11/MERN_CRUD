import React, { useState } from 'react';
import axios from 'axios';

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/admin-login', { username, password });
            if (response.data.success) {
                // Login successful, redirect to employee list page
                window.location.href = '/home';
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred');
        }
    };

    return (
        
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div>
                <div data-mdb-input-init className="form-outline mb-4">
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="form-control"
                    />
                    <label className="form-label" htmlFor="username">Username</label>
                </div>
                <div data-mdb-input-init className="form-outline mb-4">
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-control"
                    />
                    <label className="form-label" htmlFor="password">Password</label>
                </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <button
                    type="button"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary btn-block mb-4"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default AdminLogin;
