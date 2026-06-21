"use client";
// src/WeatherApp/WeatherApp.tsx
import { useState, useEffect } from "react";
import { MapPin, Search, Lightbulb, AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import ReactECharts from "echarts-for-react";
import {
  fetchCurrentWeather,
  fetchForecast,
  fetchWeatherByCoords,
  WeatherData,
  ForecastData,
} from "../../services/WeatherApi/weatherService";

export const WeatherApp = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const fetchWeather = async (loc: string) => {
    try {
      setLoading(true);
      setError("");
      const [current, forecastData] = await Promise.all([
        fetchCurrentWeather(loc),
        fetchForecast(loc),
      ]);

      // OpenWeather API returns 404 errors as valid responses (not thrown), so check manually
      if (current?.cod === "404" || forecastData?.cod === "404") {
        setError("Location not found. Please try another city.");
        setWeather(null);
        setForecast(null);
        return;
      }

      setWeather(current);
      setForecast(forecastData);
    } catch {
      setError("Failed to fetch data. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Get user's location on first load
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            setLoading(true);
            const data = await fetchWeatherByCoords(
              position.coords.latitude,
              position.coords.longitude,
            );
            setWeather(data);
            const forecastData = await fetchForecast(data.name || "London");
            setForecast(forecastData);
          } catch {
            setError("Failed to fetch weather data");
          } finally {
            setLoading(false);
          }
        },
        () => {
          // Fallback to default location if geolocation fails
          fetchWeather("London");
        },
      );
    } else {
      fetchWeather("London");
    }
  }, []);

  const handleSearch = () => {
    if (location.trim()) {
      fetchWeather(location);
    }
  };

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const prepareChartData = () => {
    if (!forecast) return null;
    return true; // We don't actually use chartData directly since we have individual getters, just checking if we can show charts
  };

  const getHumidityOptions = () => {
    const filtered = forecast?.list.filter((_, i: number) => i % 8 === 0) || [];
    const labels = filtered.map((item) =>
      new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" }),
    );
    const humidity = filtered.map((item) => item.main.humidity);

    return {
      title: {
        text: "Humidity Levels",
        left: "center",
        textStyle: { color: darkMode ? "#fff" : "#000" },
      },
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: labels,
        axisLabel: { color: darkMode ? "#fff" : "#000" },
      },
      yAxis: {
        type: "value",
        axisLabel: { color: darkMode ? "#fff" : "#000" },
      },
      series: [
        {
          data: humidity,
          type: "bar",
          itemStyle: {
            color: "#1890ff",
          },
        },
      ],
    };
  };

  const getWindSpeedOptions = () => {
    const filtered = forecast?.list.filter((_, i: number) => i % 8 === 0) || [];

    const data = filtered.map((item) => ({
      value: item.wind.speed,
      name: new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" }),
    }));

    return {
      title: {
        text: "Wind Speed Distribution",
        left: "center",
        textStyle: { color: darkMode ? "#fff" : "#000" },
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} m/s ({d}%)",
      },
      legend: {
        bottom: 0,
        textStyle: { color: darkMode ? "#fff" : "#000" },
      },
      series: [
        {
          name: "Wind Speed",
          type: "pie",
          radius: "50%",
          data,
          itemStyle: {
            borderRadius: 5,
            borderColor: "#fff",
            borderWidth: 2,
          },
        },
      ],
    };
  };

  const getTemperatureOptions = () => {
    const filtered = forecast?.list.filter((_, i: number) => i % 8 === 0) || [];
    const labels = filtered.map((item) =>
      new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" }),
    );
    const temps = filtered.map((item) => item.main.temp);

    return {
      title: {
        text: "5-Day Temperature",
        left: "center",
        textStyle: { color: darkMode ? "#fff" : "#000" },
      },
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: labels,
        axisLabel: { color: darkMode ? "#fff" : "#000" },
      },
      yAxis: {
        type: "value",
        axisLabel: { color: darkMode ? "#fff" : "#000" },
      },
      series: [
        {
          data: temps,
          type: "line",
          smooth: true,
          areaStyle: {},
          itemStyle: {
            color: "#ff4d4f",
          },
        },
      ],
    };
  };

  const chartData = prepareChartData();

  return (
    <div className={`weather-app p-4 ${darkMode ? "dark" : ""}`}>
      <div
        className={`max-w-4xl mx-auto rounded-2xl shadow-xl overflow-hidden transition-colors duration-300 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
      >
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold m-0">Real-time Weather App</h3>
            <div className="flex items-center gap-3">
              <Lightbulb size={20} className={darkMode ? "text-yellow-400" : "text-gray-500"} />
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-14 h-7 rounded-full flex items-center transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#ff3b7c] ${darkMode ? "bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] justify-end" : "bg-gray-300 justify-start"}`}
                aria-label="Toggle dark mode"
              >
                <span
                  className={`w-5 h-5 rounded-full bg-white mx-1 shadow-md transform transition-transform duration-300`}
                ></span>
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Enter city name"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff3b7c] focus:border-[#ff3b7c] sm:text-sm transition-colors duration-200 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#a200ff] via-[#ff3b7c] to-[#ff9a44] hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff3b7c] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin mr-2" />
              ) : (
                <Search size={18} className="mr-2" />
              )}
              Search
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-md flex items-start">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 size={48} className="animate-spin text-[#ff3b7c]" />
            </div>
          ) : weather && forecast ? (
            <>
              {/* Current Weather Display */}
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-2">
                  {weather.name}, {forecast.city.country}
                </h2>
                <div className="flex justify-center my-4">
                  <Image
                    src={getWeatherIcon(weather.weather[0].icon)}
                    alt={weather.weather[0].description}
                    width={112}
                    height={112}
                    className="w-28 h-28 drop-shadow-md"
                  />
                </div>
                <h1 className="text-5xl font-extrabold my-2">{Math.round(weather.main.temp)}°C</h1>
                <p className="text-xl font-medium capitalize text-gray-500 dark:text-gray-400">
                  {weather.weather[0].description}
                </p>
              </div>

              {/* Weather Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div
                  className={`p-6 rounded-xl shadow-sm border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}
                >
                  <p className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    Feels Like
                  </p>
                  <h3 className="text-2xl font-bold">{Math.round(weather.main.feels_like)}°C</h3>
                </div>
                <div
                  className={`p-6 rounded-xl shadow-sm border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}
                >
                  <p className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    Humidity
                  </p>
                  <h3 className="text-2xl font-bold">{weather.main.humidity}%</h3>
                </div>
                <div
                  className={`p-6 rounded-xl shadow-sm border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}
                >
                  <p className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    Wind Speed
                  </p>
                  <h3 className="text-2xl font-bold">{weather.wind.speed} m/s</h3>
                </div>
              </div>

              <div className="flex items-center my-8">
                <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                <span className="px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  5-Day Forecast
                </span>
                <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
              </div>

              {/* Charts Section */}
              {chartData && (
                <>
                  <div className="flex items-center my-8">
                    <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                    <span className="px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Weather Charts
                    </span>
                    <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1 md:col-span-2">
                      <ReactECharts
                        option={getTemperatureOptions()}
                        style={{ height: 300, width: "100%" }}
                      />
                    </div>
                    <div className="col-span-1">
                      <ReactECharts
                        option={getHumidityOptions()}
                        style={{ height: 300, width: "100%" }}
                      />
                    </div>
                    <div className="col-span-1">
                      <ReactECharts
                        option={getWindSpeedOptions()}
                        style={{ height: 300, width: "100%" }}
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
