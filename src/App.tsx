import { useEffect, useState } from "react";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Award,
  GraduationCap,
  User,
  ChevronDown,
  Menu,
  X,
  Component, 
  Type, 
  FileCode, 
  Palette, 
  Box, 
  Zap, 
  LayoutTemplate,
  Brackets,
  Layers
} from "lucide-react";

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const fullName = "WELCOME ✨";
  const [displayName, setDisplayName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing and deleting animation loop
  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (isTyping) {
          if (currentIndex < fullName.length) {
            setDisplayName(fullName.substring(0, currentIndex + 1));
            setCurrentIndex(currentIndex + 1);
          } else {
            setIsTyping(false);
          }
        } else {
          if (currentIndex > 0) {
            setDisplayName(fullName.substring(0, currentIndex - 1));
            setCurrentIndex(currentIndex - 1);
          } else {
            setIsTyping(true);
          }
        }
      },
      isTyping ? 300 : 75
    ); // Faster when deleting

    return () => clearTimeout(timer);
  }, [currentIndex, isTyping]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "skills",
        "experience",
        "education",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (
          element &&
          scrollPosition >= element.offsetTop &&
          scrollPosition < element.offsetTop + element.offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const skills = [
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

  const experiences = [
    {
      title: "Software Engineer",
      company: "Infiniti Software Solutions",
      period: "1 Nov, 2022 - Present",
      description:
        "Developed and maintained multiple client projects using modern web technologies. Collaborated with cross-functional teams to deliver high-quality solutions.",
    },
    {
      title: "Software Trainee",
      company: "Infiniti Software Solutions",
      period: "18 Jul, 2022 - 31 Oct, 2022",
      description:
        "Built responsive web applications and REST APIs. Resolved cross-browser issues using BrowserStack and Chrome DevTools."
    }
  ];

  const education = [
    {
      degree: "B.E. ECE",
      institution: "T.J.S. Engineering College / Anna University",
      period: "2014 - 2018",
      grade: "8.05 CGPA",
    },
    {
      degree: "HSC",
      institution: "R.M.T. Matric. Hr. Sec. School",
      period: "2013 - 2014",
      grade: "89.08%",
    },
    {
      degree: "SSLC",
      institution: "R.M.T. Matric. Hr. Sec. School",
      period: "2011 - 2012",
      grade: "93.2%",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {displayName}
              <span className={showCursor ? "opacity-100" : "opacity-0"}>
                |
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["About", "Skills", "Experience", "Education", "Contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group ${
                      activeSection === item.toLowerCase()
                        ? "text-blue-600"
                        : ""
                    }`}
                  >
                    {item}
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                  </button>
                )
              )}
            </div>

            {/* Mobile Navigation Toggle */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-white/20">
            <div className="px-4 py-2 space-y-2">
              {["About", "Skills", "Experience", "Education", "Contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{ marginBlockStart: 60 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Anandhkumar
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Frontend Developer | 3+ years building performant web apps | UI enthusiast <br />
              React JS | TypeScript | Redux | JavaScript | HTML | CSS <br />
              Translates business needs into clean, scalable solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
              >
                Get In Touch
              </button>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("about");
                }}
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full hover:border-blue-600 hover:text-blue-600 transition-all duration-200 font-medium"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="animate-bounce" style={{ marginBlockStart: 50 }}>
            <ChevronDown size={32} className="mx-auto text-gray-400" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <User className="text-blue-600 mr-3" size={24} />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Professional Profile
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Frontend Developer specializing in React.js, TypeScript, and
                  Redux with 3+ years of experience building responsive,
                  high-performance web apps. Passionate about clean code, UI/UX
                  best practices, and scalable frontend architecture. Proven
                  ability to transform business needs into efficient,
                  user-friendly solutions.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <Award className="text-emerald-600 mr-3" size={24} />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Key Strengths
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Intrapreneurial mindset (ownership & innovation within teams)</li>
                  <li>• Highly dedicated & results-driven</li>
                  <li>• Team collaboration & technical mentoring</li>
                  <li>• Efficiency-focused </li>
                </ul>
              </div>
            </div>
            {/* <div className="space-y-4">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="flex items-center text-gray-700 mb-3">
                  <Mail className="mr-3 text-blue-600" size={20} />
                  <span>anandhkumar@email.com</span>
                </div>
                <div className="flex items-center text-gray-700 mb-3">
                  <Phone className="mr-3 text-emerald-600" size={20} />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center text-gray-700 mb-6">
                  <MapPin className="mr-3 text-orange-600" size={20} />
                  <span>Bangalore, Karnataka, India</span>
                </div>
                
                <div className="flex space-x-4">
                  <a href="#" className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors duration-200">
                    <Github size={20} />
                  </a>
                  <a href="#" className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200">
                    <Linkedin size={20} />
                  </a>
                  <a href="#" className="p-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors duration-200">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Technical Skills
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => {
              // const IconComponent = skill.icon;
              return (
                <div
                  key={skill.name}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center mb-4">
                    {/* <IconComponent className="text-blue-600 mr-3" size={24} /> */}
                    <div className={`mr-3
                      ${skill.category === "framework" ? "text-blue-500" : skill.category === "styling" ? "text-purple-500" : "text-indigo-500"}
                    `}>
                      <skill.icon />
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      {skill.name}
                    </h3>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-1000 ease-out"
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

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Work Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-indigo-600"></div>

            {experiences.map((exp, index) => (
              <div key={index} className="relative mb-12 ml-16">
                <div className="absolute -left-20 top-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {exp.title}
                      </h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white/40"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Education
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <GraduationCap className="text-emerald-600 mr-3" size={24} />
                  <h3 className="text-xl font-bold text-gray-900">
                    {edu.degree}
                  </h3>
                </div>
                <p className="text-blue-600 font-medium mb-2">
                  {edu.institution}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{edu.period}</span>
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                    {edu.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Let's Connect
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6"></div>
            {/* <p className="text-xl text-gray-600">
              Ready to collaborate on your next project? 
              Let's discuss how we
              can work together.
            </p> */}
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="text-blue-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">manandhk007@gmail.com</p>
              </div>

              {/* <div className="text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="text-emerald-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600">+91 98765 43210</p>
              </div> */}

              <div className="border-l border-gray-200 text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-orange-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                <p className="text-gray-600">Chennai, Tamilnadu, India</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <p className="text-gray-600 mb-6">Follow me on social media</p>
              <div className="flex justify-center space-x-6">
                {/* <a
                  href="#"
                  className="p-4 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors duration-200 hover:scale-110"
                >
                  <Github size={24} />
                </a> */}
                <a
                  href="https://www.linkedin.com/in/anandhkumar-m-621456225"
                  className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 hover:scale-110"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="#"
                  className="p-4 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors duration-200 hover:scale-110"
                >
                  <ExternalLink size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 px-4 sm:px-3 lg:px-2">
        <div className="max-w-7xl mx-auto text-right">
          <p className="text-gray-400">
            ©2024 Anandhkumar. All rights reserved. Built with React & Tailwind
            CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
