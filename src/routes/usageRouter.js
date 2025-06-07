const express = require('express');
const router = express.Router();
const repo = require('../repositories/usageRepo');

router.post('/', (req, res) => {
  try {
    const { vehicleId, driverId, reason } = req.body;
    const result = repo.startUsage(vehicleId, driverId, reason);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch('/:id/finalizar', (req, res) => {
  try {
    const result = repo.finishUsage(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', (req, res) => res.json(repo.listUsages()));

module.exports = router;
