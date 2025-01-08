import React from 'react'
import './Login.css'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Toast from './Toast';

const Login = (props) => {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [user, setuser] = useState({
        username: '',
        password: '',
    })
    const onValueChange = (e) => {
        const { name, value } = e.target;
        setuser({
            ...user,
            [name]: value
        });
    }
    const handleForm = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:4000/signup/login", user)
            if(response.data.token){
                showFloatingMessage("Successfully logged in!");
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('currentuserid', response.data.userid);
                navigate('/')
                // props.goProfile();
            }
            if(response.data.status==="null"){
                showFloatingMessage("No such account.")
            }else if(response.data.status==="incorrect"){
                showFloatingMessage("Incorrect password.");
            }
        }catch(error){
            showFloatingMessage("Login failed. Please try again")
        }
    }
    const showFloatingMessage = (message) => {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.classList.add('floating-message');
        document.body.appendChild(messageElement);
      
        setTimeout(() => {
          document.body.removeChild(messageElement);
        }, 3000); // Remove after 3 seconds
      };


    return (
        <div className='loginContainer'>
            <div className="login">
                <div className="welcome">WELCOME BACK</div>
                <div className="loginForm">
                    <form onSubmit={handleForm}>
                        <label htmlFor="username">User name: </label>
                        <input type="text" id='username' name='username' value={user.username} onChange={onValueChange} required/>
                        <label htmlFor="password">Password: </label>
                        <input type="password" id='password' name='password' value={user.password} onChange={onValueChange} required/>
                        <button type='submit'>Login</button>
                    </form>
                </div>
                <div className="downMsg">HOLD YOUR BREATHE TO DIVE DEEEEEEP!</div>
            </div>
        </div>
    )
}

export default Login


// {showToast && <Toast message="This is a toast message!" onClose={() => setShowToast(false)} />}