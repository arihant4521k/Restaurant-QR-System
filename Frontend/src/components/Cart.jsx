import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = ({ onCheckout }) => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      
      <div className="space-y-4 mb-6">
        {cart.map((item, index) => (
          <div key={index} className="flex items-center gap-4 border-b pb-4">
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              {item.note && (
                <p className="text-sm text-gray-600">Note: {item.note}</p>
              )}
              <p className="text-orange-600 font-semibold">₹{item.price}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.menuItemId, item.note, item.quantity - 1)}
                className="bg-gray-200 px-2 py-1 rounded"
              >
                -
              </button>
              <span className="px-3">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.menuItemId, item.note, item.quantity + 1)}
                className="bg-gray-200 px-2 py-1 rounded"
              >
                +
              </button>
            </div>
            
            <button
              onClick={() => removeFromCart(item.menuItemId, item.note)}
              className="text-red-500 hover:text-red-700"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (5%):</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total:</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700"
      >
        Place Order
      </button>
    </div>
  );
};

export default Cart;
