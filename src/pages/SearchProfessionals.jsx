import { useNavigate } from "react-router-dom";
import { useReviews } from "../context/ReviewContext";
import { useState } from "react";

export default function SearchProfessionals() {
  const navigate = useNavigate();
  const { getReviewsForProfessional } = useReviews();

  // ✅ ADDED: search + category state
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const professionals = [
    {
      id: 1,
      name: "Ravi Kumar",
      category: "Plumber",
      price: 500,
      location: "Vijayawada",
      image: null
    },
    {
      id: 2,
      name: "Priya Sharma",
      category: "Math Tutor",
      price: 300,
      location: "Hyderabad",
      image: null
    },
    {
      id: 3,
      name: "Arjun Reddy",
      category: "Electrician",
      price: 400,
      location: "Guntur",
      image: null
    }
  ];

  // ✅ ADDED: auto extract categories from existing data
  const categories = ["All", ...new Set(professionals.map(p => p.category))];

  // ✅ ADDED: filtering logic
  const filteredProfessionals = professionals.filter((pro) => {
    const matchesSearch =
      pro.name.toLowerCase().includes(search.toLowerCase()) ||
      pro.category.toLowerCase().includes(search.toLowerCase()) ||
      pro.location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || pro.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const viewProfile = (pro) => {
    navigate("/professional-profile", { state: pro });
  };

  // ⭐ Star renderer (UNCHANGED)
  const renderStars = (value) => (
    <div className="flex justify-center gap-1 text-xl">
      {[1,2,3,4,5].map((star)=>(
        <span
          key={star}
          className={star <= value ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <div>

      <h1 className="text-3xl font-semibold mb-6 text-[#1F2933]">
        Find Professionals
      </h1>

      {/* ✅ ADDED SEARCH BAR */}
      <input
        type="text"
        placeholder="Search by name, service, or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-[#C9A227] outline-none"
      />

      {/* ✅ ADDED CATEGORY FILTER */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              selectedCategory === cat
                ? "bg-[#C9A227] text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ✅ ADDED RESULT COUNT */}
      <p className="text-gray-500 mb-6">
        {filteredProfessionals.length} professionals found
      </p>

      {/* ORIGINAL GRID (unchanged except using filtered data) */}
      <div className="grid md:grid-cols-3 gap-8">
        {filteredProfessionals.map((pro) => {

          const reviews = getReviewsForProfessional(pro.name);

          const avg =
            reviews.length > 0
              ? (
                  reviews.reduce((acc, r) => acc + r.rating, 0) /
                  reviews.length
                ).toFixed(1)
              : null;

          return (
            <div
              key={pro.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition"
            >

              {pro.image ? (
                <img
                  src={pro.image}
                  alt={pro.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center text-gray-500 text-xl font-semibold">
                  {pro.name.charAt(0)}
                </div>
              )}

              <h3 className="text-xl font-semibold text-center mb-2">
                {pro.name}
              </h3>

              <p className="text-center text-gray-500 mb-1">
                {pro.category}
              </p>

              <p className="text-center text-sm text-gray-400 mb-2">
                {pro.location}
              </p>

              <div className="text-center mb-3">
                {avg ? (
                  <>
                    {renderStars(Math.round(avg))}
                    <p className="text-sm text-gray-500">
                      {avg} ({reviews.length})
                    </p>
                  </>
                ) : (
                  <p className="text-gray-400 text-sm">No ratings</p>
                )}
              </div>

              <p className="text-center text-[#C9A227] font-semibold mb-5">
                ₹{pro.price}
              </p>

              <button
                onClick={() => viewProfile(pro)}
                className="w-full bg-[#C9A227] text-[#1F2933] py-2 rounded-md font-semibold hover:bg-yellow-500 transition"
              >
                View Profile
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
}