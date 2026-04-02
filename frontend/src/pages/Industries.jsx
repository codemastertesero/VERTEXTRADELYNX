import React from "react";
import { Link } from "react-router-dom";
import { Car, Cpu, Heart, Zap, Factory, ShoppingBag, Plane, Flask, ArrowRight, Globe2 } from "lucide-react";
import "./Industries.css";

const INDUSTRIES = [
  {
    icon: Car,      color: "#1565c0", title: "Automotive",
    desc: "Transportation and logistics services to optimise supply chains and meet tighter production schedules. We understand just-in-time manufacturing and the critical nature of parts delivery.",
    points: ["JIT delivery solutions", "Cross-border parts logistics", "Assembly line supply", "Finished vehicle logistics"],
  },
  {
    icon: Cpu,      color: "#7c3aed", title: "Technology",
    desc: "End-to-end, integrated and reliable supply chain solutions to link production sites with distribution channels across the world. High-value, sensitive cargo handled with care.",
    points: ["High-value electronics", "White glove handling", "Bonded warehouse", "Global distribution hubs"],
  },
  {
    icon: Heart,    color: "#dc2626", title: "Healthcare",
    desc: "Dedicated teams and a wide range of solutions to ensure compliance with quality standards and regulations. Temperature-sensitive and life-saving cargo is our priority.",
    points: ["GDP-compliant cold chain", "Pharma & medical devices", "Regulatory compliance", "Emergency shipments"],
  },
  {
    icon: Zap,      color: "#e8a020", title: "Energy",
    desc: "Innovative, reliable and tailored solutions for energy transport logistics, whenever and wherever needed. From oil & gas to renewable energy equipment.",
    points: ["Oversized equipment", "Offshore project cargo", "Renewable energy assets", "Remote site delivery"],
  },
  {
    icon: Factory,  color: "#059669", title: "Industrial",
    desc: "Tailor-made solutions to manage complex demands and make supply chains leaner and more agile. Heavy machinery, plant equipment, and more.",
    points: ["Heavy machinery shipping", "Plant relocation", "Break-bulk cargo", "Lean supply chain"],
  },
  {
    icon: ShoppingBag, color: "#0288d1", title: "Consumer",
    desc: "Transport to warehouse, distribution centre or direct-to-store so goods can reach the retailers directly. Fast-moving consumer goods need fast, reliable logistics.",
    points: ["Direct-to-store delivery", "E-commerce fulfillment", "Seasonal peak handling", "Multi-channel distribution"],
  },
  {
    icon: Plane,    color: "#00b0d8", title: "Aerospace",
    desc: "Dedicated teams to move your aerospace cargo around the globe in the safest fashion. High-value, often time-critical components handled by specialists.",
    points: ["AOG (aircraft on ground)", "Engine & parts logistics", "OEM supply chain", "IATA-certified handling"],
  },
  {
    icon: Globe2,   color: "#a855f7", title: "Chemicals",
    desc: "Regulatory, safety and security compliance, and dedicated solutions to maintain product integrity during transportation. Hazardous and non-hazardous chemical logistics.",
    points: ["IMDG & IATA DG compliance", "Segregation & labelling", "Emergency response", "Full documentation"],
  },
];

export default function Industries() {
  return (
    <div>
      {/* Hero */}
      <section className="page-hero">
        <div className="dot-grid" />
        <div className="page-hero__orb" style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.25), transparent 70%)" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="tag"><Globe2 size={12} /> Industries We Serve</div>
          <h1 className="heading-xl" style={{ marginBottom: 20 }}>
            Your Industry,<br /><span className="text-gradient">Our Expertise</span>
          </h1>
          <p style={{ color: "var(--gray-light)", fontSize: 17, maxWidth: 560, lineHeight: 1.75 }}>
            Whatever your sector, we bring deep domain knowledge and a global network to optimise your supply chain.
          </p>
        </div>
      </section>

      {/* Industries grid */}
      <section className="section">
        <div className="container">
          <div className="ind-grid">
            {INDUSTRIES.map(({ icon: Icon, color, title, desc, points }) => (
              <div key={title} className="ind-card glass-card">
                <div className="ind-card__icon" style={{ "--c": color }}>
                  <Icon size={28} />
                </div>
                <h3 className="ind-card__title">{title}</h3>
                <p className="ind-card__desc">{desc}</p>
                <ul className="ind-card__points">
                  {points.map(p => (
                    <li key={p} style={{ color: "var(--c)", display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--c)", flexShrink: 0 }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="ind-cta glass-card">
            <div>
              <h3 className="heading-md" style={{ marginBottom: 12 }}>In a Different Industry?</h3>
              <p style={{ color: "var(--gray-light)" }}>We work across all sectors. Talk to our team about your specific requirements.</p>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <Link to="/contact" className="btn btn-primary">Contact Us <ArrowRight size={15} /></Link>
              <Link to="/quote" className="btn btn-outline">Get a Quote</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
