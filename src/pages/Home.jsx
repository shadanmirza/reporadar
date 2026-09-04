import { useNavigate } from "react-router-dom";

import HeroSection from "../components/layout/HeroSection";
import SearchBar from "../components/ui/SearchBar";


export default function Home() {
  const navigate = useNavigate();

  // Called when a repository is selected
  const handleSelectRepo = (owner, repo) => {
    navigate(`/repo/${owner}/${repo}`);
  };

  return (
    <div>
      {/* =========================
          Hero Section
      ========================== */}
      <HeroSection />

      {/* =========================
          Search Section
      ========================== */}
      <section
        className="
          mx-auto max-w-7xl
          px-4 pb-24
          -mt-8
          sm:px-6
          lg:px-8
        "
      >
        <SearchBar
          onSelectRepo={handleSelectRepo}
        />
      </section>

      {/* =========================
          Trending Repositories
      ========================== */}
      <section
        className="
          mx-auto max-w-7xl
          px-4 pb-24
          sm:px-6
          lg:px-8
        "
      >
        <h2
          className="
            mb-6
            text-2xl font-bold
            text-gray-900
            dark:text-white
          "
        >
          Trending Repositories
        </h2>

        <div
          className="
            grid gap-4
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="
                h-32
                animate-pulse
                rounded-xl
                bg-gray-100
                dark:bg-gray-800
              "
            />
          ))}
        </div>
      
      
      
      </section>
    </div>
  );
}