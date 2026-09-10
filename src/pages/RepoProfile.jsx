import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, GitFork, Eye, AlertCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Skeleton from '../components/ui/Skeleton';
import Badge from '../components/ui/Badge';
import { 
  useRepoDetails, 
  useContributors, 
  useLanguages, 
  useCommitActivity 
} from "../hooks/useRepository";

export default function RepoProfile() {
  const { owner, repo } = useParams();

  // Fetch ALL data in parallel (not one after another)
  const { data: repoData, loading: repoLoading, error: repoError } = useRepoDetails(owner, repo);
  const { data: contributors, loading: contributorsLoading } = useContributors(owner, repo);
  const { data: languages, loading: languagesLoading } = useLanguages(owner, repo);
  const { data: commitActivity, loading: activityLoading } = useCommitActivity(owner, repo);


  // Combined loading for initial load
  const isLoading = repoLoading || !repoData;
  
  // Handle errors at the top level
  if(repoError){
    return (
      <div className='max-w-7xl mx-auto text-center px-4 py-20'>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>

        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>Oops!!</h2>
        
        <p className='text-gray-600 dark:text-gray-400 mb-6'>{repoError}</p>

        <Link
        to='/home'
        className="inline-flex items-center gap-2 text-primary-600 hover:underline"
        >
        <ArrowLeft className='w-4 h-4'/> Back to search
        </Link>
      </div>
    );
  }


    // Show full-page skeleton while main data loads
    if(isLoading){
      return <RepoProfileSkeleton />;
    }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        to="/home"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to search
      </Link>

     
      {/* Header */}
      <div className="mb-8">
        <div className='flex items-start gap-4'>

         <img src={repoData.owner.avatar_url} alt={repoData.owner.login}
         className='w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-700' />

         <div className='flex-1'>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {repoData.full_name}
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-1 max-w-2xl">
              {repoData.description || "No description provided."}
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
              {repoData.topics?.map((topic) => (
                <Badge key={topic} variant="blue">{topic}</Badge>
              ))}
          </div>
         </div>
        </div>        
      </div>


      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">         
        <Card 
          className='text-center h-40'
        >
          <div className='pt-4'>
                 <Star className="w-5 h-5 text-center text-primary-500 mx-auto mb-2"/>
                 <p className="text-2xl font-bold text-gray-900 dark:text-white">{repoData.stargazers_count}</p>
                 <p className="text-sm text-gray-500 dark:text-gray-400">Stars</p>
          </div>
        </Card>

        <Card           
          className=' text-center h-40'
          ><div className='pt-4'>
                 <GitFork className="w-5 h-5 text-center text-primary-500 mx-auto mb-2"/>
                 <p className="text-2xl font-bold text-gray-900 dark:text-white">{repoData.forks_count}</p>
                 <p className="text-sm text-gray-500 dark:text-gray-400">Forks</p>
                 </div>
        </Card>
        
        <Card 
          className=' text-center h-40'>          
                 <div className='pt-4'>
                 <AlertCircle className="w-5 h-5 text-center text-primary-500 mx-auto mb-2"/>
                 <p className="text-2xl font-bold text-gray-900 dark:text-white">{repoData.open_issues_count}</p>
                 <p className="text-sm text-gray-500 dark:text-gray-400">Open Issues</p>
                 </div>
        </Card>

        <Card
          className=' text-center h-40'>          
                 <div className='pt-4'>
                 <Eye className="w-5 h-5 text-center text-primary-500 mx-auto mb-2"/>
                 <p className="text-2xl font-bold text-gray-900 dark:text-white">{repoData.watchers_count}</p>
                 <p className="text-sm text-gray-500 dark:text-gray-400">Watchers</p>
                 </div>
        </Card>
      </div>

      
      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Commit Activity (Last Year)
            </h2>
             {activityLoading ? (
              <Skeleton className="h-48 w-full" />
            ) : commitActivity && Array.isArray(commitActivity) ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  Total commits: {commitActivity.reduce((sum, week) => sum + week.total, 0).toLocaleString()}
                </p>
                <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
                  {JSON.stringify(commitActivity.slice(0, 4), null, 2)}
                </pre>
              </div>
            ) : (
              <p className="text-gray-500">No activity data available</p>
            )}
          </Card>



            {/* Contributors */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Top Contributors
            </h2>
            {contributorsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : contributors?.length > 0 ? (
              <div className="space-y-3">
                {contributors.map((contributor) => (
                  <div key={contributor.id} className="flex items-center gap-3">
                    <img
                      src={contributor.avatar_url}
                      alt={contributor.login}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {contributor.login}
                    </span>
                    <span className="text-sm text-gray-500 ml-auto">
                      {contributor.contributions.toLocaleString()} commits
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No contributor data</p>
            )}
          </Card>
        </div>


         {/* Sidebar */}
         <div className="space-y-6">

         {/* Languages */}
         <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Languages
          </h2>

      {languagesLoading ? (
        <Skeleton className="h-32 w-full" />
        ) : languages && Object.keys(languages).length > 0 ? (
      <div>
        {(() => {
          const languageEntries = Object.entries(languages);

          const total = languageEntries.reduce(
            (sum, [, bytes]) => sum + bytes,
            0
          );

          const colors = [
            "bg-blue-500",
            "bg-yellow-500",
            "bg-purple-500",
            "bg-green-500",
            "bg-red-500",
            "bg-pink-500",
            "bg-cyan-500",
            "bg-orange-500",
          ];

          return (
            <>
              {/* Progress Bar */}
              <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex">
                {languageEntries.map(([lang, bytes], index) => {
                  const percentage = (bytes / total) * 100;

                  return (
                    <div
                      key={lang}
                      className={`h-full ${colors[index % colors.length]}`}
                      style={{ width: `${percentage}%` }}
                      title={`${lang}: ${percentage.toFixed(1)}%`}
                    />
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-4 space-y-2">
                {languageEntries.map(([lang, bytes], index) => {
                  const percentage = ((bytes / total) * 100).toFixed(1);

                  return (
                    <div
                      key={lang}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-3 h-3 rounded-full ${
                            colors[index % colors.length]
                          }`}
                        />

                        <span className="text-gray-700 dark:text-gray-300">
                          {lang}
                        </span>
                      </div>

                      <span className="text-gray-500 dark:text-gray-400">
                        {percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })()}
      </div>
    ) : (
      <p className="text-gray-500 dark:text-gray-400">
        No language data available
      </p>
    )}
  </Card>



          {/* About */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">      
    About
        </h2>
      
        <dl className="space-y-3 text-sm">
      
          {/* License */}
          <div className="flex justify-between gap-4">      
      <dt className="text-gray-500 dark:text-gray-400">
        License
      </dt>

      <dd className="text-gray-900 dark:text-gray-200 text-right">
        {repoData.license?.name || "N/A"}
      </dd>
          </div>
      
          {/* Created */}
    <div className="flex justify-between gap-4">
      <dt className="text-gray-500 dark:text-gray-400">
        Created
      </dt>

      <dd className="text-gray-900 dark:text-gray-200 text-right">
        {new Date(repoData.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </dd>
    </div>


    {/* Updated */}
          <div className="flex justify-between gap-4">
      <dt className="text-gray-500 dark:text-gray-400">
        Updated
      </dt>

      <dd className="text-gray-900 dark:text-gray-200 text-right">
        {new Date(repoData.updated_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </dd>
          </div>

    {/* Default Branch */}
          <div className="flex justify-between gap-4">
      <dt className="text-gray-500 dark:text-gray-400">
        Default Branch
      </dt>

      <dd className="text-gray-900 dark:text-gray-200 text-right font-mono">
        {repoData.default_branch || "N/A"}
      </dd>
          </div>

        </dl>
      </Card>
        </div>
      </div>
    </div>
  );
} 

function RepoProfileSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="w-32 h-4 mb-6" />
      <div className="flex items-start gap-4 mb-8">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="w-64 h-8" />
          <Skeleton className="w-full max-w-xl h-4" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    </div>
  );
}