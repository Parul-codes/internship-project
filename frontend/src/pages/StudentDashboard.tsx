// import { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { courseService } from '../services/auth';
// import { Course } from '../types';
// import Navbar from '../components/Navbar';
// import CourseCard from '../components/CourseCard';
// import { BookOpen, AlertCircle } from 'lucide-react';

// const StudentDashboard = () => {
//   const { role } = useAuth();
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');


//   useEffect(() => {
//     if (role) {
//       fetchCourses();
//     }
//   }, [role]);


//   const fetchCourses = async () => {
//     console.log(
//       'TOKEN USED:',
//       localStorage.getItem('token')
//     );

//     try {
//       setLoading(true);
//       const data = await courseService.getMyCourses();
//       setCourses(data);
//     } catch (err) {
//       setError('Failed to load courses. Please try again later.');
//       console.error('Error fetching courses:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inProgressCourses = courses.filter(
//     (c) => typeof c.progress === 'number' && c.progress > 0 && c.progress < 100
//   );

//   const notStartedCourses = courses.filter(
//     (c) => c.progress === undefined || c.progress === 0
//   );

//   const completedCourses = courses.filter(
//     (c) => c.progress === 100
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Welcome back, {role}!
//           </h1>
//           <p className="text-gray-600">Continue your learning journey</p>
//         </div>

//         {error && (
//           <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4 flex items-start space-x-3">
//             <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
//             <p className="text-sm text-red-800">{error}</p>
//           </div>
//         )}

//         {/* {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           </div>
//         ) : courses.length === 0 ? (
//           <div className="text-center py-20">
//             <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Assigned</h3>
//             <p className="text-gray-600">Contact your mentor to get started with courses.</p>
//           </div>
//         ) : (
//           <div className="space-y-12">
//             {inProgressCourses.length > 0 && (
//               <section>
//                 <h2 className="text-2xl font-semibold text-gray-900 mb-6">In Progress</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {inProgressCourses.map((course) => (
//                     <CourseCard
//                       key={course.id}
//                       course={course}
//                       viewPath={`/course/${course.id}`}
//                       showProgress
//                     />
//                   ))}
//                 </div>
//               </section>
//             )}

//             {notStartedCourses.length > 0 && (
//               <section>
//                 <h2 className="text-2xl font-semibold text-gray-900 mb-6">Start Learning</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {notStartedCourses.map((course) => (
//                     <CourseCard
//                       key={course.id}
//                       course={course}
//                       viewPath={`/course/${course.id}`}
//                     />
//                   ))}
//                 </div>
//               </section>
//             )}

//             {completedCourses.length > 0 && (
//               <section>
//                 <h2 className="text-2xl font-semibold text-gray-900 mb-6">Completed</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {completedCourses.map((course) => (
//                     <CourseCard
//                       key={course.id}
//                       course={course}
//                       viewPath={`/course/${course.id}`}
//                       showProgress
//                     />
//                   ))}
//                 </div>
//               </section>
//             )}
//           </div>
//         )} */}

//          {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           </div>
//         ) : courses.length === 0 ? (
//           <div className="text-center py-20">
//             <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Yet</h3>
//             <p className="text-gray-600">Contact admin to create courses.</p>
//           </div>
//         ) : (
//           <section>
//             <h2 className="text-2xl font-semibold text-gray-900 mb-6">My Courses</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {courses.map((course) => (
//                 <CourseCard
//                   key={course.id}
//                   course={course}
//                   viewPath={`/course/${course.id}`}
//                 />
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;




// // import { useEffect, useState } from 'react';
// // import Navbar from '../components/Navbar';
// // import { progressService } from '../services/auth';
// // import { useNavigate } from 'react-router-dom';
// // import { AlertCircle, Award, BookOpen } from 'lucide-react';

// // const StudentDashboard = () => {
// //   const [progress, setProgress] = useState<any>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchProgress();
// //   }, []);

// //   const fetchProgress = async () => {
// //     try {
// //       setLoading(true);
// //       const data = await progressService.getMyProgress();
// //       setProgress(data);
// //     } catch {
// //       setError('Failed to load your progress');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) {
// //     return <div className="p-10">Loading...</div>;
// //   }

// //   if (error) {
// //     return (
// //       <div className="p-10 text-red-600">
// //         <AlertCircle /> {error}
// //       </div>
// //     );
// //   }

// //   if (!progress) {
// //     return (
// //       <div className="p-10 text-gray-600">
// //         No course started yet
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <Navbar />

// //       <div className="max-w-4xl mx-auto p-6">
// //         <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

// //         <div className="bg-white p-6 rounded shadow">
// //           <BookOpen className="h-10 w-10 text-blue-600 mb-2" />
// //           <p className="mb-2">
// //             Progress: <strong>{10}%</strong>
// //           </p>

// //           <button
// //             onClick={() => navigate(`/course/${progress.chapterId}`)}
// //             className="bg-blue-600 text-white px-4 py-2 rounded mb-3"
// //           >
// //             Open Course
// //           </button>

// //           {progress.percentage === 100 && (
// //             <div className="mt-4 flex items-center gap-2 text-green-700">
// //               <Award />
// //               <span>Certificate unlocked</span>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default StudentDashboard;

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { courseService } from '../services/auth';
import { Course } from '../types';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';
import { BookOpen, AlertCircle } from 'lucide-react';

const MentorDashboard = () => {
  const { role } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await courseService.getMyCourses();
      setCourses(data);
    } catch (err) {
      setError('Failed to load courses. Please try again later.');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {role!}!
          </h1>
          <p className="text-gray-600">Manage your courses and track student progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Courses</p>
                <p className="text-3xl font-bold text-gray-900">{courses.length}</p>
              </div>
              <BookOpen className="h-12 w-12 text-blue-600 opacity-80" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                {/* <p className="text-sm text-gray-600 mb-1">Total Students</p>
                <p className="text-3xl font-bold text-gray-900">{totalStudents}</p> */}
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <p className="text-lg font-medium text-gray-800">
                  {courses.length > 0 ? 'Active Mentor' : 'No courses yet'}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Completion</p>
                <p className="text-3xl font-bold text-gray-900">
                  {courses.length > 0
                    ? Math.round(
                        courses.reduce((acc, c) => acc + (c.progress || 0), 0) / courses.length
                      )
                    : 0}
                  %
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </div>
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Yet</h3>
            <p className="text-gray-600">Contact admin to create courses.</p>
          </div>
        ) : (
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">My Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  viewPath={`/course/${course.id}`}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MentorDashboard;
