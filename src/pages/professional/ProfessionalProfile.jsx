import { useLocation, useNavigate } from "react-router-dom";
import { useReviews } from "../../context/ReviewContext";
import { useState } from "react";
import defaultProfile from "../../assets/default-profile.png";
import ProfessionalProfileForm from "./ProfessionalProfileForm";

export default function ProfessionalProfile() {

  const location = useLocation();
  const navigate = useNavigate();
  const professional = location.state;

  const { addReview, getReviewsForProfessional } = useReviews();

  // 🔐 Safety check
  if (!professional) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        {/* ✅ FORM STILL SHOWS */}
        <ProfessionalProfileForm />

        <p className="text-center mt-10 text-gray-500">
          No data. Please go back and select a professional.
        </p>
      </div>
    );
  }

  const professionalReviews = getReviewsForProfessional(professional.id);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const renderStars = (value, interactive = false) => (
    <div className="flex gap-1 text-2xl">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`${
            star <= value ? "text-yellow-400" : "text-gray-300"
          } ${interactive ? "cursor-pointer" : ""}`}
          onClick={interactive ? () => setRating(star) : undefined}
        >
          ★
        </span>
      ))}
    </div>
  );

  const availableTimes = professional.availableTimes || [];

  const handleHire = () => {
    navigate("/book", { state: professional });
  };

  const submitReview = () => {
    addReview({
      professionalId: professional.id,
      professionalName: professional.name,
      rating,
      comment: comment.trim(),
    });

    setComment("");
    setRating(5);
    alert("Review submitted successfully.");
  };

  const averageRating =
    professionalReviews.length > 0
      ? (
          professionalReviews.reduce((acc, r) => acc + r.rating, 0) /
          professionalReviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* ✅ PROFILE FORM (IMPORTANT FIX) */}
      <ProfessionalProfileForm />

      {/* PROFILE HEADER */}
      <div className="bg-white shadow-md rounded-lg p-8 flex gap-6 items-center">

        <img
          src={professional.image || defaultProfile}
          alt="profile"
          className="w-28 h-28 rounded-full object-cover"
        />

        <div>
          <h1 className="text-3xl font-semibold">{professional.name}</h1>

          <p className="text-gray-500">{professional.category}</p>

          <p className="text-sm text-gray-400">
            📍 {professional.location}
          </p>

          <p className="text-sm text-green-600">
            🟢 {professional.availability}
          </p>

          <p className="text-sm text-gray-500">
            {professional.experience != null
              ? `${professional.experience} years experience`
              : "Experience not specified"}
          </p>

          <p className="text-yellow-600 font-semibold">
            ₹{professional.price}
          </p>

          <div className="mt-2">
            {averageRating ? (
              <>
                {renderStars(Math.round(Number(averageRating)))}
                <p className="text-sm text-gray-500">
                  {averageRating} ({professionalReviews.length} reviews)
                </p>
              </>
            ) : (
              <p>No ratings yet</p>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={() => navigate("/chat", { state: professional })}
              className="px-4 py-2 border rounded"
            >
              Chat
            </button>

            <button
              onClick={() => alert(`Calling ${professional.name}...`)}
              className="px-4 py-2 border rounded"
            >
              Call
            </button>

            <button
              onClick={handleHire}
              className="px-4 py-2 bg-[#C9A227] text-[#1F2933] rounded font-semibold"
            >
              Book Now
            </button>
          </div>

          {availableTimes.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-700">Available times</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {availableTimes.map((slot) => (
                  <span
                    key={slot}
                    className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700"
                  >
                    {slot}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ABOUT */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-semibold text-xl mb-2">About</h2>
        <p className="text-gray-700">
          {professional.bio || "This professional has not added an About section yet."}
        </p>
      </div>

      {/* REVIEWS */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-semibold text-xl mb-4">Reviews</h2>

        {professionalReviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet</p>
        ) : (
          professionalReviews.map((r, i) => (
            <div key={i} className="mb-4 border-b pb-3 last:border-b-0 last:pb-0">
              <div className="flex items-center gap-2 mb-2">
                {renderStars(r.rating)}
                <span className="text-sm text-gray-500">{r.rating}/5</span>
              </div>
              <p className="text-gray-700">
                {r.comment || "No comment provided."}
              </p>
            </div>
          ))
        )}

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Your rating</label>
          <div className="flex items-center gap-2 mb-3">
            {renderStars(rating, true)}
            <span className="text-sm text-gray-500">{rating}/5</span>
          </div>

          <textarea
            placeholder="Write review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border p-2 rounded-md"
          />

          <button
            type="button"
            onClick={submitReview}
            className="bg-yellow-500 px-4 py-2 mt-3 rounded hover:bg-yellow-400"
          >
            Submit Review
          </button>
        </div>
      </div>

    </div>
  );
}