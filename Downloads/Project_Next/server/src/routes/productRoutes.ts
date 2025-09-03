import { Router } from 'express';
import { getAllProducts, createProduct, deleteProduct, updateProduct, getProductById, } from '../controllers/product.controller';

const router = Router();
/*----------------------------------
-----------------------------------*/
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);
/*----------------------------------
-----------------------------------*/
export default router;
