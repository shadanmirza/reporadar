import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Scale,
  Moon,
  Sun,
  BarChart3,
  Menu,
  X,
  User,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const GitHubIcon = ({ className }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.51-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.75 2.07 3.24 1.54.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
  </svg>
);

const githubUrl = "https://github.com";

export default function PagesNavbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/home", icon: Home },
    { name: "Compare", path: "/compare", icon: Scale },
  ];

  const themeLabel = theme === "dark" ? "Light Mode" : "Dark Mode";
  const ThemeIcon = theme === "dark" ? Sun : Moon;

  const renderLinks = (mobile = false) =>
    navLinks.map(({ name, path, icon: Icon }) => {
      const isActive = location.pathname === path;
      return (
        <Link
          key={path}
          to={path}
          onClick={mobile ? () => setIsMobileMenuOpen(false) : undefined}
          className={`relative flex items-center gap-3 rounded-xl text-sm font-medium transition-colors ${
            mobile ? "px-3 py-3" : "gap-2 px-4 py-2.5"
          } ${
            isActive
              ? "bg-amber-400/10 text-amber-400"
              : "dark:text-slate-300 text-gray-400 dark:hover:bg-white/5 hover:bg-gray-400/25 dark:hover:text-white"
          }`}
        >
          <Icon className="h-5 w-5 shrink-0" />
          {name}
          {!mobile && isActive && (
            <span className="absolute -bottom-1 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-yellow-400" />
          )}
        </Link>
      );
    });

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <nav className="mx-auto max-w-7xl rounded-2xl border border-white/10 dark:bg-[#0B1120]/80 shadow-lg shadow-black/10 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 sm:px-5">
          <Link to="/" className="group flex shrink-0 items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-amber-900/30">
              <BarChart3 className="h-5 w-5 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
            </span>
            <span className="text-lg font-bold tracking-tight dark:text-white sm:text-xl">
              Repo<span className="text-yellow-400">Reader</span>
            </span>
          </Link>

          <div className="ml-12 hidden items-center gap-2 md:flex">
            {renderLinks()}
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="hidden rounded-lg p-2 text-gray-500 dark:text-slate-300 transition-colors hover:bg-gray-400 dark:hover:bg-white/5 hover:text-white md:inline-flex"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              <ThemeIcon className="h-5 w-5" />
            </button>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GitHub"
              className="inline-flex rounded-lg p-2 text-gray-500 dark:text-slate-300 transition-colors hover:bg-gray-400 dark:hover:bg-white/5 hover:text-white"
            >
              <GitHubIcon className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="inline-flex rounded-lg p-2 text-slate-300 transition-colors hover:bg-white/5 hover:text-white md:hidden"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="pages-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <button
              type="button"
              aria-label="Open account menu"
              className="hidden items-center gap-1 rounded-xl p-1 transition-colors hover:bg-white/5 md:flex"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/20">
                <User className="h-4 w-4 text-blue-300" />
              </span>
              <ChevronDown className="hidden h-4 w-4 text-slate-500 sm:block" />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div id="pages-mobile-menu" className="border-t border-white/10 px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1">{renderLinks(true)}</div>
            <div className="my-3 border-t border-white/10" />
            <button
              type="button"
              onClick={toggleTheme}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <ThemeIcon className="h-5 w-5" />
              Toggle Theme
              <span className="ml-auto text-xs text-slate-500">{themeLabel}</span>
            </button>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GitHub"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <GitHubIcon className="h-5 w-5" />
              GitHub
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
