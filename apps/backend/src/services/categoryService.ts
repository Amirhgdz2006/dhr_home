import * as categoryRepository from '../repositories/categoryRepository';

export const createCategory = (data: {
  name: string;
  order?: number | null;
}) => {
  return categoryRepository.create(data);
};

export const getCategoryById = (id: number) => {
  return categoryRepository.findById(id);
};

export const updateCategory = (id: number, data: Partial<{
  name: string;
  order?: number | null;
}>) => {
  return categoryRepository.updateById(id, { ...data, updatedAt: new Date() });
};

export const deleteCategory = (id: number) => {
  return categoryRepository.deleteById(id);
};

