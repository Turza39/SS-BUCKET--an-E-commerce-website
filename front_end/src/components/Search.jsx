import React from 'react'
import './Search.css'
import search from './assets/search.png';

const Search = () => {
  return (
    <div className='bdy'>
      <div className="box">
        <input className='textBox' type="text" placeholder='Search product here' />
        <img className='searchIcon' src={search} alt="" />
      </div>
    </div>
  )
}

export default Search
