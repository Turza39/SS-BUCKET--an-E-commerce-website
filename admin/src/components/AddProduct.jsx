import React, { useState } from 'react'
import './AddProduct.css'
import axios from 'axios'
import cross from './assets/cross.png'
import upload_area from './assets/upload.png'


const AddProduct = (props) => {

  const [image, setImage] = useState(false);

  const imageHandler = (e)=>{
    setImage(e.target.files[0]);
  }

  const [productDetails, setproductDetails] = useState({
    name: "",
    new_price: 0,
    old_price: 0,
    brand: "",
    quantity: 0,
    description: "",
    category: "Laptop", 
    image: ""
  });

  const changeHandler = (e)=>{
    setproductDetails({...productDetails, [e.target.name]: e.target.value})
  }
    // const [response, setresponse] = useState(null)
    const addProduct = async()=>{
        let products = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        try{
            const response = await axios.post('http://localhost:4000/upload', formData);
            products.image = response.data.image_url;
            console.log(products);
            const response2 = await axios.post('http://localhost:4000/addproduct', products);
            console.log("Successfully added product")
        }catch(error){
            console.log("Error: ", error);
        }
        props.addProduct(props.add);
    }

  return (
    <div className='add-product'>
        <div className="cross">
            <img className='cross' src={cross} alt="" onClick={()=>{props.addProduct(props.add)}}/>
        </div>
      <div className="addProduct-itemField">
        <p>Product Title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder='Type here' />
      </div>
      <div className="addProduct-price">
        <div className="addProduct-itemField">
            <p>Offer Price</p>
            <input value={productDetails.new_price} onChange={changeHandler}  type="text" name='new_price' placeholder='Type here' />
        </div>
      </div>
      <div className="addProduct-price">
        <div className="addProduct-itemField">
            <p>Old Price</p>
            <input value={productDetails.old_price} onChange={changeHandler}  type="text" name='old_price' placeholder='Type here' />
        </div>
      </div>
      <div className="addProduct-brand">
        <div className="addProduct-itemField">
            <p>Brand</p>
            <input value={productDetails.brand} onChange={changeHandler}  type="text" name='brand' placeholder='Type here' />
        </div>
      </div>
      <div className="addProduct-quantity">
        <div className="addProduct-itemField">
            <p>Stock quantity</p>
            <input value={productDetails.quantity} onChange={changeHandler}  type="text" name='quantity' placeholder='Type here' />
        </div>
      </div>
      <div className="addProduct-description">
        <div className="addProduct-itemField">
            <p>Product Description</p>
            <input value={productDetails.description} onChange={changeHandler}  type="text" name='description' placeholder='Type here' />
        </div>
      </div>
      <div className="addProduct-itemField">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler}  name="category" className='add-product-selector'>
            <option value="Laptop">Laptop</option>
            <option value="Phone">Phone</option>
            <option value="Headphone">Head Phone</option>
            <option value="PowerBank">Power Bank</option>
            <option value="Charger">Charger</option>
            <option value="Accessories">Accessories</option>
        </select>
      </div>
      <div className="addProduct-itemField">
        <label htmlFor="file-input">
            <img src={image? URL.createObjectURL(image): upload_area}  alt="" className='addProduct_thumbnail_img'/>
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' input/>
      </div>
      <button onClick={addProduct} className='addProduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct
