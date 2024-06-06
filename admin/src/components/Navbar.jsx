import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    const [option, setoption] = useState(()=>{
      const savedValue = localStorage.getItem('persistentValue');
      return savedValue !== null ? JSON.parse(savedValue) : "dash";
    });

    useEffect(() => {
      // Update localStorage whenever value changes
      localStorage.setItem('persistentValue', JSON.stringify(option));
    }, [option]);

    const handleClick = (e) => {
      if (option !== e) {
        setoption(e);
      }
    };
  return (
    <div className='navbarContainer'>
      <h1>S S BUCKET</h1>
      <div className="nav">
        <div className="dashBoard" onClick={()=>{handleClick('dash')}}><Link style={{textDecoration: "none", color: "black"}}  to='/'>Dash Board</Link> {option==='dash' && <hr /> } </div>
        <div className="products" onClick={()=>{handleClick('products')}}><Link style={{textDecoration: "none", color: "black"}}  to='/products'>Your Products</Link> {option==='products' && <hr /> } </div>
        <div className="pendings" onClick={()=>{handleClick('pendings')}}><Link style={{textDecoration: "none", color: "black"}}  to='/pendings'>Pending Orders</Link> {option==='pendings' && <hr /> }</div>
        <div className="history" onClick={()=>{handleClick('history')}}><Link style={{textDecoration: "none", color: "black"}}  to='/history'>Sale's History</Link> {option==='history' && <hr /> }</div>
        <div className="reset" onClick={()=>{handleClick('reset')}}><Link style={{textDecoration: "none", color: "black"}}  to='/reset'>Admin Profile</Link> {option==='reset' && <hr /> }</div>
      </div>
    </div>
  )
}

export default Navbar
