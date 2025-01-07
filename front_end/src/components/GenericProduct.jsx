import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./GenericProduct.css"

const GenericProduct = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/products/${category}`);
        setProducts(response.data);
        setLoading(false);
        console.log(products)
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return <div>Loading {category} products...</div>;
  }

  return (
    <div className="generic-product">
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Products</h2>
      <div className="generic-product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} item={product} /> 
        ))}
      </div>
    </div>
  );
};

export default GenericProduct;
