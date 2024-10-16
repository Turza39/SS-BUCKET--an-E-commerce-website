import React from 'react'
import './ProductCard.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductCard = (props) => {
  const cartHandle = async (e)=>{
    const itemData = Array.isArray(e) ? e : [e];
    console.log(e);
    try{
      const currentuserid = localStorage.getItem('currentuserid');
      const response = await axios.post('http://localhost:4000/cart', {'userid': currentuserid, 'item': itemData} );
      
    }catch(error){

    }
  }
  
  const encodedItem = encodeURIComponent(JSON.stringify(props.item));
  return (
    <div>
      <div className="productCard"> 

      <Link className='link' style={{textDecoration: 'none', color: 'black', fontWeight: 'bold'}} to={`/productDetails/${encodedItem}`}>
        <img src={props.item.image} alt="" />
        <p className='brand'>Brand: {props.item.brand}</p>
        <p className='model'>Model: {props.item.name}</p>
        <p className='price'>Price: <s>${props.item.old_price}</s> ${props.item.new_price}</p>
      </Link>
        <div className="buttons">
            <button onClick={()=>{cartHandle(props.item)}} className='addCart'><b>Add to cart</b></button>
            <button className='buy'><Link style={{textDecoration: "none"}} to={`/productDetails/${encodedItem}`}><b>Buy now</b></Link></button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
