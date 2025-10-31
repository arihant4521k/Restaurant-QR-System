import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import Navbar from '../../components/Navbar';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await api.get('/orders/me');
        if (res.data.success) setOrders(res.data.data);
      } catch (error) {
        console.error('Failed to load orders:', error);
      }
    };
    loadOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No orders found</p>
        ) : (
          orders.map(order => (
            <div key={order._id} className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex justify-between">
                <span>Order #{order._id.slice(-6)}</span>
                <span className="font-semibold">₹{order.total}</span>
              </div>
              <p className="text-sm text-gray-500 capitalize">{order.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
