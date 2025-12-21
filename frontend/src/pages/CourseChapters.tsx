import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

interface Chapter {
  id: string;
  title: string;
}

const CourseChapters = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!courseId) return;

    const fetchChapters = async () => {
      try {
        const res = await api.get(`/courses/69440f798182c0ccd9ff967e/chapters`);
        setChapters(res.data);
      } catch (err) {
        setError('Failed to load course data');
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [courseId]);

  if (loading) return <div className="p-10">No Chapters Yet</div>;
  if (error) return <div className="p-10 text-red-600">{error}</div>;

  return (
    <div className="p-10">
        <Navbar/>
      <h1 className="text-2xl font-bold mb-4">Course Chapters</h1>

      {chapters.length === 0 ? (
        <p>No chapters found</p>
      ) : (
        <ul className="space-y-2">
          {chapters.map((ch) => (
            <li
              key={ch.id}
              className="p-4 border rounded bg-white shadow"
            >
              {ch.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseChapters;
