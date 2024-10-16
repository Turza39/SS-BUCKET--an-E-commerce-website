import React from 'react';
import { useState, useEffect } from 'react';
import CartList from '../components/CartList';
import Summary from '../components/Summary';
import './Cart.css'

const Cart = () => {
  
  const token = localStorage.getItem('token');
  useEffect(()=>{
  const token = localStorage.getItem('token');
  }, token)

  const [selectedItem, setselectedItem] = useState(null)
  const selectItem = (item)=>{
    setselectedItem(item);
  }
  return (
    <div className='container'>
      <div className="announcement">
      <marquee behavior="scroll" direction="left" scrollamount="8">
          <b>GET FREE SHIPPING WITH APPLE PRODUCTS ON EVERY ORDER, EVERY TIME!
          *Terms and conditions applies.* </b>
        </marquee>
      </div>
      {token!==null? 
      <div className='together'>
        <div className="firstLine">
          <div className='txt'>YOUR CART</div>
          <CartList selectedItem={selectedItem} selectItem={selectItem}/>
        </div>
        {/* <div className="secondLine">
        {selectItem!==null && <Summary selectedItem={selectedItem}/>}  
        </div> */}
      </div>: <h2>Please login to see your cart.</h2>}
    </div>
  )
}

export default Cart
