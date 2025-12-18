import { Router } from 'express';
import { createCourse, deleteCourse, getMyCourses, updateCourse } from '../controllers/course.controller';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';

const router = Router();

router.use(authenticate);
router.use(authorize(['mentor']));

router.post('/', createCourse);
router.get('/my', getMyCourses);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

export default router;
