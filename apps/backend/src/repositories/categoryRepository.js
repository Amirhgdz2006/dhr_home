const Category = require('../models/Category');

exports.findAllSorted = () => {
  return Category.find().sort({ order: 1 });
};

exports.create = (data) => {
  const category = new Category(data);
  return category.save();
};

exports.updateById = (id, data) => {
  return Category.findOneAndUpdate({ id }, data, { new: true });
};

exports.deleteById = (id) => {
  return Category.findOneAndDelete({ id });
};
