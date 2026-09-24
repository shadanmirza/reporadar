import { useId, useState } from "react";
import { Plus, X } from "lucide-react";

const faqs = [
  {
    question: "What is RepoRadar?",
    answer:
      "RepoRadar is a GitHub repository analytics tool that helps you explore repository health, stars, forks, contributors, languages, and commit activity in one place.",
  },
  {
    question: "Is RepoRadar free to use?",
    answer:
      "Yes. RepoRadar is designed as a free tool for exploring GitHub repository data.",
  },
  // {
  //   question: "What repository information can I see?",
  //   answer:
  //     "You can view repository details such as stars, forks, open issues, watchers, contributors, programming languages, and commit activity.",
  // },
  {
    question: "Where does RepoRadar get its data?",
    answer: "RepoRadar retrieves repository information from the GitHub API.",
  },
  {
    question: "Can I analyze any public GitHub repository?",
    answer:
      "You can search for public GitHub repositories supported by the GitHub API and open their analytics page in RepoRadar.",
  },
  {
    question: "Does RepoRadar work on mobile?",
    answer:
      "Yes. The interface is responsive and designed to work across desktop, tablet, and mobile screens.",
  },
  {
    question: "Can I install RepoRadar as an app?",
    answer:
      "RepoRadar can be configured as a Progressive Web App, allowing supported browsers and devices to install it like an app.",
  },
  {
    question: "Can I suggest a feature or report a problem?",
    answer:
      "Yes. Use the Share Your Experience link in the footer to send feedback or suggestions.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionId = useId();

  function toggleFaq(index) {
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
  }

  return (
    <section
      id="faq"
      aria-labelledby={`${sectionId}-heading`}
      className="scroll-mt-28 bg-white px-4 py-16 transition-colors dark:bg-gray-950 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-4xl">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium tracking-wide text-orange-600 dark:text-orange-400 sm:text-base">
            FAQs
          </p>
          <h2
            id={`${sectionId}-heading`}
            className="mt-3 text-3xl font-bold leading-tight tracking-tight text-gray-950 dark:text-white sm:text-4xl lg:text-5xl"
          >
            Common Questions
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
            Everything you need to know about using RepoRadar to explore and
            analyze GitHub repositories.
          </p>
        </header>

        <div className="mt-10 space-y-4 sm:mt-12">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const questionId = `${sectionId}-question-${index}`;
            const answerId = `${sectionId}-answer-${index}`;

            return (
              <article
                key={faq.question}
                className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50/80 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900/60"
              >
                <h3>
                  <button
                    id={questionId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-medium text-gray-900 transition-colors hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500 dark:text-gray-100 dark:hover:text-orange-300 sm:text-lg"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <X aria-hidden="true" className="size-5 shrink-0" />
                    ) : (
                      <Plus aria-hidden="true" className="size-5 shrink-0" />
                    )}
                  </button>
                </h3>

                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  aria-hidden={!isOpen}
                  className={`grid transition-all duration-300 ease-in-out motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
