import React, {useState} from 'react'
import Login from '../components/Login'
import {Router, Route} from 'react-router-dom'
import SetAdmin from '../components/SetAdmin'

const LoginPage = () => {
  const [isAdminNull, setisAdminNull] = useState(true)
  const gotAdmin = ()=>{
    setisAdminNull(false)
  }
  return (
    <div>
      {
        isAdminNull? <SetAdmin gotAdmin={gotAdmin}/>: <Login />
      }
    </div>
  )
}

export default LoginPage
