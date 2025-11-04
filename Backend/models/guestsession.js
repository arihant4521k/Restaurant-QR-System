// Backend/models/guestSession.js
const mongoose = require('mongoose');

const guestSessionSchema = new mongoose.Schema({
  sessionToken: { 
    type: String, 
    required: true, 
    unique: true 
  },
  tableId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Table', 
    required: true 
  },
  cartItems: [
    {
      menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
      quantity: { type: Number, default: 1 },
      notes: { type: String }
    }
  ],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  expiresAt: { 
    type: Date, 
    required: true,
    default: () => Date.now() + 3600000 // 1 hour expiry
  }
});

// Auto-delete expired sessions
guestSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('GuestSession', guestSessionSchema);
