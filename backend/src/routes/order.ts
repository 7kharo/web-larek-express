import { Router } from 'express';
import orderProducts from '../controllers/order';
import { validateOrderBody } from '../middlewares/validation';

const router = Router();

router.post('/', validateOrderBody, orderProducts);

export default router;
