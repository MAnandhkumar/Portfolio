import {
  MonitorSmartphone,
  Server,
  Database,
  Bot,
  Wrench,
  Cloud,
  Monitor,
  TerminalSquare,
} from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Technologies",
    icon: <MonitorSmartphone className="text-[#ff3b7c] w-6 h-6" />,
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Redux",
      "HTML5",
      "CSS3",
      "SCSS",
      "Tailwind CSS",
      "Ant Design",
      "Bootstrap",
      "jQuery",
      "Angular (Basic)",
      "Axios",
      "Fetch",
      "Jest",
      "JSON",
      "XML",
    ],
    gradient: "from-[#ff3b7c]/10 to-[#ff9a44]/10",
    borderHover: "hover:border-[#ff3b7c]/50",
  },
  {
    title: "Backend Technologies",
    icon: <Server className="text-[#a200ff] w-6 h-6" />,
    skills: ["Node.js", "NestJS", "REST APIs", "JWT Authentication", "Redis", "Swagger/OpenAPI"],
    gradient: "from-[#a200ff]/10 to-[#ff3b7c]/10",
    borderHover: "hover:border-[#a200ff]/50",
  },
  {
    title: "Database",
    icon: <Database className="text-[#00c6ff] w-6 h-6" />,
    skills: ["PostgreSQL", "MySQL", "Knex", "TypeORM"],
    gradient: "from-[#00c6ff]/10 to-[#0072ff]/10",
    borderHover: "hover:border-[#00c6ff]/50",
  },
  {
    title: "AI & Integrations",
    icon: <Bot className="text-[#ff9a44] w-6 h-6" />,
    skills: ["OpenAI Moderation API", "SendGrid", "Email Parser Integration"],
    gradient: "from-[#ff9a44]/10 to-[#f6d365]/10",
    borderHover: "hover:border-[#ff9a44]/50",
  },
  {
    title: "Tools & Platforms",
    icon: <Wrench className="text-[#11998e] w-6 h-6" />,
    skills: ["Git", "Bitbucket", "Jira", "LaunchDarkly", "Remmina"],
    gradient: "from-[#11998e]/10 to-[#38ef7d]/10",
    borderHover: "hover:border-[#11998e]/50",
  },
  {
    title: "DevOps",
    icon: <Cloud className="text-[#ff4b2b] w-6 h-6" />,
    skills: ["Docker (Basics)", "Terraform (Basics)"],
    gradient: "from-[#ff416c]/10 to-[#ff4b2b]/10",
    borderHover: "hover:border-[#ff4b2b]/50",
  },
  {
    title: "OS",
    icon: <Monitor className="text-[#8e2de2] w-6 h-6" />,
    skills: ["Windows", "Linux"],
    gradient: "from-[#8e2de2]/10 to-[#4a00e0]/10",
    borderHover: "hover:border-[#8e2de2]/50",
  },
  {
    title: "Development Tools",
    icon: <TerminalSquare className="text-[#00b09b] w-6 h-6" />,
    skills: ["VS Code", "Cursor", "Antigravity AI", "Kiro", "Postman", "DBeaver"],
    gradient: "from-[#00b09b]/10 to-[#96c93d]/10",
    borderHover: "hover:border-[#00b09b]/50",
  },
];

export default function Skills() {
  return (
    <section className="ak-skillsSection py-8 px-4 md:px-8 max-w-[95%] lg:max-w-[90%] mx-auto">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 text-center">
          Technical Expertise
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] rounded-full"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-center max-w-2xl text-base md:text-lg">
          A comprehensive overview of the technologies, tools, and platforms I use to build scalable
          and high-performance applications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className={`flex flex-col p-6 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 group ${category.borderHover}`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${category.gradient} shadow-inner`}>
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{category.title}</h3>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
              {category.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white/60 dark:bg-gray-900/60 rounded-lg border border-gray-100 dark:border-gray-600 shadow-sm group-hover:border-gray-300 dark:group-hover:border-gray-500 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
