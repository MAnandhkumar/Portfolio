"use client";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

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

export default function Contact() {
  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-8 dark:bg-gray-900 max-w-[95%] lg:max-w-[90%] mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Let's Connect
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] mx-auto mb-4"></div>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
              Ready to collaborate on your next project? Let's discuss how we can work together.
            </p>
          </div>

          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl mb-8">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="bg-[#a200ff]/10 dark:bg-[#a200ff]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110 shadow-[0_0_15px_rgba(162,0,255,0.2)]">
                  <Mail className="text-[#a200ff]" size={24} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Email</h3>
                <a
                  href="mailto:infinitianandh@gmail.com"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#ff3b7c] transition-colors font-medium text-sm md:text-base"
                >
                  infinitianandh@gmail.com
                </a>
              </div>

              <div className="text-center">
                <div className="bg-[#ff3b7c]/10 dark:bg-[#ff3b7c]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110 shadow-[0_0_15px_rgba(255,59,124,0.2)]">
                  <Phone className="text-[#ff3b7c]" size={24} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Phone</h3>
                <a
                  href="tel:+91944433145"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#ff3b7c] transition-colors font-medium text-sm md:text-base"
                >
                  +91-944433145
                </a>
              </div>

              <div className="text-center">
                <div className="bg-[#ff9a44]/10 dark:bg-[#ff9a44]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110 shadow-[0_0_15px_rgba(255,154,68,0.2)]">
                  <MapPin className="text-[#ff9a44]" size={24} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Location</h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium text-sm md:text-base">
                  Chennai, India
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <p className="text-gray-600 dark:text-gray-300 mb-6 font-bold uppercase tracking-wider text-sm">
                Connect on Social Media
              </p>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://www.linkedin.com/in/anandhkumar-m-621456225"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white dark:bg-gray-800 text-[#0077b5] dark:text-white border border-gray-200 dark:border-gray-700 rounded-full hover:bg-[#0077b5] hover:text-white dark:hover:bg-[#0077b5] transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-[#0077b5]/50 group"
                >
                  <LinkedinIcon size={24} />
                </a>
                <a
                  href="#"
                  className="p-4 bg-gray-600 dark:bg-gray-500 text-white rounded-full hover:bg-gray-700 dark:hover:bg-gray-400 transition-all duration-200 hover:scale-110 shadow-md"
                >
                  <ExternalLink size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-xl max-w-2xl mx-auto text-left">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send me a message
            </h3>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#ff3b7c] focus:border-transparent outline-none transition-all"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#ff3b7c] focus:border-transparent outline-none transition-all"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#ff3b7c] focus:border-transparent outline-none transition-all resize-y"
                  placeholder="Enter comments"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] hover:opacity-90 transition-opacity text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md focus:ring-4 focus:ring-[#ff3b7c]/50 outline-none"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
