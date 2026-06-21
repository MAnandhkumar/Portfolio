import { ChevronDown } from "lucide-react";

interface HeroProps {
  scrollToSection: (id: string) => void;
  dict: {
    titlePrefix: string;
    name: string;
    description: string;
    btnContact: string;
    btnLearn: string;
  };
}

export default function Hero({ scrollToSection, dict }: HeroProps) {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center  pt-16">
      <div className="max-w-[90%] mx-auto text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            {dict.titlePrefix}{" "}
            <span className="bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] bg-clip-text text-transparent">
              {dict.name}
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed whitespace-pre-line">
            {dict.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] text-white px-8 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium cursor-pointer"
            >
              {dict.btnContact}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full hover:border-[#ff3b7c] hover:text-[#ff3b7c] transition-all duration-200 font-medium cursor-pointer"
            >
              {dict.btnLearn}
            </button>
          </div>
        </div>

        <div className="animate-bounce mt-12">
          <button
            onClick={() => scrollToSection("about")}
            aria-label="Scroll down to About section"
            className="cursor-pointer focus:outline-none"
          >
            <ChevronDown
              size={32}
              className="mx-auto text-gray-400 hover:text-[#ff3b7c] transition-colors"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
