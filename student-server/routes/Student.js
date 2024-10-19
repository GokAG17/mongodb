const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Create a new student
router.post('/students', studentController.createStudent);

// Get all students
router.get('/students', studentController.getAllStudents);

// Get a single student by ID
router.get('/students/:id', studentController.getStudentById);

// Get a single student by ID
router.get('/students/:batch', studentController.getStudentByBId);

// Update a student by ID
router.put('/students/:id', studentController.updateStudentById);

// Delete a student by ID
router.delete('/students/:id', studentController.deleteStudentById);

module.exports = router;
