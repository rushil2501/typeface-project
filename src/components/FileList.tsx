import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { fetchFiles, uploadFile } from "../store/filesSlice";
import type { AppDispatch, RootState } from "../store/store";
import { Upload, File, Image, FileText } from "lucide-react";
import { formatFileSize } from "../utils/formatters";

export default function FileList() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { files, status, error } = useSelector(
    (state: RootState) => state.files
  );

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        dispatch(uploadFile(file));
      });
    },
    [dispatch]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
      "text/plain": [".txt"],
      "application/json": [".json"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchFiles());
    }
  }, [status, dispatch]);

  const getFileIcon = (mimetype: string) => {
    if (mimetype.startsWith("image/"))
      return <Image className="w-6 h-6 text-blue-500" />;
    if (mimetype === "text/plain")
      return <FileText className="w-6 h-6 text-green-500" />;
    return <File className="w-6 h-6 text-gray-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:bg-gray-100"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-blue-400" />
        <p className="mt-2 text-lg font-semibold text-gray-800">
          Drag & Drop files here, or <span className="text-blue-500 underline">browse</span>
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Supported: Images (JPG, PNG), Text, JSON (Max: 5MB)
        </p>
      </div>

      {/* Loading Indicator */}
      {status === "loading" && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading files...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-300 text-red-700 p-4 rounded-md shadow">
          <p>{error}</p>
        </div>
      )}

      {/* File List */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {files.length > 0 ? (
            files.map((file) => (
              <li
                key={file._id}
                className="p-4 hover:bg-gray-100 cursor-pointer flex items-center transition"
                onClick={() => navigate(`/file/${file._id}`)}
              >
                {getFileIcon(file.mimetype)}
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {file.originalName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)} •{" "}
                    {new Date(file.uploadDate).toLocaleDateString()}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <li className="p-6 text-center text-gray-500">
              No files uploaded yet.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
