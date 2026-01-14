// routes/adminRoutes.js

import express from 'express';
import {
  createPsychologist,
  deactivateUser,
  getAnalytics
} from '../controllers/adminController.js';
import { protect, allowRoles } from '../middlewares/auth.js';

const router = express.Router();

router.use(protect);
router.use(allowRoles('admin'));

router.route('/psychologists').post(createPsychologist);
router.route('/users/:id/deactivate').patch(deactivateUser);
router.route('/analytics').get(getAnalytics);

export default router;