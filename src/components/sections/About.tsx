import { User, Award } from "lucide-react";

interface AboutProps {
  dict: {
    title: string;
    profileTitle: string;
    profileText: string;
    strengthsTitle: string;
    strengths: string[];
  };
}

export default function About({ dict }: AboutProps) {
  return (
    <section id="about" className="py-20 ">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {dict.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <User className="text-[#ff3b7c] mr-3" size={24} />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {dict.profileTitle}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{dict.profileText}</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <Award className="text-emerald-600 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {dict.strengthsTitle}
                </h3>
              </div>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                {dict.strengths.map((strength, index) => (
                  <li key={index}>• {strength}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
