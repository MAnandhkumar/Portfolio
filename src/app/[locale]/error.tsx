"use client";

import { useEffect } from "react";
import { AlertOctagon, RefreshCw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-md border border-red-100 rounded-3xl p-8 shadow-xl text-center">
        <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
          <AlertOctagon size={40} className="animate-bounce" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-8 text-sm leading-relaxed">
          An unexpected error occurred while loading this page. Please try reloading or check back
          shortly.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] text-white px-6 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw size={18} />
            Try again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-50 transition-all font-semibold cursor-pointer"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
}
