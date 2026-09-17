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

import CommitActivityChart from '../components/charts/CommitActivityChart';
import LanguageChart from '../components/charts/LanguageChart';
import ContributorsChart from '../components/charts/ContributorsChart';


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
      <div className="mb-8 animate-fade-in-up">
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 stagger-children">         
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
          <CommitActivityChart 
           data={commitActivity} 
           loading={activityLoading} 
          />



            {/* Contributors */}         
          
        {/* NEW */}
        <ContributorsChart 
         data={contributors} 
         loading={contributorsLoading} 
        />
      </div>


         {/* Sidebar */}
         <div className="space-y-6">

         {/* Languages  */}
         {/* NEW */}
         <LanguageChart 
          data={languages} 
          loading={languagesLoading} 
         />
         



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