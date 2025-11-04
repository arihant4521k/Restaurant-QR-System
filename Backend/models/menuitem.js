// Backend/models/menuItem.js
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuCategory',
    required: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  availability: {
    type: Boolean,
    default: true
  },
  tags: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt on save
menuItemSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Index for search optimization
menuItemSchema.index({ name: 'text', tags: 'text' });

module.exports = mongoose.model('MenuItem', menuItemSchema);
