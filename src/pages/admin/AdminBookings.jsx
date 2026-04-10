import { useBookings } from "../../context/BookingContext";

export default function AdminBookings() {
  const { bookings } = useBookings();
  const sortedBookings = [...bookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">All Bookings</h1>

      {sortedBookings.length === 0 ? (
        <p className="text-gray-500">No bookings have been made yet.</p>
      ) : (
        <div className="space-y-4">
          {sortedBookings.map((b) => {
            const created = b.createdAt ? new Date(b.createdAt).toLocaleString() : "Unknown";
            const paymentMethod = b.paymentType || "UPI";
            const paymentLabel = b.paymentStatus === "Paid" ? "Paid" : b.paymentType === "Cash" ? "Due on service" : "Pending";

            return (
              <div key={b.id} className="bg-white p-4 rounded shadow mb-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-lg">{b.customerName} → {b.professionalName}</p>
                  <span className="text-sm text-gray-500">{created}</span>
                </div>
                <p className="text-gray-600 mb-1">Booking ID: {b.id}</p>
                <p className="text-gray-600 mb-1">Service: {b.service}</p>
                <p className="text-gray-600 mb-1">Date: {b.date} {b.time}</p>
                <p className="text-gray-600 mb-1">Price: ₹{b.price ?? 0}</p>
                <p className="text-gray-600 mb-1">Payment Method: {paymentMethod}</p>
                <p className="text-gray-600 mb-1">Payment Status: {paymentLabel}</p>
                <p className="text-gray-600 mb-1">Customer Address: {b.customerAddress || "Not provided"}</p>
                <p className="text-gray-600">Booking Status: {b.lifecycle}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
