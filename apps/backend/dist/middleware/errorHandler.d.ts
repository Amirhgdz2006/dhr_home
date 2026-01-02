import { Request, Response, NextFunction } from 'express';
interface HttpError extends Error {
    status?: number;
    code?: number;
    keyPattern?: Record<string, unknown>;
    errors?: Record<string, {
        message: string;
    }>;
}
declare const errorHandler: (err: HttpError, req: Request, res: Response, next: NextFunction) => void;
export default errorHandler;
//# sourceMappingURL=errorHandler.d.ts.map