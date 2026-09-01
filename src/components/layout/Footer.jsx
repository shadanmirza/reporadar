import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className=" w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2026 RepoRadar. Built for learning.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}