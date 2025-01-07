// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Search.css";

// const Search = () => {
//     const [query, setQuery] = useState("");
//     const [suggestions, setSuggestions] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const navigate = useNavigate(); 

//     useEffect(() => {
//         if (!query.trim()) {
//             setSuggestions([]);
//             return;
//         }

//         const fetchSuggestions = async () => {
//             setLoading(true);
//             try {
//                 const response = await axios.get(`http://localhost:4000/searchsuggestions`, {
//                     params: { q: query },
//                 });
//                 setSuggestions(response.data);
//                 setError("");
//             } catch (err) {
//                 console.error("Error fetching suggestions:", err);
//                 setError("Error fetching suggestions");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const debounceTimeout = setTimeout(fetchSuggestions, 300);

//         return () => clearTimeout(debounceTimeout);
//     }, [query]);

//     const handleSuggestionClick = (product) => {
//         const encodedProduct = encodeURIComponent(JSON.stringify(product));
//         navigate(`/productDetails/${encodedProduct}`); 
//     };

//     return (
//         <div className="bdy">
//             <div className={`box ${query ? "active" : ""}`}>
//                 <input
//                     className="textBox"
//                     type="text"
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     placeholder="Search for products"
//                 />
//                 <span className="searchIcon">🔍</span>
//                 <ul className="suggestions-list">
//                     {suggestions.map((product) => (
//                         <li
//                             key={product._id}
//                             onClick={() => handleSuggestionClick(product)}
//                             style={{ cursor: "pointer" }}
//                         >
//                             {product.name} - {product.brand}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             {loading && <p>Loading...</p>}
//             {error && <p style={{ color: "red" }}>{error}</p>}
//         </div>
//     );
// };

// export default Search;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const Search = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    useEffect(() => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:4000/searchsuggestions`, {
                    params: { q: query },
                });
                setSuggestions(response.data);
                setError("");
            } catch (err) {
                console.error("Error fetching suggestions:", err);
                setError("Error fetching suggestions");
            } finally {
                setLoading(false);
            }
        };

        const debounceTimeout = setTimeout(fetchSuggestions, 300);

        return () => clearTimeout(debounceTimeout);
    }, [query]);

    const handleSuggestionClick = (product) => {
        const encodedProduct = encodeURIComponent(JSON.stringify(product));
        navigate(`/productDetails/${encodedProduct}`);
    };

    return (
      <div
      className="search-container"
      style={{
          marginBottom: suggestions.length > 0 ? `${Math.min(suggestions.length * 40, 220)}px` : "20px",
      }}
  >  
            <div className={`box ${query ? "active" : ""}`} style={{ position: "relative" }}>
                <input
                    className="textBox"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for products"
                />
                <span className="searchIcon">🔍</span>
                {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((product) => (
                            <li
                                key={product._id}
                                onClick={() => handleSuggestionClick(product)}
                                style={{ cursor: "pointer" }}
                            >
                                {product.name} - {product.brand}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Search;