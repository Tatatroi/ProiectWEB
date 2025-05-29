import React, { useState } from "react";
import "../css/ContactPage.css";

export default function ContactPage() {
  const [form, setForm] = useState({ email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Email sent! (funcționalitatea de trimitere nu e implementată inca)");
    setForm({ email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <h2>Contact</h2>
      <div className="contact-content">
        <div className="contact-info">
          <h3>Date de contact</h3>
          <p><strong>Telephone:</strong> <a href="tel:+40213123123">+40 722 333 444</a></p>
          <p><strong>Address:</strong> Str. Exemplu, Nr. 15, Cluj-Napoca, Cluj, România</p>
          <p><strong>Email:</strong> <a href="mailto:contact@tripplanner.com">contact@tripplanner.com</a></p>
          <div className="map-container">
            <iframe
              title="Adresa TripPlanner"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.3639152172267!2d26.084073415527785!3d44.436141079102485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ffe1c67eeda5%3A0x427dd9b3fe2b9d6d!2sPia%C8%9Ba%20Victoriei%2C%20Bucure%C8%99ti!5e0!3m2!1sen!2sro!4v1685807700000!5m2!1sen!2sro"
              width="100%" height="200" frameBorder="0" style={{ border: 0 }} allowFullScreen="" loading="lazy"
            ></iframe>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Trimite-ne un mesaj</h3>
          <label>
            Emailul tău:
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="name@email.com"
            />
          </label>
          <label>
            Mesajul tău:
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              placeholder="Scrie aici mesajul..."
              rows={5}
            />
          </label>
          <button type="submit">Trimite</button>
        </form>
      </div>
    </div>
  );
}