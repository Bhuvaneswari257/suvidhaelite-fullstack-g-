import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBookings } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";

export default function BookingPage() {

  const location = useLocation();
  const navigate = useNavigate();

  const professional = location.state;
  const { addBooking } = useBookings();
  const { userRole } = useAuth();   // ✅ USE ROLE (NOT user)

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

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

    addBooking({
      professionalId: professional.id,
      professionalName: professional.name,
      service: professional.category,
      price: professional.price,
      date,
      time
    });

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
          <input
            type="time"
            value={time}
            className="w-full border rounded px-3 py-2"
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <button
          onClick={handleBooking}
          className="w-full bg-[#C9A227] text-[#1F2933] py-3 rounded font-semibold"
        >
          Confirm Booking
        </button>

      </div>
    </div>
  );
}