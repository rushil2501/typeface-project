import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { ArrowLeft, Download } from "lucide-react";
import { formatFileSize } from "../utils/formatters";

export default function FileView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const file = useSelector((state: RootState) =>
    state.files.files.find((f) => f._id === id)
  );

  if (!file) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-gray-500">File not found.</p>
      </div>
    );
  }

  const handleDownload = () => {
    window.location.href = `http://localhost:3000/api/files/${id}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-medium">Back to Files</span>
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          <Download className="w-5 h-5 mr-2" />
          Download
        </button>
      </div>

      {/* File Details Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {file.originalName}
        </h1>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-gray-500">File Type</p>
            <p className="font-medium text-gray-800">{file.mimetype}</p>
          </div>
          <div>
            <p className="text-gray-500">Size</p>
            <p className="font-medium text-gray-800">
              {formatFileSize(file.size)}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Uploaded On</p>
            <p className="font-medium text-gray-800">
              {new Date(file.uploadDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Image Preview */}
        {file.mimetype.startsWith("image/") && (
          <div className="mt-6 flex justify-center">
            <img
              src={`http://localhost:3000/api/files/${id}`}
              alt={file.originalName}
              className="max-w-lg w-full rounded-lg shadow-lg border border-gray-200"
            />
          </div>
        )}
      </div>
    </div>
  );
}
