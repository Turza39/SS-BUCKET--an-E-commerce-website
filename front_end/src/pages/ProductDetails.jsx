// import React from 'react'
// import './ProductDetails.css'
// import { useParams } from 'react-router-dom'
// import star_icon from "../components/assets/star_icon.png"
// import axios from 'axios'
// import { useState } from 'react'
// import Summary from '../components/Summary.jsx'
// import { Link, animateScroll as scroll } from 'react-scroll';


// const ProductCard = () => {

//   const [quantity, setquantity] = useState(1);
//   const [order, setorder] = useState({});
//   const [cart, setcart] = useState({});
//   const [smry, setsmry] = useState(false)

//   const increaseQuantity = () => {
//     setquantity(quantity + 1);
//   }
//   const decreaseQuantity = () => {
//     setquantity(quantity === 1 ? 1 : quantity - 1);
//   }

//   const cartHandle = async () => {
//     try {
//       const userId = localStorage.getItem('currentuserid');
//       const deliveryInf = await axios.get(`http://localhost:4000/getDeliveryInfo/${userId}`);
//       const token = localStorage.getItem('token');
//       const res = await axios.get('http://localhost:4000/user/profile', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const user = res.data.profile;
  
//       // Create the cart item
//       const newcart = {
//         brand: decodedItem.brand,
//         name: decodedItem.name,
//         image: decodedItem.image,
//         new_price: decodedItem.new_price,
//         address: deliveryInf.address,
//         phone: deliveryInf.phone,
//         discount: 0,
//         total: quantity * decodedItem.new_price,
//         clientId: user._id,
//         clientName: user.name,
//       };
//       console.log(newcart)
//       // Use newcart directly for the API call
//       const response = await axios.post('http://localhost:4000/cart', newcart);
//       console.log(response.data);
  
//       alert('Product added to your cart list successfully!');
//     } catch (error) {
//       console.error('Error adding to cart:', error.response?.data || error.message);
//       alert('Failed to add product to cart. Please try again.');
//     }
//   };
  
//   const orderHandle = async () => {
//     console.log("buying now")
//     try {
//       const token = localStorage.getItem('token');
//       console.log(token);
//       const response = await axios.get('http://localhost:4000/user/profile', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       const client = response.data.profile;
//       setsmry(true);
//       const neworder = {
//         brand: decodedItem.brand,
//         name: decodedItem.name,
//         new_price: decodedItem.new_price,
//         address: client.address,
//         phone: client.phone,
//         discount: 0,
//         total: quantity * decodedItem.new_price,
//         clientId: client._id,
//         clientName: client.name
//       }
//       setorder(neworder);
//       // console.log(order);
//     } catch (error) {

//     }
//   }

//   const { item } = useParams();
//   const decodedItem = JSON.parse(decodeURIComponent(item));

//   return (
//     <div>
//       <div className='productDisplay'>
//         <div className="productDisplay-left">
//           <div className="productDisplay-left-img-list">
//             <img src={decodedItem.image} alt="" />
//             <img src={decodedItem.image} alt="" />
//             <img src={decodedItem.image} alt="" />
//             <img src={decodedItem.image} alt="" />
//           </div>
//           <div className="productDisplayImg">
//             <img className='productDisplay-main-img' src={decodedItem.image} alt="" />
//           </div>
//         </div>
//         <div className="productDisplay-right">
//           <h1>{decodedItem.model}</h1>
//           <div className="productDisplay-right-stars">
//             <img src={star_icon} alt="" />
//             <img src={star_icon} alt="" />
//             <img src={star_icon} alt="" />
//             <img src={star_icon} alt="" />
//             <img src={star_icon} alt="" />
//             <p>(122)</p>
//           </div>
//           <div className="productDisplay-right-prices">
//             <div className="productDisplay-right-price-old">${decodedItem.old_price}</div>
//             <div className="productDisplay-right-price-new">${decodedItem.new_price}</div>
//           </div>
//           <div className="productDisplay-right-discription">
//             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad,
//             accusantium rem! Dolorum pariatur nostrum quibusdam hic rem
//             beatae, numquam sapiente.
//           </div>
//           <div className="producDisplay-right-quantity">
//             <button className='decrease' onClick={decreaseQuantity}>-</button>
//             <button className="qntity">{quantity}</button>
//             <button className="increase" onClick={increaseQuantity}>+</button>
//           </div>
//           <div className="productDisplay-right-buttons">
//             <button onClick={cartHandle} className='add-to-cart'>ADD TO CART</button>
//             <nav>
//               <Link to="summary-section" smooth={true} duration={500}>
//                 <button className='buy-now' onClick={orderHandle}>BUY NOW</button>
//               </Link>
//             </nav>
//           </div>
//         </div>
//       </div>
//       <div id="summary-section">
//         {smry && <Summary selectedItem={order}/>}

//       </div>
//     </div>
//   )
// }

// export default ProductCard




import React, { useState, useEffect } from 'react';
import './ProductDetails.css';
import { useParams } from 'react-router-dom';
import star_icon from "../components/assets/star_icon.png";
import axios from 'axios';
import { Link } from 'react-scroll';
import Summary from '../components/Summary.jsx';

const ProductDetails = () => {
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
          axios.get('http://localhost:4000/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(`http://localhost:4000/getDeliveryInfo/${userId}`),
        ]);

        setUser(userResponse.data.profile); // Store user profile data
        setDeliveryInfo(deliveryResponse.data); // Store delivery information
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

  // Handle adding the item to the cart
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

      // Use newCart directly for the API call
      console.log(newCart)
      const response = await axios.post('http://localhost:4000/cart', newCart);
      console.log(response.data);

      alert('Product added to your cart list successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error.response?.data || error.message);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  // Handle the "Buy Now" functionality
  const orderHandle = async () => {
    if (!user) {
      alert('User information not found.');
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
      alert('Failed to proceed with the order. Please try again.');
    }
  };

  return (
    <div>
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
          <div className="productDisplay-right-description">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad,
            accusantium rem! Dolorum pariatur nostrum quibusdam hic rem
            beatae, numquam sapiente.
          </div>
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

