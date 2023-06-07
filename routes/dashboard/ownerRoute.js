import express from 'express';
import {
  getAllOwners,
  getOwnerById,
  createOwner,
  updateOwner,
  deleteOwner,
} from '../../controllers/dashboard/ownerController.js';

import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';
import { validationOwnerCreate, validationOwnerUpdate } from '../../validation/validateOwner.js';

const router = express.Router();

router.route('/').get(getAllOwners).post(validationOwnerCreate, createOwner);

router
  .route('/:id')
  .all(idParmaMiddleware)
  .get(getOwnerById)
  .patch(validationOwnerUpdate, updateOwner)
  .delete(deleteOwner);

export default router;
