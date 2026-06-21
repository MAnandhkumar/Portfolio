import { fetchCurrentWeather, fetchForecast, fetchWeatherByCoords } from "./weatherService";

global.fetch = jest.fn();

describe("weatherService", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it("fetchCurrentWeather calls correct URL and returns JSON", async () => {
    const mockData = { cod: "200", name: "London" };
    (global.fetch as jest.Mock).mockResolvedValueOnce({ json: async () => mockData });
    const res = await fetchCurrentWeather("London");
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/weather?q=London"));
    expect(res).toEqual(mockData);
  });

  it("fetchForecast calls correct URL and returns JSON", async () => {
    const mockData = { cod: "200", city: { name: "Paris" } };
    (global.fetch as jest.Mock).mockResolvedValueOnce({ json: async () => mockData });
    const res = await fetchForecast("Paris");
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/forecast?q=Paris"));
    expect(res).toEqual(mockData);
  });

  it("fetchWeatherByCoords calls correct URL and returns JSON", async () => {
    const mockData = { cod: "200" };
    (global.fetch as jest.Mock).mockResolvedValueOnce({ json: async () => mockData });
    const res = await fetchWeatherByCoords(10, 20);
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/weather?lat=10&lon=20"));
    expect(res).toEqual(mockData);
  });
});
