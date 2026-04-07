import { Request, Response } from 'express';
import Product from '../models/product';
import { IProduct } from '../models/product';

export const getAllProducts = (req: Request, res: Response) => {
    return Product.find({})
        .then(allProducts => res.status(200).send(allProducts))
        .catch(err => res.status(500).json({message: 'Ошибка сервера'}))
}

export const createProduct = (req: Request, res: Response) => {
    // const newProduct: IProduct = req.body;
    const newProduct: IProduct =  {
     "description": "Будет стоять над душой и не давать прокрастинировать.",
     "image": { 
         fileName: "/images/Asterisk_2.png", 
         originalName: "Asterisk_2.png"
     },
     "title": "Мамка-таймер",
     "category": "софт-скил",
     "price": null
    }
    return Product.create(newProduct)
        .then(product => res.status(200).send(product))
        .catch(err => res.status(500).json({message: 'Ошибка сервера'}))
}