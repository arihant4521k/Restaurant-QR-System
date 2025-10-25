const User = require('./../models/admin.js');

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    if (users.length <= 0) {
      const error = new Error('No users found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: 'success',
      data: users,
      length: users.length,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: 'failed',
      data: error.message,
    });
  }
};

// Get single user by ID
exports.getAUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select('-password');
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: 'success',
      data: user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: 'failed',
      data: error.message,
    });
  }
};

// Create new user (admin can create any role)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, isActive } = req.body;

    // Validation
    if (!name || !email || !password) {
      const error = new Error('name, email, and password are required');
      error.statusCode = 400;
      throw error;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('User with this email already exists');
      error.statusCode = 400;
      throw error;
    }

    // Create new user
    const user = new User({ name, email, password, role, isActive });
    const savedUser = await user.save();

    // Remove password from response
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: 'User created successfully',
      data: userResponse,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: 'failed',
      data: error.message,
    });
  }
};

// Delete user by ID
exports.deleteAUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error('User ID is required');
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: 'User deleted successfully',
      data: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: 'failed',
      data: error.message,
    });
  }
};

// Update user (PUT - replace all fields)
exports.updateAUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, isActive } = req.body;

    if (!id) {
      const error = new Error('User ID is required');
      error.statusCode = 400;
      throw error;
    }

    if (!name || !email || !role) {
      const error = new Error('name, email, and role are required for PUT');
      error.statusCode = 400;
      throw error;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, role, isActive },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: 'User updated successfully (PUT)',
      data: updatedUser,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: 'failed',
      data: error.message,
    });
  }
};

// Patch user (PATCH - partial update)
exports.patchAUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    if (!id) {
      const error = new Error('User ID is required');
      error.statusCode = 400;
      throw error;
    }

    if (!updateFields || Object.keys(updateFields).length === 0) {
      const error = new Error('No fields provided for update');
      error.statusCode = 400;
      throw error;
    }

    // Don't allow direct password update via patch (should have separate endpoint)
    if (updateFields.password) {
      delete updateFields.password;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: 'User updated successfully (PATCH)',
      data: updatedUser,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: 'failed',
      data: error.message,
    });
  }
};

// Get users by role (filter by customer, staff, admin)
exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;

    if (!['customer', 'staff', 'admin'].includes(role)) {
      const error = new Error('Invalid role. Must be customer, staff, or admin');
      error.statusCode = 400;
      throw error;
    }

    const users = await User.find({ role }).select('-password');

    res.status(200).json({
      message: 'success',
      data: users,
      count: users.length,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: 'failed',
      data: error.message,
    });
  }
};

// Toggle user active status
exports.toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      data: { id: user._id, isActive: user.isActive },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: 'failed',
      data: error.message,
    });
  }
};
