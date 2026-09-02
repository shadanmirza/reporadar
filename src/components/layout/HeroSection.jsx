import { BarChart3, Zap, Shield } from "lucide-react";

import Card from "../ui/Card";

const features = [
  {
    icon: BarChart3,
    title: "Deep Analytics",
    description:
      "Visualize repository health, contributor activity, and growth trends.",
  },
  {
    icon: Zap,
    title: "Instant Insights",
    description:
      "Get meaningful metrics in seconds, not hours of manual research.",
  },
  {
    icon: Shield,
    title: "Open Source",
    description:
      "Built with modern tools. Fast, responsive, and completely free.",
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="
            absolute left-1/2 top-0
            h-125 w-200
            -translate-x-1/2
            rounded-full
            bg-primary-400/10
            blur-3xl
            dark:bg-primary-600/10
          "
        />
      </div>

      {/* Hero Content */}
      <div
        className="
          mx-auto max-w-7xl
          px-4 pt-16 pb-24
          sm:px-6
          lg:px-8
        "
      >
        {/* Hero Text */}
        <div className="mb-12 text-center">
          <h1
            className="
              mb-6
              text-4xl font-bold tracking-tight
              sm:text-5xl
              lg:text-6xl
            "
          >
            <span className="text-gray-900 dark:text-white">
              Analyze{" "}
            </span>

            <span
              className="
                bg-linear-to-r
                from-primary-600 to-primary-400
                bg-clip-text
                text-transparent
              "
            >
              GitHub Repos
            </span>

            <span className="text-gray-900 dark:text-white">
              {" "}Like a Pro
            </span>
          </h1>

          <p
            className="
              mx-auto max-w-2xl
              text-lg
              text-gray-600 dark:text-gray-400
              sm:text-xl
            "
          >
            Enter any repository name and get beautiful insights
            into its health, community, and activity — all in one
            dashboard.
          </p>
        </div>

        {/* Features Grid */}
        <div
          className="
            mx-auto grid max-w-4xl
            gap-6
            md:grid-cols-3
          "
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="
                  text-center
                  transition-shadow
                  hover:shadow-md
                "
              >
                {/* Icon */}
                <div
                  className="
                    mx-auto mb-4
                    flex h-12 w-12
                    items-center justify-center
                    rounded-xl
                    bg-primary-50
                    dark:bg-primary-900/30
                  "
                >
                  <Icon
                    className="
                      h-6 w-6
                      text-primary-600
                      dark:text-primary-400
                    "
                  />
                </div>

                {/* Title */}
                <h3
                  className="
                    mb-2
                    font-semibold
                    text-gray-900
                    dark:text-white
                  "
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    text-sm
                    text-gray-600
                    dark:text-gray-400
                  "
                >
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}