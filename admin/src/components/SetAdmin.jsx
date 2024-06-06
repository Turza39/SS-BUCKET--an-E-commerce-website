import React, {useState} from 'react'
import './SetAdmin.css'

const SetAdmin = (props) => {
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
        <p className='msg'>No admin found! Become the admin</p>
        <form action={handleForm}>
            <label htmlFor="username">Set username: </label>
                <input type="text" id='username' name='username' value={admin.username} onChange={onValueChange} />
                <label htmlFor="password">Set Password: </label>
                <input type="password" id='password' name='password' value={admin.password} onChange={onValueChange} />
                <button type='submit' onClick={props.gotAdmin}>Set Admin</button>
            </form>
      </div>
    </div>
  )
}

export default SetAdmin
