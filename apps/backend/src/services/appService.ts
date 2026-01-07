import * as categoryRepository from '../repositories/categoryRepository';
import * as appRepository from '../repositories/appRepository';

export const getData = async () => {
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

export const createApp = (data: {
  name: string;
  englishName?: string;
  description?: string;
  url?: string;
  keywords?: string[];
  icon_background_color?: string | null;
  icon?: { url?: string };
  category?: string;
}) => {
  return appRepository.create(data);
};

export const getAppById = (id: number) => {
  return appRepository.findById(id);
};

export const updateApp = (id: number, data: Partial<{
  name: string;
  englishName?: string;
  description?: string;
  url?: string;
  keywords?: string[];
  icon_background_color?: string | null;
  icon?: { url?: string };
  category?: string;
}>) => {
  return appRepository.updateById(id, { ...data, updatedAt: new Date() });
};

export const deleteApp = (id: number) => {
  return appRepository.deleteById(id);
};

