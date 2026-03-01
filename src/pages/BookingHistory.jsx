import { useBookings } from "../context/BookingContext";

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
        <p className="text-gray-500">No bookings yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map((b, index) => (
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

              <p className="text-gray-500 mb-3">
                Time: {b.time}
              </p>

              {/* Status */}
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 ${getStatusColor(
                  b.status
                )}`}
              >
                {b.status}
              </span>

              {/* Payment */}
              <p className="text-[#C9A227] font-semibold">
                Payment: {b.payment}
              </p>

              {/* Refund */}
              {b.refund && (
                <p className="text-blue-600 font-semibold mb-3">
                  Refund Status: {b.refund}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-3 mt-4">

                {b.status !== "Cancelled" && b.payment === "Pending" && (
                  <button
                    onClick={() => payForBooking(index)}
                    className="bg-[#C9A227] text-[#1F2933] px-4 py-2 rounded hover:bg-yellow-500 transition"
                  >
                    Pay Now
                  </button>
                )}

                {b.status === "Confirmed" && (
                  <button
                    onClick={() => cancelBooking(index)}
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