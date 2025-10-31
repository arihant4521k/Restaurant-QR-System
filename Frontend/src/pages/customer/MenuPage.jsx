import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";  // CHANGED from ../../../utils/api
import { useCart } from "../../context/CartContext";  // CHANGED from ../../../context/CartContext
import Navbar from "../../components/Navbar";  // CHANGED from ../../../components/Navbar
import MenuItem from "../../components/MenuItem";  // CHANGED from ../../../components/MenuItem
import Cart from "../../components/Cart";  // CHANGED from ../../../components/Cart



const MenuPage = () => {
  const params = useParams();
  const qrSlug = params.qrSlug;
  const navigate = useNavigate();
  const { cart, setTable, addToCart, tableNumber, tableId } = useCart();
  
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    console.log('QR Slug from params:', qrSlug); // Debug log
    if (qrSlug) {
      loadTableData();
      loadCategories();
      loadMenuItems();
    }
  }, [qrSlug]);

  const loadTableData = async () => {
    try {
      console.log('Fetching table with slug:', qrSlug); // Debug log
      const response = await api.get(`/tables/by-slug/${qrSlug}`);
      if (response.data.success) {
        const table = response.data.data;
        setTable(table._id, table.number);
      }
    } catch (error) {
      console.error('Failed to load table:', error);
      alert('Invalid QR code. Please scan a valid table QR code.');
    }
  };

  const loadCategories = async () => {
    try {
      const response = await api.get('/menu/categories');
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const loadMenuItems = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory) params.append('category', selectedCategory);
      if (searchQuery) params.append('search', searchQuery);
      params.append('availability', 'true');
      
      const response = await api.get(`/menu/items?${params}`);
      if (response.data.success) {
        setItems(response.data.data.items);
      }
    } catch (error) {
      console.error('Failed to load menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (qrSlug) {
      loadMenuItems();
    }
  }, [selectedCategory, searchQuery]);

  const handleAddToCart = (item, quantity, note) => {
    addToCart(item, quantity, note);
  };

  const handleCheckout = async () => {
    if (!tableId) {
      alert('Table information is missing. Please scan the QR code again.');
      return;
    }

    try {
      const orderData = {
        tableId,
        items: cart.map(item => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          note: item.note,
        })),
      };

      const response = await api.post('/orders', orderData);
      if (response.data.success) {
        const orderId = response.data.data._id;
        navigate(`/order-status/${orderId}`);
      }
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  // if (!qrSlug) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <h1 className="text-2xl font-bold mb-4">Invalid Access</h1>
  //         <p className="text-gray-600">Please scan a valid table QR code</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showCart={showCart} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Table Info */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            Welcome to Table {tableNumber || '...'}
          </h1>
          <p className="text-gray-600">Browse our menu and place your order</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto mb-6 pb-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              !selectedCategory
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-700'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category._id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category._id
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : items.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No items found
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {items.map((item) => (
                  <MenuItem
                    key={item._id}
                    item={item}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Cart Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-4">
              <Cart onCheckout={handleCheckout} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cart Button */}
      <button
        onClick={() => setShowCart(!showCart)}
        className="md:hidden fixed bottom-4 right-4 bg-orange-600 text-white p-4 rounded-full shadow-lg"
      >
        🛒
      </button>
    </div>
  );
};

export default MenuPage;
