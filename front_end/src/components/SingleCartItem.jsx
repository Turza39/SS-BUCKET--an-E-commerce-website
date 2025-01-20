import React, { useState } from 'react';
import './SingleCartItem.css';
import Summary from './Summary';
import { Link } from 'react-scroll';
import axios from 'axios';

const SingleCartItem = (props) => {
  const [smry, setsmry] = useState(false);

  const handleBuy = () => {
    setsmry(true);
  };

  const handleRemove = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/cart/remove`, {
        clientId: props.userid, // Match schema field name
        itemId: props.selectedItem._id, // Pass item ID for removal
      });

      if (response.status === 200) {
        alert('Item removed successfully');
        props.onItemRemoved(props.selectedItem._id); // Notify parent to update UI
      } else {
        alert('Failed to remove the item. Please try again.');
      }
    } catch (error) {
      console.error('Error removing item:', error.response ? error.response.data : error.message);
      alert(
        error.response?.data?.message ||
          'An error occurred while removing the item. Please try again.'
      );
    }
  };

  return (
    <div>
      <div className="cartItem">
        <img src={props.selectedItem.image} alt="" style={{ height: '120px' }} />
        <div className="desc-btn">
          <p>
            <b>Brand: </b> {props.selectedItem.brand} <br />
            <b>Model: </b> {props.selectedItem.name} <br />
            <b>Price: </b> ${props.selectedItem.price} <br />
          </p>
          <div className="btn">
            <div className="remove">
              <button className="remove" onClick={handleRemove}>
                <b>Remove</b>
              </button>
            </div>
            <Link to="summary_section" smooth={true} duration={500}>
              <div onClick={handleBuy} className="buy">
                <button className="buy">
                  <b>Buy</b>
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="summary_section">
        {smry && <Summary selectedItem={props.selectedItem} />}
      </div>
    </div>
  );
};

export default SingleCartItem;
