import express from 'express';
import {
  getAllOwners,
  getOwnerById,
  createOwner,
  updateOwner,
  deleteOwner,
} from '../../controllers/dashboard/ownerController.js';
import idParmaMiddleware from '../../middlewares/idParmaMiddleware.js';

const router = express.Router();
router.route('/').get(getAllOwners).post(createOwner);

router
  .route('/:id')
  .all(idParmaMiddleware)
  .get(getOwnerById)
  .patch(updateOwner)
  .delete(deleteOwner);

export default router;
