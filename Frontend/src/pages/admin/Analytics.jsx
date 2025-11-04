import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import Navbar from '../../components/Navbar';

export default function Analytics() {
  const [stats, setStats] = useState({ topItems: [], orderStats: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await api.get('/orders/stats');
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="text-xl">Loading analytics...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Top Selling Items</h2>
            {stats.topItems && stats.topItems.length > 0 ? (
              stats.topItems.map((item, i) => (
                <div key={i} className="flex justify-between border-b py-2">
                  <span>{item.name}</span>
                  <span className="font-semibold">{item.totalQuantity} sold</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No data available</p>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {stats.orderStats && stats.orderStats.length > 0 ? (
              stats.orderStats.map((stat, i) => (
                <div key={i} className="flex justify-between border-b py-2">
                  <span className="capitalize">{stat._id}</span>
                  <span className="font-semibold">{stat.count} orders</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
