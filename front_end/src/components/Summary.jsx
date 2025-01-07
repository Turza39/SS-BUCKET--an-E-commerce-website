// import React from 'react'
// import './Summary.css'
// import axios from 'axios'

// const Summary = (props) => {
//   const item = props.selectedItem
//   const placeOrder = async ()=>{
//     console.log(props.selectedItem)
//     try{
//       const response = await axios.post('http://localhost:4000/orders', item);
//       if(response.data){
//         window.alert("Order placed successfully!");
//       }else{
//         window.alert("Something went wrong.");
//       }
//     }catch(error){
//       console.log(error);
//     }
//   }
//   return (
//     <div className="summary-outer-container">

//     <div className='summary-container'>
//         <div onClick={()=>{console.log(item)}} className="summary">
//         <p className='text' >Summary</p>
//         <div className='details'>
//         <div className="dtls"><div><b>Product: </b></div> <div><b>{item.name}</b></div> </div>
//         <div className="dtls"><div><b>Price: </b></div> <div><b>${item.new_price}</b></div> </div>
//         <div className="dtls"><div><b>Adress</b></div> <div><b>{item.address}</b></div> </div>
//         <div className="dtls"><div><b>Phone</b></div> <div><b>{item.phone}</b></div> </div>
//         <div className="dtls"><div><b>Delivery Charge</b></div><div><b>$0</b></div> </div>
//         <div className="dtls"><div><b>Total</b></div> <div><b>{item.total}</b></div> </div>
//         </div>
//         <div className='order'>
//             <button onClick={placeOrder} className='place'><b>Pay and Place Order</b></button>
//         </div>
//     </div>
//     </div>
//     </div>

//   )
// }

// export default Summary



import React from 'react'
import './Summary.css'
import axios from 'axios'
import { useState,useEffect } from 'react'

const Summary = (props) => {

  const [deliveryInfo, setDeliveryInfo] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const item = props.selectedItem;
  const userId = localStorage.getItem('currentuserid'); 

  

  useEffect(() => {
    const fetchDeliveryInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getDeliveryInfo/${userId}`);
        setDeliveryInfo(response.data);
        console.log(deliveryInfo.address)
      } catch (error) {
        console.error('Error fetching delivery information:', error);
      }
    };

    if (userId) {
      fetchDeliveryInfo();
    } else {
      console.error('User ID not found in localStorage');
    }
  }, [userId]);

  // Place order function with secret key validation and fund transfer
  const placeOrder = async () => {
    if (!deliveryInfo || secretKey !== deliveryInfo.secretKey) {
      console.log(deliveryInfo.address)
      setErrorMessage('Invalid secret key. Please try again.');
      showFloatingMessage('Invalid secret key. Please try again.');
      return;
    }
  
    try {
      // Transfer funds from user to admin
      // const transferResponse = await axios.post(`http://localhost:4000/transferFunds`, {
      //   userId,
      //   amount: item.total,
      // });
  
      // if (transferResponse.data.success) {
        // Place the order
        const orderResponse = await axios.post(`http://localhost:4000/orders`, item);
        if (orderResponse.data) {
          showFloatingMessage('Order placed successfully!');
          setSecretKey('');
        } else {
          showFloatingMessage('Something went wrong with placing the order.');
        }
      // } else {
      //   showFloatingMessage('Failed to transfer funds. Order not placed.');
      // }
    } catch (error) {
      console.error('Error processing the order:', error);
      showFloatingMessage('An error occurred while placing the order.');
    }
  };
  
  // Function to show floating message
  const showFloatingMessage = (message) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add('floating-message');
    document.body.appendChild(messageElement);
  
    setTimeout(() => {
      document.body.removeChild(messageElement);
    }, 3000); // Remove after 3 seconds
  };
  

  return (
    <div className="summary-outer-container">

    <div className='summary-container'>
        <div onClick={()=>{console.log(item)}} className="summary">
        <p className='text' >Summary</p>
        <div className='details'>
        <div className="dtls"><div><b>Product : </b></div> <div>{item.name}</div> </div>
        <div className="dtls"><div><b>Price : </b></div> <div>{item.price}</div> </div>
        <div className="dtls"><div><b>Adress :</b></div> <div>{deliveryInfo.address}</div> </div>
        <div className="dtls"><div><b>Phone:</b></div> <div>{deliveryInfo.phone}</div> </div>
        <div className="dtls"><div><b>Delivery Charge:</b></div><div>Free</div> </div>
        <div className="dtls"><div><b>Total:</b></div> <div>{item.total}</div> </div>
        </div>
        <div className="secret-key">
            <label>
              <input
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="Enter your secret key"
              />
            </label>
            {errorMessage && <p className="error">{errorMessage}</p>}
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