import React, { useState} from 'react'
import './Login.css'

const Login = () => {
    const [admin, setadmin] = useState({
        username: '',
        password: ''
    })
    const onValueChange = (e)=>{
        const {name, value} = e.target;
        setadmin({
            ...admin,
            [name]: value
        })
    }
    const handleForm = (e)=>{
        e.preventDefault();
    }
  return (
    <div className='loginContainer'>
      <div className="loginBox">
        <p className='msg'>Log in as Admin</p>
        <form action={handleForm}>
            <label htmlFor="username">Admin username: </label>
                <input type="text" id='username' name='username' value={admin.username} onChange={onValueChange} />
                <label htmlFor="password">Password: </label>
                <input type="password" id='password' name='password' value={admin.password} onChange={onValueChange} />
                <button type='submit' >Login</button>
            </form>
      </div>
    </div>
  )
}

export default Login
