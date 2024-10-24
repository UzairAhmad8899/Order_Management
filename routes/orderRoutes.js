import express from 'express';
import { createNewOrder, listAllOrders, orderDetails, changeOrderStatus } from '../controllers/orderController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, authorize([3]), createNewOrder);
router.get('/', authenticate, authorize([1]), listAllOrders);
router.get('/:orderId', authenticate, authorize([1, 3]), orderDetails);
router.put('/:orderId/created', authenticate, authorize([2]), changeOrderStatus);
router.put('/:orderId/in_progress', authenticate, authorize([2]), changeOrderStatus);
router.put('/:orderId/delivered', authenticate, authorize([2]), changeOrderStatus);
router.put('/:orderId/not_delivered', authenticate, authorize([2]), changeOrderStatus);

export default router;
