import Category from '../models/Category';

export const findAllSorted = () => {
  return Category.find().sort({ order: 1 });
};

export const create = (data: {
  name: string;
  order?: number | null;
}) => {
  const category = new Category(data);
  return category.save();
};

export const findById = (id: number) => {
  return Category.findOne({ id });
}

export const updateById = (id: number, data: Partial<{
  name: string;
  order?: number | null;
  updatedAt: Date;
}>) => {
  return Category.findOneAndUpdate({ id }, data, { new: true });
};

export const deleteById = (id: number) => {
  return Category.findOneAndDelete({ id });
};

