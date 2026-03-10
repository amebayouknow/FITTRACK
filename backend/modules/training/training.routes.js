const express = require('express');
const router = express.Router();

const trainingController = require('./training.controller');

router.post('/add-training', trainingController.addTraining);

module.exports = router;
