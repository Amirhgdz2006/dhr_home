import { Request, Response, NextFunction } from 'express';
import * as appService from '../services/appService';

export const getData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

export const createApp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const app = await appService.createApp(req.body);
    res.status(201).json({ data: app });
  } catch (err) {
    next(err);
  }
};

export const getApp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const app = await appService.getAppById(parseInt(req.params.id));
    if (!app) {
      res.status(404).json({ error: 'App not found' });
      return;
    }
    res.json({ data: app });
  } catch (err) {
    next(err);
  }
};

export const updateApp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updatedApp = await appService.updateApp(parseInt(req.params.id), req.body);
    if (!updatedApp) {
      res.status(404).json({ error: 'App not found' });
      return;
    }
    res.json({ data: updatedApp });
  } catch (err) {
    next(err);
  }
};

export const deleteApp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deletedApp = await appService.deleteApp(parseInt(req.params.id));
    if (!deletedApp) {
      res.status(404).json({ error: 'App not found' });
      return;
    }
    res.json({ message: 'App deleted successfully', data: deletedApp });
  } catch (err) {
    next(err);
  }
};

