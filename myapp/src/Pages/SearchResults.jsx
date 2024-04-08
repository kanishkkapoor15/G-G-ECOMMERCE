import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './CSS/SearchResults.css';
import search_banner from '../Components/Assets/eosBanner.png';

const SearchResults = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const value = params.get('value');

  useEffect(() => {
    const category = params.get('category');
    // Encode the category parameter before appending it to the URL
    const encodedCategory = encodeURIComponent(category);
    const url = category ? `http://localhost:4000/search?q=${value}&category=${encodedCategory}` : `http://localhost:4000/search?q=${value}`;

    fetch(url)
      .then(response => response.json())
      .then(data => setSearchResults(data));
  }, [search]);

  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="search-title">
      <div className='search-banner'>
        <Link to={`/SearchResults?value=women`}>
          <img src={search_banner} alt="" />
        </Link>
      </div>
      <h1>TOP RESULTS<hr /></h1>
      
      <div className='search-results'>
        {searchResults.map(product => (
          <div key={product._id}>
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt="" />
            </Link>
            <h3>{product.name}</h3>
            <div className="search-results-price">
              <div className='search-results-price-new'>
                <p> ${product.new_price}</p>
              </div>
              <div className='search-results-price-old'>
                <p>${product.old_price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchResults;
