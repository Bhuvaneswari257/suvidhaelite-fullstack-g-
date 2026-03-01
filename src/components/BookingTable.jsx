import { useBookings } from "../context/BookingContext";
import StatusBadge from "./StatusBadge";

export default function BookingTable() {

  const { bookings, updateStatus } = useBookings();

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Client</th>
          <th>Date</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {bookings.map(b => (
          <tr key={b.id} style={{ borderTop: "1px solid #eee" }}>
            <td>{b.client}</td>
            <td>{b.date}</td>
            <td><StatusBadge status={b.status} /></td>
            <td>

              {b.status === "PENDING" &&
                <button onClick={() => updateStatus(b.id, "ACCEPTED")}>
                  Accept
                </button>
              }

              {b.status === "ACCEPTED" &&
                <button onClick={() => updateStatus(b.id, "SCHEDULED")}>
                  Schedule
                </button>
              }

              {b.status === "SCHEDULED" &&
                <button onClick={() => updateStatus(b.id, "IN_PROGRESS")}>
                  Start
                </button>
              }

              {b.status === "IN_PROGRESS" &&
                <button onClick={() => updateStatus(b.id, "COMPLETED")}>
                  Finish
                </button>
              }

              {b.status === "COMPLETED" &&
                <button onClick={() => updateStatus(b.id, "PAID")}>
                  Mark Paid
                </button>
              }

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}