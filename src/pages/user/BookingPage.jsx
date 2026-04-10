import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBookings } from "../../context/BookingContext";
import { useAuth } from "../../context/AuthContext";
import professionalService from "../../services/professionalService";

export default function BookingPage() {

  const location = useLocation();
  const navigate = useNavigate();

  const professional = location.state;
  const { addBooking } = useBookings();
  const { userRole, user } = useAuth();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [paymentType, setPaymentType] = useState("UPI");

  const availableTimes = professional?.availableTimes || [];

  // No professional selected
  if (!professional) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No professional selected
      </p>
    );
  }

  // NOT LOGGED IN
  if (!userRole) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Please login to book a service
      </p>
    );
  }

  const handleBooking = () => {

    if (!date || !time) {
      alert("Please select date and time");
      return;
    }

    if (!user?.address) {
      alert("Please add your address in your user profile before booking.");
      return;
    }

    // ✅ Prevent past date booking
    const today = new Date().toISOString().split("T")[0];
    if (date < today) {
      alert("Please select a valid future date");
      return;
    }

    // ✅ FIX: add important fields
    addBooking({
      professionalId: professional.id,
      professionalName: professional.name,
      service: professional.category,
      price: professional.price,
      date,
      time,
      paymentType,
      customerName: user?.name || "Customer",
      customerAddress: user?.address || "",
      status: "Confirmed",        // ✅ NEW
      paymentStatus: "Pending"    // ✅ NEW
    });

    // Remove the booked slot seamlessly so others cannot double-book
    professionalService.updateAvailability(professional.id, time);

    alert("Booking confirmed successfully");

    navigate("/bookings");
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">

      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md">

        <h1 className="text-2xl font-semibold text-[#1F2933] mb-6 text-center">
          Book Service
        </h1>

        <div className="bg-gray-50 p-4 rounded mb-6">
          <p className="font-semibold">{professional.name}</p>
          <p className="text-gray-500">{professional.category}</p>
          <p className="text-[#C9A227] font-semibold">
            ₹{professional.price}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Select Date</label>
          <input
            type="date"
            value={date}
            className="w-full border rounded px-3 py-2"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1">Select Time</label>
          {availableTimes?.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={`rounded border px-3 py-2 text-sm ${
                    time === slot
                      ? "bg-[#C9A227] text-[#1F2933]"
                      : "bg-white text-gray-700"
                  }`}
                  onClick={() => setTime(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              This professional has not shared available time slots yet.
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2">Payment Type</label>
          <div className="grid grid-cols-3 gap-2">
            {['UPI', 'CARD', 'CASH'].map((type) => (
              <button
                key={type}
                type="button"
                className={`rounded border px-3 py-2 text-sm ${
                  paymentType === type
                    ? "bg-[#C9A227] text-[#1F2933]"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => setPaymentType(type)}
              >
                {type === 'CARD' ? 'Card' : type === 'CASH' ? 'Cash' : 'UPI'}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleBooking}
          disabled={availableTimes?.length === 0}
          className={`w-full py-3 rounded font-semibold ${
            availableTimes?.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#C9A227] text-[#1F2933]"
          }`}
        >
          Confirm Booking
        </button>

      </div>
    </div>
  );
}