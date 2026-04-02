import React from "react";
import { Link } from "react-router-dom";
import { Plane, Ship, Package, Warehouse, FileCheck, Shield, Star, CheckCircle2, ArrowRight, Globe2 } from "lucide-react";
import "./Services.css";

const SERVICES = [
  {
    id: "air",
    icon: Plane,
    color: "#00b0d8",
    title: "Air Freight",
    tagline: "When time and speed matter most",
    desc: "Our air freight solutions are designed for businesses that need fast, reliable delivery. We work with leading airlines worldwide to offer competitive rates and exceptional service.",
    features: ["Express & Standard air cargo", "Charter flights for oversized cargo", "Temperature-controlled shipments", "Dangerous goods handling", "Door-to-door delivery", "Real-time tracking"],
  },
  {
    id: "sea",
    icon: Ship,
    color: "#1565c0",
    title: "Sea Freight",
    tagline: "When cost matters and time is not an issue",
    desc: "Cost-effective ocean freight for businesses shipping large volumes. We offer Full Container Load (FCL) and Less than Container Load (LCL) solutions to ports worldwide.",
    features: ["FCL & LCL shipments", "Breakbulk & RoRo cargo", "Refrigerated containers", "Hazardous cargo specialists", "Port-to-port & door-to-door", "Weekly sailings worldwide"],
  },
  {
    id: "special",
    icon: Package,
    color: "#7c3aed",
    title: "Special Project Transport",
    tagline: "Out of gauge and anything non-standard",
    desc: "Heavy lift, oversized, and project cargo require expert planning and execution. Our specialist teams handle the extraordinary with precision engineering and route surveys.",
    features: ["Heavy lift & out-of-gauge cargo", "Project cargo management", "Route surveys & permits", "Custom equipment & trailers", "Offshore & energy projects", "Military & government cargo"],
  },
  {
    id: "logistics",
    icon: Warehouse,
    color: "#059669",
    title: "Contract Logistics",
    tagline: "Warehousing, fulfilment, 3rd party logistics and more",
    desc: "We manage your entire supply chain from warehouse to last-mile delivery. Our 3PL solutions are tailored to your specific needs, helping you scale efficiently.",
    features: ["Bonded & general warehousing", "Pick, pack & fulfillment", "Inventory management", "Distribution & last mile", "Cross-docking", "E-commerce logistics"],
  },
  {
    id: "customs",
    icon: FileCheck,
    color: "#e8a020",
    title: "Customs Clearance",
    tagline: "Ease your paperwork and let us deal with customs requirements",
    desc: "Navigating customs can be complex. Our licensed customs brokers ensure your shipments clear quickly and compliantly, with full documentation support.",
    features: ["Import & export clearance", "HS code classification", "Duty & tax calculation", "Free trade agreement advice", "AEO (Authorised Operator)", "Documentation management"],
  },
  {
    id: "vas",
    icon: Shield,
    color: "#dc2626",
    title: "Value-Added Services",
    tagline: "The extras that ensure smooth transport and delivery",
    desc: "From cargo insurance to supply chain optimisation, our value-added services complete your logistics experience and protect your business at every step.",
    features: ["Cargo insurance", "Supply chain management", "Lead logistics provider", "Vendor managed inventory", "Cargo tracking & visibility", "Dangerous goods consulting"],
  },
];

export default function Services() {
  return (
    <div className="services-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="dot-grid" />
        <div className="page-hero__orb" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="tag"><Star size={12} fill="currentColor" /> Our Services</div>
          <h1 className="heading-xl" style={{ marginBottom: 20 }}>
            Complete <span className="text-gradient">Freight & Logistics</span><br />Solutions
          </h1>
          <p style={{ color: "var(--gray-light)", fontSize: 17, maxWidth: 580, lineHeight: 1.75 }}>
            From express air freight to complex project logistics — Vertex TradeLynx delivers end-to-end solutions across the globe.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container">
          {SERVICES.map(({ id, icon: Icon, color, title, tagline, desc, features }, idx) => (
            <div key={id} id={id} className={`svc-block ${idx % 2 === 1 ? "svc-block--reverse" : ""}`}>
              <div className="svc-block__content glass-card">
                <div className="svc-block__icon" style={{ "--c": color }}>
                  <Icon size={32} />
                </div>
                <div className="tag" style={{ fontSize: 11 }}>{tagline}</div>
                <h2 className="heading-md" style={{ marginBottom: 16 }}>{title}</h2>
                <p style={{ color: "var(--gray-light)", lineHeight: 1.75, marginBottom: 28 }}>{desc}</p>
                <ul className="svc-features">
                  {features.map(f => (
                    <li key={f} className="svc-feature">
                      <CheckCircle2 size={16} style={{ color }} /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/quote" className="btn btn-primary" style={{ marginTop: 32, alignSelf: "flex-start" }}>
                  Request {title} Quote <ArrowRight size={15} />
                </Link>
              </div>
              <div className="svc-block__visual">
                <div className="svc-block__card-big" style={{ "--c": color }}>
                  <Icon size={80} />
                  <div className="svc-block__number">{String(idx + 1).padStart(2, "0")}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Supply Chain */}
      <section className="section supply-chain-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="tag"><Globe2 size={12} /> Advanced Solutions</div>
            <h2 className="heading-lg">Supply Chain <span className="text-gradient">Optimisation</span></h2>
            <p style={{ color: "var(--gray-light)", maxWidth: 560, margin: "16px auto 0", lineHeight: 1.7 }}>
              Are your supply chains working for or against your business goals? We build resilient supply chains for the real world.
            </p>
          </div>
          <div className="supply-grid">
            {[
              { title: "Lead Logistics", desc: "Harness the best intelligence gathering technology combined with decades of experience to enhance your operations and profitability." },
              { title: "Supply Chain Optimisation", desc: "Resilient, flexible supply chains built to withstand disruption. We map, analyse and redesign your flows for maximum efficiency." },
              { title: "Vendor Management", desc: "Centralised oversight of all your suppliers, freight partners and service providers — all under one roof." },
              { title: "Visibility & Control", desc: "Full end-to-end visibility via our tracking platform. Know where every shipment is, at every moment." },
            ].map(card => (
              <div key={card.title} className="supply-card glass-card">
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{card.title}</h3>
                <p style={{ color: "var(--gray-light)", fontSize: 14, lineHeight: 1.7 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
