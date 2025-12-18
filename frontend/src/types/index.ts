export type UserRole = 'student' | 'mentor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  progress?: number;
  totalChapters: number;
  completedChapters: number;
  mentorName?: string;
  enrolledStudents?: number;
}

export interface Chapter {
  id: string;
  courseId: string;
  title: string;
  content: string;
  order: number;
  isCompleted: boolean;
  isLocked: boolean;
  videoUrl?: string;
  duration?: string;
}

export interface CourseProgress {
  courseId: string;
  completedChapters: number;
  totalChapters: number;
  percentage: number;
  lastAccessedChapter?: number;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  issuedDate: string;
  certificateUrl: string;
}
