import React, {useEffect} from 'react'
import './Profile.css'
import user from './assets/user.png'
import address from './assets/address.png'
import Bought from './Bought'
import {useNavigate } from 'react-router-dom';

const Profile = (props) => {
  const token = localStorage.getItem('token');
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token===null){
      props.setprofile(null);
      props.goSignUp();
    }
  }, token)
  const navigate = useNavigate();
  const logoutHandle = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('currentuserid')
    console.log("logged out");
    navigate('/profilelogin')
  }
  return (
    <div className='profile'>
      <div className="logout">
        <p className='shopName'>My Profile</p>
        <button onClick={logoutHandle}>Logout</button>
      </div>
      <div className="info">
        <div className="img">
          <img className='image' src={''} alt="" />
          <button className='upload'>Upload Profile Picture</button>
        </div>
        <div className="names">
          <p>{props.profile.name}</p>
          <p>@{props.profile.username}</p>
          <button>Change profile info</button>
        </div>
      </div>
      <div className="pay-address">
        <div className="pay">
          <div className="cards-mobile">
            <p className='cod'>Cash on Delivery</p>
            <div className="same">
              <img className='card' src={user} alt="" />
            </div>
            <div className="same">
              <img className='bkash' src={user} alt="" />
            </div>
            <div className="same">
              <img className='nagad' src={user} alt="" />
            </div>
          </div>
        </div>
        <div className="address">
          <div className="written">
            <div className="address-icon">
              <img className='loc-icon' src={address} alt="" />
              <p>Address: </p>
            </div>
            <div className="porer-ongso">
              <p>{props.profile.address}</p>
              <button className='changeLoc'>Change Location</button>
            </div>
          </div>
          <div className="ggl">
            pore
          </div>
        </div>
      </div>
      <Bought />
    </div>
  )
}

export default Profile
