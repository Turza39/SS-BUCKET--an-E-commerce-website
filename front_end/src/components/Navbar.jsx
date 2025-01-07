import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Logo from './assets/Logo.png';
import cart from './assets/cart.png';
import profile from './assets/profile.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const [menu, setMenu] = useState(null);
    const [cartCount, setCartCount] = useState(0); // State for cart item count
    const userId = localStorage.getItem('currentuserid'); // Get userId from localStorage

    useEffect(() => {
      const fetchCartItems = async () => {
          try {
              if (!userId) {
                  setCartCount(0); // Default to 0 if no user is logged in
                  return;
              }
  
              const response = await axios.get(`http://localhost:4000/cart/${userId}`);
              const items = response.data;
  
              // Assume each item represents a quantity of 1 if no quantity field is present
              const totalItems = items.length;
  
              setCartCount(totalItems); // Update the cart count with the total number of items
          } catch (error) {
              console.error('Error fetching cart items:', error.response ? error.response.data : error.message);
              setCartCount(0); // Default to 0 if there's an error
          }
      };
  
      fetchCartItems();
  }, [userId]);

    return (
        <div className='navbar'>
            <div className='logo'>
                <img src={Logo} alt="" /> <br />
                <p><b>S S BUCKET</b></p>
            </div>
            <div className="menu">
                <ul>
                    <li onClick={() => { setMenu("shop"); }}>
                        <Link style={{ textDecoration: 'none' }} to='/'><b>Shop</b></Link>
                        {menu === "shop" && <hr />}
                    </li>
                    <li className='products' onClick={() => { setMenu("products"); }}>
                        <Link style={{ textDecoration: 'none' }} to='/products'><b>Products</b></Link>
                        {menu === "products" && <hr />}
                        <div className="product-item">
                            <Link to='/mobile'>
                                <span className="mobile">Mobile</span>
                            </Link>
                            <Link to='/laptop'>
                                <span className="laptop">Laptop</span>
                            </Link>
                            <Link to='accessories'>
                                <span className="accessories">Accessories</span>
                            </Link>
                        </div>
                    </li>
                    {/* <li onClick={() => { setMenu("sales"); }}>
                        <Link style={{ textDecoration: 'none' }} to='/sales'><b>Big Sales</b></Link>
                        {menu === "sales" && <hr />}
                    </li> */}
                </ul>
            </div>
            <div className="cart-profile">
                <Link to='/cart'>
                    <img src={cart} alt="cart" />
                </Link>
                <div className="cart-count">{cartCount}</div>
                <Link to='profilelogin'>
                    <img src={profile} alt="profile" />
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
