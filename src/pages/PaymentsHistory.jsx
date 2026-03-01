import { useBookings } from "../context/BookingContext";

export default function PaymentsHistory() {
  const { bookings } = useBookings();

  const paidBookings = bookings.filter(
    (b) => b.payment === "Paid"
  );

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-semibold text-[#1F2933]">
        Payment History
      </h1>

      {paidBookings.length === 0 ? (
        <p className="text-gray-500">No payments yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {paidBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-2">
                {b.professionalName}
              </h3>

              <p className="text-gray-500">
                Service: {b.service}
              </p>

              <p className="text-gray-500">
                Date: {b.date}
              </p>

              <p className="text-gray-500 mb-2">
                Time: {b.time}
              </p>

              <p className="text-lg font-semibold text-[#C9A227]">
                Paid: ₹{b.price}
              </p>

              <p className="text-sm text-green-600 font-semibold mt-2">
                Payment Successful
              </p>

              {b.refund && (
                <p className="text-sm text-blue-600 font-semibold">
                  {b.refund}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}