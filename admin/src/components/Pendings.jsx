import React, {useState} from 'react'
import './Pendings.css'

const Pendings = () => {
  const pendingProducts = [
    { brand: 'Apple', model: 'iPhone 13', price: 200, quantity: 2, address: 'akhalia' },
    {brand: 'Samsung', model: 'Galaxy S21', price: 200, quantity: 2, address: 'akhalia' },
    {brand: 'Google', model: 'Pixel 6', price: 200, quantity: 2, address: 'akhalia' },
    {brand: 'OnePlus', model: '9 Pro', price: 200, quantity: 2, address: 'akhalia' },
  ];

  return (
    <div>
      <h1>Pending Orders</h1>
      {
        pendingProducts.length>0 ?(
          pendingProducts.map((item, index)=>(
            <div className="product-list">
              <div key={index} className="product-item">
                <div className="details">
                  <p>Brand: {item.brand}</p>
                  <p>Model: {item.model}</p>
                  <p>Price: {item.price}</p>
                  <p>Address: {item.address}</p>
                </div>
                <button className='delivered'>Mark as Delivered</button>
            </div>
          </div>
  ))
        ) : <h3>No Pending Order</h3>
      }
    </div>
  )
}

export default Pendings
