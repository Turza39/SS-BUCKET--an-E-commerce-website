import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Mobile from './components/Mobile';
import Laptop from './components/Laptop';
import Accessories from './components/Accessories';
import Home from './pages/Home';
import BigSales from './pages/BigSales';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Account from './pages/Account';
import ProfileLogin from './pages/ProfileLogin';
import Footer from './components/Footer';
import ProductDetails from './pages/ProductDetails';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/sales" Component={BigSales} />
            <Route path="/products" Component={Products} />
            <Route path="/mobile" Component={Mobile} />
            <Route path="/laptop" Component={Laptop} />
            <Route path="/accessories" Component={Accessories} />
            <Route path="/cart" Component={Cart} />
            <Route path="/account" Component={Account} />
            <Route path="/profilelogin" Component={ProfileLogin} />
            <Route path="/productDetails/:item" Component={ProductDetails} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

