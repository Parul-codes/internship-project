import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseService } from '../services/auth';
import { Course, Chapter, CourseProgress } from '../types';
import Navbar from '../components/Navbar';
import ProgressBar from '../components/ProgressBar';
import { ChevronLeft, ChevronRight, CheckCircle, Lock, AlertCircle, Award } from 'lucide-react';

const CourseViewer = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [markingComplete, setMarkingComplete] = useState(false);

  useEffect(() => {
    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const [courseData, chaptersData, progressData] = await Promise.all([
        courseService.getCourseById(courseId!),
        courseService.getCourseChapters(courseId!),
        courseService.getCourseProgress(courseId!),
      ]);

      setCourse(courseData);
      setChapters(chaptersData.sort((a, b) => a.order - b.order));
      setProgress(progressData);

      if (progressData.lastAccessedChapter !== undefined) {
        setCurrentChapterIndex(progressData.lastAccessedChapter);
      }
    } catch (err) {
      setError('Failed to load course data. Please try again later.');
      console.error('Error fetching course data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async () => {
    const currentChapter = chapters[currentChapterIndex];
    if (!currentChapter || currentChapter.isCompleted) return;

    try {
      setMarkingComplete(true);
      await courseService.markChapterComplete(courseId!, currentChapter.id);
      await fetchCourseData();
    } catch (err) {
      console.error('Error marking chapter complete:', err);
      setError('Failed to mark chapter as complete. Please try again.');
    } finally {
      setMarkingComplete(false);
    }
  };

  const handleNext = () => {
    if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    }
  };

  const handleChapterSelect = (index: number) => {
    const chapter = chapters[index];
    if (!chapter.isLocked) {
      setCurrentChapterIndex(index);
    }
  };

  const currentChapter = chapters[currentChapterIndex];
  const isLastChapter = currentChapterIndex === chapters.length - 1;
  const courseCompleted = progress?.percentage === 100;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error && !course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{course?.title}</h1>
          <p className="text-gray-600 mb-6">{course?.description}</p>
          <ProgressBar percentage={progress?.percentage || 0} />
        </div>

        {courseCompleted && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Award className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="text-lg font-semibold text-green-900">Course Completed!</h3>
                <p className="text-sm text-green-700">You can now download your certificate.</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/student/certificates')}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              View Certificate
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Chapters</h3>
              <div className="space-y-2">
                {chapters.map((chapter, index) => (
                  <button
                    key={chapter.id}
                    onClick={() => handleChapterSelect(index)}
                    disabled={chapter.isLocked}
                    className={`w-full text-left p-3 rounded-md transition-colors ${
                      currentChapterIndex === index
                        ? 'bg-blue-50 border-2 border-blue-600'
                        : chapter.isLocked
                        ? 'bg-gray-50 cursor-not-allowed opacity-60'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Chapter {chapter.order}</span>
                      {chapter.isCompleted ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : chapter.isLocked ? (
                        <Lock className="h-4 w-4 text-gray-400" />
                      ) : null}
                    </div>
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">
                      {chapter.title}
                    </p>
                    {chapter.duration && (
                      <p className="text-xs text-gray-500 mt-1">{chapter.duration}</p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {currentChapter ? (
                <>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">
                        Chapter {currentChapter.order} of {chapters.length}
                      </span>
                      {currentChapter.isCompleted && (
                        <span className="flex items-center space-x-1 text-sm text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span>Completed</span>
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {currentChapter.title}
                    </h2>
                  </div>

                  {currentChapter.videoUrl && (
                    <div className="mb-6 bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
                      <p className="text-white">Video Player: {currentChapter.videoUrl}</p>
                    </div>
                  )}

                  <div className="prose max-w-none mb-8">
                    <div className="text-gray-700 whitespace-pre-wrap">
                      {currentChapter.content}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <button
                      onClick={handlePrevious}
                      disabled={currentChapterIndex === 0}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                      <span>Previous</span>
                    </button>

                    <div className="flex items-center space-x-3">
                      {!currentChapter.isCompleted && (
                        <button
                          onClick={handleMarkComplete}
                          disabled={markingComplete}
                          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
                        >
                          {markingComplete ? 'Marking...' : 'Mark as Complete'}
                        </button>
                      )}

                      <button
                        onClick={handleNext}
                        disabled={isLastChapter}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <span>Next</span>
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No chapter selected</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseViewer;
