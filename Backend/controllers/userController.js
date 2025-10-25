const User = require('./../models/user.js')

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      if (users.length <= 0) {
        //   res.status(404).json({ message: 'No user found' });
        const error = new Error('No user found');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: 'success',
        data: users,
        length: users.length,
      });
    } catch (error) {
      res.status(error.statusCode).json({
        message: 'failed',
        data: error.message,
    });
  }
}

exports.createUsers = async (req, res) => {
  try {
    const { name, age, email, isActive } = req.body;

    // Validation
    if (!name || !age || !email) {
      const error = new Error('name, age, and email are required');
      error.statusCode = 400;
      throw error;
    }

    // Create new user
    const user = new User({ name, age, email, isActive });
    const savedUser = await user.save();

    // Success response
    res.status(201).json({
      message: 'User created successfully',
      data: savedUser,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: 'failed',
      data: error.message,
    });
  }
};

exports.getAUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await User.findById(id);
    // console.log(user);
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      data: error.message,
    });
  }
};


exports.deleteAUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check for missing ID
    if (!id) {
      const error = new Error('User ID is required');
      error.statusCode = 400;
      throw error;
    }

    // Try deleting the user
    const user = await User.findByIdAndDelete(id);

    // If user not found
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    // Success
    res.status(200).json({
      message: 'User deleted successfully',
      data: user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: 'failed',
      data: error.message,
    });
  }
};


exports.updateAUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email, isActive } = req.body;

    // Validation: ensure ID is provided
    if (!id) {
      const error = new Error('User ID is required');
      error.statusCode = 400;
      throw error;
    }

    // Validation: ensure all required fields are given (for PUT)
    if (!name || !age || !email) {
      const error = new Error('name, age, and email are required for PUT');
      error.statusCode = 400;
      throw error;
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, age, email, isActive },
      { new: true, runValidators: true }
    );

    // If no user found
    if (!updatedUser) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    // Success
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



exports.patchAUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    // Validation
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

    // Update user partially
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

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