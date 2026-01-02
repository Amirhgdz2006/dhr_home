import express from 'express';
import * as authController from '../controllers/authController';
import { validateBody, schemas } from '../validators';

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), authController.register);
router.post('/login', validateBody(schemas.loginSchema), authController.login);
router.post('/logout', authController.logout);

export default router;

