import React, {useState, useEffect} from 'react'
import './Pendings.css'
import axios from 'axios'

const Pendings = () => {
  const [pendingProducts, setpendingProducts] = useState({})
  useEffect(()=>{
    const fetchOrders = async ()=>{
      try{
        const response = await axios.get('http://localhost:4000/getorders');
        // console.log(response.data);  
        setpendingProducts(response.data);
      }catch(error){

      }
    }
    fetchOrders();
  }, [])

  const handleDelivery = async (e) => {
    const item = e;
    try {
        const response = await axios.delete('http://localhost:4000/delivered', {
            params: { _id: item._id }
        });
        await axios.post('http://localhost:4000/saleshistory', item)
    } catch (error) {
        window.alert("Something went wrong");
    }
}


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
                  <p>Model: {item.name}</p>
                  <p>Price: ${item.price}</p>
                  <p>Address: {item.address}</p>
                  <p>Client's phone: {item.phone}</p>
                </div>
                <button onClick={()=>{handleDelivery(item)}} className='delivered'>Mark as Delivered</button>
            </div>
          </div>
  ))
        ) : <h3>No Pending Order</h3>
      }
    </div>
  )
}

export default Pendings
