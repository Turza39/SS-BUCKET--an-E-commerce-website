import React, { useState } from 'react'
import './AddProduct.css'
import axios from 'axios'
import cross from './assets/cross.png'

const AddProduct = (props) => {
    const [image, setimage] = useState(false);
    const [product, setProduct] = useState({
        image: '',
        category: '',
        brand: '',
        model: '',
        old_price: 0,
        new_price: 0,
        quantity: 0,
    });
    const imageHandler = (e)=>{
        setimage(e.target.files[0]);
    }
    const onValueChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        })
    }

    const [response, setresponse] = useState(null)
    const addProduct = async()=>{
        let products = product;

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
        <div className='addProductContainer'>
            {
                props.add &&
                <div className='form'>                  
                    <div className="image">
                    <img className='img' src={image? URL.createObjectURL(image):null} alt="Product Image" />
                    <img className='cross' src={cross} alt="" onClick={()=>{props.addProduct(props.add)}}/>
                    </div>
                    <label htmlFor="image" className='image'></label>
                    <input type="file" accept="image/*" name='image' value={product.image} onChange={imageHandler} />
                    <label htmlFor="brand">Brand: </label>
                    <input type="text" id='brand' name='brand' onChange={onValueChange} />
                    <label htmlFor="category">Category: </label>
                    <input type="text" id='category' name='category' value={product.category} onChange={onValueChange} />
                    <label htmlFor="model">Model: </label>
                    <input type="text" id='model' name='model' value={product.model} onChange={onValueChange} />
                    <label htmlFor="oldPrice">Old Price: </label>
                    <input type="textbox" id='oldPrice' name='old_price' value={product.old_price} onChange={onValueChange} />
                    <label htmlFor="new_price">New Price: </label>
                    <input type="textbox" id='new_price' name='new_price' value={product.new_price} onChange={onValueChange} />
                    <label htmlFor="quantity">Stock Quantity: </label>
                    <input type="text" id='quantity' name='quantity' value={product.quantity} onChange={onValueChange} />
                    <button onClick={addProduct }>Add Product</button>
                </div>
            }

        </div>
    )
}

export default AddProduct
