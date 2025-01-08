import React, { useState } from 'react';
import './SignUp.css';
import delivery from './assets/delivery.png';
import axios from 'axios';
import Toast from './Toast';

const SignUp = (props) => {
    const [toast, setToast] = useState({ message: "", type: "" });
    const showToast = (message, type) => {
        setToast({ message, type });
    };
    const closeToast = () => {
        setToast({ message: "", type: "" });
    };

    const [user, setUser] = useState({
        name: '',
        username: '',
        address: '',
        phone: '',
        email: '',
        password: ''
    });

    const onValueChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleForm = async (e) => {
        e.preventDefault();
        console.log(user);
        try {
            const response = await axios.post("http://localhost:4000/signup", user);
            if (response.data.status !== "exists") {
                showToast("Sign Up successful!", 'success');
                props.goLogin();
            } else {
                showToast("Account already exists with this email.", 'error')
            }
        } catch (error) {
            console.log(error);
            showToast("Failed to create account. Try again.", 'error');
        }
    };
    // const showFloatingMessage = (message) => {
    //     const messageElement = document.createElement('div');
    //     messageElement.textContent = message;
    //     messageElement.classList.add('floating-message');
    //     document.body.appendChild(messageElement);

    //     setTimeout(() => {
    //         document.body.removeChild(messageElement);
    //     }, 3000); // Remove after 3 seconds
    // };

    return (
        <div className='signUpContainer'>
            <Toast message={toast.message} type={toast.type} onClose={closeToast} />
            <div className="left"><p>BECOME A PROUD MEMBER OF OUR GADGET FAMILY</p></div>
            <div className="signUp">
                <p><b>Sign Up Form</b></p>
                <div className="signUpForm">
                    <form onSubmit={handleForm}>
                        <label htmlFor="name">Name: </label>
                        <input type="text" id='name' name='name' value={user.name} onChange={onValueChange} required />
                        <label htmlFor="username">User name: </label>
                        <input type="text" id='username' name='username' value={user.username} onChange={onValueChange} required />
                        <label htmlFor="address">Address: </label>
                        <input type="text" id='address' name='address' value={user.address} onChange={onValueChange} required />
                        <label htmlFor="phone">Mobile: </label>
                        <input type="tel" id='phone' name='phone' value={user.phone} onChange={onValueChange} required />
                        <label htmlFor="email">Email: </label>
                        <input type="email" id='email' name='email' value={user.email} onChange={onValueChange} required />
                        <label htmlFor="password">Set password: </label>
                        <input type="password" id='password' name='password' value={user.password} onChange={onValueChange} required />
                        <button type='submit'>Sign Up</button>
                    </form>
                    <div className="loginMsg" onClick={props.goLogin}><b>Already have an account? Log in!</b></div>
                </div>
            </div>
            <div className="right"><img src={delivery} alt="Delivery" /></div>
        </div>
    );
};

export default SignUp;
