const categoryRepository = require('../repositories/categoryRepository');
const appRepository = require('../repositories/appRepository');

exports.getData = async () => {
  const categories = await categoryRepository.findAllSorted();

  return Promise.all(categories.map(async (cat) => {
    const apps = await appRepository.findByCategoryName(cat.name);

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
        icon: app.icon ? { url: app.icon.url } : null,
        createdAt: app.createdAt,
        updatedAt: app.updatedAt,
        publishedAt: app.publishedAt
      }))
    };
  }));
};

exports.createApp = (data) => {
  return appRepository.create(data);
};

exports.updateApp = (id, data) => {
  return appRepository.updateById(id, { ...data, updatedAt: new Date() });
};

exports.deleteApp = (id) => {
  return appRepository.deleteById(id);
};
