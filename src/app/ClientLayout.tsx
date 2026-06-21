"use client";
import "@/App.scss";
import Image from "next/image";
import AkHeader from "@/components/Header/Header";
import ChatBot from "@/components/Chatbox/Chatbox";
import { Providers } from "@/app/Providers";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="flex flex-col md:flex-row min-h-screen bg-white dark:bg-gray-900 w-full max-w-[100vw] overflow-x-hidden overflow-y-auto">
        {/* Left Side: Header (Fixed top on mobile, fixed left sidebar on desktop) */}
        <div className="fixed top-0 left-0 right-0 md:fixed md:top-0 md:bottom-0 md:left-0 md:h-screen md:w-[80px] md:flex-shrink-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-50">
          <AkHeader />
        </div>

        {/* Middle: Main Content */}
        <main className="ak-content block w-full pt-16 md:pt-4 pb-16 md:pb-4 px-3 md:px-6 min-h-screen overflow-x-hidden md:ml-[80px] md:mr-[25%] lg:mr-[28%] md:w-auto">
          {/* Mobile Image View */}
          <div className="md:hidden flex justify-center mb-8">
            <Image
              src="/images/home.png"
              alt="Profile"
              width={300}
              height={300}
              className="object-contain drop-shadow-xl scale-x-[-1]"
              priority
            />
          </div>
          {children}
        </main>

        <ChatBot />

        {/* Right Side: Desktop Image (Fixed) */}
        <div className="hidden md:flex fixed right-0 top-0 bottom-0 h-screen w-[25%] lg:w-[28%] items-center justify-center bg-white dark:bg-gray-900 z-40">
          <Image
            src="/images/home.png"
            alt="Profile"
            width={800}
            height={800}
            className="object-contain w-full max-h-[85vh] drop-shadow-2xl hover:scale-105 transition-transform duration-700 scale-x-[-1]"
            priority
          />
        </div>
      </div>
    </Providers>
  );
}
