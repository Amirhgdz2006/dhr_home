const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const App = require('../models/App');
const auth = require('../middleware/auth');
const checkOrigin = require('../middleware/checkOrigin');



// Data endpoint
router.get('/data', checkOrigin, async (req, res) => {
  try {
    const categories = await Category.find().sort({ order: 1 });

    const data = await Promise.all(
      categories.map(async (cat) => {
        const apps = await App.find({ category: cat.name });

        return {
          id: cat.id,
          documentId: cat._id.toString(),
          name: cat.name,
          order: cat.order,
          createdAt: cat.createdAt,
          updatedAt: cat.updatedAt,
          publishedAt: cat.publishedAt,
          apps: apps.map(app => ({
            id: app.id,
            documentId: app._id.toString(),
            name: app.name,
            englishName: app.englishName,
            description: app.description,
            url: app.url,
            keywords: app.keywords,
            icon_background_color: app.icon_background_color,
            icon: app.icon
              ? { url: `${app.icon.url}` }
              : null,
            createdAt: app.createdAt,
            updatedAt: app.updatedAt,
            publishedAt: app.publishedAt
          }))
        };
      })
    );

    res.json({
      data,
      meta: {
        pagination: {
          page: 1,
          pageSize: data.length,
          pageCount: 1,
          total: data.length
        }
      }
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});





// App Endpoint
// CREATE
router.post('/app', auth, async function(req, res) {
  try {
    const app = new App(req.body);
    await app.save();
    res.json({ data: app });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE
router.put('/app/:id', auth, async function(req, res) {
  try {
    const appId = req.params.id;
    const updateData = req.body;

    updateData.updatedAt = new Date();

    const updatedApp = await App.findOneAndUpdate({ id: appId }, updateData, { new: true });

    if (!updatedApp) {
      return res.status(404).json({ error: 'App not found' });
    }

    res.json({ data: updatedApp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// DELETE
router.delete('/app/:id', auth, async (req, res) => {
  try {
    const appId = req.params.id;

    const deletedApp = await App.findOneAndDelete({ id: appId });

    if (!deletedApp) {
      return res.status(404).json({ error: 'App not found' });
    }

    res.json({ message: 'App deleted successfully', data: deletedApp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});




// Category Endpoint
// CREATE
router.post('/category', auth, async function(req, res){
  try{
    const category = new Category(req.body)
    await category.save()
    res.json({ data: category })
  } catch(error){
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }

});

module.exports = router;



// UPDATE
router.put('/category/:id', auth, async function(req, res) {
  try {
    const categoryId = req.params.id;
    const updateData = req.body;

    updateData.updatedAt = new Date();

    const updatedCategory = await Category.findOneAndUpdate({ id: categoryId }, updateData, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({ data: updatedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



// DELETE
router.delete('/category/:id', auth, async (req, res) => {
  try {
    const categoryId = req.params.id;

    const deletedcategory = await Category.findOneAndDelete({ id: categoryId });

    if (!deletedcategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully', data: deletedcategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
