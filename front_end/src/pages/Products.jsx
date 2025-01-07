import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOptions, setSortOptions] = useState({
    Laptop: 'alphabetical',
    Phone: 'alphabetical',
    Headphone: 'alphabetical',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/allproducts');
        setAllProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching products');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSortChange = (category, value) => {
    setSortOptions((prev) => ({ ...prev, [category]: value }));
  };

  const getSortedProducts = (category) => {
    const products = allProducts.filter((item) => item.category === category);
    if (sortOptions[category] === 'alphabetical') {
      return products.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortOptions[category] === 'price') {
      return products.sort((a, b) => a.new_price - b.new_price);
    }
    return products;
  };

  const renderProducts = (category) => {
    const sortedProducts = getSortedProducts(category);
    return sortedProducts.length > 0 ? (
      sortedProducts.map((item) => (
        <div className="singleCard" key={item.id}>
          <ProductCard item={item} />
        </div>
      ))
    ) : (
      <div>No products found in this category.</div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {['Laptop', 'Phone', 'Accessories'].map((category) => (
        <div key={category} className="categorySection">
          <div className="categoryHeader">
            <h1>
              {category === 'Laptop' ? 'Laptops' : category === 'Phone' ? 'Mobile Phones' : 'Accessories'}
            </h1>
            <select
              onChange={(e) => handleSortChange(category, e.target.value)}
              value={sortOptions[category]}
              className="sortDropdown"
            >
              <option value="alphabetical">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
          <hr className="divider" />
          <div className="cards">{renderProducts(category)}</div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Products;