const express = require('express');
const router = express.Router();

const trainingController = require('./training.controller');

router.post('/add-training', trainingController.addTraining);
router.get('/get-trainings', trainingController.getTrainings);
router.get('/get-all-trainings', trainingController.getAllTrainings);

module.exports = router;
