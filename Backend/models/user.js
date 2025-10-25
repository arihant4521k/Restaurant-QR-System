const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Name is too short'],
    maxlength: [30, 'Name is too long'],
  },
  email: { type: String, unqiue: true, required: true },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password is too short'],
  },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now() },
});

userSchema.pre('save', async function (next) {
  console.log(this);
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;
