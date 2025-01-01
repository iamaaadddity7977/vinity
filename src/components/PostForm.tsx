import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { BlogPost } from '../types';

interface PostFormProps {
  onSubmit: (post: Omit<BlogPost, 'id' | 'date'>) => void;
}

export function PostForm({ onSubmit }: PostFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && (content || file)) {
      onSubmit({
        title,
        content,
        ...(file && { file, fileType: file.type }),
      });
      setTitle('');
      setContent('');
      setFile(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8 transition-colors">
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm transition-colors"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Content (optional if file is uploaded)
          </label>
          <textarea
            id="content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm transition-colors"
          />
        </div>
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Upload File (optional)
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
              file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-600
              dark:file:bg-indigo-900/50 dark:file:text-indigo-400
              hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900/70
              transition-colors"
            accept=".txt,.pdf,.doc,.docx"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Post
        </button>
      </div>
    </form>
  );
}