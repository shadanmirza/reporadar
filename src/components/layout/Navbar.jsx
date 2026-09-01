import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Moon, Sun, BarChart3 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

// Inline GitHub SVG (lucide-react removed brand icons)
const GitHubIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { to: '/home', label: 'Home' },
    { to: '/repo', label: 'RepoProfile' },
    { to: '/compare', label: 'Compare' },
    // { to: '/about', label: 'About Us' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className='mx-auto relative mt-8 flex h-16 w-[calc(100%-40px)] max-w-6xl bg-white items-center rounded-[17px] border-amber-100
                   border dark:border-[#302e2c] dark:bg-[#171615] px-5 text-black dark:text-white'>

      {/* Logo - mr-auto pushes everything else to the right */}
      <Link to='/' className="flex items-center gap-2.5  mr-auto group shrink-0">
        <div className='flex h-10 w-10 items-center justify-center rounded-[9px] bg-amber-100 dark:bg-amber-900/30'>
          <BarChart3 className="w-6 h-6 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
        </div>
        <span className='text-xl font-bold text-black dark:text-white'>
          RepoReader
        </span>
      </Link>

      {/* Navigation Links - centered between logo and buttons */}
      <div className='flex absolute left-1/2 -translate-x-1/2  items-center sm:flex gap-5 md:gap-6'>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-[15px] md:text-[17px] font-semibold transition hover:text-gray-400 whitespace-nowrap ${
              isActive(link.to)
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-black dark:text-white'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right Side - ml-auto pushes to far right */}
      <div className="flex items-center gap-1 ml-auto shrink-0">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
        >
          <GitHubIcon className="w-5 h-5" />
        </a>
      </div>
    </div>
  )
}

export default Navbar