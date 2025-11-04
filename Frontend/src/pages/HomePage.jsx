// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../utils/api';

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [tableCode, setTableCode] = useState('');
//   const [showQRInput, setShowQRInput] = useState(false);
//   const [error, setError] = useState('');
//   const [validating, setValidating] = useState(false);

//   const handleStaffLogin = () => {
//     navigate('/login?role=staff');
//   };

//   const handleAdminLogin = () => {
//     navigate('/login?role=admin');
//   };

//   const handleTableCodeSubmit = async (e) => {
//   e.preventDefault();
//   setError('');
  
//   if (!tableCode.trim()) {
//     setError('Please enter a table code');
//     return;
//   }
  
//   setValidating(true);
  
//   try {
//     // THIS IS THE VALIDATION - Only admin-created tables will pass
//     const response = await api.get(`/tables/by-slug/${tableCode.trim()}`);
    
//     if (response.data.success) {
//       // Table exists in database (created by admin) ✅
//       navigate(`/m/${tableCode.trim()}`);
//     } else {
//       // Table not found ❌
//       setError('Invalid table code. Please check and try again.');
//     }
//   } catch (err) {
//     // Error: table doesn't exist in database ❌
//     setError(
//       err.response?.data?.message || 
//       'Invalid table code. Please check the code on your table and try again.'
//     );
//   } finally {
//     setValidating(false);
//   }
// };


//   const handleScanQR = () => {
//     setShowQRInput(!showQRInput);
//     setError(''); // Clear error when toggling
//     setTableCode(''); // Clear input when toggling
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
//       {/* Navigation Bar */}
//       <nav className="bg-white shadow-md">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//           <div className="flex items-center">
//             <span className="text-3xl font-bold text-orange-600">🍽️ Scan & Dine</span>
//           </div>
//           <div className="flex gap-4">
//             <button
//               onClick={() => navigate('/login')}
//               className="px-6 py-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors"
//             >
//               Login
//             </button>
//             <button
//               onClick={() => navigate('/register')}
//               className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-colors"
//             >
//               Register
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="container mx-auto px-6 py-20">
//         <div className="text-center max-w-4xl mx-auto">
//           <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
//             Welcome to Scan & Dine Lite
//           </h1>
//           <p className="text-xl text-gray-600 mb-12">
//             Smart dining experience with QR code ordering
//           </p>

//           {/* Feature Cards */}
//           <div className="grid md:grid-cols-3 gap-8 mb-12">
//             {/* Customer Card - WITH VALIDATION */}
//             <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
//               <div className="text-5xl mb-4">👤</div>
//               <h3 className="text-2xl font-bold text-gray-800 mb-3">Customers</h3>
//               <p className="text-gray-600 mb-6">
//                 Scan table QR code to browse menu and place orders instantly
//               </p>

//               {/* QR Scanner / Manual Entry Section */}
//               <div className="mb-6">
//                 <button
//                   onClick={handleScanQR}
//                   className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-colors mb-3"
//                 >
//                   📱 {showQRInput ? 'Hide' : 'Enter Table Code'}
//                 </button>

//                 {showQRInput && (
//                   <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
//                     <form onSubmit={handleTableCodeSubmit}>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Enter Table Code or QR Link
//                       </label>
//                       <input
//                         type="text"
//                         value={tableCode}
//                         onChange={(e) => setTableCode(e.target.value)}
//                         placeholder="e.g., table-1"
//                         disabled={validating}
//                         className="w-full border rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
//                       />
                      
//                       {error && (
//                         <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-3 text-sm">
//                           {error}
//                         </div>
//                       )}
                      
//                       <button
//                         type="submit"
//                         disabled={validating}
//                         className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//                       >
//                         {validating ? (
//                           <span className="flex items-center justify-center">
//                             <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                             </svg>
//                             Validating...
//                           </span>
//                         ) : (
//                           'View Menu'
//                         )}
//                       </button>
//                     </form>
//                     <p className="text-xs text-gray-600 mt-3 text-center">
//                       💡 Table code is usually printed on your table
//                     </p>
//                   </div>
//                 )}
//               </div>

//               <div className="bg-orange-100 rounded-lg p-4 mb-4">
//                 <p className="text-sm font-semibold text-orange-800 mb-2">Activities:</p>
//                 <ul className="text-xs text-orange-700 space-y-1 text-left">
//                   <li>• Scan QR code to access menu</li>
//                   <li>• Browse food items with images</li>
//                   <li>• Add items to cart</li>
//                   <li>• Place orders directly</li>
//                   <li>• Track order status real-time</li>
//                   <li>• View order history</li>
//                 </ul>
//               </div>
              
//               <div className="bg-orange-100 rounded-lg p-4 text-orange-800 text-sm">
//                 📱 Scan QR code on your table to start
//               </div>
//             </div>

//             {/* Staff Card */}
//             <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
//               <div className="text-5xl mb-4">👨‍🍳</div>
//               <h3 className="text-2xl font-bold text-gray-800 mb-3">Staff</h3>
//               <p className="text-gray-600 mb-4">
//                 Manage orders, update order status, and serve customers efficiently
//               </p>
//               <div className="bg-blue-100 rounded-lg p-4 mb-6">
//                 <p className="text-sm font-semibold text-blue-800 mb-2">Activities:</p>
//                 <ul className="text-xs text-blue-700 space-y-1 text-left">
//                   <li>• View all incoming orders</li>
//                   <li>• Update order status (Pending → Preparing → Ready → Served)</li>
//                   <li>• Manage order queue</li>
//                   <li>• View table-wise orders</li>
//                   <li>• Mark orders as completed</li>
//                   <li>• Handle customer requests</li>
//                 </ul>
//               </div>
//               <button
//                 onClick={handleStaffLogin}
//                 className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
//               >
//                 Staff Login
//               </button>
//             </div>

//             {/* Admin Card */}
//             <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
//               <div className="text-5xl mb-4">👨‍💼</div>
//               <h3 className="text-2xl font-bold text-gray-800 mb-3">Admin</h3>
//               <p className="text-gray-600 mb-4">
//                 Full control over menu, tables, staff, and analytics
//               </p>
//               <div className="bg-green-100 rounded-lg p-4 mb-6">
//                 <p className="text-sm font-semibold text-green-800 mb-2">Activities:</p>
//                 <ul className="text-xs text-green-700 space-y-1 text-left">
//                   <li>• Manage menu items & categories</li>
//                   <li>• Upload food images & prices</li>
//                   <li>• Create & manage tables</li>
//                   <li>• Generate QR codes for tables</li>
//                   <li>• View sales analytics & reports</li>
//                   <li>• Manage staff accounts</li>
//                   <li>• Monitor all orders</li>
//                 </ul>
//               </div>
//               <button
//                 onClick={handleAdminLogin}
//                 className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-colors"
//               >
//                 Admin Login
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* How It Works Section */}
//       <div className="bg-white py-16">
//         <div className="container mx-auto px-6">
//           <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
//             How It Works for Customers
//           </h2>
//           <p className="text-center text-gray-600 mb-12">Simple steps to order your food</p>
          
//           <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
//             <div className="text-center">
//               <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl font-bold text-orange-600">1</span>
//               </div>
//               <h3 className="text-lg font-bold text-gray-800 mb-2">Find Your Table</h3>
//               <p className="text-gray-600 text-sm">
//                 Locate the table number or QR code on your table
//               </p>
//             </div>
            
//             <div className="text-center">
//               <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl font-bold text-orange-600">2</span>
//               </div>
//               <h3 className="text-lg font-bold text-gray-800 mb-2">Scan or Enter Code</h3>
//               <p className="text-gray-600 text-sm">
//                 Scan QR code or manually enter the table code above
//               </p>
//             </div>
            
//             <div className="text-center">
//               <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl font-bold text-orange-600">3</span>
//               </div>
//               <h3 className="text-lg font-bold text-gray-800 mb-2">Browse & Order</h3>
//               <p className="text-gray-600 text-sm">
//                 View menu, add items to cart, and place your order
//               </p>
//             </div>
            
//             <div className="text-center">
//               <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl font-bold text-orange-600">4</span>
//               </div>
//               <h3 className="text-lg font-bold text-gray-800 mb-2">Track & Enjoy</h3>
//               <p className="text-gray-600 text-sm">
//                 Track your order status and enjoy your meal
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="bg-gray-100 py-16">
//         <div className="container mx-auto px-6">
//           <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
//             Why Choose Scan & Dine?
//           </h2>
//           <div className="grid md:grid-cols-4 gap-8">
//             <div className="text-center">
//               <div className="text-4xl mb-4">⚡</div>
//               <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Ordering</h3>
//               <p className="text-gray-600">
//                 Quick and easy ordering with QR code scanning
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl mb-4">📋</div>
//               <h3 className="text-xl font-bold text-gray-800 mb-2">Digital Menu</h3>
//               <p className="text-gray-600">
//                 Browse full menu with images and descriptions
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl mb-4">🔔</div>
//               <h3 className="text-xl font-bold text-gray-800 mb-2">Real-time Updates</h3>
//               <p className="text-gray-600">
//                 Track your order status in real-time
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl mb-4">💳</div>
//               <h3 className="text-xl font-bold text-gray-800 mb-2">Contactless</h3>
//               <p className="text-gray-600">
//                 Safe and hygienic contactless ordering
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-8">
//         <div className="container mx-auto px-6 text-center">
//           <p className="text-lg mb-2">🍽️ Scan & Dine Lite</p>
//           <p className="text-gray-400">
//             Smart dining experience for modern restaurants
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const HomePage = () => {
  const navigate = useNavigate();
  const [tableCode, setTableCode] = useState('');
  const [showQRInput, setShowQRInput] = useState(false);
  const [error, setError] = useState('');
  const [validating, setValidating] = useState(false);

  const handleStaffLogin = () => {
    navigate('/login?role=staff');
  };

  const handleAdminLogin = () => {
    navigate('/login?role=admin');
  };

  const handleTableCodeSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!tableCode.trim()) {
      setError('Please enter a table code or QR link');
      return;
    }
    
    // Extract table code from full URL or use direct code
    let extractedCode = tableCode.trim();
    
    // Check if user entered a full URL (like http://localhost:3000/m/table-1)
    if (extractedCode.includes('/m/')) {
      // Extract the part after /m/
      const parts = extractedCode.split('/m/');
      extractedCode = parts[parts.length - 1];
    } else if (extractedCode.includes('m/')) {
      // Handle case without http:// (like localhost:3000/m/table-1)
      const parts = extractedCode.split('m/');
      extractedCode = parts[parts.length - 1];
    }
    
    // Remove any trailing slashes or query parameters
    extractedCode = extractedCode.split('?')[0].split('/')[0];
    
    if (!extractedCode) {
      setError('Invalid table code or QR link format');
      return;
    }
    
    // Validate table code with backend before navigating
    setValidating(true);
    
    try {
      const response = await api.get(`/tables/by-slug/${extractedCode}`);
      
      if (response.data.success) {
        // Table is valid - navigate to menu
        navigate(`/m/${extractedCode}`);
      } else {
        setError('Invalid table code. Please check and try again.');
      }
    } catch (err) {
      console.error('Table validation error:', err);
      setError(
        err.response?.data?.message || 
        'Invalid table code or QR link. Please check and try again.'
      );
    } finally {
      setValidating(false);
    }
  };

  const handleScanQR = () => {
    setShowQRInput(!showQRInput);
    setError('');
    setTableCode('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-3xl font-bold text-orange-600">🍽️ Scan & Dine</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-colors"
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Welcome to Scan & Dine Lite
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Smart dining experience with QR code ordering
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Customer Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">👤</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Customers</h3>
              <p className="text-gray-600 mb-6">
                Scan table QR code to browse menu and place orders instantly
              </p>

              {/* QR Scanner / Manual Entry Section */}
              <div className="mb-6">
                <button
                  onClick={handleScanQR}
                  className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-colors mb-3"
                >
                  📱 {showQRInput ? 'Hide' : 'Enter Table Code'}
                </button>

                {showQRInput && (
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <form onSubmit={handleTableCodeSubmit}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter Table Code or Paste QR Link
                      </label>
                      
                      {/* Instructions */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                        <p className="text-xs text-blue-800 mb-2">
                          <strong>You can enter either:</strong>
                        </p>
                        <ul className="text-xs text-blue-700 space-y-1">
                          <li>✓ Table code: <code className="bg-blue-100 px-1 rounded">table-1</code></li>
                          <li>✓ Full QR link: <code className="bg-blue-100 px-1 rounded">http://localhost:3000/m/table-1</code></li>
                          <li>✓ Both formats work!</li>
                        </ul>
                      </div>

                      <input
                        type="text"
                        value={tableCode}
                        onChange={(e) => setTableCode(e.target.value)}
                        placeholder="table-1 or http://localhost:3000/m/table-1"
                        disabled={validating}
                        className="w-full border rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100 text-sm"
                      />
                      
                      {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-3 text-sm">
                          {error}
                        </div>
                      )}
                      
                      <button
                        type="submit"
                        disabled={validating}
                        className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                      >
                        {validating ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Validating...
                          </span>
                        ) : (
                          'View Menu'
                        )}
                      </button>
                    </form>
                    <p className="text-xs text-gray-600 mt-3 text-center">
                      💡 Copy and paste the QR link generated by admin
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-orange-100 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-orange-800 mb-2">Activities:</p>
                <ul className="text-xs text-orange-700 space-y-1 text-left">
                  <li>• Scan QR code to access menu</li>
                  <li>• Browse food items with images</li>
                  <li>• Add items to cart</li>
                  <li>• Place orders directly</li>
                  <li>• Track order status real-time</li>
                  <li>• View order history</li>
                </ul>
              </div>
              
              <div className="bg-orange-100 rounded-lg p-4 text-orange-800 text-sm">
                📱 Scan QR code on your table to start
              </div>
            </div>

            {/* Staff Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">👨‍🍳</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Staff</h3>
              <p className="text-gray-600 mb-4">
                Manage orders, update order status, and serve customers efficiently
              </p>
              <div className="bg-blue-100 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-blue-800 mb-2">Activities:</p>
                <ul className="text-xs text-blue-700 space-y-1 text-left">
                  <li>• View all incoming orders</li>
                  <li>• Update order status (Pending → Preparing → Ready → Served)</li>
                  <li>• Manage order queue</li>
                  <li>• View table-wise orders</li>
                  <li>• Mark orders as completed</li>
                  <li>• Handle customer requests</li>
                </ul>
              </div>
              <button
                onClick={handleStaffLogin}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
              >
                Staff Login
              </button>
            </div>

            {/* Admin Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">👨‍💼</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Admin</h3>
              <p className="text-gray-600 mb-4">
                Full control over menu, tables, staff, and analytics
              </p>
              <div className="bg-green-100 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-green-800 mb-2">Activities:</p>
                <ul className="text-xs text-green-700 space-y-1 text-left">
                  <li>• Manage menu items & categories</li>
                  <li>• Upload food images & prices</li>
                  <li>• Create & manage tables</li>
                  <li>• Generate QR codes for tables</li>
                  <li>• View sales analytics & reports</li>
                  <li>• Manage staff accounts</li>
                  <li>• Monitor all orders</li>
                </ul>
              </div>
              <button
                onClick={handleAdminLogin}
                className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-colors"
              >
                Admin Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            How It Works for Customers
          </h2>
          <p className="text-center text-gray-600 mb-12">Simple steps to order your food</p>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Get QR Link</h3>
              <p className="text-gray-600 text-sm">
                Admin generates QR code/link for your table
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Scan or Paste</h3>
              <p className="text-gray-600 text-sm">
                Scan QR code or paste the link above
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Browse & Order</h3>
              <p className="text-gray-600 text-sm">
                View menu, add items to cart, and place your order
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Track & Enjoy</h3>
              <p className="text-gray-600 text-sm">
                Track your order status and enjoy your meal
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose Scan & Dine?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Ordering</h3>
              <p className="text-gray-600">
                Quick and easy ordering with QR code scanning
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Digital Menu</h3>
              <p className="text-gray-600">
                Browse full menu with images and descriptions
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔔</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Real-time Updates</h3>
              <p className="text-gray-600">
                Track your order status in real-time
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Contactless</h3>
              <p className="text-gray-600">
                Safe and hygienic contactless ordering
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg mb-2">🍽️ Scan & Dine Lite</p>
          <p className="text-gray-400">
            Smart dining experience for modern restaurants
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
