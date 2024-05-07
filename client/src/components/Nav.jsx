import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Nav() {
    const navigate = useNavigate();
    const [adminName, setAdminName] = useState('');

    useEffect(() => {
        const fetchAdminName = async () => {
            try {
                const response = await axios.get('http://localhost:4000/fetch-admin');
                    setAdminName(response.data.userName);
                
            } catch (error) {
                console.error('Error fetching admin name:', error);
            }
        };

        fetchAdminName();
    }, []);

    const handleLogout = () => {
        try {
            localStorage.removeItem('isAdminLoggedIn');
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                <a className="navbar-brand" href="#"></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/home" className="nav-link text-white" href="#">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/list-employee">Employee List</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            {console.log("admiName :",adminName)}
                            <span className="nav-link text-white">{adminName}</span>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" onClick={handleLogout} href="#">Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Nav;
