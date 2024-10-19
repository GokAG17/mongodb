const Batch = require('../models/Batch');

// Create a new batch
const createBatch = async (batchData) => {
  try {
    const batch = new Batch(batchData);
    const savedBatch = await batch.save();
    return savedBatch;
  } catch (error) {
    throw new Error('Failed to create batch: ' + error.message);
  }
};

// Get all batches
const getAllBatches = async () => {
  try {
    const batches = await Batch.find();
    return batches;
  } catch (error) {
    throw new Error('Failed to retrieve batches: ' + error.message);
  }
};

// Get a single batch by ID
const getBatchById = async (batchId) => {
  try {
    const batch = await Batch.findById(batchId);
    if (!batch) {
      throw new Error('Batch not found');
    }
    return batch;
  } catch (error) {
    throw new Error('Failed to retrieve batch: ' + error.message);
  }
};

// Update a batch by ID
const updateBatchById = async (batchId, updateData) => {
  try {
    const updatedBatch = await Batch.findByIdAndUpdate(batchId, updateData, { new: true });
    if (!updatedBatch) {
      throw new Error('Batch not found');
    }
    return updatedBatch;
  } catch (error) {
    throw new Error('Failed to update batch: ' + error.message);
  }
};

// Delete a batch by ID
const deleteBatchById = async (batchId) => {
  try {
    const deletedBatch = await Batch.findByIdAndDelete(batchId);
    if (!deletedBatch) {
      throw new Error('Batch not found');
    }
    return { message: 'Batch deleted successfully' };
  } catch (error) {
    throw new Error('Failed to delete batch: ' + error.message);
  }
};

// Assign a subject to a batch
const assignSubjectToBatch = async (req, res) => {
  const { batchId } = req.params; // Use batchId instead of id for clarity
  const { subjectId } = req.body;

  try {
    const batch = await Batch.findById(batchId);
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    // Assuming you have a 'subjects' array field in Batch model
    batch.subjects.push(subjectId);
    await batch.save();

    res.json({ message: 'Subject assigned to batch successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  assignSubjectToBatch
};

module.exports = {
  createBatch,
  getAllBatches,
  getBatchById,
  updateBatchById,
  deleteBatchById,
  assignSubjectToBatch
};
