import { useState } from "react";
import { useBookings } from "../context/BookingContext";

export default function PaymentModal({ booking, onClose }) {

  const [method, setMethod] = useState("UPI");
  const { markAsPaid } = useBookings();

  const handlePayment = () => {
    markAsPaid(booking.id);
    alert("Payment Successful");
    onClose();
  };

  return (
    <div style={overlay}>
      <div style={modal}>

        <h2>Complete Payment</h2>
        <p>Amount: ₹ {booking.price}</p>

        <h4>Select Payment Method</h4>

        <label>
          <input
            type="radio"
            value="UPI"
            checked={method === "UPI"}
            onChange={(e) => setMethod(e.target.value)}
          />
          UPI
        </label>

        <br/>

        <label>
          <input
            type="radio"
            value="CARD"
            checked={method === "CARD"}
            onChange={(e) => setMethod(e.target.value)}
          />
          Credit / Debit Card
        </label>

        <br/>

        <label>
          <input
            type="radio"
            value="CASH"
            checked={method === "CASH"}
            onChange={(e) => setMethod(e.target.value)}
          />
          Cash on Service
        </label>

        <div style={{ marginTop: 20 }}>
          <button onClick={handlePayment} style={payBtn}>
            Pay ₹ {booking.price}
          </button>

          <button onClick={onClose} style={cancelBtn}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modal = {
  background: "white",
  padding: 30,
  borderRadius: 12,
  width: 350
};

const payBtn = {
  background: "#C9A227",
  color: "white",
  border: "none",
  padding: "10px 20px",
  marginRight: 10,
  borderRadius: 6,
  cursor: "pointer"
};

const cancelBtn = {
  background: "#ddd",
  border: "none",
  padding: "10px 20px",
  borderRadius: 6,
  cursor: "pointer"
};