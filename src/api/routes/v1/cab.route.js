const express = require('express');

const router = express.Router();
const cabController = require('../../controllers/cab.controller');

// Routes for CRUD operations
router.get('/', cabController.getAllCabs);
router.get('/:id', cabController.getCabById);
router.post('/', cabController.createCab);
router.put('/:id', cabController.updateCab);
router.delete('/:id', cabController.deleteCab);

module.exports = router;
