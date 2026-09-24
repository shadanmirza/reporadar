import {
  BarChart3,
  Database,
  GitBranch,
  Search,
  Smartphone,
  Target,
} from "lucide-react";

const features = [
  {
    title: "Repository Insights",
    description:
      "Understand repository activity, structure, and development trends at a glance.",
    icon: GitBranch,
  },
  {
    title: "Reliable GitHub Data",
    description:
      "Explore repository information sourced directly from GitHub.",
    icon: Database,
  },
  {
    title: "Focused Analytics",
    description:
      "Find the repository metrics that matter without extra noise.",
    icon: BarChart3,
  },
  {
    title: "Responsive Dashboard",
    description:
      "Review repository insights on screens of different sizes.",
    icon: Smartphone,
  },
  {
    title: "Fast Repository Search",
    description:
      "Find repositories quickly with a simple, focused search.",
    icon: Search,
  },
  {
    title: "Clear Visual Analytics",
    description:
      "Make repository trends easier to understand with clear visual summaries.",
    icon: Target,
  },
];

export default function FeaturesSection() {
  return (
    <section
      aria-labelledby="features-heading"
      className="bg-white px-4 py-16 transition-colors dark:bg-gray-950 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
            Features
          </p>
          <h2
            id="features-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-4xl lg:text-5xl"
          >
            What Makes RepoRadar Different
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
            Explore the tools that make it easier to find repositories and
            understand their activity.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article key={feature.title} className="text-center">
                <div className="mx-auto flex size-18 items-center justify-center rounded-full bg-orange-50 ring-8 ring-orange-50/70 dark:bg-orange-950/50 dark:ring-orange-950/30">
                  <Icon
                    aria-hidden="true"
                    className="size-6 text-orange-600 dark:text-orange-400"
                    strokeWidth={1.8}
                  />
                </div>
                <h3 className="mt-4 text-xl font-medium leading-snug text-gray-950 dark:text-white sm:text-2xl">
                  {feature.title}
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-gray-600 dark:text-gray-400">
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
