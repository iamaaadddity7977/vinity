import React from 'react';
import { BookOpen } from 'lucide-react';
import { DarkModeToggle } from './DarkModeToggle';
import { useDarkMode } from '../hooks/useDarkMode';

export function Header() {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <header className="bg-white dark:bg-gray-800 shadow transition-colors">
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BookOpen className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog Saver</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">by Your Name</p>
            </div>
          </div>
          <DarkModeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />
        </div>
      </div>
    </header>
  );
}