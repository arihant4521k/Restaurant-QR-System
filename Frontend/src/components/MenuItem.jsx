import React, { useState } from 'react';

const MenuItem = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const [showNote, setShowNote] = useState(false);

  const handleAdd = () => {
    onAddToCart(item, quantity, note);
    setQuantity(1);
    setNote('');
    setShowNote(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {item.imageUrl && (
        <img
          src={`${import.meta.env.VITE_API_URL
            ?.replace('/api', '') || 'http://localhost:5000'}${item.imageUrl}`}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{item.description}</p>

        <div className="flex items-center gap-2 mb-3">
          {item.tags && item.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center mb-3">
          <span className="text-xl font-bold text-orange-600">
            ₹{item.price}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              -
            </button>
            <span className="px-3">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              +
            </button>
          </div>
        </div>

        {showNote ? (
          <div className="mb-3">
            <input
              type="text"
              placeholder="Add special instructions..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
        ) : (
          <button
            onClick={() => setShowNote(true)}
            className="text-sm text-blue-600 hover:underline mb-3 block"
          >
            + Add note
          </button>
        )}

        <button
          onClick={handleAdd}
          disabled={!item.availability}
          className={`w-full py-2 rounded font-semibold ${item.availability
              ? 'bg-orange-600 text-white hover:bg-orange-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          {item.availability ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
