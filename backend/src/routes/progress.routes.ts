import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';
import {
  completeChapter,
  getMyProgress
} from '../controllers/progress.controller';

const router = Router();

router.post(
  '/:chapterId/complete',
  authenticate,
  authorize(['student']),
  completeChapter
);

router.get(
  '/my',
  authenticate,
  authorize(['student']),
  getMyProgress
);

export default router;
