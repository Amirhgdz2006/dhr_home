import { Request, Response, NextFunction } from 'express';
import * as categoryService from '../services/categoryService';

export const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json({ data: category });
  } catch (err) {
    next(err);
  }
};

export const getCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const category = await categoryService.getCategoryById(parseInt(req.params.id));
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.json({ data: category });
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updatedCategory = await categoryService.updateCategory(parseInt(req.params.id), req.body);
    if (!updatedCategory) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.json({ data: updatedCategory });
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deletedCategory = await categoryService.deleteCategory(parseInt(req.params.id));
    if (!deletedCategory) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.json({ message: 'Category deleted successfully', data: deletedCategory });
  } catch (err) {
    next(err);
  }
};

