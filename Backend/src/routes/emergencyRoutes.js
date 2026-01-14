// routes/emergencyRoutes.js

import express from 'express';
import {
  createEmergency,
  acceptEmergency,      // ← Added
  closeEmergency,
  getMyEmergencies,
  getAssignedEmergencies,
  getAllEmergencies
} from '../controllers/emergencyController.js';
import { protect, allowRoles } from '../middlewares/auth.js';

const router = express.Router();

router.use(protect);

// Student routes
router.route('/')
  .post(allowRoles('student'), createEmergency);

// Psychologist routes
router.route('/:id/accept')          // ← NEW: Self-accept
  .patch(allowRoles('psychologist'), acceptEmergency);

router.route('/:id/close')
  .patch(allowRoles('psychologist'), closeEmergency);

router.route('/assigned')
  .get(allowRoles('psychologist'), getAssignedEmergencies);

// Admin routes
router.route('/me')
  .get(allowRoles('student'), getMyEmergencies);

router.route('/')
  .get(allowRoles('admin'), getAllEmergencies);

export default router;