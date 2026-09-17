import { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';

// Programming language colors (industry standard)
const LANGUAGE_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3776ab',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Go: '#00add8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4f5d95',
  Swift: '#ffac45',
  Kotlin: '#a97bff',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Vue: '#41b883',
  Dart: '#00b4ab',
  Scala: '#c22d40',
  R: '#198ce7',
  Perl: '#0298c3',
  Lua: '#000080',
};

function getLanguageColor(lang) {
  return LANGUAGE_COLORS[lang] || '#6b7280'; // Default gray if unknown
}

// Transform GitHub language object to array
function transformLanguages(langData) {
  if (!langData) return [];
  
  const total = Object.values(langData).reduce((a, b) => a + b, 0);
  
  return Object.entries(langData)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: ((bytes / total) * 100).toFixed(1),
    }))
    .sort((a, b) => b.bytes - a.bytes); // Biggest first
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  
  const data = payload[0].payload;
  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <p className="font-semibold text-gray-900 dark:text-white">{data.name}</p>
      <p className="text-sm text-gray-500">{data.percentage}%</p>
      <p className="text-xs text-gray-400">
        {data.bytes.toLocaleString()} bytes
      </p>
    </div>
  );
}

export default function LanguageChart({ data, loading }) {
  const chartData = useMemo(() => transformLanguages(data), [data]);

  if (!loading && chartData.length === 0) {
    return (
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Languages
        </h2>
        <div className="h-48 flex items-center justify-center text-gray-400">
          No language data available
        </div>
      </Card>
    );
  }

  return (
    <Card className='animate-fade-in-up'>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Languages
      </h2>

      <div className="h-56 w-full">
        {loading ? (
          <div className="h-full animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}  // This creates the DONUT hole
                outerRadius={80}
                paddingAngle={3}
                dataKey="bytes"
                animationDuration={1200}
                animationEasing="ease-out"
              >
                {chartData.map((entry) => (
                  <Cell 
                    key={entry.name} 
                    fill={getLanguageColor(entry.name)} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2">
        {chartData.map((lang) => (
          <div key={lang.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: getLanguageColor(lang.name) }} 
              />
              <span className="text-gray-700 dark:text-gray-300">{lang.name}</span>
            </div>
            <span className="text-gray-500 font-medium">{lang.percentage}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}