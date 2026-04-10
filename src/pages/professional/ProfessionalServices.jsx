import { useState } from "react";

export default function ProfessionalServices() {
  const [service, setService] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [servicesList, setServicesList] = useState([]);

  const handleChange = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };

  const addService = (e) => {
    e.preventDefault();
    setServicesList([...servicesList, service]);

    setService({
      title: "",
      description: "",
      price: "",
    });
  };

  return (
    <div>
      <h2>Add Service</h2>

      <form onSubmit={addService}>
        <input
          name="title"
          placeholder="Service title"
          value={service.title}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          placeholder="Service description"
          value={service.description}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          placeholder="Price"
          value={service.price}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Service</button>
      </form>

      <h3>My Services</h3>
      {servicesList.map((s, index) => (
        <div key={index}>
          <b>{s.title}</b> — {s.description} — ₹{s.price}
        </div>
      ))}
    </div>
  );
}