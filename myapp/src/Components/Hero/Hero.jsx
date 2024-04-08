import React, { useState } from 'react';
import './Hero.css';
import hand_icon from '../Assets/heroleft2.gif';
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/hero3.png';
import { Link } from 'react-router-dom';
import arrow_left from '../Assets/arrow-left.svg';
import arrow_right from '../Assets/arrow-right.svg';
import hero_banner2 from '../Assets/hero-slider2.png';

const Hero = () => {
  const [activeSlider, setActiveSlider] = useState(2);

  const handleNextSlider = () => {
    
    setActiveSlider(activeSlider === 2 ? 1 : 2);
    
  };

  const handlePrevSlider = () => {
    setActiveSlider(activeSlider === 1 ? 2 : 1);
   
  };

  return (
    <div className='hero'>
      <div className={`hero-slider1 hero-slider${activeSlider === 1 ? '' : ' hidden'}`}>

        <div className="hero-arrow-left" onClick={handlePrevSlider}>
          <img src={arrow_left} alt="" />
        </div>

        <div className="hero-arrow-right" onClick={handleNextSlider}>
          <img  src={arrow_right} alt="" />
        </div>

        <div className="hero-left">
          <h2>Chic Elegant Styles</h2>
          <div>
            <div className="hero-hand-icon">
              <p>Seasonal</p>
              <img src={hand_icon} alt="" />
            </div>
            <p>Fits</p>
            <p>for you</p>
          </div>
          <div className="hero-latest-btn">
            <Link to='/SearchResults?value=men'><div className='hero-latest-btn-text'>View Collection</div></Link>
            <img src={arrow_icon} alt="" />
          </div>
        </div>
        <div className="hero-right">
          <img src={hero_image} alt="" />
        </div>

        
      </div>

      <div className={`hero-slider2 hero-slider${activeSlider === 2 ? '' : ' hidden'}`}>

      <div className="hero-arrow-left" onClick={handlePrevSlider}>
          <img src={arrow_left} alt="" />
        </div>

        <div className="hero-arrow-right" onClick={handleNextSlider}>
          <img src={arrow_right} alt="" />
        </div>
        

        <div className="hero-banner2">
        <img src={hero_banner2} alt="" />
        </div>

        

        
      </div>
    </div>
  );
};

export default Hero;
