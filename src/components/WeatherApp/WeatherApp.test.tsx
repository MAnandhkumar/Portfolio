import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { WeatherApp } from "./WeatherApp";
import * as weatherService from "../../services/WeatherApi/weatherService";

jest.mock("../../services/WeatherApi/weatherService", () => ({
  fetchCurrentWeather: jest.fn(),
  fetchForecast: jest.fn(),
  fetchWeatherByCoords: jest.fn(),
}));

jest.mock("echarts-for-react", () => () => <div data-testid="mock-echarts" />);

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};
Object.defineProperty(global.navigator, "geolocation", {
  value: mockGeolocation,
});

describe("WeatherApp", () => {
  const mockCurrentWeather = {
    name: "London",
    weather: [{ icon: "01d", description: "clear sky" }],
    main: { temp: 20, feels_like: 21, humidity: 50 },
    wind: { speed: 5 },
  };

  const mockForecast = {
    city: { country: "GB" },
    list: Array(40)
      .fill(null)
      .map((_, i) => ({
        dt: 1600000000 + i * 10800,
        main: { temp: 20, humidity: 50 },
        wind: { speed: 5 },
      })),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and displays weather for London by default if no geolocation", async () => {
    mockGeolocation.getCurrentPosition.mockImplementation((success, error) => error());
    (weatherService.fetchCurrentWeather as jest.Mock).mockResolvedValue(mockCurrentWeather);
    (weatherService.fetchForecast as jest.Mock).mockResolvedValue(mockForecast);

    render(<WeatherApp />);

    await waitFor(() => {
      expect(screen.getByText("London, GB")).toBeInTheDocument();
      expect(screen.getByText("clear sky")).toBeInTheDocument();
    });
  });

  it("fetches and displays weather based on geolocation", async () => {
    mockGeolocation.getCurrentPosition.mockImplementation((success) =>
      success({ coords: { latitude: 51.5, longitude: -0.1 } }),
    );
    (weatherService.fetchWeatherByCoords as jest.Mock).mockResolvedValue(mockCurrentWeather);
    (weatherService.fetchForecast as jest.Mock).mockResolvedValue(mockForecast);

    render(<WeatherApp />);

    await waitFor(() => {
      expect(weatherService.fetchWeatherByCoords).toHaveBeenCalledWith(51.5, -0.1);
      expect(screen.getByText("London, GB")).toBeInTheDocument();
    });
  });

  it("handles search input", async () => {
    mockGeolocation.getCurrentPosition.mockImplementation((success, error) => error());
    (weatherService.fetchCurrentWeather as jest.Mock).mockResolvedValue(mockCurrentWeather);
    (weatherService.fetchForecast as jest.Mock).mockResolvedValue(mockForecast);

    render(<WeatherApp />);

    await waitFor(() => expect(screen.getByText("London, GB")).toBeInTheDocument());

    const input = screen.getByPlaceholderText("Enter city name");
    fireEvent.change(input, { target: { value: "Paris" } });

    (weatherService.fetchCurrentWeather as jest.Mock).mockResolvedValue({
      ...mockCurrentWeather,
      name: "Paris",
    });
    (weatherService.fetchForecast as jest.Mock).mockResolvedValue({
      ...mockForecast,
      city: { country: "FR" },
    });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(weatherService.fetchCurrentWeather).toHaveBeenCalledWith("Paris");
      expect(screen.getByText("Paris, FR")).toBeInTheDocument();
    });
  });

  it("shows location not found if API returns 404", async () => {
    mockGeolocation.getCurrentPosition.mockImplementation((success, error) => error());
    (weatherService.fetchCurrentWeather as jest.Mock).mockResolvedValue({ cod: "404" });
    (weatherService.fetchForecast as jest.Mock).mockResolvedValue(mockForecast);

    render(<WeatherApp />);

    await waitFor(() => {
      expect(screen.getByText("Location not found. Please try another city.")).toBeInTheDocument();
    });
  });

  it("renders different weather condition classes", async () => {
    mockGeolocation.getCurrentPosition.mockImplementation((success, error) => error());
    (weatherService.fetchCurrentWeather as jest.Mock).mockResolvedValue({
      ...mockCurrentWeather,
      weather: [{ icon: "09d", description: "rain", main: "Rain" }],
    });
    (weatherService.fetchForecast as jest.Mock).mockResolvedValue(mockForecast);

    render(<WeatherApp />);

    await waitFor(() => {
      expect(screen.getByText("rain")).toBeInTheDocument();
    });
  });

  it("toggles dark mode and handles Enter key search", async () => {
    mockGeolocation.getCurrentPosition.mockImplementation((success, error) => error());
    (weatherService.fetchCurrentWeather as jest.Mock).mockResolvedValue(mockCurrentWeather);
    (weatherService.fetchForecast as jest.Mock).mockResolvedValue(mockForecast);

    render(<WeatherApp />);

    await waitFor(() => {
      expect(screen.getByText("London, GB")).toBeInTheDocument();
    });

    // Toggle Dark Mode
    const toggleBtn = screen.getByRole("button", { name: /toggle dark mode/i });
    fireEvent.click(toggleBtn);

    // Press Enter to search
    const input = screen.getByPlaceholderText("Enter city name");
    fireEvent.change(input, { target: { value: "Berlin" } });

    (weatherService.fetchCurrentWeather as jest.Mock).mockResolvedValue({
      ...mockCurrentWeather,
      name: "Berlin",
    });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(weatherService.fetchCurrentWeather).toHaveBeenCalledWith("Berlin");
    });

    // Test empty search
    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));
  });
});
