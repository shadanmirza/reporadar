import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Moon, Sun, BarChart3, Menu, X, Home, Scale, CircleHelp, Info } from 'lucide-react';
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
  const [open, setOpen] = useState(false);

  const navLinks = [
    { to: '/home', label: 'Home', icon: Home, },
    { to: '/compare', label: 'Compare', icon: Scale, },
    { href: '#faq', label: 'FAQ', icon: CircleHelp, },
    { href: '#about-us', label: 'About Us', icon: Info, },
  ];

  const isActive = (path) => location.pathname === path;

  function renderNavLink(link, mobile = false) {
    const Icon = link.icon;
    const active = link.to && isActive(link.to);
    const className = mobile
      ? `block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          active
            ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20'
            : 'text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5'
        }`
      : `relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
          active
            ? 'text-amber-600 dark:text-amber-400'
            : 'text-black dark:text-white hover:text-white hover:bg-white/5'
        }`;
    const children = mobile ? (
      link.label
    ) : (
      <>
        <Icon className="h-4 w-4" />
        {link.label}
      </>
    );

    if (link.href) {
      return (
        <a
          key={link.href}
          href={link.href}
          onClick={() => setOpen(false)}
          className={className}
        >
          {children}
        </a>
      );
    }

    return (
      <Link key={link.to} to={link.to} className={className}>
        {children}
      </Link>
    );
  }

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4  ">

      <nav className="max-w-6xl mx-auto
          flex items-center justify-between
          h-15 px-4 sm:px-5
          rounded-2xl
          border border-white/10
          dark:border-[#302e2c]
          dark:bg-[#0B1120]/80
          backdrop-blur-xl
          shadow-lg shadow-black/10">

        {/* Logo */}
        <Link to='/' className="flex items-center gap-2.5 shrink-0 group">
          <div className='flex h-9 w-9 items-center justify-center rounded-[9px] bg-amber-100 dark:bg-amber-900/30'>
            <BarChart3 className="w-5 h-5 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <span className='text-lg font-bold'>
            Repo<span className="text-yellow-400">Reader</span>
          </span>
        </Link>



      {/* Navigation Links - centered between logo and buttons */}
      <div className='absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 lg:flex'>
        {navLinks.map((link) => renderNavLink(link))}
      </div>



        {/* Right Side */}
        <div className="flex items-center gap-1 ml-auto shrink-0">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open GitHub in a new tab"
            className="hidden md:inline-flex p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
          >
            <GitHubIcon className="w-5 h-5" />
          </a>

          
          

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-amber-100 dark:border-[#302e2c] px-5 py-4 space-y-1 bg-white dark:bg-[#171615]">
          {navLinks.map((link) => renderNavLink(link, true))}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <GitHubIcon className="w-4 h-4" />
            GitHub
          </a>
          <Link
            to="/get-started"
            className="mt-2 block rounded-md bg-amber-600 px-3 py-2 text-center text-sm font-medium text-white
                       transition-colors hover:bg-amber-700 dark:bg-amber-500 dark:text-black dark:hover:bg-amber-400"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  )
}

export default Navbar
