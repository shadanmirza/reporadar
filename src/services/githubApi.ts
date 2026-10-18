import { 
  GitHubRepo,
  SearchResponse,
  Contributor,
  LanguageBreakdown,
  WeekActivity,
 } from "../types/github";

const BASE_URL = "https://api.github.com";
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// ============================================
// Helper: The single fetch function
// ============================================

async function fetchGitHub<T>(endpoint: string): Promise<T> {
  
  const url = `${BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      
      ...(TOKEN && { Authorization: `Bearer ${TOKEN}` }),
    },
  });

  // GitHub returns 403 when rate limited
  if (response.status === 403) {
    const resetTime = response.headers.get("X-RateLimit-Reset");
    const resetDate = resetTime 
      ? new Date(Number(resetTime) * 1000).toLocaleTimeString()
      : "soon";
    throw new Error(`Rate limit exceeded. Resets at ${resetDate}`);
  }

  // 404 = repo not found
  if (response.status === 404) {
    throw new Error("Repository not found");
  }

  // Any other error
  if (!response.ok) {
    
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>; 
}

// ============================================
// API Functions (exported for hooks to use)
// ============================================

// Search repositories by keyword
export function searchRepositories(query: string, language = "", sort = "stars"): Promise<SearchResponse> {
  // Build query string: "react+language:javascript"
  let searchQuery = query;
  
  if (language) searchQuery += `+language:${language}`;
  
  return fetchGitHub<SearchResponse>(
    
    `/search/repositories?q=${encodeURIComponent(searchQuery)}&sort=${sort}&per_page=10`
  );
}

// Get detailed info about ONE repository
export function getRepository(owner: string, repo: string): Promise<GitHubRepo> {
  
  return fetchGitHub<GitHubRepo>(`/repos/${owner}/${repo}`);
}

// Get top 10 contributors
export function getContributors(owner: string, repo: string): Promise<Contributor> {
  
  return fetchGitHub<Contributor>(`/repos/${owner}/${repo}/contributors?per_page=10`);
}

// Get language breakdown (bytes per language)
export function getLanguages(owner: string, repo: string): Promise<LanguageBreakdown> {
  
  return fetchGitHub<LanguageBreakdown>(`/repos/${owner}/${repo}/languages`);
}

// Get weekly commit activity for the last year
export function getCommitActivity(owner: string, repo: string): Promise<WeekActivity>{
  
  return fetchGitHub<WeekActivity>(`/repos/${owner}/${repo}/stats/commit_activity`);
} 

// Get "trending" by searching for repos with >1000 stars, sorted by updated
export function getTrendingRepositories() {
  //Query: stars:>1000, sorted by recently updated

  return fetchGitHub(
    '/search/repositories?q=stars:>1000&sort=updated&order=desc&per_page=6'
  )
}