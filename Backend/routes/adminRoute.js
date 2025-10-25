const express = require('express');
const adminController = require('./../controllers/adminController');
const router = express.Router();

// Get all users
router.get('/users', adminController.getAllUsers);

// Get user by ID
router.get('/users/:id', adminController.getAUser);

// Create new user (any role)
router.post('/users', adminController.createUser);

// Delete user by ID
router.delete('/users/:id', adminController.deleteAUser);

// Update user (PUT - replace all fields)
router.put('/users/:id', adminController.updateAUser);

// Patch user (PATCH - partial update)
router.patch('/users/:id', adminController.patchAUser);

// Get users by role (customer/staff/admin)
router.get('/users/role/:role', adminController.getUsersByRole);

// Toggle user active status
router.patch('/users/:id/toggle-status', adminController.toggleUserStatus);

module.exports = router;
