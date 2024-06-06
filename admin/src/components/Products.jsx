import React, { useEffect, useState } from 'react'
import './Products.css'
import axios from 'axios';
import EditProduct from './EditProduct';

const Products = () => {
  const [data, setData] = useState([]);
  const fech = async () => {
    try{
      const response = await axios.get("http://localhost:4000/allproducts");
      setData(response.data);
      console.log({ data });
    }catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    fech();
  }, [])

  const handleDelete = async (item) => {
    try {
      console.log(item._id);
      const response = await axios.delete(`http://localhost:4000/deleteItem/${item._id}`)
      fech();
    } catch (error) {

    }
  }
  const [typeFilter, setTypeFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");

  const handleTypeChange = (event) => {
    setTypeFilter(event.target.value);
  };

  const handleBrandChange = (event) => {
    setBrandFilter(event.target.value);
  };

  const handleModelChange = (event) => {
    setModelFilter(event.target.value);
  };

  const [editbtn, seteditbtn] = useState(false);
  const [itemToEdit, setitemToEdit] = useState(null)
  const handleEdit = (e) => {
    seteditbtn(editbtn ? false : true);
    setitemToEdit(e);
  }
  const filteredProducts = data.filter(product =>
    product?.brand?.toLowerCase().includes(brandFilter.toLowerCase()) &&
    product?.model?.toLowerCase().includes(modelFilter.toLowerCase()) &&
    product?.category?.toLowerCase().includes(typeFilter.toLowerCase())
  );

  return (
    <div className="products">
      <h1>Search Product</h1>
      <div className="search-boxes">
        <input
          type="text"
          placeholder="Search by Type"
          value={typeFilter}
          onChange={handleTypeChange}
        />
        <input
          type="text"
          placeholder="Search by brand"
          value={brandFilter}
          onChange={handleBrandChange}
        />
        <input
          type="text"
          placeholder="Search by model"
          value={modelFilter}
          onChange={handleModelChange}
        />
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div key={index} className="product-item">
              <div className="details">
                <p>ID: {product.id}</p>
                <p>Type: {product.category} </p>
                <p>Brand: {product.brand}</p>
                <p>Model: {product.model}</p>
              </div>
              <div className='btns'>
                <button onClick={() => { handleEdit(product); fech() }} className='edit'>Edit</button>
                <button onClick={()=>{handleDelete(product)}} className='delete'>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
        {editbtn && <EditProduct item={itemToEdit} editbtn={editbtn} handleEdit={handleEdit} />}
      </div>
    </div>
  );
}

export default Products
