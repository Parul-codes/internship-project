import { Response, Request } from 'express';
import Chapter from '../models/Chapter';
import { AuthRequest } from '../middleware/authenticate';
import Course from '../models/Course';

// POST /courses/:id/chapters
export const createChapter = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, videoUrl, sequence } = req.body;
    const courseId = req.params.id;
    const mentorId = req.user!.userId;

    // 1️⃣ Verify course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // 2️⃣ Ownership check
    if (course.mentorId.toString() !== mentorId) {
      return res.status(403).json({ message: 'Not your course' });
    }

    // 3️⃣ Sequence enforcement
    const lastChapter = await Chapter.findOne({ courseId })
      .sort({ sequence: -1 });

    const nextSequence = lastChapter ? lastChapter.sequence + 1 : 1;

    if (sequence !== nextSequence) {
      return res.status(400).json({
        message: `Next chapter sequence must be ${nextSequence}`
      });
    }

    // 4️⃣ Create chapter
    const chapter = await Chapter.create({
      courseId,
      title,
      description,
      videoUrl,
      sequence
    });

    res.status(201).json(chapter);
  } catch {
    res.status(500).json({ message: 'Failed to create chapter' });
  }
};


// GET 
export const getCourseChapters = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    const chapters = await Chapter.find({ courseId })
      .sort({ sequence: 1 });

    res.json(chapters);
  } catch {
    res.status(500).json({ message: 'Failed to fetch chapters' });
  }
};

// PUT /api/chapters/:id
export const updateChapter = async (
  req: Request<
    { id: string },
    {},
    { title?: string; description?: string; videoUrl?: string }
  > & AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const chapterId = req.params.id;
    const mentorId = req.user!.userId;

    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      res.status(404).json({ message: 'Chapter not found' });
      return;
    }

    const course = await Course.findById(chapter.courseId);
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    // 🔒 Ownership check
    if (course.mentorId.toString() !== mentorId) {
      res.status(403).json({ message: 'You can update only your own course chapters' });
      return;
    }

    const { title, description, videoUrl } = req.body;

    if (title) chapter.title = title;
    if (description) chapter.description = description;
    if (videoUrl) chapter.videoUrl = videoUrl;

    await chapter.save();

    res.json({
      message: 'Chapter updated successfully',
      chapter
    });
  } catch {
    res.status(500).json({ message: 'Failed to update chapter' });
  }
};

// DELETE /api/chapters/:id
export const deleteChapter = async (
  req: Request<{ id: string }> & AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const chapterId = req.params.id;
    const mentorId = req.user!.userId;

    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      res.status(404).json({ message: 'Chapter not found' });
      return;
    }

    const course = await Course.findById(chapter.courseId);
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    // 🔒 Ownership check
    if (course.mentorId.toString() !== mentorId) {
      res.status(403).json({ message: 'You can delete only your own course chapters' });
      return;
    }

    await chapter.deleteOne();

    res.json({ message: 'Chapter deleted successfully' });
  } catch {
    res.status(500).json({ message: 'Failed to delete chapter' });
  }
};

