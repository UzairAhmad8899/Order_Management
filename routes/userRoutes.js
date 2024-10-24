import express from 'express';
import { listAllUsers } from '../controllers/userController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, authorize([1]), listAllUsers);

export default router;
