import React, { useState } from 'react';
import './PaymentModal.css';
import pay_img from '../Assets/paymentImg.png'

const PaymentModal = ({ onClose, onPaymentSelection }) => {
  const [selectedPayment, setSelectedPayment] = useState('');

  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
    // Pass the selected payment mode back to the parent component
    onPaymentSelection(paymentMethod);
  };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <h2>Select Payment Method</h2><img src={pay_img} alt="" />
        <ul>
          <li onClick={() => handlePaymentSelection('Cash On Delivery')}>
            <span className={selectedPayment === 'Cash On Delivery' ? 'selected' : 'unselected'}></span>
            <span>Cash On Delivery</span>
          </li>
          <li onClick={() => handlePaymentSelection('Net Banking')}>
            <span className={selectedPayment === 'Net Banking' ? 'selected' : 'unselected'}></span>
            <span>Net Banking</span>
          </li>
          <li onClick={() => handlePaymentSelection('Debit/Credit Card')}>
            <span className={selectedPayment === 'Debit/Credit Card' ? 'selected' : 'unselected'}></span>
            <span>Debit/Credit Card</span>
          </li>
          <li onClick={() => handlePaymentSelection('UPI')}>
            <span className={selectedPayment === 'UPI' ? 'selected' : 'unselected'}></span>
            <span>UPI</span>
          </li>
        </ul>
        {/* No "Pay Now" button */}
        
      </div>
    </div>
  );
};

export default PaymentModal;
