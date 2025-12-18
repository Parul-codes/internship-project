import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import MentorDashboard from './pages/MentorDashboard';
import AdminPanel from './pages/AdminPanel';
import CourseViewer from './pages/CourseViewer';
import CertificateDownload from './pages/CertificateDownload';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/certificates"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <CertificateDownload />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mentor/dashboard"
            element={
              <ProtectedRoute allowedRoles={['mentor']}>
                <MentorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />

          <Route
            path="/course/:courseId"
            element={
              <ProtectedRoute allowedRoles={['student', 'mentor', 'admin']}>
                <CourseViewer />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
