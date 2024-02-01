import { Router } from 'express';
import { fetchStaff, fetchUsers } from '../controllers/dashboard.controller.js';
import { verifyJWT, verifyPermission } from '../middlewares/auth.middleware.js';
import { userRolesEnum } from '../constants.js';

const router = Router();

router
  .route('/fetch-users')
  .get(verifyJWT, verifyPermission(userRolesEnum.ADMIN), fetchUsers);

router.route('/fetch-staff').get(fetchStaff);

export default router;
