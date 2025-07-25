const Footer = () => {
  return (
    <footer className="bg-gray-800/50 backdrop-blur text-gray-300 py-6 mt-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm">
        <p className="text-center sm:text-left">
          🇳🇵 <strong>Nepal Weather App</strong> — Showing real-time weather
          updates for cities in Nepal only.
        </p>
        <a
          href="https://www.pyarjanthapa.com.np/"
          target="_blank"
          className="mt-2 sm:mt-0 text-center sm:text-right"
        >
          Built by{" "}
          <span className="text-blue-400 font-semibold">Pyarjan Thapa</span>{" "}
          &copy; {new Date().getFullYear()}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
