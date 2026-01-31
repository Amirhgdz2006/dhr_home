import express from 'express';
import * as appController from '../controllers/appController';
import * as categoryController from '../controllers/categoryController';
import auth from '../middleware/auth';
import checkOrigin from '../middleware/checkOrigin';
import { validateBody, schemas } from '../validators';

const router = express.Router();

// Data endpoint
router.get('/data', checkOrigin, appController.getData);

// App endpoints
router.post('/app', validateBody(schemas.createAppSchema), auth, appController.createApp);
router.get('/app/:id', auth, appController.getApp);
router.put('/app/:id', validateBody(schemas.updateAppSchema), auth, appController.updateApp);
router.delete('/app/:id', auth, appController.deleteApp);

// Category endpoints
router.post('/category', validateBody(schemas.createCategorySchema), auth, categoryController.createCategory);
router.get('/category/:id', auth, categoryController.getCategory);
router.put('/category/:id', validateBody(schemas.updateCategorySchema), auth, categoryController.updateCategory);
router.delete('/category/:id', auth, categoryController.deleteCategory);

export default router;

