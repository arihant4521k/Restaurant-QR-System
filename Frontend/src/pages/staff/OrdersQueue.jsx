import React, { useState, useEffect, useRef } from 'react';
import api from '../../utils/api';
import Navbar from '../../components/Navbar';

const OrdersQueue = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null);
  const [lastOrderCount, setLastOrderCount] = useState(0);

  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, 3000);
    return () => clearInterval(interval);
  }, [filter]);

  const loadOrders = async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') {
        params.append('status', filter);
      }

      const response = await api.get(`/orders?${params}`);
      if (response.data.success) {
        const newOrders = response.data.data.orders;
        
        const placedOrders = newOrders.filter(o => o.status === 'placed');
        if (placedOrders.length > lastOrderCount) {
          playNotification();
        }
        setLastOrderCount(placedOrders.length);
        
        setOrders(newOrders);
      }
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const playNotification = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await api.patch(`/orders/${orderId}/status`, {
        status: newStatus
      });
      
      if (response.data.success) {
        loadOrders();
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      placed: 'bg-yellow-100 text-yellow-800',
      preparing: 'bg-blue-100 text-blue-800',
      ready: 'bg-green-100 text-green-800',
      served: 'bg-gray-100 text-gray-800',
      canceled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getNextStatus = (currentStatus) => {
    const flow = {
      placed: 'preparing',
      preparing: 'ready',
      ready: 'served'
    };
    return flow[currentStatus];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <audio ref={audioRef} src="/notification.mp3" />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Orders Queue</h1>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['all', 'placed', 'preparing', 'ready', 'served'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap capitalize ${
                filter === status
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No orders found</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Order #{order._id.slice(-8)}</p>
                    <p className="font-semibold">Table {order.tableId.number}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.quantity}x {item.name}
                        {item.note && (
                          <span className="text-gray-500 block text-xs">
                            Note: {item.note}
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold mb-4">
                    <span>Total:</span>
                    <span>₹{order.total.toFixed(2)}</span>
                  </div>

                  <div className="flex gap-2">
                    {getNextStatus(order.status) && (
                      <button
                        onClick={() => updateStatus(order._id, getNextStatus(order.status))}
                        className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
                      >
                        Mark as {getNextStatus(order.status)}
                      </button>
                    )}
                    
                    {order.status !== 'canceled' && order.status !== 'served' && (
                      <button
                        onClick={() => updateStatus(order._id, 'canceled')}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersQueue;
