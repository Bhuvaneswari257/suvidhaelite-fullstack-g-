import { useProfessionals } from "../../pages/professional/ProfessionalContext";

export default function AdminServices() {
  const { professionals } = useProfessionals();
  const categories = Array.from(new Set(professionals.map((p) => p.category).filter(Boolean)));

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Service Listings</h1>

      {professionals.length === 0 ? (
        <p className="text-gray-500">No services or professionals are registered yet.</p>
      ) : (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <p className="font-semibold">Service categories</p>
            <p className="text-gray-600">{categories.length > 0 ? categories.join(", ") : "No categories available."}</p>
            <p className="text-gray-600 mt-2">Total professionals: {professionals.length}</p>
          </div>

          {professionals.map((pro) => (
            <div key={pro.id} className="bg-white p-4 rounded shadow">
              <p className="font-semibold">{pro.name}</p>
              <p className="text-gray-600 mb-1">Category: {pro.category || "Unknown"}</p>
              <p className="text-gray-600 mb-1">Location: {pro.location || "Not specified"}</p>
              <p className="text-gray-600 mb-1">Price: ₹{pro.price ?? "N/A"}</p>
              {pro.bio && <p className="text-gray-500">{pro.bio}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
