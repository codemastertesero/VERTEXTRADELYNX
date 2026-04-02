import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", origin: "", destination: "", message: "" });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", service: "", origin: "", destination: "", message: "" });
      } else {
        setStatus("error");
        setErrMsg(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrMsg("Network error. Please try again or call us directly.");
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="page-hero">
        <div className="dot-grid" />
        <div className="page-hero__orb" style={{ background: "radial-gradient(ellipse, rgba(21,101,192,0.25), transparent 70%)" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="tag"><Mail size={12} /> Contact Us</div>
          <h1 className="heading-xl" style={{ marginBottom: 20 }}>
            Let's Talk <span className="text-gradient">Freight</span>
          </h1>
          <p style={{ color: "var(--gray-light)", fontSize: 17, maxWidth: 520, lineHeight: 1.75 }}>
            Our team is ready to help you move cargo anywhere in the world. Reach out and we'll respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact grid */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container contact-grid">

          {/* Info panel */}
          <div className="contact-info">
            <div className="contact-info__card glass-card">
              <h2 className="heading-md" style={{ marginBottom: 32 }}>Get in Touch</h2>

              <a href="tel:+919503645532" className="contact-info__item">
                <div className="contact-info__icon" style={{ "--c": "var(--accent)" }}>
                  <Phone size={20} />
                </div>
                <div>
                  <div className="contact-info__label">Call Us Directly</div>
                  <div className="contact-info__value">+91 95036 45532</div>
                  <div className="contact-info__sub">Available Mon–Sat, 9AM–7PM IST</div>
                </div>
              </a>

              <a href="mailto:nilesh@vertextradelynx.com" className="contact-info__item">
                <div className="contact-info__icon" style={{ "--c": "#7c3aed" }}>
                  <Mail size={20} />
                </div>
                <div>
                  <div className="contact-info__label">Email Us</div>
                  <div className="contact-info__value">nilesh@vertextradelynx.com</div>
                  <div className="contact-info__sub">We reply within 24 hours</div>
                </div>
              </a>

              <div className="contact-info__item">
                <div className="contact-info__icon" style={{ "--c": "#059669" }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="contact-info__label">Our Office</div>
                  <div className="contact-info__value">Mumbai, Maharashtra</div>
                  <div className="contact-info__sub">India — 400 001</div>
                </div>
              </div>

              <div className="contact-info__item">
                <div className="contact-info__icon" style={{ "--c": "#e8a020" }}>
                  <Clock size={20} />
                </div>
                <div>
                  <div className="contact-info__label">Business Hours</div>
                  <div className="contact-info__value">Mon – Sat: 9:00 AM – 7:00 PM</div>
                  <div className="contact-info__sub">Emergency support available 24/7</div>
                </div>
              </div>

              <div className="contact-info__quick">
                <a href="tel:+919503645532" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                  <Phone size={15} /> Call Now
                </a>
                <a href="mailto:nilesh@vertextradelynx.com" className="btn btn-outline" style={{ flex: 1, justifyContent: "center" }}>
                  <Mail size={15} /> Email
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap glass-card">
            <h2 className="heading-md" style={{ marginBottom: 8 }}>Send an Enquiry</h2>
            <p style={{ color: "var(--gray-light)", fontSize: 14, marginBottom: 32 }}>
              Fill in the details below and we'll send a quote to your inbox.
            </p>

            {status === "success" ? (
              <div className="alert alert-success" style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: 1 }} />
                <div>
                  <strong>Enquiry received!</strong><br />
                  Thank you for reaching out. We've sent a confirmation to your email and will be in touch within 24 hours.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="John Smith" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="john@company.com" className="form-input" />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Service Required</label>
                    <select name="service" value={form.service} onChange={handleChange} className="form-select">
                      <option value="">Select a service</option>
                      <option>Air Freight</option>
                      <option>Sea Freight</option>
                      <option>Special Project Transport</option>
                      <option>Contract Logistics</option>
                      <option>Customs Clearance</option>
                      <option>Value-Added Services</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Origin</label>
                    <input name="origin" value={form.origin} onChange={handleChange} placeholder="City / Country" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Destination</label>
                    <input name="destination" value={form.destination} onChange={handleChange} placeholder="City / Country" className="form-input" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required placeholder="Tell us about your cargo, dimensions, weight, timeline or any other requirements..." className="form-textarea" style={{ minHeight: 130 }} />
                </div>

                {status === "error" && (
                  <div className="alert alert-error" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <AlertCircle size={16} /> {errMsg}
                  </div>
                )}

                <button type="submit" disabled={status === "loading"} className="btn btn-primary" style={{ alignSelf: "flex-start", minWidth: 180 }}>
                  {status === "loading" ? (
                    <><span className="spinner" /> Sending...</>
                  ) : (
                    <><Send size={15} /> Send Enquiry</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
