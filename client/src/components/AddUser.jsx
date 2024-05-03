import React, { useState } from 'react';
import axios from 'axios';
import { Route } from "react-router-dom";

function AddEmployee(){

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        course: [],
        img: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/create', formData);
            console.log(response.data);
            // Clear form fields after successful submission
            document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
        // Reset dropdown
            document.getElementById('designation').selectedIndex = 0;
        // Reset file input
            document.getElementById('image').value = '';
            setFormData({
                name: '',
                email: '',
                mobileNo: '',
                designation: '',
                gender: '',
                course: [],
                img: ''
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            const updatedCourse = checked ? [...formData.course, value] : formData.course.filter(course => course !== value);
            setFormData({ ...formData, [name]: updatedCourse });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return(
        <>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-12 col-lg-9 col-xl-7">
                            <div className="card shadow-2-strong card-registration" style={{ borderRadius: "15px" }}>
                                <div className="card-body p-4 p-md-5">
                                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Add Employee</h3>
                                    <form onSubmit={handleSubmit} encType="multipart/form-data">

                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div data-mdb-input-init className="form-outline">
                                                    <input type="text" id="name" name='name' value={formData.name} className="form-control form-control-lg" onChange={handleChange} />
                                                    <label className="form-label" htmlFor="firstName">Name</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4 pb-2">
                                                <div data-mdb-input-init className="form-outline">
                                                    <input type="email" id="emailAddress" name='email' value={formData.email} className="form-control form-control-lg" onChange={handleChange} />
                                                    <label className="form-label" htmlFor="emailAddress">Email</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-4 pb-2">
                                                <div data-mdb-input-init className="form-outline">
                                                    <input type="tel" id="phoneNumber" name='mobileNo' value={formData.mobileNo} className="form-control form-control-lg" onChange={handleChange} />
                                                    <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <h6 className="mb-2 pb-1">Gender: </h6>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="gender" checked={formData.gender === 'female'} onChange={handleChange} id="femaleGender" value="female" />
                                                    <label className="form-check-label" htmlFor="femaleGender">Female</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="gender" checked={formData.gender === 'male'} onChange={handleChange} id="maleGender" value="male" />
                                                    <label className="form-check-label" htmlFor="maleGender">Male</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="gender" checked={formData.gender === 'other'} onChange={handleChange} id="otherGender" value="other" />
                                                    <label className="form-check-label" htmlFor="otherGender">Other</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6 mb-4">
                                                <label htmlFor="designation" className="form-label">Designation</label>
                                                <select name='designation' value={formData.designation} onChange={handleChange} className="form-select  form-select-lg" id="designation">
                                                    <option >Select</option>
                                                    <option value="HR">HR</option>
                                                    <option value="Manager">Manager</option>
                                                    <option value="Sales">Sales</option>
                                                </select>
                                            </div>
                                            <div className="col-6 mb-4">
                                                <label htmlFor="course" className="form-label">Course</label>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" name="course" onChange={handleChange} id="mca" value="MCA" />
                                                    <label className="form-check-label" htmlFor="mca">MCA</label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" name="course" onChange={handleChange} id="bca" value="BCA" />
                                                    <label className="form-check-label" htmlFor="bca">BCA</label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" name="course" onChange={handleChange} id="bsc" value="BSC" />
                                                    <label className="form-check-label" htmlFor="bsc">BSC</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12 mb-4">
                                                <label htmlFor="image" className="form-label">Upload Image</label>
                                                {/* <input className="form-control form-control-lg" name="img" type="file" id="image" /> */}
                                                <input type="file" multiple className="form-control form-control-lg" onChange={handleChange}  id="img" name="img" accept="image/*" required/>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-2">
                                            <input data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg" type="submit" value="Submit" />
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddEmployee;
