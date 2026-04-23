import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    alert("Message sent!");
  };

  return (
    <div>
      <h1>My Portfolio</h1>

      <section>
        <h2>Projects</h2>
        {projects.map(p => (
          <div key={p._id}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <a href={p.github}>GitHub</a>
          </div>
        ))}
      </section>

      <section>
        <h2>Contact</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
          <textarea placeholder="Message" onChange={e => setForm({ ...form, message: e.target.value })}></textarea>
          <button type="submit">Send</button>
        </form>
      </section>
    </div>
  );
}

export default App;