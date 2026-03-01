import { useState } from "react";

export default function ProfessionalProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    experience: "",
    category: "",
    price: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Data:", formData);
    alert("Profile saved (frontend only)");
  };

  return (
    <div>
      <h2>Create Professional Profile</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <label>Bio:</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} required />
        </div>

        <div>
          <label>Experience (years):</label>
          <input name="experience" value={formData.experience} onChange={handleChange} required />
        </div>

        <div>
          <label>Service Category:</label>
          <input name="category" value={formData.category} onChange={handleChange} required />
        </div>

        <div>
          <label>Price:</label>
          <input name="price" value={formData.price} onChange={handleChange} required />
        </div>

        <div>
          <label>Location:</label>
          <input name="location" value={formData.location} onChange={handleChange} required />
        </div>

        <br />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}