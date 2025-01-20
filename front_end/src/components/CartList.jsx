import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleCartItem from './SingleCartItem';

const CartList = () => {
  const [cartList, setCartList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const userId = localStorage.getItem('currentuserid');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (!userId) {
          setErrorMessage('User ID not found. Please log in.');
          return;
        }

        const response = await axios.get(`http://localhost:4000/cart/${userId}`);
        setCartList(response.data);
        setErrorMessage('');
      } catch (error) {
        const errorMsg =
          error.response?.data?.message || 'Error fetching cart items. Please try again later.';
        setErrorMessage(errorMsg);
        console.error('Error fetching cart items:', errorMsg);
      }
    };

    fetchCartItems();
  }, [userId]);

  // Function to remove an item from the cartList state
  const handleItemRemoved = (itemId) => {
    setCartList((prevList) => prevList.filter((item) => item._id !== itemId));
  };

  return (
    <div className="cartListContainer">
      {errorMessage && <p className="error">{errorMessage}</p>}
      {cartList.length > 0 ? (
        <div className="cartList">
          {cartList.map((item, index) => (
            <SingleCartItem
              key={index}
              selectedItem={item}
              userid={userId}
              onItemRemoved={handleItemRemoved}
            />
          ))}
        </div>
      ) : (
        !errorMessage && <p className="emptyCart">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartList;
