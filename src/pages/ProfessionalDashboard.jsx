import { useState } from "react";
import { FaUser, FaTools, FaCalendarCheck, FaBars } from "react-icons/fa";

export default function ProfessionalDashboard() {

  const [active, setActive] = useState("Profile");
  const [collapsed, setCollapsed] = useState(false);

  const [profileImage, setProfileImage] = useState(null);

  const [services, setServices] = useState([]);
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  const [requests, setRequests] = useState([
    { id: 1, client: "Rahul", service: "Plumbing", date: "12 Feb" },
    { id: 2, client: "Anita", service: "Electric Repair", date: "15 Feb" }
  ]);

  const addService = () => {
    if (!serviceTitle) return;
    setServices([...services, { title: serviceTitle, desc: serviceDesc, price: servicePrice }]);
    setServiceTitle("");
    setServiceDesc("");
    setServicePrice("");
  };

  const removeRequest = (id) => {
    setRequests(requests.filter(r => r.id !== id));
  };

  return (
    <div style={styles.container}>

      {/* SIDEBAR */}
      <div style={{...styles.sidebar, width: collapsed ? 80 : 240}}>
        <div style={styles.sidebarTop}>
          <FaBars style={styles.iconBtn} onClick={() => setCollapsed(!collapsed)} />
        </div>

        <MenuItem icon={<FaUser/>} label="Profile" active={active} setActive={setActive} collapsed={collapsed} />
        <MenuItem icon={<FaTools/>} label="Services" active={active} setActive={setActive} collapsed={collapsed} />
        <MenuItem icon={<FaCalendarCheck/>} label="Requests" active={active} setActive={setActive} collapsed={collapsed} />
      </div>

      {/* CONTENT */}
      <div style={styles.content}>

        {/* STATS */}
        <div style={styles.statsRow}>
          <StatCard title="Total Services" value={services.length} />
          <StatCard title="Pending Requests" value={requests.length} />
          <StatCard title="Rating" value="4.8 ⭐" />
        </div>

        {/* PROFILE */}
        {active === "Profile" && (
          <div style={styles.card}>
            <h2>Professional Profile</h2>

            <div style={{display:"flex", gap:30, alignItems:"center"}}>
              <div>
                <img
                  src={profileImage || "https://via.placeholder.com/120"}
                  style={styles.profileImg}
                />
                <input
                  type="file"
                  onChange={(e)=>setProfileImage(URL.createObjectURL(e.target.files[0]))}
                />
              </div>

              <div style={{flex:1}}>
                <Input placeholder="Name" />
                <textarea style={styles.input} placeholder="Bio" />
                <Input placeholder="Experience (years)" />
                <Input placeholder="Category" />
                <Input placeholder="Price" />
                <Input placeholder="Location" />
                <button style={styles.primaryBtn}>Save Profile</button>
              </div>
            </div>
          </div>
        )}

        {/* SERVICES */}
        {active === "Services" && (
          <div style={styles.card}>
            <h2>My Services</h2>

            <Input placeholder="Service title" value={serviceTitle} onChange={e=>setServiceTitle(e.target.value)} />
            <textarea style={styles.input} placeholder="Description" value={serviceDesc} onChange={e=>setServiceDesc(e.target.value)} />
            <Input placeholder="Price" value={servicePrice} onChange={e=>setServicePrice(e.target.value)} />
            <button style={styles.primaryBtn} onClick={addService}>Add Service</button>

            <div style={styles.serviceGrid}>
              {services.map((s,i)=> (
                <div key={i} style={styles.serviceCard}>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                  <b>₹ {s.price}</b>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REQUESTS PREMIUM */}
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
                    <th>Status</th>
                    <th style={{textAlign:"right"}}>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {requests.map(r => (
                    <tr key={r.id} style={styles.row}>

                      <td style={styles.clientCell}>
                        <img
                          src={`https://ui-avatars.com/api/?name=${r.client}`}
                          style={styles.avatar}
                        />
                        {r.client}
                      </td>

                      <td>{r.service}</td>
                      <td>{r.date}</td>

                      <td>
                        <span style={styles.pending}>Pending</span>
                      </td>

                      <td style={{textAlign:"right"}}>
                        <button
                          style={styles.acceptBtn}
                          onClick={() => removeRequest(r.id)}
                        >
                          Accept
                        </button>

                        <button
                          style={styles.rejectBtn}
                          onClick={() => removeRequest(r.id)}
                        >
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

      </div>
    </div>
  );
}


function MenuItem({icon,label,active,setActive,collapsed}){
  const isActive = active === label;
  return (
    <div
      onClick={()=>setActive(label)}
      style={{
        ...styles.menuItem,
        background: isActive ? "#f7b731" : "transparent",
        color: isActive ? "white" : "#333",
        justifyContent: collapsed ? "center" : "flex-start"
      }}
    >
      {icon}
      {!collapsed && <span style={{marginLeft:10}}>{label}</span>}
    </div>
  );
}


function StatCard({title,value}){
  return (
    <div style={styles.statCard}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}


function Input(props){
  return <input {...props} style={styles.input} />;
}


const styles = {

container:{
  display:"flex",
  minHeight:"100vh",
  fontFamily:"Poppins, sans-serif",
  background:"#f4f6f9"
},

sidebar:{
  background:"white",
  paddingTop:20,
  transition:"0.3s",
  boxShadow:"2px 0 10px rgba(0,0,0,0.05)"
},

sidebarTop:{ padding:20 },

iconBtn:{ cursor:"pointer", fontSize:18 },

menuItem:{ padding:15, cursor:"pointer", display:"flex", alignItems:"center" },

content:{ flex:1, padding:40 },

card:{
  background:"white",
  padding:30,
  borderRadius:12,
  boxShadow:"0 6px 18px rgba(0,0,0,0.05)"
},

cardHeader:{
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom:20
},

badge:{
  background:"#fff3cd",
  color:"#856404",
  padding:"6px 12px",
  borderRadius:20,
  fontSize:12,
  fontWeight:600
},

input:{
  width:"100%",
  padding:10,
  marginTop:10,
  marginBottom:15,
  border:"1px solid #ddd",
  borderRadius:6
},

primaryBtn:{
  background:"#f7b731",
  border:"none",
  color:"white",
  padding:"10px 20px",
  borderRadius:6,
  cursor:"pointer"
},

profileImg:{
  width:120,
  height:120,
  borderRadius:"50%",
  objectFit:"cover",
  marginBottom:10
},

statsRow:{ display:"flex", gap:20, marginBottom:30 },

statCard:{
  background:"white",
  padding:20,
  borderRadius:10,
  flex:1,
  boxShadow:"0 4px 12px rgba(0,0,0,0.05)"
},

serviceGrid:{
  display:"grid",
  gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",
  gap:20,
  marginTop:20
},

serviceCard:{
  padding:15,
  borderRadius:10,
  background:"#fafafa",
  border:"1px solid #eee"
},

tableWrapper:{
  borderRadius:12,
  overflow:"hidden",
  border:"1px solid #eee"
},

table:{ width:"100%", borderCollapse:"collapse" },

row:{ borderTop:"1px solid #f1f1f1" },

clientCell:{ display:"flex", alignItems:"center", gap:10, fontWeight:500 },

avatar:{ width:36, height:36, borderRadius:"50%" },

pending:{
  background:"#ffeeba",
  color:"#856404",
  padding:"4px 10px",
  borderRadius:12,
  fontSize:12,
  fontWeight:600
},

acceptBtn:{
  background:"#28a745",
  color:"white",
  border:"none",
  padding:"6px 14px",
  borderRadius:6,
  marginRight:8,
  cursor:"pointer"
},

rejectBtn:{
  background:"#dc3545",
  color:"white",
  border:"none",
  padding:"6px 14px",
  borderRadius:6,
  cursor:"pointer"
}

};