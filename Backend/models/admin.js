const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define roles as constants for clarity and RBAC control
const rolesEnum = ['customer', 'staff', 'admin'];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Name is too short'],
    maxlength: [30, 'Name is too long'],
  },
  email: { 
    type: String, 
    unique: true, 
    required: true, 
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] 
  },
  password: { 
    type: String, 
    required: true, 
    minlength: [6, 'Password is too short'] 
  },
  role: { 
    type: String, 
    enum: rolesEnum, 
    default: 'customer', 
    required: true 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  lastLogin: { 
    type: Date 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

// Middleware: Hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash if password is new or modified
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method: Compare entered password with hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Function to check if user is an admin (useful for route-level RBAC)
userSchema.methods.isAdmin = function () {
  return this.role === 'admin';
};

// Function to check if user is staff (for managing orders)
userSchema.methods.isStaff = function () {
  return this.role === 'staff';
};

const User = mongoose.model('User', userSchema);

module.exports = User;
