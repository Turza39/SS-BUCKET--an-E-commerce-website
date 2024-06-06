import React, { useState } from 'react';
import './SignUp.css';
import delivery from './assets/delivery.png';
import axios from 'axios';

const SignUp = (props) => {
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
            if(response.data.status!=="exists"){
                window.alert("Sign Up successful!");
                props.goLogin();
            }else{
                window.alert("Account already exists with this email.")
            }
        } catch (error) {
            console.log(error);
            window.alert("Some error occured.");
        }
    };

    return (
        <div className='signUpContainer'>
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
