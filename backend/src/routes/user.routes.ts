import { Router } from 'express';
import { getAllUsers, approveMentor, deleteUser } from '../controllers/user.controller';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';

const router = Router();

router.use(authenticate);
router.use(authorize(['admin']));

router.get('/', getAllUsers);
router.put('/:id/approve-mentor', approveMentor);
router.delete('/:id', deleteUser);

export default router;
