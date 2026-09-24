import { useState } from 'react';
import { useSearchRepos, useRepoDetails, useLanguages } from '../hooks/useRepository';
import { useDebounce } from '../hooks/useDebounce';
import { GitCompare, X, Star, GitFork, AlertCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import SearchBar from '../components/ui/SearchBar';
import LanguageChart from '../components/charts/LanguageChart';
import Skeleton from '../components/ui/Skeleton';
import PagesNavbar from '../components/layout/PagesNavbar'

function CompareCard({title, owner, repo, onRemove}) {
  const {data, loading} = useRepoDetails(owner, repo);
  const { data:languages, loading:langLoading } = useLanguages(owner, repo);

  if(loading){
    return (
      <div className='space-y-4'>
       <div className='flex items-center justify-between'>
        <h3 className='font-semibold text-gray-900 dark:text-white'>
          {title}
        </h3>
        <button onClick={onRemove}
         aria-label={`Remove ${title} from comparison`}
         className='p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded'>
          <X className='w-4 h-4 text-gray-400'/>
         </button>
       </div>
       <Skeleton className="h-48 w-full" />
       <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (!data) return null;

  return (



    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={data.owner.avatar_url} alt="" className="w-8 h-8 rounded-full" />
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{data.full_name}</h3>
        </div>
        <button
          onClick={onRemove}
          aria-label={`Remove ${data.full_name} from comparison`}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Star className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
          <p className="font-bold text-gray-900 dark:text-white">{data.stargazers_count.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Stars</p>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <GitFork className="w-4 h-4 text-blue-500 mx-auto mb-1" />
          <p className="font-bold text-gray-900 dark:text-white">{data.forks_count.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Forks</p>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-500 mx-auto mb-1" />
          <p className="font-bold text-gray-900 dark:text-white">{data.open_issues_count.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Issues</p>
        </div>
      </div>

      <LanguageChart data={languages} loading={langLoading} />
    </div>
  )
 
}

export default function Compare() {
  const [repos, setRepos] = useState([
    { owner: 'facebook', repo: 'react', id: 1 },
    { owner: 'vuejs', repo: 'vue', id: 2 },
  ]);
  const [showSearch, setShowSearch] = useState(false);

  const addRepo = (owner, repo) => {
    if (repos.length >= 2) return;
    setRepos([...repos, { owner, repo, id: Date.now() }]);
    setShowSearch(false);
  };

  const removeRepo = (id) => {
    setRepos(repos.filter((r) => r.id !== id));
  };

  return (
    <>

     <PagesNavbar/>

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="flex items-center gap-3 mb-8">
        <GitCompare className="w-8 h-8 text-primary-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Compare Repositories</h1>
          <p className="text-gray-500 dark:text-gray-400">Side-by-side analysis of two GitHub projects</p>
        </div>
      </div>

      {repos.length < 2 && !showSearch && (
        <button
          onClick={() => setShowSearch(true)}
          className="mb-6 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          + Add Repository to Compare
        </button>
      )}
      {showSearch && (
        <div className="mb-6 max-w-xl">
          <SearchBar onSelectRepo={addRepo} />
          <button 
            onClick={() => setShowSearch(false)}
            className="mt-2 text-sm text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      )}

      {repos.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          Add repositories to start comparing
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {repos.map((r) => (
            <Card key={r.id} className="h-fit">
              <CompareCard
                title={`Repo ${repos.indexOf(r) + 1}`}
                owner={r.owner}
                repo={r.repo}
                onRemove={() => removeRepo(r.id)}
              />
            </Card>
          ))}
        </div>
      )}
    </div>
    </>
  );
  
}
