"use client";
import { FolderGit2, ShoppingCart, Users, Plane, AlertTriangle } from "lucide-react";

const projectData = [
  {
    title: "E-Commerce Mobile App & Admin Portal",
    icon: <ShoppingCart className="w-8 h-8 text-white" />,
    gradient: "from-[#a200ff] to-[#ff3b7c]",
    description:
      "Developed a comprehensive admin portal with RBAC, JWT authentication, Redis caching, product and order management. Integrated OpenAI moderation, SendGrid email services, and feature management using LaunchDarkly, backed by robust PostgreSQL services.",
    techStack: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Redis",
      "OpenAI API",
      "LaunchDarkly",
      "Strapi CMS",
    ],
  },
  {
    title: "Flight Disruption Assistance Dashboard",
    icon: <AlertTriangle className="w-8 h-8 text-white" />,
    gradient: "from-[#ff3b7c] to-[#ff9a44]",
    description:
      "Designed and developed a real-time operational dashboard to manage flight delays, passenger rebookings, compensation workflows, and API-driven operational processes for airline agents.",
    techStack: ["React.js", "JavaScript", "Redux", "SendGrid", "Postman", "REST APIs"],
  },
  {
    title: "Group Booking Tool (B2B Travel)",
    icon: <Users className="w-8 h-8 text-white" />,
    gradient: "from-[#00c6ff] to-[#0072ff]",
    description:
      "Created a complex, multi-step group reservation flow specifically tailored for B2B travel agents, complete with dynamic seat allocation algorithms and secure payment handling.",
    techStack: ["JavaScript", "jQuery", "Bootstrap", "HTML5/CSS3"],
  },
  {
    title: "Holiday Package Booking System",
    icon: <Plane className="w-8 h-8 text-white" />,
    gradient: "from-[#11998e] to-[#38ef7d]",
    description:
      "Built a dynamic holiday package booking module featuring real-time availability API integrations, advanced filtering capabilities, and secure user authentication flows.",
    techStack: ["Angular", "TypeScript", "REST APIs", "RxJS", "SCSS"],
  },
];

export default function ProjectsPage() {
  return (
    <section className="ak-projectsSection py-8 px-4 md:px-8 max-w-[95%] lg:max-w-[90%] mx-auto">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 text-center">
          Featured Projects
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] rounded-full"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-center max-w-2xl text-base md:text-lg">
          A showcase of the complex enterprise applications and tools I've architected and developed
          throughout my career.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectData.map((project, index) => (
          <div
            key={index}
            className="group flex flex-col bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2"
          >
            {/* Top Gradient Banner */}
            <div
              className={`h-32 w-full bg-gradient-to-r ${project.gradient} p-6 flex items-end justify-between relative overflow-hidden`}
            >
              {/* Decorative shapes */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-8 -mb-8"></div>

              <div className="z-10 p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg">
                {project.icon}
              </div>
              <FolderGit2 className="w-12 h-12 text-white/20 absolute right-6 top-6" />
            </div>

            {/* Content Body */}
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-[#ff3b7c] transition-colors">
                {project.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 flex-1">
                {project.description}
              </p>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-700 mt-auto">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-bold text-[#ff3b7c] dark:text-[#ff9a44] bg-[#ff3b7c]/10 dark:bg-[#ff9a44]/10 rounded-full border border-[#ff3b7c]/20 dark:border-[#ff9a44]/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
