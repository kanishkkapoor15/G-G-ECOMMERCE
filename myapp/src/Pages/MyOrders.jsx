import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../Context/ShopContext'; // Import ShopContext
import './CSS/MyOrders.css'

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const { all_product } = useContext(ShopContext); // Use ShopContext to access all_product

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

                </div>
            )}
        </div>
    );
};

export default MyOrders;
