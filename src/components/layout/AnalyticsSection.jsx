import { Activity, Code2, Gauge, UsersRound } from "lucide-react";

const analyticsFeatures = [
  {
    title: "Repository Overview",
    description:
      "Quickly understand stars, forks, watchers, open issues, license information, and other essential repository details.",
    icon: Gauge,
  },
  {
    title: "Commit Activity",
    description:
      "Visualize commit activity over time and get a clearer picture of how actively a repository is being developed.",
    icon: Activity,
  },
  {
    title: "Languages & Technologies",
    description:
      "See which programming languages are used in a repository and understand its technology composition at a glance.",
    icon: Code2,
  },
  {
    title: "Contributors & Collaboration",
    description:
      "Explore contributor activity and discover how developers are collaborating on the project.",
    icon: UsersRound,
  },
];

export default function AnalyticsSection() {
  return (
    <section
      aria-labelledby="analytics-heading"
      className="bg-white px-4 py-16 transition-colors dark:bg-gray-950 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium tracking-wide text-primary-600 dark:text-primary-400 sm:text-base">
            Analytics
          </p>
          <h2
            id="analytics-heading"
            className="mt-3 text-3xl font-bold leading-tight tracking-tight text-gray-950 dark:text-white sm:text-4xl lg:text-5xl"
          >
            Everything You Need to Understand a Repository
          </h2>
          <p className="mx-auto mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
            Explore the most useful GitHub repository data in one place — from
            repository health and contributors to languages and commit activity.
          </p>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2">
          {analyticsFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900 sm:p-6"
              >
                <h3 className="flex items-center gap-3 text-xl font-medium leading-snug text-gray-950 dark:text-white sm:text-2xl">
                  <Icon
                    aria-hidden="true"
                    className="size-5 shrink-0 text-primary-600 dark:text-primary-400"
                    strokeWidth={1.8}
                  />
                  {feature.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
