import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import Card from '../ui/Card';

function transformContributors(rawData) {
    if(!Array.isArray(rawData)) return [];

    return rawData.map((contributor)=>({
       name: contributor.login,
       commits: contributor.contributions,
       avatar: contributor.avatar_url,
    }));
}

function CustomTooltip({active, payload}) {
     if (!active || !payload?.length) return null;

     const data = payload[0].payload;
     return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 flex items-center gap-3">
      <img src={data.avatar} alt={data.name} className="w-8 h-8 rounded-full" />
      <div>
        <p className="font-semibold text-gray-900 dark:text-white">{data.name}</p>
        <p className="text-sm text-primary-600">{data.commits.toLocaleString()} commits</p>
      </div>
    </div>
  );
}

export default function ContributorsChart({ data, loading }) {
  const chartData = useMemo(() => transformContributors(data), [data]);

  if (!loading && chartData.length === 0) {
    return (
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Top Contributors
        </h2>
        <div className="h-48 flex items-center justify-center text-gray-400">
          No contributor data available
        </div>
      </Card>
    );
  }

   return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Top Contributors
      </h2>

      <div className="h-64 w-full">
        {loading ? (
          <div className="h-full animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"  // Horizontal bars look better for names
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#374151" 
                opacity={0.1} 
                horizontal={false}
              />
              
              <XAxis 
                type="number" 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                tickLine={false}
                axisLine={false}
              />
              
              <YAxis 
                type="category" 
                dataKey="name" 
                interval={0}  // Forces exactly one label per bar
                tick={{ fontSize: 15, fill: '#9ca3af' }}
                tickLine={false}
                axisLine={false}
                width={100}   // Increased slightly from 80 to give longer names more room
              />
              
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
              />
              
              <Bar 
                dataKey="commits" 
                radius={[0, 4, 4, 0]}  // Rounded ends on right side
                animationDuration={1200}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={entry.name} 
                    fill={index === 0 ? '#3b82f6' : '#60a5fa'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
