import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    
    useEffect(() => {
        const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
        if (isAdminLoggedIn) {
            navigate('/home');
        }
    }, [navigate]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorMessage('');
        }, 3000); 

        return () => clearTimeout(timer);
    }, [error]);


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/admin-login', { username, password });
            if (response.data.success) {
                localStorage.setItem('isAdminLoggedIn', true);
                window.location.href = '/home';
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error(error);
            setError('Invalid login details');
            setTimeout(() => {
                setError('');
            }, 2000); 
        }
    };

    return (
        
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className='p-3'>
                <div className='mb-4 '>
                    <h1 className='text-center fw-bold '>Admin Login</h1>
                </div>
                <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="form-control"
                    />
                   
                </div>
                <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-control"
                    />
                    
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
