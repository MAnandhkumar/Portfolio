import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ClientLayout } from "@/app/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Anandhkumar | Frontend Developer Portfolio",
  description:
    "Professional portfolio of Anandhkumar, a Frontend Developer with 3+ years of experience building high-performance, responsive web applications using React.js, TypeScript, and Redux.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "TypeScript",
    "Redux",
    "Web Developer Portfolio",
    "Anandhkumar",
  ],
  authors: [{ name: "Anandhkumar" }],
  icons: {
    icon: "/favicon.ico?v=2",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

import CFG from "@/config/config.json";

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;
  const dir = CFG?.layout?.page_direction === "right" ? "rtl" : "ltr";

  return (
    <html
      lang={locale || "en"}
      dir={dir}
      className={`${inter.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-gray-900 dark:to-indigo-950 text-slate-900 dark:text-slate-100 font-sans antialiased flex flex-col transition-colors duration-300">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
