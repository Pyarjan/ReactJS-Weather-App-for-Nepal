import "./App.css";

function App() {
  return (
    <>
      <div className="w-full h-screen relative overflow-hidden text-center">
        <img
          src="bgimage.webp"
          alt="image"
          className="w-full h-full object-cover"
        />
        <div className="bg-blue-300/50 absolute inset-0 z-10"></div>
        <div className="absolute inset-0 z-20 top-20">
          <h1 className="mb-2 text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            Nepal Weather App
          </h1>
          <p className="mb-2 text-gray-500 text-xl">
            Real-time weather updates for major cities across Nepal
          </p>
          <div>
            <input
              type="search"
              placeholder="Search for a city in Nepal.."
              className="p-2 border-blue-400 border-2 border-r-0  rounded-l-lg text-center bg-white w-[15rem] "
            />
            <button className="bg-blue-400 border-2 hover:border-blue-500 hover:bg-blue-500 border-blue-400 px-5 text-white font-semibold py-2 rounded-r-lg">Search</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
