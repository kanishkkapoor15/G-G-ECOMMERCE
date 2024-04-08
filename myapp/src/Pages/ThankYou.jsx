import React from 'react'
import './CSS/ThankYous.css'
import tick from '../Components/Assets/tick.gif'

const ThankYou = () => {
  return (
    <div className='ThankYou'>
      <div className="ThankYou-first">
       <img src={tick} alt="" /><h1>Thank you for purchasing</h1>
      </div>
      <div className='ThankYou-second'><h2>Your order is being processed</h2></div>
       
      
      
    </div>
  )
}

export default ThankYou
