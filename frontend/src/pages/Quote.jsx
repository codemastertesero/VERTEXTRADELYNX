import React, { useState } from "react";
import { Plane, Ship, Package, Warehouse, Send, CheckCircle2, AlertCircle, ChevronRight } from "lucide-react";
import "./Quote.css";

const SERVICES = [
  { id: "air",      icon: Plane,     label: "Air Freight",         color: "#00b0d8" },
  { id: "sea",      icon: Ship,      label: "Sea Freight",         color: "#1565c0" },
  { id: "special",  icon: Package,   label: "Special Project",     color: "#7c3aed" },
  { id: "logistics",icon: Warehouse, label: "Contract Logistics",  color: "#059669" },
];

const STEPS = ["Cargo Details", "Route & Timeline", "Contact Info", "Review"];

export default function Quote() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [form, setForm] = useState({
    // Step 0
    service: "",
    cargoType: "",
    weight: "",
    dimensions: "",
    quantity: "",
    dangerous: "no",
    // Step 1
    origin: "",
    destination: "",
    readyDate: "",
    deliveryDate: "",
    incoterms: "",
    // Step 2
    name: "",
    company: "",
    email: "",
    phone: "",
    // Notes
    message: "",
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setStatus("loading");
    const message = `
FREIGHT QUOTE REQUEST

Service: ${form.service}
Cargo Type: ${form.cargoType}
Weight: ${form.weight} kg
Dimensions: ${form.dimensions}
Quantity: ${form.quantity}
Dangerous Goods: ${form.dangerous}

Origin: ${form.origin}
Destination: ${form.destination}
Cargo Ready Date: ${form.readyDate}
Required Delivery: ${form.deliveryDate}
Incoterms: ${form.incoterms}

Company: ${form.company}
Additional Notes: ${form.message}
    `.trim();

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          origin: form.origin,
          destination: form.destination,
          message,
        }),
      });
      const data = await res.json();
      if (data.success) setStatus("success");
      else { setStatus("error"); setErrMsg(data.error || "Error submitting quote."); }
    } catch {
      setStatus("error");
      setErrMsg("Network error. Please try again.");
    }
  };

  return (
    <div>
      <section className="page-hero">
        <div className="dot-grid" />
        <div className="page-hero__orb" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="tag">Get a Quote</div>
          <h1 className="heading-xl" style={{ marginBottom: 20 }}>
            Request a <span className="text-gradient">Freight Quote</span>
          </h1>
          <p style={{ color: "var(--gray-light)", fontSize: 17, maxWidth: 520, lineHeight: 1.75 }}>
            Fill in your shipment details and we'll provide a competitive quote within 24 hours.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container" style={{ maxWidth: 840 }}>
          {status === "success" ? (
            <div className="quote-success glass-card">
              <CheckCircle2 size={56} color="var(--accent)" />
              <h2 className="heading-lg">Quote Request Sent!</h2>
              <p style={{ color: "var(--gray-light)", fontSize: 16, lineHeight: 1.7 }}>
                Thank you, <strong style={{ color: "white" }}>{form.name}</strong>! We've received your freight quote request and sent a confirmation to <strong style={{ color: "white" }}>{form.email}</strong>. Our team will be in touch within 24 hours.
              </p>
              <p style={{ color: "var(--gray-light)" }}>
                For urgent enquiries, call us directly at{" "}
                <a href="tel:+919503645532" style={{ color: "var(--accent)", fontWeight: 600 }}>+91 95036 45532</a>
              </p>
            </div>
          ) : (
            <>
              {/* Step indicator */}
              <div className="quote-steps">
                {STEPS.map((s, i) => (
                  <div key={s} className={`quote-step ${i === step ? "quote-step--active" : i < step ? "quote-step--done" : ""}`}>
                    <div className="quote-step__num">{i < step ? <CheckCircle2 size={14} /> : i + 1}</div>
                    <span className="quote-step__label">{s}</span>
                    {i < STEPS.length - 1 && <ChevronRight size={16} className="quote-step__sep" />}
                  </div>
                ))}
              </div>

              <div className="glass-card quote-body">
                {/* Step 0: Cargo */}
                {step === 0 && (
                  <div className="quote-panel">
                    <h3 className="quote-panel__title">Cargo Details</h3>
                    <p className="quote-panel__sub">Tell us about what you need to ship</p>

                    <div className="svc-picker">
                      {SERVICES.map(({ id, icon: Icon, label, color }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => set("service", label)}
                          className={`svc-pick-btn ${form.service === label ? "active" : ""}`}
                          style={{ "--c": color }}
                        >
                          <Icon size={22} /> {label}
                        </button>
                      ))}
                    </div>

                    <div className="grid-2" style={{ marginTop: 24 }}>
                      <div className="form-group">
                        <label className="form-label">Cargo Type / Description *</label>
                        <input value={form.cargoType} onChange={e => set("cargoType", e.target.value)} placeholder="e.g. Electronics, Machinery, Textile" className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Total Weight (kg)</label>
                        <input value={form.weight} onChange={e => set("weight", e.target.value)} placeholder="e.g. 500" className="form-input" type="number" />
                      </div>
                    </div>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Dimensions (L×W×H cm)</label>
                        <input value={form.dimensions} onChange={e => set("dimensions", e.target.value)} placeholder="e.g. 100×80×60" className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Number of Pieces / Pallets</label>
                        <input value={form.quantity} onChange={e => set("quantity", e.target.value)} placeholder="e.g. 10 cartons" className="form-input" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Dangerous Goods?</label>
                      <div className="radio-group">
                        {["yes","no"].map(v => (
                          <label key={v} className={`radio-btn ${form.dangerous === v ? "active" : ""}`}>
                            <input type="radio" value={v} checked={form.dangerous === v} onChange={() => set("dangerous", v)} style={{ display: "none" }} />
                            {v === "yes" ? "Yes — DG Cargo" : "No — Standard Cargo"}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 1: Route */}
                {step === 1 && (
                  <div className="quote-panel">
                    <h3 className="quote-panel__title">Route & Timeline</h3>
                    <p className="quote-panel__sub">Where is your cargo going, and when?</p>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Origin City / Country *</label>
                        <input value={form.origin} onChange={e => set("origin", e.target.value)} required placeholder="e.g. Mumbai, India" className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Destination City / Country *</label>
                        <input value={form.destination} onChange={e => set("destination", e.target.value)} required placeholder="e.g. Hamburg, Germany" className="form-input" />
                      </div>
                    </div>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Cargo Ready Date</label>
                        <input type="date" value={form.readyDate} onChange={e => set("readyDate", e.target.value)} className="form-input" style={{ colorScheme: "dark" }} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Required Delivery Date</label>
                        <input type="date" value={form.deliveryDate} onChange={e => set("deliveryDate", e.target.value)} className="form-input" style={{ colorScheme: "dark" }} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Incoterms</label>
                      <select value={form.incoterms} onChange={e => set("incoterms", e.target.value)} className="form-select">
                        <option value="">Select Incoterms (optional)</option>
                        <option>EXW – Ex Works</option>
                        <option>FOB – Free on Board</option>
                        <option>CIF – Cost, Insurance and Freight</option>
                        <option>DDP – Delivered Duty Paid</option>
                        <option>DAP – Delivered at Place</option>
                        <option>CFR – Cost and Freight</option>
                        <option>FCA – Free Carrier</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Additional Notes</label>
                      <textarea value={form.message} onChange={e => set("message", e.target.value)} placeholder="Special handling, temperature requirements, insurance needs, etc." className="form-textarea" />
                    </div>
                  </div>
                )}

                {/* Step 2: Contact */}
                {step === 2 && (
                  <div className="quote-panel">
                    <h3 className="quote-panel__title">Your Contact Information</h3>
                    <p className="quote-panel__sub">We'll send your quote to this email address</p>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input value={form.name} onChange={e => set("name", e.target.value)} required placeholder="John Smith" className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Company Name</label>
                        <input value={form.company} onChange={e => set("company", e.target.value)} placeholder="Acme Corp" className="form-input" />
                      </div>
                    </div>
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">Email Address *</label>
                        <input type="email" value={form.email} onChange={e => set("email", e.target.value)} required placeholder="john@company.com" className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+91 98765 43210" className="form-input" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Review */}
                {step === 3 && (
                  <div className="quote-panel">
                    <h3 className="quote-panel__title">Review Your Request</h3>
                    <p className="quote-panel__sub">Please confirm your shipment details</p>
                    <div className="review-table">
                      {[
                        ["Service",     form.service || "—"],
                        ["Cargo",       form.cargoType || "—"],
                        ["Weight",      form.weight ? `${form.weight} kg` : "—"],
                        ["Dimensions",  form.dimensions || "—"],
                        ["Origin",      form.origin || "—"],
                        ["Destination", form.destination || "—"],
                        ["Ready Date",  form.readyDate || "—"],
                        ["Incoterms",   form.incoterms || "—"],
                        ["Name",        form.name || "—"],
                        ["Email",       form.email || "—"],
                        ["Phone",       form.phone || "—"],
                      ].map(([k, v]) => (
                        <div key={k} className="review-row">
                          <span className="review-key">{k}</span>
                          <span className="review-val">{v}</span>
                        </div>
                      ))}
                    </div>
                    {status === "error" && (
                      <div className="alert alert-error" style={{ display: "flex", gap: 10, marginTop: 20 }}>
                        <AlertCircle size={16} /> {errMsg}
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation */}
                <div className="quote-nav">
                  {step > 0 && (
                    <button onClick={() => setStep(s => s - 1)} className="btn btn-outline">Back</button>
                  )}
                  <div style={{ flex: 1 }} />
                  {step < 3 ? (
                    <button onClick={() => setStep(s => s + 1)} className="btn btn-primary">
                      Next <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button onClick={handleSubmit} disabled={status === "loading"} className="btn btn-primary">
                      {status === "loading" ? <><span className="spinner" /> Submitting...</> : <><Send size={15} /> Submit Quote Request</>}
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
