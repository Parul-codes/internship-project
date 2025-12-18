import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';
import { createChapter, deleteChapter, getCourseChapters, updateChapter } from '../controllers/chapters.controller';

const router = Router();

router.post('/courses/:id/chapters', 
  authenticate,
  authorize(['mentor']),
  createChapter
);
router.get(
  '/courses/:id/chapters',
  authenticate,
  getCourseChapters
);
router.put('/:id', 
  authenticate,
  authorize(['mentor']),
  updateChapter
);
router.delete('/:id', 
  authenticate,
  authorize(['mentor']),
  deleteChapter
);

export default router;
