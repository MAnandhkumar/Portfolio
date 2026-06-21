const API_KEY = "5a4a575a089b315324f1433fcd7fa051"; // Got from https://openweathermap.org/
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  cod: string;
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
  wind: {
    speed: number;
  };
  name?: string;
}

export interface ForecastData {
  cod: string;
  list: WeatherData[];
  city: {
    name: string;
    country: string;
  };
}

export const fetchCurrentWeather = async (location: string): Promise<WeatherData> => {
  const response = await fetch(`${BASE_URL}/weather?q=${location}&units=metric&appid=${API_KEY}`);
  return response.json();
};

export const fetchForecast = async (location: string): Promise<ForecastData> => {
  const response = await fetch(`${BASE_URL}/forecast?q=${location}&units=metric&appid=${API_KEY}`);
  return response.json();
};

export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
  );
  return response.json();
};
