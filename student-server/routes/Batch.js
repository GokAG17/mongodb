const express = require('express');
const router = express.Router();
const batchController = require('../controllers/batchController');

// Create a new batch
router.post('/batches', async (req, res) => {
  try {
    const result = await batchController.createBatch(req.body);
    res.json(result);
  } catch (error) {
    console.error('Error creating batch:', error);
    res.status(500).json({ error: 'Failed to create batch' });
  }
});

// Get all batches
router.get('/batches', async (req, res) => {
  try {
    const batches = await batchController.getAllBatches();
    res.json(batches);
  } catch (error) {
    console.error('Error getting all batches:', error);
    res.status(500).json({ error: 'Failed to get batches' });
  }
});

// Get a single batch by ID
router.get('/batches/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const batch = await batchController.getBatchById(id);
    if (!batch) {
      return res.status(404).json({ error: 'Batch not found' });
    }
    res.json(batch);
  } catch (error) {
    console.error('Error getting batch by ID:', error);
    res.status(500).json({ error: 'Failed to get batch' });
  }
});

// Update a batch by ID
router.put('/batches/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBatch = await batchController.updateBatchById(id, req.body);
    res.json(updatedBatch);
  } catch (error) {
    console.error('Error updating batch:', error);
    res.status(500).json({ error: 'Failed to update batch' });
  }
});

// Delete a batch by ID
router.delete('/batches/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBatch = await batchController.deleteBatchById(id);
    res.json({ message: 'Batch deleted successfully', batch: deletedBatch });
  } catch (error) {
    console.error('Error deleting batch:', error);
    res.status(500).json({ error: 'Failed to delete batch' });
  }
});

// Assign a subject to a batch
router.put('/batches/:batchId/assign', batchController.assignSubjectToBatch);

module.exports = router;
