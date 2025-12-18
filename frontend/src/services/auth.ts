import api from './api';
import { AuthResponse, User, Course, Chapter, CourseProgress, Certificate } from '../types';

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  saveAuth: (token: string, user: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },
};

export const courseService = {
  getStudentCourses: async (): Promise<Course[]> => {
    const response = await api.get<Course[]>('/student/courses');
    return response.data;
  },

  getMentorCourses: async (): Promise<Course[]> => {
    const response = await api.get<Course[]>('/mentor/courses');
    return response.data;
  },

  getAllCourses: async (): Promise<Course[]> => {
    const response = await api.get<Course[]>('/admin/courses');
    return response.data;
  },

  getCourseById: async (courseId: string): Promise<Course> => {
    const response = await api.get<Course>(`/courses/${courseId}`);
    return response.data;
  },

  getCourseChapters: async (courseId: string): Promise<Chapter[]> => {
    const response = await api.get<Chapter[]>(`/courses/${courseId}/chapters`);
    return response.data;
  },

  getCourseProgress: async (courseId: string): Promise<CourseProgress> => {
    const response = await api.get<CourseProgress>(`/courses/${courseId}/progress`);
    return response.data;
  },

  markChapterComplete: async (courseId: string, chapterId: string): Promise<void> => {
    await api.post(`/courses/${courseId}/chapters/${chapterId}/complete`);
  },
};

export const certificateService = {
  getCertificates: async (): Promise<Certificate[]> => {
    const response = await api.get<Certificate[]>('/student/certificates');
    return response.data;
  },

  downloadCertificate: async (certificateId: string): Promise<string> => {
    const response = await api.get<{ url: string }>(`/certificates/${certificateId}/download`);
    return response.data.url;
  },
};

export const adminService = {
  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  createCourse: async (courseData: Partial<Course>) => {
    const response = await api.post('/admin/courses', courseData);
    return response.data;
  },

  getStatistics: async () => {
    const response = await api.get('/admin/statistics');
    return response.data;
  },
};
