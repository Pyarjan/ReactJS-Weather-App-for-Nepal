import { useEffect, useState } from "react";
import "./App.css";
import { IoSearch } from "react-icons/io5";
import CloudBackground from "./component/CloudBackground";
import Footer from "./component/Footer";

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setweatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [defaultCitiesData, setDefaultCitiesData] = useState<WeatherData[]>([]);

  useEffect(() => {
    const defaultCities = [
      "Butwal",
      "Kathmandu",
      "Pokhara",
      "Biratnagar",
      "Lalitpur",
    ];
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    const fetchDefaults = async () => {
      try {
        const promises = defaultCities.map(async (city) => {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},np&appid=${apiKey}&units=metric`
          );
          if (!response.ok) throw new Error(`Failed to fetch ${city}`);
          return response.json();
        });

        const results = await Promise.all(promises);
        setDefaultCitiesData(results);
      } catch (err) {
        console.error("Error fetching default cities:", err);
      }
    };

    fetchDefaults();
  }, []);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError("");

      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      if (!city.trim()) {
        setError("Please enter a city name.");
        return;
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},np&appid=${apiKey}&units=metric`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("City not found!");
      }

      const data = await response.json();
      setweatherData(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <>
      <CloudBackground />
      <div className="text-center min-h-screen p-2">
        <h1 className="mb-2 text-white pt-15 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
          Nepal Weather App
        </h1>
        <p className="mb-2 text-gray-500 lg:text-xl">
          Real-time weather updates for major cities across Nepal
        </p>

        {/* SEARCH FORM */}
        <form
          onSubmit={handleSubmit}
          className="relative mb-5 flex justify-center items-center sm:mb-0 w-full sm:w-[500px] mx-auto"
        >
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <IoSearch className="w-5 h-5 text-gray-400" />
          </div>

          <input
            type="search"
            placeholder="Search for a city in Nepal..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-5 pl-10 focus:outline-0 rounded-full border border-gray-500 bg-gray-100 w-full"
          />

          <button
            type="submit"
            className="absolute right-0 w-auto border-blue-400 px-5 font-semibold py-2 rounded-lg"
          >
            Search
          </button>
        </form>

        {/* Weather Results */}
        <div className="max-w-7xl mx-auto mt-15 rounded-lg">
          {loading && <p className="mt-4 text-white">Loading...</p>}
          {error && <p className="mt-4 text-red-400">{error}</p>}
          {weatherData && (
            <div className="backdrop-blur-xl rounded-xl border border-white shadow-sm mx-auto p-6 ">
              <div className="mb-6 text-left">
                <h3 className="text-lg font-medium text-gray-900">
                  {weatherData.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {weatherData.sys.country}
                </p>
              </div>

              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-5xl font-light text-gray-900 mb-1">
                    {Math.round(weatherData.main.temp)}°
                  </div>
                  <p className="text-gray-600 capitalize text-sm">
                    {weatherData.weather[0].description}
                  </p>
                </div>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt="weather icon"
                  className="w-16 h-16 opacity-80"
                />
              </div>

              <div className="space-y-4 border-t border-white pt-5">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Humidity</span>
                  <span className="text-gray-900 font-medium">
                    {weatherData.main.humidity}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Wind</span>
                  <span className="text-gray-900 font-medium">
                    {weatherData.wind.speed} m/s
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Default City Cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {defaultCitiesData.map((data) => (
              <div
                key={data.name}
                className="bg-white/50 min-w-full rounded-xl border border-gray-200 shadow-sm max-w-xs mx-auto p-6"
              >
                <div className="mb-6 text-left">
                  <h3 className="text-lg font-medium text-gray-900">
                    {data.name}
                  </h3>
                  <p className="text-sm text-gray-500">{data.sys.country}</p>
                </div>

                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="text-5xl font-light text-gray-900 mb-1">
                      {Math.round(data.main.temp)}°
                    </div>
                    <p className="text-gray-600 capitalize text-sm">
                      {data.weather[0].description}
                    </p>
                  </div>
                  <img
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    alt="weather icon"
                    className="w-16 h-16 opacity-80"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Humidity</span>
                    <span className="text-gray-900 font-medium">
                      {data.main.humidity}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Wind</span>
                    <span className="text-gray-900 font-medium">
                      {data.wind.speed} m/s
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
