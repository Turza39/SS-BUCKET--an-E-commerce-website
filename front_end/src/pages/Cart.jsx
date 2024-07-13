import React from 'react';
import { useState } from 'react';
import CartList from '../components/CartList';
import Summary from '../components/Summary';
import './Cart.css'

const Cart = () => {
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
      <div className='together'>
        <div className="firstLine">
          <p className='txt'>YOUR CART</p>
          <CartList selectedItem={selectedItem} selectItem={selectItem}/>
        </div>
        <div className="secondLine">
        {selectItem!==null && <Summary selectedItem={selectedItem}/>}  
        </div>
      </div>
    </div>
  )
}

export default Cart
