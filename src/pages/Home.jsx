import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[70vh] px-6">

      {/* Brand Title */}
      <h1 className="text-5xl font-semibold text-[#1F2933] mb-4 tracking-wide">
        Suvidha Elite
      </h1>

      {/* Tagline */}
      <p className="text-xl text-[#C9A227] mb-6 font-medium">
        Luxury Service at Your Doorstep
      </p>

      {/* Description */}
      <p className="max-w-2xl text-gray-600 leading-relaxed mb-10">
        Experience premium professional services designed to make your life
        effortless. From home assistance to expert solutions, Suvidha Elite
        connects you with trusted professionals who deliver excellence,
        comfort, and convenience — every time.
      </p>

      {/* Call To Action */}
      <Link to="/search">
        <button className="bg-[#C9A227] text-[#1F2933] px-8 py-3 rounded-md font-semibold shadow-md hover:bg-yellow-500 transition duration-300">
          Find Professionals
        </button>
      </Link>

    </div>
  );
}