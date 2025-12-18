import { Response } from 'express';
import { AuthRequest } from '../middleware/authenticate';
import Progress from '../models/Progress';
import Chapter from '../models/Chapter';

// POST /api/progress/:chapterId/complete
export const completeChapter = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const studentId = req.user!.userId;
    const chapterId = req.params.chapterId;

    // 1️⃣ Find chapter
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      res.status(404).json({ message: 'Chapter not found' });
      return;
    }

    const courseId = chapter.courseId;

    // 2️⃣ Prevent duplicate completion
    const alreadyCompleted = await Progress.findOne({
      studentId,
      chapterId,
      completed: true
    });

    if (alreadyCompleted) {
      res.status(400).json({ message: 'Chapter already completed' });
      return;
    }

    // 3️⃣ Sequential check
    if (chapter.sequence > 1) {
      const previousChapter = await Chapter.findOne({
        courseId,
        sequence: chapter.sequence - 1
      });

      if (!previousChapter) {
        res.status(400).json({ message: 'Previous chapter not found' });
        return;
      }

      const previousCompleted = await Progress.findOne({
        studentId,
        chapterId: previousChapter._id,
        completed: true
      });

      if (!previousCompleted) {
        res.status(403).json({
          message: 'Complete previous chapter first'
        });
        return;
      }
    }

    // 4️⃣ Mark chapter completed
    await Progress.create({
      studentId,
      courseId,
      chapterId,
      completed: true,
      completedAt: new Date()
    });

    res.status(201).json({ message: 'Chapter completed successfully' });
  } catch {
    res.status(500).json({ message: 'Failed to complete chapter' });
  }
};

// GET /api/progress/my
export const getMyProgress = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const studentId = req.user!.userId;

    const progress = await Progress.find({
      studentId,
      completed: true
    });

    res.json(progress);
  } catch {
    res.status(500).json({ message: 'Failed to fetch progress' });
  }
};
