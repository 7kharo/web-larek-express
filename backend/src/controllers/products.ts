import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';

export const getAllProducts = (_req: Request, res: Response, next: NextFunction) => Product.find({})
  .then((allProducts) => res.status(200).send(
    {
      items: allProducts,
      total: allProducts.length,
    },
  ))
  .catch((error) => next(error));

export const createProduct = (req: Request, res: Response, next: NextFunction) => {
  const {
    description, image, title, category, price,
  } = req.body;
  return Product.create({
    description, image, title, category, price,
  })
    .then((product) => res.status(201).send({
      item: product,
    }))
    .catch((error) => {
      if (error instanceof MongooseError.ValidationError) {
        return next(new BadRequestError(error.message));
      }
      if (error instanceof Error && error.message.includes('E11000')) {
        return next(new ConflictError(error.message));
      }
      return next(error);
    });
};
