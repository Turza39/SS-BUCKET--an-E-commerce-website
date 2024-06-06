import React from 'react'
import './ProductDetails.css'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import phone from '../components/assets/bigScreen/phone.jpg'

const ProductDetails = () => {
    const product = {
        name: 'Galaxy S24 Ultra',
        model: 'Global Version',
        details: 'kdjfadfh;asldjkfahsdfoashdfjklsadfjkahdfi',
        image1: phone,
        image2: phone,
        image3: phone,
        price: 700,
    }
    const [quantity, setquantity] = useState(1)
    const increaseQuantity = ()=>{
      setquantity(quantity+1);
    }
    const decreaseQuantity = ()=>{
      setquantity(quantity===1? 1: quantity-1);
    }
    const {item} = useParams();
    const decodedItem = JSON.parse(decodeURIComponent(item));
  return (
    <div className='productDetailsContainer'>
      <div className="boundary">
        <div className="product">
            <h2>{decodedItem.model}</h2>
            <div className="images">
                <div className="bigImage"><img src={decodedItem.image} alt="" /></div>
                <div className="description">
                    <div className="price">${decodedItem.old_price*quantity}</div>
                    <div className="dlvry">Free delivery with advance payment</div>
                    <div className="details">Details: {decodedItem.description}</div>
                    <div className="btns">
                        <div className="quantity">
                            <button className='decrease' onClick={decreaseQuantity}>-</button>
                            <button className="qntity">{quantity}</button>
                            <button className="increase" onClick={increaseQuantity}>+</button>
                        </div>
                        <button className="order">Order Now</button>
                    </div>
                <div className="smallImage">
                {/* <img src={product.image1} alt="" />
                <img src={product.image2} alt="" />
                <img src={product.image3} alt="" /> */}
                </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
