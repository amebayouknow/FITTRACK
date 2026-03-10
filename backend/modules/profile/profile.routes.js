const express = require('express');
const router = express.Router();

const profileController = require('./profile.controller');

router.post('/create-profile', profileController.createProfile);
router.get('/get-profile', profileController.getProfile);
router.put('/update-profile', profileController.updateProfile);

module.exports = router;