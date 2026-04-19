import { isCelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (isCelebrateError(err)) {
    return res.status(400).json({ message: 'Ошибка валидации данных при создании товара' });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Ошибка валидации данных при создании товара';
  return res.status(statusCode).json({ message });
};

export default errorHandler;
