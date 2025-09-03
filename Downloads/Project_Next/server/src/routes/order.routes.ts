import express from 'express';
import { createOrder, getAllOrders, updateOrderStatus, getUserOrders } from '../controllers/order.controller';
import { adminAuth } from '../middleware/adminAuth';
import { auth } from '../types/auth';

const router = express.Router();

/*----------------------------------
-----------------------------------*/
router.post('/', createOrder);
/*----------------------------------
-----------------------------------*/
router.get('/', adminAuth, getAllOrders);
router.put('/:id', adminAuth, updateOrderStatus);
router.get('/user/:email', auth, getUserOrders);

export default router;




