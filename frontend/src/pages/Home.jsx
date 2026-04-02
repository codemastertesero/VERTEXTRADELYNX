import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plane, Ship, Package, Warehouse, Shield, Globe2,
  ArrowRight, CheckCircle2, ChevronRight, Star,
  Zap, Clock, Award, Users
} from "lucide-react";
import "./Home.css";

const SERVICES = [
  { icon: Plane,    color: "#00b0d8", title: "Air Freight",          desc: "When time and speed matter most. Door-to-door air cargo solutions worldwide.", path: "/services#air" },
  { icon: Ship,     color: "#1565c0", title: "Sea Freight",           desc: "Cost-effective ocean freight solutions for all cargo sizes. FCL & LCL.",        path: "/services#sea" },
  { icon: Package,  color: "#7c3aed", title: "Special Projects",      desc: "Out of gauge, heavy lift, and non-standard cargo — we handle the extraordinary.", path: "/services#special" },
  { icon: Warehouse,color: "#059669", title: "Contract Logistics",    desc: "Warehousing, fulfilment, and 3PL solutions tailored to your supply chain.",      path: "/services#logistics" },
  { icon: Shield,   color: "#e8a020", title: "Customs Clearance",     desc: "Seamless customs brokerage. We handle paperwork so you don't have to.",          path: "/services#customs" },
  { icon: Globe2,   color: "#dc2626", title: "Value-Added Services",  desc: "Insurance, supply chain management, lead logistics and more.",                   path: "/services#vas" },
];

const STATS = [
  { num: "500+", label: "Clients Served",     icon: Users },
  { num: "50+",  label: "Countries Reached",  icon: Globe2 },
  { num: "24/7", label: "Support Available",  icon: Clock },
  { num: "10+",  label: "Years Experience",   icon: Award },
];

const INDUSTRIES = [
  "Automotive","Technology","Healthcare","Energy","Industrial","Aerospace","Chemicals","Consumer",
];

const WHYS = [
  "Expert customs & compliance teams",
  "Real-time shipment tracking",
  "Competitive, transparent pricing",
  "Dedicated account managers",
  "Global partner network",
  "End-to-end supply chain solutions",
];

export default function Home() {
  const [count, setCount] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setCount(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="home">
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
          <div className="hero__orb hero__orb--3" />
          <div className="dot-grid" />
          <div className="hero__ship-lines">
            {[...Array(6)].map((_,i) => <div key={i} className="ship-line" style={{ animationDelay: `${i * 0.8}s` }} />)}
          </div>
        </div>

        <div className="container hero__content">
          <div className="hero__text animate-fade-up">
            <div className="tag"><Star size={12} fill="currentColor" /> Trusted Freight Forwarding Partner</div>
            <h1 className="heading-xl hero__title">
              Moving Cargo<br />
              <span className="text-gradient">Across the Globe</span><br />
              With Precision
            </h1>
            <p className="hero__desc">
              Vertex TradeLynx delivers world-class freight forwarding, logistics, and export solutions. 
              Air, sea, road — we connect your business to the world, on time, every time.
            </p>
            <div className="hero__cta">
              <Link to="/quote" className="btn btn-primary">
                Get a Free Quote <ArrowRight size={16} />
              </Link>
              <Link to="/services" className="btn btn-outline">
                Explore Services
              </Link>
            </div>
            <div className="hero__badges">
              {["Air Freight", "Sea Freight", "Customs", "Warehousing"].map(b => (
                <span key={b} className="hero__badge"><CheckCircle2 size={14} /> {b}</span>
              ))}
            </div>
          </div>

          <div className="hero__visual animate-fade-up delay-300">
            <div className="hero__globe-wrap animate-float">
              <img src="/logo.png" alt="Vertex TradeLynx" className="hero__logo-large" />
              <div className="hero__globe-ring" />
              <div className="hero__globe-ring hero__globe-ring--2" />
              <div className="hero__globe-ping hero__globe-ping--1"><span /></div>
              <div className="hero__globe-ping hero__globe-ping--2"><span /></div>
              <div className="hero__globe-ping hero__globe-ping--3"><span /></div>
            </div>
          </div>
        </div>

        <div className="hero__scroll-hint">
          <div className="hero__scroll-dot" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-bar" ref={statsRef}>
        <div className="container stats-bar__grid">
          {STATS.map(({ num, label, icon: Icon }) => (
            <div key={label} className="stats-bar__item">
              <Icon size={28} className="stats-bar__icon" />
              <div className="stat-number">{num}</div>
              <div className="stats-bar__label">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section services-section">
        <div className="container">
          <div className="section-header">
            <div className="tag"><Zap size={12} /> Our Services</div>
            <h2 className="heading-lg">End-to-End <span className="text-gradient">Freight Solutions</span></h2>
            <p className="section-desc">From a single parcel to complex project cargo — we've got the expertise and network to deliver.</p>
          </div>

          <div className="services-grid">
            {SERVICES.map(({ icon: Icon, color, title, desc, path }) => (
              <Link key={title} to={path} className="service-card glass-card">
                <div className="service-card__icon" style={{ "--icon-color": color }}>
                  <Icon size={26} />
                </div>
                <h3 className="service-card__title">{title}</h3>
                <p className="service-card__desc">{desc}</p>
                <span className="service-card__arrow"><ChevronRight size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY VERTEX ── */}
      <section className="section why-section">
        <div className="container why-section__inner">
          <div className="why-section__text">
            <div className="tag"><Award size={12} /> Why Choose Us</div>
            <h2 className="heading-lg">Your Global Freight<br /><span className="text-gradient">Forwarding Partner</span></h2>
            <p className="text-muted" style={{ marginBottom: 32, lineHeight: 1.8 }}>
              Founded by Nilesh Chavan, Vertex TradeLynx combines deep industry expertise with a customer-first approach. We don't just move cargo — we build lasting partnerships.
            </p>
            <ul className="why-list">
              {WHYS.map(w => (
                <li key={w} className="why-list__item">
                  <CheckCircle2 size={18} className="why-list__check" />
                  {w}
                </li>
              ))}
            </ul>
            <Link to="/about" className="btn btn-primary" style={{ marginTop: 32 }}>
              About Us <ArrowRight size={16} />
            </Link>
          </div>
          <div className="why-section__card-wrap">
            <div className="why-card glass-card">
              <div className="why-card__header">
                <Globe2 size={32} color="var(--accent)" />
                <div>
                  <div className="why-card__title">Global Network</div>
                  <div className="why-card__sub">50+ countries covered</div>
                </div>
              </div>
              <div className="why-card__routes">
                {["India → USA","India → UAE","India → UK","India → Australia","India → Germany"].map(r => (
                  <div key={r} className="why-card__route">
                    <span className="why-card__dot" />{r}
                    <span className="why-card__status">Active</span>
                  </div>
                ))}
              </div>
              <div className="why-card__footer">
                <Plane size={14} color="var(--accent)" />
                <span>Real-time tracking available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="section industries-section">
        <div className="container">
          <div className="section-header">
            <div className="tag"><Globe2 size={12} /> Industries We Serve</div>
            <h2 className="heading-lg">Whatever Your Industry,<br /><span className="text-gradient">We Are Your Partner</span></h2>
          </div>
          <div className="industries-grid">
            {INDUSTRIES.map((ind) => (
              <Link key={ind} to="/industries" className="industry-chip glass-card">
                <span>{ind}</span>
                <ChevronRight size={14} />
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link to="/industries" className="btn btn-outline">View All Industries <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-banner">
        <div className="cta-banner__bg" />
        <div className="container cta-banner__inner">
          <div className="cta-banner__text">
            <h2 className="heading-lg">Ready to Ship Globally?</h2>
            <p>Get a personalised freight quote in minutes. Our experts are standing by.</p>
          </div>
          <div className="cta-banner__actions">
            <Link to="/quote" className="btn btn-primary">Get Free Quote <ArrowRight size={16} /></Link>
            <a href="tel:+919503645532" className="btn btn-glass">Call Now</a>
          </div>
        </div>
      </section>
    </div>
  );
}
