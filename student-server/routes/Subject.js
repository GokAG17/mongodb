const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

// Create a new subject
router.post('/subjects', async (req, res) => {
  await subjectController.createSubject(req, res);
});

// Get all subjects
router.get('/subjects', async (req, res) => {
  await subjectController.getAllSubjects(req, res);
});

// Get a single subject by ID
router.get('/subjects/:id', async (req, res) => {
  await subjectController.getSubjectById(req, res);
});

// Update a subject by ID
router.put('/subjects/:id', async (req, res) => {
  await subjectController.updateSubjectById(req, res);
});

// Delete a subject by ID
router.delete('/subjects/:id', async (req, res) => {
  await subjectController.deleteSubjectById(req, res);
});

module.exports = router;
