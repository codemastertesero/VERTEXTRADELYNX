import React from "react";
import { Link } from "react-router-dom";
import { Award, Globe2, Users, Shield, Target, Heart, ArrowRight, CheckCircle2, Linkedin } from "lucide-react";
import "./About.css";

const VALUES = [
  { icon: Shield,  color: "#00b0d8", title: "Integrity",    desc: "We operate with complete transparency. No hidden fees, no surprises — just honest, straightforward freight forwarding." },
  { icon: Target,  color: "#7c3aed", title: "Precision",    desc: "Every shipment is handled with meticulous care. We sweat the details so your cargo arrives perfectly, every time." },
  { icon: Globe2,  color: "#1565c0", title: "Global Reach", desc: "With partners in 50+ countries, we connect your business to the world through a trusted, established network." },
  { icon: Heart,   color: "#dc2626", title: "Partnership",  desc: "We're more than a freight forwarder — we're an extension of your team, invested in your success." },
];

const MILESTONES = [
  { year: "2014", event: "Vertex TradeLynx founded in Mumbai by Nilesh Chavan" },
  { year: "2016", event: "Expanded air freight operations to 15 countries" },
  { year: "2018", event: "Launched full contract logistics & 3PL services" },
  { year: "2020", event: "Crossed 200+ active clients across 8 industries" },
  { year: "2022", event: "Opened dedicated special projects division" },
  { year: "2024", event: "Serving 500+ clients across 50+ countries" },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="page-hero">
        <div className="dot-grid" />
        <div className="page-hero__orb" style={{ background: "radial-gradient(ellipse, rgba(0,176,216,0.2), transparent 70%)" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="tag"><Award size={12} /> About Us</div>
          <h1 className="heading-xl" style={{ marginBottom: 20 }}>
            Moving the World's<br /><span className="text-gradient">Cargo Forward</span>
          </h1>
          <p style={{ color: "var(--gray-light)", fontSize: 17, maxWidth: 580, lineHeight: 1.75 }}>
            Founded in Mumbai with a vision to simplify global trade, Vertex TradeLynx is your trusted partner for freight forwarding, logistics, and export.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container about-story">
          <div className="about-story__text">
            <div className="tag"><Users size={12} /> Our Story</div>
            <h2 className="heading-lg" style={{ marginBottom: 24 }}>
              Born from a <span className="text-gradient">Passion for Trade</span>
            </h2>
            <p style={{ color: "var(--gray-light)", lineHeight: 1.8, marginBottom: 20 }}>
              Vertex TradeLynx was founded by Nilesh Chavan with a simple but powerful belief: that every business, regardless of size, deserves access to world-class freight forwarding expertise.
            </p>
            <p style={{ color: "var(--gray-light)", lineHeight: 1.8, marginBottom: 20 }}>
              Starting from Mumbai — India's commercial capital — we built a company grounded in relationships, reliability, and results. Today we serve 500+ clients across 50+ countries, handling everything from urgent air freight to complex project cargo.
            </p>
            <p style={{ color: "var(--gray-light)", lineHeight: 1.8, marginBottom: 32 }}>
              Our approach is simple: understand your business deeply, design a logistics solution that fits, and execute it flawlessly. Every shipment matters to us because we know it matters to you.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link to="/contact" className="btn btn-primary">Talk to Us <ArrowRight size={15} /></Link>
              <Link to="/quote"   className="btn btn-outline">Get a Quote</Link>
            </div>
          </div>

          {/* Founder card */}
          <div className="about-founder glass-card">
            <div className="about-founder__avatar">
              <span>NC</span>
            </div>
            <h3 className="about-founder__name">Nilesh Chavan</h3>
            <p className="about-founder__role">Founder & CEO, Vertex TradeLynx</p>
            <p className="about-founder__bio">
              A logistics veteran with deep roots in Mumbai's freight forwarding industry. Nilesh brings expertise in international trade, customs regulations, and supply chain optimisation to every client relationship.
            </p>
            <div className="about-founder__stats">
              <div className="about-founder__stat">
                <div className="stat-number" style={{ fontSize: "2rem" }}>10+</div>
                <div style={{ color: "var(--gray-light)", fontSize: 13 }}>Years Expertise</div>
              </div>
              <div className="about-founder__stat">
                <div className="stat-number" style={{ fontSize: "2rem" }}>500+</div>
                <div style={{ color: "var(--gray-light)", fontSize: 13 }}>Clients Served</div>
              </div>
              <div className="about-founder__stat">
                <div className="stat-number" style={{ fontSize: "2rem" }}>50+</div>
                <div style={{ color: "var(--gray-light)", fontSize: 13 }}>Countries</div>
              </div>
            </div>
            <a href="mailto:nilesh@vertextradelynx.com" className="btn btn-glass" style={{ width: "100%", justifyContent: "center" }}>
              Contact Nilesh
            </a>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="tag"><Heart size={12} /> Our Values</div>
            <h2 className="heading-lg">What Drives <span className="text-gradient">Everything We Do</span></h2>
          </div>
          <div className="grid-4">
            {VALUES.map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="glass-card" style={{ padding: 32 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 12, marginBottom: 20,
                  background: `color-mix(in srgb, ${color} 12%, transparent)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color
                }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{title}</h3>
                <p style={{ color: "var(--gray-light)", fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="tag"><Award size={12} /> Our Journey</div>
            <h2 className="heading-lg">A Decade of <span className="text-gradient">Growth & Excellence</span></h2>
          </div>
          <div className="timeline">
            {MILESTONES.map(({ year, event }, i) => (
              <div key={year} className={`timeline__item ${i % 2 === 0 ? "timeline__item--left" : "timeline__item--right"}`}>
                <div className="timeline__content glass-card">
                  <div className="timeline__year">{year}</div>
                  <p style={{ color: "var(--gray-light)", fontSize: 14, lineHeight: 1.6 }}>{event}</p>
                </div>
                <div className="timeline__dot" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
