import express from 'express';
import {
  getOfficers,
  getOfficer,
  createOfficer,
  updateOfficer,
  deleteOfficer,
} from '../controllers/officerController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getOfficers)
  .post(protect, authorize('admin'), createOfficer);

router.route('/:id')
  .get(getOfficer)
  .put(protect, authorize('admin'), updateOfficer)
  .delete(protect, authorize('admin'), deleteOfficer);

export default router; 