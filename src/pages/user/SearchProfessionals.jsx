import { useNavigate } from "react-router-dom";
import { useReviews } from "../../context/ReviewContext";
import { useState } from "react";
import { useProfessionals } from "../professional/ProfessionalContext";


export default function SearchProfessionals() {
  const navigate = useNavigate();
  const { getReviewsForProfessional } = useReviews();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ✅ FIX: move professionals into state (backend ready)

  const { professionals = [] } = useProfessionals() || {};


  // categories
  const categories = ["All", ...new Set(professionals.map(p => p.category))];

  // ⭐ helper for rating
  const getAvgRating = (id) => {
    const reviews = getReviewsForProfessional(id); // ✅ FIX: use ID
    if (reviews.length === 0) return null;
    return (
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    ).toFixed(1);
  };

  // filtering
  const filteredProfessionals = professionals.filter((pro) => {
    const matchesSearch =
      pro.name.toLowerCase().includes(search.toLowerCase()) ||
      pro.category.toLowerCase().includes(search.toLowerCase()) ||
      pro.location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || pro.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // navigation
  const viewProfile = (pro) => {
    navigate("/professional-profile", { state: pro }); // unchanged
  };

  const renderStars = (value) => (
    <div className="flex justify-center gap-1 text-xl">
      {[1, 2, 3, 4, 5].map((star) => (
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

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name, service, or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-[#C9A227] outline-none"
      />

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm transition ${selectedCategory === cat
                ? "bg-[#C9A227] text-white"
                : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="text-gray-500 mb-6">
        {filteredProfessionals.length} professionals found
      </p>

      {/* ✅ FIX: empty state */}
      {filteredProfessionals.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No professionals found
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {filteredProfessionals.map((pro) => {
            const avg = getAvgRating(pro.id);

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

                <p className="text-center text-sm text-gray-400 mb-1">
                  📍 {pro.location}
                </p>

                {/* ✅ added availability */}
                <p className="text-center text-sm text-green-600 mb-1">
                  🟢 {pro.availability}
                </p>

                {/* ✅ added experience */}
                <p className="text-center text-sm text-gray-500 mb-2">
                  {pro.experience}
                </p>

                <div className="text-center mb-3">
                  {avg ? (
                    <>
                      {renderStars(Math.round(avg))}
                      <p className="text-sm text-gray-500">
                        {avg}
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-400 text-sm">No ratings</p>
                  )}
                </div>

                <p className="text-center text-[#C9A227] font-semibold mb-3">
                  ₹{pro.price}
                </p>

                {/* ✅ added quick actions */}
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => navigate("/chat", { state: pro })}
                    className="flex-1 border rounded py-1 text-sm"
                  >
                    Chat
                  </button>

                  <button
                    onClick={() => alert(`Calling ${pro.name}...`)}
                    className="flex-1 border rounded py-1 text-sm"
                  >
                    Call
                  </button>
                </div>

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
      )}
    </div>
  );
}