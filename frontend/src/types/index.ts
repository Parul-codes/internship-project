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
  progress?: number;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  sequence: number;
  // mentorId: string;
}


export interface CourseProgress {
  courseId: string;
  completedChapters: string[];
  // totalChapters: number;
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
