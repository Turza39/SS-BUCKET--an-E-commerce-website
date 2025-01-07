import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Products.css';
import ProductCard from './ProductCard';

const Products = (props) => {

  const [allProducts, setallProducts] = useState([]);
    const [isAscending, setIsAscending] = useState(true); // Track toggle state, initially ascending

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

  const toggleSortOrder = () => {
    const sortedProducts = [...allProducts].sort((a, b) => {
        if (isAscending) {
            return b.new_price - a.new_price; 
        } else {
            return a.new_price - b.new_price; 
        }
    });
    setallProducts(sortedProducts);
    setIsAscending(!isAscending); 
};

  const laptops = allProducts.filter(item=> item.category === "Laptop");
  const phones = allProducts.filter(item=> item.category === "Phone");
  const accessories = allProducts.filter(item=> item.category === "Accessories");
  const catgory = props.category==="Laptop"? laptops: props.category==="Phone"? phones: accessories;
    
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
