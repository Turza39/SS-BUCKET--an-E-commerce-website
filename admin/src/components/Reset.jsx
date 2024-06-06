import React, { useState } from 'react'
import './Reset.css'

const Reset = () => {
  const [admin, setadmin] = useState({
    name: '',
    username: '',
    password: ''
  });
  const [image, setimage] = useState(null)

  const imageHandle=(e)=>{
        const file = e.target.files[0];
    if(file){
      const reader =  new FileReader();
      reader.onload=()=>{
        setimage(reader.result)
      };
      reader.readAsDataURL(file);
    }

  }
  const onValueChange = (e) => {
    const { name, value } = e.target;
    setadmin({
      ...admin,
      [name]: value
    })
  }
  const handleForm = (e) => {
  }
  const oldPassCheck = (e) => {

  }

  return (
    <div className='resetContainer'>
      <div className="resetBox">
        <form action={handleForm}>
          <div className="image">
            <img src={image} alt="Admin" />
          </div>
          <input type="file" accept="image/*" onChange={imageHandle}/>
          <p className='msg'>{admin.name}</p>
          <label htmlFor="oldPass">Enter old Password: </label>
          <input type="password" id='oldPass' name='oldPass' onChange={oldPassCheck} />
          <label htmlFor="name">Admin name: </label>
          <input type="text" id='name' name='name' value={admin.name} onChange={onValueChange} />
          <label htmlFor="username">Admin username: </label>
          <input type="text" id='username' name='username' value={admin.username} onChange={onValueChange} />
          <label htmlFor="password">New Password: </label>
          <input type="password" id='password' name='password' value={admin.password} onChange={onValueChange} />
          <button type='submit' >Save changes</button>
        </form>
      </div>
    </div>
  )
}
export default Reset
