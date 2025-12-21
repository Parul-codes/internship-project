import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    switch (role) {
      case 'student':
        return '/student/dashboard';
      case 'mentor':
        return '/mentor/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/';
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to={getDashboardLink()} className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-semibold text-gray-900">Internship LMS</span>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            {role === 'student' && (
              <>
                <Link
                  to="/student/dashboard"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  My Courses
                </Link>
                <Link
                  to="/student/certificates/"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Certificates
                </Link>
              </>
            )}

            {role === 'mentor' && (
              <Link
                to="/mentor/dashboard"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                My Courses
              </Link>
            )}

            {role === 'admin' && (
              <Link
                to="/admin/dashboard"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Admin Panel
              </Link>
            )}

            <div className="flex items-center space-x-3 border-l border-gray-200 pl-6">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-600" />
                <div className="text-sm">
                  <p className="text-gray-900 font-medium">{User?.name}</p>
                  <p className="text-gray-500 text-xs capitalize">{role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
