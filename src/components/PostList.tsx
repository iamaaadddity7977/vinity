import React from 'react';
import { Download, Trash2, FileText, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { BlogPost } from '../types';
import { PostPreview } from './PostPreview';

interface PostListProps {
  posts: BlogPost[];
  onDelete: (id: string) => void;
  onDownload: (post: BlogPost) => void;
}

export function PostList({ posts, onDelete, onDownload }: PostListProps) {
  const [previewPost, setPreviewPost] = React.useState<BlogPost | null>(null);
  const [expandedPosts, setExpandedPosts] = React.useState<Set<string>>(new Set());

  const togglePost = (id: string) => {
    setExpandedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => {
        const isExpanded = expandedPosts.has(post.id);
        
        return (
          <div 
            key={post.id} 
            className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden transition-all duration-200 ease-in-out"
          >
            <div 
              className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => togglePost(post.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {post.title}
                    </h2>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {post.date}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4" onClick={e => e.stopPropagation()}>
                  {post.fileUrl && (
                    <button
                      onClick={() => setPreviewPost(post)}
                      className="inline-flex items-center p-2 border border-transparent rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      title="Preview"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    onClick={() => onDownload(post)}
                    className="inline-flex items-center p-2 border border-transparent rounded-full text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    title="Download"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(post.id)}
                    className="inline-flex items-center p-2 border border-transparent rounded-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            
            {isExpanded && (
              <div className="px-6 pb-6 animate-fadeIn">
                {post.content && (
                  <p className="mt-4 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                    {post.content}
                  </p>
                )}
                {post.file && (
                  <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>{post.file.name}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
      
      {previewPost && (
        <PostPreview post={previewPost} onClose={() => setPreviewPost(null)} />
      )}
    </div>
  );
}