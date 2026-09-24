import { Activity, Gauge, Search, Users } from "lucide-react";
import Card from "../ui/Card";

const benefits = [
  {
    number: "01",
    title: "Understand Repository Health",
    description:
      "Get a clear view of a project's activity, maintainability, and overall health at a glance.",
    icon: Gauge,
  },
  {
    number: "02",
    title: "Explore Repositories Faster",
    description:
      "Find the details that matter without digging through files, pages, and raw GitHub data.",
    icon: Search,
  },
  {
    number: "03",
    title: "See Contributor Activity",
    description:
      "Understand who is contributing and how a repository's community is changing over time.",
    icon: Users,
  },
  {
    number: "04",
    title: "Make Faster Decisions",
    description:
      "Turn repository signals into useful insights so you can decide what to explore next.",
    icon: Activity,
  },
];

export default function BenefitsSection() {
  return (
    <section className="bg-white px-6 py-16 dark:bg-gray-950 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="max-w-2xl">
          <p className="mb-3 text-base tracking-wide text-primary-600 dark:text-primary-400">
            Benefits
          </p>
          <h2 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-gray-950 dark:text-white sm:text-5xl">
            Your shortcut to understanding GitHub
          </h2>
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl">
            RepoReader turns GitHub repository data into clear, useful insights
            so developers can understand projects faster.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <Card
              key={benefit.number}
              padding="none"
              className="relative min-h-72 bg-gray-50/80 p-6 transition-shadow hover:shadow-md dark:bg-gray-900/60 sm:p-8"
            >
              <div className="flex items-start justify-between">
                <benefit.icon
                  aria-hidden="true"
                  className="h-8 w-8 text-primary-500 dark:text-primary-400"
                  strokeWidth={1.8}
                />
                <span
                  aria-hidden="true"
                  className="-mt-1 text-5xl font-bold leading-none tracking-tight text-gray-200 dark:text-gray-800 sm:text-6xl"
                >
                  {benefit.number}
                </span>
              </div>

              <h3 className="mb-4 mt-6 text-xl font-medium leading-snug text-gray-950 dark:text-white sm:text-2xl">
                {benefit.title}
              </h3>
              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
