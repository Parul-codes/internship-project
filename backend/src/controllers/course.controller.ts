import { Response, Request } from 'express';
import Course from '../models/Course';
import { AuthRequest } from '../middleware/authenticate';

// POST /api/courses
export const createCourse = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body;

    const course = await Course.create({
      title,
      description,
      mentorId: req.user!.userId
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create course' });
  }
};

// GET /api/courses/my
export const getMyCourses = async (req: AuthRequest, res: Response) => {
  try {
    const courses = await Course.find({
      mentorId: req.user!.userId
    });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
};

//PUT /api/courses/:id
export const updateCourse = async (
  req: Request<{ id: string }, {}, { title?: string; description?: string }>,
  res: Response
): Promise<void> => {
  try {
    const courseId = req.params.id;
    const mentorId = req.user!.userId;

    const { title, description } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    if (course.mentorId.toString() !== mentorId) {
      res.status(403).json({ message: 'You can update only your own course' });
      return;
    }

    if (title) course.title = title;
    if (description) course.description = description;

    await course.save();

    res.json({ message: 'Course updated successfully', course });
  } catch {
    res.status(500).json({ message: 'Failed to update course' });
  }
};


//DELETE course /api/courses/:id
export const deleteCourse = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const courseId = req.params.id;
    const mentorId = req.user!.userId;

    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    // 🔒 Ownership check
    if (course.mentorId.toString() !== mentorId) {
      res.status(403).json({ message: 'You can delete only your own course' });
      return;
    }

    await course.deleteOne();

    res.json({ message: 'Course deleted successfully' });
  } catch {
    res.status(500).json({ message: 'Failed to delete course' });
  }
};
