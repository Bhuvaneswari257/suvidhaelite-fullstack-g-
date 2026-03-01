export default function StatusBadge({ status }) {

  const colors = {
    PENDING: "#ffc107",
    ACCEPTED: "#17a2b8",
    SCHEDULED: "#007bff",
    IN_PROGRESS: "#fd7e14",
    COMPLETED: "#28a745",
    PAID: "#6f42c1"
  };

  return (
    <span
      style={{
        background: colors[status],
        color: "white",
        padding: "5px 12px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600
      }}
    >
      {status}
    </span>
  );
}