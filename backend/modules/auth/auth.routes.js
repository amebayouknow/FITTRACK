const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');

router.post('/sign-up', authController.signUp);
router.post('/sign-in', authController.signIn);
router.delete('/delete-user', authController.deleteUser);
router.patch('/update-password', authController.updatePassword);

module.exports = router;
