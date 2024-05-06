import React from "react";
import { Link,useNavigate } from "react-router-dom";
import axios  from "axios";


function Nav (){

    const navigate = useNavigate(); 
    const handleLogout = async () => {
        try {
            const response = await axios.get('http://localhost:4000/admin-logout');
            if (response.data.success) {
                localStorage.removeItem('isAdminLoggedIn');
                navigate('/');
            } else {
                console.error('Logout failed:', response.data.message);
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary ">
                <a className="navbar-brand" href="#"></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link  to="/home" className="nav-link text-white" href="#">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link text-white" to="/list-employee">Employee List</Link>
                </li>
                </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link text-white" href="#">Admin name <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link text-white" onClick={handleLogout} href="#">Logout</a>
                            {/* <Link className="nav-link" to="/">Logout</Link> */}
                        </li>
                    </ul>
                    
                </div>
            </nav>
            
        </>
    )
}


export default Nav;