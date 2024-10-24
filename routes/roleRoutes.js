import express from 'express';
import { addRole, listRoles, assignRole } from '../controllers/roleController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, addRole);
router.get('/', authenticate, listRoles);
router.post('/assign', authenticate, assignRole);

export default router;
