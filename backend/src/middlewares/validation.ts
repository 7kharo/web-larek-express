import { celebrate, Joi } from 'celebrate';

export const validateOrderBody = celebrate({
  body: Joi.object().keys({
    payment: Joi.string().valid('card', 'online').required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    total: Joi.number().required(),
    items: Joi.array().items(Joi.string()).min(1).required(),
  }),
});

export const validateProductBody = celebrate({
  body: Joi.object().keys({
    description: Joi.string().optional(),
    image: Joi.object().keys({
      fileName: Joi.string().required(),
      originalName: Joi.string().required(),
    }).required(),
    title: Joi.string().required().min(2).max(30),
    category: Joi.string().required(),
    price: Joi.number().min(0).allow(null),
  }),
});
