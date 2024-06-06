import React, { useState } from 'react'
import sort from './assets/sort.png';
import filter from './assets/filter.png';
import cross from './assets/cross.png';
import './Filter.css';

const Filter = () => {
    const [filterIsOn, setfilterIsOn] = useState(false)
    const filterBtn = ()=>{
        setfilterIsOn(filterIsOn? false: true);
    }
    const crossBtn = ()=>{
        setfilterIsOn(false)
    }
  return (
    <div className="container">
    <div className='sortFilterBox'>
      <div className="sort-filter-icons">
        <img className='sort' src={sort} alt="" />
        <img onClick={filterBtn} className='filter' src={filter} alt="" />
      </div>
      {filterIsOn && 
      <div className="filterBox">
        <img onClick={crossBtn} className='cross' src={cross} alt="" />
        <div className="brand">
            <label htmlFor="brand"> Brand: <br />
                <input type="checkbox" name='option' id='apple' /> Apple
            </label>
            <label htmlFor="brand">
                <input type="checkbox" name='option' id='hp' /> HP
            </label>
            <label htmlFor="brand">
                <input type="checkbox" name='option' id='asus' /> Asus
            </label>
            <label htmlFor="brand">
                <input type="checkbox" name='option' id='lenovo' /> Lenovo
            </label>
        </div>
        <div className="filterPrice">
            <label htmlFor="min-price"> Price: <br /> Minimum:
                <input type="text" name='min-price' id='min' />
            </label>
            <label htmlFor="max-price"> Maximum:
                <input type="text" name='max-price' id='max' />
            </label>
        </div>
        <button onClick={crossBtn} className='filter-submit'>Search</button>
       </div>
}
    </div>
    </div>
  )
}

export default Filter
