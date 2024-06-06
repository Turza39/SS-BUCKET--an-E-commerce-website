import React from 'react'
import './Bought.css'

const Bought = () => {
    const bought = [
        {product: 'a', image: 'b', price: 200, status: 'received', id: 2345355, date: 'sadf'}, 
        {product: 'a', image: 'b', price: 300, status: 'received', id: 2345345, date: 'sfad'}, 
        {product: 'a', image: 'b', price: 400, status: 'received', id: 2345345, date: 'asdf'}, 
    ]
  return (
    <div className='profileOrders'>
      <p className='my'>My Orders</p>
      <div className='colam'>
      <p> </p> <p>Product ID</p> <p>Price</p> <p>Purchase Date</p> <p>Status</p>
      </div>
      {
        bought.map((item)=>(
            <div className="profileBox">
                <div className="profileBoxDetails">
                    <p>{item.image} </p> <p>{item.id}</p> <p>{item.price}</p> <p>{item.date}</p> <p>{item.status}</p>
                </div>
                <div className="profileBoxBtns">
                    <button className='add-cart'>Add to cart</button>
                    <button className='buy-again'>Buy Again</button>
                </div>
            </div>
        ))
      }
    </div>
  )
}

export default Bought
