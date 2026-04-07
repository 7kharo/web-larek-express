import { Router } from 'express';
import productRoutes from './product'

const router = Router();

router.use ('/', productRoutes);

export default router;