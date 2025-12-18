import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';
import {getAllUsers,approveMentor,createMentor, deleteUser} from '../controllers/user.controller';

const router = Router();

router.get(
  '/',
  authenticate,
  authorize(['admin']),
  getAllUsers
);

router.post(
  '/create-mentor',
  authenticate,
  authorize(['admin']),
  createMentor
);

router.put(
  '/:id/approve-mentor',
  authenticate,
  authorize(['admin']),
  approveMentor
);

router.delete(
  '/:id',
  authenticate,
  authorize(['admin']),
  deleteUser
);


export default router;
