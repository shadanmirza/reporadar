import { useState } from "react";
import { Loader2, Search } from "lucide-react";

import Input from "./Input"

const quickSuggestions = [
  "facebook/react",
  "vercel/next.js",
  "microsoft/vscode",
  "tailwindlabs/tailwindcss",
];

export default function SearchBar({ onSelectRepo }) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    // Don't search if the input is empty
    if (!trimmedQuery) return;

    // Temporary loading state
    setIsSearching(true);

    // TODO: Replace this with the real GitHub API call
    setTimeout(() => {
      setIsSearching(false);

      // Temporary repository
      onSelectRepo?.("facebook", "react");
    }, 800);
  };

  const handleSuggestionClick = (repo) => {
    const [owner, name] = repo.split("/");

    onSelectRepo?.(owner, name);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mx-auto w-full max-w-2xl"
    >
      {/* Search Input */}
      <div className="relative">
        <Search
          className="
            pointer-events-none
            absolute left-4 top-1/2
            h-5 w-5
           -translate-y-1/2
            text-gray-400
          "
        />

        <Input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search repositories (e.g., facebook/react)..."
          className="
            py-4 pl-12 pr-12
            text-lg
            shadow-lg
          "
        />

        {/* Loading Icon */}
        {isSearching && (
          <Loader2
            className="
              pointer-events-none
              absolute right-4 top-1/2
              h-5 w-5
              -translate-y-1/2
              animate-spin
              text-primary-600
            "
          />
        )}
      </div>

      {/* Quick Suggestions */}
      <div
        className="
          mt-3
          flex flex-wrap
          justify-center
          gap-2
        "
      >
        {quickSuggestions.map((repo) => (
          <button
            key={repo}
            type="button"
            onClick={() => handleSuggestionClick(repo)}
            className="
              rounded-full
              bg-gray-100
              px-3 py-1
              text-xs
              text-gray-600
              transition-colors

              hover:bg-primary-100
              hover:text-primary-700

              dark:bg-gray-800
              dark:text-gray-400
              dark:hover:bg-primary-900/30
              dark:hover:text-primary-300
            "
          >
            {repo}
          </button>
        ))}
      </div>
    </form>
  );
}