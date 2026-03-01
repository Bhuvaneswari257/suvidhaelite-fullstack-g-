import { useLocation, useNavigate } from "react-router-dom";
import { useReviews } from "../context/ReviewContext";
import { useState } from "react";
import defaultProfile from "../assets/default-profile.png";

export default function ProfessionalProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const professional = location.state;

  const { addReview, getReviewsForProfessional } = useReviews();

  // 🔐 Safety check
  if (!professional) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Professional not found
      </p>
    );
  }

  const professionalReviews = getReviewsForProfessional(professional.name);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // ⭐ Star Renderer
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

  const handleHire = () => {
    navigate("/book", { state: professional });
  };

  const submitReview = () => {
    if (!comment.trim()) return;

    addReview({
      professionalName: professional.name,
      rating,
      comment,
    });

    setComment("");
    setRating(5);
  };

  // ⭐ Average rating calculation (safe)
  const averageRating =
    professionalReviews.length > 0
      ? (
          professionalReviews.reduce((acc, r) => acc + r.rating, 0) /
          professionalReviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* PROFILE HEADER */}
      <div className="bg-white shadow-md rounded-lg p-8 flex gap-6 items-center">

        {/* PROFILE IMAGE */}
        {professional.image ? (
          <img
            src={professional.image}
            alt={professional.name}
            className="w-28 h-28 rounded-full object-cover"
          />
        ) : (
          <img
            src={defaultProfile}
            alt="default profile"
            className="w-28 h-28 rounded-full object-cover"
          />
        )}

        <div>
          <h1 className="text-3xl font-semibold text-[#1F2933]">
            {professional.name}
          </h1>

          <p className="text-gray-500">{professional.category}</p>

          <p className="text-[#C9A227] font-semibold mt-1">
            ₹{professional.price} per service
          </p>

          <div className="mt-2">
            {averageRating ? (
              <>
                {renderStars(Math.round(Number(averageRating)))}
                <p className="text-sm text-gray-500 mt-1">
                  {averageRating} ({professionalReviews.length} reviews)
                </p>
              </>
            ) : (
              <p className="text-gray-400">No ratings yet</p>
            )}
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">About</h2>
        <p className="text-gray-600">
          Experienced professional providing high-quality service with
          attention to detail and customer satisfaction.
        </p>
      </div>

      {/* SERVICES */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3">Services Offered</h2>
        <ul className="list-disc ml-6 text-gray-600 space-y-1">
          <li>Installation</li>
          <li>Repair</li>
          <li>Maintenance</li>
        </ul>
      </div>

      {/* AVAILABLE SLOTS */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3">Available Time Slots</h2>
        <div className="flex gap-3 flex-wrap">
          <span className="bg-gray-100 px-3 py-1 rounded">10:00 AM</span>
          <span className="bg-gray-100 px-3 py-1 rounded">12:00 PM</span>
          <span className="bg-gray-100 px-3 py-1 rounded">03:00 PM</span>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>

        {professionalReviews.length === 0 ? (
          <p className="text-gray-500 mb-4">No reviews yet</p>
        ) : (
          <div className="space-y-3 mb-6">
            {professionalReviews.map((r, i) => (
              <div key={i} className="border-b pb-2">
                {renderStars(r.rating)}
                <p className="text-gray-600">{r.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* ADD REVIEW */}
        <div className="space-y-3 mt-6">
          <label className="block text-sm font-medium">
            Your Rating
          </label>

          {renderStars(rating, true)}

          <textarea
            placeholder="Write your review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />

          <button
            onClick={submitReview}
            className="bg-[#C9A227] text-[#1F2933] px-4 py-2 rounded hover:bg-yellow-500 transition"
          >
            Submit Review
          </button>
        </div>
      </div>

      {/* HIRE BUTTON */}
      <div className="text-center">
        <button
          onClick={handleHire}
          className="bg-[#C9A227] text-[#1F2933] px-8 py-3 rounded font-semibold hover:bg-yellow-500 transition"
        >
          Hire Professional
        </button>
      </div>

    </div>
  );
}