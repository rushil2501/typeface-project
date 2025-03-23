import React from "react";
import { Routes, Route } from "react-router-dom";
import FileList from "./components/FileList";
import FileView from "./components/FileView";
import { FolderOpen } from "lucide-react";
import { FaLinkedin, FaGlobe } from "react-icons/fa";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center">
              <FolderOpen className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-extrabold text-gray-900 tracking-wide">
                DropBox Clone
              </span>
            </div>

            {/* Upload Button (Optional) */}
            {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
              Upload File
            </button> */}
            <div className="flex flex-col items-end text-sm text-gray-800 border-l pl-4 border-gray-500">
              <span className="font-semibold text-gray-900">
                Built by Rushil
              </span>
              <div className="flex gap-4 mt-2">
                <a
                  href="https://www.linkedin.com/in/rushil-shah2501"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
                >
                  <FaLinkedin className="text-lg" /> LinkedIn
                </a>
                <a
                  href="https://rushil2501.github.io/Rushil-Portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors duration-300"
                >
                  <FaGlobe className="text-lg" /> Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<FileList />} />
          <Route path="/file/:id" element={<FileView />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md py-4 mt-auto">
        <div className="text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} DropBox Clone. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
