import React, {useState} from 'react'
import './DashBoard.css'
import AddProduct from './AddProduct'
import {Link} from 'react-scroll'


const DashBoard = () => {
    const [add, setadd] = useState(false)
    const addProduct = (add)=>{
        setadd(add? false: true);
    }
  return (
    <div className='dashContainer'>
        <div className="dashes">
            <h1>$1000</h1>
            <p>Your total income till now</p>
        </div>
        <div className="dashes">
            <h1>234</h1>
            <p>Orders are in the pending list</p>
        </div>
        <div className="dashes">
            <h1>10</h1>
            <p>New Arrival</p>
        </div>
        <div className="dashes">
            <h1>4 Items</h1>
            <p>Showing on Big Screen</p>
        </div>
        <div className="dashes">
            <h1>5</h1>
            <p>Items are out of stock. <u>Review</u> </p>
        </div>
        {/* <div  className="dashes" onClick={()=>{addProduct(add)}}> */}
            <nav className="dashes" onClick={()=>{addProduct(add)}}>
            <Link  to='add-component' smooth={true} duration={500}>
                <p>Add new items in your stock</p>
            </Link>
        </nav>
        {/* </div> */}
            {add && <div id="add-component"> <AddProduct addProduct={addProduct} add = {add}/></div>}        
    </div>
  )
}

export default DashBoard
