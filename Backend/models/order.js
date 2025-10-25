// Backend/models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Session token for guest customers
  sessionToken: { 
    type: String, 
    required: true 
  },

  // Table information
  tableId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Table', 
    required: true 
  },

  // Order items
  items: [
    {
      menuItemId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'MenuItem', 
        required: true 
      },
      quantity: { 
        type: Number, 
        required: true, 
        min: 1 
      },
      price: { 
        type: Number, 
        required: true 
      },
      notes: { 
        type: String, 
        default: '' 
      }
    }
  ],

  // Order status
  status: { 
    type: String, 
    enum: ['placed', 'preparing', 'ready', 'served', 'canceled'], 
    default: 'placed' 
  },

  // Totals
  subtotal: { 
    type: Number, 
    required: true 
  },
  tax: { 
    type: Number, 
    default: 0 
  },
  total: { 
    type: Number, 
    required: true 
  },

  // Timestamps
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the updatedAt field on save
orderSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Order', orderSchema);
