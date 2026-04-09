import { useLocation, useNavigate } from "react-router-dom";
import defaultProfile from "../../assets/default-profile.png";

export default function ProfessionalProfileForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const professional = location.state;

  if (!professional) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Professional profile</h2>
        <p className="text-gray-500">
          Select a professional from search results to view their profile.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={professional.image || defaultProfile}
          alt={professional.name || "Professional"}
          className="w-28 h-28 rounded-full object-cover"
        />

        <div className="flex-1 space-y-2">
          <div className="text-lg font-semibold">{professional.name}</div>
          <div className="text-sm text-gray-500">{professional.category}</div>
          <div className="text-sm text-gray-500">📍 {professional.location}</div>
          <div className="text-sm text-green-600">🟢 {professional.availability || "Available"}</div>
          <div className="text-sm text-gray-500">
            {professional.experience != null
              ? `${professional.experience} years experience`
              : "Experience not specified"}
          </div>
          <div className="text-yellow-600 font-semibold">₹{professional.price || 0}</div>
        </div>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 inline-flex items-center justify-center rounded-md border border-gray-200 bg-[#C9A227] px-4 py-2 text-sm font-semibold text-[#1F2933] hover:bg-yellow-400"
      >
        Back to search
      </button>
    </div>
  );
}
