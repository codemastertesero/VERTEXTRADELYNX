import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  {
    label: "Services", path: "/services",
    sub: [
      { label: "Air Freight", path: "/services#air" },
      { label: "Sea Freight", path: "/services#sea" },
      { label: "Special Projects", path: "/services#special" },
      { label: "Contract Logistics", path: "/services#logistics" },
      { label: "Customs Clearance", path: "/services#customs" },
      { label: "Value-Added Services", path: "/services#vas" },
    ]
  },
  { label: "Industries", path: "/industries" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setDropdown(null); }, [location]);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <img src="/logo.png" alt="Vertex TradeLynx" className="navbar__logo-img" />
        </Link>

        {/* Desktop nav */}
        <nav className="navbar__links">
          {NAV_LINKS.map((link) =>
            link.sub ? (
              <div
                key={link.label}
                className="navbar__item navbar__item--has-dropdown"
                onMouseEnter={() => setDropdown(link.label)}
                onMouseLeave={() => setDropdown(null)}
              >
                <span className={`navbar__link ${location.pathname === link.path ? "active" : ""}`}>
                  {link.label} <ChevronDown size={14} />
                </span>
                {dropdown === link.label && (
                  <div className="navbar__dropdown">
                    {link.sub.map((s) => (
                      <Link key={s.label} to={s.path} className="navbar__dropdown-item">
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.label}
                to={link.path}
                className={`navbar__link ${location.pathname === link.path ? "active" : ""}`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA */}
        <div className="navbar__actions">
          <a href="tel:+919503645532" className="navbar__phone">
            <Phone size={15} /> +91 95036 45532
          </a>
          <Link to="/quote" className="btn btn-primary btn--sm">Get a Quote</Link>
        </div>

        {/* Hamburger */}
        <button className="navbar__hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="navbar__mobile">
          {NAV_LINKS.map((link) => (
            <div key={link.label}>
              <Link to={link.path} className="navbar__mobile-link">{link.label}</Link>
              {link.sub && link.sub.map((s) => (
                <Link key={s.label} to={s.path} className="navbar__mobile-sub">{s.label}</Link>
              ))}
            </div>
          ))}
          <a href="tel:+919503645532" className="navbar__mobile-link">📞 +91 95036 45532</a>
          <Link to="/quote" className="btn btn-primary" style={{ margin: "8px 24px" }}>Get a Quote</Link>
        </div>
      )}
    </header>
  );
}
