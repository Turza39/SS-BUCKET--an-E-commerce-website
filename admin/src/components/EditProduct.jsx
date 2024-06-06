import React, { useState } from 'react'
import './EditProduct.css'
import axios from 'axios'
import cross from './assets/cross.png'

const EditProduct = (props) => {
    const [image, setimage] = useState(false);
    const [product, setProduct] = useState({
        image: '',
        category: props.item.category,
        brand: props.item.brand,
        model: props.item.model,
        old_price: props.item.old_price,
        new_price: props.item.new_price,
        quantity: props.item.quantity,
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

    const editItem = async(id, item)=>{
        let products = product;
        let formData = new FormData();
        formData.append('product', image);

        try{
            const response = await axios.post('http://localhost:4000/upload', formData);
            products.image = response.data.image_url;
        }catch(error){

        }
        console.log(id, products);
        try{
            const response2 = axios.put(`http://localhost:4000/editItem/${id}`, products);
            console.log( response2.data.item)
        }catch(error){

        }
        props.handleEdit(props.editbtn)
      }
        
    return (
        <div className='editProductContainer'>
            {
                props.editbtn &&
                <div className='form'>                  
                    <div className="image">
                    <img className="img" src={image? URL.createObjectURL(image):props.item.image} alt="Product Image" />
                    <img className="cross" src={cross} alt="" onClick={()=>{props.handleEdit(props.editbtn)}}/>
                    </div>
                    <label htmlFor="image" className='image'></label>
                    <input type="file" accept="image/*" name='image' value={product.image} onChange={imageHandler} />
                    <label htmlFor="brand">Brand: </label>
                    <input type="text" id='brand' name='brand' value={product.brand} onChange={onValueChange}/>
                    <label htmlFor="category">Category: </label>
                    <input type="text" id='category' name='category' value={product.category} onChange={onValueChange}/>
                    <label htmlFor="model">Model: </label>
                    <input type="text" id='model' name='model' value={product.model} onChange={onValueChange} placeholder={props.model}/>
                    <label htmlFor="oldPrice">Old Price: </label>
                    <input type="textbox" id='oldPrice' name='old_price' value={product.old_price} onChange={onValueChange}/>
                    <label htmlFor="new_price">New Price: </label>
                    <input type="textbox" id='new_price' name='new_price' value={product.new_price} onChange={onValueChange}/>
                    <label htmlFor="quantity">Stock Quantity: </label>
                    <input type="text" id='quantity' name='quantity' value={product.quantity} onChange={onValueChange}/>
                    <button onClick={()=>{editItem(props.item._id, props.item)} }>Edit Product</button>
                </div>
            }

        </div>
    )
}

export default EditProduct
