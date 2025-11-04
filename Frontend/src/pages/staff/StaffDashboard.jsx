import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

export default function StaffDashboard() {
  const [servedCount, setServedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodayStats();
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadTodayStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadTodayStats = async () => {
    try {
      const response = await api.get('/orders/stats');
      if (response.data.success) {
        const stats = response.data.data.orderStats || [];
        
        // Find served orders count
        const servedStat = stats.find(stat => stat._id === 'served');
        setServedCount(servedStat ? servedStat.count : 0);
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4 text-center">Staff Dashboard</h1>
        <p className="text-gray-600 mb-8 text-center">
          Manage and update customer orders efficiently.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Today's Summary */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Today's Summary</h3>
            <p className="text-gray-600 mb-4">Quick overview of today's activity</p>
            {loading ? (
              <div className="text-xl text-gray-500">Loading...</div>
            ) : (
              <div className="text-2xl font-bold text-orange-600">
                {servedCount} Orders Served
              </div>
            )}
          </div>

          {/* Orders Queue Button */}
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Orders Queue</h3>
            <p className="text-gray-600 mb-4">View and manage incoming orders</p>
            <Link
              to="/staff/orders"
              className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 font-semibold transition-colors"
            >
              Go to Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}