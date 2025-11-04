import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import Navbar from '../../components/Navbar';

const OrderStatusPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
    const interval = setInterval(loadOrder, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  const loadOrder = async () => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      if (response.data.success) {
        setOrder(response.data.data);
      }
    } catch (error) {
      console.error('Failed to load order:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusSteps = () => {
    const steps = ['placed', 'preparing', 'ready', 'served'];
    return steps;
  };

  const getStatusIndex = (status) => {
    return getStatusSteps().indexOf(status);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Order not found</div>
        </div>
      </div>
    );
  }

  const currentStatusIndex = getStatusIndex(order.status);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Order Status</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-gray-600">Order ID</p>
              <p className="font-semibold">#{order._id.slice(-8)}</p>
            </div>
            <div>
              <p className="text-gray-600">Table</p>
              <p className="font-semibold">Table {order.tableId.number}</p>
            </div>
            <div>
              <p className="text-gray-600">Total</p>
              <p className="font-semibold text-orange-600">₹{order.total.toFixed(2)}</p>
            </div>
          </div>

          <div className="relative pt-8 pb-4">
            <div className="flex justify-between mb-2">
              {getStatusSteps().map((step, index) => (
                <div key={step} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      index <= currentStatusIndex
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {index < currentStatusIndex ? '✓' : index + 1}
                  </div>
                  <p className="text-sm mt-2 capitalize">{step}</p>
                </div>
              ))}
            </div>
            
            <div className="absolute top-13 left-0 right-0 h-1 bg-gray-300" style={{ top: '2.5rem' }}>
              <div
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${(currentStatusIndex / (getStatusSteps().length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between border-b pb-4">
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  {item.note && (
                    <p className="text-sm text-gray-600">Note: {item.note}</p>
                  )}
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>₹{order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusPage;
