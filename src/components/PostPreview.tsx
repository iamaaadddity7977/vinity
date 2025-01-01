import React from 'react';
import { X } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import { BlogPost } from '../types';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PostPreviewProps {
  post: BlogPost;
  onClose: () => void;
}

export function PostPreview({ post, onClose }: PostPreviewProps) {
  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-4xl w-full max-h-[90vh] overflow-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          <X className="h-6 w-6" />
        </button>
        
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{post.title}</h2>
        
        {post.fileType === 'application/pdf' ? (
          <Document file={post.fileUrl}>
            <Page pageNumber={1} />
          </Document>
        ) : (
          <iframe
            src={post.fileUrl}
            className="w-full h-[70vh] bg-white dark:bg-gray-700"
            title={post.title}
          />
        )}
      </div>
    </div>
  );
}