import React, {useState, useEffect} from 'react'
import './History.css'
import axios from 'axios'

const History = () => {
  const pendingProducts = [
    { brand: 'Apple', model: 'iPhone 13', price: 200, quantity: 2, address: 'akhalia' },
    {brand: 'Samsung', model: 'Galaxy S21', price: 200, quantity: 2, address: 'akhalia' },
    {brand: 'Google', model: 'Pixel 6', price: 200, quantity: 2, address: 'akhalia' },
    {brand: 'OnePlus', model: '9 Pro', price: 200, quantity: 2, address: 'akhalia' },
  ];

  const [sales, setsales] = useState({})
  useEffect(()=>{
    const fetchsales = async ()=>{
      try{
        const response = await axios.get('http://localhost:4000/saleshistory');
        // console.log(response.data);  
        setsales(response.data);
      }catch(error){

      }
    }
    fetchsales();
  }, [])

  return (
    <div>
      <h1>Sale's History</h1>
      {
        sales.length>0 ?(
          sales.map((item, index)=>(
            <div className="product-list">
              <div key={index} className="product-item">
                <div className="details">
                <p>Brand: {item.brand}</p>
                  <p>Model: {item.model}</p>
                  <p>Price: ${item.price}</p>
                  <p>Address: {item.address}</p>
                  <p>Client's phone: {item.phone}</p>
                </div>
                <button disabled className='delivered'>Delivered</button>
            </div>
          </div>
  ))
        ) : <h3>No Pending Order</h3>
      }
    </div>
  )
}

export default History
