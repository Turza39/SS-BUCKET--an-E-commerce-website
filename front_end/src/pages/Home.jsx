import React from 'react';
import BigScreen from '../components/BigScreen';
import Products from '../components/Products';
import Search from '../components/Search';
import './Home.css'

const Home = () => {
  return (
    <div className='home'>
      <div className='search-container'>
        <Search />
      </div>
      <br /><br />
      <BigScreen /> <br /><br /><br />
      <h1 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>Our Products</h1>
      <hr style={{ height: '5px' }} />
      <Products category='Laptop' /> <br />
      <Products category='Phone' /> <br />
      <Products category='Accessories' /> <br />
    </div>
  );
};

export default Home;

