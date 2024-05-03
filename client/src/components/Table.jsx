import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../components/Tabel.css'



function Table(){
    
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

    return(
        <>
            <div className="container-xl">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-5">
                                    <h2>User <b>Management</b></h2>
                                </div>
                                <div className="col-sm-7">
                                <Link to="/add-employee" className="btn btn-secondary"><i className="material-icons">&#xE147;</i> <span>Add New User</span></Link>

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
                                <td><img src={user.img} alt="User" style={{ width: '50px', height: '50px' }} /></td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.mobileNo}</td>
                                <td>{user.designation}</td>
                                <td>{user.gender}</td>
                                <td>{user.course.join(', ')}</td>
                                <td>
                                <a href="#" className="settings" title="Settings" data-toggle="tooltip"><i className="material-icons">&#xE8B8;</i></a>
                                <a href="#" className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE5C9;</i></a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                        </table>
                        <div className="clearfix">
                            <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                            <ul className="pagination">
                                {/* Pagination items */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Table;
