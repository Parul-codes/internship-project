
// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { courseService, progressService } from '../services/auth';
// import { Course, Chapter, CourseProgress } from '../types';
// import Navbar from '../components/Navbar';
// import ProgressBar from '../components/ProgressBar';
// import {
//   ChevronLeft,
//   ChevronRight,
//   CheckCircle,
//   Lock,
//   AlertCircle,
//   Award,
// } from 'lucide-react';

// const CourseViewer = () => {
//   const { courseId } = useParams<{ courseId: string }>();
//   const navigate = useNavigate();

//   const [course, setCourse] = useState<Course | null>(null);
//   const [chapters, setChapters] = useState<Chapter[]>([]);
//   const [progress, setProgress] = useState<CourseProgress | null>(null);
//   const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [markingComplete, setMarkingComplete] = useState(false);

//   useEffect(() => {
//     if (courseId) {
//       fetchCourseData();
//     }
//   }, [courseId]);

//   // const fetchCourseData = async () => {
//   //   try {
//   //     setLoading(true);

//   //     const [courseData, chaptersData, progressData] = await Promise.all([
//   //       // courseService.getCourseById(courseId!),
//   //       // courseService.getCourseChapters(courseId!),
//   //       // progressService.getMyProgress(courseId!),

//   //       courseService.getMyCourses(),
//   //       courseService.getCourseChapters(courseId!),
//   //       progressService.getMyProgress(),
//   //     ]);

//   //     setCourse(courseData);
//   //     setChapters(chaptersData.sort((a, b) => a.sequence - b.sequence));
//   //     setProgress(progressData);

//   //     if (progressData.lastAccessedChapterIndex !== undefined) {
//   //       setCurrentChapterIndex(progressData.lastAccessedChapterIndex);
//   //     }
//   //   } catch (err) {
//   //     console.error(err);
//   //     setError('Failed to load course data');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const fetchCourseData = async () => {
//   try {
//     setLoading(true);

//     const [courses, chaptersData, allProgress] = await Promise.all([
//       courseService.getMyCourses(),
//       courseService.getCourseChapters(courseId!),
//       progressService.getMyProgress(),
//     ]);

//     // ✅ pick THIS course
//     const selectedCourse = courses.find(
//       (c) => c.id === courseId
//     );

//     if (!selectedCourse) {
//       throw new Error('Course not found');
//     }

//     setCourse(selectedCourse);

//     // ✅ sort chapters
//     setChapters(chaptersData.sort((a, b) => a.sequence - b.sequence));

//     // ✅ pick progress for THIS course
    
//     const courseProgress = allProgress.find(
//       (p:CourseProgress) => p.courseId === courseId
//     ) || {
//       courseId,
//       completedChapters: [],
//       percentage: 0,
//     };

//     setProgress(courseProgress);

//     if (courseProgress.lastAccessedChapterIndex !== undefined) {
//       setCurrentChapterIndex(courseProgress.lastAccessedChapterIndex);
//     }
//   } catch (err) {
//     console.error(err);
//     setError('Failed to load course data');
//   } finally {
//     setLoading(false);
//   }
// };


//   // ✅ derived state (VERY IMPORTANT)
//   const completedChapterIds = new Set<string>(
//     progress?.completedChapters || []
//   );

//   const isChapterLocked = (index: number) => {
//     if (index === 0) return false;
//     const prevChapter = chapters[index - 1];
//     return !completedChapterIds.has(prevChapter.id);
//   };

//   const handleMarkComplete = async () => {
//     const currentChapter = chapters[currentChapterIndex];
//     if (!currentChapter) return;

//     if (completedChapterIds.has(currentChapter.id)) return;

//     try {
//       setMarkingComplete(true);
//       await progressService.completeChapter(currentChapter.id);
//       await fetchCourseData();
//     } catch (err) {
//       console.error(err);
//       setError('Failed to mark chapter complete');
//     } finally {
//       setMarkingComplete(false);
//     }
//   };

//   const handleNext = () => {
//     if (currentChapterIndex < chapters.length - 1) {
//       setCurrentChapterIndex((i) => i + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentChapterIndex > 0) {
//       setCurrentChapterIndex((i) => i - 1);
//     }
//   };

//   const handleChapterSelect = (index: number) => {
//     if (!isChapterLocked(index)) {
//       setCurrentChapterIndex(index);
//     }
//   };

//   const currentChapter = chapters[currentChapterIndex];
//   const isLastChapter = currentChapterIndex === chapters.length - 1;
//   const courseCompleted = progress?.percentage === 100;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="flex justify-center py-20">
//           <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full" />
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="max-w-3xl mx-auto p-6">
//           <div className="bg-red-50 border border-red-200 p-4 rounded flex gap-2">
//             <AlertCircle className="text-red-600" />
//             <p className="text-red-700">{error}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <div className="max-w-7xl mx-auto p-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-gray-600 mb-6"
//         >
//           <ChevronLeft /> Back
//         </button>

//         <div className="bg-white p-6 rounded shadow mb-6">
//           <h1 className="text-3xl font-bold">{course?.title}</h1>
//           <p className="text-gray-600 mb-4">{course?.description}</p>
//           <ProgressBar percentage={progress?.percentage || 0} />
//         </div>

//         {courseCompleted && (
//           <div className="bg-green-50 border border-green-200 p-4 rounded flex justify-between mb-6">
//             <div className="flex gap-2">
//               <Award className="text-green-600" />
//               <div>
//                 <h3 className="font-semibold">Course Completed</h3>
//                 <p className="text-sm">Download your certificate</p>
//               </div>
//             </div>
//             <button
//               onClick={() => navigate('/student/certificates')}
//               className="bg-green-600 text-white px-4 py-2 rounded"
//             >
//               View Certificate
//             </button>
//           </div>
//         )}

//         <div className="grid grid-cols-4 gap-6">
//           {/* CHAPTER LIST */}
//           <div className="col-span-1 bg-white p-4 rounded shadow">
//             {chapters.map((chapter, index) => {
//               const locked = isChapterLocked(index);
//               const completed = completedChapterIds.has(chapter.id);

//               return (
//                 <button
//                   key={chapter.id}
//                   onClick={() => handleChapterSelect(index)}
//                   disabled={locked}
//                   className={`w-full p-3 mb-2 rounded text-left ${
//                     index === currentChapterIndex
//                       ? 'bg-blue-100 border border-blue-600'
//                       : locked
//                       ? 'bg-gray-100 opacity-60'
//                       : 'bg-gray-50 hover:bg-gray-100'
//                   }`}
//                 >
//                   <div className="flex justify-between text-xs">
//                     <span>Chapter {chapter.sequence}</span>
//                     {completed ? (
//                       <CheckCircle className="text-green-600 h-4" />
//                     ) : locked ? (
//                       <Lock className="text-gray-400 h-4" />
//                     ) : null}
//                   </div>
//                   <p className="font-medium">{chapter.title}</p>
//                 </button>
//               );
//             })}
//           </div>

//           {/* CHAPTER VIEW */}
//           <div className="col-span-3 bg-white p-6 rounded shadow">
//             <h2 className="text-2xl font-bold mb-4">
//               {currentChapter?.title}
//             </h2>

//             {currentChapter?.videoUrl && (
//               <div className="bg-black text-white h-64 flex items-center justify-center mb-6">
//                 Video: {currentChapter.videoUrl}
//               </div>
//             )}

//             <p className="text-gray-700 mb-6">
//               {currentChapter?.description}
//             </p>

//             <div className="flex justify-between">
//               <button
//                 onClick={handlePrevious}
//                 disabled={currentChapterIndex === 0}
//                 className="px-4 py-2 bg-gray-200 rounded"
//               >
//                 <ChevronLeft />
//               </button>

//               {!completedChapterIds.has(currentChapter?.id || '') && (
//                 <button
//                   onClick={handleMarkComplete}
//                   disabled={markingComplete}
//                   className="bg-green-600 text-white px-6 py-2 rounded"
//                 >
//                   {markingComplete ? 'Marking...' : 'Mark Complete'}
//                 </button>
//               )}

//               <button
//                 onClick={handleNext}
//                 disabled={isLastChapter}
//                 className="px-4 py-2 bg-blue-600 text-white rounded"
//               >
//                 <ChevronRight />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseViewer;
