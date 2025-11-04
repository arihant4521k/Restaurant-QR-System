const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const staffSchema = new mongoose.Schema({
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
    default: 'staff',      // fixed role for staff model
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

  // Optional assigned zone for staff - e.g., floor or section of the restaurant
  assignedZone: { 
    type: String, 
    default: null 
  }
});

// Hash password before saving
staffSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Password comparison method
staffSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to check role (always staff for this schema)
staffSchema.methods.isStaff = function () {
  return this.role === 'staff';
};

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
