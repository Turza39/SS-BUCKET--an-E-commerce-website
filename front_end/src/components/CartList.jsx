import React, { useState, useEffect } from 'react';
import laptop from './assets/bigScreen/laptop.jpg';
import phone from './assets/bigScreen/phone.jpg';
import headphone from './assets/bigScreen/headphone.jpg';
import SingleCartItem from './SingleCartItem';
import axios from 'axios';

const CartList = (props) => {
    const [cartList, setCartList] = useState([]);
    const userId = localStorage.getItem('currentuserid');
    
    useEffect(() => {
        // console.log(userId);
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/cart/${userId}`);
                setCartList(response.data);
                // console.log('Cart items:', response.data);
            
            } catch (error) {
                console.error('Error fetching cart items:', error.response ? error.response.data : error.message);
            }
        };
        
        if (userId) {
            fetchCartItems();
        }
    }, [userId]);

    return (
        <div className='cartList'>
            {cartList.map((item, index) => (
                // <SingleCartItem key={index} selectedItem={props.selectItem} selectItem={props.selectItem} currentItem={item} />
                <SingleCartItem key={index} selectedItem={item} />
            ))}
        </div>
    );
};

export default CartList;

