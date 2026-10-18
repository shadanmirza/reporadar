export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
  language: string | null;
  topics?: string[];
  created_at: string;
  updated_at: string;
  default_branch: string;
  owner: GitHubUser;
  license: { name: string } | null;
  html_url: string;
}

export interface SearchResponse {
  total_count: number;
  items: GitHubRepo[];
}

export interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  contributions: number;
}

export type LanguageBreakdown = Record<string, number>;

export interface WeekActivity {
  days: number[];
  total: number;
  week: number;
}