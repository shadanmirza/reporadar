import { useState } from "react";
import { Loader2, Search, GitBranch } from "lucide-react";

import { useDebounce } from "../../hooks/useDebounce";
import { useSearchRepos } from "../../hooks/useRepository";

const quickSuggestions = [
  "facebook/react",
  "vercel/next.js",
  "microsoft/vscode",
  "tailwindlabs/tailwindcss",
];

export default function SearchBar({ onSelectRepo }) {
  const [query, setQuery] = useState("");

  // Wait 600ms after user stops typing
  const debouncedQuery = useDebounce(query, 600);

  // Fetch repositories
  const { data, loading, error } = useSearchRepos(debouncedQuery);


  console.log("query:", query);
  console.log("debouncedQuery:", debouncedQuery);
  console.log("data:", data);
  console.log("loading:", loading);
  console.log("error:", error);

  const handleSelect = (owner, repo) => {
    onSelectRepo(owner, repo);
    setQuery("");
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search repositories (e.g., facebook/react)..."
          className="
            w-full
            pl-12
            pr-12
            py-4
            rounded-xl
            border
            border-gray-200
            dark:border-gray-700
            bg-white
            dark:bg-gray-800
            text-gray-900
            dark:text-white
            placeholder-gray-400
            focus:outline-none
            focus:ring-2
            focus:ring-primary-500
            shadow-lg
            transition-all
          "
        />

        {loading && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-500 animate-spin" />
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
          ⚠️ {error}
        </div>
      )}

      {/* Results Dropdown */}
      {data?.items?.length > 0 && query && (
        <ul className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {data.items.map((repo) => (
            <li
              key={repo.id}
              onClick={() =>
                handleSelect(repo.owner.login, repo.name)
              }
              className="
                px-4
                py-3
                hover:bg-gray-50
                dark:hover:bg-gray-700
                cursor-pointer
                border-b
                border-gray-100
                dark:border-gray-700
                last:border-b-0
                transition-colors
              "
            >
              <div className="flex items-center gap-3">
                
                <img
                  src={repo.owner.avatar_url}
                  alt={repo.owner.login}
                  className="w-10 h-10 rounded-full"
                />

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white truncate">
                    {repo.full_name}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {repo.description || "No description available"}
                  </p>

                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                    
                    <span className="flex items-center gap-1">
                      ⭐ {repo.stargazers_count.toLocaleString()}
                    </span>

                    <span className="flex items-center gap-1">
                      <GitBranch className="w-3 h-3" />
                      {repo.forks_count.toLocaleString()}
                    </span>

                    <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700">
                      {repo.language || "N/A"}
                    </span>

                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* No Results */}
      {debouncedQuery &&
        !loading &&
        data?.items?.length === 0 && (
          <div className="mt-2 p-4 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            No repositories found for "{debouncedQuery}"
          </div>
        )}
    </div>
  );
}