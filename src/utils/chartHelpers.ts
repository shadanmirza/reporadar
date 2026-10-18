export interface ChartWeek {
  week: string;
  fullDate: string;
  commits: number;
}

// Convert GitHub's commit activity to chart-friendly format
export function transformCommitActivity(rawData: unknown): ChartWeek[] {
  if (!Array.isArray(rawData)) return [];
  
  return rawData.map((weekData) => {
    const date = new Date(weekData.week * 1000);
    return {
      // Format: "Jan 1" or "Dec 15"
      week: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      fullDate: date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      commits: weekData.total,
    };
  });
}

// Calculate total commits from activity data
export function getTotalCommits(activityData: any) {
  if (!Array.isArray(activityData)) return 0;
  return activityData.reduce((sum, week) => sum + week.total, 0);
}