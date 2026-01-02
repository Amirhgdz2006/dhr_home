const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const checkOrigin = require('../middleware/checkOrigin');
const { validateBody, schemas } = require('../validators');

// Data endpoint
router.get('/data', checkOrigin, appController.getData);

// App endpoints
router.post('/app', validateBody(schemas.createAppSchema), auth, appController.createApp);
router.put('/app/:id', validateBody(schemas.updateAppSchema), auth, appController.updateApp);
router.delete('/app/:id', auth, appController.deleteApp);

// Category endpoints
router.post('/category', validateBody(schemas.createCategorySchema), auth, categoryController.createCategory);
router.put('/category/:id', validateBody(schemas.updateCategorySchema), auth, categoryController.updateCategory);
router.delete('/category/:id', auth, categoryController.deleteCategory);

module.exports = router;