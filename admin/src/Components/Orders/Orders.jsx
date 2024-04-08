import React, { useState, useEffect } from 'react';
import './Orders.css';
import cross_icon from '../../assets/cross_icon.png';

const Orders = () => {
  const [customOrders, setCustomOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:4000/all-orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setCustomOrders(data.customOrders);
        console.log(customOrders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className='list-order'>
      <h1>All Orders list</h1>
      <div className="listorder-format-main">
        <p>Order</p>
        <p>User Id: </p>
        <p>User Name: </p>
        <p>Order Id: </p>
        <p>Quantity: </p>
      </div>
      <div className="listorder-allorders-custom">
        <hr />
        {loading ? (
          <p>Loading...</p>
        ) : customOrders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          customOrders.map((order, index) => (
            <div key={index} className="listorder-format-main listorder-format">
            {/* Wrap the image inside a button */}
            <button onClick={() => {
  if (typeof order.productImage === 'string') {
    console.log("Product Image URL:", order.productImage);
    // Replacing backslashes with forward slashes
    const imageUrl = order.productImage.replace(/\\/g, '/');
    console.log("chnaged url:",imageUrl);
    if (imageUrl.includes('upload/custom/')) {
      const modifiedUrl = imageUrl.replace('upload/custom/', '');
      window.open(`http://localhost:4000/${modifiedUrl}`, "_blank");
    } else {
      console.error("Product image URL does not contain '/upload/custom/'");
    }
  } else {
    console.error("Invalid product image URL");
  }
}}>
  View Image
</button>
            <p>{order.userId}</p>
            <p>{order.userName}</p>
            <p>{order._id}</p>
            <p>{order.productQuantity}</p>
          </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
