"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  Menu as MenuIcon,
  X,
  Moon,
  Sun,
  Globe,
  Home,
  User,
  Code,
  Briefcase,
  Mail,
  Folder,
  AppWindow,
} from "lucide-react";
import { useTheming } from "../../hooks/Theme.hook";
import { useLang } from "../../hooks/Language.hook";

export default function AkHeader() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { selectedTheme, changeTheme } = useTheming();
  const { lang, changeLang } = useLang();

  const navLinks = [
    { key: "home", label: t("home", "Home"), href: "/", icon: Home },
    { key: "about", label: t("about", "About"), href: "/about", icon: User },
    { key: "skills", label: t("skills", "Skills"), href: "/skills", icon: Code },
    { key: "work", label: t("work", "Work"), href: "/work", icon: Briefcase },
    { key: "projects", label: t("projects", "Projects"), href: "/projects", icon: Folder },
    { key: "apps", label: t("apps", "My Apps"), href: "/apps", icon: AppWindow },
    { key: "contact", label: t("contact", "Contact"), href: "/contact", icon: Mail },
  ];

  const imagePath = "/images/AKLogo.png";

  const handleLogoClick = () => {
    router.push("/");
  };

  const toggleTheme = () => {
    changeTheme(selectedTheme === "dark" ? "default" : "dark");
  };

  const toggleLang = () => {
    const newLang = lang === "ta-IN" ? "en-US" : "ta-IN";
    changeLang(newLang);

    const localePrefix = newLang === "ta-IN" ? "ta" : "en";
    const pathSegments = pathname.split("/");

    if (pathSegments.length > 1 && (pathSegments[1] === "en" || pathSegments[1] === "ta")) {
      pathSegments[1] = localePrefix;
      router.push(pathSegments.join("/") || "/");
    } else {
      router.push(`/${localePrefix}${pathname === "/" ? "" : pathname}`);
    }
  };

  return (
    <header className="w-full h-16 md:h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm md:shadow-none transition-colors duration-300 flex flex-col relative z-50">
      <div className="w-full max-w-[90%] md:max-w-none mx-auto md:mx-0 h-full md:flex-1 flex flex-col px-0 md:px-0 md:py-0">
        {/* Mobile Header Row / Desktop Top Logo Row */}
        <div className="flex justify-between items-center h-16 md:h-auto md:flex-col md:items-center md:w-full">
          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-center justify-center cursor-pointer md:w-[80px] md:h-[80px] md:border-b border-gray-100 dark:border-gray-800/50 hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          >
            <Image
              src={imagePath}
              alt="logo"
              width={40}
              height={40}
              style={{ width: "40px", height: "auto" }}
              priority
            />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {selectedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={toggleLang}
              className="flex items-center space-x-1 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium text-sm"
              aria-label="Toggle Language"
            >
              <span>{lang === "ta-IN" ? "TA" : "EN"}</span>
            </button>

            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#ff3b7c]"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex flex-col items-center w-full flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            const isLast = index === navLinks.length - 1;
            const isActive =
              link.href === "/"
                ? pathname === "/" || pathname === "/en" || pathname === "/ta"
                : pathname.includes(link.href);

            return (
              <Link
                key={link.key}
                href={link.href}
                className={`group flex flex-col items-center justify-center w-full h-[65px] transition-colors duration-200 ${isActive ? "text-[#ff3b7c] dark:text-[#ff9a44] bg-gray-50 dark:bg-gray-800" : "text-gray-500 dark:text-gray-400 hover:text-[#ff3b7c] dark:hover:text-[#ff9a44] hover:bg-gray-50 dark:hover:bg-gray-800"} ${isLast ? "" : "border-b border-gray-100 dark:border-gray-800/50"}`}
              >
                <Icon
                  size={20}
                  className={`mb-1.5 transition-all duration-300 ${isActive ? "scale-110 -translate-y-1" : "group-hover:scale-110 group-hover:-translate-y-1"}`}
                />
                <span className="text-[9px] font-medium tracking-wide uppercase">{link.label}</span>
              </Link>
            );
          })}

          {/* Toggles (Desktop) - Minimal Floating Design */}
          <div className="flex flex-col items-center pt-4 mt-auto w-full pb-4 space-y-4">
            <button
              onClick={toggleTheme}
              className="group relative flex items-center justify-center w-[40px] h-[40px] rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-[0_0_15px_rgba(162,0,255,0.4)] border border-gray-200 dark:border-gray-700 hover:border-[#a200ff] transition-all duration-300 z-10"
              aria-label="Toggle Dark Mode"
            >
              {selectedTheme === "dark" ? (
                <Sun
                  size={18}
                  className="text-[#ff9a44] group-hover:rotate-90 transition-transform duration-500 relative z-10"
                />
              ) : (
                <Moon
                  size={18}
                  className="text-[#a200ff] group-hover:-rotate-12 transition-transform duration-500 relative z-10"
                />
              )}
            </button>

            <button
              onClick={toggleLang}
              className="group relative flex items-center justify-center w-[40px] h-[40px] rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-[0_0_15px_rgba(255,59,124,0.4)] border border-gray-200 dark:border-gray-700 hover:border-[#ff3b7c] transition-all duration-300 z-10"
              aria-label="Toggle Language"
            >
              <Globe
                size={16}
                className="text-[#ff3b7c] group-hover:animate-pulse absolute top-1.5"
              />
              <span className="text-[8px] font-bold text-gray-500 group-hover:text-[#ff3b7c] uppercase absolute bottom-1.5">
                {lang === "ta-IN" ? "TA" : "EN"}
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 z-50 shadow-xl" id="mobile-menu">
          <div className="px-4 pt-2 pb-6 space-y-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/" || pathname === "/en" || pathname === "/ta"
                  : pathname.includes(link.href);

              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`block px-3 py-3 rounded-md text-base font-medium transition-colors ${isActive ? "text-[#ff3b7c] dark:text-[#ff9a44] bg-gray-50 dark:bg-gray-800" : "text-gray-600 dark:text-gray-300 hover:text-[#ff3b7c] dark:hover:text-[#ff9a44] hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
