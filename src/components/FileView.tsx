import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { ArrowLeft, Download } from 'lucide-react';
import { formatFileSize } from '../utils/formatters';

export default function FileView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const file = useSelector((state: RootState) =>
    state.files.files.find((f) => f._id === id)
  );

  if (!file) {
    return (
      <div className="text-center">
        <p className="text-gray-500">File not found</p>
      </div>
    );
  }

  const handleDownload = () => {
    window.location.href = `http://localhost:3000/api/files/${id}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to files
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Download className="w-5 h-5 mr-2" />
          Download
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{file.originalName}</h1>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Type</p>
            <p className="font-medium">{file.mimetype}</p>
          </div>
          <div>
            <p className="text-gray-500">Size</p>
            <p className="font-medium">{formatFileSize(file.size)}</p>
          </div>
          <div>
            <p className="text-gray-500">Uploaded</p>
            <p className="font-medium">
              {new Date(file.uploadDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {file.mimetype.startsWith('image/') && (
          <div className="mt-6">
            <img
              src={`http://localhost:3000/api/files/${id}`}
              alt={file.originalName}
              className="max-w-full rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}