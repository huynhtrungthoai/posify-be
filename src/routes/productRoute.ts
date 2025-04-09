import { Router } from 'express';
import { authentication } from '../middleware/authentication';
import { ProductController } from '../controllers';

const router = Router();

const ROUTE_PREFIX = 'api';

router.get(`/${ROUTE_PREFIX}/products`, authentication, ProductController.getProducts);
router.post(`/${ROUTE_PREFIX}/product`, authentication, ProductController.createProduct);
router.patch(`/${ROUTE_PREFIX}/product/:id`, authentication, ProductController.updateProduct);

export const ProductRouter = router;
