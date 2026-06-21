import { GraduationCap } from "lucide-react";
import { Education } from "@/types/portfolio";

interface EducationProps {
  dict: {
    title: string;
    items: Education[];
  };
}

export default function EducationSection({ dict }: EducationProps) {
  return (
    <section id="education" className="py-20  bg-white/40">
      <div className="max-w-[90%] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{dict.title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {dict.items.map((edu, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center mb-4">
                <GraduationCap className="text-emerald-600 mr-3" size={24} />
                <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
              </div>
              <p className="text-[#ff3b7c] font-medium mb-2">{edu.institution}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-600 text-sm">{edu.period}</span>
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                  {edu.grade}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
