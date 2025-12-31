const App = require('../models/App');

exports.findByCategoryName = (categoryName) => {
  return App.find({ category: categoryName });
};

exports.create = (data) => {
  const app = new App(data);
  return app.save();
};

exports.updateById = (id, data) => {
  return App.findOneAndUpdate({ id }, data, { new: true });
};

exports.deleteById = (id) => {
  return App.findOneAndDelete({ id });
};
