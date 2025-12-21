import { Router } from 'express';
import { createCourse, deleteCourse, getMyCourses, updateCourse, enrollInCourse } from '../controllers/course.controller';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';

const router = Router();

router.use(authenticate);
router.use(authorize(['mentor' , 'student']));

router.post('/', createCourse);
router.get('/my', getMyCourses);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);
router.put(
  '/:courseId/enroll',
  authorize(['student']),       // student token here
  enrollInCourse
);

export default router;
