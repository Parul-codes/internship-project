import api from './api';
import { Course, Chapter } from '../types';

/* ================= AUTH ================= */

export const authService = {

  login: async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    return {
      token: res.data.token,
      role: res.data.role
    };
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  },

  getRole: () => {
    return localStorage.getItem('role');
  },
};

/* ================= COURSES ================= */

export const courseService = {
  // Mentor: create course
  createCourse: async (data: { title: string; description: string }) => {
    const res = await api.post('/courses', data);
    return res.data;
  },

  // Mentor: my courses
  getMyCourses: async (): Promise<Course[]> => {
    const res = await api.get('/courses/my');
    return res.data;
  },

  // Student / Mentor: course chapters
  getCourseChapters: async (courseId: string): Promise<Chapter[]> => {
    const res = await api.get(`/courses/69440f798182c0ccd9ff967e/chapters`);
    return res.data;
  },
};

/* ================= PROGRESS ================= */

export const progressService = {
  completeChapter: async (chapterId: string) => {
    await api.post(`/progress/${chapterId}/complete`);
  },

  getMyProgress: async () => {
    const res = await api.get('/progress/my');
    return res.data;
  },
};

/* ================= CERTIFICATE ================= */

export const certificateService = {
  downloadCertificate: async (courseId: string) => {
    const res = await api.get(`/api/certificates/69440f798182c0ccd9ff967e`, {
      responseType: 'blob',
    });
    return res.data;
  },
};

/* ================= ADMIN ================= */

export const adminService = {
  getUsers: async () => {
    const res = await api.get('/users');
    return res.data;
  },

  approveMentor: async (userId: string) => {
    const res = await api.put(`/users/${userId}/approve-mentor`);
    return res.data;
  },

  deleteUser: async (userId: string) => {
    const res = await api.delete(`/users/${userId}`);
    return res.data;
  },
};
