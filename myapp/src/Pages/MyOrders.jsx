import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../Context/ShopContext'; // Import ShopContext
import './CSS/MyOrders.css'

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const { all_product } = useContext(ShopContext); // Use ShopContext to access all_product'
    const [customOrders, setCustomOrders] = useState([]);

 

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('auth-token');
            if (!token) {
                console.error('No authentication token found.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:4000/user/orders', {
                    headers: {
                        'auth-token': token
                    }
                });

                setOrders(response.data);

               
            } catch (error) {
                console.error('Error fetching user orders:', error);
            }
            
        };

        fetchOrders();

        const fetchOrders2 = async () => {
            try {
              const response = await fetch('http://localhost:4000/all-orders');
              if (!response.ok) {
                throw new Error('Failed to fetch orders');
              }
              const data = await response.json();
              setCustomOrders(data.customOrders);
              console.log(customOrders);
            } catch (error) {
              console.error('Error fetching orders:', error);
              
            }
          };
          fetchOrders2();

    }, []);

    return (
        <div className='MyOrders'>
            <h1>My Orders<hr /></h1>
            
            
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className='MyOrders-products'>
                  
                    {/* Use all_product as an array */}
                    {all_product.map((product) => {
                      const orderedQuantity = orders.reduce((totalQuantity, order) => {
                          return totalQuantity + (order.cartData[product.id] || 0);
                      }, 0);
                  
                      if (orderedQuantity > 0) {
                                            return (
                              <div key={product.id}>
                                  <div className="product-info">
                                      <h2>{product.name}</h2>
                                      <p>{product.new_price}</p>
                                      <img src={product.image} alt=''/>
                                      <p><b>Ordered Quantity:</b> {orderedQuantity}</p>
                                      <p><b>Order Status:</b> Pending</p>

                                     
                                      {/* Add other product details here */}
                                  </div>
                              </div>
                          );
                      } else {
                          return null;
                      }
                  })}   


                    {customOrders.map((order, index) => (
            <div key={index} className="MyOrders-custom">
            {console.log("Modified productImage URL:", order.productImage.replace(/\\/g, '/').replace('upload/custom/', ''))}
            <img src={`http://localhost:4000/${order.productImage.replace(/\\/g, '/').replace('upload/custom/', '')}`} alt="" />
            <p><b>Product : </b>{order.productType}</p>
            <p><b>Quantity:</b> {order.productQuantity}{" "}<b>Size:</b>{order.productSize}</p>
            <p><b>Price:</b> {order.priceOffered}</p>
            <p><b>Name: </b>{order.userName}</p>
            <p><b>Order ID:</b> {order._id}</p>

            
        </div>
        
        
        
                      ))
                    }
                </div>
            )}
        </div>
    );
};

export default MyOrders;
