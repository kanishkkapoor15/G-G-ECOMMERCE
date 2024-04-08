import React, { useContext, useState } from 'react';
import './navbar.css';
import logo from '../Assets/blogo2.png';
import cart_icon from '../Assets/cart3.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import nav_dropdown_icon from '../Assets/nav-dropdown.png';
import brand_logo from '../Assets/brandLogo.png';
import SearchBar from '../SearchBar/SearchBar';
import ImageSearch from '../Assets/image_search.ico';
import axios from 'axios';
import user_profile from '../Assets/profile.gif';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [showMenDropdown, setShowMenDropdown] = useState(false);
  const [showWomenDropdown,setShowWomenDropdown]= useState(false);
  const [showKidsDropdown,setShowKidsDropdown]= useState(false);

  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);

    try {
      // Send image to extract features endpoint
      const response = await axios.post('http://localhost:4000/extract-features', formData);
      const { className } = response.data;
      console.log(className);

      // Navigate to SearchResults page with the search query
      navigate(`/SearchResults?value=${className}`);
    } catch (error) {
      console.error('Error searching by image:', error);
    }
  };

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  const handleMenDropdown = (productType) => {
    // Send request to search endpoint with product type and category "men"
    navigate(`/SearchResults?value=${productType}&category=men`);
  };

  const handleWomenDropdown =(productType)=> {
    navigate(`/SearchResults?value=${productType}&category=women`);
  };
  
  
  const handleKidsDropdown =(productType)=> {
    navigate(`/SearchResults?value=${productType}&category=kid`);
  };
  

  return (
    <div className='Navbar'>
      <div className="nav-logo">
        <Link to={'/'}> <img className="nav-brand-logo" src={logo} alt="" /></Link>
        <img className="nav-brand-name" src={brand_logo} alt="" />
      </div>
      <div className='nav-search-product'>
        <SearchBar />
      </div>

      <div className='nav-search-image'>
        <label htmlFor='image-upload' title='Click to search an image'>
          <img src={ImageSearch} alt='' />
        </label>
        <input id='image-upload' type='file' accept='image/*' onChange={handleImageUpload} style={{ display: 'none' }} />
      </div>

      <div className='nav-dropdown'>
        <img onClick={dropdown_toggle} src={nav_dropdown_icon} alt="" />
      </div>

      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("shop")}><Link style={{ textDecoration: 'none' }} to={'/'}>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
        <li 
          onMouseEnter={() => setShowMenDropdown(true)} 
          onMouseLeave={() => setShowMenDropdown(false)} 
          className="dropdown-category"
        >
          <Link style={{textDecoration:'none'}}  onClick={() => setMenu("men")} to={'/men'}>Men</Link>{menu === "men" ? <hr /> : <></>}
          {showMenDropdown && (
            <div className="dropdown-content-category">
              <a onClick={() => handleMenDropdown("shirt")}>Shirts</a>
              <a onClick={() => handleMenDropdown("jacket")}>Jackets</a>
              <a onClick={() => handleMenDropdown("tshirt")}>T-shirts</a>
              <a onClick={() => handleMenDropdown("sport")}>Sports Apparel</a>
              <a onClick={() => handleMenDropdown("sweatshirt")}>Sweatshirts</a>
              <a onClick={() => handleMenDropdown("trouser")}>Trousers</a>
              <a onClick={() => handleMenDropdown("shoe")}>Shoes</a>
              {/* Add other product types */}
            </div>
          )}
        </li>

      <li 
        onMouseEnter={() => setShowWomenDropdown(true)} 
        onMouseLeave={() => setShowWomenDropdown(false)} 
          className="dropdown-category"
        >
          <Link style={{textDecoration:'none'}}  onClick={() => setMenu("women")} to={'/women'}>Women</Link>{menu === "women" ? <hr /> : <></>}
          {showWomenDropdown && (
            <div className="dropdown-content-category">
              <a onClick={() => handleWomenDropdown("shirt")}>Shirts</a>
              <a onClick={() => handleWomenDropdown("jacket")}>Jackets</a>
              <a onClick={() => handleWomenDropdown("tshirt")}>T-shirts</a>
              <a onClick={() => handleWomenDropdown("sport")}>Sports Apparel</a>
              <a onClick={() => handleWomenDropdown("sweatshirt")}>Sweatshirts</a>
              <a onClick={() => handleWomenDropdown("trouser")}>Trousers</a>
              <a onClick={() => handleWomenDropdown("shoe")}>Shoes</a>
              {/* Add other product types */}
            </div>
          )}</li>

        <li onMouseEnter={() => setShowKidsDropdown(true)} 
          onMouseLeave={() => setShowKidsDropdown(false)} 
          className="dropdown-category"
        >
          <Link style={{textDecoration:'none'}}  onClick={() => setMenu("kids")} to={'/kids'}>Kids</Link>{menu === "kids" ? <hr /> : <></>}
          {showKidsDropdown && (
            <div className="dropdown-content-category">
              <a onClick={() => handleKidsDropdown("shirt")}>Shirts</a>
              <a onClick={() => handleKidsDropdown("jacket")}>Jackets</a>
              <a onClick={() => handleKidsDropdown("tshirt")}>T-shirts</a>
              <a onClick={() => handleKidsDropdown("sport")}>Sports Apparel</a>
              <a onClick={() => handleKidsDropdown("sweatshirt")}>Sweatshirts</a>
              <a onClick={() => handleKidsDropdown("trouser")}>Trousers</a>
              <a onClick={() => handleKidsDropdown("shoe")}>Shoes</a>
              {/* Add other product types */}
            </div>
          )} 
        </li>

      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
          ? <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button>
          : <Link to={'/login'}><button>Sign In</button></Link>}

        <Link to={'/cart'}><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>

      {localStorage.getItem('auth-token') &&
        <div className="nav-user-profile" id="userProfile">
          <img src={user_profile} alt="" />
          <div className="dropdown-content" id="dropdownContent">
           <Link style={{textDecoration:'none'}} to={'/MyAccount'}><div>My Account</div> </Link>
           <Link style={{textDecoration:'none'}} to={'/MyOrders'}><div>My Orders</div></Link>
           {/* <Link style={{textDecoration:'none'}} to={'/MyWishlist'}><div>My Wishlist</div> </Link> */}
           <Link style={{textDecoration:'none'}} to={'/ContactUs'}><div>Contact Us</div></Link>
           <Link style={{textDecoration:'none'}} to={'/DesignTshirt'}><div>Create</div></Link>
{/* 
            <a href="#">My Account</a>
            <a href="#">My Orders</a>
            <a href="#">My Wishlist</a>
            <a href="#">Contact Us</a> */}
          </div>
        </div>
      }

    </div>
  )
}

export default Navbar;
