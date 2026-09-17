import { useNavigate } from "react-router-dom";
import { Clock, X } from 'lucide-react';
import HeroSection from "../components/layout/HeroSection";
import SearchBar from "../components/ui/SearchBar";
import Card from '../components/ui/Card';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTrendingRepos } from "../hooks/useRepository";
import RepoCard from "../components/RepoCard";
import Skeleton from "../components/ui/Skeleton"

export default function Home() {
  const navigate = useNavigate();
  const [recentSearches, setRecentSearches] = useLocalStorage('reporadar_recent', []);

  // Called when a repository is selected
  const handleSelectRepo = (owner, repo) => {
    // Save to recent searches (avoid duplicates, keep max 5)
    const newSearch = { owner, repo, timestamp: Date.now() };
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => !(s.owner === owner && s.repo === repo));
      return [newSearch, ...filtered].slice(0, 5);
    });
    
    navigate(`/repo/${owner}/${repo}`);
  
  };

   const removeRecent = (e, owner, repo) => {
    e.stopPropagation();
    setRecentSearches((prev) => 
      prev.filter((s) => !(s.owner === owner && s.repo === repo))
    );
  };

  const { data: trendingData, loading: trendingLoading } = useTrendingRepos();

  return (
    <div>
      {/* =========================
          Hero Section
      ========================== */}
      <HeroSection />



      {/* =========================
          Search Section
      ========================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <SearchBar onSelectRepo={handleSelectRepo} />
      </div>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Searches
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
            {recentSearches.map((search) => (
              <Card 
                key={`${search.owner}-${search.repo}`}
                className="cursor-pointer hover:shadow-md transition-shadow group"
                onClick={() => navigate(`/repo/${search.owner}/${search.repo}`)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {search.owner}/{search.repo}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(search.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => removeRecent(e, search.owner, search.repo)}
                    className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Trending Repos Section */}     
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
     Trending Repositories
    </h2>
  
    {trendingLoading ? (
     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
     </div>
     ) : (
     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {trendingData?.items?.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
     </div>
    )}
    </div>
    </div>
  );
}