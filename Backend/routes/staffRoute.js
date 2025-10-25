const express = require('express');
const staffController = require('./../controllers/staffController');
const router = express.Router();

// Get all staff members
router.get('/staff', staffController.getAllStaff);

// Get staff member by ID
router.get('/staff/:id', staffController.getAStaff);

// Create new staff member
router.post('/staff', staffController.createStaff);

// Delete staff member by ID
router.delete('/staff/:id', staffController.deleteAStaff);

// Update staff (PUT - replace all fields)
router.put('/staff/:id', staffController.updateAStaff);

// Patch staff (PATCH - partial update)
router.patch('/staff/:id', staffController.patchAStaff);

// Get staff by assigned zone
router.get('/staff/zone/:zone', staffController.getStaffByZone);

// Toggle staff active status
router.patch('/staff/:id/toggle-status', staffController.toggleStaffStatus);

// Update last login
router.patch('/staff/:id/last-login', staffController.updateLastLogin);

module.exports = router;
