import React from 'react'
import './Summary.css'
import laptop from './assets/bigScreen/laptop.jpg'

const Summary = (props) => {
  const item = props.selectedItem===null? {category: "laptop", brand: "HP", model: 1, price: 1200, image: laptop}: props.selectedItem;
  // const item = props.selectedItem;
  return (
    <div>
        <div className="summary" onClick={()=>{console.log(item)}}>
        <p className='smry'>Summary</p>
        <div className='details'>
        <div className="dtls"><div><b>Product: </b></div> <div>{item.model}</div> </div>
        <div className="dtls"><div><b>Price: </b></div> <div>{item.price}</div> </div>
        <div className="dtls"><div><b>Adress</b></div> <div><b>43/6, Malipara avenue</b></div> </div>
        <div className="dtls"><div><b>Delivery charge</b></div> <div><b>$3</b></div> </div>
        <div className="dtls"><div><b>Service charge</b></div> <div><b>$1</b></div> </div>
        <div className="dtls"><div><b>Discount</b></div> <div><b>-$3</b></div> </div>
        <div className="dtls"><div><b>Total</b></div> <div><b>${item.price}+3+1-3</b></div> </div>
        </div>
        <div className='order'>
            <button className='place'><b>Place order</b></button>
            <button className='bill'><b>Pay with BKash</b></button>
        </div>
    </div>
    </div>
  )
}

export default Summary
