import { useBookings } from "../../context/BookingContext";

export default function AdminPayments() {
  const { bookings } = useBookings();

  const paid = bookings.filter((b) => b.paymentStatus === "Paid");
  const pending = bookings.filter((b) => b.paymentStatus !== "Paid");
  const total = paid.reduce((sum, b) => sum + (b.price || 0), 0);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Payments</h1>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-semibold">₹{total}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Completed Payments</p>
          <p className="text-2xl font-semibold">{paid.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Pending Payments</p>
          <p className="text-2xl font-semibold">{pending.length}</p>
        </div>
      </div>

      {paid.length === 0 ? (
        <p className="text-gray-500">No completed payments yet.</p>
      ) : (
        <div className="space-y-4">
          {paid.map((b) => (
            <div key={b.id} className="bg-white p-4 rounded shadow mb-3">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold">{b.professionalName}</p>
                <span className="text-sm text-gray-500">₹{b.price ?? 0}</span>
              </div>
              <p className="text-gray-600 mb-1">Customer: {b.customerName}</p>
              <p className="text-gray-600 mb-1">Service: {b.service}</p>
              <p className="text-gray-600">Method: {b.paymentType || "UPI"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
