import { useState, useEffect } from 'react';
import { certificateService } from '../services/auth';
import { Certificate } from '../types';
import Navbar from '../components/Navbar';
import { Award, Download, AlertCircle, Calendar } from 'lucide-react';

const CertificateDownload = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const data = await certificateService.getCertificates();
      setCertificates(data);
    } catch (err) {
      setError('Failed to load certificates. Please try again later.');
      console.error('Error fetching certificates:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (certificateId: string) => {
    try {
      setDownloadingId(certificateId);
      const url = await certificateService.downloadCertificate(certificateId);
      window.open(url, '_blank');
    } catch (err) {
      console.error('Error downloading certificate:', err);
      setError('Failed to download certificate. Please try again.');
    } finally {
      setDownloadingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Certificates</h1>
          <p className="text-gray-600">Download your course completion certificates</p>
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
        ) : certificates.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-200">
            <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Certificates Yet
            </h3>
            <p className="text-gray-600">
              Complete a course to earn your first certificate!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate) => (
              <div
                key={certificate.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 flex items-center justify-center">
                  <Award className="h-20 w-20 text-white" />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {certificate.courseTitle}
                  </h3>

                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>Issued: {formatDate(certificate.issuedDate)}</span>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded-md p-3">
                      <p className="text-sm font-medium text-green-900 mb-1">
                        Certificate of Completion
                      </p>
                      <p className="text-xs text-green-700">
                        This certifies that {certificate.studentName} has successfully completed
                        this course.
                      </p>
                    </div>

                    <button
                      onClick={() => handleDownload(certificate.id)}
                      disabled={downloadingId === certificate.id}
                      className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>
                        {downloadingId === certificate.id ? 'Downloading...' : 'Download Certificate'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateDownload;
