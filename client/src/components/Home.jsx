import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
        if (!isAdminLoggedIn) {
            navigate('/'); 
        }
    }, [navigate]);

    return (
        <div className="text-white text-center h-100">
    <div className="h-100 d-flex flex-column justify-content-center">
        <Nav />
        <div className="bg-primary py-4">
            <h1>Welcome to Admin Dashboard</h1>
        </div>
    </div>
</div>

    );
}

export default Home;
