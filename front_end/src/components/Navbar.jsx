import React, { useState } from 'react'
import './Navbar.css'
import Logo from './assets/Logo.png'
import cart from './assets/cart.png'
import profile from './assets/profile.png'
import { Link } from 'react-router-dom'
const Navbar = () => {
    const [menu, setMenu] = useState(null)
    const [isLogin, setisLogin] = useState(false)
  return (
    <div className='navbar'>
      <div className='logo'>
        <img src={Logo} alt=""/> <br />
        <p><b>S S BUCKET</b></p>
      </div>
      <div className="menu">
        <ul>
            <li onClick={()=>{setMenu("shop")}}> <Link style={{textDecoration: 'none'}} to='/'><b>Shop</b></Link> {menu==="shop" && <hr /> } </li>
            <li className='products' onClick={()=>{setMenu("products")}}><Link style={{textDecoration: 'none'}} to='/products'><b>Products</b></Link> {menu==="products" && <hr /> }
            <div className="product-item">
                <Link to='/mobile'>
                <a className="mobile">Mobile</a>
                </Link>
                <Link to='/laptop'>
                <a className="laptop">Laptop</a>
                </Link>
                <Link to='accessories'>
                <a className="accessories">Accessories</a>
                </Link>
            </div>
            </li>
            <li onClick={()=>{setMenu("sales")}}><Link style={{textDecoration: 'none'}} to='/sales'><b>Big Sales</b></Link> {menu==="sales" && <hr /> }</li>
        </ul>
      </div>
      <div className="cart-profile">
        <Link to='/cart'>
            <img src={cart} alt="cart" />
        </Link>
            <div className="cart-count">0</div>
        <Link to='profilelogin'>
            <img src={profile} alt="profile" />
        </Link>
      </div>
    </div>
  )
}

export default Navbar
