import { useEffect, useState } from "react";
import "./App.css";
import { IoSearch } from "react-icons/io5";

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
      "Kathmandu",
      "Pokhara",
      "Biratnagar",
      "Lalitpur",
      "Nepalgunj",
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
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
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

  return (
    <>
      <div className="w-full h-screen  relative overflow-hidden text-center">
        <img
          src="bgimage.webp"
          alt="image"
          className="w-full h-full object-cover"
        />
        <div className="bg-blue-300/50 absolute inset-0  z-10"></div>
        <div className="absolute inset-0 z-20 px-5 top-20">
          <h1 className="mb-2 text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            Nepal Weather App
          </h1>
          <p className="mb-2 text-gray-500 lg:text-xl">
            Real-time weather updates for major cities across Nepal
          </p>
          <div className="sm:flex items-center justify-center mt-15 gap-5  sm:w-lg sm:mx-auto">
            <div className="relative mb-5 sm:mb-0 w-full">
              {/* Search Icon */}
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <IoSearch className="w-5 h-5 text-gray-400" />
              </div>

              {/* Input Field */}
              <input
                type="search"
                placeholder="Search for a city in Nepal..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="pl-10 p-2 focus:outline-0 rounded-lg bg-gray-100 w-full"
              />

              {/* Hide the default cancel "X" in WebKit */}
              <style>
                {`
            input[type="search"]::-webkit-search-cancel-button {
              -webkit-appearance: none;
              appearance: none;
              display: none;
            }
          `}
              </style>
            </div>

            {/* Search Button */}
            <button
              onClick={fetchWeather}
              className="bg-blue-400 w-full sm:w-auto border-2 hover:border-blue-500 hover:bg-blue-500 border-blue-400 px-5 text-white font-semibold py-2 rounded-lg"
            >
              Search
            </button>
          </div>

          {/* main weather card */}
          <div className="w-7xl h-full  mx-auto mt-15 rounded-lg">
            {loading && <p className="mt-4">Loading....</p>}
            {error && <p className="mt-4 text-white">{error}</p>}
            {weatherData && (
              <div className="mt-4 bg-gray-100 w-fit  p-4 rounded">
                <h2 className="text-xl font-bold">
                  {weatherData.name}, {weatherData.sys.country}
                </h2>
                <p>{weatherData.weather[0].description}</p>
                <p>🌡 Temp: {weatherData.main.temp}°C</p>
                <p>💧 Humidity: {weatherData.main.humidity}%</p>
                <p>💨 Wind: {weatherData.wind.speed} m/s</p>
              </div>
            )}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {defaultCitiesData.map((data) => (
                <div
                  key={data.name}
                  className="bg-white/80 p-4 rounded shadow text-left backdrop-blur-sm"
                >
                  <h3 className="text-xl font-bold">
                    {data.name}, {data.sys.country}
                  </h3>
                  <p className="capitalize">{data.weather[0].description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <img
                      src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                      alt="icon"
                      className="w-12 h-12"
                    />
                    <div>
                      <p>🌡 {data.main.temp}°C</p>
                      <p>💧 {data.main.humidity}%</p>
                      <p>💨 {data.wind.speed} m/s</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
