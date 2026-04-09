import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col">
      
      {/* HERO SECTION */}
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

      {/* ABOUT SECTION */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-semibold text-[#1F2933] mb-6 text-center">
            About Suvidha Elite
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6 text-center max-w-3xl mx-auto">
            Suvidha Elite is a premium service marketplace that connects homeowners and businesses with highly vetted, experienced professionals. Whether you need home maintenance, tutoring, cleaning, plumbing, or specialized services, we bring trusted experts right to your doorstep.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-[#C9A227] mb-3">🎯 Our Mission</h3>
              <p className="text-gray-600">
                To provide affordable, reliable, and world-class professional services that enhance the quality of life for every customer.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-[#C9A227] mb-3">✅ Trust & Safety</h3>
              <p className="text-gray-600">
                Every professional is carefully vetted, background-checked, and rated by our community to ensure your peace of mind.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-[#C9A227] mb-3">⭐ Quality Assured</h3>
              <p className="text-gray-600">
                With ratings, reviews, and transparent pricing, you get exactly what you expect—nothing less.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* HOW TO USE SECTION */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-semibold text-[#1F2933] mb-12 text-center">
            How to Use Suvidha Elite
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#C9A227] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-[#1F2933] mb-3">Sign Up</h3>
              <p className="text-gray-600">
                Create your account as a user, professional, or admin. It takes less than a minute.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#C9A227] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-[#1F2933] mb-3">Browse Services</h3>
              <p className="text-gray-600">
                Search, filter, and compare professionals by category, location, experience, and ratings.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#C9A227] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-[#1F2933] mb-3">Book & Pay</h3>
              <p className="text-gray-600">
                Select your professional, choose a date, and complete payment securely through our platform.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#C9A227] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold text-[#1F2933] mb-3">Rate & Review</h3>
              <p className="text-gray-600">
                Share your experience by rating and reviewing the professional to help others decide.
              </p>
            </div>

          </div>

          {/* Additional Info */}
          <div className="mt-16 bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold text-[#1F2933] mb-6">Why Choose Suvidha Elite?</h3>
            
            <ul className="grid md:grid-cols-2 gap-6">
              <li className="flex items-start gap-3">
                <span className="text-[#C9A227] text-xl">✓</span>
                <p className="text-gray-600"><strong>Vetted Professionals:</strong> Every professional is verified and background-checked for your safety.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C9A227] text-xl">✓</span>
                <p className="text-gray-600"><strong>Transparent Pricing:</strong> No hidden charges. You know exactly what you're paying for.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C9A227] text-xl">✓</span>
                <p className="text-gray-600"><strong>Flexible Booking:</strong> Choose your schedule, reschedule anytime, and enjoy flexibility.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C9A227] text-xl">✓</span>
                <p className="text-gray-600"><strong>Secure Payments:</strong> All transactions are encrypted and protected by industry-standard security.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C9A227] text-xl">✓</span>
                <p className="text-gray-600"><strong>24/7 Support:</strong> Our dedicated support team is always ready to help resolve any issues.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C9A227] text-xl">✓</span>
                <p className="text-gray-600"><strong>Community Reviews:</strong> Make informed decisions based on real user ratings and feedback.</p>
              </li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
}