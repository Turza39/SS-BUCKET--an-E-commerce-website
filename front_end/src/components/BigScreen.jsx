import React, { useEffect, useState } from 'react';
import laptop from './assets/bigScreen/laptop.jpg';
import headphone from './assets/bigScreen/headphone.jpg';
import phone from './assets/bigScreen/phone.jpg';
import './BigScreen.css'

const BigScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {image: laptop, desc: "Cross MULTI DIMENSTION with MULTI CORES "},
    {image: phone, desc: "Grab the world into YOUR HAND"},
    {image: headphone, desc: "DECORATE YOURSELF with awesome GADGETS"}
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, []); 

  return (
    <div className="slideshow-container">
        <h1>EXPLORE THE REALM OF GADGETS</h1>
      <div className="product">
      <img src={images[currentIndex].image} alt={`Image ${currentIndex + 1}`} className="slideshow-image" />
      <p className='desc' ><b>{images[currentIndex].desc}</b></p>
      </div>
    </div>
  );
};

export default BigScreen
