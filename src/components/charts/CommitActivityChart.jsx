import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { transformCommitActivity } from "../../utils/chartHelpers";
import Card from "../ui/Card";

/**
 * Custom tooltip for the commit activity chart
 */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null;
  }

  const commits = payload[0]?.value ?? 0;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        {label}
      </p>

      <p className="text-lg font-bold text-primary-600">
        {Number(commits).toLocaleString()} commits
      </p>
    </div>
  );
}

export default function CommitActivityChart({ data, loading }) {
  /**
   * Convert raw GitHub commit activity data
   * into the format required by Recharts.
   *
   * useMemo prevents recalculating the chart data
   * unless `data` changes.
   */
  const chartData = useMemo(() => {
    return transformCommitActivity(data);
  }, [data]);

  /**
   * Empty state
   */
  if (!loading && (!data || data.length === 0)) {
    return (
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Commit Activity
        </h2>

        <div className="flex h-64 items-center justify-center text-gray-400">
          No commit data available for this repository
        </div>
      </Card>
    );
  }

  /**
   * Calculate total commits
   */
  const totalCommits = chartData.reduce(
    (sum, item) => sum + item.commits,
    0
  );

  return (
    <Card>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Commit Activity (Last Year)
        </h2>

        {!loading && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {totalCommits.toLocaleString()} total commits
          </p>
        )}
      </div>

      {/* Chart container */}
      <div className="h-72 w-full">
        {loading ? (
          /**
           * Loading skeleton
           */
          <div className="flex h-full items-center justify-center">
            <div className="flex w-full space-x-4">
              <div className="h-full w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        ) : (
          /**
           * Recharts
           */
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 5,
                right: 5,
                left: -20,
                bottom: 5,
              }}
            >
              {/* Gradient */}
              <defs>
                <linearGradient
                  id="colorCommits"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#3b82f6"
                    stopOpacity={0.3}
                  />

                  <stop
                    offset="95%"
                    stopColor="#3b82f6"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              {/* Grid */}
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
                opacity={0.1}
              />

              {/* X Axis */}
              <XAxis
                dataKey="week"
                tick={{
                  fontSize: 12,
                  fill: "#9ca3af",
                }}
                tickLine={false}
                axisLine={false}
                interval={4}
              />

              {/* Y Axis */}
              <YAxis
                tick={{
                  fontSize: 12,
                  fill: "#9ca3af",
                }}
                tickLine={false}
                axisLine={false}
              />

              {/* Tooltip */}
              <Tooltip content={<CustomTooltip />} />

              {/* Area */}
              <Area
                type="monotone"
                dataKey="commits"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#colorCommits)"
                fillOpacity={1}
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}

