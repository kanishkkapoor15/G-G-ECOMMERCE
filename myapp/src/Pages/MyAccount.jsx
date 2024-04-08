import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/MyAccount.css'
import defaultPic from '../Components/Assets/default_profile.png'

const MyAccount = () => {
    const [user, setUser] = useState(null);
    const [editable, setEditable] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address1: '',
        address2: '',
        phone: '',
        country_code: ''
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('auth-token');
            if (!token) {
                console.error('No authentication token found.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:4000/user', {
                    headers: {
                        'auth-token': token
                    }
                });
                setUser(response.data);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    const handleEditUser = () => {
        setEditable(true);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveInfo = async () => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            console.error('No authentication token found.');
            return;
        }

        try {
            await axios.put('http://localhost:4000/user', formData, {
                headers: {
                    'auth-token': token
                }
            });
            setUser(formData);
            setEditable(false);
        } catch (error) {
            console.error('Error saving user information:', error);
        }
    };

    return (
        <div>
            {user ? (
                <div className='account-details'>
                  <div className="account-details-header">
                  <img src={defaultPic} alt="" />
                  <h1>My Account</h1>
                  </div>
                    <div className="account-details-fields">
                    <h1>Your Information</h1>
                    <p><b>Name:</b> {editable ? <input type="text" name="name" value={formData.name} onChange={handleChange} /> : user.name}</p>
                    <p><b>Email: </b>{editable ? <input type="text" name="email" value={formData.email} onChange={handleChange} /> : user.email}</p>
                    <p><b>Address 1:</b> {editable ? <input type="text" name="address1" value={formData.address1} onChange={handleChange} /> : user.address1}</p>
                    <p><b>Address 2:</b> {editable ? <input type="text" name="address2" value={formData.address2} onChange={handleChange} /> : user.address2}</p>
                    <p><b>Phone:</b> {editable ? <input type="text" name="phone" value={formData.phone} onChange={handleChange} /> : user.phone}</p>
                    <p><b>Country Code:</b> {editable ? <input type="text" name="country_code" value={formData.country_code} onChange={handleChange} /> : user.country_code}</p>
                    </div>
                    {/* Add other user details as needed */}
                    {editable ? (
                        <button onClick={handleSaveInfo}>Save Info</button>
                    ) : (
                        <button onClick={handleEditUser}>Edit Information</button>
                    )}
                </div>
            ) : (
                <p>Loading user information...</p>
            )}
        </div>
    );
};

export default MyAccount;
