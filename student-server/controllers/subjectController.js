const Subject = require('../models/Subject');

// Create a new subject
const createSubject = async (req, res) => {
  try {
    const subject = new Subject(req.body);
    const savedSubject = await subject.save();
    res.status(201).json(savedSubject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all subjects
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects); // Send status 200 explicitly for success
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single subject by ID
const getSubjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const subject = await Subject.findById(id);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a subject by ID
const updateSubjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.status(200).json(updatedSubject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a subject by ID
const deleteSubjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSubject = await Subject.findByIdAndDelete(id);
    if (!deletedSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubjectById,
  deleteSubjectById
};
