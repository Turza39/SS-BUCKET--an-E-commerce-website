// import React, {useState} from 'react'
// import './DashBoard.css'
// import AddProduct from './AddProduct'
// import {Link} from 'react-scroll'


// const DashBoard = () => {
//     const [add, setadd] = useState(false)
//     const addProduct = (add)=>{
//         setadd(add? false: true);
//     }
//   return (
//     <div className='dashContainer'>
//         <div className="dashes">
//             <h1>$1000</h1>
//             <p>Your total income till now</p>
//         </div>
//         <div className="dashes">
//             <h1>234</h1>
//             <p>Orders are in the pending list</p>
//         </div>
//         <div className="dashes">
//             <h1>10</h1>
//             <p>New Arrival</p>
//         </div>
//         <div className="dashes">
//             <h1>4 Items</h1>
//             <p>Showing on Big Screen</p>
//         </div>
//         <div className="dashes">
//             <h1>5</h1>
//             <p>Items are out of stock. <u>Review</u> </p>
//         </div>
//         {/* <div  className="dashes" onClick={()=>{addProduct(add)}}> */}
//             <nav className="dashes" onClick={()=>{addProduct(add)}}>
//             <Link  to='add-component' smooth={true} duration={500}>
//                 <p>Add new items in your stock</p>
//             </Link>
//         </nav>
//         {/* </div> */}
//             {add && <div id="add-component"> <AddProduct addProduct={addProduct} add = {add}/></div>}        
//     </div>
//   )
// }

// export default DashBoard


import React, { useState, useEffect } from "react";
import "./DashBoard.css";
import AddProduct from "./AddProduct";
import { Link } from "react-scroll";
import axios from "axios";

const DashBoard = () => {
  const [add, setAdd] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0); // Updated to store count
  const [newArrivals, setNewArrivals] = useState(0);
  const [bigScreenItems, setBigScreenItems] = useState(0);
  const [outOfStockItems, setOutOfStockItems] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const [incomeRes, orderCountRes] = await Promise.all([
        axios.get("http://localhost:4000/orders/totalIncome"), // Total income API
        axios.get("http://localhost:4000/orders/count"), // Order count API
        // axios.get("http://localhost:4000/dashboard/newarrivals"),
        // axios.get("http://localhost:4000/dashboard/bigscreen"),
        // axios.get("http://localhost:4000/allproducts"),
      ]);

      setTotalIncome(incomeRes.data.totalIncome); // Set total income
      setPendingOrders(orderCountRes.data.orderCount); // Set number of pending orders
      // setNewArrivals(arrivalsRes.data);
      // setBigScreenItems(bigScreenRes.data);
      // setOutOfStockItems(productsRes.data.filter(product => product.quantity === 0)); // Filter out-of-stock items
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const addProduct = (add) => {
    setAdd(add ? false : true);
  };

  return (
    <div className="dashContainer">
      <div className="dashes">
        <h1>${totalIncome}</h1>
        <p>Your total income till now</p>
      </div>
      <div className="dashes">
        <h1>{pendingOrders}</h1>
        <p>Orders are in the pending list</p>
      </div>
      <div className="dashes">
        <h1>2</h1>
        <p>New Arrival</p>
      </div>
      <div className="dashes">
        <h1>3</h1>
        <p>Showing on Big Screen</p>
      </div>
      <div className="dashes">
        <h1>0</h1>
        <p>Items are out of stock. <u>Review</u></p>
      </div>
      <nav className="dashes" onClick={() => addProduct(add)}>
        <Link to="add-component" smooth={true} duration={500}>
          <p>Add new items in your stock</p>
        </Link>
      </nav>
      {add && <div id="add-component"> <AddProduct addProduct={addProduct} add={add} /></div>}
    </div>
  );
};

export default DashBoard;

