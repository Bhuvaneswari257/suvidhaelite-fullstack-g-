import { useState, useEffect } from "react";
import { FaUser, FaTools, FaCalendarCheck, FaBars, FaQuestionCircle } from "react-icons/fa";
import { useBookings } from "../../context/BookingContext";
import { useReviews } from "../../context/ReviewContext";
import { useProfessionals } from "./ProfessionalContext";
import { useAuth } from "../../context/AuthContext";
import { useSupport } from "../../context/SupportContext";
export default function ProfessionalDashboard() {

  const [active, setActive] = useState("Profile");
  const [collapsed, setCollapsed] = useState(false);

  const [profileImage, setProfileImage] = useState(null);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

  const [services, setServices] = useState([]);
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [timeSlot, setTimeSlot] = useState("");

  // Support ticket form
  const [showSupportForm, setShowSupportForm] = useState(false);
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [ticketType, setTicketType] = useState("professional");

  const { createTicket } = useSupport();
  const { user, userRole } = useAuth();
  const { professionals, addProfessional } = useProfessionals();

  const existingProfile = professionals.find(p => p.name === user?.name || p.email === user?.email);

  useEffect(() => {
    if (existingProfile) {
      setName(existingProfile.name || "");
      setBio(existingProfile.bio || "");
      setExperience(existingProfile.experience !== undefined ? existingProfile.experience : "");
      setCategory(existingProfile.category || "");
      setPrice(existingProfile.price !== undefined ? existingProfile.price : "");
      setLocation(existingProfile.location || "");
      if (existingProfile.availableTimes?.length) {
        setAvailableTimes(existingProfile.availableTimes);
      }
    }
  }, [professionals, user]);

  const handleSaveProfile = () => {
    if (!name.trim() || !bio.trim() || !category.trim() || !location.trim()) {
      alert("Please fill all required fields");
      return;
    }

    const parsedExperience = parseInt(experience, 10);

    addProfessional({
      email: user?.email,
      name: name.trim(),
      bio: bio.trim(),
      experience: Number.isNaN(parsedExperience) ? 0 : parsedExperience,
      category: category.trim(),
      price: Number(price) || 0,
      location: location.trim(),
      rating: 0,
      reviews: [],
      available: true,
      availableTimes,
    });

    alert("✅ Profile saved successfully");
    setName("");
    setBio("");
    setExperience("");
    setCategory("");
    setPrice("");
    setLocation("");
    setProfileImage(null);
  };

  const handleCreateTicket = () => {
    if (!ticketTitle.trim() || !ticketDescription.trim()) {
      alert("Please fill in all fields");
      return;
    }

    createTicket({
      title: ticketTitle.trim(),
      description: ticketDescription.trim(),
      type: ticketType
    });

    // Reset form
    setTicketTitle("");
    setTicketDescription("");
    setTicketType("professional");
    setShowSupportForm(false);

    alert("Support ticket created successfully! Our support team will respond soon.");
  };

  // ✅ BOOKINGS
  const { bookings, updateStatus } = useBookings();
  const requests = bookings.filter(
    (b) =>
      b.status === "Confirmed" &&
      (userRole !== "professional" || b.professionalId === existingProfile?.id || b.professionalName === existingProfile?.name)
  );

  // ✅ RATING
  const { getReviewsForProfessional } = useReviews();
  const reviews = getReviewsForProfessional(existingProfile?.id || existingProfile?.name || user?.name);

  const rating =
    reviews.length > 0
      ? (
        reviews.reduce((acc, r) => acc + r.rating, 0) /
        reviews.length
      ).toFixed(1)
      : "No ratings";

  const addService = () => {
    if (!serviceTitle) return;
    setServices([...services, { title: serviceTitle, desc: serviceDesc, price: servicePrice }]);
    setServiceTitle("");
    setServiceDesc("");
    setServicePrice("");
  };
  const handleAccept = (id) => updateStatus(id, "Accepted");
  const handleReject = (id) => updateStatus(id, "Rejected");
  return (
    <div style={styles.container}>

      {/* SIDEBAR */}
      <div style={{ ...styles.sidebar, width: collapsed ? 80 : 240 }}>
        <div style={styles.sidebarTop}>
          <FaBars style={styles.iconBtn} onClick={() => setCollapsed(!collapsed)} />
        </div>

        <MenuItem icon={<FaUser />} label="Profile" active={active} setActive={setActive} collapsed={collapsed} />
        <MenuItem icon={<FaTools />} label="Services" active={active} setActive={setActive} collapsed={collapsed} />
        <MenuItem icon={<FaCalendarCheck />} label="Requests" active={active} setActive={setActive} collapsed={collapsed} />
        <MenuItem icon={<FaQuestionCircle />} label="Support" active={active} setActive={setActive} collapsed={collapsed} />
      </div>

      {/* CONTENT */}
      <div style={styles.content}>

        {/* STATS */}
        <div style={styles.statsRow}>
          <StatCard title="Total Services" value={services.length} />
          <StatCard title="Pending Requests" value={requests.length} />
          <StatCard title="Rating" value={rating === "No ratings" ? rating : `${rating} ⭐`} />
        </div>

        {/* PROFILE */}
        {active === "Profile" && (
          <div style={styles.card}>
            <h2>Professional Profile</h2>

            <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
              <div>
                <img
                  src={profileImage || "https://via.placeholder.com/120"}
                  style={styles.profileImg}
                />
                <input
                  type="file"
                  onChange={(e) => setProfileImage(URL.createObjectURL(e.target.files[0]))}
                />
              </div>

              <div style={{ flex: 1 }}>
                <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <textarea
                  style={styles.input}
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <Input
                  placeholder="Experience (years)"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
                <Input
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <Input
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />

                <div style={{ marginTop: 16 }}>
                  <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
                    Available time slots
                  </label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                    <input
                      type="time"
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      style={{ flex: 1, minWidth: 140, padding: 10, borderRadius: 8, border: "1px solid #d1d5db" }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!timeSlot) return;
                        if (availableTimes.includes(timeSlot)) return;
                        setAvailableTimes(prev => [...prev, timeSlot]);
                        setTimeSlot("");
                      }}
                      style={{ padding: "10px 16px", background: "#C9A227", color: "#1F2933", borderRadius: 8, fontWeight: 600 }}
                    >
                      Add Slot
                    </button>
                  </div>

                  {availableTimes.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {availableTimes.map((slot) => (
                        <span key={slot} style={{ padding: "6px 10px", background: "#f3f4f6", borderRadius: 999, fontSize: 14 }}>
                          {slot}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <button style={styles.primaryBtn} onClick={handleSaveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SERVICES */}
        {active === "Services" && (
          <div style={styles.card}>
            <h2>My Services</h2>

            <Input placeholder="Service title" value={serviceTitle} onChange={e => setServiceTitle(e.target.value)} />
            <textarea style={styles.input} placeholder="Description" value={serviceDesc} onChange={e => setServiceDesc(e.target.value)} />
            <Input placeholder="Price" value={servicePrice} onChange={e => setServicePrice(e.target.value)} />
            <button style={styles.primaryBtn} onClick={addService}>Add Service</button>

            <div style={styles.serviceGrid}>
              {services.map((s, i) => (
                <div key={i} style={styles.serviceCard}>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                  <b>₹ {s.price}</b>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REQUESTS */}
        {active === "Requests" && (
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2>Incoming Requests</h2>
              <span style={styles.badge}>{requests.length} Pending</span>
            </div>

            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {requests.map(r => (
                    <tr key={r.id} style={styles.row}>
                      <td style={styles.clientCell}>
                        <img
                          src={`https://ui-avatars.com/api/?name=${r.customerName}`}
                          style={styles.avatar}
                        />
                        {r.customerName}
                      </td>

                      <td>{r.service}</td>
                      <td>{r.date}</td>
                      <td>{r.customerAddress || "Address not provided"}</td>

                      <td>
                        <span style={styles.pending}>Pending</span>
                      </td>

                      <td style={{ textAlign: "right" }}>
                        <button style={styles.acceptBtn} onClick={() => handleAccept(r.id)}>
                          Accept
                        </button>

                        <button style={styles.rejectBtn} onClick={() => handleReject(r.id)}>
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUPPORT */}
        {active === "Support" && (
          <div style={styles.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2>Need Help?</h2>
              <button
                onClick={() => setShowSupportForm(!showSupportForm)}
                style={{
                  padding: "10px 16px",
                  background: "#C9A227",
                  color: "#1F2933",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                {showSupportForm ? "Cancel" : "Report Issue"}
              </button>
            </div>

            {showSupportForm && (
              <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 20 }}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
                    Issue Type
                  </label>
                  <select
                    value={ticketType}
                    onChange={(e) => setTicketType(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #d1d5db",
                      borderRadius: 8,
                      fontSize: 14
                    }}
                  >
                    <option value="professional">Professional Support</option>
                    <option value="booking">Booking Issue</option>
                    <option value="payment">Payment Dispute</option>
                    <option value="feedback">Feedback/Complaint</option>
                    <option value="escalation">Urgent Escalation</option>
                  </select>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    value={ticketTitle}
                    onChange={(e) => setTicketTitle(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #d1d5db",
                      borderRadius: 8,
                      fontSize: 14
                    }}
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
                    Description
                  </label>
                  <textarea
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #d1d5db",
                      borderRadius: 8,
                      fontSize: 14,
                      minHeight: 100
                    }}
                    placeholder="Please provide detailed information about your issue..."
                  />
                </div>

                <button
                  onClick={handleCreateTicket}
                  style={{
                    padding: "12px 24px",
                    background: "#C9A227",
                    color: "#1F2933",
                    border: "none",
                    borderRadius: 8,
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  Submit Support Ticket
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function MenuItem({ icon, label, active, setActive, collapsed }) {
  const isActive = active === label;
  return (
    <div
      onClick={() => setActive(label)}
      style={{
        ...styles.menuItem,
        background: isActive ? "#f7b731" : "transparent",
        color: isActive ? "white" : "#333",
        justifyContent: collapsed ? "center" : "flex-start"
      }}
    >
      {icon}
      {!collapsed && <span style={{ marginLeft: 10 }}>{label}</span>}
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div style={styles.statCard}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

function Input(props) {
  return <input {...props} style={styles.input} />;
}

/* ================= STYLES ================= */

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Poppins, sans-serif",
    background: "#f4f6f9"
  },
  sidebar: {
    background: "white",
    paddingTop: 20,
    transition: "0.3s",
    boxShadow: "2px 0 10px rgba(0,0,0,0.05)"
  },
  sidebarTop: { padding: 20 },
  iconBtn: { cursor: "pointer", fontSize: 18 },
  menuItem: { padding: 15, cursor: "pointer", display: "flex", alignItems: "center" },
  content: { flex: 1, padding: 40 },
  card: {
    background: "white",
    padding: 30,
    borderRadius: 12,
    boxShadow: "0 6px 18px rgba(0,0,0,0.05)"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  badge: {
    background: "#fff3cd",
    color: "#856404",
    padding: "6px 12px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600
  },
  input: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    marginBottom: 15,
    border: "1px solid #ddd",
    borderRadius: 6
  },
  primaryBtn: {
    background: "#f7b731",
    border: "none",
    color: "white",
    padding: "10px 20px",
    borderRadius: 6,
    cursor: "pointer"
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: 10
  },
  statsRow: { display: "flex", gap: 20, marginBottom: 30 },
  statCard: {
    background: "white",
    padding: 20,
    borderRadius: 10,
    flex: 1,
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
  },
  serviceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
    gap: 20,
    marginTop: 20
  },
  serviceCard: {
    padding: 15,
    borderRadius: 10,
    background: "#fafafa",
    border: "1px solid #eee"
  },
  tableWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    border: "1px solid #eee"
  },
  table: { width: "100%", borderCollapse: "collapse" },
  row: { borderTop: "1px solid #f1f1f1" },
  clientCell: { display: "flex", alignItems: "center", gap: 10, fontWeight: 500 },
  avatar: { width: 36, height: 36, borderRadius: "50%" },
  pending: {
    background: "#ffeeba",
    color: "#856404",
    padding: "4px 10px",
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 600
  },
  acceptBtn: {
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "6px 14px",
    borderRadius: 6,
    marginRight: 8,
    cursor: "pointer"
  },
  rejectBtn: {
    background: "#dc3545",
    color: "white",
    border: "none",
    padding: "6px 14px",
    borderRadius: 6,
    cursor: "pointer"
  }
};