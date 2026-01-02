import express from 'express';
import * as authController from '../controllers/authController';
import { validateBody, schemas } from '../validators';
import { authRateLimiter } from "../middleware/rateLimit";

const router = express.Router();

router.post('/register', authRateLimiter, validateBody(schemas.registerSchema), authController.register);
router.post('/login', authRateLimiter, validateBody(schemas.loginSchema), authController.login);
router.post('/logout', authRateLimiter, authController.logout);

export default router;

