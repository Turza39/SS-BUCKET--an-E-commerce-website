import React, { useState} from 'react';
import './SingleCartItem.css';
import Summary from './Summary';
import { Link, animateScroll as scroll } from 'react-scroll';

const SingleCartItem = (props) => {
  const [smry, setsmry] = useState(false)
  const handleBuy = ()=>{
    setsmry(true)
  }
  // onClick={()=>{props.selectItem(props.currentItem)}}
  return (
    <div>
    <div className='cartItem'>
    <img src={props.selectedItem.image} alt="" style={{height: '120px'}}/>
    <div className="desc-btn">
        <p>
            <b>Brand: </b> {props.selectedItem.brand} <br />
            <b>Model: </b> {props.selectedItem.name} <br />
            <b>Price: </b> ${props.selectedItem.new_price} <br />
        </p>
        <div className="btn">
          <div className="remove"><button className='remove'><b>Remove</b></button></div>  
          <Link to="summary_section" smooth={true} duration={500}>
          <div onClick={handleBuy} className="buy"><button className='buy'><b>Buy</b></button></div>  
          </Link>
        </div>
    </div>
    </div>
    <div className='summary_section'>
      {smry && <Summary selectedItem = {props.selectedItem}/>}
    </div>
    </div>
  )
}

export default SingleCartItem
