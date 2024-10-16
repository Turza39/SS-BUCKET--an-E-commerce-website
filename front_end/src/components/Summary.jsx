import React from 'react'
import './Summary.css'
import axios from 'axios'

const Summary = (props) => {
  const item = props.selectedItem
  const placeOrder = async ()=>{
    console.log(props.selectedItem)
    try{
      const response = await axios.post('http://localhost:4000/orders', item);
      if(response.data){
        window.alert("Order placed successfully!");
      }else{
        window.alert("Something went wrong.");
      }
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className="summary-outer-container">

    <div className='summary-container'>
        <div onClick={()=>{console.log(item)}} className="summary">
        <p className='text' >Summary</p>
        <div className='details'>
        <div className="dtls"><div><b>Product: </b></div> <div><b>{item.name}</b></div> </div>
        <div className="dtls"><div><b>Price: </b></div> <div><b>{item.price}</b></div> </div>
        <div className="dtls"><div><b>Adress</b></div> <div><b>{item.address}</b></div> </div>
        <div className="dtls"><div><b>Phone</b></div> <div><b>{item.phone}</b></div> </div>
        <div className="dtls"><div><b>Delivery Charge</b></div><div><b>$5</b></div> </div>
        <div className="dtls"><div><b>Total</b></div> <div><b>{item.total}</b></div> </div>
        </div>
        <div className='order'>
            <button onClick={placeOrder} className='place'><b>Pay and Place Order</b></button>
        </div>
    </div>
    </div>
    </div>

  )
}

export default Summary
