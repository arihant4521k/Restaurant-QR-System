// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import { CartProvider } from './context/CartContext';
// import ProtectedRoute from './components/ProtectedRoute';

// // Home Page
// import HomePage from './pages/HomePage';

// // Customer Pages
// import MenuPage from './pages/customer/MenuPage';
// import OrderStatusPage from './pages/customer/OrderStatusPage';
// import OrderHistoryPage from './pages/customer/OrderHistoryPage';

// // Auth Pages
// import LoginPage from './pages/auth/LoginPage';
// import RegisterPage from './pages/auth/RegisterPage';

// // Staff Pages
// import StaffDashboard from './pages/staff/StaffDashboard';
// import OrdersQueue from './pages/staff/OrdersQueue';

// // Admin Pages
// import AdminDashboard from './pages/admin/AdminDashboard';
// import MenuManager from './pages/admin/MenuManager';
// import TableManager from './pages/admin/TableManager';
// import Analytics from './pages/admin/Analytics';

// import './App.css';

// function App() {
//   return (
//     <Router
//       future={{
//         v7_startTransition: true,
//         v7_relativeSplatPath: true,
//       }}
//     >
//       <AuthProvider>
//         <CartProvider>
//           <Routes>
//             {/* Home Page - Public */}
//             <Route path="/" element={<HomePage />} />
            
//             {/* Auth Routes - Public */}
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/register" element={<RegisterPage />} />
            
//             {/* Customer Routes - QR Code Access */}
//             <Route path="/m/:qrSlug" element={<MenuPage />} />
//             <Route path="/order-status/:orderId" element={<OrderStatusPage />} />
            
//             {/* Customer Protected Routes */}
//             <Route
//               path="/my-orders"
//               element={
//                 <ProtectedRoute allowedRoles={['customer', 'staff', 'admin']}>
//                   <OrderHistoryPage />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Staff Routes - Protected */}
//             <Route
//               path="/staff"
//               element={
//                 <ProtectedRoute allowedRoles={['staff', 'admin']}>
//                   <StaffDashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/staff/orders"
//               element={
//                 <ProtectedRoute allowedRoles={['staff', 'admin']}>
//                   <OrdersQueue />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Admin Routes - Protected */}
//             <Route
//               path="/admin"
//               element={
//                 <ProtectedRoute allowedRoles={['admin']}>
//                   <AdminDashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/admin/menu"
//               element={
//                 <ProtectedRoute allowedRoles={['admin']}>
//                   <MenuManager />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/admin/tables"
//               element={
//                 <ProtectedRoute allowedRoles={['admin']}>
//                   <TableManager />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/admin/analytics"
//               element={
//                 <ProtectedRoute allowedRoles={['admin']}>
//                   <Analytics />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Fallback Route */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </CartProvider>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';

// Home Page
import HomePage from './pages/HomePage';

// Customer Pages
import MenuPage from './pages/customer/MenuPage';
import OrderStatusPage from './pages/customer/OrderStatusPage';
import OrderHistoryPage from './pages/customer/OrderHistoryPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Staff Pages
import StaffDashboard from './pages/staff/StaffDashboard';
import OrdersQueue from './pages/staff/OrdersQueue';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import MenuManager from './pages/admin/MenuManager';
import TableManager from './pages/admin/TableManager';
import Analytics from './pages/admin/Analytics';

import './App.css';

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Home Page - Public */}
            <Route path="/" element={<HomePage />} />
            
            {/* Auth Routes - Public */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Customer Routes - QR Code Access (PUBLIC - NO LOGIN REQUIRED) */}
            <Route path="/m/:qrSlug" element={<MenuPage />} />
            <Route path="/order-status/:orderId" element={<OrderStatusPage />} /> {/* MADE PUBLIC */}
            
            {/* Customer Protected Routes - Login Required */}
            <Route
              path="/my-orders"
              element={
                <ProtectedRoute allowedRoles={['customer', 'staff', 'admin']}>
                  <OrderHistoryPage />
                </ProtectedRoute>
              }
            />

            {/* Staff Routes - Protected */}
            <Route
              path="/staff"
              element={
                <ProtectedRoute allowedRoles={['staff', 'admin']}>
                  <StaffDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/orders"
              element={
                <ProtectedRoute allowedRoles={['staff', 'admin']}>
                  <OrdersQueue />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes - Protected */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/menu"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <MenuManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/tables"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <TableManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Analytics />
                </ProtectedRoute>
              }
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
