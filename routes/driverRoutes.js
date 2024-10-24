import express from 'express';
import { getDrivers, assignOrders, getDriverAssignedOrders } from '../controllers/driverController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, authorize([1]), getDrivers);
router.post('/assign-orders', authenticate, authorize([1]), assignOrders);
router.get('/:driverId/orders', authenticate, authorize([1, 2]), getDriverAssignedOrders);

// router.put('/:orderId/changeOrderStatus', authenticate, authorize([2]), changeOrderStatus);

export default router;
