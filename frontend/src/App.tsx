import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import MentorDashboard from './pages/MentorDashboard';
import AdminPanel from './pages/AdminPanel';
// import CourseViewer from './pages/CourseViewer';
import CertificateDownload from './pages/CertificateDownload';

import { useAuth } from './context/AuthContext';
import CourseChapters from './pages/CourseChapters';

const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading, role } = useAuth();

  if (isLoading) return null;

  if (isAuthenticated) {
    switch (role) {
      case 'student':
        return <Navigate to="/student/dashboard" replace />;
      case 'mentor':
        return <Navigate to="/mentor/dashboard" replace />;
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return children;
};


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            }
          />


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

          {/* <Route
            path="/course/:courseId/chapters"
            element={
              <ProtectedRoute allowedRoles={['student', 'mentor', 'admin']}>
                <CourseViewer />
              </ProtectedRoute>
            }
          /> */}

          <Route
            path="/courses/69440f798182c0ccd9ff967e/chapters"
            element={<CourseChapters />}
          />

          {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
