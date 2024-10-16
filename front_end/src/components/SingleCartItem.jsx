import React from 'react';
import './SingleCartItem.css';

const SingleCartItem = (props) => {
  return (
    <div className='cartItem' onClick={()=>{props.selectItem(props.currentItem)}}>
    <img src={props.currentItem.image} alt="" style={{height: '120px'}}/>
    <div className="desc-btn">
        <p>
            <b>Brand: </b> {props.currentItem.brand} <br />
            <b>Model: </b> {props.currentItem.name} <br />
            <b>Price: </b> {props.currentItem.new_price} <br />
        </p>
        <div className="btn">
          <div className="remove"><button className='remove'><b>Remove</b></button></div>  
          <div className="edit"><button className='edit'><b>Edit</b></button></div>  
        </div>
    </div>
    </div>
  )
}

export default SingleCartItem
