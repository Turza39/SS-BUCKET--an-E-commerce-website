import React, { useEffect, useState} from 'react';
import './Profile.css';
import user from './assets/user.png';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';
import axios from 'axios'


const Profile = (props) => {
  const [toast, setToast] = useState({ message: "", type: "" });
  const showToast = (message, type) => {
    setToast({ message, type });
  };
  const closeToast = () => {
    setToast({ message: "", type: "" });
  };

  const [profile, setprofile] = useState("")
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('currentuserid');

  useEffect(() => {
      fetchProfile();
  }, [token]);
  
  const fetchProfile = async () => {
      if (token) {
          try {
              const response = await axios.get(`http://localhost:4000/user/profile/${userId}`);
              if (response.data) {
                  setprofile(response.data); 
              } else {
                  console.log("Failed to fetch profile.");
              }
          } catch (error) {
              console.error("Error fetching profile:", error);
          }
      } else {
          props.goSignUp();
      }
  };
  

  const [profilePic, setProfilePic] = useState(localStorage.getItem('profilePic') || '');
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    phone: '',
    bankAccount: '',
    cvc: '',
    secretKey: '',
  }); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const deliveryData = {
      userId,
      address: deliveryInfo.address,
      phone: deliveryInfo.phone,
      bankAccount: deliveryInfo.bankAccount,
      cvc: deliveryInfo.cvc,
      secretKey: deliveryInfo.secretKey,
    };

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
        showToast('Delivery information saved successfully!', 'success');
      })
      .catch(error => {
        console.error('Error saving delivery information:', error);
        showToast('Error saving delivery information.', 'error');
      });
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          setProfilePic(reader.result);
          localStorage.setItem('profilePic', reader.result);

          const response = await fetch('http://localhost:4000/api/updateProfilePic', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              profilePic: reader.result,
              username: 'exampleUsername',
            }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log('Profile picture updated:', data);
          } else {
            const errorData = await response.json();
            console.error('Failed to update profile picture:', errorData.message);
          }
        } catch (error) {
          console.error('Error updating profile picture:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // useEffect(() => {
  //   if (token === null) {
  //     props.setprofile(null);
  //     props.goSignUp();
  //   }
  // }, []);

  const navigate = useNavigate();
  const logoutHandle = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentuserid');
    console.log('Logged out');
    showToast("Logged out successfully.", 'success');
    navigate('/');
  };

  return (
    <div className="profile">
      <Toast message={toast.message} type={toast.type} onClose={closeToast} />
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
          <p>{profile.name}</p>
          <p>@{profile.username}</p>
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