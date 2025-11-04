import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import Navbar from '../../components/Navbar';

const TableManager = () => {
  const [tables, setTables] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tableNumber, setTableNumber] = useState('');
  const [qrModalData, setQrModalData] = useState(null);

  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = async () => {
    try {
      const response = await api.get('/tables');
      if (response.data.success) {
        setTables(response.data.data);
      }
    } catch (error) {
      console.error('Failed to load tables:', error);
    }
  };

  const handleCreateTable = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tables', { number: parseInt(tableNumber) });
      loadTables();
      setShowModal(false);
      setTableNumber('');
    } catch (error) {
      console.error('Failed to create table:', error);
      alert('Failed to create table');
    }
  };

  const handleGenerateQR = async (tableId) => {
    try {
      const response = await api.get(`/tables/${tableId}/qr`);
      if (response.data.success) {
        setQrModalData(response.data.data);
      }
    } catch (error) {
      console.error('Failed to generate QR:', error);
    }
  };

  const handleDownloadQR = () => {
    if (!qrModalData) return;
    
    const link = document.createElement('a');
    link.href = qrModalData.qrCode;
    link.download = `table-${qrModalData.table.number}-qr.png`;
    link.click();
  };

  const handleDeleteTable = async (tableId) => {
    if (window.confirm('Are you sure you want to delete this table?')) {
      try {
        await api.delete(`/tables/${tableId}`);
        loadTables();
      } catch (error) {
        console.error('Failed to delete table:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Table Manager</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          >
            + Add Table
          </button>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tables.map((table) => (
            <div key={table._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Table {table.number}</h3>
                  <span className={`inline-block px-2 py-1 rounded text-sm mt-2 ${
                    table.status === 'available'
                      ? 'bg-green-100 text-green-800'
                      : table.status === 'occupied'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {table.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => handleGenerateQR(table._id)}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Generate QR
                </button>
                <button
                  onClick={() => handleDeleteTable(table._id)}
                  className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Add New Table</h2>
            
            <form onSubmit={handleCreateTable} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Table Number</label>
                <input
                  type="number"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  required
                  min="1"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setTableNumber('');
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {qrModalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-4">
              Table {qrModalData.table.number} QR Code
            </h2>
            
            <img
              src={qrModalData.qrCode}
              alt="QR Code"
              className="mx-auto mb-4"
            />
            
            <p className="text-sm text-gray-600 mb-4 break-all">
              {qrModalData.url}
            </p>

            <div className="flex gap-4">
              <button
                onClick={handleDownloadQR}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Download QR
              </button>
              <button
                onClick={() => setQrModalData(null)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableManager;
