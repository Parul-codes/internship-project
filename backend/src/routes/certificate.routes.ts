import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';
import { getCertificate } from '../controllers/certificate.controller';

const router = Router();

router.get(
  '/:courseId',
  authenticate,
  authorize(['student']),
  getCertificate
);

export default router;
