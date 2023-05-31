import express from 'express';
import {
  createRole,
  getPermissions,
  getRoleById,
  getRoles,
  updateRole,
  deleteRole,
} from '../../controllers/dashboard/roleController.js';

import authMiddleware from '../../middlewares/authMiddleware.js';
import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';
import { validationCreateRole, validationUpdateRole } from '../../validation/validationRole.js';
import permissionMiddleware from '../../middlewares/permissionMiddleware.js';

const router = express.Router();

router.get('/', getRoles);
router.post('/', validationCreateRole, createRole);
router.put('/:id', idParmaMiddleware, validationUpdateRole, updateRole);
router.get('/get-permissions', getPermissions);
router.get('/:id', idParmaMiddleware, getRoleById);
router.delete('/:id', idParmaMiddleware, deleteRole);

export default router;
