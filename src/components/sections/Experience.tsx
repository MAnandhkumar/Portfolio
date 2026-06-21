import { Experience } from "@/types/portfolio";

interface ExperienceProps {
  dict: {
    title: string;
    jobs: Experience[];
  };
}

export default function ExperienceSection({ dict }: ExperienceProps) {
  return (
    <section id="experience" className="py-20 ">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{dict.title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] mx-auto"></div>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#a200ff] via-[#ff3b7c] to-[#ff9a44]"></div>

          {dict.jobs.map((exp, index) => (
            <div key={index} className="relative mb-12 ml-16">
              <div className="absolute -left-20 top-6 w-4 h-4 bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] rounded-full border-4 border-white shadow-lg"></div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                    <p className="text-[#ff3b7c] font-medium">{exp.company}</p>
                  </div>
                  <span className="bg-[#a200ff]/10 text-[#a200ff] px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0">
                    {exp.period}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
