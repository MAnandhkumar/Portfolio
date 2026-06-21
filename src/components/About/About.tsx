import { Book, GraduationCap, Globe } from "lucide-react";

export default function AkAbout() {
  return (
    <section className="ak-aboutSection py-8 max-w-[95%] lg:max-w-[90%] mx-auto">
      <div className="flex flex-col justify-center items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 text-center">
          About Me
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] rounded-full mb-6"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Professional Summary */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#a200ff]/10 dark:bg-[#a200ff]/20 rounded-xl">
              <Book className="text-[#a200ff] w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Professional Summary
            </h2>
          </div>
          <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
              Results-driven Software Engineer with 3.5+ years of experience in building scalable,
              high-performance web applications using React.js, Next.js, TypeScript, and Node.js.
              Expertise in developing robust backend systems with NestJS, PostgreSQL, and Redis.
              Proven ability to integrate AI services, implement secure authentication (JWT, RBAC),
              and deliver end-to-end features in agile and waterfall environments.
            </p>
          </div>
        </div>

        {/* Education & Languages */}
        <div className="flex flex-col space-y-8">
          {/* Education */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#ff3b7c]/10 dark:bg-[#ff3b7c]/20 rounded-xl">
                <GraduationCap className="text-[#ff3b7c] w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h2>
            </div>
            <div className="flex flex-col gap-4">
              <div className="p-5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:border-[#ff3b7c]/50 transition-colors duration-300 group">
                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-[#ff3b7c] transition-colors">
                  B.E. (Electronics and Communication Engineering)
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  TJS Engineering College | 2014 – 2018
                </p>
                <div className="mt-2 inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full">
                  CGPA: 8.05/10
                </div>
              </div>
              <div className="p-5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:border-[#ff3b7c]/50 transition-colors duration-300 group">
                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-[#ff3b7c] transition-colors">
                  HSC (Higher Secondary)
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  RMT Matric. Hr. Sec. School | 2013 – 2014
                </p>
                <div className="mt-2 inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-full">
                  89.08%
                </div>
              </div>
              <div className="p-5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:border-[#ff3b7c]/50 transition-colors duration-300 group">
                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-[#ff3b7c] transition-colors">
                  SSLC (Secondary)
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  RMT Matric. Hr. Sec. School | 2011 – 2012
                </p>
                <div className="mt-2 inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-bold rounded-full">
                  93.2%
                </div>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#ff9a44]/10 dark:bg-[#ff9a44]/20 rounded-xl">
                <Globe className="text-[#ff9a44] w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Languages</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-[#ff9a44]/50 transition-all duration-300">
                <span className="font-bold text-gray-900 dark:text-white mb-1">English</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                  Proficient
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-[#ff9a44]/50 transition-all duration-300">
                <span className="font-bold text-gray-900 dark:text-white mb-1">Tamil</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                  Native
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-[#ff9a44]/50 transition-all duration-300">
                <span className="font-bold text-gray-900 dark:text-white mb-1">Telugu</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                  Intermediate
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
