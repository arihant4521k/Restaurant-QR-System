import React from 'react';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-4">Menu Management</h3>
            <p className="text-gray-600 mb-6">Add, edit, and organize menu items and categories</p>
            <Link to="/admin/menu" className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700">
              Manage Menu
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-4">Table Management</h3>
            <p className="text-gray-600 mb-6">Create tables and generate QR codes</p>
            <Link to="/admin/tables" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Manage Tables
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-4">Analytics</h3>
            <p className="text-gray-600 mb-6">View reports and sales analytics</p>
            <Link to="/admin/analytics" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
              View Analytics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
