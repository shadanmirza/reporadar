import { useGitHubData } from './useGitHubData'

import { 
  searchRepositories, 
  getRepository, 
  getContributors, 
  getLanguages, 
  getCommitActivity, 
  getTrendingRepositories
} from "../services/githubApi";


// Hook #1: Search for repos
export function useSearchRepos(query, language=''){
  return useGitHubData(
    ()=>searchRepositories(query, language),
    [query, language] // Re-fetch when query or language changes
);
}

// Hook #2: Get one repo's details
export function useRepoDetails(owner, repo){
    return useGitHubData(
        ()=>getRepository(owner, repo),
        [owner, repo]
    );
}

// Hook #3: Get contributors
export function useContributors(owner, repo){
    return useGitHubData(
        ()=>getContributors(owner, repo),
        [owner, repo]
    );
}

// Hook #4: Get languages
export function useLanguages(owner, repo){
    return useGitHubData(
        ()=>getLanguages(owner, repo),
        [owner, repo]
    );
}

// Hook #5: Get commit activity
export function useCommitActivity(owner, repo) {
  return useGitHubData(
    () => getCommitActivity(owner, repo),
    [owner, repo]
  );
}

export function useTrendingRepos() {
    return useGitHubData(
        () => getTrendingRepositories(),
        [] // Empty array = fatch once on mount, never again
    );
}