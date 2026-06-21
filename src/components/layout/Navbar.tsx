"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface NavbarProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
  dict: {
    about: string;
    skills: string;
    experience: string;
    education: string;
    contact: string;
  };
  locale: string;
}

export default function Navbar({ activeSection, scrollToSection, dict, locale }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fullName = locale === "ta" ? "வணக்கம் ✨" : "WELCOME ✨";

  const [prevLocale, setPrevLocale] = useState(locale);

  // Typing reset when language changes
  if (locale !== prevLocale) {
    setPrevLocale(locale);
    setDisplayName("");
    setCurrentIndex(0);
    setIsTyping(true);
  }

  // Click outside to close language dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

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
      isTyping ? 300 : 75,
    );
    return () => clearTimeout(timer);
  }, [currentIndex, isTyping, fullName]);

  const navItems = [
    { id: "about", label: dict.about },
    { id: "skills", label: dict.skills },
    { id: "experience", label: dict.experience },
    { id: "education", label: dict.education },
    { id: "contact", label: dict.contact },
  ];

  const handleLanguageChange = (newLocale: string) => {
    if (!pathname) return;
    setIsLangDropdownOpen(false);
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-white/20 dark:border-gray-800/50  shadow-sm transition-colors duration-300">
      <div className="max-w-[90%] mx-auto flex justify-between items-center py-4">
        <div className="text-2xl font-bold bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] bg-clip-text text-transparent">
          {displayName}
          <span className={showCursor ? "opacity-100" : "opacity-0"}>|</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-gray-700 dark:text-gray-300 hover:text-[#ff3b7c] dark:hover:text-[#ff9a44] transition-colors duration-200 relative group font-medium cursor-pointer ${
                activeSection === item.id ? "text-[#ff3b7c] dark:text-[#ff9a44]" : ""
              }`}
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </button>
          ))}

          {/* Premium Language Dropdown Switcher */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#ff3b7c] dark:hover:text-[#ff9a44] hover:border-[#ff3b7c] dark:hover:border-[#ff3b7c] transition-all cursor-pointer font-medium text-sm bg-white/40 dark:bg-gray-800/40"
              aria-label="Switch language"
            >
              <Globe size={16} />
              <span className="uppercase">{locale}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${isLangDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl z-50 py-1.5 animate-fade-in-up">
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between ${
                    locale === "en"
                      ? "text-[#ff3b7c] dark:text-[#ff9a44] font-semibold"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <span>English</span>
                  {locale === "en" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44]"></span>
                  )}
                </button>
                <button
                  onClick={() => handleLanguageChange("ta")}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between ${
                    locale === "ta"
                      ? "text-[#ff3b7c] dark:text-[#ff9a44] font-semibold"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <span>தமிழ் (Tamil)</span>
                  {locale === "ta" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44]"></span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Mobile Language Switcher Quick Action */}
          <button
            onClick={() => handleLanguageChange(locale === "en" ? "ta" : "en")}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold cursor-pointer bg-white/40 dark:bg-gray-800/40 uppercase"
            aria-label="Toggle language"
          >
            <Globe size={12} />
            <span>{locale === "en" ? "ta" : "en"}</span>
          </button>

          <button
            className="text-gray-700 dark:text-gray-300 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-white/20 dark:border-gray-800/50 absolute left-0 right-0 top-full shadow-lg">
          <div className="px-4 py-2 space-y-2 pb-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left py-2 font-medium transition-colors duration-200 cursor-pointer ${
                  activeSection === item.id
                    ? "text-[#ff3b7c] dark:text-[#ff9a44]"
                    : "text-gray-700 dark:text-gray-300 hover:text-[#ff3b7c] dark:hover:text-[#ff9a44]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
