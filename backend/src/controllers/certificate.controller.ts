import { Response } from 'express';
import { AuthRequest } from '../middleware/authenticate';
import Chapter from '../models/Chapter';
import Progress from '../models/Progress';
import Course from '../models/Course';
import User from '../models/User';
import { generateCertificate } from '../utils/pdf';

export const getCertificate = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const studentId = req.user!.userId;
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    const totalChapters = await Chapter.countDocuments({ courseId });
    const completedChapters = await Progress.countDocuments({
      studentId,
      courseId,
      completed: true
    });

    if (totalChapters === 0 || completedChapters !== totalChapters) {
      res.status(403).json({ message: 'Course not completed yet' });
      return;
    }

    const student = await User.findById(studentId);

    const pdf = generateCertificate(
      student!.name,
      course.title
    );

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=certificate.pdf'
    );

    pdf.pipe(res);
    pdf.end();
  } catch {
    res.status(500).json({ message: 'Failed to generate certificate' });
  }
};
