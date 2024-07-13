import React from 'react'
import laptop from './assets/bigScreen/laptop.jpg';
import phone from './assets/bigScreen/phone.jpg';
import headphone from './assets/bigScreen/headphone.jpg';
import SingleCartItem from './SingleCartItem';

const CartList = (props) => {
    const cartList =[
        {category: "laptop", brand: "HP", model: 1, price: 1200, image: laptop},
        {category: "phone", brand: "Samsung", model: 1, price: 700, image: phone},
        {category: "headphone", brand: "Sony", model: 1, price: 200, image: headphone},
    ]
  return (
    <div className='cartList'>
        {
            cartList.map((item, index)=>(
                <SingleCartItem key= {index} selectedItem={props.selectedItem} selectItem={props.selectItem}
                currentItem={item} />
            ))
        }
    </div>
  )
}

export default CartList
