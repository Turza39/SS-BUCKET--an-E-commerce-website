import React from 'react';
import Product from '../components/Products';
import Search from '../components/Search';
import Filter from '../components/Filter';

const Products = () => {
  return (
    <div productPage>
      <Search /> <br /><br />
      <h1 style={{textAlign: 'center', fontFamily:'Arial, sans-serif'}}>Laptops</h1> 
      <Filter />
      <hr style={{height: '5px'}}/> 
      <Product category='Laptop'/> <br /> <br />
      <h1 style={{textAlign: 'center', fontFamily:'Arial, sans-serif'}}>Mobile Phones</h1> 
      <hr style={{height: '5px'}} /> 
      <Product category='Phone' /> <br /> <br />
      <h1 style={{textAlign: 'center', fontFamily:'Arial, sans-serif'}}>Accessories</h1> 
      <hr style={{height: '5px'}} /> 
      <Product category='Headphone' />
    </div>
  )
}

export default Products
