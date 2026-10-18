import { useGitHubData } from './useGitHubData'

import { 
  searchRepositories, 
  getRepository, 
  getContributors, 
  getLanguages, 
  getCommitActivity, 
  getTrendingRepositories
} from "../services/githubApi";

import type { 
    SearchResponse, 
    GitHubRepo, 
    Contributor, 
    LanguageBreakdown, 
    WeekActivity } from "../types/github";


// Hook #1: Search for repos
export function useSearchRepos(query: string, language=''){
  return useGitHubData<SearchResponse>(
    ()=>searchRepositories(query, language),
    [query, language] // Re-fetch when query or language changes
);
}

// Hook #2: Get one repo's details
export function useRepoDetails(owner: string, repo: string){
    return useGitHubData<GitHubRepo>(
        ()=>getRepository(owner, repo),
        [owner, repo]
    );
}

// Hook #3: Get contributors
export function useContributors(owner: string, repo: string){
    return useGitHubData<Contributor>(
        ()=>getContributors(owner, repo),
        [owner, repo]
    );
}

// Hook #4: Get languages
export function useLanguages(owner: string, repo: string){
    return useGitHubData<LanguageBreakdown>(
        ()=>getLanguages(owner, repo),
        [owner, repo]
    );
}

// Hook #5: Get commit activity
export function useCommitActivity(owner: string, repo: string) {
  return useGitHubData<WeekActivity>(
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