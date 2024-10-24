import express from 'express';
import { createCustomer, listCustomers } from '../controllers/customerController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, createCustomer);
router.get('/', authenticate, authorize([1]), listCustomers);

export default router;
