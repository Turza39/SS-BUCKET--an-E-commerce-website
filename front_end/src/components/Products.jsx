import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Products.css';
import ProductCard from './ProductCard';

const Products = (props) => {

  const [allProducts, setallProducts] = useState([]);
  useEffect(()=>{
    const fetchdata = async ()=>{
      try{
        const response = await axios.get("http://localhost:4000/allproducts");
        setallProducts(response.data)
        console.log(allProducts);
      }catch(error){
  
      }
    }
    fetchdata();
  }, [])

  const laptops = allProducts.filter(item=> item.category === "Laptop");
  const phones = allProducts.filter(item=> item.category === "Phone");
  const headphones = allProducts.filter(item=> item.category === "Headphone");
  const catgory = props.category==="Laptop"? laptops: props.category==="Phone"? phones: headphones;
    
  return (
    <div className='cards'>
      {
        catgory.map((item)=>(
          <div className="singleCard">
            <ProductCard item={item} />
          </div>
        ))
      }
    </div>
  )
}

export default Products
