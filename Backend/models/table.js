// Backend/models/table.js
const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  qrSlug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  activeSessionId: {
    type: String,
    default: null
  },
  isOccupied: {
    type: Boolean,
    default: false
  },
  capacity: {
    type: Number,
    default: 4
  },
  location: {
    type: String,
    default: ''
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
tableSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Table', tableSchema);
