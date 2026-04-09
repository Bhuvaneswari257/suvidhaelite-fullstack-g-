export default function StatCard({ title, value }) {
  return (
    <div
      style={{
        flex: 1,
        padding: 20,
        borderRadius: 12,
        background: "white",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
      }}
    >
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}