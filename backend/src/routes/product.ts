import { Router } from 'express';
import { getAllProducts, createProduct } from '../controllers/products';
import { validateProductBody } from '../middlewares/validation';

const router = Router();

router.get('/', getAllProducts);
router.post('/', validateProductBody, createProduct);

export default router;
