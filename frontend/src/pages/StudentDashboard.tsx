import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { courseService } from '../services/auth';
import { Course } from '../types';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';
import { BookOpen, AlertCircle } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await courseService.getStudentCourses();
      setCourses(data);
    } catch (err) {
      setError('Failed to load courses. Please try again later.');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const inProgressCourses = courses.filter((c) => c.progress && c.progress > 0 && c.progress < 100);
  const notStartedCourses = courses.filter((c) => !c.progress || c.progress === 0);
  const completedCourses = courses.filter((c) => c.progress === 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4 flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Assigned</h3>
            <p className="text-gray-600">Contact your mentor to get started with courses.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {inProgressCourses.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">In Progress</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {inProgressCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      viewPath={`/course/${course.id}`}
                      showProgress
                    />
                  ))}
                </div>
              </section>
            )}

            {notStartedCourses.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Start Learning</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {notStartedCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      viewPath={`/course/${course.id}`}
                    />
                  ))}
                </div>
              </section>
            )}

            {completedCourses.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Completed</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      viewPath={`/course/${course.id}`}
                      showProgress
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
