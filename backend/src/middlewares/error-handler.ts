import { NextFunction, Request, Response } from 'express';

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Ошибка валидации данных при создании товара';
  res.status(statusCode).json({ message });
};

export default errorHandler;
