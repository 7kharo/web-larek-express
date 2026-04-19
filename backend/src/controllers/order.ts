import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { Types } from 'mongoose';
import Product, { IProduct } from '../models/product';
import BadRequestError from '../errors/bad-request-error';

const orderProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { total, items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return next(new BadRequestError('Отсутствуют товары'));
    }

    const invalidIds = items.filter((id: string) => !Types.ObjectId.isValid(id));
    if (invalidIds.length > 0) {
      return next(new BadRequestError('Указан некорректный формат ID товара'));
    }

    const products = await Product.find<IProduct>({ _id: { $in: items } });
    if (products.length !== items.length) {
      return next(new BadRequestError('Товары не найдены'));
    }

    const priceNullCheck = products.some((product) => product.price === null);
    if (priceNullCheck) {
      return next(new BadRequestError('Добавлен бесценный товар'));
    }
    const totalBasket = products.reduce((sum, product) => sum + product.price!, 0);

    if (totalBasket !== total) {
      return next(new BadRequestError('Неверная общая сумма заказа'));
    }

    return res.status(200).json({
      id: randomUUID(),
      total,
    });
  } catch (error) {
    return next(error);
  }
};

export default orderProducts;
