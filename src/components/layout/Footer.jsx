import { Send, X } from "lucide-react";
import { Link } from "react-router-dom";

const contactEmail = "shadanmirzanew@gmail.com";

const quickLinks = [
  { label: "Home", to: "/home" },
  { label: "Compare", to: "/compare" },
  { label: "Trending", to: "/home#trending" },
];

const analyticsTopics = [
  "Phone: +91 90847-94361",
  `Email: ${contactEmail}`,
];

function GitHubMark({ className }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.1-1.5 6.1-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.2-.4-3.8 1.4a13.2 13.2 0 0 0-6.9 0C5.4 1.2 4.2 1.6 4.2 1.6a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.1 6.4 6.1 6.7a3.4 3.4 0 0 0-.9 2.6V22" />
    </svg>
  );
}

function LinkedInMark({ className }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20.45 2H3.55C2.69 2 2 2.69 2 3.55v16.9c0 .86.69 1.55 1.55 1.55h16.9c.86 0 1.55-.69 1.55-1.55V3.55C22 2.69 21.31 2 20.45 2ZM8 19H5V9h3v10ZM6.5 7.7a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5ZM19 19h-3v-4.9c0-1.2 0-2.7-1.65-2.7s-1.9 1.3-1.9 2.6V19h-3V9h2.9v1.4h.05c.4-.75 1.4-1.55 2.9-1.55 3.1 0 3.7 2 3.7 4.6V19Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="about-us" className="scroll-mt-28 border-t border-gray-200 bg-gray-50 text-gray-900 transition-colors dark:border-slate-800 dark:bg-slate-950 dark:text-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_0.8fr_1fr_1fr] lg:gap-12">
          <section aria-labelledby="footer-newsletter-heading" className="md:col-span-2 lg:col-span-1">
            <div className="max-w-md">
              <h2 id="footer-newsletter-heading" className="text-4xl font-bold">
                Share your experience
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Help us improve RepoRadar by telling us what you think.
              </p>
              <a
                href={`mailto:${contactEmail}?subject=${encodeURIComponent("My RepoRadar Experience")}&body=${encodeURIComponent("Hi,\n\nI wanted to share my experience with RepoRadar.\n\n")}`}
                aria-label="Share your experience with RepoRadar by email"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400 sm:w-fit"
              >
                Share your experience
                <Send aria-hidden="true" className="size-4" />
              </a>
            </div>
          </section>

          <nav aria-labelledby="footer-quick-links">
            <h2 id="footer-quick-links" className="text-sm font-semibold">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-600 transition-colors hover:text-amber-700 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:text-gray-400 dark:hover:text-amber-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-labelledby="Contact Us">
            <h2 id="Contact Us" className="text-sm font-semibold">
              Contact Us
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
              {analyticsTopics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="footer-Follow">
            <h2 id="Follow Us" className="text-sm font-semibold">
              Follow Us
            </h2>
            {/* <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Explore the RepoRadar source code and project updates on GitHub.
            </p> */}
            <div >
            <a
              href="https://github.com/shadanmirza/reporadar.git"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open RepoRadar GitHub repository"
              className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-amber-300 hover:text-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-200 dark:hover:border-amber-500 dark:hover:text-amber-300"
            >
              <GitHubMark className="size-4" />
              {/* GitHub repository */}
            </a>
            
            <a
              href="https://github.com/shadanmirza/reporadar.git"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open LinkedIn Profile"
              className="mt-3 ml-2 inline-flex min-h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-amber-300 hover:text-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-200 dark:hover:border-amber-500 dark:hover:text-amber-300"
            >
              <LinkedInMark className="size-4" />
              {/* GitHub repository */}
            </a>

            <a
              href="https://github.com/shadanmirza/reporadar.git"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open X Account"
              className="mt-3 ml-2 inline-flex min-h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-amber-300 hover:text-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-200 dark:hover:border-amber-500 dark:hover:text-amber-300"
            >
              <X className="size-4" />              
            </a>
            
            </div>
          </section>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-gray-200 pt-5 text-sm text-gray-500 dark:border-slate-800 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} RepoRadar</p>
          <p className="text-xs">Repository analytics for developers.</p>
        </div>
      </div>
    </footer>
  );
}
