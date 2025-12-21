import { Link } from 'react-router-dom';
import { Course } from '../types';
import { BookOpen, Users } from 'lucide-react';
import ProgressBar from './ProgressBar';

interface CourseCardProps {
  course: Course;
  viewPath?: string;
  showProgress?: boolean;
}

const CourseCard = ({ course, viewPath, showProgress = false }: CourseCardProps) => {
  const progress = course.progress || 0;
  const linkPath = `/courses/69440f798182c0ccd9ff967e/chapters`;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-40 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
        <BookOpen className="h-16 w-16 text-white opacity-80" />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="space-y-3">

          {showProgress && (
            <ProgressBar percentage={progress} height="h-1.5" showLabel={false} />
          )}

          <Link
            to={linkPath}
            className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            {showProgress && progress > 0 ? 'Continue Learning' : 'View Course'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
