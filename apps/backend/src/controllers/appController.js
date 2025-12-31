const appService = require('../services/appService');

exports.getData = async (req, res, next) => {
  try {
    const data = await appService.getData();
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
  } catch (err) {
    next(err);
  }
};

exports.createApp = async (req, res, next) => {
  try {
    const app = await appService.createApp(req.body);
    res.status(201).json({ data: app });
  } catch (err) {
    next(err);
  }
};

exports.updateApp = async (req, res, next) => {
  try {
    const updatedApp = await appService.updateApp(req.params.id, req.body);
    if (!updatedApp) return res.status(404).json({ error: 'App not found' });
    res.json({ data: updatedApp });
  } catch (err) {
    next(err);
  }
};

exports.deleteApp = async (req, res, next) => {
  try {
    const deletedApp = await appService.deleteApp(req.params.id);
    if (!deletedApp) return res.status(404).json({ error: 'App not found' });
    res.json({ message: 'App deleted successfully', data: deletedApp });
  } catch (err) {
    next(err);
  }
};
