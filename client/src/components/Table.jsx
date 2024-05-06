import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../components/Tabel.css'
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';


function Table(){
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    console.log("users",users);
    useEffect(() => {
        // Fetch user data when the component mounts
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/get');
                setUsers(response.data.employee);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUsers();
    }, []); // Run once on component mount

    const handleDelete = async (userId) => {
        try {
            console.log("userId....",userId);
            const response = await axios.post(`http://localhost:4000/delete/${userId}`);
            if (response.data.success) {
                // If deletion is successful, update the user list by filtering out the deleted user
                setUsers(users.filter(user => user._id !== userId));
            } else {
                console.error('Error deleting user:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEdit = async (userId) => {
        try {
            console.log("userId....", userId);
            const response = await axios.post(`http://localhost:4000/edit/${userId}`);
            if (response.data.success) {
                // Redirect to EditUser page with user ID
                navigate(`/edit/${userId}`);
            } else {
                console.error('Error editing user:', response.data.message);
            }
        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    return(
        <>
            <Nav/>
            <div className="container-xl">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-5">
                                    <h2>Employee List</h2>
                                </div>
                                <div className="col-sm-7">
                                <Link to="/add-employee" className="btn btn-secondary"><i className="material-icons">&#xE147;</i> <span>Add New User</span></Link>
                                <input type="search" placeholder='search employee' className='search-box text-center' />
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Profile</th>
                                    <th>Name</th>						
                                    <th>Email</th>
                                    <th>Phone No</th>
                                    <th>designation</th>
                                    <th>gender</th>
                                    <th>course</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                {console.log('Image Path:', user.img)}
                                <td><img src={`http://localhost:4000/images/${user.img}`} alt="User" style={{ width: '50px', height: '50px' }} /></td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.mobileNo}</td>
                                <td>{user.designation}</td>
                                <td>{user.gender}</td>
                                <td>{user.course.join(', ')}</td>
                                <td>
                                <a href="#" className="settings" title="Settings" data-toggle="tooltip" onClick={() => handleEdit(user._id)}><i className="fa-solid fa-pen-to-square"></i></a>
                                <a href="#" className="delete" title="Delete" data-toggle="tooltip" onClick={() => handleDelete(user._id)}><i className="material-icons">&#xE5C9;</i></a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Table;
