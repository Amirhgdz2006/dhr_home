import App from '../models/App';

export const findByCategoryName = (categoryName: string) => {
  return App.find({ category: categoryName });
};

export const create = (data: {
  name: string;
  englishName?: string;
  description?: string;
  url?: string;
  keywords?: string[];
  icon_background_color?: string | null;
  icon?: { url?: string };
  category?: string;
}) => {
  const app = new App(data);
  return app.save();
};

export const findById = (id: number) => {
  return App.findOne({ id });
};

export const updateById = (id: number, data: Partial<{
  name: string;
  englishName?: string;
  description?: string;
  url?: string;
  keywords?: string[];
  icon_background_color?: string | null;
  icon?: { url?: string };
  category?: string;
  updatedAt: Date;
}>) => {
  return App.findOneAndUpdate({ id }, data, { new: true });
};

export const deleteById = (id: number) => {
  return App.findOneAndDelete({ id });
};

