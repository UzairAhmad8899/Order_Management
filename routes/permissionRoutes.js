import express from 'express';
import { addPermission } from '../controllers/permissionController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, authorize([1]), addPermission);

export default router;
