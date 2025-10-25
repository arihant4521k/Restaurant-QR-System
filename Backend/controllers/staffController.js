const Staff = require('./../models/staff.js');

// Get all staff members
exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find().select('-password');
    if (staff.length <= 0) {
      const error = new Error('No staff members found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: 'success',
      data: staff,
      length: staff.length,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: 'failed',
      data: error.message,
    });
  }
};

// Get single staff member by ID
exports.getAStaff = async (req, res) => {
  try {
    const id = req.params.id;
    const staff = await Staff.findById(id).select('-password');
    if (!staff) {
      const error = new Error('Staff member not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: 'success',
      data: staff,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: 'failed',
      data: error.message,
    });
  }
};

// Create new staff member
exports.createStaff = async (req, res) => {
  try {
    const { name, email, password, assignedZone, isActive } = req.body;

    // Validation
    if (!name || !email || !password) {
      const error = new Error('name, email, and password are required');
      error.statusCode = 400;
      throw error;
    }

    // Check if staff already exists
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      const error = new Error('Staff member with this email already exists');
      error.statusCode = 400;
      throw error;
    }

    // Create new staff
    const staff = new Staff({ name, email, password, assignedZone, isActive });
    const savedStaff = await staff.save();

    // Remove password from response
    const staffResponse = savedStaff.toObject();
    delete staffResponse.password;

    res.status(201).json({
      message: 'Staff member created successfully',
      data: staffResponse,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: 'failed',
      data: error.message,
    });
  }
};

// Delete staff member by ID
exports.deleteAStaff = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error('Staff ID is required');
      error.statusCode = 400;
      throw error;
    }

    const staff = await Staff.findByIdAndDelete(id);

    if (!staff) {
      const error = new Error('Staff member not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: 'Staff member deleted successfully',
      data: { id: staff._id, name: staff.name, email: staff.email },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: 'failed',
      data: error.message,
    });
  }
};

// Update staff (PUT - replace all fields)
exports.updateAStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, assignedZone, isActive } = req.body;

    if (!id) {
      const error = new Error('Staff ID is required');
      error.statusCode = 400;
      throw error;
    }

    if (!name || !email) {
      const error = new Error('name and email are required for PUT');
      error.statusCode = 400;
      throw error;
    }

    const updatedStaff = await Staff.findByIdAndUpdate(
      id,
      { name, email, assignedZone, isActive },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedStaff) {
      const error = new Error('Staff member not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: 'Staff member updated successfully (PUT)',
      data: updatedStaff,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: 'failed',
      data: error.message,
    });
  }
};

// Patch staff (PATCH - partial update)
exports.patchAStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    if (!id) {
      const error = new Error('Staff ID is required');
      error.statusCode = 400;
      throw error;
    }

    if (!updateFields || Object.keys(updateFields).length === 0) {
      const error = new Error('No fields provided for update');
      error.statusCode = 400;
      throw error;
    }

    // Don't allow direct password update via patch
    if (updateFields.password) {
      delete updateFields.password;
    }

    // Don't allow role change via patch (staff role is fixed)
    if (updateFields.role) {
      delete updateFields.role;
    }

    const updatedStaff = await Staff.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedStaff) {
      const error = new Error('Staff member not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: 'Staff member updated successfully (PATCH)',
      data: updatedStaff,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: 'failed',
      data: error.message,
    });
  }
};

// Get staff by assigned zone
exports.getStaffByZone = async (req, res) => {
  try {
    const { zone } = req.params;

    const staff = await Staff.find({ assignedZone: zone }).select('-password');

    res.status(200).json({
      message: 'success',
      data: staff,
      count: staff.length,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: 'failed',
      data: error.message,
    });
  }
};

// Toggle staff active status
exports.toggleStaffStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await Staff.findById(id);
    if (!staff) {
      const error = new Error('Staff member not found');
      error.statusCode = 404;
      throw error;
    }

    staff.isActive = !staff.isActive;
    await staff.save();

    res.status(200).json({
      message: `Staff ${staff.isActive ? 'activated' : 'deactivated'} successfully`,
      data: { id: staff._id, isActive: staff.isActive },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: 'failed',
      data: error.message,
    });
  }
};

// Update last login time
exports.updateLastLogin = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await Staff.findByIdAndUpdate(
      id,
      { lastLogin: new Date() },
      { new: true }
    ).select('-password');

    if (!staff) {
      const error = new Error('Staff member not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: 'Last login updated',
      data: staff,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: 'failed',
      data: error.message,
    });
  }
};
