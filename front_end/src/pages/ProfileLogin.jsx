import React from 'react'
import { useState, useEffect } from 'react'
import Profile from '../components/Profile'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import axios from 'axios'

const ProfileLogin = () => {
  const [profile, setprofile] = useState(null)
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('currentuserid')
  useEffect(() => {
    fetchProfile();
  }, [token]);
  const fetchProfile = async () => {
    if (token !== null) {
      try {
        const response = await axios.get(`http://localhost:4000/user/profile/${userId}`);
        if (response.data) {
          setprofile(response.data.profile);
          setshowProfile(true);
          setshowLogin(false);
          setshowSignUp(false);

        } else {
          console.log("Failed.");
        }
      } catch (error) {

      }
    }
  }
  const [showSignUp, setshowSignUp] = useState(true);
  const [showLogin, setshowLogin] = useState(false);
  const [showProfile, setshowProfile] = useState(false);
  const changeSignUp = () => {
    setshowLogin(false);
    setshowProfile(false);
    setshowSignUp(true);
  }

  const changeLogin = () => {
    setshowLogin(true);
    setshowProfile(false);
    setshowSignUp(false);
  }
  const changeProfile = () => {
    setshowLogin(false);
    setshowProfile(true);
    setshowSignUp(false);
  }
  return (
    <div>
      {
        // <Profile />
        showLogin ? <Login goProfile={changeProfile} />
          : showSignUp ? <SignUp goLogin={changeLogin} />
            : <Profile goSignUp={changeSignUp} profile={profile} setprofile={setprofile}/>
      }
    </div>
  )
}

export default ProfileLogin
