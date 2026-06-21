import { Mail, MapPin, ExternalLink } from "lucide-react";

interface ContactProps {
  dict: {
    title: string;
    emailLabel: string;
    locationLabel: string;
    locationValue: string;
    socialLabel: string;
  };
}

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Contact({ dict }: ContactProps) {
  return (
    <section id="contact" className="py-20 ">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {dict.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] mx-auto mb-6"></div>
        </div>

        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <div className="bg-[#a200ff]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-[#ff3b7c]" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {dict.emailLabel}
              </h3>
              <a
                href="mailto:manandhk007@gmail.com"
                className="text-gray-600 dark:text-gray-300 hover:text-[#ff3b7c] dark:hover:text-[#ff9a44] transition-colors"
              >
                manandhk007@gmail.com
              </a>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 pt-8 md:pt-0 text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-orange-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {dict.locationLabel}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{dict.locationValue}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className="text-gray-600 dark:text-gray-300 mb-6 font-medium">{dict.socialLabel}</p>
            <div className="flex justify-center space-x-6">
              <a
                href="https://www.linkedin.com/in/anandhkumar-m-621456225"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] text-white rounded-full hover:opacity-90 transition-opacity transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={24} />
              </a>
              <a
                href="#"
                className="p-4 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                aria-label="External Portfolio"
              >
                <ExternalLink size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
