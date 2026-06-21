import { Briefcase, Trophy, Award, Building, Calendar, ArrowRight } from "lucide-react";

const experiences = [
  {
    company: "BUSOFT TECH (Formerly AGIRA Technologies)",
    location: "Chennai, Tamil Nadu, India",
    role: "Software Engineer",
    duration: "08/2025 – Present",
    description:
      "Continued in the same role following the integration of AGIRA Technologies into BUSOFT TECH.",
    icon: <Briefcase className="w-5 h-5 text-[#ff3b7c]" />,
    gradient: "from-[#ff3b7c] to-[#ff9a44]",
  },
  {
    company: "INFINITI SOFTWARE SOLUTIONS",
    location: "Chennai, Tamil Nadu, India",
    role: "Software Engineer",
    duration: "11/2022 – 08/2025",
    description:
      "Developed and maintained highly scalable web applications, led key feature implementations, and collaborated closely with cross-functional teams to deliver critical business tools.",
    icon: <Building className="w-5 h-5 text-[#a200ff]" />,
    gradient: "from-[#a200ff] to-[#ff3b7c]",
  },
  {
    company: "INFINITI SOFTWARE SOLUTIONS",
    location: "Chennai, Tamil Nadu, India",
    role: "Internship Trainee",
    duration: "07/2022 – 10/2022",
    description:
      "Gained hands-on experience in frontend technologies, participated in agile sprints, and contributed to UI/UX enhancements under senior mentorship.",
    icon: <Award className="w-5 h-5 text-[#00c6ff]" />,
    gradient: "from-[#00c6ff] to-[#0072ff]",
  },
];

export default function AkWork() {
  return (
    <section className="ak-workSection py-8 px-4 md:px-8 max-w-[95%] lg:max-w-[90%] mx-auto">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 text-center">
          Professional Experience
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] rounded-full"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-center max-w-2xl text-base md:text-lg">
          My career journey in building robust software solutions and delivering value through
          engineering excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Timeline Section */}
        <div className="lg:col-span-8 relative">
          {/* Vertical Line */}
          <div className="absolute left-[27px] top-4 bottom-4 w-1 bg-gradient-to-b from-[#ff3b7c] via-[#a200ff] to-[#00c6ff] opacity-20 rounded-full hidden md:block"></div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex flex-col md:flex-row gap-6 md:gap-10 group">
                {/* Timeline Node */}
                <div className="hidden md:flex flex-col items-center">
                  <div
                    className={`w-14 h-14 rounded-full bg-white dark:bg-gray-800 border-4 border-white dark:border-gray-900 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-300 relative`}
                  >
                    {/* Glowing ring */}
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${exp.gradient} animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      style={{ margin: "-4px", zIndex: -1 }}
                    ></div>
                    {exp.icon}
                  </div>
                </div>

                {/* Content Card */}
                <div className="flex-1">
                  <div className="p-6 md:p-8 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl hover:border-[#ff3b7c]/30 transition-all duration-300 relative overflow-hidden">
                    <div
                      className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${exp.gradient}`}
                    ></div>

                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-[#ff3b7c] transition-colors">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 mt-2 text-gray-700 dark:text-gray-300 font-semibold">
                          <Building className="w-4 h-4 text-gray-500" />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-900/50 rounded-full text-sm font-bold text-gray-600 dark:text-gray-400 whitespace-nowrap border border-gray-200 dark:border-gray-700">
                        <Calendar className="w-4 h-4" />
                        {exp.duration}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
                      {exp.description}
                    </p>

                    <div className="mt-4 text-sm text-gray-500 font-medium">{exp.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight / Achievement Section */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <Trophy className="w-6 h-6 text-[#f6d365]" />
              Key Achievements
            </h2>

            <div className="relative p-[2px] rounded-3xl bg-gradient-to-br from-[#f6d365] via-[#ff9a44] to-[#ff3b7c] overflow-hidden group">
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#f6d365] via-[#ff9a44] to-[#ff3b7c] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative bg-white dark:bg-gray-900 rounded-[22px] p-8 h-full flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#f6d365] to-[#ff9a44] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(246,211,101,0.4)] group-hover:scale-110 transition-transform duration-500">
                  <Trophy className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#f6d365] to-[#ff9a44] mb-2 uppercase tracking-wide">
                  Star Performer
                </h3>

                <div className="w-12 h-1 bg-gray-200 dark:bg-gray-800 rounded-full mb-6"></div>

                <p className="text-lg text-gray-800 dark:text-gray-200 font-bold mb-2">
                  EnCode 3.0 Hackathon
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Awarded at Infiniti Software Solutions for exceptional performance,
                  problem-solving, and innovative implementation.
                </p>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 w-full flex justify-center">
                  <div className="flex items-center gap-2 text-[#ff9a44] font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                    <span>Excellence</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
