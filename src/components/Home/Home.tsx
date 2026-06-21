import { Mail } from "lucide-react";

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Home() {
  return (
    <section className="ak-homeSection py-0 max-w-[95%] lg:max-w-[90%] mx-auto min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8 md:gap-6 w-full">
        {/* Text Content */}
        <div className="w-full mx-auto flex flex-col justify-center items-start md:items-center md:text-center">
          <div className="ak-homeContent w-full">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
              Hello, I'm
              <br />
              <span className="bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] bg-clip-text text-transparent drop-shadow-sm">
                ANANDHKUMAR M
              </span>
              <br />
              <span className="text-3xl md:text-4xl">Software Engineer</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Results-driven Software Engineer with 3.5+ years of experience in building scalable,
              high-performance web applications.
            </p>

            <div className="flex flex-wrap items-center justify-start md:justify-center gap-4">
              <a
                href="https://www.linkedin.com/in/anandhkumar-m-621456225"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <button className="flex items-center gap-2 bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] hover:opacity-90 transition-opacity text-white px-6 py-3 rounded-xl font-medium focus:ring-4 focus:ring-[#ff3b7c] shadow-[0_4px_20px_rgba(255,59,124,0.3)] hover:scale-105 transform duration-300">
                  <LinkedinIcon size={20} />
                  Connect With Me
                </button>
              </a>
              <a
                href="mailto:infinitianandh@gmail.com"
                className="flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-[#ff3b7c] dark:hover:border-[#ff3b7c] hover:text-[#ff3b7c] dark:hover:text-[#ff3b7c] px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg shadow-sm"
              >
                <Mail size={20} />
                Email Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
