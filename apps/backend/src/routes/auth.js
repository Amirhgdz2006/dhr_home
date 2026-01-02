const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateBody, schemas } = require('../validators');

router.post('/register', validateBody(schemas.registerSchema), authController.register);
router.post('/login', validateBody(schemas.loginSchema), authController.login);
router.post('/logout', authController.logout);

module.exports = router;
