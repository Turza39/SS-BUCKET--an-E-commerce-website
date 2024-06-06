import 'react-router-dom';
import './App.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
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
    <div>
      <BrowserRouter>
       <Navbar />
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/sales' Component={BigSales} />
        <Route path='/products' Component={Products} />
        <Route path='/cart' Component={Cart} />
        <Route path='/account' Component={Account} />
        <Route path='/profilelogin' Component={ProfileLogin} />
        <Route path='/productDetails/:item' Component={ProductDetails} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
