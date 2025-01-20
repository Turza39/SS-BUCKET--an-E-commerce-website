import React, { useState, useEffect } from 'react';
import './ProductDetails.css';
import { useParams } from 'react-router-dom';
import star_icon from "../components/assets/star_icon.png";
import axios from 'axios';
import { Link } from 'react-scroll';
import Summary from '../components/Summary.jsx';
import Toast from '../components/Toast';


const ProductDetails = () => {
    const [toast, setToast] = useState({ message: "", type: "" });
    const showToast = (message, type) => {
      setToast({ message, type });
    };
    const closeToast = () => {
      setToast({ message: "", type: "" });
    };

  const [quantity, setQuantity] = useState(1);
  const [order, setOrder] = useState({});
  const [cart, setCart] = useState({});
  const [smry, setSmry] = useState(false);
  const [user, setUser] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState(null);

  const { item } = useParams();
  const decodedItem = JSON.parse(decodeURIComponent(item));

  // Fetch user profile and delivery info at the beginning
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('currentuserid');
        const token = localStorage.getItem('token');
        
        if (!userId || !token) {
          console.error('User ID or token is missing.');
          return;
        }

        const [userResponse, deliveryResponse] = await Promise.all([
          axios.get(`http://localhost:4000/user/profile/${userId}`),
          axios.get(`http://localhost:4000/getDeliveryInfo/${userId}`),
        ]);

        setUser(userResponse.data); 
        setDeliveryInfo(deliveryResponse.data); 
      } catch (error) {
        console.error('Error fetching user or delivery info:', error);
      }
    };

    fetchUserData();
  }, []);

  // Increase and decrease quantity
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(quantity === 1 ? 1 : quantity - 1);
  };

  const showFloatingMessage = (message) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add('floating-message');
    document.body.appendChild(messageElement);
  
    setTimeout(() => {
      document.body.removeChild(messageElement);
    }, 3000); // Remove after 3 seconds
  };

  const cartHandle = async () => {
    if (!user || !deliveryInfo) {
      alert('User or delivery information not found.');
      return;
    }
  
    try {
      const newCart = {
        brand: decodedItem.brand,
        name: decodedItem.name,
        image: decodedItem.image,
        price: decodedItem.new_price,
        address: deliveryInfo.address,
        phone: deliveryInfo.phone,
        discount: 0,
        total: quantity * decodedItem.new_price,
        clientId: user._id,
        clientName: user.name,
      };
  
      console.log(newCart); // Debugging purposes
      const response = await axios.post('http://localhost:4000/cart', newCart);
  
      showToast("Product added successfully!", 'success');
    } catch (error) {
      const errorMessage =
      error.response?.data?.message || 'Failed to add product to cart. Please try again.';
      showToast(errorMessage, 'error');
    }
  };
  

  // Handle the "Buy Now" functionality
  const orderHandle = async () => {
    if (!user) {
      showFloatingMessage('User information not found.');
      return;
    }

    try {
      const newOrder = {
        brand: decodedItem.brand,
        name: decodedItem.name,
        image: decodedItem.image,
        price: decodedItem.new_price,
        address: deliveryInfo.address,
        phone: deliveryInfo.phone,
        discount: 0,
        total: quantity * decodedItem.new_price,
        clientId: user._id,
        clientName: user.name,
      };

      setSmry(true);
      setOrder(newOrder); // Set the order object for the summary
    } catch (error) {
      console.error('Error processing order:', error.response?.data || error.message);
      showFloatingMessage('Failed to proceed with the order. Please try again.');
    }
  };

  return (
    <div>
      <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      <div className='productDisplay'>
        <div className="productDisplay-left">
          <div className="productDisplay-left-img-list">
            <img src={decodedItem.image} alt="" />
            <img src={decodedItem.image} alt="" />
            <img src={decodedItem.image} alt="" />
            <img src={decodedItem.image} alt="" />
          </div>
          <div className="productDisplayImg">
            <img className='productDisplay-main-img' src={decodedItem.image} alt="" />
          </div>
        </div>
        <div className="productDisplay-right">
          <h1>{decodedItem.name}</h1>
          <div className="productDisplay-right-stars">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <p>(122)</p>
          </div>
          <div className="productDisplay-right-prices">
            <div className="productDisplay-right-price-old">${decodedItem.old_price}</div>
            <div className="productDisplay-right-price-new">${decodedItem.new_price}</div>
          </div>
          <div className="productDisplay-right-description">{decodedItem.description}</div> <br />
          <div className="productDisplay-right-quantity">
            <button className='decrease' onClick={decreaseQuantity}>-</button>
            <button className="qntity">{quantity}</button>
            <button className="increase" onClick={increaseQuantity}>+</button>
          </div>
          <div className="productDisplay-right-buttons">
            <button onClick={cartHandle} className='add-to-cart'>ADD TO CART</button>
            <nav>
              <Link to="summary-section" smooth={true} duration={500}>
                <button className='buy-now' onClick={orderHandle}>BUY NOW</button>
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div id="summary-section">
        {smry && <Summary selectedItem={order} />}
      </div>
    </div>
  );
};

export default ProductDetails;

