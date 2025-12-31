const categoryRepository = require('../repositories/categoryRepository');

exports.createCategory = (data) => {
  return categoryRepository.create(data);
};

exports.updateCategory = (id, data) => {
  return categoryRepository.updateById(id, { ...data, updatedAt: new Date() });
};

exports.deleteCategory = (id) => {
  return categoryRepository.deleteById(id);
};
