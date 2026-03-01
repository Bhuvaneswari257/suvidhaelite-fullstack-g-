import { useBookings } from "../../context/BookingContext";

export default function AdminPayments() {
  const { bookings } = useBookings();

  const paid = bookings.filter(b => b.payment === "Paid");

  const total = paid.reduce((sum, b) => sum + b.price, 0);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Payments</h1>

      <p className="mb-4 font-semibold text-[#C9A227]">
        Total Revenue: ₹{total}
      </p>

      {paid.map(b => (
        <div key={b.id} className="bg-white p-4 rounded shadow mb-3">
          {b.professionalName} — ₹{b.price}
        </div>
      ))}
    </div>
  );
}