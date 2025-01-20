import React from 'react'
import './Summary.css'
import axios from 'axios'
import { useState,useEffect } from 'react'
import Toast from './Toast'

const Summary = (props) => {
  const [toast, setToast] = useState({ message: "", type: "" });
  const showToast = (message, type) => {
    setToast({ message, type });
  };
  const closeToast = () => {
    setToast({ message: "", type: "" });
  }; 

  const [deliveryInfo, setDeliveryInfo] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const item = props.selectedItem;
  const userId = localStorage.getItem('currentuserid'); 
  const [admin, setAdmin] = useState(null);
  

  useEffect(() => {
    const fetchDeliveryInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getDeliveryInfo/${userId}`);
        setDeliveryInfo(response.data);

        const response2 = await axios.get('http://localhost:4000/getadmin');
        setAdmin(response2.data.admin);

      } catch (error) {
        console.error('Error fetching delivery information:', error);
      }
    };

    if (userId) {
      fetchDeliveryInfo();
    } else {
      console.error('User ID not found in localStorage');
    }
  }, [userId, admin]);


  // Place order function with secret key validation and fund transfer
  const placeOrder = async () => {
    if (!deliveryInfo || secretKey !== deliveryInfo.secretKey) {
      // setErrorMessage('Invalid secret key. Please try again.');
      showToast('Invalid secret key. Please try again.', 'error');
      return;
    }

    try {
      // Transfer funds
      const transferResponse = await axios.post('http://localhost:4000/api/saveTransaction', {
        accountNumber: deliveryInfo.bankAccount,
        transactionAmount: item.total,
        receiverAccountNumber: admin.bankAccountNo,
      });

      if (transferResponse.data.success) {
        // Place the order
        const orderResponse = await axios.post('http://localhost:4000/orders', item);
        if (orderResponse.data.success) {
          showToast('Order placed successfully!', 'success');
          setErrorMessage('');
          setSecretKey('');
        } else {
         // showFloatingMessage('error');
          showToast('Order placed successfully!', 'success');
          setErrorMessage('');
          setSecretKey('');
        }
      } else {
        showToast('Failed to transfer funds. Order not placed.', 'error');
      }
    } catch (error) {
      console.error('Error processing the order:', error);
      showToast('An error occurred while placing the order.', 'error');
    }
  };
  

  return (
    <div className="summary-outer-container">
      <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      <div className='summary-container'>
        <div onClick={()=>{console.log(item)}} className="summary">
        <p className='text' >Summary</p>
        <div className='details'>
        <div className="dtls"><div><b>Product : </b></div> <div>{item.name}</div> </div>
        <div className="dtls"><div><b>Price : </b></div> <div>${item.price}</div> </div>
        <div className="dtls"><div><b>Adress :</b></div> <div>{deliveryInfo.address}</div> </div>
        <div className="dtls"><div><b>Phone:</b></div> <div>{deliveryInfo.phone}</div> </div>
        <div className="dtls"><div><b>Delivery Charge:</b></div><div>Free</div> </div>
        <div className="dtls"><div><b>Total:</b></div> <div>${item.total}</div> </div>
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