import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FileList from './components/FileList';
import FileView from './components/FileView';
import { Upload, FolderOpen } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <FolderOpen className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold text-gray-900">DropBox Clone</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<FileList />} />
          <Route path="/file/:id" element={<FileView />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;