import {
  Component,
  Layers,
  LayoutTemplate,
  Box,
  Zap,
  Type,
  Brackets,
  FileCode,
  Palette,
} from "lucide-react";
import { Skill } from "@/types/portfolio";

const skillsData: Skill[] = [
  // Frameworks & Libraries
  { name: "React.js", level: 92, icon: Component, category: "framework" },
  { name: "Redux", level: 85, icon: Layers, category: "state-management" },
  { name: "Ant Design", level: 90, icon: LayoutTemplate, category: "ui-library" },
  { name: "Bootstrap", level: 72, icon: Box, category: "ui-library" },
  { name: "jQuery", level: 75, icon: Zap, category: "library" },

  // Languages
  { name: "TypeScript", level: 82, icon: Type, category: "language" },
  { name: "JavaScript", level: 90, icon: Brackets, category: "language" },
  { name: "HTML", level: 90, icon: FileCode, category: "markup" },

  // Styling
  { name: "CSS", level: 83, icon: Palette, category: "styling" },
  { name: "SCSS", level: 75, icon: Palette, category: "styling" },
];

interface SkillsProps {
  dict: {
    title: string;
  };
}

export default function Skills({ dict }: SkillsProps) {
  return (
    <section id="skills" className="py-20  bg-white/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{dict.title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={skill.name}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`mr-3 ${
                      skill.category === "framework"
                        ? "text-[#ff3b7c]"
                        : skill.category === "styling"
                          ? "text-purple-500"
                          : "text-indigo-500"
                    }`}
                  >
                    <IconComponent size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{skill.level}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
