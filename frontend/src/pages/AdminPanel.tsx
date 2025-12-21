// import { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { courseService, adminService } from '../services/auth';
// import { Course } from '../types';
// import Navbar from '../components/Navbar';
// import CourseCard from '../components/CourseCard';
// import { BookOpen, Users, TrendingUp, AlertCircle } from 'lucide-react';

// interface Statistics {
//   totalUsers: number;
//   totalCourses: number;
//   totalStudents: number;
//   totalMentors: number;
//   averageCompletion: number;
// }

// const AdminPanel = () => {
//   const { role } = useAuth();
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [statistics, setStatistics] = useState<Statistics>({
//     totalUsers: 0,
//     totalCourses: 0,
//     totalStudents: 0,
//     totalMentors: 0,
//     averageCompletion: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [coursesData] = await Promise.all([
//         courseService.getMyCourses(),
//         // adminService.getStatistics(),
//       ]);
//       setCourses(coursesData);
//       // setStatistics(statsData);
//     } catch (err) {
//       setError('Failed to load data. Please try again later.');
//       console.error('Error fetching data:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Admin Panel
//           </h1>
//           <p className="text-gray-600">Manage the learning management system</p>
//         </div>

//         {error && (
//           <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4 flex items-start space-x-3">
//             <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
//             <p className="text-sm text-red-800">{error}</p>
//           </div>
//         )}

//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 mb-1">Total Users</p>
//                     <p className="text-3xl font-bold text-gray-900">{statistics.totalUsers}</p>
//                   </div>
//                   <Users className="h-12 w-12 text-blue-600 opacity-80" />
//                 </div>
//               </div>

//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 mb-1">Total Courses</p>
//                     <p className="text-3xl font-bold text-gray-900">{statistics.totalCourses}</p>
//                   </div>
//                   <BookOpen className="h-12 w-12 text-green-600 opacity-80" />
//                 </div>
//               </div>

//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 mb-1">Students</p>
//                     <p className="text-3xl font-bold text-gray-900">{statistics.totalStudents}</p>
//                   </div>
//                   <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
//                     <span className="text-2xl">🎓</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 mb-1">Avg Completion</p>
//                     <p className="text-3xl font-bold text-gray-900">
//                       {statistics.averageCompletion}%
//                     </p>
//                   </div>
//                   <TrendingUp className="h-12 w-12 text-green-600 opacity-80" />
//                 </div>
//               </div>
//             </div>

//             <section>
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-semibold text-gray-900">All Courses</h2>
//                 <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
//                   Create New Course
//                 </button>
//               </div>

//               {courses.length === 0 ? (
//                 <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
//                   <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Yet</h3>
//                   <p className="text-gray-600 mb-4">Create your first course to get started.</p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {courses.map((course) => (
//                     <CourseCard
//                       key={course.id}
//                       course={course}
//                       viewPath={`/course/${course.id}`}
//                     />
//                   ))}
//                 </div>
//               )}
//             </section>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { adminService } from '../services/auth';
import { AlertCircle } from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'mentor' | 'admin';
  approved: boolean;
}

const AdminPanel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminService.getUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const approveMentor = async (userId: string) => {
    try {
      await adminService.approveMentor(userId);
      fetchUsers(); // refresh list
    } catch {
      setError('Failed to approve mentor');
    }
  };

  const pendingMentors = users.filter(
    (u) => u.role === 'mentor' && !u.approved
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
        <p className="text-gray-600 mb-6">
          Approve mentors and manage users
        </p>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 p-3 rounded flex gap-2">
            <AlertCircle className="text-red-600" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {loading ? (
          <div>Loading users...</div>
        ) : pendingMentors.length === 0 ? (
          <div className="bg-white p-6 rounded shadow">
            <p className="text-gray-600">No pending mentor approvals 🎉</p>
          </div>
        ) : (
          <div className="bg-white rounded shadow divide-y">
            {pendingMentors.map((user) => (
              <div
                key={user._id}
                className="flex justify-between items-center p-4"
              >
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>

                <button
                  onClick={() => approveMentor(user._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Approve
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
