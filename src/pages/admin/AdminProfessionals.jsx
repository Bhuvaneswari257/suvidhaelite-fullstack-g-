import { useProfessionals } from "../../pages/professional/ProfessionalContext";

export default function AdminProfessionals() {
  const { professionals } = useProfessionals();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Professionals</h1>

      {professionals.length > 0 ? (
        professionals.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded shadow mb-3">
            <p className="font-semibold">{p.name}</p>
            <p className="text-gray-600">Category: {p.category}</p>
            <p className="text-gray-600">Location: {p.location}</p>
            <p className="text-gray-600">Price: ₹{p.price}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No professionals registered yet.</p>
      )}
    </div>
  );
}
