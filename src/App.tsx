import React, { useState } from 'react';
import { BlogPost } from './types';
import { Header } from './components/Header';
import { PostForm } from './components/PostForm';
import { PostList } from './components/PostList';
import { createFileUrl, revokeFileUrl, downloadPost } from './utils/fileHelpers';

export default function App() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const handleUpload = (newPost: Omit<BlogPost, 'id' | 'date'>) => {
    const post: BlogPost = {
      ...newPost,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      fileUrl: newPost.file ? createFileUrl(newPost.file) : undefined,
    };
    setPosts([...posts, post]);
  };

  const handleDelete = (id: string) => {
    const post = posts.find(p => p.id === id);
    if (post?.fileUrl) {
      revokeFileUrl(post.fileUrl);
    }
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <PostForm onSubmit={handleUpload} />
          <PostList
            posts={posts}
            onDelete={handleDelete}
            onDownload={downloadPost}
          />
        </div>
      </main>
    </div>
  );
}