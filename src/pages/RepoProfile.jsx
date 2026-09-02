import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, GitFork, Eye, AlertCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Skeleton from '../components/ui/Skeleton';
import Badge from '../components/ui/Badge';

export default function RepoProfile() {
  const { owner, repo } = useParams();
  const loading = true; // Week 2: Replace with real loading state

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
        {loading ? (
          <div className="flex items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="w-64 h-8" />
              <Skeleton className="w-96 h-4" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-2xl font-bold text-primary-600">
              {owner[0].toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {owner}/{repo}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Repository description will appear here...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Star, label: 'Stars', value: '228k' },
          { icon: GitFork, label: 'Forks', value: '46k' },
          { icon: AlertCircle, label: 'Issues', value: '1.2k' },
          { icon: Eye, label: 'Watchers', value: '228k' },
        ].map((stat) => (
          <Card key={stat.label} className="text-center">
            <stat.icon className="w-5 h-5 text-primary-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Commit Activity
            </h2>
            <div className="h-64 flex items-center justify-center text-gray-400">
              Chart will be rendered here in Week 3
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contributors
            </h2>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <Skeleton className="w-32 h-4" />
                  <Skeleton className="w-16 h-4 ml-auto" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Languages
            </h2>
            <div className="space-y-2">
                <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div className="h-full bg-blue-500 w-[60%]" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="blue">JavaScript 60%</Badge>
                <Badge variant="gray">TypeScript 25%</Badge>
                <Badge variant="purple">CSS 15%</Badge>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              About
            </h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-gray-500 dark:text-gray-400">License</dt>
                <dd className="text-gray-900 dark:text-gray-200">MIT</dd>
              </div>
              <div>
                <dt className="text-gray-500 dark:text-gray-400">Created</dt>
                <dd className="text-gray-900 dark:text-gray-200">May 24, 2013</dd>
              </div>
              <div>
                <dt className="text-gray-500 dark:text-gray-400">Last Updated</dt>
                <dd className="text-gray-900 dark:text-gray-200">Jan 15, 2026</dd>
              </div>
            </dl>
          </Card>
        </div>
      </div>
    </div>
  );
}