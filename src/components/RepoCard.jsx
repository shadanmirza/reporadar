import { Star, GitFork, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from './ui/Card';
import Badge from './ui/Badge';

export default function RepoCard({ repo }) {
  const navigate = useNavigate();
  
  return(
    <Card className="cursor-pointer hover:scale-[1.02] duration-300 hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-800 transition-all group"
      onClick={() => navigate(`/repo/${repo.owner.login}/${repo.name}`)}>
      <div className="flex items-start gap-3">
        <img
          src={repo.owner.avatar_url}
          alt={repo.owner.login}
          className="w-10 h-10 rounded-full group-hover:scale-110 transition-transform"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-primary-600 transition-colors">
            {repo.full_name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1 h-10">
            {repo.description || "No description"}
          </p>
          
          <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5" />
              {repo.stargazers_count.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="w-3.5 h-3.5" />
              {repo.forks_count.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {repo.open_issues_count.toLocaleString()}
            </span>
          </div>
          
          {repo.language && (
            <div className="mt-2">
              <Badge variant="blue" className="text-xs">
                {repo.language}
              </Badge>
            </div>
          )}
        </div>
      </div>
    </Card>
  )

}