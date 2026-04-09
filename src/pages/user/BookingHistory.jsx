import { useBookings } from "../../context/BookingContext";

export default function BookingHistory() {
  const {
    bookings,
    cancelBooking,
    payForBooking
  } = useBookings();

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-gray-200 text-gray-600";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8 text-[#1F2933]">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-gray-500 text-center">
          No bookings yet
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-2">
                {b.professionalName}
              </h3>

              <p className="text-gray-500 mb-1">
                Service: {b.service}
              </p>

              <p className="text-gray-500 mb-1">
                Date: {b.date}
              </p>

              <p className="text-gray-500 mb-2">
                Time: {b.time}
              </p>

              <p className="text-[#C9A227] font-semibold mb-2">
                ₹{b.price}
              </p>

              <p className="text-gray-500 mb-2">
                Payment Method: {b.paymentType || "UPI"}
              </p>

              {/* ✅ FIX: removed stray 'a' */}
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 ${getStatusColor(
                  b.status
                )}`}
              >
                {b.status}
              </span>

              <p className="text-[#C9A227] font-semibold">
                Payment: {b.paymentStatus || "Pending"}
              </p>

              {b.refund && (
                <p className="text-blue-600 font-semibold mb-3">
                  Refund Status: {b.refund}
                </p>
              )}

              <div className="flex gap-3 mt-4">

                {b.status !== "Cancelled" &&
                  (b.paymentStatus || "Pending") === "Pending" &&
                  b.paymentType !== "CASH" && (
                  <button
                    onClick={() => payForBooking(b.id)}
                    className="bg-[#C9A227] text-[#1F2933] px-4 py-2 rounded hover:bg-yellow-500 transition"
                  >
                    Pay Now
                  </button>
                )}

                {b.status !== "Cancelled" &&
                  (b.paymentStatus || "Pending") === "Pending" &&
                  b.paymentType === "CASH" && (
                  <button
                    disabled
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded cursor-not-allowed"
                  >
                    Pay on Service
                  </button>
                )}

                {b.status === "Confirmed" && (
                  <button
                    onClick={() => cancelBooking(b.id)}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                )}

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}