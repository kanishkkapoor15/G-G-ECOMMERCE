import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory for routing
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import PaymentModal from '../PaymentModal/PaymentModal';

const CartItems = () => {
  const { all_product, cartItems, removeFromCart, removeAllFromCart,getTotalCartAmount } = useContext(ShopContext);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [checkoutInitiated, setCheckoutInitiated] = useState(false); 
  const history = useNavigate(); // Initialize useHistory for routing

  const handleProceedToCheckout = () => {
    setShowPaymentModal(true);
    setCheckoutInitiated(true); 
  };

  const handlePaymentSelection = (paymentMode) => {
    setSelectedPayment(paymentMode);
    // You can perform any other necessary actions here, such as setting the selected payment mode to state
  };

  const handlePayNow = async () => {
    try {
      // Initialize user ID and email as empty strings
      const userId = 'default';
      const userEmail = 'default';
      const userName ='default';
      
      // Execute the API call to 'process-order' endpoint
      const orderData = {
        userId,
        userEmail,
        userName,
        modeOfPayment: selectedPayment,
        paymentStatus: 'Pending',
        totalAmount: getTotalCartAmount(),
        cartData: cartItems
      };
  
      // Mock API call
      const response = await fetch('http://localhost:4000/process-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify(orderData)
      });
  
      const data = await response.json();
      removeAllFromCart();
      console.log('Order processed successfully:', data);

      
      // Redirect the user to the 'ThankYou' page after successful order processing
      history('/ThankYou');
    } catch (error) {
      console.error('Error processing order:', error);
      // Handle errors if necessary
    }
  };
  
  
  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr/>
      {all_product.map((e)=>{
        if(cartItems[e.id]>0){
          return <div key={e.id}>
            <div className="cartitems-format cartitems-format-main">
              <img src={e.image} alt="" className='carticon-product-icon' />
              <p>{e.name}</p>
              {e.new_price ? <p>${e.new_price}</p> : <p>N/A</p>}
              <button className='cartitems-quantity'>{cartItems[e.id]}</button>
              {e.new_price ? <p>${e.new_price * cartItems[e.id]}</p> : <p>N/A</p>}
              <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
            </div>
            <hr />
          </div>
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          
          <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
          {showPaymentModal && <PaymentModal onClose={() => setShowPaymentModal(false)} onPaymentSelection={handlePaymentSelection} />}

          <div className="cartitems-process-payment">
          {checkoutInitiated && <button onClick={handlePayNow}>Pay Now</button>}
        </div>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, enter here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>


      </div>
    </div>
  )
}

export default CartItems
