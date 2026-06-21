"use client";
import { useState } from "react";
import { WeatherApp } from "../WeatherApp/WeatherApp";
import AdvancedCalculator from "../Calculator/Calculator";

const apps = [
  { key: "weather", label: "Weather App" },
  { key: "calculator", label: "Advanced Calculator" },
];

export default function AppsPage() {
  const [selectedApp, setSelectedApp] = useState<string>("weather");

  const renderApp = () => {
    switch (selectedApp) {
      case "weather":
        return <WeatherApp />;
      case "calculator":
        return <AdvancedCalculator />;
      default:
        return (
          <div className="text-gray-500 flex justify-center items-center h-full">Select an app</div>
        );
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-[95%] lg:max-w-[90%] mx-auto py-6 md:py-8 gap-4 md:gap-6">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-3xl p-5 shadow-lg flex-shrink-0">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
          My Apps
        </h2>
        <nav>
          <ul className="space-y-3">
            {apps.map((app) => (
              <li key={app.key}>
                <button
                  onClick={() => setSelectedApp(app.key)}
                  className={`w-full text-left px-5 py-3 rounded-xl transition-all duration-300 font-bold ${
                    selectedApp === app.key
                      ? "bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] text-white shadow-md shadow-[#ff3b7c]/20 scale-[1.02]"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  {app.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg flex flex-col">
        <div className="p-4 md:p-8 min-h-full flex-1 overflow-y-auto relative">{renderApp()}</div>
      </main>
    </div>
  );
}
