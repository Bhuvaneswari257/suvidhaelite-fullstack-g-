import { useBookings } from "../../context/BookingContext";

export default function AdminBookings() {
  const { bookings } = useBookings();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">All Bookings</h1>

      {bookings.map(b => (
        <div key={b.id} className="bg-white p-4 rounded shadow mb-3">
          <p>{b.customerName} → {b.professionalName}</p>
          <p>{b.service}</p>
          <p>{b.date} {b.time}</p>
          <p>Status: {b.lifecycle}</p>
        </div>
      ))}
    </div>
  );
}