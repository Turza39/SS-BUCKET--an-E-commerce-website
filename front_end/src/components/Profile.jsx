import React, { useEffect, useState } from 'react';
import './Profile.css';
import user from './assets/user.png';
import { useNavigate } from 'react-router-dom';

const token = localStorage.getItem('token');
const userId = localStorage.getItem('currentuserid');

const Profile = (props) => {
  const [profilePic, setProfilePic] = useState(localStorage.getItem('profilePic') || '');
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    phone: '',
    bankAccount: '',
    cvc: '',
    secretKey: '',
  });

  // Handle input change for delivery form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Submit the delivery information
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const deliveryData = {
      userId,  // Use the userId from localStorage
      address: deliveryInfo.address,
      phone: deliveryInfo.phone,
      bankAccount: deliveryInfo.bankAccount,
      cvc: deliveryInfo.cvc,
      secretKey: deliveryInfo.secretKey,
    };

    // Send the delivery data to the backend API to save
    fetch('http://localhost:4000/saveDeliveryInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deliveryData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Delivery Information Saved:', data);
        alert('Delivery information saved successfully!');
      })
      .catch(error => {
        console.error('Error saving delivery information:', error);
        alert('Error saving delivery information.');
      });
  };

  // Handle profile picture change
  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const response = await fetch('/api/updateProfilePic', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              profilePic: reader.result,
              username: 'exampleUsername', // Replace with actual username
            }),
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log('Profile picture updated:', data);
            setProfilePic(reader.result); // Update UI with the new picture
          } else {
            console.error('Failed to update profile picture');
          }
        } catch (error) {
          console.error('Error updating profile picture:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Check if user is logged in
  useEffect(() => {
    if (token === null) {
      props.setprofile(null);
      props.goSignUp();
    }
  }, []); // Empty dependency array ensures it runs once

  // Logout handler
  const navigate = useNavigate();
  const logoutHandle = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentuserid');
    console.log('Logged out');
    navigate('/');
  };

  return (
    <div className="profile">
      <div className="logout">
        <p className="shopName">My Profile</p>
        <button onClick={logoutHandle}>Logout</button>
      </div>
      <div className="info">
        <div className="img">
          <img className="image" src={profilePic || user} alt="Profile" />
          <label htmlFor="upload" className="upload">
            Upload Profile Picture
          </label>
          <input
            type="file"
            id="upload"
            accept="image/*"
            onChange={handleProfilePicChange}
            style={{ display: 'none' }}
          />
        </div>
        <div className="names">
          <p>{props.profile.name}</p>
          <p>@{props.profile.username}</p>
        </div>
      </div>
      <form className="delivery-info" onSubmit={handleFormSubmit}>
        <h2>Delivery Information</h2>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={deliveryInfo.address}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={deliveryInfo.phone}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Bank Account Number:
          <input
            type="text"
            name="bankAccount"
            value={deliveryInfo.bankAccount}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          CVC Code:
          <input
            type="text"
            name="cvc"
            value={deliveryInfo.cvc}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Secret Key:
          <input
            type="password"
            name="secretKey"
            value={deliveryInfo.secretKey}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Profile;