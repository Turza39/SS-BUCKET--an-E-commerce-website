import React from 'react'
import BigScreen from '../components/BigScreen'
import Products from '../components/Products'
import Search from '../components/Search'

const Home = () => {
  return (
    <div className='home'>
      <Search /> <br /> <br />
      <BigScreen /> <br /> <br /><br />
      <h1 style={{textAlign: 'center', fontFamily:'Arial, sans-serif'}}>Our Products</h1>
      <hr style={{height: '5px'}}/>
      <Products category='laptop' /> <br />
    </div>
  )
}

export default Home
