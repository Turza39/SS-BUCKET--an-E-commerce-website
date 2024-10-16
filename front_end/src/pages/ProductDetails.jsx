// import React from 'react'
// import './ProductDetails.css'
// import { useState } from 'react'
// import { useParams } from 'react-router-dom'
// import phone from '../components/assets/bigScreen/phone.jpg'
// import Summary from '../components/Summary.jsx'
// import axios from 'axios'

// const ProductDetails = () => {
//     const [quantity, setquantity] = useState(1);
//     const [order, setorder] = useState({});
//     const [smry, setsmry] = useState(false)

//     const increaseQuantity = ()=>{
//       setquantity(quantity+1);
//     }
//     const decreaseQuantity = ()=>{
//       setquantity(quantity===1? 1: quantity-1);
//     }
//     const orderHandle = async ()=>{
//       try{
//         const token = localStorage.getItem('token');
//         console.log(token);
//         const response = await axios.get('http://localhost:4000/user/profile', {
//           headers: {
//               Authorization: `Bearer ${token}`
//           }
//       });        
//       const client = response.data.profile;
//       // console.log(client);
//       setsmry(true);
//       const neworder = {
//         brand: decodedItem.brand,
//         model: decodedItem.model,
//         price: decodedItem.new_price,
//         address: client.address,
//         phone: client.phone,
//         discount: 0,
//         total: quantity * decodedItem.new_price+5,
//         clientId: client._id,
//         clientName: client.name
//       }
//       setorder(neworder);
//       console.log(order);
//       }catch(error){

//       }
//     }
//     const {item} = useParams();
//     const decodedItem = JSON.parse(decodeURIComponent(item));
//   return (
//     <div className='productDetailsContainer'>
//       <div className="boundary">
//         <div className="product">
//             <h2>{decodedItem.model}</h2>
//             <div className="images">
//                 <div className="bigImage"><img src={decodedItem.image} alt="" /></div>
//                 <div className="description">
//                     <div className="price">${decodedItem.new_price*quantity}</div>
//                     <div className="dlvry">Free delivery with advance payment</div>
//                     <div className="details">Details: {decodedItem.description}</div>
//                     <div className="btns">
//                         <div className="quantity">
//                             <button className='decrease' onClick={decreaseQuantity}>-</button>
//                             <button className="qntity">{quantity}</button>
//                             <button className="increase" onClick={increaseQuantity}>+</button>
//                         </div>
//                         <button onClick={orderHandle} className="order">Order Now</button>
//                     </div>
//                 <div className="smallImage">
//                 {/* <img src={product.image1} alt="" />
//                 <img src={product.image2} alt="" />
//                 <img src={product.image3} alt="" /> */}
//                 </div>
//                 </div>
//             </div>
//         </div>
//       </div>
//       {smry && <Summary selectedItem={order}/>}
//     </div>
//   )
// }

// export default ProductDetails



import React from 'react'
import './ProductDetails.css'
import { useParams } from 'react-router-dom'
import star_icon from "../components/assets/star_icon.png"
import axios from 'axios'
import { useState } from 'react'
import Summary from '../components/Summary.jsx'
import { Link, animateScroll as scroll } from 'react-scroll';



const ProductCard = () => {

  const [quantity, setquantity] = useState(1);
  const [order, setorder] = useState({});
  const [smry, setsmry] = useState(false)

  const increaseQuantity = () => {
    setquantity(quantity + 1);
  }
  const decreaseQuantity = () => {
    setquantity(quantity === 1 ? 1 : quantity - 1);
  }

  const cartHandle = async (e)=>{
    // const itemData = Array.isArray(e) ? e : [e];
    // console.log(itemData)
    try{
      const currentuserid = localStorage.getItem('currentuserid');
      const response = await axios.post('http://localhost:4000/cart', {'userid': currentuserid, 'item': e} );
      
    }catch(error){

    }
  }

  const orderHandle = async () => {
    console.log("buying now")
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await axios.get('http://localhost:4000/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const client = response.data.profile;
      setsmry(true);
      const neworder = {
        brand: decodedItem.brand,
        name: decodedItem.name,
        price: decodedItem.new_price,
        address: client.address,
        phone: client.phone,
        discount: 0,
        total: quantity * decodedItem.new_price + 5,
        clientId: client._id,
        clientName: client.name
      }
      setorder(neworder);
      // console.log(order);
    } catch (error) {

    }
  }

  const { item } = useParams();
  const decodedItem = JSON.parse(decodeURIComponent(item));

  return (
    <div>
      <div className='productDisplay'>
        <div className="productDisplay-left">
          <div className="productDisplay-left-img-list">
            <img src={decodedItem.image} alt="" />
            <img src={decodedItem.image} alt="" />
            <img src={decodedItem.image} alt="" />
            <img src={decodedItem.image} alt="" />
          </div>
          <div className="productDisplayImg">
            <img className='productDisplay-main-img' src={decodedItem.image} alt="" />
          </div>
        </div>
        <div className="productDisplay-right">
          <h1>{decodedItem.model}</h1>
          <div className="productDisplay-right-stars">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <p>(122)</p>
          </div>
          <div className="productDisplay-right-prices">
            <div className="productDisplay-right-price-old">${decodedItem.old_price}</div>
            <div className="productDisplay-right-price-new">${decodedItem.new_price}</div>
          </div>
          <div className="productDisplay-right-discription">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad,
            accusantium rem! Dolorum pariatur nostrum quibusdam hic rem
            beatae, numquam sapiente.
          </div>
          <div className="producDisplay-right-quantity">
            <button className='decrease' onClick={decreaseQuantity}>-</button>
            <button className="qntity">{quantity}</button>
            <button className="increase" onClick={increaseQuantity}>+</button>
          </div>
          <div className="productDisplay-right-buttons">
            <button onClick={()=>cartHandle(decodedItem)} className='add-to-cart'>ADD TO CART</button>
            <nav>
              <Link to="summary-section" smooth={true} duration={500}>
                <button className='buy-now' onClick={orderHandle}>BUY NOW</button>
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div id="summary-section">
        {smry && <Summary selectedItem={order}/>}

      </div>
    </div>
  )
}

export default ProductCard


